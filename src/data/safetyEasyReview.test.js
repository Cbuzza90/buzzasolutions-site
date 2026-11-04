import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { safetyEasyReviewQuestions as bank, safetyEasyReviewParts as parts, safetyEasyReviewDiagrams as diagrams } from "./safetyEasyReview.js";
import { safetyModule2Parts } from "./safetyModule2.js";
import { studyNotesByModule, findNoteSections } from "./courseStudyNotes.js";
import { dashboardTests, savedTestSummary } from "./studyDashboard.js";
import { shufflePractice } from "../pages/safetyTestLogic.js";
import { newPracticeAttempt, savePracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";

test("Easy Safety review expands the supplied grouped material into 132 independent keyed questions",()=>{
  assert.equal(bank.length,132);
  assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
  for(const q of shufflePractice(bank,()=>0.4)) {
    const original=bank.find(item=>item.id===q.id);
    assert.equal(q.options.length,4,q.id);
    assert.equal(new Set(q.options.map(s=>s.toLowerCase().trim())).size,4,q.id);
    assert.equal(q.options[q.correctIndex],original.options[0],q.id);
    assert.ok(q.explanation.length>130,q.id);
    assert.ok(q.source.slides.every(n=>Number.isInteger(n)&&n>=1&&n<=76));
    assert.ok(!q.options.some(s=>/both [a-d] and [a-d]|of the above/i.test(s)));
  }
  for(const [prefix,count] of [["old-msds",9],["symbol",9],["legacy",3],["fluid-line",16],["danger",10],["attach",5]]) assert.equal(bank.filter(q=>q.id.startsWith(`safety2-easy-${prefix}-`)).length,count,prefix);
  const oxygen=bank.find(q=>q.id.endsWith("oxygen-student"));
  assert.equal(oxygen.options[0],"19.5% to 23%");
  assert.match(oxygen.explanation,/student.*slide 39/i);
  assert.ok(bank.filter(q=>q.id.includes("old-msds")).every(q=>q.prompt.includes("older nine-heading")&&q.explanation.includes("sixteen-section")));
  assert.ok(bank.filter(q=>q.id.includes("legacy-")).every(q=>q.prompt.includes("older WHMIS")));
});

test("review questions and original diagrams are searchable with valid unlabelled identification crops",()=>{
  const notes=studyNotesByModule["/study/safety/module-2"];
  for(const q of bank) {
    assert.ok(findNoteSections(notes.sections,q.prompt).filter(s=>s.questionReference).flatMap(s=>s.items).some(([prompt,text])=>prompt===q.prompt&&text.includes(q.explanation)),q.id);
    if(q.diagram) {
      assert.ok(existsSync(new URL(`../../public${q.diagram.src}`,import.meta.url)));
      const {x,y,width,height,imageWidth}=q.diagram.crop;
      assert.ok(x>=0&&y>=0&&width>0&&height>0&&x+width<=imageWidth,q.id);
      assert.ok(y+height<=(imageWidth===1505?932:imageWidth===1060?500:368),q.id);
    }
  }
  for(const [key,diagram] of Object.entries(diagrams)) assert.equal(notes.diagrams[key],diagram);
  for(const term of ["Class A","first aid measures","preparation information","torque links","supervisor","JHSC","spontaneous combustion","Fuel","Lubrication","Breathing oxygen","Deicing","Hydraulic","Instrument air"]) assert.ok(findNoteSections(notes.sections,term).some(s=>!s.questionReference),term);
});

test("easy parts include every review question without changing Medium/Hard keys, scores or routes",()=>{
  assert.equal(parts.length,4);assert.ok(parts.every(p=>p.questions.length===33&&p.difficulty==="easy"));
  assert.deepEqual(parts.flatMap(p=>p.questions),bank);
  const all=[...parts,...safetyModule2Parts];
  assert.equal(new Set(all.map(p=>p.storageId)).size,all.length);
  const values=new Map(),storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};
  for(const p of parts) {
    assert.equal(dashboardTests.find(t=>t.path===p.path),p);
    assert.deepEqual(studyPracticeNavigation(p.path),{onPractice:true,testsPath:p.basePath});
    const attempt=newPracticeAttempt(p.questions,()=>0.4);
    attempt.answers[attempt.order[0].id]=attempt.order[0].correctIndex;
    savePracticeAttempt(p.questions,p.storageId,attempt,storage);
    assert.equal(savedTestSummary(p,storage).answered,1);
    recordHighestScore(p.questions,p.storageId,25,storage);
    savePracticeAttempt(p.questions,p.storageId,newPracticeAttempt(p.questions),storage);
    assert.equal(loadHighestScore(p.questions,p.storageId,storage).score,25);
  }
  assert.ok(safetyModule2Parts.every(p=>savedTestSummary(p,storage).attempt===undefined));
});
