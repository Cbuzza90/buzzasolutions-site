import chart from "./torque-chart.json" with { type: "json" };

export const structuresNoteSections = [
  { id: "lookup", title: "Torque chart · lookup order", items: [
    ["1 · Thread section", "This practice test uses FINE THREAD SERIES. The full chart also has a coarse section; do not read the wrong section."],
    ["2 · Diameter / thread row", "The chart labels rows by thread designation, not always the nominal fraction in the question. Match the diameter to the thread row shown in the chart header."],
    ["3/16 inch · 10-32 row", "The nominal 3/16-inch bolt size in this course exercise uses the row labelled 10-32 (#10, 32 threads per inch). For AN3DD with AN364D, use that fine-thread row and the aluminum shear-nut column: 5–10 in-lb."],
    ["3 · Bolt group", "Find the specific bolt in the chart headings: first steel group, second steel group, or aluminum group. A NAS or MS prefix alone does not identify its column."],
    ["4 · Nut category", "Within that bolt group, choose the tension- or shear-nut column using the nut designation."],
    ["5 · Both limits", "Read minimum and maximum from that row and column. Answers require the full range in inch-pounds (in-lb). No calculations are needed."]
  ] },
  { id: "groups", title: "All three bolt groups", items: [
    ["Steel group 1", chart.boltGroups[0].series.join("; ") + ". Find the individual number within the listed range."],
    ["Steel group 2", chart.boltGroups[1].series.join("; ") + ". For example, NAS585 belongs to NAS583–NAS590. NAS835 is not listed on this chart."],
    ["Aluminum group", chart.boltGroups[2].series.join("; ") + ". Match the aluminum nut group, not a steel nut column."],
    ["Match the size", "The generated pool checks the diameter for each specific bolt designation. For example: NAS584 = 1/4 inch, NAS585 = 5/16 inch, NAS586 = 3/8 inch. Unverified size pairings and blank torque cells are excluded."]
  ] },
  { id: "nuts", title: "Tension vs shear nuts", items: [
    ["Steel group 1 tension", chart.nutGroups[0].series.join(", ")],
    ["Steel group 2 tension", chart.nutGroups[2].series.join(", ")],
    ["Steel shear", chart.nutGroups[1].series.join(", ")],
    ["Aluminum tension", chart.nutGroups[4].series.join(", ")],
    ["Aluminum shear", chart.nutGroups[5].series.join(", ")],
    ["Common trap", "A correct diameter with the wrong nut category or bolt group still gives the wrong range."]
  ] },
  { id: "reading", title: "Units, full chart & common mistakes", items: [
    ["Units", "All practice answers are in-lb. Do not read or label the values as foot-pounds."],
    ["Two values", "Minimum and maximum are a pair; do not give just one limit or mix limits from adjacent columns."],
    ["Use the full chart", "Open the full reference below. Fit, zoom buttons, and two-finger pinch with touch panning help inspect the row and headings together."],
    ["Scope", "This torque section covers the supplied bolt/nut chart. The sections above cover all five supplied Module 2 presentations and the measuring-tools review sheet."],
    ["Aircraft instructions", "Manufacturer-specified torque takes precedence. This general chart practice is not a substitute for the applicable maintenance instructions."]
  ] }
];
