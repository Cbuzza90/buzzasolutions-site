import { improveChoiceOptions } from "./improvedChoiceOptions.js";
import { systemsScreenshotDistractors } from "./systemsDistractors.js";

// Transcribed from the user's Hold Questions screenshots (Systems Test 2, 1–27).
// Closed matching menus and malformed choices are resolved against the supplied
// Hydraulic Components lesson, rather than inventing hidden answer text.
export const systemsScreenshotDiagrams = {
  selectorPair: image("selector-pair", 1280, 25, 80, 725, 340, "Two selector-valve diagrams: neutral through-flow and a selected actuator pressure/return path."),
  inlineCheck: image("inline-check", 1280, 31, 170, 712, 237, "Photograph of an inline valve with a flow arrow beside its spring-loaded ball cross-section."),
  volumeStates: image("volume-states", 1280, 31, 196, 774, 420, "Four operating states showing the metering orifice, piston, sleeve valve, shutoff and reverse flow."),
  filterIndicator: image("filter-indicator", 1280, 65, 180, 380, 276, "Filter assembly with a red visual blockage indicator and a 20-micron example label."),
  bypassFilter: image("filter-bypass", 1280, 31, 170, 310, 306, "Micronic filter cutaway showing its filter element and bypass relief path."),
  groove: image("oring-groove", 1280, 31, 170, 394, 236, "Original O-ring groove diagram showing clearance, groove width and the reduced sealing height."),
  twoStage: image("two-stage", 1189, 29, 157, 476, 288, "Two-stage filter cutaway and flow schematic with primary and secondary elements and differential indicators."),
  sealPackage: image("seal-package", 1311, 56, 63, 640, 707, "Original seal package labelled CURE: 1Q13, PKG 04/2013 and S/L: 15 YRS PER ARP5316."),
  bluePackage: image("blue-package", 1311, 56, 79, 640, 707, "Original seal-package photograph with the blue identification dot retained."),
  shuttlePair: image("shuttle-pair", 1311, 56, 315, 936, 351, "Normal and emergency supply cross-sections showing pressure arrows and the isolated alternative inlet."),
  vanePair: image("vane-pair", 1311, 56, 350, 652, 340, "Two pump cross-sections with an offset rotor, sliding vanes and inlet/outlet paths."),
};

function image(name, imageWidth, x, y, width, height, alt) {
  const extension = ["selector-pair", "inline-check", "volume-states", "filter-indicator", "filter-bypass", "oring-groove"].includes(name) ? "jpg" : "png";
  return { src: `/systems/module-2/hold-${name}.${extension}`, alt, crop: { imageWidth, x, y, width, height } };
}

export function createSystemsScreenshotReview(base) {
  const choice = [], hard = [];
  function add(number, target, changes = {}) {
    const original = base.find(q => q.learningTarget === target);
    if (!original) throw new Error(`Missing Systems source target: ${target}`);
    const { word, aliases = [], recallPrompt, diagramKey, explanation, pages, variant, ...fields } = changes;
    const learningTarget = `hold-${number}-${target}${variant ? `-${variant}` : ""}`;
    const source = { ...original.source, ...(pages ? { pages } : {}), screenshotQuestions: [number] };
    const oldOptions = fields.options ?? original.previousOptions ?? original.options;
    const q = improveChoiceOptions({ ...original, ...fields, id: `systems2-screenshot-choice-${learningTarget}`, learningTarget, source, previousOptions: [...oldOptions],
      explanation: `${explanation ?? original.explanation} Screenshot review question ${number}; blank/duplicate choices and closed matching menus are adapted to the course source.`,
      ...(diagramKey ? { diagram: systemsScreenshotDiagrams[diagramKey] } : {}) }, systemsScreenshotDistractors[number]);
    // Never inherit a title-labelled source diagram into an identification item.
    if (!diagramKey) delete q.diagram;
    choice.push(q);
    hard.push({ id: `systems2-screenshot-hard-${learningTarget}`, learningTarget, topic: q.topic,
      prompt: recallPrompt, answer: word, acceptedAnswers: [word, ...aliases], explanation: q.explanation, source,
      ...(diagramKey ? { diagram: systemsScreenshotDiagrams[diagramKey] } : {}) });
  }
  const pair = (number, target, word, recallPrompt, aliases = []) => add(number, target, { word, recallPrompt, aliases });

  add(1, "open-neutral", { prompt: "A selector valve controls the direction of a hydraulic actuator. What are its two centre arrangements?", options: ["Open-centre and closed-centre", "Spool and poppet", "Centre-spool and closed-centre", "Bypass type and pressure type"], word: "open", recallPrompt: "Complete the two centre arrangements: _____-centre and closed-centre.", diagramKey: "selectorPair", explanation: "Open-centre permits through-flow to return in neutral; closed-centre blocks the selector's neutral pressure path. Spool and poppet describe construction, a different classification. Hydraulic Components (2024), pages/slides 4, 6–9 and 12–17." });
  pair(2, "closed-neutral", "closed", "Which centre arrangement blocks the selector's neutral pressure path? _____-centre.");
  pair(2, "open-neutral", "open", "Which centre arrangement permits neutral through-flow to return? _____-centre.");
  pair(2, "poppet-design", "poppet", "Which selector construction lifts seated valves to open passages?");
  pair(2, "spool-design", "spool", "Which selector construction slides a shaft or piston across ports?");
  add(3, "check-direction", { prompt: "This component allows fluid in only one direction. What is it called?", options: ["Check valve", "Sequence valve", "Shuttle valve", "Metering valve"], word: "check", recallPrompt: "The illustrated one-way component is a _____ valve.", diagramKey: "inlineCheck" });
  add(4, "fuse-purpose", { prompt: "Hydraulic fuses isolate downstream leaks. What are the two fuse types in the lesson?", options: ["Volume and pressure", "Open-centre and closed-centre", "Hydraulic and electric", "Sequence and priority"], word: "pressure", recallPrompt: "The lesson's two hydraulic fuse types are volume and _____.", explanation: "A volume fuse responds to the quantity passed; a pressure fuse responds to the pressure imbalance across it. Both can isolate a failed branch to limit fluid loss. Hydraulic Components (2024), pages/slides 34–40." });
  add(5, "volume-fuse", { prompt: "What component shuts off flow after a preset quantity of hydraulic fluid passes through it?", options: ["Volume fuse", "Pressure fuse", "Metering valve", "Check valve"], word: "volume", recallPrompt: "The illustrated quantity-measuring device is a _____ fuse.", diagramKey: "volumeStates" });
  add(6, "sequence-role", { prompt: "What valve ensures a landing-gear door opens before the landing gear starts to lower?", options: ["Sequence valve", "Priority valve", "Shuttle valve", "Metering valve"], word: "sequence", recallPrompt: "Door-before-gear timing is controlled by a _____ valve." });
  pair(7, "sequence-role", "sequence", "Which valve controls the order of hydraulic events?");
  pair(7, "priority-role", "priority", "Which valve preserves supply to critical systems ahead of noncritical systems?");
  pair(7, "check-direction", "check", "Which valve permits one direction of flow and prevents reverse flow?");
  add(8, "filter-rating", { prompt: "Hydraulic filters remove contaminants. How are filters rated in the review?", options: ["By the size of particles they remove", "By whether they are on the pressure side", "By their material alone", "By whether they have a bypass indicator"], word: "microns", recallPrompt: "Particle-size filter ratings in the review are expressed in _____.", aliases: ["micron", "micrometres", "micrometers"] });
  add(9, "popout-indicator", { prompt: "The review's filter pop-up blockage indicator is raised. What action does the review call for?", options: ["Replace the contaminated filter using the applicable procedure", "Reset the indicator and keep operating without checking the element", "Drain all system fluid without checking the filter", "Ignore it if the bypass still supplies flow"], word: "replace", recallPrompt: "The raised blockage indicator calls for servicing: _____ the contaminated filter under the applicable procedure.", diagramKey: "filterIndicator", explanation: "The raised indicator warns of excessive restriction/differential pressure. A bypass preserves flow but does not clean the fluid or correct contamination. The review calls for the filter to be changed as soon as possible; follow the assembly's servicing procedure. Hydraulic Components (2024), pages/slides 49–52; Review Test 2 slides 15–17." });
  add(10, "filter-bypass", { prompt: "Why do many filter assemblies contain a bypass relief valve?", options: ["To maintain fluid flow if the filter element becomes clogged", "To route all dirty fluid directly to return in every condition", "To guarantee all bypassed fluid is filtered by that element", "To force fluid through a blocked element without an alternative route"], word: "bypass", recallPrompt: "Which filter valve maintains flow around a blocked element? _____ valve.", diagramKey: "bypassFilter" });
  pair(11, "paper-service", "paper", "Which filter uses a low-cost disposable pleated treated-_____ element?");
  pair(11, "steel-construction", "mesh", "A stainless-steel filter removes particles using finely woven wire _____.");
  pair(11, "two-stage-high", "primary", "At high demand, excess flow in a two-stage filter bypasses the fine _____ element.");
  pair(11, "cuno-stack", "Cuno", "Which filter uses a stack of discs and spacers with cleaning blades?");
  pair(11, "sintered", "sintered", "A porous filter made by fusing metal powder is called _____.");
  pair(12, "gasket", "gasket", "What seals a joint with no relative movement between its surfaces?");
  pair(12, "packing", "packing", "What seal category is used where the mating surfaces move relative to each other?");
  pair(12, "backup-role", "extrusion", "A backup ring supports an O-ring to prevent it being forced into a clearance, called _____.");
  pair(12, "one-way-chevron", "one", "The pressure-on-one-side seal arrangement is a _____-way seal.", ["1"]);
  for (const [name, word, aliases] of [["Chevron", "Chevron", []], ["V-ring packing", "V-ring", ["vring"]], ["U-ring packing", "U-ring", ["uring"]], ["D-ring packing", "D-ring", ["dring"]]]) {
    add(13, "one-way-chevron", { variant: word.toLowerCase(), prompt: `How does the supplied lesson classify ${name}?`, options: ["One-way packing", "A two-way O-ring", "A backup ring", "A shaft wiper"], word, aliases, recallPrompt: `Complete the one-way packing name listed in the lesson: ${name === "Chevron" ? "_____ (also called V-ring packing)" : `_____${name.slice(name.indexOf(" "))}`}.`, explanation: `The lesson lists Chevron, V-ring, U-ring and D-ring packing as one-way seals. ${name} is one of those listed forms. This classification distinguishes one-way packing from the two-way O-ring, support rings and dirt wipers. Hydraulic Components (2024), page/slide 63; Review Test 2 slide 25.`, term: name });
    hard.at(-1).prompt = name === "Chevron" ? "What one-way packing name is also used for V-ring packing?" : `Complete the one-way packing name from the lesson: _____ packing (begins with ${word[0]}).`;
  }
  add(14, "oring-two-way", { prompt: "Which seal is the most common two-way seal in the lesson?", options: ["O-ring", "Wiper", "Backup ring", "Single Chevron set"], word: "O-ring", aliases: ["oring"], recallPrompt: "The most common two-way seal in the lesson is an _____." });
  add(15, "oring-squeeze", { prompt: "In the review's O-ring groove example, which arrangement provides the intended squeeze?", options: ["A groove 10% wider than the seal and a sealing height 10% smaller", "A groove narrower than the seal and a sealing height larger than the seal", "A groove that leaves the ring clear of the mating surface", "An oversized sealing height that removes all squeeze"], word: "squeeze", aliases: ["pinch", "compression"], recallPrompt: "The wider groove and reduced sealing height give the O-ring its required _____.", diagramKey: "groove", explanation: "The review's example allows width for the O-ring and reduces the sealing height to pinch it into contact. Without that squeeze the source shows leakage. The percentages describe this classroom example; actual dimensions follow the approved design. Hydraulic Components (2024), pages/slides 66–68; Review Test 2 slide 26." });
  add(16, "backup-role", { prompt: "What supports an O-ring against being forced out into its clearance under high pressure?", options: ["Backup ring", "Wiper", "Scraper", "Single Chevron packing"], word: "backup", recallPrompt: "The O-ring's extrusion-support component is a _____ ring." });
  add(17, "filter-rating-example", { prompt: "What common filter rating is given in the supplied Test 2 review?", options: ["10 microns", "100 microns", "20 microns", "40 microns"], word: "microns", aliases: ["micron", "micrometres", "micrometers"], recallPrompt: "The review's common rating example is 10 _____; this is a size unit, not every filter's rating." });
  add(18, "steel-construction", { prompt: "Which filter is described as more durable and less likely to collapse under high pressure?", options: ["Stainless-steel mesh", "Treated paper", "A filter-free pressure line", "Two-stage return filter solely because it has two elements"], word: "steel", recallPrompt: "The durable woven-metal element is made of stainless _____." });
  add(19, "two-stage-high", { prompt: "In this two-stage filter, what is the purpose of the secondary element during high flow?", options: ["To filter flow that bypasses the fine primary stage", "To filter only the pressure supply side of every system", "To divide all flow into equal halves at all pressures", "To discharge excess fluid overboard"], word: "secondary", recallPrompt: "During high demand, flow bypassing the fine primary stage is filtered by the _____ element.", diagramKey: "twoStage" });
  add(20, "quarter-q1", { prompt: "The illustrated package reads CURE: 1Q13. Which calendar quarter does 1Q identify?", options: ["January–March", "April–June", "July–September", "October–December"], word: "first", aliases: ["1", "Q1", "1Q"], recallPrompt: "The package's cure code 1Q13 identifies the _____ calendar quarter.", diagramKey: "sealPackage" });
  add(20, "seal-package", { prompt: "Which shelf-life information is printed on the illustrated package itself?", options: ["15 years per ARP5316", "15 calendar quarters", "The packaging month alone is the shelf life", "A universal 24 months regardless of material"], word: "years", aliases: ["year"], recallPrompt: "The package labels its shelf life as 15 _____ per ARP5316.", diagramKey: "sealPackage", explanation: "The photograph explicitly prints S/L: 15 YRS PER ARP5316, CURE: 1Q13 and PKG 04/2013. Shelf life and packaging date are different fields. This tests reading the label, not calculating an expiry or authorizing installation of this photographed seal. Hydraulic Components (2024), pages/slides 75–78; supplied screenshot question 20." });
  add(21, "colour-blue", { prompt: "What does the blue dot on this package correspond to in the supplied course chart?", options: ["Air (oxygen) or MIL-H-5606", "Fuel", "Synthetic engine oil", "Petroleum-base engine oil"], word: "blue", recallPrompt: "Which dot colour does the course chart pair with air (oxygen) or MIL-H-5606?", diagramKey: "bluePackage" });
  add(22, "shuttle-high-pressure", { prompt: "What valve selects the higher-pressure source and blocks the lower-pressure supply?", options: ["Shuttle valve", "Check valve", "Schrader valve", "Sequence valve"], word: "shuttle", recallPrompt: "The illustrated alternative-supply component is a _____ valve.", diagramKey: "shuttlePair" });
  add(23, "low-pressure-instruments", { prompt: "What type of pump draws low-pressure air through instruments such as gyros?", options: ["Vane pump", "Hand pump", "Ram-air turbine", "Centrifugal pump"], word: "vane", recallPrompt: "The illustrated low-pressure instrument pump is a _____ pump.", diagramKey: "vanePair" });
  add(24, "brake-gas-removal", { prompt: "After the lesson's pneumatic emergency brake backup is used, what is required before return to service?", options: ["Bleed the brake system using the applicable procedure", "Cycle the landing gear only", "No restoration is required", "Add air to the reservoir bladder instead of removing brake gas"], word: "bled", aliases: ["bleed"], recallPrompt: "After the pneumatic brake backup is used, introduced gas must be _____ from the brakes." });
  pair(25, "backup-leather", "leather", "Which older backup-ring material has a smooth hair side?");
  pair(25, "backup-teflon", "Teflon", "Which named backup-ring material is supplied in scarfed and spiral forms?", ["PTFE"]);
  add(26, "wiper-material", { prompt: "What material does the supplied review say actuator shaft wipers are often made of?", options: ["Felt", "Treated filter paper", "Stainless-steel mesh", "Carbon pump-vane material"], word: "felt", recallPrompt: "The review's actuator shaft wipers are often made of _____." });
  pair(27, "wet-lubrication", "wet", "Which vane-pump type uses engine-oil lubrication? _____ type.");
  pair(27, "dry-material", "dry", "Which vane-pump type uses carbon vanes and needs no oil lubrication? _____ type.");
  return { choice, hard };
}
