import source from "./systems-mixed-practice2.json" with { type: "json" };

const diagrams = {
  17: { src: "/structures/reservoirs.png", alt: "Two hydraulic reservoir diagrams: a combined unit on the left and a separate reservoir connected by lines on the right.", crop: { imageWidth: 1441, x: 400, y: 148, width: 725, height: 345 } },
  25: { src: "/structures/components.png", alt: "Hydraulic system diagram with components numbered 1 to 5.", crop: { imageWidth: 1313, x: 56, y: 106, width: 623, height: 414 } },
  26: { src: "/structures/system.png", alt: "Hydraulic system diagram showing reservoir, pumps, and two selector valves in their neutral positions.", crop: { imageWidth: 375, x: 30, y: 59, width: 258, height: 224 } },
  27: { src: "/structures/fluid-samples.png", alt: "Two hydraulic-fluid samples: red on the left and purple on the right.", crop: { imageWidth: 1304, x: 404, y: 108, width: 531, height: 475 } },
};
export const systemsMixedQuestions = source.map(question => ({ ...question, diagram: diagrams[question.sourceId] }));
export const diagramQuestions = systemsMixedQuestions.filter(question => question.diagram);
