import { test } from "node:test";
import assert from "node:assert/strict";
import { enginesReviewQuestions as review, enginesAllNotesQuestions as all, enginesLectureQuestions as lecture, enginesTest2Path as path } from "./enginesTest2.js";
import { studyNotesByModule, findNoteSections } from "./courseStudyNotes.js";
import { dashboardTests } from "./studyDashboard.js";
import { newPracticeAttempt, savePracticeAttempt, restorePracticeAttempt, readPracticeRecord, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";
import { shufflePractice } from "../pages/safetyTestLogic.js";

test("Engines review stays within Section 1, covers every review entry and expands grouped concepts", () => {
  assert.equal(review.length, 61);
  assert.ok(review.every(q => q.source.section === "review"));
  assert.deepEqual([...new Set(review.map(q => q.source.reviewNumber))].sort((a,b) => a-b), Array.from({length:31},(_,i)=>i+1));
  for (const [number, count] of [[2,3],[4,6],[9,2],[10,2],[13,2],[26,2]]) assert.equal(review.filter(q => q.source.reviewNumber === number).length, count);
  assert.ok(review.every(q => q.source.slide > 0 && q.source.slide <= 34));
  assert.ok(!review.some(q => q.source.section === "lecture"));
});

test("both Engines banks have unique questions, four distinct choices and stable answer keys after shuffling", () => {
  assert.equal(all.length, 106);
  assert.equal(lecture.length, 45);
  assert.deepEqual(all.slice(0,review.length), review);
  assert.equal(new Set(all.map(q=>q.topic)).size,11);
  for (const bank of [review, all]) {
    assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
    for (const q of bank) {
      assert.equal(q.options.length,4,q.id);
      assert.equal(new Set(q.options.map(text=>text.trim().toLowerCase())).size,4,q.id);
      assert.ok(q.options[q.correctIndex] && q.explanation && q.prompt,q.id);
      assert.ok(q.source.page >= 1 && q.source.page <= 3,q.id);
      assert.ok(!q.options.some(option=>/both [a-d] and [a-d]|all of the above/i.test(option)),q.id);
    }
    for (const shuffled of shufflePractice(bank,()=>0.5)) {
      const source=bank.find(q=>q.id===shuffled.id);
      assert.equal(shuffled.options[shuffled.correctIndex],source.options[source.correctIndex]);
    }
  }
  const answer=target=>{const q=all.find(q=>q.learningTarget===target);return q.options[q.correctIndex];};
  assert.equal(answer("winter-w"),"Winter use");
  assert.equal(answer("aviation-w"),"Ashless dispersant");
  assert.equal(answer("clogged-filter-scenario"),"Oil-filter bypass valve");
  assert.equal(answer("cold-core-scenario"),"Thermostatic bypass valve");
  assert.equal(answer("congealed-core-scenario"),"Oil-cooler surge-protection valve");
});

test("all Engines questions are searchable once in exact Test 2 notes, with grouped facts and ambiguities retained", () => {
  const notes=studyNotesByModule[path];
  assert.ok(notes.basis.includes("31 review entries"));
  assert.equal(new Set(notes.sections.map(s=>s.id)).size,notes.sections.length);
  for(const q of all) {
    const references=findNoteSections(notes.sections,q.prompt).filter(s=>s.questionReference).flatMap(s=>s.items);
    const matched=references.filter(item=>item[0]===q.prompt && item[1].includes(q.explanation));
    assert.equal(matched.length,1,q.id);
    assert.ok(matched[0][1].includes(q.options[q.correctIndex]),q.id);
  }
  for (const term of ["hydraulic lock","sliding","rolling","wiping","friction reduction","cooling","corrosion protection","cleaning","cushioning","sealing","cloud point","pour point","flash point","fire point","viscosity","SUS","VI","W100","20W50","wet sump","dry sump","screen","Cuno","canister","spin-on","pressure relief","filter bypass","thermostatic","surge","dilution"]) {
    assert.ok(findNoteSections(notes.sections,term).some(s=>!s.questionReference),term);
  }
  assert.ok(notes.sections.flatMap(s=>s.items).some(([label,text])=>label.includes("Expansion-space") && text.includes("unclear")));
});

test("Engines tests save and resume independently, and reset preserves both highest scores", () => {
  const values=new Map(),storage={getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)};
  const records=[dashboardTests.find(t=>t.slug==="engines-review"),dashboardTests.find(t=>t.slug==="engines-notes")];
  assert.notEqual(records[0].storageId,records[1].storageId);
  for (const [index,record] of records.entries()) {
    assert.equal(record.path,`${path}/practice-${index+1}`);
    const attempt=newPracticeAttempt(record.questions,()=>0.4);
    attempt.answers[attempt.order[0].id]=attempt.order[0].correctIndex;attempt.position=1;
    savePracticeAttempt(record.questions,record.storageId,attempt,storage);
    assert.deepEqual(restorePracticeAttempt(record.questions,readPracticeRecord("progress",record.storageId,storage)),attempt);
    recordHighestScore(record.questions,record.storageId,record.questions.length-2,storage);
    savePracticeAttempt(record.questions,record.storageId,newPracticeAttempt(record.questions),storage);
  }
  for(const record of records) assert.equal(loadHighestScore(record.questions,record.storageId,storage).score,record.questions.length-2);
});
