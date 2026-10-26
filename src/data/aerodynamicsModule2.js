import * as base from "./aerodynamicsModule2Base.js";
import { aeroFinalSources, aeroFinalChoice, aeroFinalRecall, aeroFinalNotes } from "./aerodynamicsFinalContent.js";
import { aerodynamicsReviewQuestions } from "./aerodynamicsReviewPractice.js";
import { includeReviewConcepts } from "./aerodynamicsReviewVariants.js";
export * from "./aerodynamicsModule2Base.js";
export const previousAerodynamicsChoiceQuestions = base.aerodynamicsChoiceQuestions;
export const previousAerodynamicsRecallQuestions = base.aerodynamicsRecallQuestions;
export const aeroSources = { ...base.aeroSources, ...aeroFinalSources };
const expanded = includeReviewConcepts([...base.aerodynamicsChoiceQuestions,...aeroFinalChoice], [...base.aerodynamicsRecallQuestions,...aeroFinalRecall], aerodynamicsReviewQuestions);
export const aerodynamicsChoiceQuestions = expanded.choice;
export const aerodynamicsRecallQuestions = expanded.recall;
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
