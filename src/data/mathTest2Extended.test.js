import test from "node:test";
import assert from "node:assert/strict";
import { mathTest2, mathTest2Breakdown } from "./mathTest2.js";
import { mathTest2AdditionalQuestions as extra, mathTest2Extended as extended } from "./mathTest2Extended.js";
import { dashboardTests, savedTestSummary } from "./studyDashboard.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";
import { newPracticeAttempt, savePracticeAttempt, loadPracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";

const fixed = (value, digits = 2) => value.toFixed(digits);
const answer = id => { const q=extra.find(q=>q.id===`math2-extra-${id}`); assert.ok(q,id); return q.options[q.correctIndex]; };

test("extended Math doubles the breakdown using 30 original and 30 distinct additional questions", () => {
  assert.equal(extra.length,30);
  assert.equal(extended.questions.length,60);
  assert.deepEqual(extended.questions.slice(0,30),mathTest2.questions);
  assert.equal(new Set(extended.questions.map(q=>q.id)).size,60);
  assert.equal(new Set(extended.questions.map(q=>q.prompt)).size,60);
  for (const topic of mathTest2Breakdown) assert.equal(extended.questions.filter(q=>q.topic===topic.id).length,2*topic.count,topic.id);
  for (const q of extra) {
    assert.equal(q.options.length,4,q.id);
    assert.equal(new Set(q.options.map(o=>o.toLowerCase().trim())).size,4,q.id);
    assert.ok(q.options[q.correctIndex] && q.explanation.length>100 && q.source,q.id);
    assert.ok(!q.options.some(o=>/both [a-d]|all of the above|none of the above/i.test(o)),q.id);
  }
});

test("additional arithmetic, percentage and probability answers follow the source values", () => {
  assert.equal(answer("three-part-ratio"),[160,32,4].map(n=>n/4).join(":"));
  assert.equal(answer("bottle-share"),`${fixed(1/(1.78+1)*100)}%`);
  assert.equal(answer("green-percent"),`${12/(12+13)*100}%`);
  assert.equal(answer("defective-percent"),`${fixed(27/340*100)}%`);
  assert.equal(answer("decimal-percent"),`${.125*100}%`);
  assert.equal(answer("functioning-percent"),`${100-5}%`);
  assert.equal(answer("arithmetic-mean"),String([24,10,12,36].reduce((a,b)=>a+b,0)/4));
  assert.equal(answer("weighted-lecture"),`${fixed(30/75*30+40/60*30+60/90*40)}%`);
  const flips=Array.from({length:32},(_,n)=>n.toString(2).padStart(5,"0"));
  assert.equal(flips.filter(s=>s.replaceAll("1","").length===2).length/32,5/16);
  assert.equal(answer("five-coins-two-tails"),"5/16");
  assert.equal(flips.filter(s=>s.includes("1") && s.includes("0")).length/32,15/16);
  assert.equal(answer("five-coins-both"),"15/16");
});

test("additional compression and geometry answers use the stated quantity and angle units", () => {
  assert.equal(answer("pcr-bdc-tdc"),`${140/20}:1`);
  assert.equal(answer("pcr-small-cylinder"),`${(13+1)/1}:1`);
  assert.equal(answer("pcr-clearance"),`${140/7} cc`);
  assert.equal(answer("pcr-partial-lecture"),`${fixed(183/.73/15)}:1`);
  assert.equal(answer("arc-angle-degrees"),`${fixed(5.4/2.1*180/Math.PI)}°`);
  assert.equal(answer("degree-radian"),`${fixed(65*Math.PI/180,3)} rad`);
  assert.equal(answer("diameter-circle"),`A = ${fixed(Math.PI*(4/2)**2)} ft²; C = ${fixed(Math.PI*4)} ft`);
  assert.equal(answer("coordinate-second-pair"),`M = (${(10-4)/2}, ${(22+2)/2}); AB = ${fixed(Math.hypot(10-(-4),22-2))}`);
  assert.equal(answer("missing-leg"),`${Math.sqrt(10**2-6**2)} cm`);
});

test("additional physics and engine keys check conversions, inverse formulas and calculator pi", () => {
  const g=9.81;
  assert.equal(answer("box-weight"),`${fixed(52*g)} N`);
  assert.equal(answer("piston-pressure"),`${fixed(700*g/(Math.PI*(.5/2)**2)/1000)} kPa`);
  assert.equal(answer("climber-potential"),`${fixed(70*g*23/1000,3)} kJ`);
  assert.equal(answer("imperial-work"),`${(323.5*19.1).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} ft·lbf`);
  assert.equal(answer("car-energy"),`${Math.round(.5*720*(60/3.6)**2/1000)} kJ`);
  assert.equal(answer("roof-impact-speed"),`${fixed(Math.sqrt(15**2+2*g*25))} m/s`);
  assert.equal(answer("energy-power"),`${fixed(764/4.3)} W`);
  assert.equal(answer("cylinder-displacement"),`${fixed(Math.PI*(4.25/2)**2*5)} in³`);
  assert.equal(answer("solve-bore"),`${fixed(2*Math.sqrt(100/(Math.PI*(.8*12))))} in`);
  assert.equal(answer("lecture-horsepower"),`${fixed(160*(7/12)*Math.PI*(5/2)**2*(1200/2)*4/33000)} hp`);
  const rpm=Math.round(2*2400*33000/(200*(11/12)*Math.PI*(7/2)**2*6));
  assert.equal(answer("solve-rpm"),`${rpm.toLocaleString("en-US")} rpm`);
  const recovered=200*(11/12)*Math.PI*(7/2)**2*(rpm/2)*6/33000;
  assert.ok(Math.abs(recovered-2400)<1);
});

test("extended and original Math attempts, reset and highest scores are independent", () => {
  const map=new Map(), storage={getItem:key=>map.get(key)??null,setItem:(key,value)=>map.set(key,value)};
  assert.notEqual(extended.storageId,mathTest2.storageId);
  assert.equal(dashboardTests.find(t=>t.path===extended.path),extended);
  assert.deepEqual(studyPracticeNavigation(extended.path),{onPractice:true,testsPath:extended.basePath});
  const original=newPracticeAttempt(mathTest2.questions,()=>.37),long=newPracticeAttempt(extended.questions,()=>.57);
  original.answers[original.order[0].id]=original.order[0].correctIndex;
  long.answers[long.order[0].id]=long.order[0].correctIndex;
  long.answers[long.order[1].id]=long.order[1].correctIndex;
  long.position=2;
  savePracticeAttempt(mathTest2.questions,mathTest2.storageId,original,storage);
  savePracticeAttempt(extended.questions,extended.storageId,long,storage);
  assert.deepEqual(loadPracticeAttempt(extended.questions,extended.storageId,storage),long);
  assert.equal(savedTestSummary(mathTest2,storage).answered,1);
  assert.equal(savedTestSummary(extended,storage).answered,2);
  recordHighestScore(mathTest2.questions,mathTest2.storageId,27,storage);
  recordHighestScore(extended.questions,extended.storageId,55,storage);
  savePracticeAttempt(extended.questions,extended.storageId,newPracticeAttempt(extended.questions),storage);
  assert.deepEqual(loadPracticeAttempt(mathTest2.questions,mathTest2.storageId,storage),original);
  assert.equal(savedTestSummary(extended,storage).answered,0);
  assert.equal(loadHighestScore(extended.questions,extended.storageId,storage).score,55);
  assert.equal(loadHighestScore(mathTest2.questions,mathTest2.storageId,storage).score,27);
});
