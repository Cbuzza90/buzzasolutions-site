import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { mathTest2Groups as groups, mathTest2Grouped as grouped } from "./mathTest2Grouped.js";
import { mathTest2, mathTest2Breakdown } from "./mathTest2.js";
import { mathTest2Extended } from "./mathTest2Extended.js";
import { dashboardTests, savedTestSummary } from "./studyDashboard.js";
import { findNoteSections, studyNotesByModule } from "./courseStudyNotes.js";
import { newPracticeAttempt, savePracticeAttempt, loadPracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";

const answer = q => q.options[q.correctIndex];
const numeric = q => Number.parseFloat(answer(q));
const bank = id => groups.find(g => g.id === id).questions;
const storage = () => { const map=new Map(); return { getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v) }; };
const close = (actual,expected,tolerance) => assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} ≠ ${expected}`);

test("five-of-each covers all source methods in 55 distinct five-question blocks", () => {
  assert.equal(groups.length,55);
  assert.equal(grouped.questions.length,275);
  assert.equal(new Set(grouped.questions.map(q=>q.id)).size,275);
  assert.equal(new Set(grouped.questions.map(q=>q.prompt)).size,275);
  for (const topic of mathTest2Breakdown) assert.ok(groups.some(g=>g.topic===topic.id),topic.id);
  for (const group of groups) {
    assert.equal(group.questions.length,5,group.id);
    for (const q of group.questions) {
      assert.equal(q.practiceGroup,group.id);
      assert.equal(q.practiceGroupTitle,group.title);
      assert.equal(q.options.length,4,q.id);
      assert.equal(new Set(q.options.map(s=>s.toLowerCase().trim())).size,4,q.id);
      assert.ok(q.source && q.explanation.length>140,q.id);
      assert.ok(q.explanation.includes(q.source),q.id);
      assert.ok(!q.options.some(s=>/both [a-d]|all of the above|none of the above/i.test(s)),q.id);
      assert.ok(!q.options.some(s=>/NaN|Infinity|undefined/.test(s)),q.id);
    }
  }
});

test("known review keys independently anchor every method, including all ten new examples", () => {
  const expected = {
    "simplify-ratio":"8:1",mixture:"10.00 oz","included-tax":"123.50 dollars",
    "percent-of":"250 birds","percent-number":"5.40","percent-compare":"144.83 %","reverse-percent":"105.71",
    "ratio-percent":"32 %","percent-ratio":"7.3","defective-percent":"7.94 %",
    "complement-percent":"95.0 %","decimal-percent":"12.5 %",mean:"20.50",
    "weighted-grade":"63.15 %","required-final":"77.00 %",dice:"1/3",
    "coins-at-least":"7/8","coins-exact":"5/16","coins-both":"15/16","coins-more-heads":"1/2",
    "pcr-swept-clearance":"10.000 :1","pcr-total-swept":"1.125 :1","pcr-total-clearance":"7.00 :1",
    "pcr-partial":"10.00 :1","pcr-clearance":"20.00 cc",
    "arc-length":"2.6 nm","arc-multiple-turns":"60.3 nm","arc-angle":"147.33 °",
    "degrees-radians":"1.134 rad","triangle-angle":"40 °","equilateral-area":"10.83 cm²",
    circle:"A = 28.27 cm²; C = 18.85 cm",distance:"4.5",midpoint:"(0.5, -1.0)",
    "right-triangle":"c = 13.00 cm; P = 30.00 cm; A = 30.00 cm²","missing-leg":"8.00 cm",
    prism:"519.62 in³",weight:"294.3 N",pressure:"0.625 kPa",potential:"8905.8 J",kinetic:"9409.9 J","stopping-energy":"100.00 kJ",
    "lifting-work":"86.328 kJ","imperial-work":"6178.85 ft·lbf","drop-speed":"44.29 m/s",
    "maximum-height":"36.47 m","impact-speed":"26.75 m/s",power:"177.67 W","power-time":"20.00 s",
    "engine-volume":"5026.55 in³","cylinder-volume":"70.93 in³","solve-bore":"3.64 in",
    "plank-pressure":"37.05 psi","plank-hp":"133.28 hp","plank-rpm":"3742 rpm",
  };
  assert.deepEqual(Object.keys(expected).sort(),groups.map(g=>g.id).sort());
  for (const [id,value] of Object.entries(expected)) assert.equal(answer(bank(id)[0]),value,id);
  close(39.3*23.1*9.81,8905.8123,1e-9);
  close((43.5/2)*20.8**2,9409.92,1e-9);
  assert.ok(bank("potential").every(q=>q.prompt.includes("g = 9.81")));
  assert.ok(bank("arc-multiple-turns").every(q=>q.prompt.includes("TOTAL") && q.explanation.includes("entire angle")));
});

test("all probability keys match enumerated outcomes, and each distractor is numerically different", () => {
  const value = s => { const [a,b]=s.split("/").map(Number); return a/b; };
  for (const id of ["coins-at-least","coins-exact","coins-both","coins-more-heads"]) {
    for (const q of bank(id)) {
      const [n,k] = q.prompt.match(/\d+/g).map(Number);
      const heads = Array.from({length:2**n},(_,i)=>i.toString(2).replaceAll("0","").length);
      const favourable = heads.filter(h=>id==="coins-at-least" ? h>=1 : id==="coins-exact" ? n-h===k : id==="coins-both" ? h>0 && h<n : h>n-h).length;
      assert.equal(value(answer(q)),favourable/heads.length,q.id);
      assert.equal(new Set(q.options.map(value)).size,4,q.id);
      assert.ok(q.options.every(o=>value(o)>=0 && value(o)<=1),q.id);
    }
  }
  for (const q of bank("dice")) {
    const threshold=Number(q.prompt.match(/at least (\d+)/)[1]);
    assert.equal(value(answer(q)),[1,2,3,4,5,6].filter(n=>n>=threshold).length/6);
  }
});

test("geometry and energy variants satisfy independent geometric and physical identities", () => {
  for (const q of bank("equilateral-area")) {
    const side=Number(q.prompt.match(/length (\d+)/)[1]),area=numeric(q);
    const height=2*area/side;
    close(height**2+(side/2)**2,side**2,.05);
  }
  for (const q of bank("potential")) {
    const [mass,height] = q.prompt.match(/\d+(?:\.\d+)?/g).map(Number);
    close(numeric(q)/mass/height,9.81,.001);
  }
  for (const q of bank("kinetic")) {
    const [mass,speed] = q.prompt.match(/\d+(?:\.\d+)?/g).map(Number);
    close(Math.sqrt(2*numeric(q)/mass),speed,.001);
  }
  for (const q of [...bank("arc-length"),...bank("arc-multiple-turns")]) {
    const [radius,degrees] = q.prompt.match(/\d+(?:\.\d+)?/g).map(Number);
    close(numeric(q)/(Math.PI*2*radius),degrees/360,.01);
  }
  for (const q of bank("solve-bore")) {
    const [volume,strokeFeet] = q.prompt.match(/\d+(?:\.\d+)?/g).map(Number);
    const recoveredVolume=Math.PI*(numeric(q)/2)**2*(strokeFeet*12);
    close(recoveredVolume,volume,1);
  }
  for (const q of bank("plank-rpm")) {
    const [hp,P,stroke,bore,k] = q.prompt.match(/\d+(?:\.\d+)?/g).map(Number);
    const recoveredHp=P*(stroke/12)*(Math.PI*bore*bore/4)*(numeric(q)/2)*k/33000;
    close(recoveredHp,hp,.5);
  }
});

test("attempts shuffle inside fixed blocks, persist across reload, and preserve independent high scores on reset", () => {
  const store=storage(), questions=grouped.questions;
  for (const random of [()=>0,()=>.37,()=>.99]) {
    const attempt=newPracticeAttempt(questions,random);
    for (let i=0;i<groups.length;i++) {
      const block=attempt.order.slice(i*5,i*5+5);
      assert.ok(block.every(q=>q.practiceGroup===groups[i].id));
      assert.deepEqual(new Set(block.map(q=>q.id)),new Set(groups[i].questions.map(q=>q.id)));
      for (const q of block) assert.equal(answer(q),answer(questions.find(source=>source.id===q.id)));
    }
  }
  const attempt=newPracticeAttempt(questions,()=>0);
  assert.notDeepEqual(attempt.order.slice(0,5).map(q=>q.id),questions.slice(0,5).map(q=>q.id));
  assert.notDeepEqual(attempt.order[0].options,questions.find(q=>q.id===attempt.order[0].id).options);
  attempt.position=7;
  attempt.answers=Object.fromEntries(attempt.order.slice(0,8).map(q=>[q.id,q.correctIndex]));
  savePracticeAttempt(questions,grouped.storageId,attempt,store);
  assert.deepEqual(loadPracticeAttempt(questions,grouped.storageId,store),attempt);
  assert.equal(savedTestSummary(grouped,store).answered,8);
  assert.equal(savedTestSummary(grouped,store).unfinished,true);
  for (const other of [mathTest2,mathTest2Extended]) {
    assert.equal(savedTestSummary(other,store).answered,0);
    recordHighestScore(other.questions,other.storageId,other.questions.length,store);
  }
  recordHighestScore(questions,grouped.storageId,250,store);
  savePracticeAttempt(questions,grouped.storageId,newPracticeAttempt(questions),store);
  assert.equal(savedTestSummary(grouped,store).answered,0);
  assert.equal(loadHighestScore(questions,grouped.storageId,store).score,250);
  for (const other of [mathTest2,mathTest2Extended]) assert.equal(loadHighestScore(other.questions,other.storageId,store).score,other.questions.length);
  const complete=newPracticeAttempt(questions);
  complete.position=questions.length-1; complete.complete=true;
  complete.answers=Object.fromEntries(complete.order.map(q=>[q.id,q.correctIndex]));
  savePracticeAttempt(questions,grouped.storageId,complete,store);
  assert.equal(loadPracticeAttempt(questions,grouped.storageId,store).complete,true);
});

test("every new question and important method is searchable in the exact Math module with the real format image", () => {
  const notes=studyNotesByModule[grouped.basePath];
  for (const q of grouped.questions) {
    const entries=findNoteSections(notes.sections,q.prompt).filter(s=>s.questionReference).flatMap(s=>s.items);
    assert.ok(entries.some(([label,text])=>label===q.prompt && text.includes(q.explanation) && text.includes(answer(q))),q.id);
  }
  for (const term of ["equilateral","501","88:12","39.3","43.5","Correctsvg"]) {
    assert.ok(findNoteSections(notes.sections,term).some(s=>!s.questionReference),term);
  }
  assert.equal(dashboardTests.find(t=>t.path===grouped.path),grouped);
  assert.deepEqual(studyPracticeNavigation(grouped.path),{onPractice:true,testsPath:grouped.basePath});
  const image=readFileSync(new URL("../../public/math/test-2-breakdown.webp",import.meta.url));
  assert.equal(image.toString("ascii",0,4),"RIFF");
  assert.equal(image.toString("ascii",8,12),"WEBP");
});
