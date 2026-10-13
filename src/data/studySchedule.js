// Update these entries when the group's test dates change.
export const studyGroup = "15886.202635";
export const upcomingTests = [
  { course: "Safety", courseSlug: "safety", date: "2026-10-14", label: "Safety Test: Wednesday October 14th!", tone: "urgent" },
  { course: "Systems", courseSlug: "systems", date: "2026-10-16", label: "Systems Test: Friday October 16th!", tone: "warning" },
  { course: "Electricity", courseSlug: "electricity", date: "2026-10-19", label: "Electricity Test: Monday October 19th!", tone: "notice" },
  { course: "Structures", courseSlug: "structures", date: "2026-10-27", label: "Possible Structures Test: Tuesday October 27th", tone: "notice", possible: true },
];

export function torontoDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const value = type => parts.find(part => part.type === type).value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function visibleTests(tests, today = torontoDate()) {
  return tests.filter(test => test.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

export function nextCourseTest(courseSlug, tests = upcomingTests, today = torontoDate()) {
  const test = visibleTests(tests, today).find(test => test.courseSlug === courseSlug);
  if (!test) return null;
  // Compare calendar days, so daylight-saving changes do not shift the countdown.
  const days = Math.round((Date.parse(`${test.date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000);
  const urgency = days <= 2 ? "urgent" : days <= 6 ? "warning" : "ready";
  const hue = urgency === "urgent" ? 0 : urgency === "ready" ? 140 : 12 + (days - 3) * 16;
  return { ...test, days, urgency, hue };
}

export function sortCoursesByNextTest(courses, tests = upcomingTests, today = torontoDate()) {
  const dates = new Map(courses.map(course => [course.slug, nextCourseTest(course.slug, tests, today)?.days ?? Infinity]));
  return [...courses].sort((a, b) => dates.get(a.slug) - dates.get(b.slug) || Number(Boolean(b.hasTests)) - Number(Boolean(a.hasTests)));
}

export function formatTestDate(date, short = false) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", weekday: short ? "short" : "long", month: short ? "short" : "long", day: "numeric" }).format(new Date(`${date}T12:00:00-04:00`));
}
