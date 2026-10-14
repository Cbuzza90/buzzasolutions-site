import source from "./systems-mixed-practice2.json" with { type: "json" };

export const systemsDiagrams = {
  "power-pack": { src: "/systems/reversible-power-pack.png", alt: "Landing-gear hydraulic power-pack schematic with a reservoir, reversible gear pump, valves and actuator lines; red denotes pressure and blue return.", crop: { imageWidth: 1080, x: 140, y: 695, width: 855, height: 870 } },
  "open-states": { src: "/systems/open-centre-states.png", alt: "Two hydraulic circuit states labelled A and B. Legend: pink suction, red pressure, green return.", crop: { imageWidth: 1080, x: 160, y: 1005, width: 820, height: 280 } },
  "closed-labelled": { src: "/systems/closed-centre-labelled.png", alt: "Hydraulic circuit with parallel selector branches, an accumulator, an unloading valve, thermal relief valves and a system relief valve.", crop: { imageWidth: 1080, x: 130, y: 702, width: 780, height: 520 } },
  "mechanical": { src: "/systems/mechanical-advantage.png", alt: "Connected small effort piston and larger load piston with movement arrows.", crop: { imageWidth: 1080, x: 135, y: 752, width: 715, height: 510 } },
  actuators: { src: "/systems/actuator-comparison.svg", alt: "Two actuator construction sketches labelled A and B, showing their ports, pistons and internal details.", crop: { imageWidth: 800, x: 0, y: 0, width: 800, height: 360 } },
  17: { src: "/structures/reservoirs.png", alt: "Two hydraulic reservoir diagrams: a combined unit on the left and a separate reservoir connected by lines on the right.", crop: { imageWidth: 1441, x: 400, y: 148, width: 725, height: 345 } },
  25: { src: "/structures/components.png", alt: "Hydraulic system diagram with components numbered 1 to 5.", crop: { imageWidth: 1313, x: 56, y: 106, width: 623, height: 414 } },
  26: { src: "/structures/system.png", alt: "Hydraulic system diagram showing reservoir, pumps, and two selector valves in their neutral positions.", crop: { imageWidth: 375, x: 30, y: 59, width: 258, height: 224 } },
  27: { src: "/structures/fluid-samples.png", alt: "Two hydraulic-fluid samples: red on the left and purple on the right.", crop: { imageWidth: 1304, x: 404, y: 108, width: 531, height: 475 } },
};
systemsDiagrams["open-centre"] = systemsDiagrams[26];
systemsDiagrams.reservoirs = systemsDiagrams[17];
systemsDiagrams.components = systemsDiagrams[25];
export const systemsMixedQuestions = source.map(question => ({ ...question, diagram: systemsDiagrams[question.diagramKey ?? question.sourceId] }));
export const diagramQuestions = systemsMixedQuestions.filter(question => question.diagram);
