import { safetyNoteSections } from "./safetyStudyNotes.js";
import { electricityNoteSections } from "./electricityStudyNotes.js";
import { structuresNoteSections } from "./structuresStudyNotes.js";
import { systemsNoteSections } from "./systemsStudyNotes.js";
import { systemsDiagrams } from "./systemsMixedTest.js";

// Register notes for the exact module. A new module must not silently inherit
// unrelated notes just because it belongs to the same course.
export const studyNotesByModule = {
  "/study/safety/module-1": { course: "Safety", sections: safetyNoteSections, defaultOpenId: "fire", intro: "Shop safety, fire safety and human factors from your three Safety practice sets.", basis: "Course basis: the supplied Safety questions and answer key, with fire-class symbols and agents checked against CCOHS.", sources: [{ title: "CCOHS · fire extinguishers", url: "https://www.ccohs.ca/oshanswers/safety_haz/fire_extinguishers.html" }] },
  "/study/electricity/module-1": { course: "Electricity", sections: electricityNoteSections, defaultOpenId: "meters", intro: "Electrical fundamentals from your Test 1 study aid and supplied quiz review. No calculations required.", basis: "Course basis: AMEM 10001 Test 1 Study Aid and supplied quiz results. Ambiguous original questions were clarified in the practice bank." },
  "/study/structures/module-1": { course: "Structures", sections: structuresNoteSections, defaultOpenId: "lookup", torqueChart: true, intro: "Quick reference for the Torque Bolt/Nut Practice Test and your full fine/coarse-thread chart.", basis: "Course basis: the supplied torque chart and 50 bolt/nut combinations. These notes cover that chart exercise." },
  "/study/systems/module-1": { course: "Systems", sections: systemsNoteSections, diagrams: systemsDiagrams, defaultOpenId: "fluids", intro: "Condensed from your Hydraulics practice review. Tap diagrams to enlarge them.", basis: "Course basis: AMEM 10004 Review Test #1, the Hydraulics answer key and supplied quiz screenshots. Approved aircraft specifications govern actual component and fluid selection.", sources: [{ title: "FAA · hydraulic fundamentals", url: "https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_65-15A.pdf" }, { title: "Eastman · phosphate-ester compatibility", url: "https://www.eastman.com/content/dam/eastman/corporate/en/literature/e/eas11170.pdf" }, { title: "NASA · gas-law relationships", url: "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/equation-of-state/" }] }
};

export function findNoteSections(sections, query) {
  const term = query.trim().toLowerCase();
  return sections.filter(section => `${section.title} ${section.items.map(item => item.slice(0, 2).join(" ")).join(" ")}`.toLowerCase().includes(term));
}
