import { test } from "node:test";
import assert from "node:assert/strict";
import { findNoteSections } from "./courseStudyNotes.js";
import { decodeResistor, generateResistorQuestions, gradeResistor, resistanceText, resistorQuestion } from "./resistorBands.js";
import { loadResistorAttempt, loadResistorBest, newResistorAttempt, normalizeOhmAnswer, recordResistorBest, resistorScore, restoreResistorAttempt, saveResistorAttempt } from "../pages/resistorPracticeLogic.js";

test("the course chart's four- and five-band examples decode correctly", () => {
  const four = decodeResistor(["Red", "Red", "Black", "Gold"]);
  assert.equal(four.resistance, 22); assert.equal(four.tolerance, 5);
  assert.ok(Math.abs(four.minimum - 20.9) < 1e-10); assert.ok(Math.abs(four.maximum - 23.1) < 1e-10);
  const five = decodeResistor(["Red", "Red", "Black", "Brown", "Brown"]);
  assert.equal(five.resistance, 2200); assert.equal(five.tolerance, 1);
  assert.throws(() => decodeResistor(["Brown", "Black", "Black", "Orange", "Purple", "Orange"]), /band count/);
});

test("gold and silver are fractional multipliers and blank chart positions are rejected", () => {
  assert.equal(decodeResistor(["Brown", "Black", "Gold", "Gold"]).resistance, 1);
  assert.equal(decodeResistor(["Brown", "Black", "Silver", "Silver"]).resistance, 0.1);
  assert.throws(() => decodeResistor(["Gold", "Red", "Black", "Gold"]));
  assert.throws(() => decodeResistor(["Brown", "Black", "Grey", "Gold"]));
  assert.throws(() => decodeResistor(["Brown", "Black", "Red", "White"]));
  assert.throws(() => decodeResistor(["Brown", "Black", "Black", "Red", "Gold", "Blue"]));
});

test("random sets have 20 unique valid questions with a 10/10 four/five-band mix", () => {
  for (const random of [() => 0, () => 0.999, Math.random]) {
    const questions = generateResistorQuestions(random);
    assert.equal(questions.length, 20);
    assert.equal(new Set(questions.map(q => q.bands.join("|"))).size, 20);
    assert.deepEqual([4,5].map(count => questions.filter(q => q.bands.length === count).length), [10,10]);
    questions.forEach(q => {
      assert.deepEqual(q.expected, decodeResistor(q.bands));
      assert.ok(!/ppm|temperature|sixth/i.test(JSON.stringify(q)));
      assert.equal(q.studyNote[0], q.prompt);
      assert.ok(q.explanation.toLowerCase().includes("minimum") && q.explanation.toLowerCase().includes("maximum"));
    });
  }
});

test("numeric grading accepts equivalent units and grades each field independently", () => {
  const question = resistorQuestion(["Yellow", "Purple", "Red", "Gold"]);
  const answer = { unit: "kΩ", resistance: "4.7", tolerance: "5", minimum: "4.465", maximum: "4.935" };
  assert.equal(gradeResistor(question, answer).allCorrect, true);
  assert.equal(gradeResistor(question, { ...answer, unit: "Ω", resistance: "4700", minimum: "4465", maximum: "4935" }).allCorrect, true);
  const wrong = gradeResistor(question, { ...answer, tolerance: "10" });
  assert.equal(wrong.correct.resistance, true); assert.equal(wrong.correct.tolerance, false); assert.equal(wrong.allCorrect, false);
  for (const invalid of ["", "abc", "Infinity", "-4.7", "4.7k"]) assert.equal(gradeResistor(question, { ...answer, resistance: invalid }).valid, false);
});

function memoryStorage() {
  const data = new Map();
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), data };
}
function answerFor(question) {
  return { unit: "Ω", ...Object.fromEntries(Object.entries(question.expected).map(([field, value]) => [field, String(value)])) };
}
test("draft answers, order, completed results and highest scores survive reload and reset", () => {
  const storage = memoryStorage(), attempt = newResistorAttempt();
  attempt.draft.resistance = "47"; attempt.draft.unit = "kΩ";
  saveResistorAttempt(attempt, storage);
  const restored = loadResistorAttempt(storage);
  assert.deepEqual(restored, { ...attempt, draft: { ...attempt.draft, unit: "Ω", resistance: "47000" } });
  attempt.answers = attempt.questions.map(answerFor); attempt.position = 19; attempt.complete = true;
  assert.equal(resistorScore(attempt), 20);
  saveResistorAttempt(attempt, storage); recordResistorBest(20, storage);
  assert.equal(loadResistorAttempt(storage).complete, true);
  const reset = newResistorAttempt(); saveResistorAttempt(reset, storage);
  recordResistorBest(10, storage);
  assert.equal(loadResistorBest(storage).score, 20);
  assert.equal(loadResistorAttempt(storage).position, 0);
  const malformed = JSON.parse(storage.getItem([...storage.data.keys()].find(key => key.includes("resistor-progress"))));
  malformed.bands[0][0] = "Gold";
  assert.equal(restoreResistorAttempt(malformed), null);
  assert.equal(saveResistorAttempt(reset, { setItem() { throw new Error("Storage disabled"); } }), false);
});

test("every generated resistor has a searchable worked reference in the active attempt", () => {
  const questions = generateResistorQuestions();
  const reference = { id: "resistor-attempt-reference", title: "This resistor test", questionReference: true, items: questions.map(q => q.studyNote) };
  for (const q of questions) {
    const entry = findNoteSections([reference], q.prompt).flatMap(section => section.items).find(item => item[0] === q.prompt);
    assert.ok(entry);
    assert.equal(entry[1], q.explanation);
  }
});


test("all displayed resistance values use ohms and legacy saved answers retain their meaning", () => {
  assert.equal(resistanceText(4700), "4,700 Ω");
  assert.equal(resistanceText(1000000), "1,000,000 Ω");
  const q = resistorQuestion(["Yellow", "Purple", "Red", "Gold"]);
  for (const answer of [
    { unit: "kΩ", resistance: "4.7", minimum: "4.465", maximum: "4.935", tolerance: "5", temperature: "" },
    { unit: "MΩ", resistance: "0.0047", minimum: "0.004465", maximum: "0.004935", tolerance: "5", temperature: "" },
  ]) {
    const migrated = normalizeOhmAnswer(answer);
    assert.equal(migrated.unit, "Ω");
    assert.equal(Number(migrated.resistance), 4700);
    assert.equal(gradeResistor(q, migrated).allCorrect, true);
  }
  assert.equal(normalizeOhmAnswer({ unit: "kΩ", resistance: "1,000", minimum: "", maximum: "abc" }).resistance, "1000000");
  assert.equal(normalizeOhmAnswer({ unit: "kΩ", resistance: "", minimum: "", maximum: "" }).resistance, "");
  assert.ok(!q.explanation.includes("kΩ") && !q.explanation.includes("MΩ"));
});


test("legacy six-band progress migrates to five bands without losing answers, drafts or highest scores", () => {
  const storage = memoryStorage(), attempt = newResistorAttempt();
  attempt.questions[0] = resistorQuestion(["Brown", "Black", "Black", "Orange", "Purple"], 0);
  attempt.answers = [answerFor(attempt.questions[0])]; attempt.position = 1;
  attempt.draft.resistance = "123";
  saveResistorAttempt(attempt, storage); recordResistorBest(17, storage);
  const key = [...storage.data.keys()].find(key => key.includes("resistor-progress"));
  const record = JSON.parse(storage.getItem(key));
  record.bands[0].push("Orange"); record.answers[0].temperature = "wrong obsolete answer"; record.draft.temperature = "25";
  storage.setItem(key, JSON.stringify(record));
  const restored = loadResistorAttempt(storage);
  assert.equal(restored.position, 1);
  assert.equal(restored.questions[0].bands.length, 5);
  assert.equal(restored.draft.resistance, "123");
  assert.equal(restored.draft.temperature, undefined);
  assert.equal(restored.answers[0].temperature, undefined);
  assert.equal(resistorScore(restored), 1);
  assert.equal(loadResistorBest(storage).score, 17);
  saveResistorAttempt(restored, storage);
  assert.deepEqual(loadResistorAttempt(storage), restored);
});
