import source from "./systems-mixed-practice2.json" with { type: "json" };

export const systemsDiagrams = {
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
