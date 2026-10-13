import source from "./structures-torque-test.json" with { type: "json" };

import chart from "./torque-chart.json" with { type: "json" };

// The test and the full reference chart share the same checked fine-thread values.
export const fineThreadTorqueRows = chart.fineRows.filter(row => source.some(question => question.diameter === row.diameter));

export const torqueGroups = [
  { name: "AN steel", tension: "AN310 / AN365", shear: "AN320 / AN364" },
  { name: "NAS583–NAS590 steel", tension: "AN310 / AN365", shear: "AN320 / AN364" },
  { name: "Aluminum DD", tension: "AN310D / AN365D", shear: "AN320D / AN364D" },
];

export function lookupTorque({ diameter, bolt, nut }) {
  const row = fineThreadTorqueRows.find(row => row.diameter === diameter);
  const group = bolt === "NAS" ? 1 : /^AN\d+DD$/.test(bolt) ? 2 : /^AN\d+$/.test(bolt) ? 0 : -1;
  const match = nut.match(/^AN(310|365|320|364)(D?)$/);
  if (!row || group < 0 || !match || Boolean(match[2]) !== (group === 2)) throw new Error("Unsupported torque-chart combination");
  const shear = ["320", "364"].includes(match[1]);
  const column = group * 2 + Number(shear);
  return { row, group, shear, column, range: row.ranges[column] };
}

export const formatTorqueRange = range => `${range[0].toLocaleString("en-US")}–${range[1].toLocaleString("en-US")} in-lb`;

export const torqueQuestions = source.map(question => {
  const { row, group, shear, column, range } = lookupTorque(question);
  const otherNutColumn = group * 2 + Number(!shear);
  const candidates = [row.ranges[otherNutColumn], ...row.ranges.filter((_, index) => Math.floor(index / 2) !== group && index % 2 === Number(shear)), ...fineThreadTorqueRows.filter(other => other !== row).map(other => other.ranges[column])];
  const right = formatTorqueRange(range);
  const wrong = [...new Set(candidates.map(formatTorqueRange))].filter(option => option !== right).slice(0, 3);
  const correctIndex = (question.id - 1) % 4;
  const options = [...wrong];
  options.splice(correctIndex, 0, right);
  const boltLabel = question.bolt === "NAS" ? "NAS583–NAS590" : question.bolt;
  return { ...question, prompt: `Diameter: ${question.diameter}″ · Bolt: ${boltLabel} · Nut: ${question.nut}\nWhat is the minimum–maximum fine-thread torque in in-lb?`, options, correctIndex, explanation: `Use the ${row.thread} fine-thread row, the ${torqueGroups[group].name} bolt group, and the ${shear ? "shear" : "tension"}-nut column for ${question.nut}. Minimum: ${range[0].toLocaleString("en-US")} in-lb; maximum: ${range[1].toLocaleString("en-US")} in-lb.` };
});
