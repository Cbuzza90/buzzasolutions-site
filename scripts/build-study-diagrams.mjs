// Vector redraws of the user's archived course screenshots. Coordinates are
// deliberately shared by the labelled and numbered versions of the same circuit.
// Do not add answer labels to numbered question diagrams.
import { writeFileSync } from "node:fs";
import { resistorColours } from "../src/data/resistorBands.js";

const ink = "#172936", supply = "#f3d82f", pressure = "#ed334b", ret = "#13acd1", gas = "#ea2994";
const esc = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const text = (x, y, value, size = 20, anchor = "start", weight = 600, fill = ink) => `<text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}" font-weight="${weight}" fill="${fill}">${esc(value)}</text>`;
const lines = (x, y, values, size = 20, anchor = "start") => values.map((value, i) => text(x, y + i * (size + 4), value, size, anchor)).join("");
const rect = (x, y, w, h, fill = "#fff", radius = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${ink}" stroke-width="2"/>`;
const circle = (x, y, r, fill = "#fff") => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${ink}" stroke-width="2"/>`;
const path = (d, colour = ink, width = 2, extra = "") => `<path d="${d}" fill="none" stroke="${colour}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const pipe = (d, colour, width = 8) => path(d, ink, width + 3) + path(d, colour, width);
const lead = d => path(d, ink, 1.7, 'marker-end="url(#arrow)"');
const arrow = (d, colour = ink) => path(d, colour, 4, `marker-end="url(#${colour === ink ? "arrow" : "flow"})"`);
const badge = (x, y, value) => rect(x - 17, y - 24, 34, 34, "#fff", 6) + text(x, y + 1, value, 25, "middle", 750);
const legend = (x, y, entries, size = 18) => entries.map(([colour, label], i) => rect(x, y + i * 28 - 14, 24, 14, colour) + text(x + 34, y + i * 28, label, size)).join("");
function svg(file, w, h, title, body, description = title) {
  writeFileSync(new URL(`../public/${file}`, import.meta.url), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
<title id="title">${esc(title)}</title><desc id="desc">${esc(description)} Redrawn from the supplied course review; vector paths and text.</desc>
<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="${ink}"/></marker><marker id="flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#218650"/></marker><pattern id="mesh" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 0L10 10M10 0L0 10" stroke="${ink}" stroke-width="1"/></pattern></defs>
<rect width="${w}" height="${h}" fill="#fff"/><g font-family="Arial,Helvetica,sans-serif">${body}</g></svg>\n`, "utf8");
}
function reservoir(x, y, w = 105, h = 140, colour = supply) {
  return rect(x, y, w, h, "#fff", 5) + `<path d="M${x} ${y + 45} Q${x + w / 4} ${y + 34} ${x + w / 2} ${y + 45} T${x + w} ${y + 45} V${y + h} H${x}Z" fill="${colour}" stroke="${ink}" stroke-width="2"/>` + rect(x + w / 2 - 12, y - 8, 24, 8, "#64717d");
}
function pump(x, y) {
  return circle(x, y - 8, 12, "#82909c") + circle(x, y + 12, 12, "#82909c");
}
function actuator(x, y, w = 120, h = 95, fill = supply) {
  return rect(x, y, w, h, fill) + rect(x + w * .46, y, 13, h, "#697682") + rect(x + w * .46 + 13, y + h * .45, w * .55, 10, "#b4bdc6");
}
function rotary(x, y) {
  return circle(x, y, 42, "#e8edf2") + path(`M${x - 23} ${y - 35} Q${x + 10} ${y - 9} ${x - 23} ${y + 35} M${x + 23} ${y - 35} Q${x - 10} ${y + 9} ${x + 23} ${y + 35}`, ink, 2.5);
}
function thermal(x, y) {
  return rect(x, y, 26, 18, "#8d9aa5") + path(`M${x + 4} ${y + 9}h18`, ink, 2);
}

// Closed-centre topology: both selectors have separate pressure branches;
// return goes through the filter to the reservoir; accumulator is on pressure.
function closed(numbered = false) {
  let b = "";
  b += pipe("M123 480H803", pressure);
  b += pipe("M80 274V480H123 M123 274V390", supply);
  b += pipe("M803 480V200H140", ret);
  b += pipe("M225 480V200", ret);
  b += pipe("M225 480H318V403H123", pressure);
  b += pipe("M225 518H310V480", pressure, 5);
  b += pipe("M345 480V568", pressure);
  b += pipe("M380 480V438", pressure, 5);
  for (const x of [420, 610]) {
    b += pipe(`M${x} 480V327`, pressure);
    b += pipe(`M${x - 53} 150V309H${x - 33} M${x + 53} 150V309H${x + 33}`, supply);
    b += pipe(`M${x - 53} 240H${x - 28}V200`, ret, 5);
    b += actuator(x - 53, 58, 106, 92);
    b += rotary(x, 285);
    b += thermal(x - 50, 211);
  }
  b += reservoir(30, 130, 110, 144);
  b += rect(165, 166, 65, 70, "#dce4eb") + rect(165, 166, 65, 70, "url(#mesh)");
  b += pump(123, 480);
  b += rect(88, 390, 70, 35, "#84919b") + path("M118 390l-15 -43", ink, 5) + arrow("M94 407h18", ink);
  b += text(159, 431, "C.V.", 16);
  b += rect(203, 450, 45, 68, "#788792") + rect(248, 466, 34, 28, "#bcc6ce") + arrow("M254 480h20", ink);
  b += rect(779, 438, 48, 72, "#788792");
  b += circle(380, 416, 27) + arrow("M367 430l26 -28", ink);
  b += `<ellipse cx="345" cy="585" rx="41" ry="48" fill="${pressure}" stroke="${ink}" stroke-width="2"/><path d="M304 585H386V590A41 43 0 0 1 304 590Z" fill="${gas}" stroke="${ink}" stroke-width="2"/>`;
  b += lines(38, 343, ["Hand", "pump"], 18) + lead("M100 346L112 386");
  b += lines(30, 548, ["Engine-driven", "pump"], 18) + lead("M135 535L124 501");
  b += lines(30, 600, ["Sensor line"], 18) + lead("M140 594L232 525");
  b += lines(435, 376, ["Selector valves"], 19) + lead("M455 350L433 324") + lead("M570 350L593 325");
  b += lines(458, 444, ["System pressure", "gauge"], 18) + lead("M453 432L407 420");
  b += lines(560, 32, ["Actuator cylinders"], 20, "middle");
  b += legend(730, 42, [[supply, "Fluid supply"], [pressure, "Pressure"], [ret, "Return"], [gas, "Accumulator air"]], 17);
  b += lines(20, 650, ["Colours follow this course diagram."], 16);
  if (numbered) {
    b += badge(513, 225, 1) + lead("M491 225H425L396 220");
    b += badge(247, 149, 2) + lead("M229 154L213 170");
    b += badge(740, 558, 3) + lead("M760 545L791 510");
    b += badge(443, 590, 4) + lead("M422 590H390");
    b += badge(155, 105, 5) + lead("M134 105H100L84 130");
    b += lines(240, 365, ["Unloading", "valve"], 18) + lead("M258 391L229 447");
  } else {
    b += text(30, 106, "Reservoir", 19);
    b += text(166, 149, "Filter", 19);
    b += text(498, 237, "T.R.V.", 17) + lead("M495 232H425L396 220");
    b += lines(240, 365, ["Unloading", "valve"], 18) + lead("M258 391L229 447");
    b += lines(682, 559, ["System relief", "valve"], 18) + lead("M782 541L803 511");
    b += text(409, 603, "Accumulator", 19) + lead("M403 597L387 590");
  }
  return b;
}
svg("structures/components.svg", 960, 675, "Numbered hydraulic circuit", closed(true), "The original five callouts are retained at the same components. Supply, pressure, return and accumulator-air colours match the source.");
svg("systems/closed-centre-labelled.svg", 960, 675, "Hydraulic circuit", closed(), "Parallel selector-valve branches, accumulator, unloading valve, relief valves, filter, reservoir and pumps, as in the supplied labelled diagram.");

// Neutral selectors in series with an uninterrupted pump-to-reservoir route.
function openCentre() {
  let b = pipe("M88 190V285H730V82H140", supply);
  b += pipe("M55 190V416H165V285", supply);
  b += pipe("M240 285V82", supply);
  b += reservoir(28, 63, 112, 132);
  b += rect(159, 64, 43, 36, "url(#mesh)");
  b += rect(218, 168, 44, 63, "#7e8a96");
  b += pump(88, 285);
  b += rect(53, 401, 85, 35, "#81909d") + path("M97 401l-22 -42", ink, 5);
  for (const x of [380, 580]) {
    b += rect(x - 39, 238, 78, 108, "#f5f7fa");
    b += path(`M${x - 39} 285H${x + 39}`, supply, 8);
    b += path(`M${x - 28} 248Q${x + 35} 267 ${x - 18} 318 M${x + 28} 248Q${x - 35} 267 ${x + 18} 318`, ink, 2, 'stroke-dasharray="5 5"');
    b += pipe(`M${x - 39} 250H${x - 65}V380H${x - 22}V420 M${x - 39} 330H${x - 50}V402H${x + 46}V420`, "#fff", 7);
    b += actuator(x - 45, 420, 100, 80, "#f4f5f7");
  }
  b += text(30, 33, "Reservoir", 20) + lead("M112 38L103 61");
  b += text(183, 33, "Filter", 20) + lead("M190 39L181 63");
  b += lines(280, 125, ["System relief", "valve"], 20) + lead("M280 155L263 187");
  b += lines(30, 242, ["Engine-driven", "pump"], 18);
  b += lines(37, 477, ["Hand pump"], 18) + lead("M100 455L97 437");
  b += lines(484, 165, ["Selector valves", "(neutral position)"], 20, "middle") + lead("M428 196L394 235") + lead("M540 196L573 235");
  b += lines(385, 539, ["Actuator cylinder", "(landing gear)"], 18, "middle") + lines(610, 539, ["Actuator cylinder", "(flaps)"], 18, "middle");
  b += legend(36, 560, [[supply, "Hydraulic fluid supply"], ["#fff", "Static hydraulic fluid"]]);
  return b;
}
svg("structures/system.svg", 790, 625, "Hydraulic circuit with neutral selectors", openCentre());

// Side-by-side reservoir construction, matching left/right in the source quiz.
let reservoirs = rect(25, 42, 375, 455, "#ac914a");
reservoirs += pipe("M128 190V440H230V480H105V538", pressure, 12);
reservoirs += pipe("M252 190V405H315V528H398", ret, 12);
reservoirs += rect(32, 48, 361, 142, "#76d2e2", 10) + text(211, 76, "Reservoir", 24, "middle");
reservoirs += rect(154, 132, 31, 58, "url(#mesh)") + text(168, 121, "Filter", 19, "middle");
reservoirs += circle(213, 249, 33, ret) + circle(213, 316, 33, ret) + path("M189 227Q224 242 237 268M189 294Q224 309 237 335", supply, 4);
reservoirs += text(282, 218, "Gear-type pump", 18, "middle") + lead("M263 223L239 240");
reservoirs += pipe("M166 190V335H128", supply, 6) + pipe("M245 190V334H282V232H314V190", ret, 6);
reservoirs += rect(306, 220, 19, 45, "#f4efce") + path("M309 224l12 6 -12 6 12 6 -12 6 12 6", ink);
reservoirs += rect(98, 345, 20, 45, "#f4efce") + path("M101 350l12 6 -12 6 12 6 -12 6", ink);
reservoirs += rect(202, 390, 98, 25, "#9da8b2") + rect(228, 387, 16, 31, "#e4e9ed");
reservoirs += rect(43, 449, 38, 38, "url(#mesh)");
reservoirs += `<g transform="translate(440 20) scale(.57 .8)">${openCentre()}</g>`;
reservoirs += text(210, 580, "Left", 24, "middle") + text(680, 580, "Right", 24, "middle");
svg("structures/reservoirs.svg", 910, 610, "Reservoir comparison", reservoirs, "Left: reservoir built into the pump assembly. Right: separate reservoir connected to the circuit by lines. Left and right positions match the course photograph.");

// Open-centre neutral A and one commanded actuator B. Preserve each legend.
function stateDiagram(offset, active) {
  const s = "#e9a9ca", green = "#15964d";
  let b = active ? pipe("M118 272H330", pressure) : pipe("M118 272H440V92H127", green);
  b += pipe("M64 170V272H118", s);
  b += pipe("M127 92H440V272", green);
  b += active ? pipe("M186 272V227", pressure, 6) + pipe("M186 169V92 M355 272H440", green, 6) : pipe("M186 272V92", green, 6);
  b += rect(171, 169, 30, 58, "#b7b79a") + rect(179, 154, 14, 15, "#b7b79a");
  b += reservoir(32, 72, 95, 105, s) + pump(118, 272);
  for (const x of [246, 330, 414]) {
    b += circle(x, 272, 23, "#d3dbe1") + path(`M${x - 23} 272H${x + 23}`, active && x <= 330 ? pressure : green, 6);
    b += path(`M${x} 249V224H${x + 12} M${x} 295V320H${x + 12}`, "#8795a1", 6);
  }
  if (active) {
    b += pipe("M315 272V228H355V272", green, 6);
    b += pipe("M330 272V341H315", pressure, 6) + pipe("M355 272V341H367", green, 6);
    b += rect(302, 330, 76, 27, "#dfe6eb") + rect(326, 330, 9, 27, "#84909b") + rect(335, 339, 63, 8, "#a1abb4");
  }
  b += text(46, 43, active ? "B" : "A", 30);
  if (!active) {
    b += text(32, 58, "Reservoir", 16);
    b += lines(150, 132, ["Relief", "valve"], 16);
    b += text(240, 182, "Directional control valves", 17) + lead("M283 194L251 245");
    b += text(84, 359, "Pump", 18);
  }
  return `<g transform="translate(${offset} 0)">${b}</g>`;
}
svg("systems/open-centre-states.svg", 1000, 435, "Hydraulic circuit states A and B", stateDiagram(0, false) + stateDiagram(500, true) + legend(550, 395, [["#e9a9ca", "Suction"], [pressure, "Pressure"]], 18) + legend(810, 395, [["#15964d", "Return"]], 18));

let mechanical = text(165, 52, "Effort", 32, "middle") + text(650, 52, "Load", 32, "middle");
mechanical += `<path d="M100 170H235V405H460V170H830V520H100Z" fill="#b7eef1" stroke="${ink}" stroke-width="4"/>`;
mechanical += rect(101, 310, 133, 35, "#26976b") + rect(461, 205, 368, 38, "#26976b");
mechanical += rect(574, 158, 146, 47, "#8795a1") + rect(593, 122, 108, 36, "#aeb8c1") + rect(615, 98, 64, 24, "#cbd2d9");
mechanical += arrow("M167 189V288") + arrow("M646 319V258");
mechanical += text(167, 385, "Small piston", 22, "middle") + text(646, 373, "Large piston", 22, "middle");
svg("systems/mechanical-advantage.svg", 930, 565, "Hydraulic mechanical advantage", mechanical);

let fluids = "";
for (const [x, colour, label] of [[125, "#c91e49", "Left"], [555, "#7142bd", "Right"]]) {
  fluids += rect(x, 110, 260, 370, "#f5f8fb", 30) + rect(x + 2, 52, 256, 74, "#202936", 14);
  fluids += `<path d="M${x + 7} 260H${x + 253}V450Q${x + 253} 473 ${x + 230} 473H${x + 30}Q${x + 7} 473 ${x + 7} 450Z" fill="${colour}"/>`;
  fluids += path(`M${x + 22} 145V433`, "#fff", 8) + text(x + 130, 527, label, 27, "middle");
}
svg("structures/fluid-samples.svg", 940, 560, "Hydraulic fluid sample comparison", fluids, "Illustration of the supplied sample photograph: red liquid in the left container and purple liquid in the right container. Colour alone is not a unique specification.");

// Reversible power-pack drawing: retain the course labels and line colours.
// Its original extension sentence conflicts with its Up arrows; preserve the
// drawing's Up arrows without asserting a gear state (see existing course notes).
let pack = rect(300, 28, 340, 335, "#c8b678");
pack += pipe("M360 137V310H480V344H350V474H220V575", ret, 8);
pack += pipe("M570 137V285H532V333H610V416H756V575", pressure, 8);
pack += rect(305, 33, 330, 104, "#75d0df", 8) + text(470, 63, "Reservoir", 23, "middle");
pack += rect(407, 94, 28, 43, "url(#mesh)") + text(420, 88, "Filter", 17, "middle");
pack += circle(457, 180, 32, ret) + circle(457, 242, 32, pressure);
pack += path("M434 161Q458 166 476 199 M434 223Q458 227 476 260", supply, 4);
pack += text(475, 156, "Gear-type pump", 18) + lead("M476 159L468 171");
pack += pipe("M487 213H530V155 M530 213H580V155", pressure, 6);
pack += rect(519, 155, 22, 42, "#f6f0ce") + rect(569, 155, 22, 42, "#f6f0ce");
pack += rect(362, 238, 24, 40, ret) + pipe("M374 278V310", ret, 5);
pack += rect(326, 324, 95, 25, "#d9e1e7") + path("M333 337l7 -9 8 18 8 -18 8 18 8 -18 8 18 8 -18 8 9", ink, 2);
pack += rect(449, 292, 66, 22, "#a9b4bd") + rect(470, 289, 14, 28, "#e5eaee");
pack += rect(544, 299, 40, 22, "#a9b4bd") + path("M547 310h30", ink, 2);
pack += lines(674, 147, ["High-pressure", "control valve"], 18) + lead("M670 164H605L541 176");
pack += text(674, 211, "Thermal relief valve", 18) + lead("M670 204H615L591 182");
pack += lines(24, 234, ["Low-pressure", "control valve"], 18) + lead("M187 247H345L361 255");
pack += text(24, 329, "Shuttle valve", 18) + lead("M154 324L324 336");
pack += text(674, 294, "Gear-up check valve", 18) + lead("M670 290H616L583 304");
pack += lines(674, 344, ["Gear-up check", "valve piston"], 18) + lead("M670 337H610L512 305");
// Emergency/freefall branch between blue and red routes.
pack += pipe("M350 416H444V456H610", ret, 7);
pack += rect(436, 401, 45, 68, "#d8e2e9") + path("M444 410h27v46h-14v-28h-13", "#df9c32", 7);
pack += text(275, 401, "Freefall valve", 18) + lead("M388 397L435 410");
pack += lines(500, 435, ["Emergency", "extend"], 18) + arrow("M495 404H556", "#218650");
// Main actuators: return at the upper chambers, pressure at lower chambers.
pack += pipe("M220 492H756V575", ret, 8);
pack += pipe("M220 575H756V416H610", pressure, 8);
pack += pipe("M400 492V528H400V575", pressure, 6);
pack += rect(387, 510, 26, 35, "#d5dce3");
pack += lines(301, 540, ["Thermal", "relief valve"], 17) + lead("M373 533H386");
pack += pipe("M530 575V542", pressure, 5) + rect(498, 514, 67, 36, "#fff") + path("M509 529h40v12 M518 523v17h21", ink, 2);
pack += text(490, 504, "Pressure switch", 18);
for (const [x, label, labelX, anchor] of [[195, "Left main-gear actuator", 170, "end"], [731, "Right main-gear actuator", 800, "start"]]) {
  pack += rect(x, 466, 50, 146, "#9d8244", 12) + rect(x + 8, 485, 34, 113, pressure) + rect(x + 8, 485, 34, 21, ret) + rect(x + 9, 506, 32, 13, "#cdd6dd") + rect(x + 21, 519, 8, 118, "#b3bec7");
  pack += label.startsWith("Left") ? lines(labelX, 462, ["Left main-gear", "actuator"], 17, anchor) : text(labelX, 478, label, 17, anchor);
  pack += arrow(`M${x - 23} 612V548`, "#218650") + text(x - 23, 644, "Up", 18, "middle");
}
pack += pipe("M650 492V688H530", ret, 7) + pipe("M610 575V804H530", pressure, 7);
pack += rect(478, 658, 55, 170, "#9d8244", 12) + rect(486, 680, 39, 131, pressure) + rect(486, 680, 39, 20, ret) + rect(486, 700, 39, 13, "#cdd6dd") + rect(503, 713, 8, 132, "#b3bec7");
pack += rect(533, 680, 22, 15, "#b7c4cb") + rect(533, 797, 22, 15, "#b7c4cb");
pack += text(335, 739, "Nose-gear actuator", 18, "middle") + lead("M423 730L477 730");
pack += text(569, 725, "Restrictor", 18) + lead("M568 716L547 694") + text(569, 821, "Restrictor", 18) + lead("M565 814L555 805");
pack += arrow("M449 821V764", "#218650") + text(449, 855, "Up", 18, "middle");
pack += legend(755, 770, [[pressure, "Pressure"], [ret, "Return"]], 20);
svg("systems/reversible-power-pack.svg", 1000, 880, "Reversible hydraulic power pack", pack, "Reconstruction of the course schematic with its component labels, red pressure lines, blue return lines and Up arrows. The course question's extension wording conflicts with those arrows; this drawing does not resolve that source ambiguity.");

// Real vector resistor chart. Only cells present in the supplied course chart
// are included; no temperature coefficient column or six-band example.
let chart = text(460, 38, "Resistor colour code", 28, "middle");
function resistor(y, colours, caption, positions) {
  let b = path(`M180 ${y + 26}H740`, "#87939e", 5) + rect(290, y, 330, 52, "#e5d5a7", 22);
  colours.forEach((colour, i) => { b += `<rect x="${positions[i]}" y="${y + 1}" width="17" height="50" fill="${colour}"/>`; });
  return b + text(35, y + 32, `${colours.length} bands`, 21) + text(755, y + 32, caption, 20);
}
chart += resistor(65, ["#e32636", "#e32636", "#171717", "#c7a331"], "22 Ω ±5%", [325, 375, 425, 560]);
chart += resistor(140, ["#e32636", "#e32636", "#171717", "#854321", "#854321"], "2200 Ω ±1%", [320, 365, 410, 455, 560]);
chart += text(460, 230, "Read left → right: digits · multiplier · tolerance", 20, "middle");
const columns = [30, 226, 336, 446, 556, 732], widths = [196, 110, 110, 110, 176, 158];
const headers = ["Colour", "Digit 1", "Digit 2", "Digit 3*", "Multiplier", "Tolerance"];
headers.forEach((head, i) => { chart += rect(columns[i], 258, widths[i], 44, "#e7edf3") + text(columns[i] + widths[i] / 2, 287, head, 19, "middle"); });
const ordered = ["Silver", "Gold", "Black", "Brown", "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Grey", "White"];
ordered.forEach((name, row) => {
  const c = resistorColours.find(c => c.name === name), y = 302 + row * 38;
  const label = name === "Purple" ? "Purple / violet" : name;
  const values = [label, c.digit ?? "—", c.digit ?? "—", c.digit ?? "—", c.exponent === undefined ? "—" : `×${10 ** c.exponent}`, c.tolerance === undefined ? "—" : `±${c.tolerance}%`];
  const light = ["Yellow", "White", "Gold", "Silver", "Grey", "Green", "Orange"].includes(name);
  values.forEach((value, i) => {
    const present = value !== "—", fill = present ? c.hex : "#f5f7fa";
    chart += rect(columns[i], y, widths[i], 38, fill) + text(columns[i] + widths[i] / 2, y + 26, value, 20, "middle", 650, !present || light ? ink : "#fff");
  });
});
chart += text(30, 787, "* Digit 3 is used only for five-band resistors.", 19);
chart += text(30, 818, "Four bands: 2 digits + multiplier + tolerance", 19);
chart += text(30, 848, "Five bands: 3 digits + multiplier + tolerance", 19);
chart += text(30, 880, "All resistance values are in ohms (Ω).", 19);
svg("electricity/resistor-colour-chart-4-5.svg", 920, 905, "Four- and five-band resistor colour chart", chart, "Vector transcription of the supplied Resistor Colour chart. Blank cells remain blank; no temperature coefficient or six-band material.");
