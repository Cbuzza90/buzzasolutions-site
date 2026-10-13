import { readFileSync, writeFileSync } from "node:fs";

const chart = JSON.parse(readFileSync(new URL("../src/data/torque-chart.json", import.meta.url), "utf8"));
const parts = [];
const left = 20, right = 1260, start = 132, pair = 188;
const escape = text => String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const text = (x, y, value, size = 17, bold = false, anchor = "middle") => parts.push(`<text x="${x}" y="${y}" font-size="${size}" font-weight="${bold ? 700 : 400}" text-anchor="${anchor}">${escape(value)}</text>`);
const line = (x1, y1, x2, y2, width = 1) => parts.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="${width}"/>`);
const horizontal = y => line(left, y, right, y);
const number = n => n === undefined ? "—" : n.toLocaleString("en-US");

text(640, 36, "TORQUE LIMITS — INCH-POUNDS", 24, true);
horizontal(60);
chart.boltGroups.forEach((group, index) => {
  const x = start + index * pair * 2;
  text(x + pair, 88, "BOLTS", 19, true);
  text(x + pair, 113, group.heading, 18, true);
  group.series.forEach((item, i) => text(x + 20, 145 + i * 20, item, 17, false, "start"));
  if (group.shearBolt) {
    line(x + pair, 307, x + pair * 2, 307);
    line(x + pair, 307, x + pair, 368);
    text(x + pair * 1.5, 331, "STEEL SHEAR BOLT", 16, true);
    text(x + pair * 1.5, 356, group.shearBolt, 17);
  }
});
horizontal(370);
for (let i = 0; i < 3; i++) text(start + pair + i * pair * 2, 394, "NUTS", 19, true);
horizontal(406);
chart.nutGroups.forEach((group, index) => {
  const x = start + index * pair;
  text(x + pair / 2, 433, group.heading, 15, true);
  group.series.forEach((item, i) => text(x + pair / 2, 461 + i * 18, item, 17));
  if (index > 0 && index % 2) line(x, 406, x, 630);
});
horizontal(630);
text(640, 653, "FINE THREAD SERIES", 20, true);
horizontal(663);
text(76, 688, "NUT–BOLT", 15, true);
text(76, 710, "SIZE", 15, true);
for (let i = 0; i < 6; i++) {
  const x = start + i * pair;
  text(x + pair / 2, 687, "TORQUE LIMITS", 15, true);
  text(x + pair / 2, 707, "IN-LB", 15);
  text(x + pair / 4, 731, "MIN.", 15, true);
  text(x + pair * 3 / 4, 731, "MAX.", 15, true);
  line(x, 663, x, 1140);
  line(x + pair / 2, 718, x + pair / 2, 1140);
}
line(start, 718, right, 718);
horizontal(742);
function rows(rows, y) {
  rows.forEach((row, index) => {
    const base = y + index * 28;
    text(76, base + 20, row.thread, 17);
    row.ranges.forEach((range, column) => {
      text(start + column * pair + pair / 4, base + 20, number(range?.[0]), 18);
      text(start + column * pair + pair * 3 / 4, base + 20, number(range?.[1]), 18);
    });
    horizontal(base + 28);
  });
}
rows(chart.fineRows, 742);
text(640, 1158, "COARSE THREAD SERIES", 20, true);
horizontal(1168);
rows(chart.coarseRows, 1168);
for (let i = 0; i < 12; i++) line(start + i * pair / 2, 1168, start + i * pair / 2, 1560);
for (const x of [left, start, start + pair * 2, start + pair * 4, right]) line(x, 60, x, 1560, 1.5);
text(640, 1587, "Most torque values are provided by the manufacturer. If a value is not provided, a table of torque values is used.", 15);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="1610" viewBox="0 0 1280 1610"><title>Full bolt and nut torque chart</title><desc>Unmarked reference chart with all bolt and nut classifications, fine-thread and coarse-thread torque limits. All values are inch-pounds. Dashes indicate no value in the source chart.</desc><rect width="1280" height="1610" fill="white"/><g fill="#111" stroke="#111" stroke-width="1" font-family="Arial, Helvetica, sans-serif"><style>text{stroke:none}path{fill:none}</style>${parts.join("\n")}</g></svg>\n`;
writeFileSync(new URL("../public/structures/torque-chart.svg", import.meta.url), svg);
