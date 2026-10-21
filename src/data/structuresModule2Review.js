import { measuringToolsQuestions } from "./measuringToolsPractice.js";
import { shuffleQuestions } from "../pages/safetyTestLogic.js";

export const structuresReviewCategories = ["measuring", "safety-cables", "bolts", "nuts", "screws-pins"];
const questions = [];
const image = (file, width, height, alt) => ({ src: `/structures/module-2/${file}`, alt, crop: { x: 0, y: 0, width, height, imageWidth: width, imageHeight: height } });
export const structuresModule2Diagrams = {
  wirePatterns: image("wire-patterns.png", 1866, 683, "Four safety-wire routing examples from the supplied course"),
  turnbuckleParts: image("turnbuckle-parts.jpeg", 800, 600, "Labelled turnbuckle showing barrel, cable eye, fork end and left-hand-thread groove"),
  turnbuckles: image("turnbuckles.jpg", 1704, 1278, "Three cable-tension adjustment assemblies with threaded ends"),
  cableConstruction: image("cable-construction.png", 321, 157, "Labelled cable cross sections: 1 by 7 and 1 by 19 non-flexible, 7 by 7 flexible and 7 by 19 extra-flexible"),
  cotterInstallation: image("cotter-installation.png", 1207, 588, "Two course illustrations of a cotter pin securing a castellated nut"),
  snapRing: image("snap-ring.jpg", 225, 225, "Open-ended circular retaining component with two plier holes"),
  boltMarkings: image("bolt-markings.jpg", 550, 355, "Course chart of bolt head markings and their material or special-feature meanings"),
  nutFamilies: image("nut-families.jpg", 893, 535, "Labelled standard aircraft nuts: castle, shear castle, plain, check, screw, engine and wing nuts"),
  washers: image("washers.jpg", 695, 270, "AN960 plain washer and AN970 large-area washer with diameter and thickness references"),
  clevisPin: image("clevis-pin.jpg", 253, 112, "Headed unthreaded pin with a transverse retaining hole and dimension arrows"),
  dzusAssembly: image("dzus-assembly.jpg", 759, 641, "Exploded and sectional Dzus assembly with stud, grommet and spring labelled"),
  wrapReference: image("turnbuckle-wraps.png", 688, 1125, "Labelled comparison of all four turnbuckle safetying patterns"),
};
const wrapDiagram = (y, height) => ({ src: "/structures/module-2/turnbuckle-wraps.png", alt: "Course turnbuckle safety-wire routing detail; name labels are outside the crop", crop: { x: 10, y, width: 640, height, imageWidth: 688, imageHeight: 1125 } });
const questionDiagrams = { circlip: structuresModule2Diagrams.snapRing, turnbuckle: structuresModule2Diagrams.turnbuckles, "clevis-pin": structuresModule2Diagrams.clevisPin };
export const structuresHardwareNoteSections = [];
const deckNames = {
  "safety-cables": "Safety Methods and Aircraft Cable",
  bolts: "Hardware – Bolts and Threaded Fasteners",
  nuts: "Hardware – Nuts and Washers",
  "screws-pins": "Hardware – Screws, Pins, Turn Lock Fasteners",
};
function sourceText(category, slides) { return `${deckNames[category]}, slide${slides.length === 1 ? "" : "s"} ${slides.join(", ")}`; }
function group(category, id, title, rows, stem = "Which term matches this description?") {
  const section = { id: `structures-${id}`, title, items: [] };
  rows.forEach(([target, label, description, slides], index) => {
    const peers = [...rows.slice(index + 1), ...rows.slice(0, index)].map(row => row[1]).filter(text => text !== label);
    const explanation = `${label}: ${description} (${sourceText(category, slides)}.)`;
    questions.push({ id: `structures-${target}`, learningTarget: target, category,
      prompt: `${stem}\n${description}`, options: [label, ...[...new Set(peers)].slice(0, 3)], correctIndex: 0,
      explanation, source: { deck: category, slides }, ...(questionDiagrams[target] ? { diagram: questionDiagrams[target] } : {}),
    });
    section.items.push([label, `${description} (${sourceText(category, slides)}.)`, undefined, questionDiagrams[target]]);
  });
  structuresHardwareNoteSections.push(section);
}
function choice(category, id, title, rows) {
  const section = { id: `structures-${id}`, title, items: [] };
  for (const [target, label, prompt, answer, wrong, description, slides] of rows) {
    questions.push({ id: `structures-${target}`, learningTarget: target, category, prompt,
      options: [answer, ...wrong], correctIndex: 0,
      explanation: `${description} (${sourceText(category, slides)}.)`, source: { deck: category, slides }, ...(questionDiagrams[target] ? { diagram: questionDiagrams[target] } : {}),
    });
    section.items.push([label, `${description} (${sourceText(category, slides)}.)`, undefined, questionDiagrams[target]]);
  }
  structuresHardwareNoteSections.push(section);
}

group("safety-cables", "safety-methods", "Safetying, witness wire & locking devices", [
  ["safetying", "Safetying", "Securing aircraft fasteners so they do not work loose because of vibration.", [5]],
  ["double-twisted", "Double-twisted method", "The most commonly used safety-wiring method in the supplied course.", [7]],
  ["single-wire", "Single-wire method", "A safety-wiring method used for closely spaced fasteners in closed patterns such as a triangle, square or circle.", [7,11]],
  ["witness-wire", "Witness wire", "Light copper or brass wire used to show whether a switch or component has been activated or moved.", [35,45]],
  ["tab-washer", "Tab washer", "A locking washer whose tab forms a physical barrier to prevent a bolted joint from turning.", [47]],
  ["peening", "Peening", "Using the round head of a ball-peen hammer to mushroom or flatten material as described in the locking-methods slide.", [48]],
  ["staking", "Staking", "Using a chisel or punch to create a local indentation as a locking method.", [48]],
  ["circlip", "Circlip / snap ring", "An open-ended spring retaining ring that fits a machined groove to retain a component while permitting intended rotation.", [50,51]],
  ["internal-circlip", "Internal circlip", "A retaining ring fitted into a bore rather than over a shaft.", [50]],
  ["external-circlip", "External circlip", "A retaining ring fitted over a shaft rather than into a bore.", [50]],
]);
choice("safety-cables", "wiring-rules", "Safety-wire rates & installation principles", [
  ["wire-032", "0.032-inch safety wire", 'How many twists per inch does the course specify for 0.032-inch safety wire?', "6–8", ["2–5", "5–7", "8–10"], "For 0.032-inch wire, the course specifies 6–8 twists per inch.", [12]],
  ["wire-041", "0.040/0.041-inch safety wire", 'How many twists per inch does the course specify for 0.040/0.041-inch safety wire?', "5–7", ["2–5", "6–8", "8–10"], "For 0.040/0.041-inch wire, the course specifies 5–7 twists per inch.", [13]],
  ["wire-020", "0.020-inch safety wire", 'How many twists per inch does the course specify for 0.020-inch safety wire?', "8–10", ["2–5", "5–7", "6–8"], "For 0.020-inch wire, the course specifies 8–10 twists per inch.", [13]],
  ["wire-fastener-limit", "Course bolt-wiring limit", "For the fastener-wiring arrangement taught in slide 9, what maximum number is specified?", "3 fasteners", ["6 fasteners", "No limit", "At least 3 fasteners"], "Slide 9 specifies a maximum of three fasteners wired together. This is the course arrangement; do not apply it as a universal rule for every approved wiring pattern.", [9]],
  ["wire-direction", "Wire pull direction", "How should safety wire oppose a fastener's tendency to loosen?", "By pulling in the tightening direction", ["By pulling in the loosening direction", "By remaining completely slack", "By replacing the required fastener torque"], "The wire must be arranged so a loosening tendency is counteracted by tightening tension in the wire.", [7,14]],
  ["wire-tension", "Even wire twists", "What helps produce an even twist while safety wire is being twisted?", "Maintaining tension on the wire", ["Allowing long loose loops", "Alternating between slack and impacts", "Removing tension before each turn"], "Maintain tension while twisting to obtain an even twist.", [13]],
  ["wire-clearance", "Clearance from moving parts", "What must be checked when wire passes over the top of a fastener?", "That no moving component can rub against the wire", ["That the wire is touching the nearest moving part", "That the fastener can loosen freely", "That the wire replaces the washer"], "Check the travel of surrounding components so they cannot rub the wire.", [10]],
  ["circlip-tool", "Circlip pliers", "Which tool is intended to install circlips or snap rings?", "Circlip pliers", ["Lockwire pliers", "Duckbill pliers", "A torque wrench"], "Circlips often require special circlip or snap-ring pliers for installation.", [51]],
  ["anaerobic-locker", "Thread-locking compound", "What curing condition does the supplied thread-locking-compound slide describe?", "Absence of air in the joint", ["Continuous exposure to moving air", "Only immersion in water", "Only exposure to sunlight"], "The slide describes a gap-filling compound that cures in the absence of air. Use only the specified product in its approved application; the slide's broad structural-use statement is not a rule for every adhesive product.", [49]],
]);
group("safety-cables", "cable-fittings", "Turnbuckles, cable tension & terminals", [
  ["turnbuckle", "Turnbuckle", "A device also called a stretching screw or bottle-screw, used to adjust cable tension or length.", [16,17]],
  ["turnbuckle-barrel", "Turnbuckle barrel", "The central fitting with a left-hand thread at one end and a right-hand thread at the other.", [16,17]],
  ["turnbuckle-lock-clip", "Turnbuckle lock clip", "A correctly matched clip that can secure the designated turnbuckle without safety wire.", [37]],
  ["tensiometer", "Tensiometer", "An instrument used to measure control-cable tension; the course says not to take the reading too close to the turnbuckle.", [40]],
  ["swage-terminal", "Swage terminal", "A cable-end fitting secured by pressing it onto wire inserted into its deep hole.", [55,56,57,58]],
  ["nicopress", "Nicopress sleeve", "A sleeve used to form a cable termination around a bushing or thimble eye, followed by the specified crimping and gauging procedure.", [59,60,61,62]],
]);
choice("safety-cables", "turnbuckle-rules", "Turnbuckle adjustment & termination checks", [
  ["turnbuckle-groove", "Left-hand thread identification", "What identifies the left-hand-threaded end of the turnbuckle barrel?", "A groove", ["A castellated head", "A nylon insert", "A cross pin"], "A groove identifies the left-hand-threaded end.", [16,17]],
  ["turnbuckle-exposed", "Maximum exposed threads", "What maximum number of threads may be exposed at each turnbuckle end in the course?", "3", ["1", "2", "5"], "No more than three threads may be exposed at either end after proper adjustment and safetying.", [19,25]],
  ["turnbuckle-equal", "Equal thread engagement", "How should cable terminals engage the two ends when adjusting the barrel?", "By equal distances", ["One fully engaged and the other nearly out", "With one end left unthreaded", "With both ends backed out completely"], "Screw the terminals into the barrel by equal distances. Adjustment at more than one location may be required.", [19]],
  ["turnbuckle-damage", "Distorted turnbuckle", "What should be done with a turnbuckle showing thread distortion or bending?", "Replace it", ["Straighten it and return it without inspection", "Add witness wire to restore its strength", "Use thicker lockwire instead of replacing it"], "Replace a turnbuckle with thread distortion or bending; bending places undesirable stress on the cable.", [21]],
  ["turnbuckle-method", "Specified safetying method", "Where should the turnbuckle's required safetying method be checked?", "The applicable maintenance manual", ["The colour of nearby wire alone", "Only another aircraft's appearance", "A general hardware-store label"], "The course lists straight and spiral, single and double wraps, plus lock clips. Check the maintenance manual for the specified method.", [22]],
  ["turnbuckle-wrap-turns", "Wire-end wraps", "In the illustrated turnbuckle wrapping procedures, what is the minimum number of turns around each specified shank?", "4 turns", ["1 turn", "2 turns", "3 turns"], "The illustrated procedures call for at least four turns at each specified wire-end wrap.", [24,28,33,34]],
  ["double-wrap-wires", "Double-wrap wire count", "How many separate lengths of wire are used for the double-wrap methods described?", "2", ["1", "3", "4"], "Double-wrap straight and double-wrap spiral use two separate lengths of wire.", [29,30,31]],
  ["cable-reading-location", "Tension reading location", "What is the course instruction about taking a tensiometer reading near a turnbuckle?", "Do not take it too close to the turnbuckle", ["Always take it against the turnbuckle barrel", "Take it only on the turnbuckle threads", "Use the lock clip as the measuring point"], "The supplied slide says not to take a cable-tension reading too close to the turnbuckle.", [40]],
  ["nicopress-first-step", "Sleeve and thimble", "What is the first Nicopress installation step described?", "Loop the cable around a bushing or thimble and return it through the sleeve", ["Crimp an empty sleeve before inserting the cable", "Remove the thimble after every crimp", "Thread the cable into the turnbuckle barrel directly"], "Slip the sleeve over the cable, loop the free end around a bushing or thimble eye, and return it through the other side of the sleeve.", [60]],
  ["nicopress-check", "Termination gauge check", "What tool checks that the illustrated Nicopress sleeve has been sufficiently crimped?", "A go/no-go gauge", ["A radius gauge", "A pyrometer", "A torque-angle pointer"], "After the specified crimping sequence, use the applicable go/no-go gauge to check the sleeve. The depicted example has three crimps; use the specified sleeve/tool procedure.", [61,62]],
]);
choice("safety-cables", "cable-construction", "Cable construction & cotter-pin identification", [
  ["cable-7-19", "7 × 19 extra-flexible", "Which course cable construction is intended to pass over pulleys?", "7 × 19 extra-flexible", ["7 × 7 flexible", "1 × 19 non-flexible", "1 × 7 non-flexible"], "The table describes seven strands of nineteen wires as extra-flexible cable for pulley runs.", [53]],
  ["cable-7-7", "7 × 7 flexible", "Which cable construction does the course permit for straight runs with a slight change in direction?", "7 × 7 flexible", ["1 × 7 non-flexible", "1 × 19 non-flexible", "Solid rod with no strands"], "Seven strands of seven wires form the course flexible cable, used for straight runs with slight directional changes allowed.", [53]],
  ["cable-1-19", "1 × 19 non-flexible", "How does the course classify a single strand of nineteen wires?", "Non-flexible cable", ["Extra-flexible pulley cable", "A fibre locking insert", "A threaded terminal"], "The course classifies 1 × 19 as non-flexible for straight runs without a change in direction.", [54]],
  ["cable-1-7", "1 × 7 non-flexible", "How does the course classify a single strand of seven wires?", "Non-flexible cable", ["Extra-flexible pulley cable", "A washer stack", "A safety-wire wrap"], "The course also classifies 1 × 7 as non-flexible for straight runs without a change in direction.", [54]],
  ["cable-material", "Cable materials", "Which two cable materials are listed in the supplied construction tables?", "Stainless steel and galvanized carbon steel", ["Brass and nylon", "Aluminum and rubber", "Copper and ceramic"], "The cable tables list stainless steel and galvanized carbon steel.", [53,54]],
  ["cotter-diameter-example", "AN380-2-6 diameter", 'In the supplied example, what diameter is given for an AN380-2-6 cotter pin?', '2/32 inch (1/16 inch)', ['2/4 inch', '1 inch', '1/2 inch'], "The slide explicitly gives AN380-2-6 a diameter of 2/32 inch, or 1/16 inch. This is recognition of a supplied example, not a generated calculation.", [42]],
  ["cotter-length-example", "AN380-1-4 length", "In the supplied example, what length is given for AN380-1-4?", "1 inch", ["1/32 inch", "1/4 inch", "1.4 inches"], "The supplied example gives AN380-1-4 a length of 1 inch. The first code identifies diameter and the second identifies length.", [41,42]],
]);
const wraps = [
  ["single-straight-picture", "Single wrap straight", 25, 115, [24,25]],
  ["double-straight-picture", "Double wrap straight", 225, 115, [29,30]],
  ["single-spiral-picture", "Single wrap spiral", 430, 97, [26,27,28]],
  ["double-spiral-picture", "Double wrap spiral", 800, 112, [31,32,33,34]],
];
wraps.forEach(([id, , y, height]) => { questionDiagrams[id] = wrapDiagram(y, height); });
choice("safety-cables", "wrap-identification", "Identify all four turnbuckle safetying patterns", wraps.map(([id, label, , , slides], index) => [
  id, label, `Identify the turnbuckle safetying method in diagram ${index + 1}.`, label,
  wraps.filter(row => row[1] !== label).map(row => row[1]),
  `The supplied comparison identifies this pattern as ${label.toLowerCase()}. Compare the wire routing with the full labelled reference.`, slides,
]));
choice("safety-cables", "nicopress-sequence", "Nicopress crimping step", [
  ["nicopress-crimps", "Illustrated crimping step", "In the course's three-step Nicopress example, what follows positioning the cable and sleeve?", "Make three crimps in the illustrated sequence", ["Skip crimping and paint a witness mark", "Gauge the uncrimped sleeve and release it", "Replace the thimble with lockwire"], "Step 2 of the supplied example makes three crimps in the numbered order. Step 3 checks the result with the applicable go/no-go gauge. Use the specified tool/sleeve instructions for actual work.", [60,61,62]],
]);

choice("bolts", "standards", "Hardware standards & organizations", [
  ["standard-an", "AN", "What does AN stand for in the supplied bolt-slides acronym list?", "Army Navy", ["Aircraft Number", "Aerospace National", "Approved Nut"], "The supplied main slide list expands AN as Army Navy. Historical naming variants appear in older notes; the quiz specifies this course list.", [6]],
  ["standard-ms", "MS", "What does the hardware abbreviation MS stand for?", "Military Standard", ["Material Specification", "Metric Screw", "Maintenance Schedule"], "MS means Military Standard in the course hardware list.", [6]],
  ["standard-nas", "NAS", "What does NAS stand for in the course's principal standards list?", "National Aerospace Standard", ["National Aircraft Screw", "Naval Assembly System", "Nonferrous Alloy Standard"], "NAS is National Aerospace Standard. Later example slides say Aircraft; this review uses the principal standards list rather than repeating that inconsistency.", [6,49]],
  ["standard-and", "AND", "Which expansion is given for AND in the course list?", "Air Force-Navy Design", ["Aircraft Nut Diameter", "Aerospace National Directive", "Approved Nonstructural Device"], "AND is listed as Air Force-Navy Design.", [7]],
  ["standard-asa", "ASA", "Which historical organization is abbreviated ASA in the course list?", "American Standards Association", ["Aircraft Safety Authority", "Aerospace Screw Assembly", "Approved Steel Alloy"], "The historical acronym ASA is American Standards Association in this course list.", [7]],
  ["standard-naf", "NAF", "What does NAF stand for in the supplied hardware list?", "Naval Aircraft Factory", ["National Aerospace Fastener", "Nonstandard Aircraft Fitting", "Navy Alloy Finish"], "NAF means Naval Aircraft Factory.", [7]],
  ["standard-sae", "SAE", "Which historical expansion for SAE is used in the supplied slides?", "Society of Automotive Engineers", ["Standards for Aircraft Engines", "Steel Alloy Equipment", "Society of Aviation Examiners"], "The course uses the historical expansion Society of Automotive Engineers for SAE.", [7,9]],
  ["standard-astm", "ASTM", "What former name for ASTM is identified in the course slides?", "American Society for Testing and Materials", ["Aircraft Standards and Torque Manual", "Aerospace Safety and Training Ministry", "American Standard Thread Manufacturer"], "The slide explicitly identifies American Society for Testing and Materials as ASTM's former name.", [8]],
  ["standard-ansi", "ANSI", "What does ANSI stand for?", "American National Standards Institute", ["Aircraft Nut and Screw Identification", "Aerospace Navigation Standards International", "American Nonferrous Steel Institute"], "ANSI means American National Standards Institute.", [8]],
  ["standard-aisi", "AISI", "What does AISI stand for in the course list?", "American Iron and Steel Institute", ["Aircraft Inspection and Safety Institute", "Aerospace Industry Standards International", "American Internal Screw Identification"], "AISI means American Iron and Steel Institute. The course relates AISI and SAE numbering to steel grades.", [9]],
  ["standard-cgsb", "CGSB", "What does CGSB stand for?", "Canadian General Standards Board", ["Canadian Government Safety Bureau", "Civil General Service Branch", "Canadian Grip and Shear Board"], "CGSB means Canadian General Standards Board.", [10]],
  ["standard-mil", "MIL", "What does MIL identify in the supplied specifications slides?", "Military specifications or standards", ["Metric inch length", "Minimum installed load", "Material inspection level only"], "The MIL designation identifies military specifications or standards, such as MIL-STD and MIL-SPEC.", [11]],
  ["standard-tc", "TC", "What does TC stand for in the course's aviation specifications list?", "Transport Canada", ["Thread Class", "Torque Chart", "Tensile Capacity"], "Here TC means Transport Canada; TCCA is Transport Canada Civil Aviation.", [12]],
  ["standard-faa", "FAA", "What does FAA stand for?", "Federal Aviation Administration", ["Federal Aircraft Association", "Fastener Approval Agency", "Flight Assembly Authority"], "FAA means Federal Aviation Administration.", [13]],
]);
group("bolts", "thread-terms", "Thread geometry & series", [
  ["thread-pitch", "Pitch", "The distance between corresponding points on adjacent threads.", [24]],
  ["thread-crest", "Crest", "The outermost surface at the top of an external thread.", [25]],
  ["thread-root", "Root", "The bottom of the groove between adjacent thread flanks.", [26]],
  ["major-diameter", "Major diameter", "The external thread diameter measured from crest to crest.", [27]],
  ["minor-diameter", "Minor diameter", "The external thread diameter measured from root to root.", [27]],
  ["thread-uts", "Unified Thread Standard (UTS)", "The standard defining thread forms, series, allowances, tolerances and designations described for many North American fasteners.", [15]],
  ["thread-bsw", "British Standard Whitworth (BSW)", "The imperial thread standard identified by the three-letter abbreviation BSW.", [16]],
  ["thread-buttress", "Buttress thread", "The thread profile also called a breech-lock form in the supplied slides.", [17]],
  ["thread-unc", "Unified National Coarse (UNC)", "The unified coarse-thread series, illustrated by a 1/4-20 thread in the course.", [18,19,20]],
  ["thread-unf", "Unified National Fine (UNF)", "The unified fine-thread series, illustrated by a 1/4-28 thread in the course.", [18,20]],
  ["thread-nc", "National Coarse (NC)", "The older coarse-thread series that the course describes as preceding UNC.", [18,19]],
  ["thread-nf", "National Fine (NF)", "The older fine-thread designation abbreviated NF in the course list.", [18]],
]);
group("bolts", "historical-fit", "Course five-class thread-fit model", [
  ["fit-1", "Class 1", "In the course's historical five-class model: a loose fit allowing easy hand assembly.", [23]],
  ["fit-2", "Class 2", "In the course's historical five-class model: a free fit used for general applications.", [23]],
  ["fit-3", "Class 3", "In the course's historical five-class model: a closer-tolerance medium fit used for aviation general hardware.", [23]],
  ["fit-4", "Class 4", "In the course's historical five-class model: the class listed as obsolete.", [23]],
  ["fit-5", "Class 5", "In the course's historical five-class model: a tight interference fit requiring a wrench for turning.", [23]],
]);
group("bolts", "bolt-markings", "AN head markings & part-number letters", [
  ["mark-standard", "Cross or asterisk", "The course head marking for a standard AN steel bolt.", [34,35]],
  ["mark-cres", "One dash", "The course head marking for a corrosion-resistant AN bolt.", [34,35]],
  ["mark-close", "Triangle", "The course head marking for a close-tolerance bolt.", [34,35]],
  ["mark-aluminum", "Double dash", "The course head marking for an aluminum-alloy bolt.", [34,35]],
  ["mark-unmarked", "No marking", "The course chart's identification for low-strength material; this is not evidence that a bolt is approved aircraft hardware.", [34,36]],
]);
group("bolts", "an-letters", "AN identification letters", [
  ["an-h", "H", "The letter in an AN bolt designation that indicates a drilled head.", [36,41]],
  ["an-a", "A", "The suffix in the illustrated AN bolt designations indicating no cotter-pin hole in the threaded shank.", [36,41,43]],
  ["an-c", "C", "The material letter identifying corrosion-resistant steel in the AN bolt examples.", [35,41]],
  ["an-dd", "DD", "The material letters identifying aluminum alloy in the AN bolt examples.", [35,41]],
]);
group("bolts", "bolt-families", "Bolt families & dimensions", [
  ["an-general", "AN3 through AN20", "The general-purpose hex-head aircraft-bolt family listed in the course.", [28,39]],
  ["engine-fine", "MS20073", "The drilled-head engine-bolt family identified as fine-threaded in the course.", [28,29,31]],
  ["engine-coarse", "MS20074", "The drilled-head engine-bolt family identified as coarse-threaded in the course.", [28,29,31]],
  ["nas-standard", "NAS1103 through NAS1120", "The NAS bolt family used for the course's NAS1104-15 identification example.", [28,49]],
  ["internal-wrench-family", "MS20004 through MS20024", "An internal-wrenching high-strength bolt family listed alongside NAS144 through NAS158.", [57]],
  ["bolt-grip", "Grip length", "The length of the unthreaded portion of a bolt.", [40]],
  ["bolt-length", "AN bolt length", "For the illustrated hex-head AN bolt: the distance from the underside of the head to the end of the threaded shank.", [40]],
  ["bolt-diameter", "Bolt shank diameter", "The diameter of the bolt body identified in sixteenth-inch steps for the AN examples.", [40,41]],
]);
choice("bolts", "bolt-selection", "Hardware approval, selection & installation", [
  ["approved-hardware", "Approved hardware", "What distinguishes approved aircraft hardware in the course?", "Traceability and appropriate certification for the specified part", ["Only the lowest purchase price", "Only a similar appearance", "Only a retail-store thread match"], "The course emphasizes traceability, certification and the part called for by the aircraft's illustrated parts catalog. Similar retail hardware is not automatically an approved substitute.", [5]],
  ["bolt-ipc", "Maintenance manual and IPC", "What should determine the correct bolt, nut and washer for the aircraft?", "Applicable maintenance data and the IPC", ["Only a general wrench-size rule", "Only head colour", "Only the old part's apparent diameter"], "Use applicable maintenance data and the illustrated parts catalog for the correct hardware.", [60]],
  ["bolt-tpi", "Threads per inch", "What does the 28 identify in the course's 1/4-28 thread example?", "28 threads per inch", ["28 inches of grip", "28 pounds of torque", "28 millimetres of diameter"], "The number after the diameter in 1/4-28 is the thread count per inch. No calculation is required.", [18,20]],
  ["nas-grip-code", "NAS grip code", "What does the dash number describe in the illustrated NAS1104-15 example?", "Grip length in sixteenths of an inch", ["Total AN-style length in eighths", "Torque in inch-pounds", "Threads per inch"], "The illustrated NAS code specifies grip length in sixteenth-inch units. Do not apply the AN total-length rule to it.", [49]],
  ["an-length-code", "AN length coding", "What is important when reading a multi-digit AN length code such as the course's 27 example?", "It combines whole inches and remaining eighths", ["Always divide the entire number by eight", "Always read it as a metric dimension", "Always treat it as a NAS grip code"], "The course's multi-digit examples separate whole inches from remaining eighths. The shorter wording on slide 41 must not be used as a universal divide-the-whole-code rule.", [41,43,46]],
  ["internal-wrench-tool", "Internal wrench tool", "Which tool drives the internal-wrenching bolts shown?", "Hex wrench / Allen key", ["Flat screwdriver", "Circlip pliers", "Divider"], "The internal-wrenching bolt uses a hex wrench or Allen key.", [57,58]],
  ["bolt-fillet", "Under-head radius", "What must the washer or mating surface accommodate on the internal-wrenching bolt?", "The radius between the head and shank", ["A nonexistent sharp corner", "The grip being replaced by threads", "The removal of the bolt head"], "A washer or mating surface must clear the under-head radius so it seats correctly. The dedicated washer slide identifies MS20002; a different extra-zero spelling in the bolt slide is not used as a separate part number.", [57]],
  ["bolt-orientation", "Course orientation guidelines", "Which orientation guideline appears in the slides when applicable maintenance data does not specify otherwise?", "Head up or toward flight direction, with moving-part clearance", ["Head always down, regardless of access", "Fastener touching the nearest moving control", "Nut always projecting into a moving component"], "The course gives head-up/head-toward-flight and nuts-inboard general guidelines. Aircraft instructions and clearance from moving parts take priority.", [60]],
]);

group("nuts", "nut-families", "Non-self-locking nut families", [
  ["nut-an310", "AN310 castle nut", "A castellated nut requiring a cotter pin, used for either tensile or shear loads in the course.", [6,8]],
  ["nut-an320", "AN320 shear castle nut", "A thinner castellated nut requiring a cotter pin and intended for shear loads only.", [6,9]],
  ["nut-an315", "AN315 plain nut", "A nut without castellations, available in left- or right-hand threads, requiring a suitable separate locking method.", [6,11]],
  ["nut-an316", "AN316 check / jam nut", "A thin nut used to lock a plain nut by tightening against it.", [6,12]],
  ["nut-an350", "AN350 wing nut", "A hand-installed nut for quick removal in nonstructural applications, secured with lockwire as taught in the course.", [6,13]],
  ["nut-an340", "AN340 machine-screw nut", "The coarse-thread machine-screw nut listed in the course.", [6,14]],
  ["nut-an345", "AN345 machine-screw nut", "The fine-thread machine-screw nut listed in the course.", [6,14]],
  ["nut-an355", "AN355 slotted engine nut", "An engine nut with cotter-pin slots, described for engine rather than airframe use.", [6,15]],
  ["nut-an360", "AN360 plain engine nut", "The engine nut described as similar to AN355 but without cotter-pin slots.", [15]],
]);
group("nuts", "self-locking", "Self-locking nuts & nut plates", [
  ["nut-an365", "AN365 fibre self-locking nut", "A low-temperature nylon-insert nut described for tension or shear loads, with a course limit below 250°F.", [16,21]],
  ["nut-an364", "AN364 shallow fibre nut", "A shallow nylon-insert nut described for shear loads only, with a course limit below 250°F.", [16,22]],
  ["nut-an363", "AN363 metal self-locking nut", "A metal-locking-insert nut whose locking grip is compressed below the normal internal thread diameter.", [16,24]],
  ["nut-nas679", "NAS679 metal self-locking nut", "The low-profile all-metal self-locking nut family identified by NAS679 in the course.", [16,25]],
  ["nut-plate", "Anchor nut / nut plate", "A riveted nut assembly providing fastening access where the back of the joint is restricted, including fixed, floating, single and gang forms.", [26,27]],
  ["tinnerman", "Tinnerman nut", "A low-strength spring-tension nut for sheet-metal screws in nonstructural applications; the course also identifies a brass version for instruments.", [28,29]],
]);
choice("nuts", "nut-rules", "Locking action, engagement & size identification", [
  ["nut-locking-area", "Locking-area care", "What must not be done to a self-locking nut's locking area?", "Cut or damage it with a tap or other cutting tool", ["Keep it free of damage", "Use the specified matching bolt", "Inspect its condition before use"], "Do not cut or damage the locking area; its interference provides the locking action.", [17]],
  ["nut-rotation", "Rotating joints", "What restriction do the slides give for self-locking nuts?", "Do not use them where the bolt or nut is subject to rotation in service", ["Use them as the moving surface of every hinge", "Use them only if they can spin freely by hand", "Use them instead of all prescribed safety devices"], "The course excludes joints with service rotation; it separately permits suitable pulley/bearing arrangements when the inner race is clamped against movement.", [18]],
  ["nut-engagement", "Thread engagement", "In the course guidance for a non-chamfered bolt, what indicates sufficient projection beyond a self-locking nut?", "One to three threads", ["No thread engagement", "Only half of the locking insert engaged", "The bolt end remaining below the locking area"], "The course gives one to three projecting threads for the illustrated non-chamfered bolt and complete chamfer projection for chamfered bolts. Apply the specified installation requirements.", [18]],
  ["nut-size-code", "AN365-624 example", "Which bolt does the supplied AN365-624 example fit?", "AN6", ["AN3", "AN4", "AN8"], "The supplied slide explicitly identifies AN365-624 as matching an AN6 bolt. Nut thread/diameter and bolt thread/diameter must match.", [20]],
  ["nut-grip-action", "Self-locking action", "How does the course describe a self-locking nut's locking area?", "Slightly smaller than the normal minor thread diameter", ["So large it never contacts the bolt", "Removed before installation", "A replacement for the bolt's threads"], "The smaller locking area is displaced by the bolt, providing frictional resistance to turning.", [17]],
]);
group("nuts", "washer-families", "Washer types & markings", [
  ["washer-an960", "AN960 plain washer", "The standard plain-washer family providing a bearing surface in the course.", [31,32]],
  ["washer-an970", "AN970 penny washer", "The plain-washer family with an enlarged outside diameter.", [31,32,34]],
  ["washer-an935", "AN935 split lock washer", "The split spring-lock-washer family listed with MS122026 and NAS1061 in the course.", [31,35,36]],
  ["washer-an936", "AN936 shake-proof washer", "The star or toothed lock-washer family listed with MS35335.", [31,35,37]],
  ["washer-ms20002", "MS20002 countersunk washer", "The high-strength washer whose recessed face accommodates an internal-wrenching bolt's under-head radius.", [31,38]],
  ["washer-light", "L suffix", "The washer marking that indicates the light version, described as half the standard thickness.", [32,36]],
  ["washer-star-a", "AN936 type A", "The shake-proof-washer type with an internal star.", [37]],
  ["washer-star-b", "AN936 type B", "The shake-proof-washer type with an external star.", [37]],
  ["washer-star-c", "AN936 type C", "The shake-proof-washer type with a cup-shaped star.", [37]],
]);
choice("nuts", "washer-functions", "Washer use & seating", [
  ["washer-purpose", "Washer functions", "Which use of washers is listed in the course?", "Provide a bearing surface and adjust spacing or nut position", ["Replace missing bolt threads", "Identify torque without measurement", "Guarantee any bolt is aircraft-approved"], "Washers provide bearing surfaces, help obtain proper grip or castellated-nut position, and in suitable types provide locking.", [30]],
  ["lock-washer-plain", "Plain washer under a lock washer", "What does the supplied lock-washer slide require between the lock washer and the component?", "A plain washer", ["A turnbuckle barrel", "A cotter pin", "A swage sleeve"], "The course calls for a plain washer between the lock washer and component. Follow the applicable assembly instructions.", [35]],
  ["nut-brass-instruments", "Brass instrument nuts", "Why does the course mention brass Tinnerman nuts for instruments?", "Brass is nonmagnetic", ["Brass eliminates all thread friction", "Brass makes the nut structural", "Brass allows any screw size"], "The course identifies nonmagnetic brass for instrument applications where magnetic interference matters.", [28]],
  ["washer-types", "Three washer categories", "Which three general washer categories does the course list?", "Plain, lock and special", ["Structural, electrical and hydraulic", "Coarse, fine and metric", "Fixed, floating and gang"], "Plain washers, lock washers and special washers are the three general categories in the slides.", [30]],
]);

group("screws-pins", "screw-classes", "Screw classes & head styles", [
  ["machine-screw", "Machine screw", "The widely used screw class described for panels, clamps and lines, generally fully threaded with no grip and lower strength than a bolt.", [5,6]],
  ["structural-screw", "Structural screw", "A heat-treated alloy-steel screw class described as having bolt-like shear strength, a grip and AN-bolt-like tolerances.", [5,14]],
  ["self-tapping", "Self-tapping screw", "The screw class taught for lightweight nonstructural fastening in thin sheet metal, plastic or wood.", [5,18,19]],
  ["fillister-screw", "Fillister-head screw", "The course's slotted, raised-head machine-screw example, with a head drilled for lockwire.", [9]],
  ["flat-head-screw", "Flat-head screw", "A countersunk screw designed to sit in a matching head recess.", [10,11]],
  ["round-head-screw", "AN515 round-head screw", "The round-head machine-screw family identified as AN515 in the course.", [12]],
  ["truss-head-screw", "AN526 truss-head screw", "The machine-screw family described as having a larger head.", [13]],
  ["washer-head-screw", "AN525 washer-head structural screw", "A structural screw with a washer formed as part of its head to increase the bearing area.", [17]],
]);
choice("screws-pins", "screw-features", "Screw identification & use", [
  ["screw-drive", "Screw drive", "What head feature is described for aircraft screws in the introductory slide?", "A slot or recess for a screwdriver", ["Only a cotter-pin eye", "Only a turnbuckle groove", "Only a plain cylindrical head without a drive"], "The course describes a slot or recess in the screw head, driven with the appropriate screwdriver.", [4]],
  ["self-tap-a", "Self-tapping type A", "Which point does a type A self-tapping screw have in the course?", "Sharp point", ["Blunt point", "A separate cross pin", "A castellated end"], "Type A has a sharp point.", [18]],
  ["self-tap-b", "Self-tapping type B", "Which feature distinguishes the course's type B self-tapping screw?", "Blunt point and finer threads than type A", ["A sharp point and no threads", "A cotter pin in place of threads", "A movable nut plate"], "Type B has a blunt point and comparatively finer threads.", [18]],
  ["structural-cross", "Structural screw marking", "What does the cross marking on the illustrated structural screw indicate?", "The steel material identified in the course", ["That it is made of brass", "That it has no shear strength", "That it is a plastic self-tapping screw"], "The structural fillister and flat-head examples use a cross to identify the specified steel material.", [15,16]],
  ["structural-grip", "Structural screw grip", "Which feature distinguishes a structural screw from the course's usual fully threaded machine screw?", "A grip section with bolt-like tolerances", ["An absence of all threads", "A nylon insert in the head", "A cable-tension adjustment barrel"], "Structural screws have a grip and tolerances like the AN bolt, whereas the usual machine-screw example is fully threaded.", [6,14]],
]);
group("screws-pins", "pin-families", "Pins & retaining methods", [
  ["roll-pin", "Roll pin", "A spring-steel cylinder with a gap that compresses for a spring-tension press fit, used as a pivot, guide or lock.", [20,21]],
  ["clevis-pin", "Clevis pin", "A headed pin with a transverse cotter-pin hole, used where a secured pivot connection is required.", [20,22]],
  ["cotter-pin", "Cotter pin", "The split pin used to lock a castellated nut or retain a drilled clevis pin.", [20,23]],
  ["taper-pin", "Taper pin", "A pin used in shear-loaded joints such as torque-tube connections where play is not wanted; its hole requires a taper reamer.", [24,25]],
  ["pin-an385", "AN385", "The taper-pin family identified in the course as unthreaded.", [24]],
  ["pin-an386", "AN386", "The taper-pin family identified in the course as threaded.", [24]],
  ["cotter-an380", "AN380", "The cotter-pin family identified in the course as low-carbon steel.", [23]],
  ["cotter-an381", "AN381", "The cotter-pin family identified in the course as corrosion-resistant steel.", [23]],
]);
choice("screws-pins", "pin-codes", "Pin identification without calculations", [
  ["cotter-code-diameter", "Cotter-pin first code", "What does the first size code identify on an AN380 cotter pin in the course?", "Diameter in thirty-seconds of an inch", ["Length in quarter-inches", "Torque in inch-pounds", "Thread count per inch"], "The first cotter-pin size code identifies diameter in 1/32-inch units.", [23]],
  ["cotter-code-length", "Cotter-pin second code", "What does the second size code identify on an AN380 cotter pin in the course?", "Length in quarter-inches", ["Diameter in sixteenths", "A torque setting", "The number of slots in the nut"], "The second cotter-pin size code identifies length in 1/4-inch units.", [23]],
  ["clevis-length-reference", "Clevis-pin length reference", "For the AN392-series clevis pin, where is effective length measured?", "From under the head to the cotter-pin hole", ["Across the head only", "From one side of the pin to the other", "From the cotter pin's eye to its leg tip"], "The course clevis-pin example measures effective length from under the head to the cotter-pin hole; its dash code uses 1/32-inch units.", [22]],
]);
group("screws-pins", "turn-locks", "Quick-release turn-lock fasteners", [
  ["dzus", "Dzus", "The quick-release fastener whose panel-mounted stud grips an airframe-mounted spring, with a grommet retaining the stud in the panel.", [26,27]],
  ["camloc", "Camloc", "The quick-release fastener described with a stud assembly, grommet and receptacle; the cam action and spring force provide locking.", [26,29]],
  ["airloc", "Airloc", "The quick-release fastener described with a stud, receptacle and cross pin, with spring tension supplied by the receptacle.", [26,31]],
  ["turn-lock-use", "Nonstructural access-panel fastening", "The course application for quick-release cowling, inspection-panel and inspection-door fasteners.", [26]],
]);
choice("screws-pins", "turn-lock-parts", "Individual turn-lock components", [
  ["dzus-stud", "Dzus stud", "Which Dzus component grips the spring and is held in the panel by a grommet?", "Stud", ["Receptacle cross pin", "Cotter pin", "Nut plate"], "The Dzus stud is held in the panel by a grommet; it engages the spring fixed to the airframe.", [27]],
  ["dzus-spring", "Dzus spring", "Where is the Dzus spring assembly attached in the course description?", "To the airframe", ["Inside the turnbuckle", "On the cable thimble", "Inside a fibre nut"], "The spring assembly is attached to the airframe and its tension locks the stud.", [27]],
  ["camloc-grommet", "Camloc grommet", "What holds the Camloc stud assembly to the panel?", "Grommet", ["Cotter pin", "Cable thimble", "Check nut"], "The Camloc grommet holds the stud assembly in the panel.", [29]],
  ["camloc-receptacle", "Camloc receptacle", "Where is the Camloc receptacle attached?", "To the airframe", ["Inside the stud's nylon insert", "Around the cable eye", "On the tip of a cotter pin"], "The Camloc receptacle is attached to the airframe, where it engages the stud assembly.", [29]],
  ["camloc-tool", "Camloc installation tool", "Which installation tool is named for the Camloc fastener?", "Camloc pliers", ["Circlip pliers", "Lockwire pliers", "A divider"], "The Camloc slide names Camloc pliers for installation.", [30]],
  ["airloc-cross-pin", "Airloc cross pin", "Which part is inserted into the Airloc stud after the stud is placed in the panel?", "Cross pin", ["Nylon insert", "Taper washer", "Turnbuckle barrel"], "The Airloc cross pin is inserted through the stud. The cross pin and shaped receptacle secure the stud.", [31]],
]);

// Extra source qualifications are searchable but deliberately not answer keys.
structuresHardwareNoteSections.push({ id: "structures-source-qualifications", title: "Source qualifications & limits", items: [
  ["Use approved aircraft data", "These are course-study references. Aircraft instructions and current part specifications govern real installations. A marking, witness mark or generic classroom rule alone does not establish airworthiness."],
  ["Witness marking / torque seal", "The deck describes brittle lacquer that cracks with movement. A witness mark is a visual movement reference; do not treat an intact mark alone as a measurement proving the correct torque was applied. This claim is not used as a quiz answer."],
  ["AS and AMS wording", "The slide list expands AS and AMS with Aeronautical wording. The current publisher terminology has not been verified in this audit, so exact expansion questions for these two abbreviations are withheld rather than assigning an uncertain answer."],
  ["EASA and JAA wording", "The slide's EASA expansion omits Aviation and its JAA account is historical. These organizational-title claims are not used as answer keys; consult the organizations' current primary information."],
  ["Clevis bolt versus clevis pin", "The bolt deck labels AN21–AN36 as clevis pins, while the dedicated pins deck identifies the AN392-series pins. Do not interchange a threaded clevis bolt family and an unthreaded clevis pin family. The disputed family label is not tested."],
  ["AN length-code shortcut", "For multi-digit AN length examples, the supplied slides separate whole inches and remaining eighths. Their shorter divide-by-eight wording does not apply to the entire multi-digit code."],
  ["NAS part-number typo", "One drilled-thread example is printed NAS104–15D where surrounding examples use NAS1104. That ambiguous full number is not tested; use the applicable part specification."],
  ["Nut temperatures and reuse", "The NAS679 temperature statements differ between main slide and legacy note text. No exact NAS679 temperature is tested. A nut being difficult to turn by hand is not substituted for the applicable reuse/prevailing-torque requirements."],
  ["Screw specification conflicts", "The screw deck gives duplicated MS35265 coarse/fine substitutions, inconsistent 82°/83° head-angle text, and conflicting MS24693 descriptions in legacy notes. These disputed exact-code/head-angle claims are withheld. General head styles and structural-versus-machine distinctions remain covered."],
  ["Washer spelling", "MS20002 is the number in the dedicated washer slide. The extra-zero spelling in the bolt slide is flagged rather than added as a new washer type."],
  ["Calculation exercises", "Numerical conversions, torque-extension calculations and generated measurement arithmetic remain outside this Structures test under the site's existing course rule. Direct scale facts, terminology, code meanings and explicitly supplied size examples are retained."],
] });

structuresHardwareNoteSections.push({ id: "structures-additional-course-facts", title: "Additional material, fit & identification facts", items: [
  ["Alloy steel", "The course's usual AN bolt material is heat-treated nickel steel (SAE 2330), with cadmium plating. Steel is one of the listed aircraft-bolt material families. (Bolts, slides 28, 39.)"],
  ["Corrosion-resistant steel", "CRES or stainless steel is another listed bolt material; C identifies it in the AN examples. (Bolts, slides 28, 35, 41.)"],
  ["Aluminum alloy", "The AN examples use 2024-T4 aluminum alloy and the DD letters. The bolt deck calls for compatible aluminum-alloy washers on aluminum components. (Bolts, slides 28, 39, 41, 60.)"],
  ["Titanium", "Titanium is the fourth bolt-material family listed alongside alloy steel, corrosion-resistant steel and aluminum alloy. (Bolts, slide 28.)"],
  ["SAE and AISI steel grades", "The course describes related SAE/AISI alloy numbers; the older AISI system also used a letter for steelmaking process. This is distinct from a bolt's AN/MS/NAS part specification. (Bolts, slide 9.)"],
  ["MS engine-bolt sizing", "The course uses the first dash field for diameter in sixteenth-inch units, but tells you to use the chart for the second field's length. Do not apply another fastener family's code rule. (Bolts, slide 31.)"],
  ["AN and NAS size scales", "For the listed AN examples, diameter uses sixteenths and the AN length code combines whole inches/eighths as shown. The listed NAS examples instead use grip length in sixteenths. The existing chart test checks actual bolt-family sizes rather than inventing arbitrary combinations. (Bolts, slides 40–52.)"],
  ["Class 3B nut fit", "The nut slides identify Class 3B for the relevant aircraft nuts. The separate five-class classroom fit chart is historical context and must not be mistaken for a complete current Unified A/B specification. (Nuts, slides 8–9, 17.)"],
  ["AN363 temperature statement", "The main nut slide gives below 650°F for the illustrated AN363 metal-locking nut. This is the course statement, not a temperature rating for every metal nut; check its current part specification. (Nuts, slide 24.)"],
  ["NAS679 conflicting temperatures", "The main slide lists below 550°F and 800°F for CRES, while legacy note text lists a different temperature. This remains a flagged discrepancy and is excluded from the answer key. (Nuts, slide 25 and legacy notes.)"],
  ["Nut material letters", "The illustrated nut families use material letters such as C for CRES, D/DD for aluminum in the applicable family, and B for brass. Read the exact family specification; suffix rules are not interchangeable. (Nuts, slides 8–15, 21–22.)"],
  ["AN960 washer examples", "The main washer slides use PD for aluminum in their examples and L for light thickness. The legacy notes also contain DD wording. The family-specific material suffix must be checked rather than generalized. (Nuts, slides 32–33 and legacy notes.)"],
  ["Fillister machine-screw families", "The main slide lists AN500 as coarse and AN501 as fine, but repeats an MS replacement number. The repeated MS equivalence is flagged, not tested. (Screws/Pins, slide 9.)"],
  ["Machine-screw size fields", "The course identifies the first size field as diameter/thread information and the second as length in sixteenth-inch units. Use the relevant table for a specific screw. (Screws/Pins, slide 6.)"],
] });

export const structuresHardwareQuestions = questions;
const sectionDiagrams = {
  "structures-safety-methods": ["wirePatterns", "cotterInstallation"],
  "structures-cable-fittings": ["turnbuckleParts"],
  "structures-cable-construction": ["cableConstruction"],
  "structures-wrap-identification": ["wrapReference"],
  "structures-bolt-markings": ["boltMarkings"],
  "structures-nut-families": ["nutFamilies"],
  "structures-washer-families": ["washers"],
  "structures-turn-locks": ["dzusAssembly"],
};
for (const section of structuresHardwareNoteSections) {
  if (sectionDiagrams[section.id]) section.diagramKeys = sectionDiagrams[section.id];
}
structuresHardwareNoteSections.find(section => section.id === "structures-turnbuckle-rules").items.push(
  ["Single wrap straight", "One wire passes through the centre barrel hole. Ends run toward opposite ends and through the applicable terminal eye, fork or hole, then receive at least four wraps around the specified shanks. (Safety Methods and Aircraft Cable, slides 24–25.)"],
  ["Single wrap spiral", "One wire is led through a terminal eye or hole. Its ends spiral in opposite directions around each half of the barrel and pass through the centre hole, with the specified wire-end wraps. (Safety Methods and Aircraft Cable, slides 26–28.)"],
  ["Double wrap straight", "The straight-wrap method uses two separate wires passed through the middle of the barrel. (Safety Methods and Aircraft Cable, slides 29–30.)"],
  ["Double wrap spiral", "Two separate wires pass through the barrel hole from opposite sides and spiral in opposite directions. Terminal-end wire wraps bind the laid wire in place. Use the prescribed method and reference drawing for actual installation. (Safety Methods and Aircraft Cable, slides 31–34.)"],
);
export const structuresModule2Questions = [
  ...measuringToolsQuestions.map(q => ({ ...q, category: "measuring" })),
  ...questions,
];

// Each 40-question session covers all five decks, with eight from each.
export function sampleStructuresReview(bank, count = 40, random = Math.random) {
  const buckets = structuresReviewCategories.map(category => shuffleQuestions(bank.filter(q => q.category === category), random));
  const selected = [];
  while (selected.length < count && buckets.some(bucket => bucket.length)) {
    for (const bucket of buckets) {
      if (selected.length >= count) break;
      if (bucket.length) selected.push(bucket.pop());
    }
  }
  return selected;
}
