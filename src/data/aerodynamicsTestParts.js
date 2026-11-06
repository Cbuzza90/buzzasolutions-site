import { aerodynamicsChoiceQuestions, aerodynamicsRecallQuestions, aerodynamicsModule2Path } from "./aerodynamicsModule2.js";
import { aerodynamicsReviewQuestions } from "./aerodynamicsReviewPractice.js";
import { aeroChoiceKey, aeroRecallKey } from "../pages/aerodynamicsProgress.js";

export function splitQuestionBank(questions, maximum = 39) {
  const count = Math.ceil(questions.length / maximum);
  const size = Math.floor(questions.length / count), extra = questions.length % count;
  let offset = 0;
  return Array.from({length:count}, (_,i) => {
    const part = questions.slice(offset, offset + size + Number(i < extra));
    offset += part.length;
    return part;
  });
}
export const aerodynamicsTestFamilies = [
  { id:"review", title:"Review & Practice Quiz", difficulty:"easy", kind:"choice", suffix:"practice-1", questions:aerodynamicsReviewQuestions, fullKey:`${aerodynamicsModule2Path}/practice-1` },
  { id:"choice", title:"Notes Practice", difficulty:"medium", kind:"choice", suffix:"practice-2", questions:aerodynamicsChoiceQuestions, fullKey:aeroChoiceKey },
  { id:"word", title:"One-Word Recall", difficulty:"hard", kind:"typed", suffix:"one-word-1", questions:aerodynamicsRecallQuestions, fullKey:aeroRecallKey },
].map(family => {
  const path = `${aerodynamicsModule2Path}/${family.suffix}`;
  const groups = splitQuestionBank(family.questions);
  return { ...family, path, parts:groups.map((questions,i) => ({
    slug:`aerodynamics-${family.id}-part-${i+1}`, familyId:family.id, course:"Aerodynamics", courseSlug:"aerodynamics",
    title:`${family.title} · Part ${i+1}`, kind:family.kind, basePath:aerodynamicsModule2Path,
    path:`${path}/part-${i+1}`, storageId:`${path}/part-${i+1}:parts-v1`, questions, number:i+1, totalParts:groups.length,
  })) };
});
export const aerodynamicsTestParts = aerodynamicsTestFamilies.flatMap(family => family.parts);
