import { structuresHardwareQuestions, structuresModule2Diagrams } from "./structuresModule2Review.js";
import { hardwareQuizDiagrams as diagrams } from "./structuresHardwareQuizDiagrams.js";

const basePath = "/study/structures/module-2";
const banks = [[], [], []];
const titles = ["Presentation 5 · Bolts & Threaded Hardware", "Presentation 6 · Nuts & Washers", "Presentation 7 · Screws, Pins & Turn-Lock Fasteners"];
function add(deck, number, prompt, options, explanation, picture) {
  const question = { id: `hardware-${deck + 5}-${number}`, prompt, options, correctIndex: 0,
    explanation, source: { quiz: titles[deck], question: number },
    ...(picture ? { diagram: diagrams[picture] ?? structuresModule2Diagrams[picture] } : {}) };
  banks[deck].push(question);
  return question;
}
function from(deck, number, target, prompt, options, picture) {
  const source = structuresHardwareQuestions.find(q => q.learningTarget === target);
  if (!source) throw new Error(`Missing hardware source: ${target}`);
  return add(deck, number, prompt ?? source.prompt, options ?? source.options, source.explanation, picture);
}
const sizes = ["3/16 inch", "1/4 inch", "5/16 inch", "3/8 inch", "7/16 inch", "1/2 inch", "5/8 inch", "7/8 inch", "1 inch", "2 inches", "2 1/8 inches", "2 7/8 inches", "3 inches", "5/16 inch diameter; 3/8 inch length", "1/4 inch diameter; 5/16 inch grip"];
function lookup(deck, number, part, dimension, answer, detail, alternatives) {
  return add(deck, number, `In the course size examples, what is the ${dimension} of ${part}?`,
    [answer, ...(alternatives ?? sizes.filter(size => size !== answer).slice(0, 3))],
    `${part}: ${dimension} = ${answer}. ${detail} This is a fixed course-reference lookup, not a generated calculation.`);
}
const anDiameter = "In these AN bolt examples, the number following AN identifies shank diameter in sixteenths of an inch; the dash field describes length, not diameter.";
const anLength = "The AN length examples separate whole inches from remaining eighths. Length is measured from under the hex head to the shank end; it is distinct from unthreaded grip length.";
const nasGrip = "The course NAS examples specify grip in sixteenths, not AN-style total length in whole inches and eighths. Grip is the unthreaded part; the screenshot's generic word ‘length’ is qualified here.";
const washerSize = "This is the nominal matching fastener size in the supplied washer reference, not the washer's outside diameter. Washer size codes must be read for their own family.";
const nutSize = "AN310/AN320 size suffixes identify matching bolt diameter in sixteenths. This is a nominal fastener size, not wrench size across the nut flats.";

// Presentation 5. Matching rows become separate questions; repeated screenshots
// of a question are included once. The source ambiguity log below is deliberate.
for (const [number, target, prompt, options] of [
  ["1-dd", "an-dd", "What do DD indicate in the course's AN bolt part numbers?", ["Aluminum alloy", "Corrosion-resistant steel", "Drilled head", "Undrilled threaded shank"]],
  ["1-a", "an-a", "What does the A suffix indicate in an AN bolt part number?", ["No hole in the threaded shank", "A drilled head", "Aluminum alloy", "Corrosion-resistant steel"]],
  ["1-h", "an-h", "What does H indicate in an AN bolt part number?", ["A drilled head", "No hole in the head", "A drilled threaded shank only", "Aluminum alloy"]],
  ["2", "fit-5", "In the course's five-class fit chart, what is a Class 5 fit?", ["Interference fit", "Medium fit", "Free fit", "Loose fit"]],
  ["6", "standard-ms", "What does MS stand for in aircraft hardware?"],
  ["7", "thread-root", "What is the bottom of the groove between the flanks of a bolt thread?", ["Root", "Crest", "Major diameter", "Pitch"]],
  ["9", "mark-close", "What type of bolt has a triangle marking on its head?", ["Close-tolerance bolt", "Low-strength bolt", "Aluminum-alloy bolt", "Standard AN steel bolt"]],
  ["10", "thread-pitch", "What is the distance between corresponding points on two adjacent threads?", ["Pitch", "Major diameter", "Crest", "Root"]],
  ["12", "an-a"], ["16", "internal-wrench-tool", "What tool installs or removes an internal-wrenching bolt?", ["Allen key / hex wrench", "Clevis pin", "Cotter pin", "Lock clip"]],
  ["17", "an-dd"], ["18", "mark-aluminum", "Which head marking identifies an aluminum-alloy AN bolt in the course?", ["Double dash", "Single dash", "Triangle", "Cross"]],
  ["21", "standard-an", "What does AN stand for in the supplied hardware standards list?"],
  ["22", "an-h"], ["23", "an-c", "What does C indicate in the AN bolt examples?", ["Corrosion-resistant steel", "Aluminum alloy", "Drilled threads", "Drilled head"]],
  ["25", "bolt-grip", "What does grip length refer to on a bolt?", ["Length of the unthreaded portion", "Overall length including the head", "Length of the threaded portion", "Shank diameter"]],
  ["28", "bolt-ipc", "Which course-listed aircraft publication identifies the specified hardware part number?", ["Illustrated Parts Catalog (IPC)", "Naval Aircraft Factory standards list", "A generic wrench-size chart", "A retail fastener catalogue"]],
]) from(0, number, target, prompt, options);
// Direct, supplied size examples, retaining family-specific dimension names.
lookup(0, "3", "NAS1106-15", "grip length", "15/16 inch", nasGrip);
lookup(0, "4", "AN5-6A", "diameter", "5/16 inch", anDiameter);
lookup(0, "5", "NAS1103-5", "diameter", "3/16 inch", "The NAS1103 family is the 3/16-inch example in both the bolt quiz and the marked nut-quiz review. The dash number is not diameter.");
lookup(0, "8", "NAS1103-06", "diameter and grip", "3/16 inch diameter; 3/8 inch grip", nasGrip, ["3/32 inch diameter; 3/16 inch grip", "3/8 inch diameter; 3/16 inch grip", "3/16 inch diameter; 3/32 inch grip"]);
lookup(0, "11", "AN4H-3", "diameter and length", "1/4 inch diameter; 3/8 inch length", `${anDiameter} H describes the head drilling. ${anLength}`, ["1/2 inch diameter; 3/16 inch length", "3/16 inch diameter; 1/2 inch length", "1/8 inch diameter; 3/32 inch length"]);
lookup(0, "13", "NAS1404-7", "diameter and grip", "1/4 inch diameter; 7/16 inch grip", nasGrip, ["1/8 inch diameter; 7/32 inch grip", "7/16 inch diameter; 1/4 inch grip", "3/8 inch diameter; 7/8 inch grip"]);
lookup(0, "14", "AN8-21A", "diameter and length", "1/2 inch diameter; 2 1/8 inches length", `${anDiameter} ${anLength}`, ["1/4 inch diameter; 2 1/16 inches length", "3/16 inch diameter; 2 1/2 inches length", "1/4 inch diameter; 2 1/32 inches length"]);
lookup(0, "19", "AN6-10A", "length", "1 inch", anLength);
lookup(0, "20", "AN3-5", "diameter", "3/16 inch", anDiameter);
lookup(0, "26", "AN6-21", "diameter and length", "3/8 inch diameter; 2 1/8 inches length", `${anDiameter} ${anLength}`, ["1/8 inch diameter; 2 1/32 inches length", "3/16 inch diameter; 2 1/8 inches length", "1/2 inch diameter; 21/32 inch length"]);
add(0, "24", "What increments are used for the remaining fractional inch in the course AN bolt length examples?", ["1/8 inch", "1/32 inch", "1/16 inch", "1/4 inch"], anLength);
add(0, "27", "What increments identify AN bolt shank diameter in the course?", ["1/16 inch", "1/4 inch", "1/32 inch", "1/8 inch"], anDiameter);
add(0, "29", "What drilling does the course's AN6-12 example have?", ["A cotter-pin hole in the threaded shank", "An A suffix indicating no shank hole", "An H code indicating head drilling", "Both an A suffix and an H code"], "AN6-12 has no A suffix, so the course identifies a drilled threaded shank. H would identify a drilled head; A would indicate no cotter-pin hole in the threaded shank.");
from(0, "30", "clevis-pin", "Identify the unthreaded hardware shown in the bolt-quiz review.", ["Clevis pin", "Cotter pin", "AN hex-head bolt", "Internal-wrenching bolt"], "clevisPin");
for (const [letter, answer, explanation] of [
  ["A", "Thread angle", "The two lines span the angle between the thread flanks, rather than measuring a diameter or spacing."],
  ["B", "Root", "B points to the bottom of the groove between adjacent thread flanks."],
  ["C", "Crest", "C points to the outer tip of the external thread, above its root."],
  ["D", "Minor diameter", "D spans the root-to-root diameter, the smaller external thread diameter."],
  ["E", "Major diameter", "E spans the crest-to-crest diameter, the larger external thread diameter."],
  ["F", "Pitch", "F measures the spacing between corresponding points on adjacent threads."],
]) add(0, `15-${letter.toLowerCase()}`, `In the supplied thread diagram, what does ${letter} identify?`, [answer, ...["Thread angle", "Root", "Crest", "Minor diameter", "Major diameter", "Pitch"].filter(x => x !== answer).slice(0, 3)], explanation, "thread-labels");

// Presentation 6: use the displayed correct answer, not a red selected answer.
const nutOptions = ["AN310 castle nut", "AN320 shear castle nut", "AN315 plain nut", "AN316 check nut", "AN350 wing nut", "AN355 slotted engine nut", "AN365 fibre self-locking nut", "NAS679 metal self-locking nut"];
for (const [number, target, picture, answer] of [
  ["2", "nut-an365", "fibre-nut", nutOptions[6]], ["3", "nut-an355", "engine-nut", nutOptions[5]],
  ["20", "nut-an316", "check-nut", nutOptions[3]], ["22", "nut-an350", "wing-nut", nutOptions[4]],
  ["27", "nut-an320", "shear-castle", nutOptions[1]], ["29", "nut-an310", "castle-nut", nutOptions[0]],
]) from(1, number, target, "Identify the nut in the supplied quiz illustration.", [answer, ...nutOptions.filter(x => x !== answer).slice(0, 3)], picture);
from(1, "5", "washer-an960", "Identify the washers in the supplied quiz photograph.", ["AN960 plain washer", "AN935 split lock washer", "AN936 shake-proof washer", "AN970 penny washer"], "plain-washers");
from(1, "8", "nut-an355", "Which listed nut requires a cotter pin for safetying?", ["AN355", "AN315", "NAS679", "AN316"]);
add(1, "9", "Identify the nut plate in the supplied photograph.", ["Fixed nut plate", "Floating nut plate", "Tinnerman anchor nut", "Fixed corner nut plate"], "The threaded nut is fixed to the two-lug mounting plate. Unlike the floating example, there is no separate movable nut in a retaining cage. The plate provides fastening access where the back of a joint is restricted.", "fixed-nutplate");
for (const [key, target, answer] of [["fibre", "nut-an365", nutOptions[6]], ["shear", "nut-an320", nutOptions[1]], ["castle", "nut-an310", nutOptions[0]], ["plain", "nut-an315", nutOptions[2]], ["wing", "nut-an350", nutOptions[4]], ["metal", "nut-nas679", nutOptions[7]]]) {
  from(1, `10-${key}`, target, `Which designation matches the ${answer.replace(/^(AN\d+|NAS\d+) /, "")}?`, [answer.split(" ")[0], ...nutOptions.filter(x => x !== answer).slice(0, 3).map(x => x.split(" ")[0])]);
}
lookup(1, "4", "AN970-5 penny washer", "nominal fastener diameter", "5/16 inch", washerSize);
lookup(1, "6", "AN960PD-616 plain washer", "nominal fastener diameter", "3/8 inch", washerSize);
lookup(1, "7", "AN960PD-10 plain washer", "nominal fastener diameter", "3/16 inch", washerSize);
lookup(1, "11", "AN5-6A", "diameter", "5/16 inch", `${anDiameter} Source correction: nut-quiz question 11 prints 5/15 inch, while bolt-quiz question 4 gives 5/16 inch for this same part. The 5/15 entry is a typo.`);
add(1, "12", "How is matching bolt diameter indicated on AN310 and AN320 nuts in the course?", ["In sixteenths of an inch", "In quarters of an inch", "In eighths of an inch", "In thirty-seconds of an inch"], nutSize);
from(1, "13", "nut-an365", "Which listed part number identifies a self-locking nut?", ["AN365", "AN315", "AN310", "AN350"]);
from(1, "14", "washer-ms20002", "Which bolt type uses the illustrated MS20002 washer to clear its under-head radius?", ["Internal-wrenching bolts", "Clevis pins", "General AN aluminum bolts without this requirement", "Any close-tolerance bolt solely because of its tolerance"], "special-washer");
lookup(1, "15", "AN5-30A", "length", "3 inches", anLength);
lookup(1, "16", "NAS1104-5", "diameter and grip", "1/4 inch diameter; 5/16 inch grip", nasGrip, ["1/8 inch diameter; 5/32 inch grip", "1/2 inch diameter; 5/8 inch grip", "11/32 inch diameter; 1/4 inch grip"]);
add(1, "17", "How is the threaded shank of AN6-11 identified in the course?", ["Drilled, because the A suffix is absent", "Undrilled, because every AN bolt has an A suffix", "Drilled only in the head, as shown by an H code", "Undrilled, because 11 identifies the material"], "The A suffix indicates an undrilled threaded shank. AN6-11 has no A suffix, so the course identifies a cotter-pin hole in the threaded shank. The size digits do not indicate material.");
add(1, "18", "Identify the spring nut in the supplied quiz illustration.", ["Tinnerman anchor-type nut", "Fixed nut plate", "Tinnerman U-type nut", "Floating nut plate"], "The spring-sheet anchor nut has mounting holes at its ends and formed spring tabs at the screw opening. The course identifies it as a Tinnerman anchor type, rather than a solid threaded nut plate.", "tinnerman-anchor");
lookup(1, "19", "AN3-20", "length", "2 inches", anLength);
add(1, "21", "Identify the nut plate in this supplied photograph.", ["Floating nut plate", "Fixed nut plate", "Tinnerman nut", "Fixed corner nut plate"], "The nut is retained in a cage that permits limited movement for alignment with the screw. That movement distinguishes this floating assembly from the rigid fixed nut plate in the other photograph.", "floating-nutplate");
lookup(1, "23", "AN4-7A", "diameter and length", "1/4 inch diameter; 7/8 inch length", `${anDiameter} ${anLength}`, ["7/16 inch diameter; 1/2 inch length", "1/2 inch diameter; 7/32 inch length", "7/32 inch diameter; 1/4 inch length"]);
from(1, "24", "nut-engagement", "For the course's non-chamfered bolt example, how many threads project beyond a properly engaged self-locking nut?", ["1–3", "2–7", "0", "3–5"]);
lookup(1, "25", "NAS1105-7", "grip length", "7/16 inch", nasGrip);
for (const [part, answer] of [["AN310-6", "3/8 inch"], ["AN320-4", "1/4 inch"], ["AN320-8", "1/2 inch"], ["AN310-5", "5/16 inch"]]) lookup(1, `26-${part.toLowerCase()}`, part, "nominal bolt diameter", answer, nutSize);
add(1, "28", "What does H indicate in the course example NAS6204-5H?", ["Drilled head", "Drilled threaded shank", "Material type", "No hole in the head"], "The supplied answer review identifies the H in NAS6204-5H as a drilled head. This concerns the head, not the shank diameter or material; use the designation rules for the particular NAS family.");
lookup(1, "30", "NAS1103-5", "diameter", "3/16 inch", "The marked answer review explicitly gives the NAS1103 example as 3/16 inch. The dash field identifies grip, not diameter.");

// Presentation 7. True/false concepts become four-option questions, and each
// matching member is independently covered with a source-specific explanation.
lookup(2, "1", "AN6-7A", "diameter", "3/8 inch", anDiameter);
lookup(2, "2", "AN960PD10", "nominal fastener diameter", "3/16 inch", washerSize);
add(2, "3", "Which three turn-lock fastener families are listed in the supplied quiz?", ["Dzus, Camloc and Airloc", "Fillister, washer-head and flat-head", "Fillister, round-head and truss-head", "Flat, Phillips and Robertson"], "Dzus, Camloc and Airloc are turn-lock fastener families. Screw head shapes and screwdriver drive types are separate classifications.");
from(2, "4", "washer-head-screw", "Identify the structural screw shown in the supplied illustration.", ["Washer-head structural screw", "Truss-head machine screw", "Flat-head structural screw", "Fillister-head structural screw"], "washer-head");
add(2, "5", "Which three structural screw head styles are listed in the course quiz?", ["Fillister, washer-head and flat-head", "Washer-head, truss-head and Camloc", "Fillister, round-head and truss-head", "Dzus, Camloc and Airloc"], "The structural group contains fillister, washer-head and flat-head styles. Structural screws have a grip and bolt-like tolerances; the larger head alone does not establish the structural classification.");
from(2, "6", "roll-pin", "Identify the pin in the supplied quiz illustration.", ["Roll pin", "Cotter pin", "Clevis pin", "Taper pin"], "roll-pin");
lookup(2, "7", "NAS6205-3H", "diameter", "5/16 inch", "The marked answer review identifies this family/size as 5/16 inch. H identifies head drilling, not diameter.");
add(2, "8", "Which statement describes the uses of roll, clevis, cotter and taper pins in the course?", ["They secure, lock or provide a pivot point, depending on type", "They are all torque-measuring instruments", "They are interchangeable with every threaded bolt", "They all adjust control-cable tension"], "Pins serve different retaining, locking and pivot roles. A roll pin uses spring tension, a clevis pin forms a retained pivot, a cotter pin locks or retains, and a taper pin fits a tapered joint; they are not interchangeable simply because all are pins.");
from(2, "9", "fillister-screw", "Identify the screw head shown in the supplied quiz illustration.", ["Fillister head", "Round head", "Truss head", "Flat head"], "fillister-head");
add(2, "10", "In the supplied review, which designation matches the illustrated 82° countersunk screw?", ["AN505", "AN503", "AN507", "AN515"], "The Presentation 7 answer review explicitly pairs this 82° illustration with AN505. Contrast its pictured angle with the separate 100° AN507 illustration. Earlier slide-angle wording conflicts are retained in the source notes; this question is specific to this reviewed illustration.", "flat-82");
lookup(2, "11", "NAS1404-6", "grip length", "3/8 inch", nasGrip);
from(2, "12", "camloc", "Identify the exploded turn-lock fastener shown in the supplied quiz illustration.", ["Camloc fastener", "Dzus fastener", "Airloc fastener", "Rivet"], "camloc");
add(2, "13", "What are the three general classifications of aircraft screws in the course?", ["Machine, structural and self-tapping", "Structural, fuel-tank and airframe", "Wood, rivet and machine", "Bolts, screws and rivets"], "Machine, structural and self-tapping classify screws by their construction and application. Machine screws are generally fully threaded; structural screws have bolt-like strength and a grip; self-tapping screws form or cut their mating threads in suitable material.");
from(2, "14", "standard-sae", "What historical expansion of SAE is used by this course?", ["Society of Automotive Engineers", "Standard Aviation Equipment", "Standard of Aviation Excellence", "Society of Aviation Engineers"]);
lookup(2, "15", "AN310-8", "nominal bolt diameter", "1/2 inch", nutSize);
for (const [part, answer] of [["AN960616L", "3/8 inch"], ["AN960PD516", "5/16 inch"], ["AN960PD10", "3/16 inch"], ["AN960416L", "1/4 inch"]]) lookup(2, `16-${part.toLowerCase()}`, part, "nominal fastener diameter", answer, `${washerSize} L denotes the light-thickness version, not a different nominal diameter.`);
for (const [letter, target, answer, wrong] of [["A", "self-tap-a", "Sharp point", ["Blunt point", "No point and no threads", "Separate cross pin"]], ["B", "self-tap-b", "Blunt point", ["Sharp point", "No threads", "Cotter-pin eye"]]]) {
  from(2, `17-${letter.toLowerCase()}`, target, `Which point does the course's type ${letter} self-tapping screw have?`, [answer, ...wrong]);
}
add(2, "18", "What material does the supplied review identify for washer AN960PD416?", ["Aluminum", "Brass", "Magnesium", "Steel"], "The review identifies AN960PD416 as aluminum. PD is used for aluminum in these specific course washer examples; do not transfer an unrelated bolt or nut family's suffix rules to this washer.");
lookup(2, "19", "AN5H-3A", "diameter and length", "5/16 inch diameter; 3/8 inch length", `${anDiameter} ${anLength} H identifies head drilling; A identifies an undrilled threaded shank.`);
from(2, "20", "camloc-tool", "Identify the pliers in the supplied quiz photograph.", ["Camloc pliers", "Lineman pliers", "Duckbill pliers", "Cleco pliers"], "camloc-pliers");
from(2, "21", "clevis-pin", "Identify the headed pin with the transverse retaining hole.", ["Clevis pin", "Roll pin", "Cotter pin", "Taper pin"], "clevis-pin");
lookup(2, "22", "AN5-27", "length", "2 7/8 inches", anLength);
for (const [part, answer] of [["AN380-5-2", "5/32 inch"], ["AN380-6-5", "3/16 inch"], ["AN380-4-2", "1/8 inch"], ["AN380-3-4", "3/32 inch"]]) lookup(2, `23-${part.toLowerCase()}`, part, "diameter", answer, "For this AN380 family the first dash field specifies diameter in thirty-seconds; the second field specifies length. These four explicit sizes come from the supplied matching answer review.");
for (const [letter, target, answer] of [["C", "an-c", "Corrosion-resistant steel"], ["H", "an-h", "Hole in the head"], ["DD", "an-dd", "Aluminum alloy"], ["A", "an-a", "No hole in the threaded shank"]]) from(2, `24-${letter.toLowerCase()}`, target, `In the supplied AN bolt matching set, what does ${letter} indicate?`, [answer, ...["Corrosion-resistant steel", "Hole in the head", "Aluminum alloy", "No hole in the threaded shank"].filter(x => x !== answer)]);
from(2, "26", "dzus", "Identify the turn-lock stud and spring shown in the supplied quiz illustration.", ["Dzus fastener", "Camloc fastener", "Airloc fastener", "Rivet"], "dzus");
lookup(2, "27", "NAS1104-5", "diameter and grip", "1/4 inch diameter; 5/16 inch grip", nasGrip, ["1/8 inch diameter; 5/32 inch grip", "1/2 inch diameter; 5/8 inch grip", "5/16 inch diameter; 1/4 inch grip"]);
from(2, "28", "bolt-grip", "What does grip length refer to on a bolt?", ["Length of the unthreaded portion", "Length measured from under the head to the end", "Major diameter", "Length of the threaded portion"]);
add(2, "29", "In the supplied review, which designation matches the illustrated 100° countersunk screw?", ["AN507", "AN505", "AN515", "AN503"], "The supplied Presentation 7 review identifies this 100° flat-head illustration as AN507. The other pictured countersunk screw is 82° and is identified as AN505; select using the reviewed illustration rather than the inconsistent angle wording in older slides.", "flat-100");
from(2, "30", "washer-an970", "Which listed part is an oversize penny washer?", ["AN970-5", "AN960-10", "AN320-5", "NAS679-3"]);
// Independently cover each member of the three grouped classification questions.
for (const target of ["dzus", "camloc", "airloc", "structural-screw", "machine-screw", "self-tapping", "washer-head-screw", "flat-head-screw"]) from(2, `group-${target}`, target);

export const structuresHardwareQuizParts = banks.map((questions, index) => ({
  slug: `structures-presentation-${index + 5}`, course: "Structures", courseSlug: "structures", kind: "choice",
  title: titles[index], questions, basePath, path: `${basePath}/practice-${index + 3}`,
  storageId: `${basePath}/practice-${index + 3}:hardware-v1`,
}));

export const hardwareQuizSourceIssues = [
  ["Presentation 5, question 1 · CC", "The first matching screenshot prints CC, but later questions and the existing source deck use C for corrosion-resistant steel. CC is withheld as an unverified code; C is covered by question 23."],
  ["Presentation 5 and NAS dimensions", "The quiz loosely calls NAS dash-field dimensions length. The course deck identifies them as unthreaded grip in sixteenths. Questions use grip explicitly; selected radio buttons alone are not treated as marked correct answers."],
  ["Presentation 6, question 1 · AN75-3", "The screenshot prints AN75-3 with a 5/16-inch answer. That designation is unclear and is withheld pending a corrected part number; it is not silently changed to AN5-3."],
  ["Presentation 6, question 11 · 5/15", "The marked review prints 5/15 inch for AN5-6A, conflicting with 5/16 inch in Presentation 5 question 4 and the AN diameter rule. The practice answer is corrected to 5/16 inch."],
  ["Presentation 7, question 25 · AN392-6", "The screenshot calls AN392-6 a cotter pin and gives 3/16-inch length. The existing pins deck identifies AN392 as a clevis-pin family. The pin type and incomplete dimension designation need clarification; this question is withheld."],
  ["Presentation 7 · countersunk screw illustrations", "The new marked review pairs its pictured 82° screw with AN505 and its 100° screw with AN507. These specific reviewed illustrations are covered; earlier slide-angle inconsistencies remain flagged in the source qualifications."],
];
export const hardwareQuizNoteSections = [
  { id: "hardware-quiz-source-issues", title: "Hardware quiz · Source corrections & unclear questions", items: hardwareQuizSourceIssues },
  { id: "hardware-quiz-size-references", title: "Hardware quiz · Fixed size reference examples", items: banks.flat().filter(q => q.prompt.startsWith("In the course size examples,")).map(q => [q.prompt.replace("In the course size examples, what is the ", "").replace(/\?$/, ""), q.explanation]) },
  { id: "hardware-quiz-identification", title: "Hardware quiz · Picture identification & distinctions", items: banks.flat().filter(q => q.diagram).map(q => [`${q.source.quiz} · ${q.source.question}`, `${q.options[0]}. ${q.explanation}`, undefined, q.diagram]) },
  { id: "hardware-quiz-classifications", title: "Hardware quiz · Classification groups & point types", items: [
    ["Turn-lock families", "Dzus uses a stud and spring; Camloc uses a stud assembly, grommet and receptacle; Airloc uses a stud, cross pin and receptacle. These are fastener families, not screw head styles."],
    ["Screw classifications", "Machine screws are generally fully threaded with no grip; structural screws have bolt-like shear strength and a grip; self-tapping screws are taught for lightweight nonstructural applications."],
    ["Structural head styles", "The quiz lists fillister, washer-head and flat-head. The washer-head has an integral bearing area; the flat-head fits a countersink; the fillister has a raised head. A head shape alone does not establish a screw's specification."],
    ["Self-tapping types", "Type A has a sharp point. Type B has a blunt point and finer threads. These point types are separate from machine-versus-structural classification."],
    ["Pin roles", "Roll pins use spring tension; clevis pins form retained pivots; cotter pins lock castellated nuts or retain drilled pins; taper pins fit tapered shear joints. Use the appropriate pin for its specified function."],
  ] },
];
