import source from "./structures-torque-test.json" with { type: "json" };

// Fine-thread values transcribed from the supplied chart. Each pair is min/max in-lb.
// Columns: AN tension/shear, NAS583–NAS590 tension/shear, aluminum tension/shear.
export const fineThreadTorqueRows = [
  { diameter: "3/16", thread: "10-32", ranges: [[20, 25], [12, 15], [25, 30], [15, 20], [10, 15], [5, 10]] },
  { diameter: "1/4", thread: "1/4-28", ranges: [[50, 70], [30, 40], [80, 100], [50, 60], [30, 45], [15, 30]] },
  { diameter: "5/16", thread: "5/16-24", ranges: [[100, 140], [60, 85], [120, 145], [70, 90], [40, 65], [25, 40]] },
  { diameter: "3/8", thread: "3/8-24", ranges: [[160, 190], [95, 110], [200, 250], [120, 150], [75, 110], [45, 70]] },
  { diameter: "7/16", thread: "7/16-20", ranges: [[450, 500], [270, 300], [520, 630], [300, 400], [180, 280], [110, 170]] },
  { diameter: "1/2", thread: "1/2-20", ranges: [[480, 690], [290, 410], [770, 950], [450, 550], [280, 410], [160, 260]] },
  { diameter: "9/16", thread: "9/16-18", ranges: [[800, 1000], [480, 600], [1100, 1300], [650, 800], [380, 580], [230, 360]] },
  { diameter: "5/8", thread: "5/8-18", ranges: [[1100, 1300], [660, 780], [1250, 1550], [750, 950], [550, 670], [270, 420]] },
  { diameter: "3/4", thread: "3/4-16", ranges: [[2300, 2500], [1300, 1500], [2550, 3200], [1500, 1900], [950, 1250], [550, 880]] },
];

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
