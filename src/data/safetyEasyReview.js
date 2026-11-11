import { safetyModule2Choice, safetyModule2Path } from "./safetyModule2.js";
import { improveChoiceOptions } from "./improvedChoiceOptions.js";
import { safetyDistractors } from "./safetyDistractors.js";

export const safetyEasyReviewQuestions=[];
export const safetyEasyReviewNoteSections=[];
const deck="SAFE 10094 Test 2 Review - Under 20MB.pptx";
function add(id,topic,prompt,answer,distractors,why,slides,extra={}) {
  const explanation=`${why} (Test 2 Review Worksheet Prof Copy; ${deck}, slides ${slides.join(", ")}.)`;
  safetyEasyReviewQuestions.push(improveChoiceOptions({id:`safety2-easy-${id}`,topic,prompt,options:[answer,...distractors],correctIndex:0,explanation,source:{deck:"review",slides},...extra},safetyDistractors[id]));
}
// Reuse verified concepts, but retain review wording, references and independent IDs.
for(const [target,slide,prompt] of [
  ["whmis-elements",4,"What are the three principal elements of WHMIS?"],
  ["workplace-label",9,"When does the review describe creating a workplace label?"],
  ["label-product",10,"Which workplace-label item identifies the product?"],
  ["label-handling",10,"Which workplace-label item tells a worker how to handle the product safely?"],
  ["label-sds",10,"Which workplace-label item directs workers to detailed safety information?"],
  ["signal-word",8,"What are Danger and Warning examples of on a supplier label?"],
  ["hazard-statement",8,"Which supplier-label element describes a product's hazards?"],
  ["precaution-statement",8,"Which supplier-label element describes protective measures?"],
  ["supplier-identifier",8,"Which supplier-label element identifies the responsible company?"],
  ["sds-access",11,"What are Safety Data Sheets?"],
  ["physical-lock",14,"In general, what is LOTO?"],
  ["placard",15,"What is placarding?"],
  ["verify-isolation",16,"Before commencing work on an aircraft system, what must be verified?"],
  ["energy-electrical",18,"Which stored-energy category is associated with electricity?"],
  ["energy-mechanical",18,"Which stored-energy category includes springs?"],
  ["energy-hydraulic",18,"Which stored-energy category concerns hydraulics?"],
  ["energy-pneumatic",18,"Which stored-energy category concerns compressed gas?"],
  ["energy-chemical",18,"Which stored-energy category concerns chemicals?"],
  ["energy-thermal",18,"Which stored-energy category concerns heat?"],
  ["energy-gravity",18,"Which stored-energy category concerns weight and gravity?"],
  ["energy-flow",18,"Which additional energy-source item in the review concerns material flowing?"],
  ["confined-definition",21,"What is the review's definition of a confined space?"],
  ["assessment",23,"What hazards must the confined-space assessment identify?"],
  ["permit",23,"Which system must be established for each confined-space entry?"],
  ["outside-test",25,"From where should pre-entry air testing be carried out before anyone enters?"],
  ["isolation",27,"What must be done to hazardous energy sources before confined-space entry?"],
  ["entry-opening",27,"What must a confined-space entry opening be large enough to accommodate?"],
  ["supervisor",31,"Who authorizes the fuel-tank work and ensures procedures are followed?"],
  ["attendant",31,"Where is the standby attendant stationed?"],
  ["evacuation",32,"What must entrants do if working conditions deteriorate?"],
  ["communication",33,"What communication is maintained between fuel-tank entrants and the attendant?"],
  ["tools-air",34,"What should power the pneumatic tools used in the confined-space example?"],
  ["electrical-rating",34,"What rating is required for electrical equipment in a potentially flammable atmosphere?"],
  ["trained-rescuer",36,"Who may enter a confined space to attempt a rescue?"],
  ["ventilation",40,"What prevents contaminants from building up while confined-space work continues?"],
  ["tug",44,"How are large aircraft usually moved in the review?"],
  ["brake-person",45,"Who must be in the flight deck before the aircraft is moved in the review's towing example?"],
  ["bar-inspection",46,"What must be inspected after attaching the tow bar and before movement?"],
  ["towbar",47,"What type of tow bar must be used?"],
  ["wing-walker",49,"Where are wing walkers stationed during towing?"],
  ["tail-walker",49,"Who is assigned when sharp turns or backing are required?"],
  ["no-between",51,"Where must people never walk or ride during towing?"],
  ["walking-speed",52,"What speed limit does the review give relative to the walking tow team?"],
  ["chocks",53,"What must remain immediately available throughout a tow for emergencies?"],
  ["doors-locks",54,"Which doors, ladders and locks should be prepared before the described tow?"],
  ["inflation",54,"What tire and landing-gear-strut condition should be checked before towing?"],
  ["hand-pressure",62,"Where may hand pressure be applied when moving a small aircraft?"],
  ["stop-command",61,"Whose emergency-stop instruction must the tug driver obey?"],
  ["constant-contact",61,"What communication is required between the tug driver and flight-deck brake person?"],
]) {
  const q=safetyModule2Choice.find(q=>q.learningTarget===target);
  const why=q.explanation.slice(0,q.explanation.lastIndexOf(" ("));
  add(target,q.topic,`Review: ${prompt}`,q.options[q.correctIndex],q.options.filter((_,i)=>i!==q.correctIndex),why,[slide],q.previousOptions ? {previousOptions:q.previousOptions} : {});
}

add("whmis-purpose","whmis","For what purpose was WHMIS developed?","Consistent hazardous-product information and worker education to prevent injury and illness",["Only to provide product prices","Only to record aircraft registration","To replace all worker training with container labels"],"The review links consistent hazard information with educating workers and preventing injuries and illnesses. Labels, sheets and education work together; the purpose is broader than simply naming a chemical.",[4,5]);
add("sds-creator","whmis","Who creates the product-specific SDS in the review?","The manufacturer",["The aircraft's passenger","The tow-team wing walker","The worker who invents a name for the product"],"The professor's answer names the manufacturer. Workers must have access to the actual product's information rather than substituting an unrelated sheet or making up hazard information.",[11]);
add("read-sds","whmis","To work safely, what must workers read before working with a chemical?","The product's Safety Data Sheet",["Only its price label","Only the delivery invoice","An unrelated product's instructions"],"The review explicitly says to read the SDS before working with a chemical. This makes product-specific precautions available before exposure instead of after a problem occurs.",[11]);
add("lockout-definition","loto","What is lockout?","Securing a control or isolation device to prevent operation until the lockout is removed",["Displaying a warning without isolating anything","Turning on equipment to check its speed","Removing all documentation of the job"],"The review distinguishes physically securing isolation from placarding, which warns but does not remove the hazard. The device prevents operation while the lockout remains in place.",[15]);
add("loto-purpose","loto","Why do we have lockout/tagout procedures?","To prevent injury from unexpected activation or release of hazardous energy",["To make repairs look complete before work starts","To replace all mechanical inspections","To remove the need for communication"],"Unexpected energization or release can injure people during maintenance. The control applies to stored energy as well as supplied power, which is why the review lists eight different sources.",[17,18]);
add("tag-origin","loto","Who should remove tags in the review's normal case?","The originating person",["Any passer-by","The first person who needs the equipment","An unassigned visitor"],"The review identifies the originating person and mentions a supervisor if that person is unavailable. This classroom summary does not authorize arbitrary removal: the approved lock-removal procedure and required checks still apply.",[19]);
add("tag-unavailable","loto","Who does the review name if the originating tag owner is unavailable?","A supervisor, under the applicable authorized removal procedure",["Any nearby worker without checks","Any person who wants to energize the system","An untrained visitor"],"The professor's answer names a supervisor as the alternative. The actual workplace procedure governs authorization and verification; the answer is not permission for a supervisor to bypass required safety checks.",[19]);
add("confined-examples","confined-entry","Which set gives the three aircraft confined-space work examples in the worksheet?","Wing fuel tanks, auxiliary fuel tanks and rear fuselage",["Open parking lot, cafeteria and public road","Toolbox top, office desk and noticeboard","Runway centreline, ramp apron and open courtyard"],"The worksheet lists wing tanks, auxiliary tanks and rear fuselage. These are the review's work examples; whether a particular space meets the applicable legal definition requires its assessment.",[21,22]);
add("confined-plan","confined-entry","What must the confined-space control plan do?","Eliminate or control all identified hazards",["Record only hazards that have already injured someone","Ignore hazards created during the job","Replace every entry permit with a verbal promise"],"The four program components include a hazard-control plan, training, permits and atmospheric testing. Planning must address the hazards, rather than merely noting that a space exists.",[23]);
add("confined-training","confined-entry","Who needs training in the review's confined-space program?","Entrants and the watch/rescue personnel",["Only the person printing the permit","Only people who never work near the space","Only the aircraft's passengers"],"The review explicitly includes the workers entering and the watch/rescue personnel. An emergency response depends on prepared people outside as well as safe work by the entrant.",[23]);
add("confined-testing","confined-entry","What does the review require testing in the tank?","Explosive vapours and oxygen content",["Only paint colour","Only the worker's height","Only the tool manufacturer's name"],"The program includes atmospheric testing as well as permits and training. An oxygen result alone does not establish that flammable or toxic hazards have been controlled.",[23,25]);
add("entry-retest","confined-entry","When does the review require air testing again for re-entry?","Every time before re-entering",["Only at the start of the calendar year","Only after someone reports symptoms","Never after the first entry permit"],"The review calls for testing before every re-entry, as well as ongoing controls. Conditions can change while nobody is inside, so the earlier acceptable test must not be assumed to remain valid.",[37]);
add("tow-walkaround","towing","Before towing an aircraft, what is the first general check in the worksheet?","Walk around and ensure the aircraft is clear to move",["Begin moving before checking clearance","Ask the wing walkers to leave","Assume yesterday's route remains clear"],"The worksheet begins with a walk-around and clearance check. This allows obstructions and aircraft condition to be checked before the tug starts moving.",[60]);
add("jhsc","rights","What is the JHSC composed of?","Worker and employer representatives",["Only customers","Only aircraft passengers","Only outside suppliers"],"JHSC means Joint Health and Safety Committee: J = joint, H = health, S = safety, C = committee. The joint membership brings worker and employer representatives together on workplace safety.",[69]);
add("jhsc-role","rights","What do JHSC members do with potential health and safety issues?","Identify them and bring them to the employer's attention",["Conceal them until an injury occurs","Replace every maintenance manual with a vote","Ignore issues outside their personal task"],"The review describes identifying issues, reporting them to the employer and staying informed of workplace safety developments. Recognizing an issue is useful only if it reaches the people responsible for addressing it.",[69]);
add("fod-review","flight-line","What is FOD in this review?","Foreign Object Debris or Damage",["Fuel Operating Datum","Flight Operations Document","Forward Oil Drain"],"The review uses both debris and damage: loose tools, rags, stones, fasteners, lockwire, birds or drill fragments can cause harm. Identifying and controlling debris helps prevent the resulting damage.",[70]);
add("rag-container","professionalism","How are oily rags or rags soaked with flammable fluids disposed of in the review?","In an approved metal container with a tight metal lid",["In an open cardboard box","On the hangar floor until the end of the week","In the nearest drain"],"The professor's answer specifies an approved metal container with a tight metal lid. It connects the disposal method with the possibility of spontaneous combustion rather than treating the rags as ordinary loose waste.",[71]);
add("spontaneous","professionalism","Why does the review require controlled disposal of contaminated rags?","They may self-ignite through spontaneous combustion",["They always become harmless as soon as they are used","They can no longer contain a combustible material","They must be mixed with clean paper first"],"The review identifies spontaneous combustion as a reason for the designated rag container. Do not leave contaminated rags loose or assume that absence of an external spark eliminates the fire concern.",[71]);
for(const [id,answer,clue,why] of [
  ["fire-fuel","Fuel","the combustible material","Fuel is the combustible material in the fire triangle."],
  ["fire-oxygen","Oxygen","the oxidizing component","Oxygen supplies the oxidizing component in the fire triangle."],
  ["fire-heat","Heat or an ignition source","the component represented by a spark in the review","The review says spark; this is an ignition/heat source. A literal spark is not the only way ignition can occur."],
]) add(id,"professionalism",`Which fire-triangle component is ${clue}?`,answer,["Fuel","Oxygen","Heat or an ignition source","Cooling"].filter(item=>item!==answer),`${why} The review groups fuel, oxygen and a spark together. Understand the ignition concept rather than assuming every fire needs a visible electrical spark.`,[71]);
add("housekeeping","professionalism","What is good housekeeping?","Keeping a neat, safe workplace without clutter",["Leaving all cleanup until someone else notices","Using emergency exits for storage","Keeping unrelated tools and parts scattered together"],"The review links an orderly workplace with fewer accidents, efficiency and a professional image. Spills, clutter and blocked exits are hazards rather than simply cosmetic concerns.",[74]);
add("spill-cleanup","professionalism","When should spills and workplace mess be cleaned up in the review?","Immediately, using the appropriate safe cleanup method",["Only at the next annual audit","Only when a customer complains","After someone slips in them"],"The review says to clean up spills and the workplace immediately. Prompt safe cleanup prevents a known hazard from remaining in a route used by other workers.",[74]);
add("exits-clear","professionalism","How should emergency exits be kept?","Clear of obstructions",["Blocked with spare parts","Used to store waste containers","Hidden behind tool cabinets"],"The review specifically says emergency exits must remain clear. Good housekeeping preserves usable escape routes, not just an orderly workbench.",[74]);
add("jewellery","professionalism","Why is jewellery not allowed in the shop?","It can get caught in equipment",["It makes all tools electrically isolated","It prevents moving parts from catching anything","It replaces required protective equipment"],"The professor's answer identifies catching/entanglement as the hazard. The review also lists watches, bracelets, rings, necklaces, scarves and loose clothing as items to keep out of this hazard.",[75]);

add("label-pictogram","whmis","What supplier-label element visually identifies hazard categories?","Hazard pictograms",["Invoice number","Aircraft registration","Purchase price"],"The review includes hazard pictograms on the supplier label. They communicate hazard information through symbols; they do not replace product identification, statements or the SDS.",[8]);
add("label-supplement","whmis","Which supplier-label item is included if needed in the review's list?","Supplemental information",["An unrelated advertisement","A worker's home address","An aircraft weight-and-balance entry"],"The review qualifies supplemental information with 'if needed'. It adds required context without replacing the core product and hazard information on the label.",[8]);
add("jhsc-inspection","rights","How often does the review say a designated worker JHSC member inspects the workplace?","At least once a month",["Only once when the company opens","Only after a serious accident","Once every ten years"],"The professor's answer gives at least monthly inspections by a designated worker member. This is the review's stated routine; the applicable workplace legislation and arrangements govern actual inspection duties.",[69]);
add("oxygen-student","confined-entry","What oxygen range is stated on slide 39 of the student review?","19.5% to 23%",["18% to 23%","10% to 15%","Any range if the fuel smell is gone"],"The student review states 19.5–23%. The professor worksheet and professor deck contain conflicting 18% wording. This question identifies the student slide's range, not a complete entry authorization: contaminants, flammability, isolation and other controls still have to be addressed.",[39],{source:{deck:"student-review",slides:[39]},explanation:"The student review slide 39 states 19.5–23%. The professor worksheet/deck contain conflicting 18% wording, which is flagged rather than treated as an alternative safe answer. Oxygen alone does not establish safe entry: contaminants, flammability and the other entry controls must be addressed. (SAFE 10094 Test 2 Review student - Under 20MB.pptx, slide 39.)"});
const dangers=[
  ["Poor air quality","An unsuitable breathing atmosphere"],
  ["Chemical exposure","Exposure to hazardous chemicals"],
  ["Fire hazard","Ignition or burning inside the space"],
  ["Process-related hazards","Hazards produced by the work process"],
  ["Moving equipment parts","Contact with moving mechanical parts"],
  ["Shifting or collapsing bulk material","Bulk material moving or collapsing onto a person"],
  ["Barrier failure","Failure allowing a flood or release of free-flowing solid"],
  ["Uncontrolled energy","Unexpected energy release including electrical shock"],
  ["Poor visibility","Inability to see the work or route clearly"],
  ["Biological hazards","Biological agents presenting a hazard"],
];
for(const [i,[answer,clue]] of dangers.entries()) add(`danger-${i+1}`,"confined-entry",`Which confined-space danger in the review matches: ${clue}?`,answer,dangers.filter(row=>row[0]!==answer).slice(0,3).map(row=>row[0]),`${answer} is individually listed in the review. ${clue} must be considered in the assessment; an acceptable oxygen reading does not remove non-oxygen hazards such as moving equipment, chemical exposure or barrier failure.`,[24]);
const attachment=[
  ["Brake person applies brakes","What is the first step in the worksheet's aircraft-specific tow-bar attachment example?"],
  ["Disconnect nosegear torque links","In the worksheet's aircraft-specific example, what follows applying the brakes?"],
  ["Install steering hydraulic bypass pin","In the worksheet's aircraft-specific example, what follows disconnecting the torque links?"],
  ["Position the bar by hand and connect it to the aircraft","In the worksheet's aircraft-specific example, what follows installing the steering bypass pin?"],
  ["Slowly position the tug and attach the bar to it by hand","In the worksheet's aircraft-specific example, what follows connecting the bar to the aircraft?"],
];
for(const [i,[answer,prompt]] of attachment.entries()) add(`attach-${i+1}`,"towing",prompt,answer,attachment.filter(row=>row[0]!==answer).slice(0,3).map(row=>row[0]),`The worksheet places '${answer.toLowerCase()}' at this point in its example. This tests the supplied sequence only. Actual tow-bar, torque-link, steering-bypass and brake configuration must follow the specific AMM/operator procedure; these steps are not universal for every aircraft.`,[64]);

add("whmis-definition","whmis","What is WHMIS in the review?","A comprehensive system for information on safe use of hazardous workplace materials",["An aircraft towing permit","A parts inventory numbering scheme","A replacement for all chemical training"],"WHMIS means Workplace Hazardous Materials Information System. The review describes information for safe use of workplace hazardous materials, supported by labels, SDSs and worker education.",[4]);
add("supplier-handling","whmis","What does the supplier label's safe handling information tell workers?","Precautions for handling the product safely",["Only the product's purchase price","Only the worker's shift schedule","Only the aircraft's registration"],"Safe handling information describes precautions for using the product. It complements the hazard information and SDS rather than substituting unrelated commercial or aircraft details.",[8]);

// Teach the review's nine headings as explicitly older MSDS material, never as
// the modern sixteen-section SDS layout.
const oldHeadings=[
  ["Product information","Product identity, supplier/manufacturer details and use"],
  ["Hazardous ingredients","The hazardous ingredients in the product"],
  ["Physical data","Appearance, odour and physical properties"],
  ["Fire or explosion information","Flammability and fire/explosion information"],
  ["Reactivity information","Instability and incompatible substances"],
  ["Toxicological information","Health effects and exposure routes"],
  ["Preventive measures","Precautions to prevent harmful exposure"],
  ["First aid measures","First-aid response information"],
  ["Preparation information","Information about preparation of the sheet"],
];
for(const [i,[answer,meaning]] of oldHeadings.entries()) add(`old-msds-${i+1}`,"review-msds",`In the review's older nine-heading MSDS layout, which heading covers: ${meaning}?`,answer,oldHeadings.filter(row=>row[0]!==answer).slice(0,3).map(row=>row[0]),`${answer} covers ${meaning.toLowerCase()} in the older review layout. The review mixes MSDS and SDS terminology: this is not the modern sixteen-section SDS format.`,[12]);

const chart=(src,width,height,alt)=>({src:`/safety/module-2/${src}`,alt,crop:{imageWidth:width,x:0,y:0,width,height}});
export const safetyEasyReviewDiagrams={
  reviewWhmis:chart("review-whmis-symbols.png",1060,500,"Original review slide 6: nine labelled WHMIS pictograms and their meanings."),
  reviewLegacy:chart("review-legacy-symbols.png",558,368,"Original review slide 7: older WHMIS class A compressed gas, B flammable/combustible, C oxidizing and other historical classes."),
  reviewLines:chart("review-fluid-lines.png",1505,932,"Original review slide 72 labelled fluid-line colour and geometric-symbol reference, including the highlighted entries."),
};
const pictograms=[
  ["Flammable",15,10,"The plain flame identifies the chart's flammable category. The flame over a circle instead identifies an oxidizer."],
  ["Corrosive",351,10,"The corrosion pictogram shows liquid attacking a hand and a metal surface. It differs from the skull and crossbones used for toxic material."],
  ["Biohazardous infectious materials",705,10,"The three-part biohazard symbol identifies infectious materials. It differs from the skull and crossbones used for chemical toxicity."],
  ["Oxidizer",15,173,"The flame over a circle identifies an oxidizer. The circle distinguishes it from the plain flame used for flammable material."],
  ["Health hazard",350,173,"The person silhouette with a star-like mark in the chest is the chart's health-hazard symbol. The exclamation mark instead identifies the harmful/irritant category in this chart."],
  ["Harmful/irritant",692,173,"The exclamation mark identifies the chart's harmful/irritant category. It differs from the person silhouette used for the health-hazard category."],
  ["Compressed gas",15,345,"The gas-cylinder pictogram identifies compressed gas. A cylinder communicates a pressure hazard, whereas a flame communicates fire-related hazards."],
  ["Explosive",351,345,"The exploding-bomb pictogram identifies the chart's explosive category. The bursting fragments distinguish it from the flame and gas-cylinder symbols."],
  ["Toxic",692,345,"The skull and crossbones identifies the chart's toxic category. It differs from the biohazard symbol used for infectious material."],
];
for(const [i,[answer,x,y,meaning]] of pictograms.entries()) add(`symbol-${i+1}`,"review-symbols","What does this symbol represent in the review chart?",answer,pictograms.filter(row=>row[0]!==answer).slice(0,3).map(row=>row[0]),`${meaning} These are the labels used on the supplied review chart.`,[6],{diagram:{src:safetyEasyReviewDiagrams.reviewWhmis.src,alt:"Unlabelled WHMIS symbol from the review for identification.",crop:{imageWidth:1060,x,y,width:144,height:145}}});
for(const [letter,answer,x,y] of [["A","Compressed gas",204,11],["B","Flammable and combustible material",204,105],["C","Oxidizing material",204,197]]) add(`legacy-${letter}`,"review-symbols",`In the review's older WHMIS classification, what does Class ${letter} represent?`,answer,["Corrosive material","Biohazardous infectious material","Dangerously reactive material"],`The older review chart identifies Class ${letter} as ${answer.toLowerCase()}. This question is explicitly about the historical lettered system, not the current hazard-class naming system.`,[7],{diagram:{src:safetyEasyReviewDiagrams.reviewLegacy.src,alt:"Older WHMIS circular symbol used for this historical class question.",crop:{imageWidth:558,x,y,width:78,height:79}}});

const lines=[
  ["Fuel","Red with four-point star symbols",175,17],
  ["Water injection","Red/grey with repeated downward chevrons",422,17],
  ["Rocket fuel","Red/grey with star-and-crescent symbols",670,17],
  ["Lubrication","Yellow with rectangle symbols",913,17],
  ["Rocket catalyst","Yellow/green with vertical stripes",1165,17],
  ["Breathing oxygen","Green with horizontal rectangle symbols",1416,17],
  ["Electrical conduit","Orange with lightning symbols",176,338],
  ["Compressed gas","Orange with diagonal stripes",422,338],
  ["Instrument air","Orange/grey with zigzag symbols",669,338],
  ["Rocket oxidizer","Green/grey with crescent symbols",913,338],
  ["Deicing","Grey with triangle symbols",1164,338],
  ["Fire protection","Brown with diamond symbols",1416,338],
  ["Instrument air","Orange/blue with crossed-line symbols",169,651],
  ["Coolant","Blue with curved stripe symbols",422,651],
  ["Hydraulic","Blue/yellow with circle symbols",668,651],
  ["Air condition","Brown/grey with oval symbols",1064,651],
];
// Colours sampled from the supplied chart. Show them beside the original
// pattern without the printed service name or the slide's yellow highlights.
const lineColours = [
  ["#ff1e22"], ["#ff1e22", "#a8a8a8"], ["#ff1e22", "#a8a8a8"], ["#ffff0e"],
  ["#ffff0e", "#007b49"], ["#007b49"], ["#ff561f"], ["#ff561f"],
  ["#ff561f", "#a8a8a8"], ["#007b49", "#a8a8a8"], ["#838295"], ["#8b3f25"],
  ["#ff561f", "#056fc6"], ["#056fc6"], ["#056fc6", "#ffff0e"], ["#8b3f25", "#a8a8a8"],
];
for(const [i,[answer,pattern,x,y]] of lines.entries()) {
  const peers=[...new Set(lines.map(row=>row[0]))].filter(label=>label!==answer);
  add(`fluid-line-${i+1}`,"review-fluid-lines",`Identify this aircraft line from the review: ${pattern}.`,answer,peers.slice(0,3),`The supplied review chart labels ${pattern.toLowerCase()} as ${answer.toLowerCase()}. Use the colour plus geometric code, not colour alone. Both orange/grey zigzag and orange/blue crossed-line entries are labelled Instrument Air in this source.`,[72],{diagram:{src:safetyEasyReviewDiagrams.reviewLines.src,alt:`Unlabelled aircraft line marking: ${pattern.toLowerCase()}.`,lineBand:{colours:lineColours[i]},crop:{imageWidth:1505,x:x+3,y:y+16,width:40,height:220}}});
}

// Condensed review notes are separate from the bank-backed question references.
for(const topic of [...new Set(safetyEasyReviewQuestions.map(q=>q.topic))]) safetyEasyReviewNoteSections.push({id:`safety2-easy-${topic}`,title:`Easy review · ${topic.replaceAll("-"," ")}`,items:safetyEasyReviewQuestions.filter(q=>q.topic===topic).map(q=>[q.options[0],q.explanation])});
safetyEasyReviewNoteSections.push({id:"safety2-easy-source-checks",title:"Review source checks",items:[
  ["Oxygen conflict","The professor worksheet says both 'at least 19.5%' and 'between 18 and 23%'. Professor review slide 39 repeats 18–23%; the student review slide 39 instead says 19.5–23%. The contradictory figure is not graded. Oxygen alone never establishes safe entry or selects respiratory protection."],
  ["Older WHMIS/MSDS questions","Lettered WHMIS classes and the nine headings are tested only as the review's older material. Modern SDSs use sixteen sections. Do not treat older class names or a nine-section sheet as the current system."],
  ["Aircraft-specific attachment sequence","The worksheet and professor slide 64 give: brake person applies brakes; disconnect nosegear torque links; install the steering bypass pin; connect the bar to the aircraft by hand; slowly position the tug and connect by hand. This is the source's aircraft-specific example, not a universal tow procedure. Use the actual AMM/operator procedure; disconnecting torque links is not required for every aircraft."],
  ["Tag removal and entry/rescue","The originating person/supervisor summary is subject to the authorized removal procedure. The review's immediate-rescue wording does not authorize untrained entry rescue. Follow the trained, equipped rescue arrangements described elsewhere in the same review."],
],diagramKeys:["reviewWhmis","reviewLegacy","reviewLines"]});

const count=Math.ceil(safetyEasyReviewQuestions.length/39),size=Math.floor(safetyEasyReviewQuestions.length/count),extra=safetyEasyReviewQuestions.length%count;
let offset=0;
export const safetyEasyReviewParts=Array.from({length:count},(_,i)=>{
  const questions=safetyEasyReviewQuestions.slice(offset,offset+size+Number(i<extra));offset+=questions.length;
  const path=`${safetyModule2Path}/practice-${i+5}`;
  return {slug:`safety-module2-easy-${i+1}`,course:"Safety",courseSlug:"safety",basePath:safetyModule2Path,path,storageId:path,kind:"choice",questions,number:i+1,difficulty:"easy",title:`Review Practice · Part ${i+1}`};
});
