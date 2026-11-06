import { test } from "node:test";
import assert from "node:assert/strict";
import { aerodynamicsTestFamilies, aerodynamicsTestParts } from "./aerodynamicsTestParts.js";
import { dashboardTests, savedTestSummary } from "./studyDashboard.js";
import { migrateAerodynamicsParts } from "../pages/aerodynamicsPartProgress.js";
import { newPracticeAttempt, savePracticeAttempt, restorePracticeAttempt, readPracticeRecord, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";
import { newTypedAttempt, saveTypedAttempt, restoreTypedAttempt, recordTypedBest, loadTypedBest } from "../pages/typedPracticeLogic.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";
const memory = () => {
  const entries = new Map();
  return { getItem:key=>entries.get(key)??null, setItem:(key,value)=>entries.set(key,value) };
};
test("all Aerodynamics questions survive in fixed balanced parts capped at 39, with independent navigation/storage", () => {
  assert.deepEqual(aerodynamicsTestFamilies.map(f=>f.parts.length),[4,9,8]);
  assert.equal(aerodynamicsTestParts.length,21);
  assert.equal(new Set(aerodynamicsTestParts.map(p=>p.path)).size,21);
  assert.equal(new Set(aerodynamicsTestParts.map(p=>p.storageId)).size,21);
  for (const family of aerodynamicsTestFamilies) {
    assert.deepEqual(family.parts.flatMap(p=>p.questions),family.questions);
    assert.equal(new Set(family.parts.flatMap(p=>p.questions.map(q=>q.id))).size,family.questions.length);
    const counts=family.parts.map(p=>p.questions.length);
    assert.ok(Math.max(...counts)<=39 && Math.min(...counts)>0);
    assert.ok(Math.max(...counts)-Math.min(...counts)<=1);
    assert.equal(studyPracticeNavigation(family.path).onPractice,false);
    for (const part of family.parts) {
      assert.ok(dashboardTests.some(t=>t.storageId===part.storageId));
      assert.deepEqual(studyPracticeNavigation(part.path),{onPractice:true,testsPath:family.path});
    }
  }
  assert.equal(studyPracticeNavigation("/study/electricity/module-1/resistor-band-calculations").onPractice,true);
  assert.equal(studyPracticeNavigation("/study/structures/module-2/torque-bolt-nut").onPractice,true);
});
test("a paused shuffled full choice attempt transfers the exact choices and grading into the appropriate parts", () => {
  const storage=memory(), family=aerodynamicsTestFamilies.find(f=>f.id==="review");
  const old=newPracticeAttempt(family.questions,()=>0.34);
  old.position=40;
  for (const q of old.order.slice(0,41)) old.answers[q.id]=(q.correctIndex+1)%4;
  savePracticeAttempt(family.questions,family.fullKey,old,storage);
  recordHighestScore(family.questions,family.fullKey,100,storage);
  migrateAerodynamicsParts(storage);
  let transferred=0;
  for (const part of family.parts) {
    const migrated=restorePracticeAttempt(part.questions,readPracticeRecord("progress",part.storageId,storage));
    if (!migrated) continue;
    for (const [id,answer] of Object.entries(migrated.answers)) {
      const before=old.order.find(q=>q.id===id), after=migrated.order.find(q=>q.id===id);
      assert.equal(answer,old.answers[id]); assert.deepEqual(after.options,before.options);
      assert.equal(after.correctIndex,before.correctIndex); transferred++;
    }
    const saved=storage.getItem(`study-practice:progress:${part.storageId}`);
    migrateAerodynamicsParts(storage);
    assert.equal(storage.getItem(`study-practice:progress:${part.storageId}`),saved);
  }
  assert.equal(transferred,41);
  assert.equal(loadHighestScore(family.questions,family.fullKey,storage).score,100);
});
test("typed draft stays only with its question's part and part reset preserves all best records", () => {
  const storage=memory(), family=aerodynamicsTestFamilies.find(f=>f.id==="word");
  const old=newTypedAttempt(family.questions,()=>0.42);
  old.position=4; old.draft="in progress";
  for (const q of old.order.slice(0,4)) old.answers[q.id]=q.answer;
  saveTypedAttempt(family.questions,family.fullKey,old,storage);
  recordTypedBest(family.questions,family.fullKey,200,storage);
  migrateAerodynamicsParts(storage);
  const draftPart=family.parts.find(p=>p.questions.some(q=>q.id===old.order[4].id));
  const migrated=restoreTypedAttempt(draftPart.questions,readPracticeRecord("typed-progress",draftPart.storageId,storage));
  assert.equal(migrated.draft,"in progress");
  assert.equal(migrated.order[migrated.position].id,old.order[4].id);
  for(const part of family.parts.filter(p=>p!==draftPart)) {
    const value=restoreTypedAttempt(part.questions,readPracticeRecord("typed-progress",part.storageId,storage));
    assert.ok(!value?.draft);
  }
  recordTypedBest(draftPart.questions,draftPart.storageId,10,storage);
  saveTypedAttempt(draftPart.questions,draftPart.storageId,newTypedAttempt(draftPart.questions),storage);
  migrateAerodynamicsParts(storage);
  assert.equal(savedTestSummary(draftPart,storage).answered,0);
  assert.equal(loadTypedBest(draftPart.questions,draftPart.storageId,storage).score,10);
  assert.equal(loadTypedBest(family.questions,family.fullKey,storage).score,200);
});
test("fully answered parts get their actual result; completing/resetting one part does not overwrite another", () => {
  const storage=memory(), family=aerodynamicsTestFamilies.find(f=>f.id==="choice");
  const old=newPracticeAttempt(family.questions,()=>0.65);
  old.answers=Object.fromEntries(old.order.map(q=>[q.id,q.correctIndex]));
  old.position=old.order.length-1;old.complete=true;
  savePracticeAttempt(family.questions,family.fullKey,old,storage);
  migrateAerodynamicsParts(storage);
  for(const part of family.parts) {
    const result=savedTestSummary(part,storage);
    assert.equal(result.complete,true);assert.equal(result.best.score,part.questions.length);
  }
  const [first,second]=family.parts;
  savePracticeAttempt(first.questions,first.storageId,newPracticeAttempt(first.questions),storage);
  migrateAerodynamicsParts(storage);
  assert.equal(savedTestSummary(first,storage).answered,0);
  assert.equal(savedTestSummary(second,storage).complete,true);
  assert.equal(savedTestSummary(first,storage).best.score,first.questions.length);
});
