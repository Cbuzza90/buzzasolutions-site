import { test } from "node:test";
import assert from "node:assert/strict";
import { ataChapters, ataCodeQuestions as questions, ataModulePath, ataPracticePath, ataProgressKey, ataReviewCodes, ataStudySheetPath } from "./ataCodePractice.js";
import { studyNotesByModule, findNoteSections } from "./courseStudyNotes.js";
import { dashboardTests, savedTestSummary } from "./studyDashboard.js";
import { newPracticeAttempt, savePracticeAttempt, restorePracticeAttempt, readPracticeRecord, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";

test("ATA covers only review worksheet chapters in both directions, with distinct plausible choices",()=>{
  const codes=[1,2,6,12,24,25,28,33,49,57,73,79];
  assert.deepEqual(ataReviewCodes,codes);
  assert.deepEqual(ataChapters.map(c=>c.number),codes);
  assert.equal(questions.length,24);
  assert.equal(new Set(questions.map(q=>q.id)).size,24);
  for (const chapter of ataChapters) {
    const pair=questions.filter(q=>q.chapter===chapter.code);
    assert.equal(pair.length,2);
    assert.deepEqual(pair.map(q=>q.direction),["name","code"]);
    assert.equal(pair[0].options[pair[0].correctIndex],chapter.title);
    assert.equal(pair[1].options[pair[1].correctIndex],`ATA ${chapter.code}`);
    for(const q of pair) {
      assert.equal(q.options.length,4); assert.equal(new Set(q.options).size,4);
      assert.ok(q.source.slide>=8 && q.source.slide<=13);
      assert.ok(q.explanation.includes(chapter.title) && q.explanation.includes(`ATA ${chapter.code}`));
    }
  }
  for(const [code,title] of [[1,"Maintenance Policy"],[2,"Operations"],[6,"Dimensions and Areas"],[12,"Servicing - Routine Maintenance"],[24,"Electrical Power"],[25,"Equipment / Furnishings"],[28,"Fuel"],[33,"Lights"],[49,"Airborne Auxiliary Power"],[57,"Wings"],[73,"Engine - Fuel and Control"],[79,"Oil"]]) {
    assert.equal(ataChapters.find(c=>c.number===code).title,title);
  }
});
test("every ATA attempt includes all 12 review chapters in both directions, shuffled and saved",()=>{
  const entries=new Map(),storage={getItem:key=>entries.get(key)??null,setItem:(key,value)=>entries.set(key,value)};
  const attempt=newPracticeAttempt(questions,()=>0.37);
  assert.equal(attempt.order.length,24);
  assert.equal(new Set(attempt.order.map(q=>q.id)).size,24);
  assert.notDeepEqual(attempt.order.map(q=>q.id),questions.map(q=>q.id));
  assert.equal(new Set(attempt.order.map(q=>q.chapter)).size,12);
  assert.equal(attempt.order.filter(q=>q.direction==="code").length,12);
  assert.equal(attempt.order.filter(q=>q.direction==="name").length,12);
  attempt.answers[attempt.order[0].id]=attempt.order[0].correctIndex;attempt.position=1;
  savePracticeAttempt(questions,ataProgressKey,attempt,storage);
  assert.deepEqual(restorePracticeAttempt(questions,readPracticeRecord("progress",ataProgressKey,storage)),attempt);
  recordHighestScore(questions,ataProgressKey,20,storage);
  savePracticeAttempt(questions,ataProgressKey,newPracticeAttempt(questions),storage);
  assert.equal(loadHighestScore(questions,ataProgressKey,storage).score,20);
  assert.equal(loadHighestScore(questions,ataProgressKey,storage).total,24);
  const entry=dashboardTests.find(t=>t.storageId===ataProgressKey);
  assert.equal(entry.courseSlug,"publications"); assert.equal(entry.basePath,ataModulePath);
  assert.equal(entry.path,ataPracticePath);assert.equal(entry.questions.length,24);
  assert.equal(savedTestSummary(entry,storage).answered,0);
});
test("ATA has exact-module notes for all chapters/questions and recognized reset/test navigation",()=>{
  const notes=studyNotesByModule[ataModulePath];
  for(const chapter of ataChapters) {
    assert.ok(findNoteSections(notes.sections,`ATA ${chapter.code}`).some(s=>!s.questionReference),chapter.code);
    assert.ok(findNoteSections(notes.sections,chapter.title).some(s=>!s.questionReference),chapter.title);
  }
  assert.ok(!notes.sections.filter(s=>s.id.startsWith("ata-") && !s.questionReference).flatMap(s=>s.items).some(([label])=>label.startsWith("ATA 80 ·")));
  for(const q of questions) assert.ok(findNoteSections(notes.sections,q.prompt).flatMap(s=>s.items).some(([label,text])=>label===q.prompt && text.includes(q.explanation)),q.id);
  assert.equal(ataStudySheetPath,`${ataModulePath}/ata-study-sheet`);
  assert.deepEqual(studyPracticeNavigation(ataPracticePath),{onPractice:true,testsPath:ataModulePath});
});
