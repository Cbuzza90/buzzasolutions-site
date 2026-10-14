export const structuresNoteSections = [
  { id: "lookup", title: "Torque chart · lookup order", items: [
    ["1 · Thread section", "This practice test uses FINE THREAD SERIES. The full chart also has a coarse section; do not read the wrong section."],
    ["2 · Diameter / thread row", "Find the row for the question's bolt diameter. The row also lists its thread designation."],
    ["3 · Bolt group", "Select the chart's AN steel, NAS583–NAS590 steel, or aluminum DD group."],
    ["4 · Nut category", "Within that bolt group, choose the tension- or shear-nut column using the nut designation."],
    ["5 · Both limits", "Read minimum and maximum from that row and column. Answers require the full range in inch-pounds (in-lb). No calculations are needed."]
  ] },
  { id: "groups", title: "All three bolt groups", items: [
    ["AN steel", "Ordinary AN bolt designations in this test, such as AN4 or AN8, use the first steel bolt group."],
    ["NAS series", "NAS means NAS583–NAS590 here. Use the second steel group; do not assume the AN steel limits are identical."],
    ["Aluminum DD", "AN bolt designations ending in DD use the aluminum group. The listed nut designations also carry a D suffix."]
  ] },
  { id: "nuts", title: "Tension vs shear nuts", items: [
    ["Steel tension", "AN310 and AN365 use the tension-nut column within the selected steel bolt group."],
    ["Steel shear", "AN320 and AN364 use the shear-nut column within the selected steel bolt group."],
    ["Aluminum tension", "AN310D and AN365D use the aluminum tension column."],
    ["Aluminum shear", "AN320D and AN364D use the aluminum shear column."],
    ["Common trap", "A correct diameter with the wrong nut category or bolt group still gives the wrong range."]
  ] },
  { id: "reading", title: "Units, full chart & common mistakes", items: [
    ["Units", "All practice answers are in-lb. Do not read or label the values as foot-pounds."],
    ["Two values", "Minimum and maximum are a pair; do not give just one limit or mix limits from adjacent columns."],
    ["Use the full chart", "Open the full reference below. Fit, zoom buttons, and two-finger pinch with touch panning help inspect the row and headings together."],
    ["Scope", "These notes cover the supplied bolt/nut chart practice. Other Structures topics need their own course review material."],
    ["Aircraft instructions", "Manufacturer-specified torque takes precedence. This general chart practice is not a substitute for the applicable maintenance instructions."]
  ] }
];
