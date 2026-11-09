import { ataNoteSections } from "./ataCodePractice.js";
import { safetyModule2NoteSections, safetyModule2PictogramDiagram } from "./safetyModule2.js";
import { safetyEasyReviewNoteSections, safetyEasyReviewDiagrams } from "./safetyEasyReview.js";
import { safetyTest2ReviewNoteSections } from "./safetyTest2Review.js";
import { techPubWorksheetNoteSections, techPubMediumNoteSections, techPubSourceLimit } from "./techPubWorksheetPractice.js";
import { cotterPinNoteSections, cotterPinSource } from "./cotterPinPractice.js";
import { resistorNoteSections } from "./resistorBands.js";
import { enginesNoteSections } from "./enginesTest2.js";
import { aerodynamicsNoteSections, aerodynamicsDiagrams } from "./aerodynamicsModule2.js";
import { practiceQuestionNotes } from "./practiceQuestionNotes.js";
import { safetyNoteSections } from "./safetyStudyNotes.js";
import { electricityNoteSections } from "./electricityStudyNotes.js";
import { measuringToolsNoteSections, measuringToolsDiagrams } from "./measuringToolsPractice.js";
import { structuresHardwareNoteSections, structuresModule2Diagrams } from "./structuresModule2Review.js";
import { structuresNoteSections } from "./structuresStudyNotes.js";
import { systemsNoteSections } from "./systemsStudyNotes.js";
import { systemsModule2NoteSections, systemsModule2Diagrams } from "./systemsModule2.js";
import { systemsDiagrams } from "./systemsMixedTest.js";

// Register notes for the exact module. A new module must not silently inherit
// unrelated notes just because it belongs to the same course.
export const studyNotesByModule = {
  "/study/systems/module-2": { course: "Systems", sections: systemsModule2NoteSections, diagrams: systemsModule2Diagrams, defaultOpenId: "systems2-selectors", intro: "Easy follows the Test 2 review and supplied screenshot quiz. Medium and Hard also cover the 113-page Hydraulic Components (2024) material. Screenshot Review parts expand matching items and preserve original question diagrams. Search each valve role, filter type, seal and colour code, or enlarge an original labelled reference diagram.", basis: "Course basis: AMEM 10004 Review Test 2 (38 slides), Hydraulic Components (2024) compressed PowerPoint (113 slides), and its HQ PDF (113 matching pages). The 27 supplied Systems Test 2 screenshots are also covered; explanations cite matching component pages/slides and review slides where available. Missing choices and hidden matching descriptions are adapted against those sources. Numerical calculations and cure-date expiry arithmetic are excluded. Impossible dates, mixed gear-direction wording, example ratings and aircraft-specific procedures are flagged in Source checks. Seal colours are the supplied chart's labels, not authorization to select parts by colour alone." },
  "/study/safety/module-2": {course:"Safety",sections:[...safetyTest2ReviewNoteSections,...safetyEasyReviewNoteSections,...safetyModule2NoteSections],diagrams:{whmisChart:safetyModule2PictogramDiagram,...safetyEasyReviewDiagrams},defaultOpenId:"safety2-test2-review",intro:"Test 2 Review follows your worksheets, professor answer key and compressed review slides. Review each topic, enlarge the original WHMIS and fluid-line charts, or search by question wording. The existing Easy parts, Medium practice and Hard one-word recall also have searchable references here.",basis:"Course basis: WSIB WHMIS OSHA New (42 slides), Confined Space Practices (57), Flight Line Safety Pt 3 (50), Aircraft Towing and Movement (49), and Lock Out Tag Out Procedures (27). Test 2 Review uses Test 2 Review Worksheet.docx, Test 2 Review Worksheet Prof Copy.docx, and SAFE 10094 Test 2 Review (compressed, 76 slides). The two uploaded compressed PowerPoints are identical. Each question cites its slides. The full review excludes the contradictory oxygen-range item from grading. Review-specific older WHMIS classes and nine-heading MSDS material, source conflicts and aircraft-specific towing examples are explicitly labelled. Easy practice retains its earlier review sources and saved attempts.",sources:[{title:"Ontario · confined-space atmospheric hazards",url:"https://www.ontario.ca/document/guideline-working-confined-spaces/confined-spaces"},{title:"CCOHS · confined-space programs and rescue",url:"https://www.ccohs.ca/oshanswers/hsprograms/confinedspace/confinedspace_program.html"},{title:"CCOHS · WHMIS basics and SDS format",url:"https://www.ccohs.ca/teach_tools/chem_hazards/whmis_basics.html"}]},
  "/study/publications/module-2": { course:"Technical Publications", sections:[...ataNoteSections,...techPubWorksheetNoteSections,...techPubMediumNoteSections,{id:"techpub-source-limits",title:"Aircraft manual source checks",items:[["Material still needed",techPubSourceLimit]]}], defaultOpenId:"ata-overview", intro:"Easy practice follows the Test 2 review worksheet. Medium practice covers answerable worksheet and Project #2 topics. The ATA sheet and quiz cover only chapters asked on the review worksheet.", basis:"Course basis: Test 2 Material Worksheet, AMEM 10033 Project #2, and the supplied ATA, Stations and IPC slide decks. The documents define the study scope; the slides provide answers and are cited in explanations. Aircraft-specific dimensions, access-panel details and Mooney IPC lookups are excluded until the matching manuals or answer key are supplied. The separate ATA quiz covers the worksheet's 12 chapter numbers in both directions." },
  "/study/engines/module-2": { course: "Engines", sections: enginesNoteSections, defaultOpenId: "engines-fundamentals", intro: "Test 2: reciprocating-engine oil and lubrication. Start with the review, then use the lecture detail to distinguish systems, valves and indications.", basis: "Course basis: the supplied AMEM10057_Test2_Condensed_Codex.pdf, Section 1 (31 review entries) and Section 2 (Oil D13.01/D13.02 and D13.03 lecture digest). Answers cite PDF pages and review question/slide references. Engine-specific values and procedures are course examples; ambiguous expansion-space and pour-point wording is not turned into an exact numerical rule." },
  "/study/aerodynamics/module-2": { course: "Aerodynamics", sections: aerodynamicsNoteSections, diagrams: aerodynamicsDiagrams, defaultOpenId: "aero-axes", intro: "Controls, stability, stalls, loads, high-speed flight, fuselage, wings, empennage, landing gear, doors, control construction, engine compartment, coordinate datums, stress and load distribution.", basis: "Course basis: all sixteen supplied Module 2 presentations 14–29, the 60-entry Fall 2025 review and all 54 supplied practice-quiz prompts. Source page numbers are cited in each topic and explanation. The numerical Mach calculation is excluded; misleading absolute claims are qualified." },
  "/study/safety/human-factors": { course: "Safety", sections: safetyNoteSections.filter(section => ["pear", "dirty-dozen", "models", "disciplines"].includes(section.id)), defaultOpenId: "pear", intro: "Human Factors only: PEAR, Dirty Dozen, error models and disciplines.", basis: "Course basis: the supplied Safety questions and answer key. Human Factors questions retain their verified source answers." },
  "/study/safety/module-1": { course: "Safety", sections: safetyNoteSections, defaultOpenId: "fire", intro: "Shop safety, fire safety and human factors from your Safety practice sets.", basis: "Course basis: the supplied Safety questions and answer key, with fire-class symbols and agents checked against CCOHS.", sources: [{ title: "CCOHS · fire extinguishers", url: "https://www.ccohs.ca/oshanswers/safety_haz/fire_extinguishers.html" }] },
  "/study/electricity/module-1": { course: "Electricity", sections: [...electricityNoteSections, ...resistorNoteSections], resistorChart: true, defaultOpenId: "meters", intro: "Electrical fundamentals from your Test 1 study aid and supplied quiz review. The separate resistor test includes band calculations.", basis: "Course basis: AMEM 10001 Test 1 Study Aid and supplied quiz results. Ambiguous original questions were clarified in the practice bank. Resistor calculation notes follow the supplied Resistor Colour chart.ppt.", sources: [{ title: "Course resistor chart - four/five bands", url: "/electricity/resistor-colour-chart-4-5.svg" }, { title: "FAA - electrical principles and variable resistors", url: "https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_65-9A.pdf" }, { title: "Fluke - resolution and accuracy", url: "https://www.fluke.com/en-us/learn/blog/digital-multimeters/accuracy-precision" }] },
  "/study/structures/module-2": { course: "Structures", sections: [...measuringToolsNoteSections, ...structuresHardwareNoteSections, ...structuresNoteSections, ...cotterPinNoteSections], diagrams: { ...structuresModule2Diagrams, measuringMicrometerParts: measuringToolsDiagrams.parts }, defaultOpenId: "measuring-identification", torqueChart: true, intro: "All five Module 2 presentations: measuring tools, safetying and aircraft cables, bolts and threads, nuts and washers, screws, pins and turn-lock fasteners. Enlarge the supplied diagrams for reference.", basis: "Course basis: the five supplied Structures Module 2 presentations, pasted practice-quiz questions, the Measuring Tools review sheet and torque chart. Conflicting or ambiguous source claims are flagged and withheld from answer keys. The separate cotter-pin test includes the explicitly requested AN380 diameter/length calculations using verified chart sizes; other numerical calculations remain excluded. Direct scale facts and source size examples are retained.", sources: [{ title: "Boeing/Aviall · cotter-pin size and interchangeability chart", url: cotterPinSource }, { title: "Fluke · infrared sensing and aiming laser", url: "https://assets.fluke.com/manuals/566_____umeng0000.pdf" }, { title: "Fastener Dimensions · NAS583–590 sizes", url: "https://www.fastenerdimensions.com/upload/documentgroups/mainfiles/NAS583%20thru%20NAS590.pdf" }, { title: "Fastener Dimensions · NAS144–158 sizes", url: "https://www.fastenerdimensions.com/upload/documentgroups/mainfiles/NAS144%20thru%20NAS158.pdf" }] },
  "/study/systems/module-1": { course: "Systems", sections: systemsNoteSections, diagrams: systemsDiagrams, defaultOpenId: "fluids", intro: "Condensed from your Hydraulics practice review. Tap diagrams to enlarge them.", basis: "Course basis: AMEM 10004 Review Test #1, the Hydraulics answer key and supplied quiz screenshots. Approved aircraft specifications govern actual component and fluid selection.", sources: [{ title: "FAA · hydraulic fundamentals", url: "https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_65-15A.pdf" }, { title: "Eastman · phosphate-ester compatibility", url: "https://www.eastman.com/content/dam/eastman/corporate/en/literature/e/eas11170.pdf" }, { title: "NASA · gas-law relationships", url: "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/equation-of-state/" }] }
};

for (const [basePath, notes] of Object.entries(studyNotesByModule)) {
  notes.sections = [...notes.sections, ...practiceQuestionNotes(basePath)];
}

function searchWords(text) {
  return text.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim().split(/\s+/).filter(Boolean);
}

const searchCache = new WeakMap();
function sectionSearchText(section) {
  if (!searchCache.has(section)) {
    const items = section.items.map(item => searchWords(item.slice(0, 2).join(" ")).join(" "));
    const title = searchWords(section.title).join(" ");
    searchCache.set(section, { title, items, all: `${title} ${items.join(" ")}` });
  }
  return searchCache.get(section);
}

export function findNoteSections(sections, query) {
  const words = searchWords(query);
  if (!words.length) return sections;
  const matches = text => words.every(word => text.includes(word));
  return sections.flatMap(section => {
    const search = sectionSearchText(section);
    if (section.questionReference) {
      const items = matches(search.title) ? section.items : section.items.filter((_, index) => matches(search.items[index]));
      return items.length ? [{ ...section, items }] : [];
    }
    return matches(search.all) ? [section] : [];
  });
}
