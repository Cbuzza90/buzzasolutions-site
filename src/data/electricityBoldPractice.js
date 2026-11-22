import { electricityModule2Choice } from "./electricityModule2.js";
import { electricityBoldGuide } from "./electricityBoldStudyNotes.js";

export const electricityBoldQuestions = [];
const deckTitles = { battery: "E1.04 Batteries", induction: "E1.05 Electromagnetic Induction", generator: "E1.06 DC Generators & Controls" };
function add(deck, number, key, prompt, options) {
  const [label, slides, text] = electricityBoldGuide.find(group => group.deck === deck).entries[number - 1];
  const question = { id: `electricity2-bold-${deck}-${number}-${key}`, prompt, options, correctIndex: 0,
    explanation: `${text} (${deckTitles[deck]}, slides ${slides.join(", ")}; Bold-text PDF, ${deck} note ${number}: ${label}.)`,
    source: { deck, slides, boldNote: number }, learningTarget: key,
  };
  electricityBoldQuestions.push(question);
}
function reuse(deck, number, targets) {
  for (const target of targets.split(" ")) {
    const source = electricityModule2Choice.find(q => q.learningTarget === target);
    if (!source) throw new Error(`Missing bold-review source: ${target}`);
    add(deck, number, target, source.prompt, [...source.options]);
  }
}

// Only content explained in the bold-text PDF is selected. Course overview and
// reading-list headings are context, rather than questions about the syllabus.
for (const [number, targets] of [
  [1, "voltaic-cell"], [2, "primary"], [3, "secondary"],
  [4, "leclanche dry-cell dry-electrolyte"], [7, "alkaline-electrolyte"],
  [8, "six-cells"], [9, "nicad-current"], [10, "gel-cell"],
  [11, "voltage-series"], [12, "capacity-unit discharge-rate"],
  [13, "open-circuit loaded-voltage"], [14, "lead-spill"], [15, "lead-discharge"],
  [16, "positive-plate negative-plate lead-electrolyte"], [17, "separator sediment"],
  [18, "vent-caps"], [19, "specific-gravity hydrometer all-cells sg-before-water"],
  [20, "sg-temperature"], [21, "load-test"], [22, "corrosion-inhibitor"],
  [23, "charge-direction charging-voltage"], [24, "constant-current"],
  [25, "aircraft-charge charge-current-falls"], [26, "charging-gases charger-off"],
  [27, "lead-water lead-water-timing"], [29, "battery-install battery-disconnect"],
  [30, "nicad-positive nicad-negative"], [31, "nicad-separator"],
  [32, "thermal-runaway"], [33, "temperature-monitor"],
  [35, "nicad-capacity"], [36, "nicad-charge-risk"], [37, "nicad-spill nicad-deposits"],
  [38, "nicad-water"], [39, "separate-rooms"], [40, "deep-cycle"],
  [41, "leak-meter"], [43, "ventilation"],
]) reuse("battery", number, targets);

add("battery", 5, "wet-cell", "What identifies the early wet-cell example in the guide?", ["Electrodes immersed in a liquid solution", "A split-ring commutator collecting current", "A sealed gel arrangement with no liquid solution", "A coil and iron core energized by a circuit"]);
add("battery", 6, "cell-types", "Which set contains the four cell types compared in the guide?", ["Alkaline, lead-acid, nickel-cadmium and gel cell", "Primary, secondary, series and shunt", "Lap, wave, drum and Gramme-ring", "Anode, cathode, salt bridge and commutator"]);
add("battery", 18, "cell-case", "What separates individual cells in the illustrated lead-acid battery case?", ["Individual compartments in the high-impact plastic case", "A single shared open compartment without partitions", "The mica between commutator segments", "A relay's fixed iron core"]);
add("battery", 28, "dry-charge", "How does activation of a new dry-charged battery differ from routine water topping-up?", ["It may require the specified electrolyte before service", "It always requires automotive electrolyte regardless of specification", "It replaces all routine water addition with acid addition", "It means the battery is a non-rechargeable dry primary cell"]);
add("battery", 31, "outer-case", "What outer case contains the individual Ni-Cad cells in the guide?", ["An impact-resistant steel case", "A zinc container acting as the dry-cell electrode", "A porous carbon case", "A single gel block without individual cell enclosures"]);
add("battery", 34, "nicad-gas", "When does the guide say Ni-Cad cells emit gas?", ["Near the end of charging and when overcharged", "Only while disconnected and fully discharged", "Only when the external case is removed", "Only during the hydrometer density check"]);
add("battery", 34, "nicad-hydrogen", "At which Ni-Cad plates does the lesson describe hydrogen forming during gassing?", ["Negative plates", "Positive plates", "Both plates as oxygen", "Only the steel outer case"]);
add("battery", 34, "nicad-oxygen", "At which Ni-Cad plates does the lesson describe oxygen forming during gassing?", ["Positive plates", "Negative plates", "Both plates as hydrogen", "Only the external quick connector"]);
add("battery", 35, "nicad-nominal", "What closed-circuit cell voltage example is emphasized in the Ni-Cad guide?", ["1.2 V per cell", "2.1 V per cell", "12 V per cell", "24 V per cell"]);
add("battery", 36, "nicad-steady-current", "What is held steady in the guide's constant-current Ni-Cad charging method?", ["The specified charging current", "Battery voltage regardless of charging current", "Electrolyte density measured by a hydrometer", "The generator's mechanical rotation speed"]);
add("battery", 39, "clean-first", "What order is emphasized for battery inspection?", ["Clean before inspection", "Inspect through deposits and clean only after release", "Mix acid and alkaline residues before inspecting", "Replace all cells before any condition assessment"]);
add("battery", 42, "cell-series", "How are Ni-Cad cells connected in the guide's installation example?", ["In series according to manufacturer instructions", "In parallel solely to set the voltage rating", "Through mica-separated commutator segments", "Without electrical intercell connections"]);
add("battery", 42, "quick-connection", "What does the single quick connection in the guide's Ni-Cad example provide?", ["The battery's external main connection for installation", "The porous separator between opposite plates", "A hydrometer electrolyte sample point", "The series connection inside every individual cell"]);

for (const [number, targets] of [
  [2, "magnetic-poles flux"], [3, "wire-field current-field"], [4, "field-reversal"],
  [5, "coil iron-core electromagnet"], [6, "straight-rule"], [7, "diagram-rest"],
  [8, "self-induction"], [9, "turns"], [10, "form-factor"],
  [11, "core-permeability"], [12, "mutual-induction coil-coupling"],
  [13, "emi rfi shield swpm"],
]) reuse("induction", number, targets);
add("induction", 6, "coil-rule", "For the guide's electron-flow left-hand coil rule, what does the thumb indicate when the fingers follow electron flow through the turns?", ["The coil's north pole", "The straight conductor's electron-flow direction in this coil rule", "The direction of gravity", "The positive battery terminal in every circuit"]);
add("induction", 7, "fixed-core", "What does the guide mean when it says a relay's core is fixed?", ["The core stays fixed while an armature/contact mechanism can move", "Every part of the relay is permanently motionless", "The relay has no energized coil", "Its core moves into the coil like the illustrated solenoid core"]);
add("induction", 8, "emf-not-inductance", "Which wording corrects the bold sentence calling an induced voltage ‘inductance’?", ["The voltage is induced EMF; inductance is a circuit property", "The voltage is permeability; EMF is a battery capacity rating", "The voltage is magnetic reluctance; inductance is its polarity", "The voltage is current; inductance is its measuring instrument"]);

for (const [number, targets] of [
  [2, "emf-polarity emf-conductors emf-field emf-speed"], [3, "sine-wave"],
  [4, "instantaneous"], [5, "peak rms"], [6, "ac-slip-rings"],
  [7, "dc-commutation"], [8, "windings armature"], [9, "lap"], [10, "wave"],
  [11, "commutator mica"], [12, "shunt-field rheostat"],
  [13, "maintenance-mount maintenance-connections maintenance-clean maintenance-brush maintenance-output"],
  [14, "regulation gcu regulator-types"], [15, "three-voltage"],
  [16, "three-current"], [17, "three-reverse"],
]) reuse("generator", number, targets);
add("generator", 9, "lap-parallel", "Which armature-path connection is associated with lap winding in the guide?", ["Parallel current paths", "Series/additive-voltage paths", "Only an isolated field coil without armature paths", "A salt bridge between electrodes"]);
add("generator", 10, "wave-series", "Which connection is associated with wave winding in the guide's comparison?", ["Series/additive-voltage paths", "Lap-style parallel current paths", "A shunt field connection in place of armature windings", "A direct short across all commutator segments"]);

export const electricityBoldPractice = {
  slug: "electricity-bold-review", course: "Electricity", courseSlug: "electricity", kind: "choice",
  title: "Bold-Text Review", basePath: "/study/electricity/module-2",
  path: "/study/electricity/module-2/practice-20", storageId: "/study/electricity/module-2/practice-20:bold-v1",
  questions: electricityBoldQuestions,
};
