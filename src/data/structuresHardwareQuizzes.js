import banks from "./structuresQuizResults.json" with { type: "json" };

const basePath = "/study/structures/module-2";
const titles = ["Quiz 1 · Bolts & Threaded Hardware", "Quiz 2 · Nuts & Washers", "Quiz 3 · Screws, Pins & Turn-Lock Fasteners"];
export const structuresHardwareQuizParts = banks.map((questions, index) => ({
  slug: `structures-graded-quiz-${index + 1}`, course: "Structures", courseSlug: "structures", kind: "choice",
  title: titles[index], questions, basePath, path: `${basePath}/practice-${index + 3}`,
  storageId: `${basePath}/practice-${index + 3}:graded-quiz-v2`,
}));
export const hardwareQuizSourceIssues = [
  ["CC in Quiz 1", "The supplied marked matching key explicitly gives CC = corrosion resistant, while later AN examples use C. The matching question is scoped to the supplied key; C remains the normal code taught by the other questions."],
  ["Thread diagram corrected", "The new marked key and diagram agree: A = thread angle, B = crest, C = root, E = major diameter. The previous practice test had B and C reversed; that error is corrected."],
  ["NAS length versus grip", "The quiz calls these dimensions length. The course NAS1103/1104/1105/1106 and NAS1404 examples identify the dash dimension as grip in sixteenths. The practice questions label it grip to distinguish it from AN under-head overall length."],
  ["Quiz 2 question 2 · AN75-3", "The key lists 5/16 inch for the printed AN75-3. It is retained only as an explicitly labelled quiz-key reference; the unclear designation is not used to teach a decoding formula."],
  ["Quiz 2 question 26 · 5/15 typo", "AN5-6A is 5/16 inch in Quiz 1 and under the supplied AN diameter rule. The 5/15-inch marked answer in Quiz 2 is a typo. The practice answer is corrected to 5/16 inch."],
  ["Quiz 3 question 11 · AN392-6", "The key calls AN392-6 a cotter pin and lists 3/16-inch length. The course deck identifies AN392 as a clevis-pin family. The question explicitly asks for the reported key value and flags the designation/type conflict; no general sizing rule is derived from it."],
];
export const hardwareQuizNoteSections = [
  { id: "hardware-quiz-source-issues", title: "Quiz results · Corrections and source conflicts", items: hardwareQuizSourceIssues },
  { id: "hardware-quiz-identification", title: "Quiz results · Picture identification", items: banks.flat().filter(q => q.diagram).map(q => [`Quiz ${q.source.quiz} · ${q.source.question}`, `${q.options[q.correctIndex]}. ${q.explanation}`, undefined, q.diagram]) },
];
