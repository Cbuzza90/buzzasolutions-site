import { test } from "node:test";
import assert from "node:assert/strict";
import { formatScheduledTestDate, formatClassEndTime, formatClassSession, isModuleCompleted, nextCourseTest, sortCoursesByNextTest, testClassEndTime, testClassSessions, torontoDate, upcomingTests, visibleTests } from "./studySchedule.js";

const activeSchedule = upcomingTests.map(test => ({ ...test, completed: false }));

test("Math test windows stay visible throughout the range and advance to the next test afterward", () => {
  const second = nextCourseTest("math", upcomingTests, "2026-11-15");
  assert.equal(second.title, "Math Test #2");
  assert.equal(second.date, "2026-11-16");
  assert.equal(second.endDate, "2026-11-20");
  assert.equal(second.days, 1);
  for (const day of ["2026-11-16", "2026-11-18", "2026-11-20"]) {
    assert.equal(nextCourseTest("math", upcomingTests, day).title, "Math Test #2");
    assert.equal(nextCourseTest("math", upcomingTests, day).days, 0);
  }
  assert.deepEqual(testClassSessions(second), []);
  assert.equal(testClassEndTime(second), null);
  assert.equal(formatScheduledTestDate(second, true), "Mon, Nov 16 – Fri, Nov 20");
  assert.equal(nextCourseTest("math", upcomingTests, new Date("2026-11-21T04:59:59Z")).title, "Math Test #2");
  const third = nextCourseTest("math", upcomingTests, new Date("2026-11-21T05:00:00Z"));
  assert.equal(third.title, "Math Test #3");
  assert.equal(third.date, "2026-12-14");
  assert.equal(third.endDate, "2026-12-18");
  assert.equal(nextCourseTest("math", upcomingTests, "2026-12-18").days, 0);
  assert.equal(nextCourseTest("math", upcomingTests, new Date("2026-12-19T05:00:00Z")), null);
  assert.equal(formatScheduledTestDate({ date: "2026-11-06" }, true), "Fri, Nov 6");
});

test("test dates stay visible on the test day and expire the following day", () => {
  assert.equal(visibleTests(activeSchedule, "2026-10-14").length, 12);
  assert.deepEqual(visibleTests(activeSchedule, "2026-10-15").map(test => test.course), ["Systems", "Electricity", "Safety", "Structures", "Engines", "Aerodynamics", "Technical Publications", "Math", "Engines", "Math", "Engines"]);
  assert.deepEqual(visibleTests(activeSchedule, "2026-10-17").map(test => test.course), ["Electricity", "Safety", "Structures", "Engines", "Aerodynamics", "Technical Publications", "Math", "Engines", "Math", "Engines"]);
  assert.equal(visibleTests(activeSchedule, "2026-12-19")[0].date, "2027-01-18");
  assert.equal(visibleTests(activeSchedule, "2027-01-19").length, 0);
});

test("expiration follows Toronto midnight rather than UTC midnight", () => {
  assert.equal(torontoDate(new Date("2026-10-15T03:59:59Z")), "2026-10-14");
  assert.equal(torontoDate(new Date("2026-10-15T04:00:00Z")), "2026-10-15");
});

test("visible dates are sorted without changing the saved schedule", () => {
  const reverse = [...activeSchedule].reverse();
  const original = [...reverse];
  const sorted = visibleTests(reverse, "2026-10-12");
  assert.deepEqual(sorted.map(test => test.date), activeSchedule.map(test => test.date));
  assert.deepEqual(reverse, original);
  assert.equal(reverse[0].course, "Engines");
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
  assert.equal(isModuleCompleted("systems", "module-1"), true);
  assert.equal(nextCourseTest("safety", upcomingTests, "2026-10-14").date, "2026-10-21");
  assert.deepEqual(visibleTests(upcomingTests, "2026-10-14").map(test => test.course), ["Electricity", "Safety", "Structures", "Engines", "Aerodynamics", "Technical Publications", "Math", "Engines", "Math", "Engines"]);
});

test("completed Systems Module 1 has no upcoming date or countdown", () => {
  assert.equal(isModuleCompleted("systems", "module-1"), true);
  assert.equal(isModuleCompleted("systems", "module-2"), false);
  assert.equal(nextCourseTest("systems", upcomingTests, "2026-10-16"), null);
  assert.ok(!visibleTests(upcomingTests, "2026-10-16").some(item => item.courseSlug === "systems"));
});

test("Technical Publications Module 2 test stays visible through November 6", () => {
  const scheduled = nextCourseTest("publications", upcomingTests, "2026-11-06");
  assert.equal(scheduled.title, "Technical Publications: Module 2 Test");
  assert.equal(scheduled.moduleSlug, "module-2");
  assert.equal(scheduled.days, 0);
  assert.equal(nextCourseTest("publications", upcomingTests, "2026-11-07"), null);
});

test("Safety human factors quiz has 17 questions and expires after October 21", () => {
  const quiz = nextCourseTest("safety", upcomingTests, "2026-10-16");
  assert.equal(quiz.title, "Safety: Human Factors Quiz");
  assert.equal(quiz.questionCount, 17);
  assert.equal(quiz.days, 5);
  assert.equal(nextCourseTest("safety", upcomingTests, "2026-10-21").days, 0);
  assert.equal(nextCourseTest("safety", upcomingTests, "2026-10-22"), null);
});

test("scheduled tests disappear at class end in Toronto time", () => {
  const cases = [
    ["safety", "2026-10-21", "13:29", "2026-10-21T17:28:59Z", "2026-10-21T17:29:00Z"],
    ["electricity", "2026-10-19", "17:29", "2026-10-19T21:28:59Z", "2026-10-19T21:29:00Z"],
    ["structures", "2026-10-27", "14:29", "2026-10-27T18:28:59Z", "2026-10-27T18:29:00Z"],
    ["systems", "2026-10-16", "13:29", "2026-10-16T17:28:59Z", "2026-10-16T17:29:00Z"],
    // November 6 is after Toronto's return to standard time: UTC minus 5.
    ["publications", "2026-11-06", "11:29", "2026-11-06T16:28:59Z", "2026-11-06T16:29:00Z"],
  ];
  for (const [courseSlug, date, end, before, after] of cases) {
    const scheduled = { courseSlug, date };
    assert.equal(testClassEndTime(scheduled), end);
    assert.equal(visibleTests([scheduled], new Date(before)).length, 1, courseSlug);
    assert.equal(visibleTests([scheduled], new Date(after)).length, 0, courseSlug);
    assert.equal(nextCourseTest(courseSlug, [scheduled], new Date(before)).days, 0);
    assert.equal(nextCourseTest(courseSlug, [scheduled], new Date(after)), null);
  }
});

test("two class sessions keep the reminder until the final session unless overridden", () => {
  const scheduled = { courseSlug: "electricity", date: "2026-10-19" };
  assert.equal(visibleTests([scheduled], new Date("2026-10-19T15:00:00Z")).length, 1);
  assert.equal(formatClassEndTime(scheduled), "5:29 p.m.");
  const morning = { ...scheduled, endTime: "10:59" };
  assert.equal(testClassEndTime(morning), "10:59");
  assert.equal(visibleTests([morning], new Date("2026-10-19T14:59:00Z")).length, 0);
});

test("a course's other class days use their own end times", () => {
  assert.equal(testClassEndTime({ courseSlug: "systems", date: "2026-10-22" }), "17:59");
  assert.equal(testClassEndTime({ courseSlug: "structures", date: "2026-10-24" }), "15:59");
  assert.equal(testClassEndTime({ courseSlug: "math", date: "2026-10-21" }), "15:59");
  assert.equal(testClassEndTime({ courseSlug: "math", date: "2026-10-22" }), "15:29");
});

test("unknown class times clear at Toronto midnight without inventing a session", () => {
  const tests = [{ courseSlug: "safety", date: "2026-10-20" }, { courseSlug: "new-course", date: "2026-10-20" }];
  tests.forEach(item => assert.equal(testClassEndTime(item), null));
  assert.equal(visibleTests(tests, new Date("2026-10-21T03:59:59Z")).length, 2);
  assert.equal(visibleTests(tests, new Date("2026-10-21T04:00:00Z")).length, 0);
  assert.equal(testClassEndTime({ courseSlug: "safety", date: "2027-01-06" }), null);
});

test("expired class reminders no longer affect course order", () => {
  const courses = [{ slug: "safety", hasTests: true }, { slug: "structures", hasTests: true }];
  const tests = [{ courseSlug: "safety", date: "2026-10-21" }, { courseSlug: "structures", date: "2026-10-27" }];
  assert.deepEqual(sortCoursesByNextTest(courses, tests, new Date("2026-10-21T17:28:00Z")).map(c => c.slug), ["safety", "structures"]);
  assert.deepEqual(sortCoursesByNextTest(courses, tests, new Date("2026-10-21T17:29:00Z")).map(c => c.slug), ["structures", "safety"]);
});

test("class rooms match the test weekday, with both Monday rooms and online sessions", () => {
  const electricity = testClassSessions({ courseSlug: "electricity", date: "2026-10-19" });
  assert.deepEqual(electricity.map(slot => slot.room), ["208", "206"]);
  assert.equal(formatClassSession(electricity[0]), "9:00 a.m.–10:59 a.m. · Room 208");
  assert.equal(testClassSessions({ courseSlug: "safety", date: "2026-10-21" })[0].room, "208");
  assert.equal(testClassSessions({ courseSlug: "publications", date: "2026-11-06" })[0].room, "204");
  assert.deepEqual(testClassSessions({ courseSlug: "structures", date: "2026-10-27" }).map(slot => slot.room), ["116", "306"]);
  assert.match(formatClassSession(testClassSessions({ courseSlug: "structures", date: "2026-10-24" })[0]), /Online$/);
  assert.deepEqual(testClassSessions({ courseSlug: "safety", date: "2026-10-20" }), []);
});
