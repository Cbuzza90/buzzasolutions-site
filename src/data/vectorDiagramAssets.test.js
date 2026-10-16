import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { systemsDiagrams } from "./systemsMixedTest.js";

const asset = src => readFileSync(new URL(`../../public${src}`, import.meta.url), "utf8");

test("all active Systems diagrams are vectors without embedded screenshots", () => {
  for (const diagram of new Set(Object.values(systemsDiagrams))) {
    assert.ok(diagram.src.endsWith(".svg"), diagram.src);
    const svg = asset(diagram.src);
    assert.doesNotMatch(svg, /<image\b|data:image|\.png|\.jpe?g/i, diagram.src);
    assert.match(svg, /<text\b/);
    assert.match(svg, /viewBox=/);
    assert.equal(diagram.crop.x, 0);
    assert.equal(diagram.crop.y, 0);
  }
});

test("numbered circuit keeps all five callouts without printing their answers", () => {
  const svg = asset(systemsDiagrams.components.src);
  for (const number of [1, 2, 3, 4, 5]) assert.match(svg, new RegExp(`>${number}</text>`));
  // The source key is 1 thermal relief, 2 filter, 3 system relief,
  // 4 accumulator, 5 reservoir. Those names must not label this quiz image.
  const labels = [...svg.matchAll(/<text\b[^>]*>(.*?)<\/text>/g)].map(match => match[1]);
  assert.ok(!labels.some(label => /^(?:Thermal relief|Filter|System relief|Accumulator|Reservoir)$/i.test(label)));
});

test("resistor vector preserves course examples and excludes six-band material", () => {
  const svg = asset("/electricity/resistor-colour-chart-4-5.svg");
  assert.doesNotMatch(svg, /<image\b|data:image/i);
  assert.match(svg, />22 Ω ±5%<\/text>/);
  assert.match(svg, />2200 Ω ±1%<\/text>/);
  assert.match(svg, />×0\.01<\/text>/);
  assert.match(svg, />×0\.1<\/text>/);
  assert.match(svg, />±0\.25%<\/text>/);
  assert.doesNotMatch(svg, /<text\b[^>]*>[^<]*(?:ppm|temperature|6 bands|six.band)/i);
});
