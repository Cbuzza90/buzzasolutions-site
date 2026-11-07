import { safetyEasyReviewQuestions } from "./safetyEasyReview.js";
import { safetyModule2Path } from "./safetyModule2.js";

export const safetyTest2ReviewSources = {
  deck: "SAFE 10094 Test 2 Review (compressed), 76 slides",
  worksheet: "Test 2 Review Worksheet.docx",
  key: "Test 2 Review Worksheet Prof Copy.docx",
  duplicateDeck: "The supplied compressed and compressed-1 PowerPoints are byte-identical copies of the same review.",
};

// Reuse the reviewed concepts and original chart crops. Keep this full-review
// attempt independent from the existing Easy parts and lecture-based tests.
// The oxygen item cites an earlier student deck, not these uploaded files.
// Split the two grouped sets into individual questions below.
const excluded = new Set(["oxygen-student", "whmis-elements", "confined-examples"]);
export const safetyTest2ReviewQuestions = safetyEasyReviewQuestions
  .filter(question => !excluded.has(question.id.replace("safety2-easy-", "")))
  .map(question => ({
    ...question,
    id: question.id.replace("safety2-easy-", "safety2-review-"),
    options: [...question.options],
    source: { deck: "test2-review", slides: [...question.source.slides], worksheet: safetyTest2ReviewSources.key },
    explanation: `${question.explanation.slice(0, question.explanation.lastIndexOf(" ("))} (${safetyTest2ReviewSources.key}; ${safetyTest2ReviewSources.deck}, slides ${question.source.slides.join(", ")}.)`,
  }));

function add(id, topic, prompt, answer, distractors, explanation, slides) {
  safetyTest2ReviewQuestions.push({
    id: `safety2-review-${id}`, topic, prompt,
    options: [answer, ...distractors], correctIndex: 0,
    explanation: `${explanation} (${safetyTest2ReviewSources.key}; ${safetyTest2ReviewSources.deck}, slides ${slides.join(", ")}.)`,
    source: { deck: "test2-review", slides, worksheet: safetyTest2ReviewSources.key },
  });
}

add("element-labels", "whmis", "Which principal element of WHMIS communicates product and hazard information on the container?", "Product labels", ["Entry permits", "Tow-bar inspection records", "Incident reports"], "The review lists product labels, SDSs and worker education as the three principal elements. Supplier and workplace labels put information on the container so the product and its precautions can be identified where it is used.", [4, 8, 10]);
add("element-sds", "whmis", "Which principal element of WHMIS provides the detailed, product-specific safety information sheet?", "Safety Data Sheet", ["Workplace label", "Worker education program", "Confined-space entry permit"], "An SDS supplies detailed product-specific information and must be available for workers to review. A container label provides more concise information, and education helps workers use both.", [4, 11]);
add("element-education", "whmis", "Which principal element of WHMIS teaches workers how to understand and use hazardous-product information?", "Worker education programs", ["Product labels", "Supplier invoices", "Aircraft movement permits"], "Worker education is the learning component of WHMIS. The review links education and consistent hazard information with preventing injuries and illnesses; simply having a label or a sheet does not replace learning how to use the information.", [4, 5]);

for (const [id, answer, description] of [
  ["wing-tank", "Aircraft wing fuel tanks", "Fuel-tank entry inside the wing is one of the worksheet's named examples."],
  ["auxiliary-tank", "Aircraft auxiliary fuel tanks", "The worksheet separately names auxiliary fuel tanks as another confined-space work example."],
  ["rear-fuselage", "Rear fuselage", "The worksheet names rear-fuselage work as an example alongside wing and auxiliary fuel tanks."],
]) add(`example-${id}`, "confined-entry", `Which location is explicitly listed as an aircraft confined-space work example: ${id === "wing-tank" ? "a fuel tank in the wing" : id === "auxiliary-tank" ? "a tank carrying additional fuel" : "an area toward the back of the fuselage"}?`, answer, ["Open apron parking area", "Unrestricted hangar aisle", "Outdoor equipment staging area"], `${description} The review describes limited entry and a space not designed for occupancy. These are course examples; the particular space and its hazards must still be assessed.`, [21, 22]);

// Show a short unlabelled pattern sample rather than stretching the complete
// narrow strip to several phone screens. The full labelled chart is in notes.
for (const question of safetyTest2ReviewQuestions.filter(item => item.topic === "review-fluid-lines")) {
  const crop = question.diagram.crop;
  question.diagram = { ...question.diagram, crop: { ...crop, width: Math.min(90, crop.imageWidth - crop.x), height: 80 } };
}

export const safetyTest2ReviewNoteSections = [{
  id: "safety2-test2-review", title: "Test 2 Review · study guide", diagramKeys: ["reviewWhmis", "reviewLegacy", "reviewLines"],
  items: [
    ["Review scope", "One complete review test from the two supplied worksheets and the 76-slide compressed review. The two uploaded PowerPoints are identical. WHMIS, labels and safety sheets; lockout/tagout and eight energy sources; confined spaces; towing; JHSC; FOD; fire prevention; housekeeping; symbols and fluid-line identification are included. Each question has an explanation and a searchable question reference below."],
    ["WHMIS · W", "W = Workplace. The full term is Workplace Hazardous Materials Information System."],
    ["WHMIS · H", "H = Hazardous: the system communicates information about hazardous products."],
    ["WHMIS · M", "M = Materials, retained in the full name Workplace Hazardous Materials Information System."],
    ["WHMIS · I", "I = Information: labels, sheets and education communicate the information workers need."],
    ["WHMIS · S", "S = System. The review's three principal elements work together rather than replacing one another."],
    ["Product labels", "Supplier labels and workplace labels identify the product and communicate precautions on the container. A workplace label includes product identifier, safe handling information and a reference to the SDS (review slides 4, 8–10)."],
    ["Safety Data Sheet", "A product-specific information sheet created by the manufacturer and available to workers. Read the actual product's sheet before working with the chemical (review slide 11)."],
    ["Worker education", "The third principal WHMIS element teaches workers how to understand and use hazardous-product information, helping prevent injuries and illnesses (review slides 4–5)."],
    ["Aircraft wing fuel tanks", "Named confined-space work example in the worksheet and review slide 21. Entry controls include assessment, a permit, training, atmospheric testing, isolation and a standby attendant."],
    ["Aircraft auxiliary fuel tanks", "A separately named tank-entry example in the worksheet and review slide 21. A previous acceptable air test does not replace testing before re-entry."],
    ["Rear fuselage", "The professor worksheet's third aircraft confined-space work example. The course definition concerns limited entry and a space not designed for occupancy; assess the actual space and task."],
    ["LOTO · each letter", "L = Lock; O = Out; T = Tag; O = Out. Lockout physically secures the isolation device. A placard warns of danger but does not itself remove the hazard. Verify isolation and control stored energy before work (review slides 14–19)."],
    ["JHSC · each letter", "J = Joint; H = Health; S = Safety; C = Committee. Worker and employer representatives identify issues and bring them to the employer. The review assigns at least monthly workplace inspections to a designated worker member (review slide 69)."],
    ["FOD · each letter", "F = Foreign; O = Object; D = Debris or Damage in this review. Loose tools, rags, fasteners, lockwire, birds and drill fragments can damage aircraft or injure people (review slide 70)."],
  ],
}, {
  id: "safety2-test2-source-checks", title: "Test 2 Review · source checks",
  items: [
    ["Oxygen figures excluded from grading", "The professor worksheet says both 'at least 19.5%' and 'between 18 and 23%'. Review slide 33 mentions 19.5%, while slide 39 says 18–23%. This contradiction is recorded here instead of grading either range as a safe-entry rule. The same review requires contaminant testing, ventilation, energy control and trained standby/rescue arrangements. Oxygen alone does not select a respirator or authorize entry."],
    ["Older nine-heading MSDS material", "The worksheet and review slide 12 ask for nine headings while calling the sheet an SDS. Questions explicitly identify this as the review's older MSDS layout. Modern SDSs have sixteen sections; the older headings are retained as labelled course-review material."],
    ["Towing sequence is a course example", "Review slide 64 and the professor worksheet give: apply brakes; disconnect nosegear torque links; install the steering hydraulic bypass pin; connect the bar to the aircraft by hand; slowly position the tug and connect the bar by hand. This tests the given example. The actual aircraft maintenance manual and operator procedure govern the aircraft being moved."],
    ["Entry rescue and tag removal", "Review slide 35's urgent-rescue wording must be read with slides 36 and 41: trained, equipped rescuers and the planned response are required. Slide 19 names the tag originator or a supervisor if unavailable; removal remains subject to the authorized procedure and checks."],
    ["Fluid-line chart labels", "The supplied slide 72 labels both orange/grey zigzags and orange/blue crossed lines 'Instrument Air'. The quiz keeps those source labels and shows the matching original chart crops. Identify a line using colour and geometric symbols together."],
  ],
}];

const path = `${safetyModule2Path}/test-2-review`;
export const safetyTest2Review = {
  slug: "safety-test2-review", course: "Safety", courseSlug: "safety", basePath: safetyModule2Path,
  path, storageId: path, kind: "choice", questions: safetyTest2ReviewQuestions,
  number: 2, difficulty: "review", title: "Test 2 Review",
};
