import { test } from "node:test";
import assert from "node:assert/strict";
import { ataChapters, ataCodeQuestions as questions, ataModulePath, ataPracticePath, ataProgressKey } from "./ataCodePractice.js";
import { studyNotesByModule, findNoteSections } from "./courseStudyNotes.js";
import { dashboardTests, savedTestSummary } from "./studyDashboard.js";
import { newPracticeAttempt, savePracticeAttempt, restorePracticeAttempt, readPracticeRecord, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";

test("ATA covers each of the 63 listed chapters in both directions, with four distinct plausible choices",()=>{
  const codes=[5,6,7,8,9,10,11,12,18,...Array.from({length:23},(_,i)=>20+i),44,45,46,47,48,49,50,51,52,53,54,55,56,57,61,62,63,64,65,66,67,70,71,72,73,74,75,76,77,78,79];
  assert.deepEqual(ataChapters.map(c=>c.number),codes);
  assert.equal(questions.length,126);
  assert.equal(new Set(questions.map(q=>q.id)).size,126);
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
  for(const [code,title] of [[24,"Electrical Power"],[29,"Hydraulic Power"],[35,"Oxygen"],[52,"Doors"],[63,"Main Rotor Drive(s)"],[64,"Tail Rotor"],[65,"Tail Rotor Drive"],[75,"Bleed Air"],[79,"Oil"]]) {
    assert.equal(ataChapters.find(c=>c.number===code).title,title);
  }
});
test("every ATA attempt includes all 63 chapters in both directions, shuffled and saved with best out of 126",()=>{
  const entries=new Map(),storage={getItem:key=>entries.get(key)??null,setItem:(key,value)=>entries.set(key,value)};
  const attempt=newPracticeAttempt(questions,()=>0.37);
  assert.equal(attempt.order.length,126);
  assert.equal(new Set(attempt.order.map(q=>q.id)).size,126);
  assert.notDeepEqual(attempt.order.map(q=>q.id),questions.map(q=>q.id));
  assert.equal(new Set(attempt.order.map(q=>q.chapter)).size,63);
  assert.equal(attempt.order.filter(q=>q.direction==="code").length,63);
  assert.equal(attempt.order.filter(q=>q.direction==="name").length,63);
  attempt.answers[attempt.order[0].id]=attempt.order[0].correctIndex;attempt.position=1;
  savePracticeAttempt(questions,ataProgressKey,attempt,storage);
  assert.deepEqual(restorePracticeAttempt(questions,readPracticeRecord("progress",ataProgressKey,storage)),attempt);
  recordHighestScore(questions,ataProgressKey,100,storage);
  savePracticeAttempt(questions,ataProgressKey,newPracticeAttempt(questions),storage);
  assert.equal(loadHighestScore(questions,ataProgressKey,storage).score,100);
  assert.equal(loadHighestScore(questions,ataProgressKey,storage).total,126);
  const entry=dashboardTests.find(t=>t.storageId===ataProgressKey);
  assert.equal(entry.courseSlug,"publications"); assert.equal(entry.basePath,ataModulePath);
  assert.equal(entry.path,ataPracticePath);assert.equal(entry.questions.length,126);
  assert.equal(savedTestSummary(entry,storage).answered,0);
});
test("ATA has exact-module notes for all chapters/questions and recognized reset/test navigation",()=>{
  const notes=studyNotesByModule[ataModulePath];
  for(const chapter of ataChapters) {
    assert.ok(findNoteSections(notes.sections,`ATA ${chapter.code}`).some(s=>!s.questionReference),chapter.code);
    assert.ok(findNoteSections(notes.sections,chapter.title).some(s=>!s.questionReference),chapter.title);
  }
  for(const q of questions) assert.ok(findNoteSections(notes.sections,q.prompt).flatMap(s=>s.items).some(([label,text])=>label===q.prompt && text.includes(q.explanation)),q.id);
  assert.deepEqual(studyPracticeNavigation(ataPracticePath),{onPractice:true,testsPath:ataModulePath});
});
