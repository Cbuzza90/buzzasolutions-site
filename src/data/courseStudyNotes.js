import { resistorNoteSections } from "./resistorBands.js";
import { practiceQuestionNotes } from "./practiceQuestionNotes.js";
import { safetyNoteSections } from "./safetyStudyNotes.js";
import { electricityNoteSections } from "./electricityStudyNotes.js";
import { structuresNoteSections } from "./structuresStudyNotes.js";
import { systemsNoteSections } from "./systemsStudyNotes.js";
import { systemsDiagrams } from "./systemsMixedTest.js";

// Register notes for the exact module. A new module must not silently inherit
// unrelated notes just because it belongs to the same course.
export const studyNotesByModule = {
  "/study/safety/module-1": { course: "Safety", sections: safetyNoteSections, defaultOpenId: "fire", intro: "Shop safety, fire safety and human factors from your three Safety practice sets.", basis: "Course basis: the supplied Safety questions and answer key, with fire-class symbols and agents checked against CCOHS.", sources: [{ title: "CCOHS · fire extinguishers", url: "https://www.ccohs.ca/oshanswers/safety_haz/fire_extinguishers.html" }] },
  "/study/electricity/module-1": { course: "Electricity", sections: [...electricityNoteSections, ...resistorNoteSections], resistorChart: true, defaultOpenId: "meters", intro: "Electrical fundamentals from your Test 1 study aid and supplied quiz review. The separate resistor test includes band calculations.", basis: "Course basis: AMEM 10001 Test 1 Study Aid and supplied quiz results. Ambiguous original questions were clarified in the practice bank. Resistor calculation notes follow the supplied Resistor Colour chart.ppt.", sources: [{ title: "Supplied resistor colour chart", url: "/electricity/resistor-colour-chart.png" }] },
  "/study/structures/module-2": { course: "Structures", sections: structuresNoteSections, defaultOpenId: "lookup", torqueChart: true, intro: "Quick reference for the Torque Bolt/Nut Practice Test and your full fine/coarse-thread chart.", basis: "Course basis: the supplied torque chart and 50 bolt/nut combinations. These notes cover the expanded chart pools; individual bolt sizes are checked against manufacturer size tables.", sources: [{ title: "Fastener Dimensions · NAS583–590 sizes", url: "https://www.fastenerdimensions.com/upload/documentgroups/mainfiles/NAS583%20thru%20NAS590.pdf" }, { title: "Fastener Dimensions · NAS144–158 sizes", url: "https://www.fastenerdimensions.com/upload/documentgroups/mainfiles/NAS144%20thru%20NAS158.pdf" }] },
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
