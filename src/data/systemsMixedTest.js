import source from "./systems-mixed-practice2.json" with { type: "json" };

export const systemsDiagrams = {
  "power-pack": { src: "/systems/reversible-power-pack.svg", alt: "Landing-gear hydraulic power-pack schematic with a reservoir, reversible gear pump, valves and actuator lines; red denotes pressure and blue return.", crop: { imageWidth: 1000, x: 0, y: 0, width: 1000, height: 880 } },
  "open-states": { src: "/systems/open-centre-states.svg", alt: "Two hydraulic circuit states labelled A and B. Legend: pink suction, red pressure, green return.", crop: { imageWidth: 1000, x: 0, y: 0, width: 1000, height: 435 } },
  "closed-labelled": { src: "/systems/closed-centre-labelled.svg", alt: "Hydraulic circuit with parallel selector branches, an accumulator, an unloading valve, thermal relief valves and a system relief valve.", crop: { imageWidth: 960, x: 0, y: 0, width: 960, height: 675 } },
  "mechanical": { src: "/systems/mechanical-advantage.svg", alt: "Connected small effort piston and larger load piston with movement arrows.", crop: { imageWidth: 930, x: 0, y: 0, width: 930, height: 565 } },
  actuators: { src: "/systems/actuator-comparison.svg", alt: "Two actuator construction sketches labelled A and B, showing their ports, pistons and internal details.", crop: { imageWidth: 800, x: 0, y: 0, width: 800, height: 360 } },
  17: { src: "/structures/reservoirs.svg", alt: "Two hydraulic reservoir diagrams: a combined unit on the left and a separate reservoir connected by lines on the right.", crop: { imageWidth: 910, x: 0, y: 0, width: 910, height: 610 } },
  25: { src: "/structures/components.svg", alt: "Hydraulic system diagram with components numbered 1 to 5.", crop: { imageWidth: 960, x: 0, y: 0, width: 960, height: 675 } },
  26: { src: "/structures/system.svg", alt: "Hydraulic system diagram showing reservoir, pumps, and two selector valves in their neutral positions.", crop: { imageWidth: 790, x: 0, y: 0, width: 790, height: 625 } },
  27: { src: "/structures/fluid-samples.svg", alt: "Two hydraulic-fluid samples: red on the left and purple on the right.", crop: { imageWidth: 940, x: 0, y: 0, width: 940, height: 560 } },
};
systemsDiagrams["open-centre"] = systemsDiagrams[26];
systemsDiagrams.reservoirs = systemsDiagrams[17];
systemsDiagrams.components = systemsDiagrams[25];
export const systemsMixedQuestions = source.map(question => ({ ...question, diagram: systemsDiagrams[question.diagramKey ?? question.sourceId] }));
export const diagramQuestions = systemsMixedQuestions.filter(question => question.diagram);
