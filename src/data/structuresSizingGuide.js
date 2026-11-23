const methods = { id: "hardware-sizing-methods", title: "How to read the tested part numbers", items: [
  ["Start with the family", "AN bolts, NAS bolts, AN310/320 nuts, AN960/970 washers and AN380 pins use different fields and units. Identify the family first. Diameter, under-head length and unthreaded grip are different dimensions."],
  ["AN bolt diameter", "For these AN bolt examples, the number immediately after AN gives diameter in sixteenths: AN3 = 3/16, AN4 = 4/16 = 1/4, AN5 = 5/16, AN6 = 6/16 = 3/8 and AN8 = 8/16 = 1/2 inch. H and A do not change diameter."],
  ["AN bolt length", "Read the dash field as whole inches plus remaining eighths. A single digit gives eighths: -3 = 3/8, -5 = 5/8, -6 = 6/8 = 3/4, -7 = 7/8. In -10, -11, -12, -20, -21, -27 and -30, the final digit is the remaining eighths: -10 = 1 inch, -11 = 1 1/8, -12 = 1 1/4, -20 = 2, -21 = 2 1/8, -27 = 2 7/8, -30 = 3 inches. Do not divide the entire multi-digit code by eight."],
  ["AN worked example · AN5H-3A", "AN5 gives 5/16-inch diameter. H identifies a drilled head. -3 gives 3/8-inch under-head length. A indicates no cotter-pin hole in the threaded shank. Diameter and length come from separate fields."],
  ["AN worked example · AN8-21A", "AN8 gives 8/16 = 1/2-inch diameter. -21 means 2 whole inches plus 1/8 inch, giving 2 1/8-inch length. A means the threaded shank is undrilled. It does not mean the head is undrilled."],
  ["Length versus grip", "For the hex-head AN examples, length runs from under the head to the end of the shank. Grip is only the unthreaded portion. Do not count the bolt head in under-head length, and do not describe the whole AN bolt as grip."],
  ["NAS diameter · Use the exact family", "The supplied examples establish NAS1103 = 3/16, NAS1104 = 1/4, NAS1105 = 5/16 and NAS1106 = 3/8 inch. NAS1404 = 1/4 inch. The tested NAS6205-3H diameter is 5/16 inch. These are family-specific references, not a rule that every NAS number can be decoded from its last digit."],
  ["NAS grip · Tested NAS110x and NAS1404 examples", "For these examples, the dash number gives grip in sixteenths: -5 = 5/16, -06 or -6 = 6/16 = 3/8, -7 = 7/16, -15 = 15/16 inch. For NAS1106-15, the asked dimension is 15/16-inch grip, not 1 5/8 inches. Do not apply the AN whole-inch/eighth rule to these NAS examples."],
  ["NAS6204 / NAS6205", "The quizzes test H = drilled head for NAS6204-5H, and 5/16-inch diameter for NAS6205-3H. Use those specific verified fields. A grip or total-length value for these two families is not established by the supplied questions and is not invented here."],
  ["AN310 / AN320 nuts", "The dash size identifies the matching bolt diameter in sixteenths. -4 = 1/4, -5 = 5/16, -6 = 3/8 and -8 = 1/2 inch. This is nominal fastener diameter, not the wrench size across the flats or the nut's height."],
  ["AN960 washers", "Read the supplied size references: 416 = 4/16 = 1/4, 516 = 5/16, 616 = 6/16 = 3/8 inch. The -10 / 10 example is the nominal #10 matching fastener size, taught as 3/16 inch here; it is not 10/16 inch. These are hole/fastener nominal sizes, not the washer's outside diameter."],
  ["Washer material and thickness", "The supplied AN960PD examples use PD for aluminum. L denotes the light-thickness version, not length and not a change to diameter. AN970 is the oversize/penny-washer family; AN970-5 fits the 5/16-inch fastener size."],
  ["AN380 cotter pins", "The first dash field is diameter in thirty-seconds; the second is length in quarters. AN380-3-4: diameter 3/32, length 4/4 = 1 inch. AN380-4-2: diameter 4/32 = 1/8, length 2/4 = 1/2 inch. AN380-5-2: diameter 5/32, length 1/2 inch. AN380-6-5: diameter 6/32 = 3/16, length 5/4 = 1 1/4 inches."],
  ["Ambiguous quiz examples", "AN75-3 is reported as 5/16-inch diameter in the marked key, but its printed designation is unclear. AN392-6 is reported as 3/16-inch length and called a cotter pin, conflicting with the clevis-pin family in the course deck. Memorize those only as reported key values until corrected; do not derive or teach a general decoding method from them."],
] };

const anExamples = [
  ["AN3-5", "3/16", "5/8", "3", "5"], ["AN3-20", "3/16", "2", "3", "20"],
  ["AN4H-3", "1/4", "3/8", "4", "3"], ["AN4-7A", "1/4", "7/8", "4", "7"],
  ["AN5-6A", "5/16", "3/4", "5", "6"], ["AN5H-3A", "5/16", "3/8", "5", "3"],
  ["AN5-27", "5/16", "2 7/8", "5", "27"], ["AN5-30A", "5/16", "3", "5", "30"],
  ["AN6-7A", "3/8", "7/8", "6", "7"], ["AN6-10A", "3/8", "1", "6", "10"],
  ["AN6-11", "3/8", "1 1/8", "6", "11"], ["AN6-12", "3/8", "1 1/4", "6", "12"],
  ["AN6-21", "3/8", "2 1/8", "6", "21"], ["AN8-21A", "1/2", "2 1/8", "8", "21"],
];
const nasExamples = [
  ["NAS1103-5", "3/16", "5/16", "5"], ["NAS1103-06", "3/16", "3/8", "06"],
  ["NAS1104-5", "1/4", "5/16", "5"], ["NAS1105-7", "5/16", "7/16", "7"],
  ["NAS1106-15", "3/8", "15/16", "15"], ["NAS1404-6", "1/4", "3/8", "6"],
  ["NAS1404-7", "1/4", "7/16", "7"],
];
export const structuresSizingSections = [methods,
  { id: "hardware-sizing-an", title: "Every tested AN bolt · Diameter and length", items: anExamples.map(([part, diameter, length, d, l]) => [part, `Diameter ${diameter} inch; under-head length ${length} inch. Diameter field AN${d} uses sixteenths. Length field -${l} uses the AN whole-inch/eighth method above. ${part.includes("H") ? "H = drilled head. " : ""}${part.endsWith("A") ? "A = undrilled threaded shank." : "No A suffix: course example has a drilled threaded shank."}`]) },
  { id: "hardware-sizing-nas", title: "Every tested NAS example · Family diameter and grip", items: [
    ...nasExamples.map(([part, d, g, code]) => [part, `Diameter ${d} inch; grip ${g} inch. Identify diameter from this exact NAS family. The dash field -${code} gives grip in sixteenths; grip excludes the threaded part. The quiz's generic word length refers to this grip dimension.`]),
    ["NAS6204-5H", "Tested field: H = drilled head. The supplied quiz does not establish its diameter or length for this question; use its family specification for untested fields."],
    ["NAS6205-3H", "Tested diameter: 5/16 inch. H = drilled head. A grip/total-length value is not inferred from the other NAS families."],
  ] },
  { id: "hardware-sizing-nuts-washers", title: "Every tested nut and washer size", items: [
    ["AN310-5; AN310-6; AN310-8", "Matching diameters: 5/16; 6/16 = 3/8; 8/16 = 1/2 inch. The dash field is divided by 16, not by 8 or 32."],
    ["AN320-4; AN320-8", "Matching diameters: 4/16 = 1/4 inch and 8/16 = 1/2 inch. AN320 identifies the shear-castle family; the dash field identifies size."],
    ["AN960PD-10 / AN960PD10", "Nominal matching fastener diameter 3/16 inch (#10 example). Do not read 10 as ten sixteenths."],
    ["AN960PD416; AN960416L", "Nominal fastener diameter 4/16 = 1/4 inch. PD is the supplied aluminum example; L means light thickness."],
    ["AN960PD516", "Nominal fastener diameter 5/16 inch. PD is aluminum in this course example."],
    ["AN960PD-616; AN960616L", "Nominal fastener diameter 6/16 = 3/8 inch. The L version is light thickness; its nominal diameter is still 3/8 inch."],
    ["AN970-5", "Penny/oversize washer for nominal 5/16-inch fastener diameter. Oversize describes the larger outside bearing area, not a 5/16-inch outside diameter."],
  ] },
  { id: "hardware-sizing-pins", title: "Every tested AN380 diameter and length", items: [
    ["AN380-3-4", "Diameter 3/32 inch. Length 4/4 = 1 inch. First field uses thirty-seconds; second uses quarters."],
    ["AN380-4-2", "Diameter 4/32 = 1/8 inch. Length 2/4 = 1/2 inch."],
    ["AN380-5-2", "Diameter 5/32 inch. Length 2/4 = 1/2 inch."],
    ["AN380-6-5", "Diameter 6/32 = 3/16 inch. Length 5/4 = 1 1/4 inches."],
    ["AN75-3 and AN392-6 · Key-only exceptions", "The key reports AN75-3 = 5/16-inch diameter and AN392-6 = 3/16-inch length. Both printed designations need clarification. They are not examples of the AN-bolt or AN380 decoding rules."],
  ] },
];
export const structuresSizingGuide = {
  course: "Structures", sections: structuresSizingSections,
  intro: "A dedicated guide to diameter, AN under-head length, NAS grip, nut and washer size, and cotter-pin fields. Every tested part number is covered here. All dimensions are inches.",
  basis: "Based on your supplied graded hardware quizzes and course presentations. Worked fixed examples explain the requested sizing methods; no new random calculation test is added. Quiz-key typos and unclear designations are explicitly separated from verified decoding rules.",
};
