// Update these entries when the group's test dates change.
export const studyGroup = "15886.202635";
export const upcomingTests = [
  { course: "Safety", date: "2026-10-14", label: "Safety Test: Wednesday October 14th!", tone: "urgent" },
  { course: "Systems", date: "2026-10-16", label: "Systems Test: Friday October 16th!", tone: "warning" },
  { course: "Electricity", date: "2026-10-19", label: "Electricity Test: Monday October 19th!", tone: "notice" },
];

export function torontoDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const value = type => parts.find(part => part.type === type).value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function visibleTests(tests, today = torontoDate()) {
  return tests.filter(test => test.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

export function formatTestDate(date, short = false) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", weekday: short ? "short" : "long", month: short ? "short" : "long", day: "numeric" }).format(new Date(`${date}T12:00:00-04:00`));
}
