import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { endlessTorqueQuestions, lookupTorque, torqueQuestions, formatTorqueRange } from "./torqueTest.js";
import chart from "./torque-chart.json" with { type: "json" };

// Independently checked against the supplied fine-thread chart, in the user's order.
const key = [[60,85],[50,70],[200,250],[10,15],[480,690],[70,90],[45,70],[12,15],[80,100],[40,65],
  [270,300],[450,550],[15,30],[1100,1300],[280,410],[160,190],[30,40],[25,30],[100,140],[160,260],
  [120,150],[180,280],[20,25],[50,60],[25,40],[520,630],[290,410],[75,110],[120,145],[800,1000],
  [5,10],[300,400],[30,45],[95,110],[770,950],[380,580],[1100,1300],[15,20],[450,500],[650,800],
  [660,780],[50,70],[110,170],[480,600],[1250,1550],[60,85],[230,360],[750,950],[2300,2500],[1300,1500]];

test("all 50 requested combinations match the independently transcribed chart key", () => {
  assert.equal(torqueQuestions.length, 50);
  torqueQuestions.forEach((q, index) => {
    assert.equal(q.id, index + 1);
    assert.deepEqual(lookupTorque(q).range, key[index], `Question ${q.id}`);
    assert.equal(q.options[q.correctIndex], formatTorqueRange(key[index]));
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options).size, 4);
    assert.ok(q.explanation.includes("fine-thread row"));
  });
});

test("thin shear nuts and aluminum D suffixes choose the proper columns", () => {
  assert.deepEqual(lookupTorque({diameter:"1/4", bolt:"AN4", nut:"AN364"}).range, [30,40]);
  assert.deepEqual(lookupTorque({diameter:"1/4", bolt:"NAS", nut:"AN364"}).range, [50,60]);
  assert.deepEqual(lookupTorque({diameter:"1/4", bolt:"AN4DD", nut:"AN364D"}).range, [15,30]);
  assert.throws(() => lookupTorque({diameter:"1/4", bolt:"AN4DD", nut:"AN364"}));
  assert.throws(() => lookupTorque({diameter:"1/4", bolt:"NAS", nut:"AN364D"}));
});

test("the recreated full chart is shipped with the test", () => {
  assert.ok(existsSync(new URL("../../public/structures/torque-chart.svg", import.meta.url)));
});

test("the full chart preserves all groups, thread sections, and unavailable cells", () => {
  assert.equal(chart.boltGroups.length, 3);
  assert.equal(chart.nutGroups.length, 6);
  assert.equal(chart.fineRows.length, 14);
  assert.equal(chart.coarseRows.length, 14);
  assert.ok(chart.boltGroups[1].series.includes("NAS583 THRU NAS590"));
  assert.deepEqual(chart.fineRows[0].ranges.slice(2, 4), [null, null]);
  assert.ok(chart.coarseRows.every(row => row.ranges.slice(2).every(range => range === null)));
  assert.deepEqual(chart.coarseRows.find(row => row.thread === "5/16-18").ranges.slice(0, 2), [[80,90],[48,55]]);
  for (const row of [...chart.fineRows, ...chart.coarseRows]) {
    assert.equal(row.ranges.length, 6);
    assert.ok(row.ranges.every(range => range === null || range.length === 2 && range[0] <= range[1]));
  }
});

test("every generated endless question has four unique choices and the chart-backed answer", () => {
  assert.equal(endlessTorqueQuestions.length, 104);
  assert.ok(!endlessTorqueQuestions.some(q => q.diameter === "3/4" && q.bolt === "NAS"));
  assert.equal(new Set(endlessTorqueQuestions.map(q => q.id)).size, endlessTorqueQuestions.length);
  for (const q of endlessTorqueQuestions) {
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options).size, 4);
    assert.equal(q.options[q.correctIndex], formatTorqueRange(lookupTorque(q).range));
    assert.equal(q.bolt.endsWith("DD"), q.nut.endsWith("D"));
  }
});
