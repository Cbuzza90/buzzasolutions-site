import { measuringToolsQuestions } from "./measuringToolsPractice.js";
import { structuresHardwareQuestions } from "./structuresModule2Review.js";

export const structuresPostedProgressKey = "/study/structures/module-2/practice-2:posted-v1";
const questions = [];
function add(bank, target, prompt, options) {
  const source = bank.find(question => question.learningTarget === target);
  if (!source) throw new Error(`Missing posted quiz source: ${target}`);
  questions.push({ ...source, id: `posted-${target}`, prompt, options, correctIndex: 0,
    postedSource: "Module 2 Info Addition · pasted quiz or visible quiz screenshot" });
  if (!target.endsWith("-picture")) delete questions.at(-1).diagram;
}
const measuring = (target, prompt, options) => add(measuringToolsQuestions, target, prompt, options);
const safety = (target, prompt, options) => add(structuresHardwareQuestions, target, prompt, options);

// Close to the posted wording. Reading scales stays in the requested simulators;
// numerical conversion exercises remain outside this conceptual Structures test.
measuring("drag-torque", "What is friction drag torque?", ["The amount of torque needed to turn a self-locking nut before seating", "Torque calculation when using an extension", "Torque value for a specific diameter", "Desired torque"]);
measuring("newton-metres", 'What does "NM" stand for?', ["Newton metres", "Newton Metric", "Newton Millimeters", "Numerical Meters"]);
measuring("temperature-contact", "What is a pyrometer used for?", ["Measure the temperature of a surface", "Used for levelling", "Measure thickness", "Calibrate tools"]);
measuring("gauge-blocks", "What are gauge blocks used for (micrometers)?", ["Produce precision lengths/measurements", "Check gap thickness", "Check the radius of a bend", "Check diameters"]);

safety("cotter-diameter-example", "Identify the diameter of the following cotter pin: AN380-2-6.", ['2/32 inch (1/16 inch)', '2/4 inch', '1 inch', '1/2 inch']);
safety("turnbuckle", '"A stretching screw or bottle-screw is a device for adjusting the tension or length of ropes, cables, tie rods and other tensioning systems" best describes?', ["Turnbuckle", "Witness wire", "Safety wire", "Lock wire"]);
safety("turnbuckle-groove", "What indicates the left-handed thread on a turnbuckle?", ["A groove", "Red paint on every barrel", "A raised arrow on every terminal", "The absence of threads"]);
safety("wire-032", 'How many twists per inch are required when using 0.032-inch gauge safety wire?', ["6–8", "2–5", "5–7", "8–10"]);
safety("double-twisted", "Which safety-wiring method is most commonly used?", ["Double-twisted method", "Single-wire method", "Single wrap straight", "Double wrap spiral"]);
safety("wire-fastener-limit", "In the course's fastener-wiring arrangement, how many fasteners can be safety wired together?", ["Max 3", "Minimum 3", "There is no limit", "Max 6"]);
safety("swage-terminal", "What is a swage terminal used for?", ["Terminate a wire cable", "Measure cable tension", "Mark a torque setting", "Adjust the length of a micrometer spindle"]);
safety("cable-reading-location", "When using a tensiometer, where should you take the cable-tension reading?", ["Away from the turnbuckle, rather than too close to it", "Always as close to the turnbuckle as possible", "Directly on the turnbuckle barrel", "On the safety wire"]);
safety("safetying", '"The action of making something safe or secure" best describes?', ["Safetying", "Bonding", "Adjusting", "Measuring"]);
safety("cotter-length-example", "Identify the length of the following cotter pin: AN380-1-4.", ["1 inch", "1/32 inch", "1.4 inches", "1/4 inch"]);
safety("wire-041", 'How many twists per inch are required when using 0.041-inch safety wire?', ["5–7", "8–10", "6–8", "2–5"]);
safety("circlip", "What tool is used to install circlips/snap rings?", ["Circlip pliers", "Needle nose pliers", "Lockwire pliers", "Duck bill pliers"]);
// The source target identifies the ring; supply the tool explanation explicitly.
questions.at(-1).explanation = "Circlip pliers install and remove the appropriate circlips/snap rings. Use the correct internal or external pliers for the ring. (Safety Methods and Aircraft Cable, slides 50–51.)";
delete questions.at(-1).diagram;
safety("wire-020", 'How many twists per inch are required when using 0.020-inch gauge safety wire?', ["8–10", "2–5", "6–8", "5–7"]);
safety("turnbuckle-damage", "What should be done if a turnbuckle shows signs of thread distortion or bending?", ["Replace it", "Apply witness wire", "Repair it", "Use thicker gauge safety wire"]);
safety("turnbuckle-exposed", "What is the maximum number of threads that can be exposed at each end of a turnbuckle?", ["3", "1", "5", "2"]);
safety("witness-wire", '"To show if a switch or component has been activated or moved" best describes?', ["Witness wire", "Lock tite", "Witness marking", "Tab washer"]);

// The screenshot calls this proof of torque. Correct that ambiguity while
// retaining the identification target: an intact mark is not a torque reading.
questions.push({ id: "posted-witness-marking", learningTarget: "witness-marking", category: "safety-cables",
  prompt: "Which course term describes torque-seal lacquer used as a visual reference for fastener movement?",
  options: ["Witness marking", "Witness wire", "Lock tite", "Tab washer"], correctIndex: 0,
  explanation: "Witness marking uses torque-seal lacquer as a visual reference. The posted quiz describes it as indicating proper torque, but an intact mark alone does not prove the applied torque. (Safety Methods and Aircraft Cable, slide 46.)",
  source: { deck: "safety-cables", slides: [46] }, postedSource: "Module 2 Info Addition · visible quiz screenshot, wording qualified" });

const steps = [
  "Slip the sleeve over the cable, loop the free end around a bushing or thimble eye, and return it through the sleeve",
  "Make 3 crimps using the crimping tool in the illustrated sequence",
  "Use a go/no-go gauge to check that the sleeve has been sufficiently crimped",
];
for (const [index, target] of ["nicopress-first-step", "nicopress-crimps", "nicopress-check"].entries()) {
  safety(target, `There are 3 steps to installing a Nicopress in the course example. What is step ${index + 1}?`, [steps[index], ...steps.filter((_, other) => other !== index), "Apply witness wire instead of crimping the sleeve"]);
}
for (const target of ["double-straight-picture", "double-spiral-picture"]) {
  const source = structuresHardwareQuestions.find(question => question.learningTarget === target);
  safety(target, `Identify the following turnbuckle safetying method (${target === "double-straight-picture" ? "diagram A" : "diagram B"}).`, source.options);
}
export const structuresPostedQuestions = questions;
