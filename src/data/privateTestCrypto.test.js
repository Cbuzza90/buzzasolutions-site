import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createPrivateEnvelope, privateTestKey, openPrivateData, privateProgressStorage } from "./privateTestCrypto.js";
import { newPracticeAttempt, savePracticeAttempt, loadPracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";
import { practiceQuestionNotes } from "./practiceQuestionNotes.js";
import { studyNotesByModule, findNoteSections } from "./courseStudyNotes.js";

test("private data requires the exact password and rejects altered ciphertext", async () => {
  const payload = { text: "Private test fixture content" };
  const envelope = await createPrivateEnvelope(payload, "Fixture-password");
  assert.ok(!JSON.stringify(envelope).includes(payload.text));
  const key = await privateTestKey("Fixture-password", envelope.salt);
  assert.deepEqual(await openPrivateData(envelope, key), payload);
  await assert.rejects(openPrivateData(envelope, await privateTestKey("fixture-password", envelope.salt)));
  const changed = (envelope.ciphertext[0] === "A" ? "B" : "A") + envelope.ciphertext.slice(1);
  await assert.rejects(openPrivateData({ ...envelope, ciphertext: changed }, key));
});

test("private attempts and high scores persist encrypted, resume after unlocking, and survive reset", async () => {
  const records = new Map();
  const backing = { getItem: key => records.get(key) ?? null, setItem: (key, value) => records.set(key, value) };
  const envelope = await createPrivateEnvelope({}, "Fixture-password");
  const key = await privateTestKey("Fixture-password", envelope.salt);
  const storage = await privateProgressStorage(key, backing);
  const bank = [{ id: "private-fixture", prompt: "Private fixture question", options: ["Private fixture correct", "Fixture two", "Fixture three", "Fixture four"], correctIndex: 0, explanation: "Fixture explanation only." }];
  const id = "/study/electricity/module-2/private-test:v1";
  const attempt = newPracticeAttempt(bank, () => 0.37);
  attempt.answers[attempt.order[0].id] = attempt.order[0].correctIndex;
  savePracticeAttempt(bank, id, attempt, storage);
  recordHighestScore(bank, id, 1, storage);
  await storage.flush();
  assert.equal(records.size, 1);
  assert.ok(![...records.values()][0].includes("Private fixture correct"));
  const resumed = await privateProgressStorage(key, backing);
  assert.deepEqual(loadPracticeAttempt(bank, id, resumed), attempt);
  savePracticeAttempt(bank, id, newPracticeAttempt(bank), resumed);
  await resumed.flush();
  assert.equal(loadHighestScore(bank, id, await privateProgressStorage(key, backing)).score, 1);
  await assert.rejects(privateProgressStorage(await privateTestKey("Wrong-password", envelope.salt), backing));
});

test("private references use the unlocked bank without adding its content to public notes", () => {
  const bank = [{ id: "fixture", prompt: "Private fixture question", options: ["Private fixture answer", "Two", "Three", "Four"], correctIndex: 0, explanation: "Private fixture mechanism and distinction." }];
  const sections = practiceQuestionNotes("/study/electricity/module-2", [bank]);
  assert.ok(findNoteSections(sections, bank[0].prompt)[0].items[0][1].includes(bank[0].explanation));
  assert.equal(findNoteSections(studyNotesByModule["/study/electricity/module-2"].sections, bank[0].prompt).length, 0);
  assert.deepEqual(studyPracticeNavigation("/study/electricity/module-2/private-test"), { onPractice: true, testsPath: "/study/electricity/module-2" });
  const envelope = JSON.parse(readFileSync(new URL("../../public/private/electricity-test.enc.json", import.meta.url), "utf8"));
  assert.deepEqual(Object.keys(envelope).sort(), ["ciphertext", "iv", "salt", "version"]);
});
