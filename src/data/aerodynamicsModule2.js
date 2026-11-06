import * as base from "./aerodynamicsModule2Base.js";
import { aeroFinalSources, aeroFinalChoice, aeroFinalRecall, aeroFinalNotes } from "./aerodynamicsFinalContent.js";
import { aerodynamicsReviewQuestions } from "./aerodynamicsReviewPractice.js";
import { includeReviewConcepts } from "./aerodynamicsReviewVariants.js";
import { withAerodynamicsRationale } from "./aerodynamicsAnswerRationale.js";
export * from "./aerodynamicsModule2Base.js";
export const previousAerodynamicsChoiceQuestions = base.aerodynamicsChoiceQuestions;
export const previousAerodynamicsRecallQuestions = base.aerodynamicsRecallQuestions;
export const aeroSources = { ...base.aeroSources, ...aeroFinalSources };
const expanded = includeReviewConcepts([...base.aerodynamicsChoiceQuestions,...aeroFinalChoice], [...base.aerodynamicsRecallQuestions,...aeroFinalRecall], aerodynamicsReviewQuestions);
export const aerodynamicsChoiceQuestions = expanded.choice.map(withAerodynamicsRationale);
export const aerodynamicsRecallQuestions = expanded.recall.map(withAerodynamicsRationale);
export const aerodynamicsNoteSections = [...base.aerodynamicsNoteSections,...aeroFinalNotes,{
  id:"aero-coordinate-abbreviations", title:"Coordinate abbreviations — each letter", items:[
    ["FS — F","F means fuselage. (Presentation 28, PDF page 8.)"],
    ["FS — S","S means station. (Presentation 28, PDF page 8.)"],
    ["BL — B","B means buttock. (Presentation 28, PDF page 9.)"],
    ["BL — L","L means line. (Presentation 28, PDF page 9.)"],
    ["WL — W","W means water. (Presentation 28, PDF page 10.)"],
    ["WL — L","L means line. (Presentation 28, PDF page 10.)"],
    ["WS — W","W means wing. (Presentation 28, PDF page 11.)"],
    ["WS — S","S means station. (Presentation 28, PDF page 11.)"],
    ["LBL — L, B, L","Left, buttock, line: first L means left, B means buttock, final L means line. (Presentation 28, PDF page 9.)"],
    ["RBL — R, B, L","Right, buttock, line: R means right, B means buttock, L means line. (Presentation 28, PDF page 9.)"],
  ],
},{
  id:"aero-screenshot-test-limits", title:"Class screenshot test — source wording to watch", items:[
    ["Available questions","The supplied photos show only questions 5–12 and 26–33. The separate screenshot test reproduces those sixteen stems and option sets; unseen questions are not reconstructed."],
    ["Empennage wording","Question 5 says ‘vertical and directional control’. The intended option is the only tail-function choice, but the fuller description is that the empennage provides pitch and yaw stability and control through horizontal and vertical tail surfaces."],
    ["Sound through materials","Question 26's intended answer is solid for the listed ordinary media. Sound requires a medium and cannot travel through a vacuum; density alone does not set sound speed for every material."],
    ["Cabin altitude","Question 32's 8,000 feet is the supplied review example, not a universal cruise setting for every airplane."],
    ["Bank angle","Question 33's 30°–40° choice is an approximate ‘noticeable’ range. In a steady level turn, load factor begins increasing as soon as bank is nonzero; the original word ‘begin’ is misleading."],
  ],
}];
const diagram = (file,alt) => ({ src:`/aerodynamics/module-2/${file}.png`, alt, crop:{x:0,y:0,width:1920,height:1080,imageWidth:1920,imageHeight:1080} });
export const aerodynamicsDiagrams = { ...base.aerodynamicsDiagrams,
  controlConstruction:diagram("control-construction","Original presentation 26 control-surface construction reference with ribs and lightening holes"),
  splitRudder:diagram("split-rudder","Original labelled split-rudder example with separate upper and lower sections"),
  stallFence:diagram("stall-fence","Original labelled stall-fence reference showing its chordwise orientation"),
  engineCovering:diagram("engine-covering","Original drawing labelling cowling, engine, propeller and firewall"),
  enginePylon:diagram("engine-pylon","Original drawing labelling wing, pylon and jet engine"),
  fuelLocations:diagram("fuel-locations","Original large-aircraft example labelling wing, centre, auxiliary and tail fuel tank locations"),
  stationReferences:diagram("station-references","Original aircraft coordinate diagram showing buttock lines, water lines and fuselage stations"),
};
