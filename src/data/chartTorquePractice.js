import chart from "./torque-chart.json" with { type: "json" };

export function expandChartSeries(series) {
  const match = series.match(/^(AN|MS|NAS)(\d+)([A-Z]*) THRU \1(\d+)\3$/);
  if (!match) return [series];
  return Array.from({ length: Number(match[4]) - Number(match[2]) + 1 }, (_, index) => `${match[1]}${Number(match[2]) + index}${match[3]}`);
}

export const torqueChartPools = chart.boltGroups.map((group, index) => ({
  name: ["Steel group 1", "Steel group 2", "Aluminum group"][index],
  bolts: group.series.flatMap(expandChartSeries),
  tensionNuts: chart.nutGroups[index * 2].series,
  shearNuts: chart.nutGroups[index * 2 + 1].series,
}));

function diameterNumber(diameter) {
  if (diameter.startsWith("#")) return null;
  const [whole, fraction] = diameter.includes(" ") ? diameter.split(" ") : ["0", diameter];
  const [numerator, denominator = "1"] = fraction.split("/");
  return 16 * (Number(whole) + Number(numerator) / Number(denominator));
}

// Explicit size lists from the manufacturer's tables, not every integer in a range.
// Each entry names a chart-listed base designation; grip/length suffixes are outside this exercise.
export const torqueBoltSizes = chart.fineRows.flatMap(row => {
  const n = diameterNumber(row.diameter);
  if (!n) return [];
  const definitions = [
    { bolt: `AN${n}`, group: 0 },
    { bolt: `AN${n}DD`, group: 2 },
  ];
  if ([3,4,5,6,7,8,9,10,12,14].includes(n)) definitions.push({ bolt: `MS${20030 + n}`, group: 0 });
  // MS20045 is the manufacturer's listed one-inch size (not MS20046).
  if (n === 16) definitions.push({ bolt: "MS20045", group: 0, thread: "1-12" });
  if ([4,5,6,7,8,9,10,12,14,16,18,20].includes(n)) definitions.push({ bolt: `MS${20000 + n}`, group: 1, thread: n === 12 ? "3/4-14" : row.thread });
  if ([4,5,6,7,8,9,10,12,14,16,18].includes(n)) definitions.push({ bolt: `NAS${140 + n}`, group: 1 });
  if (n >= 3 && n <= 10) definitions.push({ bolt: `NAS${330 + n}`, group: 1 }, { bolt: `NAS${580 + n}`, group: 1 });
  if ([4,5,6,7,8,9,10,12,14,16,18,20].includes(n)) definitions.push({ bolt: `NAS${620 + n}`, group: 1 });
  if ([3,4,5,6,7,8,9,10,12,14,16,18,20].includes(n)) definitions.push({ bolt: `NAS${1300 + n}`, group: 1, thread: n === 16 ? "1-12" : row.thread });
  return definitions.filter(definition => torqueChartPools[definition.group].bolts.includes(definition.bolt) && (!definition.thread || definition.thread === row.thread)).map(definition => ({ ...definition, diameter: row.diameter }));
});

export function lookupChartTorque({ diameter, bolt, nut }) {
  const size = torqueBoltSizes.find(item => item.bolt === bolt && item.diameter === diameter);
  const row = chart.fineRows.find(item => item.diameter === diameter);
  if (!size || !row) throw new Error("Unsupported bolt and diameter pairing");
  const pool = torqueChartPools[size.group];
  const shear = pool.shearNuts.includes(nut);
  if (!shear && !pool.tensionNuts.includes(nut)) throw new Error("Nut is outside this bolt's chart pool");
  const column = size.group * 2 + Number(shear);
  const range = row.ranges[column];
  if (!range) throw new Error("No torque value in this chart cell");
  return { row, group: size.group, shear, column, range };
}

const rangeText = range => `${range[0].toLocaleString("en-US")}–${range[1].toLocaleString("en-US")} in-lb`;
export const torquePracticeQuestions = torqueBoltSizes.flatMap(size => {
  const pool = torqueChartPools[size.group];
  return [...pool.tensionNuts, ...pool.shearNuts].flatMap(nut => {
    const { row, group, shear, column, range } = lookupChartTorque({ ...size, nut });
    const right = rangeText(range);
    const candidates = [row.ranges[group * 2 + Number(!shear)], ...row.ranges.filter((_, index) => index % 2 === Number(shear) && Math.floor(index / 2) !== group), ...chart.fineRows.filter(other => other !== row).map(other => other.ranges[column])].filter(Boolean);
    const wrong = [...new Set(candidates.map(rangeText))].filter(option => option !== right).slice(0, 3);
    if (wrong.length !== 3) return [];
    return [{ ...size, nut, id: `${size.diameter}-${size.bolt}-${nut}`,
      prompt: `Diameter: ${size.diameter}″ · Bolt: ${size.bolt} · Nut: ${nut}\nWhat is the minimum–maximum fine-thread torque in in-lb?`,
      options: [right, ...wrong], correctIndex: 0,
      explanation: `Use the ${row.thread} fine-thread row, ${pool.name}, and its ${shear ? "shear" : "tension"}-nut column for ${nut}. Minimum: ${range[0].toLocaleString("en-US")} in-lb; maximum: ${range[1].toLocaleString("en-US")} in-lb.`,
    }];
  });
});

export function sampleTorqueQuestions(questions, count, random = Math.random) {
  let available = [...questions];
  const selected = [];
  const pick = values => values[Math.floor(random() * values.length)];
  while (available.length && selected.length < count) {
    const diameter = pick([...new Set(available.map(q => q.diameter))]);
    const byDiameter = available.filter(q => q.diameter === diameter);
    const group = pick([...new Set(byDiameter.map(q => q.group))]);
    const byGroup = byDiameter.filter(q => q.group === group);
    const bolt = pick([...new Set(byGroup.map(q => q.bolt))]);
    const question = pick(byGroup.filter(q => q.bolt === bolt));
    selected.push(question);
    available = available.filter(q => q.id !== question.id);
  }
  return selected;
}
