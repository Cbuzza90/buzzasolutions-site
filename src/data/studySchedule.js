// Update these entries when the group's test dates change.
export const studyGroup = "15886.202635";
// Course times and rooms are transcribed from the supplied Fall timetable.
// Student identifiers are not copied.
export const classTimetable = {
  from: "2026-09-08", through: "2026-12-18",
  courses: {
    electricity: [{ day: 1, start: "09:00", end: "10:59", room: "208" }, { day: 1, start: "15:00", end: "17:29", room: "206" }],
    structures: [{ day: 2, start: "10:30", end: "12:29", room: "116" }, { day: 2, start: "12:30", end: "14:29", room: "306" }, { day: 6, start: "15:00", end: "15:59", room: "Online" }],
    safety: [{ day: 3, start: "11:00", end: "13:29", room: "208" }],
    systems: [{ day: 4, start: "16:00", end: "17:59", room: "208" }, { day: 5, start: "11:30", end: "13:29", room: "208" }],
    publications: [{ day: 5, start: "08:30", end: "11:29", room: "204" }],
    math: [{ day: 3, start: "14:30", end: "15:59", room: "306" }, { day: 4, start: "14:00", end: "15:29", room: "306" }],
    aerodynamics: [{ day: 3, start: "16:00", end: "17:59", room: "206" }, { day: 5, start: "14:30", end: "16:29", room: "204" }],
    engines: [{ day: 1, start: "11:00", end: "12:59", room: "208" }, { day: 4, start: "18:00", end: "18:59", room: "105" }],
  },
};
export const upcomingTests = [
  { course: "Safety", courseSlug: "safety", date: "2026-10-14", label: "Safety Test: Wednesday October 14th!", tone: "urgent", completed: true, moduleSlug: "module-1" },
  { course: "Systems", courseSlug: "systems", date: "2026-10-16", label: "Systems Test: Friday October 16th!", tone: "warning", completed: true, moduleSlug: "module-1" },
  { course: "Electricity", courseSlug: "electricity", date: "2026-10-19", label: "Electricity Test: Monday October 19th!", tone: "notice" },
  { course: "Safety", courseSlug: "safety", date: "2026-10-21", title: "Safety: Human Factors Quiz", questionCount: 17, label: "Safety Human Factors Quiz: Wednesday October 21st - 17 questions", tone: "notice" },
  { course: "Structures", courseSlug: "structures", date: "2026-10-27", label: "Possible Structures Test: Tuesday October 27th", tone: "notice", possible: true },
  { course: "Technical Publications", courseSlug: "publications", moduleSlug: "module-2", date: "2026-11-06", title: "Technical Publications: Module 2 Test", label: "Technical Publications Module 2 Test: Friday November 6th", tone: "notice" },
  { course: "Aerodynamics", courseSlug: "aerodynamics", date: "2026-11-06", title: "Aerodynamics Test", label: "Aerodynamics Test: Friday November 6th", tone: "notice" },
  { course: "Math", courseSlug: "math", date: "2026-11-16", endDate: "2026-11-20", title: "Math Test #2", label: "Math Test #2: November 16–20", tone: "notice" },
  { course: "Math", courseSlug: "math", date: "2026-12-14", endDate: "2026-12-18", title: "Math Test #3", label: "Math Test #3: December 14–18", tone: "notice" },
];

export function isModuleCompleted(courseSlug, moduleSlug) {
  return upcomingTests.some(test => test.courseSlug === courseSlug && test.moduleSlug === moduleSlug && test.completed);
}

export function torontoDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const value = type => parts.find(part => part.type === type).value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}

function torontoClock(now) {
  // Date-only arguments remain useful for calendar-day checks: local midnight.
  if (typeof now === "string" && /^\d{4}-\d{2}-\d{2}$/.test(now)) return { date: now, minute: 0 };
  const instant = new Date(now);
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", hourCycle: "h23", hour: "2-digit", minute: "2-digit" }).formatToParts(instant);
  return { date: torontoDate(instant), minute: Number(parts.find(p => p.type === "hour").value) * 60 + Number(parts.find(p => p.type === "minute").value) };
}

export function testClassEndTime(test) {
  if (test.endDate) return null; // A test window has no confirmed class session.
  // A specific test time overrides the weekly timetable (e.g. morning lab).
  if (/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(test.endTime ?? "")) return test.endTime;
  const classes = testClassSessions(test);
  // Multiple sessions on one day: keep the reminder through the final session.
  return classes.map(slot => slot.end).sort().at(-1) ?? null;
}

export function testClassSessions(test) {
  if (test.endDate) return [];
  if (test.date < classTimetable.from || test.date > classTimetable.through) return [];
  const day = new Date(`${test.date}T12:00:00Z`).getUTCDay();
  return (classTimetable.courses[test.courseSlug] ?? []).filter(slot => slot.day === day);
}

function classTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour < 12 ? "a.m." : "p.m."}`;
}

export function formatClassSession(slot) {
  const location = slot.room === "Online" ? "Online" : slot.room ? `Room ${slot.room}` : "Room pending";
  return `${classTime(slot.start)}–${classTime(slot.end)} · ${location}`;
}

export function formatClassEndTime(test) {
  const end = testClassEndTime(test);
  if (!end) return null;
  return classTime(end);
}

export function visibleTests(tests, now = new Date()) {
  const clock = torontoClock(now);
  return tests.filter(test => {
    if (test.completed || (test.endDate ?? test.date) < clock.date) return false;
    if (test.endDate) return true; // Keep the whole window, through its final Toronto date.
    if (test.date > clock.date) return true;
    const end = testClassEndTime(test);
    if (!end) return true; // No matching class: retain until the end of the date.
    const [hour, minute] = end.split(":").map(Number);
    return clock.minute < hour * 60 + minute;
  }).sort((a, b) => a.date.localeCompare(b.date));
}

export function nextCourseTest(courseSlug, tests = upcomingTests, now = new Date()) {
  const test = visibleTests(tests, now).find(test => test.courseSlug === courseSlug);
  if (!test) return null;
  const today = torontoClock(now).date;
  // Compare calendar days, so daylight-saving changes do not shift the countdown.
  const days = Math.max(0, Math.round((Date.parse(`${test.date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000));
  const urgency = days <= 2 ? "urgent" : days <= 6 ? "warning" : "ready";
  const hue = urgency === "urgent" ? 0 : urgency === "ready" ? 140 : 12 + (days - 3) * 16;
  return { ...test, days, urgency, hue };
}

export function sortCoursesByNextTest(courses, tests = upcomingTests, now = new Date()) {
  const dates = new Map(courses.map(course => [course.slug, nextCourseTest(course.slug, tests, now)?.days ?? Infinity]));
  return [...courses].sort((a, b) => dates.get(a.slug) - dates.get(b.slug) || Number(Boolean(b.hasTests)) - Number(Boolean(a.hasTests)));
}

export function formatTestDate(date, short = false) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", weekday: short ? "short" : "long", month: short ? "short" : "long", day: "numeric" }).format(new Date(`${date}T12:00:00-04:00`));
}

export function formatScheduledTestDate(test, short = false) {
  return test.endDate ? `${formatTestDate(test.date, short)} – ${formatTestDate(test.endDate, short)}` : formatTestDate(test.date, short);
}
