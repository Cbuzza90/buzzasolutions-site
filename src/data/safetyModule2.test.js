import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { safetyModule2Choice as choice, safetyModule2Recall as recall, safetyModule2Parts as parts, safetyModule2Sources as sources, safetyModule2Path as path, safetyModule2SourceIssues as issues, safetyModule2PictogramDiagram as diagram } from "./safetyModule2.js";
import { findNoteSections, studyNotesByModule } from "./courseStudyNotes.js";
import { dashboardTests, savedTestSummary } from "./studyDashboard.js";
import { shufflePractice } from "../pages/safetyTestLogic.js";
import { newPracticeAttempt, savePracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";
import { newTypedAttempt, saveTypedAttempt, gradeTypedAnswer, recordTypedBest, loadTypedBest } from "../pages/typedPracticeLogic.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";

test("Safety 2 medium and hard banks cover the same 135 source-backed concepts across all five decks",()=>{
  assert.equal(choice.length,135);assert.equal(recall.length,135);
  assert.deepEqual(choice.map(q=>q.learningTarget),recall.map(q=>q.learningTarget));
  for(const bank of [choice,recall]) {
    assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
    assert.deepEqual([...new Set(bank.map(q=>q.source.deck))].sort(),Object.keys(sources).sort());
    for(const q of bank) {
      assert.ok(q.prompt && q.explanation.length>140,q.id);
      assert.ok(q.explanation.includes(sources[q.source.deck].title),q.id);
      assert.ok(q.source.slides.every(n=>Number.isInteger(n)&&n>=1&&n<=sources[q.source.deck].slides),q.id);
      if(q.options) {
        assert.equal(q.options.length,4,q.id);
        assert.equal(new Set(q.options.map(s=>s.toLowerCase())).size,4,q.id);
        assert.ok(!q.options.some(s=>/both [a-d] and [a-d]|of the above/i.test(s)),q.id);
      } else {
        assert.ok(!/\s/.test(q.answer),q.id);
        for(const answer of q.acceptedAnswers) assert.ok(gradeTypedAnswer(q,` ${answer.toUpperCase()} `),q.id);
        assert.equal(gradeTypedAnswer(q,"nonsense"),false);
      }
    }
  }
  for(const q of shufflePractice(choice,()=>0.4)) assert.equal(q.options[q.correctIndex],choice.find(original=>original.id===q.id).options[0]);
});

test("parts preserve every question exactly once per difficulty and register independent navigation/dashboard records",()=>{
  assert.equal(parts.length,8);
  assert.ok(!parts.some(p=>p.difficulty==="easy"));
  for(const [kind,bank] of [["choice",choice],["typed",recall]]) {
    const family=parts.filter(p=>p.kind===kind);
    assert.equal(family.length,4);
    assert.deepEqual(family.flatMap(p=>p.questions),bank);
    assert.ok(family.every(p=>p.questions.length<=39&&p.questions.length>0));
  }
  assert.equal(new Set(parts.map(p=>p.storageId)).size,parts.length);
  for(const p of parts) {
    assert.equal(dashboardTests.find(t=>t.path===p.path),p);
    assert.deepEqual(studyPracticeNavigation(p.path),{onPractice:true,testsPath:path});
  }
});

test("all questions, grouped concepts and source conflicts are searchable in the exact module, including the original chart",()=>{
  const notes=studyNotesByModule[path];
  for(const q of [...choice,...recall]) {
    const matches=findNoteSections(notes.sections,q.prompt).filter(s=>s.questionReference).flatMap(s=>s.items).filter(([label,text])=>label===q.prompt&&text.includes(q.explanation));
    assert.equal(matches.length,1,q.id);
  }
  for(const term of ["WHMIS","WSIB","OHSA","SCBA","GPU","RAT","LFL","UFL","LEL","TLV","PPE","right to know","right to participate","right to refuse","skin absorption","inhalation","ingestion","electrical energy","mechanical energy","hydraulic energy","pneumatic energy","chemical energy","thermal energy","gravitational energy","flow","flame over circle","corrosion","exclamation","biohazard","environment"]) assert.ok(findNoteSections(notes.sections,term).some(s=>!s.questionReference),term);
  assert.equal(issues.length,5);
  assert.ok(issues.some(([,text])=>text.includes("18–23%")&&text.includes("19.5%")));
  assert.ok(issues.some(([,text])=>text.includes("nine-section")&&text.includes("16-section")));
  assert.ok(issues.some(([,text])=>text.includes("braking")&&text.includes("slide 36")));
  assert.ok(existsSync(new URL(`../../public${diagram.src}`,import.meta.url)));
  assert.equal(notes.diagrams.whmisChart,diagram);
});

test("choice and hard progress resume separately and resetting attempts preserves each best score",()=>{
  const values=new Map(),storage={getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)};
  const c=parts.find(p=>p.kind==="choice"),t=parts.find(p=>p.kind==="typed");
  const attempt=newPracticeAttempt(c.questions,()=>0.3);
  attempt.answers[attempt.order[0].id]=attempt.order[0].correctIndex;
  savePracticeAttempt(c.questions,c.storageId,attempt,storage);
  assert.equal(savedTestSummary(c,storage).answered,1);
  assert.equal(savedTestSummary(t,storage).attempt,undefined);
  const typed=newTypedAttempt(t.questions);
  typed.draft="unfinished";
  saveTypedAttempt(t.questions,t.storageId,typed,storage);
  assert.equal(savedTestSummary(t,storage).unfinished,true);
  assert.equal(savedTestSummary(c,storage).answered,1);
  recordHighestScore(c.questions,c.storageId,20,storage);
  recordTypedBest(t.questions,t.storageId,18,storage);
  savePracticeAttempt(c.questions,c.storageId,newPracticeAttempt(c.questions),storage);
  saveTypedAttempt(t.questions,t.storageId,newTypedAttempt(t.questions),storage);
  assert.equal(loadHighestScore(c.questions,c.storageId,storage).score,20);
  assert.equal(loadTypedBest(t.questions,t.storageId,storage).score,18);
});
