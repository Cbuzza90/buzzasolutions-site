import { test } from "node:test";
import assert from "node:assert/strict";
import { cotterPinQuestions as questions, cotterPinSizes, cotterPinPath, cotterPinProgressKey, sampleCotterPinQuestions, inchFraction } from "./cotterPinPractice.js";
import { findNoteSections, studyNotesByModule } from "./courseStudyNotes.js";
import { dashboardTests } from "./studyDashboard.js";
import { newPracticeAttempt, savePracticeAttempt, readPracticeRecord, restorePracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";

test("cotter sizing uses 28 listed AN380 combinations, correct worked answers and no exceptional length codes",()=>{
  assert.equal(cotterPinSizes.length,28); assert.equal(questions.length,56);
  assert.equal(new Set(questions.map(q=>q.id)).size,56);
  for(const q of questions) {
    assert.match(q.partNumber,/^AN380-\d+-\d+$/);
    assert.ok(q.lengthCode>=2);
    assert.equal(q.options.length,4);
    assert.equal(new Set(q.options).size,4);
    assert.ok(q.explanation.includes("÷ 32") && q.explanation.includes("÷ 4"));
  }
  const answer=(part,field)=>{const q=questions.find(q=>q.partNumber===part && q.topic===`cotter-${field}`);return q.options[q.correctIndex];};
  // Published table examples, independently specified (not recalculated keys).
  assert.equal(answer("AN380-2-6","diameter"),"1/16 in");
  assert.equal(answer("AN380-2-6","length"),"1 1/2 in");
  assert.equal(answer("AN380-1-4","diameter"),"1/32 in");
  assert.equal(answer("AN380-1-4","length"),"1 in");
  assert.equal(answer("AN380-3-7","diameter"),"3/32 in");
  assert.equal(answer("AN380-3-7","length"),"1 3/4 in");
  assert.equal(answer("AN380-4-10","diameter"),"1/8 in");
  assert.equal(answer("AN380-4-10","length"),"2 1/2 in");
  assert.equal(answer("AN380-5-6","diameter"),"5/32 in");
  assert.equal(inchFraction(6,4),"1 1/2");
});
test("each shuffled 20-question attempt has ten diameter and ten length questions and saves grading/best out of 20",()=>{
  const map=new Map(),storage={getItem:key=>map.get(key)??null,setItem:(key,value)=>map.set(key,value)};
  const attempt=newPracticeAttempt(questions,()=>0.42,20,sampleCotterPinQuestions);
  assert.equal(attempt.order.length,20);
  assert.equal(new Set(attempt.order.map(q=>q.id)).size,20);
  assert.equal(attempt.order.filter(q=>q.topic==="cotter-diameter").length,10);
  assert.equal(attempt.order.filter(q=>q.topic==="cotter-length").length,10);
  attempt.answers[attempt.order[0].id]=attempt.order[0].correctIndex;attempt.position=1;
  savePracticeAttempt(questions,cotterPinProgressKey,attempt,storage);
  assert.deepEqual(restorePracticeAttempt(questions,readPracticeRecord("progress",cotterPinProgressKey,storage),20),attempt);
  recordHighestScore(questions,cotterPinProgressKey,18,storage,20);
  savePracticeAttempt(questions,cotterPinProgressKey,newPracticeAttempt(questions,Math.random,20,sampleCotterPinQuestions),storage);
  assert.equal(loadHighestScore(questions,cotterPinProgressKey,storage,20).score,18);
  assert.equal(loadHighestScore(questions,cotterPinProgressKey,storage,20).total,20);
});
test("cotter calculations and each question are searchable in Structures notes, with navigation/dashboard support",()=>{
  const notes=studyNotesByModule["/study/structures/module-2"];
  for(const q of questions) assert.ok(findNoteSections(notes.sections,q.prompt).flatMap(s=>s.items).some(([label,text])=>label===q.prompt && text.includes(q.explanation)),q.id);
  for(const term of ["cotter-pin diameter","second size code","mixed number","length code -1","AN381"]) assert.ok(findNoteSections(notes.sections,term).some(s=>!s.questionReference),term);
  const entry=dashboardTests.find(t=>t.storageId===cotterPinProgressKey);
  assert.equal(entry.path,cotterPinPath);assert.equal(entry.count,20);
  assert.deepEqual(studyPracticeNavigation(cotterPinPath),{onPractice:true,testsPath:"/study/structures/module-2"});
});
