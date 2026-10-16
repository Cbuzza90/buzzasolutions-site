import { test } from "node:test";
import assert from "node:assert/strict";
import { isModuleCompleted, nextCourseTest, sortCoursesByNextTest, torontoDate, upcomingTests, visibleTests } from "./studySchedule.js";

const activeSchedule = upcomingTests.map(test => ({ ...test, completed: false }));

test("test dates stay visible on the test day and expire the following day", () => {
  assert.equal(visibleTests(activeSchedule, "2026-10-14").length, 5);
  assert.deepEqual(visibleTests(activeSchedule, "2026-10-15").map(test => test.course), ["Systems", "Electricity", "Safety", "Structures"]);
  assert.deepEqual(visibleTests(activeSchedule, "2026-10-17").map(test => test.course), ["Electricity", "Safety", "Structures"]);
  assert.equal(visibleTests(activeSchedule, "2026-10-28").length, 0);
});

test("expiration follows Toronto midnight rather than UTC midnight", () => {
  assert.equal(torontoDate(new Date("2026-10-15T03:59:59Z")), "2026-10-14");
  assert.equal(torontoDate(new Date("2026-10-15T04:00:00Z")), "2026-10-15");
});

test("visible dates are sorted without changing the saved schedule", () => {
  const reverse = [...activeSchedule].reverse();
  assert.deepEqual(visibleTests(reverse, "2026-10-12"), activeSchedule);
  assert.equal(reverse[0].course, "Structures");
});

test("course colours change at the requested day boundaries", () => {
  const test = [{ courseSlug: "safety", date: "2026-10-20" }];
  const expected = [["2026-10-20",0,"urgent"],["2026-10-19",1,"urgent"],["2026-10-18",2,"urgent"],["2026-10-17",3,"warning"],["2026-10-16",4,"warning"],["2026-10-15",5,"warning"],["2026-10-14",6,"warning"],["2026-10-13",7,"ready"]];
  expected.forEach(([today,days,urgency]) => {
    const result = nextCourseTest("safety", test, today);
    assert.equal(result.days, days);
    assert.equal(result.urgency, urgency);
  });
  assert.deepEqual([3,4,5,6].map(days => nextCourseTest("safety", test, `2026-10-${20-days}`).hue), [12,28,44,60]);
});

test("each course uses its earliest upcoming test, ignoring expired and other-course dates", () => {
  const tests = [{courseSlug:"safety",date:"2026-10-20"},{courseSlug:"systems",date:"2026-10-14"},{courseSlug:"safety",date:"2026-10-12"},{courseSlug:"safety",date:"2026-10-16"}];
  assert.equal(nextCourseTest("safety", tests, "2026-10-13").days, 3);
  assert.equal(nextCourseTest("systems", tests, "2026-10-13").days, 1);
  assert.equal(nextCourseTest("structures", tests, "2026-10-13"), null);
  assert.equal(nextCourseTest("safety", tests, "2026-10-21"), null);
});

test("calendar-day countdowns remain correct across Toronto daylight-saving changes", () => {
  assert.equal(nextCourseTest("safety", [{courseSlug:"safety",date:"2026-11-02"}], "2026-10-31").days, 2);
  assert.equal(nextCourseTest("safety", [{courseSlug:"safety",date:"2026-03-09"}], "2026-03-07").days, 2);
});

test("courses sort by nearest scheduled test even when practice questions are unavailable", () => {
  const courses = [{slug:"structures",hasTests:true},{slug:"electricity"},{slug:"systems",hasTests:true},{slug:"safety",hasTests:true},{slug:"math"}];
  const original = [...courses];
  assert.deepEqual(sortCoursesByNextTest(courses, activeSchedule, "2026-10-13").map(course => course.slug), ["safety","systems","electricity","structures","math"]);
  assert.deepEqual(sortCoursesByNextTest(courses, activeSchedule, "2026-10-15").map(course => course.slug), ["systems","electricity","safety","structures","math"]);
  assert.deepEqual(courses, original);
});

test("ties preserve practice availability and original order", () => {
  const courses = [{slug:"one"},{slug:"two",hasTests:true},{slug:"three",hasTests:true},{slug:"four"}];
  const tests = courses.map(course => ({courseSlug:course.slug,date:"2026-10-14"}));
  assert.deepEqual(sortCoursesByNextTest(courses, tests, "2026-10-13").map(course => course.slug), ["two","three","one","four"]);
});

test("the possible Structures test stays tentative and participates in the countdown", () => {
  const result = nextCourseTest("structures", upcomingTests, "2026-10-13");
  assert.equal(result.date, "2026-10-27");
  assert.equal(result.possible, true);
  assert.equal(result.days, 14);
  assert.equal(result.urgency, "ready");
});

test("completed Safety test stops warnings while Module 1 is marked done", () => {
  assert.equal(isModuleCompleted("safety", "module-1"), true);
  assert.equal(isModuleCompleted("systems", "module-1"), false);
  assert.equal(nextCourseTest("safety", upcomingTests, "2026-10-14").date, "2026-10-21");
  assert.deepEqual(visibleTests(upcomingTests, "2026-10-14").map(test => test.course), ["Systems", "Electricity", "Safety", "Structures"]);
});

test("Safety human factors quiz has 17 questions and expires after October 21", () => {
  const quiz = nextCourseTest("safety", upcomingTests, "2026-10-16");
  assert.equal(quiz.title, "Safety: Human Factors Quiz");
  assert.equal(quiz.questionCount, 17);
  assert.equal(quiz.days, 5);
  assert.equal(nextCourseTest("safety", upcomingTests, "2026-10-21").days, 0);
  assert.equal(nextCourseTest("safety", upcomingTests, "2026-10-22"), null);
});
