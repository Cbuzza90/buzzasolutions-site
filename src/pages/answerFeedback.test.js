import { test } from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import process from "node:process";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { practiceBanksByModule } from "../data/practiceQuestionNotes.js";
import { newPracticeAttempt, savePracticeAttempt } from "./practiceProgress.js";
import { newTypedAttempt, saveTypedAttempt } from "./typedPracticeLogic.js";
import { newResistorAttempt, saveResistorAttempt } from "./resistorPracticeLogic.js";

let ui;
async function engines() {
  if (!ui) ui=(async()=>{
    const folder=resolve("tmp/answer-feedback-tests");
    await mkdir(folder,{recursive:true});
    const outfile=resolve(folder,"engines.mjs");
    await build({stdin:{contents:'export { default as Choice } from "./src/pages/MultipleChoicePractice.jsx"; export { default as Typed } from "./src/pages/TypedAnswerPractice.jsx"; export { default as Resistor } from "./src/pages/ResistorBandPractice.jsx";',resolveDir:process.cwd(),loader:"js"},outfile,bundle:true,platform:"node",format:"esm",packages:"external",jsx:"automatic",loader:{".css":"empty"},logLevel:"silent"});
    return import(pathToFileURL(outfile).href);
  })();
  return ui;
}
function storage() {
  const entries=new Map();
  return { getItem:key=>entries.get(key)??null,setItem:(key,value)=>entries.set(key,value) };
}
function render(Component,props,path) {
  return renderToStaticMarkup(createElement(MemoryRouter,{initialEntries:[path]},createElement(Component,props)));
}
test("all registered choice/recall questions include learning explanations rather than answer-only labels",()=>{
  const normalize=value=>String(value).toLowerCase().replace(/[^\p{L}\p{N}]/gu,"");
  let checked=0;
  for(const [path,banks] of Object.entries(practiceBanksByModule)) for(const bank of banks) for(const q of bank) {
    assert.ok(q.explanation?.trim(),`${path}: ${q.id}`);
    const answer=q.answer??q.options[q.correctIndex];
    assert.notEqual(normalize(q.explanation),normalize(answer),`${path}: ${q.id} only repeats its answer`);
    checked++;
  }
  assert.ok(checked>1000);
});
test("correct and incorrect choice/typed submissions offer a secondary learning dialog before Next Question",async()=>{
  const {Choice,Typed}=await engines();
  const previous=Object.getOwnPropertyDescriptor(globalThis,"localStorage");
  try {
    for(const correct of [true,false]) {
      const store=storage();Object.defineProperty(globalThis,"localStorage",{configurable:true,value:store});
      const path="/study/test/module-1/practice-1";
      const question={id:"learn",prompt:"Which path has the same current throughout?",options:["Series","Parallel","Open","Short"],correctIndex:0,explanation:"A series circuit has one path, so the same current passes through every component."};
      const attempt=newPracticeAttempt([question],()=>0.5);
      attempt.answers.learn=correct?attempt.order[0].correctIndex:(attempt.order[0].correctIndex+1)%4;
      savePracticeAttempt([question],path,attempt,store);
      const choice=render(Choice,{questions:[question],testNumber:1,course:"Test",basePath:"/study/test/module-1"},path);
      assert.ok(choice.includes(correct?"Correct!":"Not quite."));
      assert.ok(choice.includes(question.explanation));
      assert.match(choice,/<button type="button" class="study-primary" aria-haspopup="dialog">/);
      assert.match(choice,/<dialog class="study-answer-dialog study-learning-dialog" aria-labelledby=/);
      assert.ok(choice.includes("Back to my answer"));
      assert.ok(!choice.includes("What it means and why"));
      assert.ok(choice.indexOf("See notes")<choice.indexOf("See Results"));
      const word={id:"recall",prompt:"Name the single-path circuit.",answer:"series",acceptedAnswers:["series"],explanation:question.explanation};
      const typed=newTypedAttempt([word]);typed.answers.recall=correct?"series":"parallel";
      saveTypedAttempt([word],path,typed,store);
      const markup=render(Typed,{questions:[word],testNumber:1,course:"Test",basePath:"/study/test/module-1"},path);
      assert.ok(markup.includes(correct?"Correct!":"Not quite."));
      assert.ok(markup.includes(word.explanation));
      assert.match(markup,/<dialog class="study-answer-dialog study-learning-dialog" aria-labelledby=/);
      assert.ok(markup.indexOf("See notes")<markup.indexOf("See Results"));
    }
  } finally {
    if(previous) Object.defineProperty(globalThis,"localStorage",previous); else delete globalThis.localStorage;
  }
});
test("resistor feedback teaches band roles and worked limits for both correct and incorrect submissions",async()=>{
  const {Resistor}=await engines();
  const previous=Object.getOwnPropertyDescriptor(globalThis,"localStorage");
  try {
    for(const correct of [true,false]) {
      const store=storage();Object.defineProperty(globalThis,"localStorage",{configurable:true,value:store});
      const attempt=newResistorAttempt(()=>0.42), q=attempt.questions[0];
      attempt.answers=[{resistance:String(correct?q.expected.resistance:q.expected.resistance+1),tolerance:String(q.expected.tolerance),minimum:String(q.expected.minimum),maximum:String(q.expected.maximum),unit:"Ω"}];
      saveResistorAttempt(attempt,store);
      const markup=render(Resistor,{},"/study/electricity/module-1/resistor-band-calculations");
      assert.ok(markup.includes(correct?"All correct!":"Some answers need another look"));
      assert.ok(markup.includes("See notes"));
      assert.match(markup,/<dialog class="study-answer-dialog study-learning-dialog" aria-labelledby=/);
      assert.ok(!markup.includes("What it means and why"));
      assert.ok(markup.includes("significant digits"));
      assert.ok(markup.includes("permitted variation"));
      assert.ok(markup.includes("Subtract the tolerance for the lower limit"));
    }
  } finally {
    if(previous) Object.defineProperty(globalThis,"localStorage",previous); else delete globalThis.localStorage;
  }
});
