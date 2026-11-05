import { test } from "node:test";
import assert from "node:assert/strict";
import { techPubWorksheetQuestions as questions, techPubWorksheetPath as path, techPubWorksheetSources, techPubSourceLimit, techPubWorksheetTargets } from "./techPubWorksheetPractice.js";
import { ataCodeQuestions, ataProgressKey } from "./ataCodePractice.js";
import { findNoteSections, studyNotesByModule } from "./courseStudyNotes.js";
import { dashboardTests, savedTestSummary } from "./studyDashboard.js";
import { newPracticeAttempt, savePracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";
import { shufflePractice } from "../pages/safetyTestLogic.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";

test("Tech Pub Easy tests only the review worksheet prompts, with source-backed answers",()=>{
  assert.equal(questions.length,23);
  assert.deepEqual(new Set(questions.map(q=>q.id)),new Set(techPubWorksheetTargets.map(target=>`techpub-worksheet-${target}`)));
  assert.ok(!questions.some(q=>q.id==="techpub-worksheet-ipc-pages"));
  for(const q of shufflePractice(questions,()=>0.4)) {
    const original=questions.find(item=>item.id===q.id);
    assert.equal(q.options.length,4);
    assert.equal(new Set(q.options.map(option=>option.toLowerCase().trim())).size,4);
    assert.equal(q.options[q.correctIndex],original.options[original.correctIndex]);
    assert.ok(q.explanation.length>150,q.id);
    assert.ok(q.explanation.includes(techPubWorksheetSources[q.source.deck]),q.id);
    assert.ok(q.source.slides.every(slide=>Number.isInteger(slide)&&slide>0));
    assert.ok(!q.options.some(option=>/both [a-d] and [a-d]|of the above/i.test(option)));
    assert.ok(!/overall length|stations.*between|span of|height of|wheel base/i.test(q.prompt),"No guessed aircraft dimensions or station ranges");
  }
  for(const target of ["bs","fss","rss","le","te","amm","cmm","srm","ipc","fim","warning","caution","note","effectivity-location","page-201","page-501","number-chapter","number-section","number-subject"]) {
    assert.ok(questions.some(q=>q.id===`techpub-worksheet-${target}`),target);
  }
  assert.match(techPubSourceLimit,/matching AMM diagrams/);
});

test("every worksheet question and explanation is searchable in the exact publications module",()=>{
  const notes=studyNotesByModule["/study/publications/module-2"];
  for(const q of questions) {
    const matches=findNoteSections(notes.sections,q.prompt).filter(section=>section.questionReference).flatMap(section=>section.items).filter(([label])=>label===q.prompt);
    assert.equal(matches.length,1,q.id);
    assert.ok(matches[0][1].includes(q.explanation));
  }
  for(const term of ["effectivity","Body Station","Front Spar Station","Rear Spar Station","Maintenance Practices","Adjustment/Test","Component Maintenance Manual"]) {
    assert.ok(findNoteSections(notes.sections,term).some(section=>!section.questionReference),term);
  }
});

test("worksheet progress and best score are separate from the existing ATA quiz and navigation recognizes the route",()=>{
  const values=new Map(),storage={getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)};
  const test=dashboardTests.find(item=>item.path===path);
  const ata=dashboardTests.find(item=>item.storageId===ataProgressKey);
  assert.equal(test.questions,questions);
  assert.equal(ata.questions,ataCodeQuestions);
  const attempt=newPracticeAttempt(questions,()=>0.5);
  attempt.answers[attempt.order[0].id]=attempt.order[0].correctIndex;
  savePracticeAttempt(questions,test.storageId,attempt,storage);
  assert.equal(savedTestSummary(test,storage).answered,1);
  assert.equal(savedTestSummary(ata,storage).attempt,undefined);
  recordHighestScore(questions,test.storageId,20,storage);
  savePracticeAttempt(questions,test.storageId,newPracticeAttempt(questions),storage);
  assert.equal(loadHighestScore(questions,test.storageId,storage).score,20);
  assert.deepEqual(studyPracticeNavigation(path),{onPractice:true,testsPath:"/study/publications/module-2"});
});
