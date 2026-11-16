import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { mathTest2, mathTest2Breakdown, mathTest2Questions as questions, mathTest2Diagrams, mathTest2Sources } from "./mathTest2.js";
import { studyNotesByModule, findNoteSections } from "./courseStudyNotes.js";
import { dashboardTests, savedTestSummary } from "./studyDashboard.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";
import { newPracticeAttempt, savePracticeAttempt, loadPracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";

const answer = id => { const q = questions.find(q => q.id === `math2-${id}`); assert.ok(q, id); return q.options[q.correctIndex]; };
const fixed = (value, digits = 2) => value.toFixed(digits);
const comma = value => fixed(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

test("Math Test 2 follows the newer 30-question breakdown with four distinct choices per item", () => {
  assert.equal(questions.length, 30);
  assert.equal(new Set(questions.map(q => q.id)).size, 30);
  assert.equal(mathTest2Breakdown.reduce((n, topic) => n + topic.count, 0), 30);
  assert.deepEqual(mathTest2Breakdown.map(t => t.count), [2,4,2,2,4,2,1,1,1,1,1,1,1,2,1,2,2]);
  for (const topic of mathTest2Breakdown) assert.equal(questions.filter(q => q.topic === topic.id).length, topic.count, topic.title);
  for (const q of questions) {
    assert.equal(q.options.length, 4, q.id);
    assert.equal(new Set(q.options.map(o => o.toLowerCase().trim())).size, 4, q.id);
    assert.ok(q.options[q.correctIndex] && q.explanation.length > 100, q.id);
    assert.ok(q.source && Object.values(mathTest2Sources).some(name => q.source.includes(name)), q.id);
    assert.ok(!q.options.some(o => /both [a-d]|all of the above|none of the above/i.test(o)), q.id);
  }
});

test("ratio, percentage, grade and probability keys agree with independent calculations", () => {
  assert.equal(answer("ratio-simplify"), `${320/40}:${40/40}`);
  assert.equal(answer("proportion-recipe"), `${60*(0.5/(1.75+0.5+0.75))} oz`);
  assert.equal(answer("tax-included"), `$${fixed(1073.5-1073.5/1.13)}`);
  assert.equal(answer("percent-of"), String(45*12/100));
  assert.equal(answer("percent-compare"), `${fixed(84/58*100)}%`);
  assert.equal(answer("percent-whole"), fixed(37/0.35));
  const weighted = [[54,90,15],[17,20,20],[18,50,25],[25,40,30],[94,100,10]].reduce((sum,[earned,total,weight])=>sum+earned/total*weight,0);
  assert.equal(answer("weighted-grade"), `${fixed(weighted)}%`);
  const remaining = (80-(78*.15+69*.15+84*.25+100*.10))/.35;
  assert.equal(answer("required-final"), `${Math.round(remaining)}%`);
  const die = [1,2,3,4,5,6].filter(n=>n>=5).length/6;
  const sequences = Array.from({length:8},(_,i)=>i.toString(2).padStart(3,"0"));
  assert.equal(die, 1/3); assert.equal(answer("die-at-least"), "1/3");
  assert.equal(sequences.filter(s=>s.includes("1")).length/sequences.length, 7/8);
  assert.equal(answer("coins-at-least"), "7/8");
});

test("compression and geometry keys use total/clearance, full precision and correct units", () => {
  assert.equal(answer("pcr-displacement"), `${(108+12)/12}:1`);
  assert.equal(answer("pcr-total"), `${90/(90-10)}:1`);
  assert.equal(answer("pcr-partial-volume"), `${140/.7/20}:1`);
  assert.match(questions.find(q=>q.id==="math2-pcr-partial-volume").prompt, /TOTAL volume \(not 70% of stroke\)/);
  assert.equal(answer("pcr-lecture"), `${fixed((94+12)/12,3)}:1`);
  assert.equal(answer("arc-length"), `${fixed(120/360*2*Math.PI*3)} cm`);
  assert.equal(answer("triangle-angle"), `${180-35-105}°`);
  assert.equal(answer("circle-area"), `A = ${fixed(Math.PI*3**2)} cm²; C = ${fixed(2*Math.PI*3)} cm`);
  assert.equal(answer("coordinates"), `AB = ${Math.hypot(3-0,3-(-1))}; M = (${(3+0)/2}, ${(3-1)/2})`);
  assert.equal(answer("right-triangle"), `P = ${5+12+Math.hypot(5,12)} cm; A = ${5*12/2} cm²`);
});

test("physics, engine volume and PLANK keys independently check conversions and rearrangement", () => {
  const g=9.81;
  assert.equal(answer("weight"), `${30*g} N`);
  assert.equal(answer("pad-pressure"), `${fixed(18*g/(Math.PI*(30/100)**2)/1000,3)} kPa`);
  assert.equal(answer("potential"), `${(100*g*2).toLocaleString("en-US")} J`);
  assert.equal(answer("climber-work"), `${fixed((78+10)*g*100/1000,3)} kJ`);
  assert.equal(answer("drop-speed"), `${fixed(Math.sqrt(2*g*100))} m/s`);
  assert.equal(answer("roof-height"), `${fixed(25+15**2/(2*g))} m`);
  assert.equal(answer("bulb-time"), `${2000/100} s`);
  assert.equal(answer("engine-volume-review"), `${comma(8*Math.PI*(10/2)**2*8)} in³`);
  assert.equal(answer("engine-volume-lecture"), `${comma(12*Math.PI*(4/2)**2*4)} in³`);
  // Check pressure by recovering the stated horsepower, not only the rearranged expression.
  const pressure = Number.parseFloat(answer("plank-pressure"));
  const recoveredHp = pressure*(18/12)*(Math.PI*((.75*12)/2)**2)*(2800/2)*12/33000;
  assert.ok(Math.abs(recoveredHp-1800)<0.1);
  assert.equal(answer("plank-horsepower"), `${comma(200*(48/12)*(Math.PI*(12/2)**2)*(2400/2)*12/33000)} hp`);
  assert.ok(questions.filter(q=>q.topic==="plank").every(q=>/four-stroke/.test(q.prompt)));
});

test("every Math item has exact-module references and the formula/diagram assets exist", () => {
  const notes = studyNotesByModule[mathTest2.basePath];
  for (const q of questions) assert.ok(findNoteSections(notes.sections,q.prompt).some(s=>s.questionReference && s.items.some(([p,text])=>p===q.prompt && text.includes(q.explanation))),q.id);
  for (const term of ["PLANK", "N ·", "included tax", "clearance", "midpoint", "conservation", "odds", "four-stroke", "Source checks", "weighted", "57.14", "95:5"]) assert.ok(findNoteSections(notes.sections,term).some(s=>!s.questionReference),term);
  for (const d of Object.values(mathTest2Diagrams)) {
    const file=readFileSync(new URL(`../../public${d.src}`,import.meta.url));
    assert.equal(file.toString("ascii",0,4),"RIFF");
    assert.equal(file.toString("ascii",8,12),"WEBP");
    assert.ok(d.crop.width>0 && d.crop.height>0 && d.crop.imageWidth===d.crop.width);
  }
  const checks=notes.sections.find(s=>s.id==="math2-source-checks").items.flat().join(" ");
  for (const term of ["25", "30", "2-cycle", "1.125:1", "Geometry p33"]) assert.ok(checks.includes(term),term);
});

test("Math shuffles, resumes, resets without losing best score, and appears in module navigation", () => {
  const records=new Map(), storage={getItem:key=>records.get(key)??null,setItem:(key,value)=>records.set(key,value)};
  assert.equal(dashboardTests.find(t=>t.path===mathTest2.path),mathTest2);
  assert.deepEqual(studyPracticeNavigation(mathTest2.path),{onPractice:true,testsPath:mathTest2.basePath});
  const attempt=newPracticeAttempt(questions,()=>.37);
  assert.notDeepEqual(attempt.order.map(q=>q.id),questions.map(q=>q.id));
  for (const q of attempt.order) assert.equal(q.options[q.correctIndex],answer(q.id.replace("math2-","")));
  const first=attempt.order[0]; attempt.answers[first.id]=first.correctIndex;
  savePracticeAttempt(questions,mathTest2.storageId,attempt,storage);
  assert.deepEqual(loadPracticeAttempt(questions,mathTest2.storageId,storage),attempt);
  assert.equal(savedTestSummary(mathTest2,storage).unfinished,true);
  recordHighestScore(questions,mathTest2.storageId,27,storage);
  savePracticeAttempt(questions,mathTest2.storageId,newPracticeAttempt(questions),storage);
  assert.equal(savedTestSummary(mathTest2,storage).answered,0);
  assert.equal(loadHighestScore(questions,mathTest2.storageId,storage).score,27);
});
