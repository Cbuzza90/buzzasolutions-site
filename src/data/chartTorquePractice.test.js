import { test } from "node:test";
import assert from "node:assert/strict";
import chart from "./torque-chart.json" with { type: "json" };
import { expandChartSeries, lookupChartTorque, sampleTorqueQuestions, torqueBoltSizes, torqueChartPools, torquePracticeQuestions } from "./chartTorquePractice.js";

test("chart ranges expand into individual identifiers in the correct pools", () => {
  assert.deepEqual(expandChartSeries("NAS583 THRU NAS590"), ["NAS583", "NAS584", "NAS585", "NAS586", "NAS587", "NAS588", "NAS589", "NAS590"]);
  assert.equal(expandChartSeries("AN3DD THRU AN20DD").at(-1), "AN20DD");
  assert.deepEqual(torqueChartPools[1].shearNuts, chart.nutGroups[3].series);
  assert.ok(!torqueChartPools.some(pool => pool.bolts.includes("NAS835")));
});

test("specific bolt sizes select independently checked chart columns", () => {
  assert.deepEqual(lookupChartTorque({ diameter: "5/16", bolt: "NAS585", nut: "AN320" }).range, [70,90]);
  assert.deepEqual(lookupChartTorque({ diameter: "1/4", bolt: "NAS144", nut: "NAS1291" }).range, [80,100]);
  assert.deepEqual(lookupChartTorque({ diameter: "3/8", bolt: "MS20036", nut: "MS20364" }).range, [95,110]);
  assert.deepEqual(lookupChartTorque({ diameter: "1/2", bolt: "AN8DD", nut: "NAS1021D" }).range, [280,410]);
  assert.throws(() => lookupChartTorque({ diameter: "1/4", bolt: "NAS585", nut: "AN320" }));
  assert.throws(() => lookupChartTorque({ diameter: "1/4", bolt: "NAS835", nut: "AN320" }));
  assert.throws(() => lookupChartTorque({ diameter: "1/4", bolt: "AN4DD", nut: "AN365" }));
  assert.throws(() => lookupChartTorque({ diameter: "1/4", bolt: "AN4", nut: "NAS1291" }));
  assert.throws(() => lookupChartTorque({ diameter: "#8", bolt: "NAS583", nut: "AN365" }));
  assert.ok(!torqueBoltSizes.some(size => size.bolt === "MS20012"), "Exclude the manufacturer's 3/4-14 size when the chart row is 3/4-16");
});

test("all expanded combinations have one concrete bolt, four distinct answers and a populated chart cell", () => {
  assert.equal(torquePracticeQuestions.length, 1353);
  assert.equal(new Set(torquePracticeQuestions.map(q => q.id)).size, torquePracticeQuestions.length);
  for (const q of torquePracticeQuestions) {
    const pool = torqueChartPools[q.group];
    const shear = pool.shearNuts.includes(q.nut);
    const row = chart.fineRows.find(row => row.diameter === q.diameter);
    const range = row.ranges[q.group * 2 + Number(shear)];
    assert.ok(pool.bolts.includes(q.bolt));
    assert.ok(pool.tensionNuts.includes(q.nut) || shear);
    assert.ok(range);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options).size, 4);
    assert.equal(q.options[q.correctIndex], `${range[0].toLocaleString("en-US")}–${range[1].toLocaleString("en-US")} in-lb`);
    assert.match(q.bolt, /^(?:AN|MS|NAS)\d+(?:DD)?$/);
    assert.ok(!q.bolt.includes("–") && q.bolt !== "NAS");
  }
});

test("diameter-first sampling produces 20 unique valid combinations without changing the source", () => {
  const firstIds = torquePracticeQuestions.map(q => q.id);
  for (const random of [() => 0, () => 0.999, Math.random]) {
    const selected = sampleTorqueQuestions(torquePracticeQuestions, 20, random);
    assert.equal(selected.length, 20);
    assert.equal(new Set(selected.map(q => q.id)).size, 20);
    selected.forEach(q => assert.ok(lookupChartTorque(q).range));
  }
  assert.deepEqual(torquePracticeQuestions.map(q => q.id), firstIds);
});
