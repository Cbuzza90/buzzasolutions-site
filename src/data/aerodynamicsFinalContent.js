// Directly supplied presentations 26–29. Page numbers are PDF page numbers.
export const aeroFinalSources = {
  primaryStructure: { title: "26. C11.01 Aircraft Structure-Primary Flight Controls", pages: 49 },
  engineStructure: { title: "27. C11.01 Aircraft Structure-Engine Compartment", pages: 25 },
  stations: { title: "28. C11.01 Aircraft Structure-Fuselage Stations New", pages: 14 },
  stressDistribution: { title: "29. C11.02 Stress and Load distribution", pages: 56 },
};
export const aeroFinalChoice = [], aeroFinalRecall = [], aeroFinalNotes = [];
function group(deck, topic, title, rows, diagramKeys = []) {
  const items = [];
  for (const [id, label, definition, pages, recallPrompt, word, aliases = []] of rows) {
    const explanation = `${definition} (${aeroFinalSources[deck].title}, PDF pages ${pages.join(", ")}.)`;
    const peers = rows.filter(row => row[0] !== id).map(row => row[1]);
    aeroFinalChoice.push({ id:`aero-new-${id}`, learningTarget:id, topic, prompt:`Identify the term from its function or behaviour:\n${definition}`, options:[label,...peers.slice(0,3)], correctIndex:0, explanation, source:{deck,pages} });
    if (recallPrompt) aeroFinalRecall.push({ id:`aero-new-word-${id}`, learningTarget:id, topic, prompt:recallPrompt, answer:word, acceptedAnswers:[word,...aliases], explanation, source:{deck,pages} });
    items.push([label,explanation]);
  }
  aeroFinalNotes.push({ id:`aero-${topic}`, title, items, diagramKeys });
}
group("primaryStructure","control-construction","Control-surface construction & actuation",[
  ["control-main-member","Spar or torque tube","The main member around which the described aluminium control surface is built, with ribs fitted and skin attached.",[8],"The described control surface is built around a spar or torque _____.","tube"],
  ["control-ribs","Lightweight ribs","The stamped sheet members that provide the control surface's sectional shape.",[8],"Stamped sheet members giving a control surface its shape are _____.","ribs",["rib"]],
  ["lightening-holes","Lightening holes","Openings in the ribs that reduce the assembly's weight.",[8],"Openings that reduce rib weight are _____ holes.","lightening"],
  ["control-rivets","Rivets","The fasteners named for attaching the aluminium control-surface skin.",[8],"The aluminium skin in the described assembly is attached with _____.","rivets",["rivet"]],
  ["control-composites","Composite construction","An alternative control-surface construction used on aircraft ranging from gliders to heavy/high-performance aircraft, offering potential weight and strength benefits.",[9],"The lecture contrasts aluminium controls with controls made from _____ materials.","composite",["composites"]],
  ["elevator-cables","Cables and pulleys","One mechanical method used to transmit cockpit inputs to light-aircraft elevators, alongside push/pull rods.",[20],"A light-aircraft elevator may be moved through control _____ and pulleys.","cables",["cable"]],
  ["elevator-rods","Push/pull rods","Rigid mechanical linkages listed as an alternative to elevator control cables on light aircraft.",[20],"Rigid push/pull _____ can transmit elevator inputs mechanically.","rods",["rod"]],
  ["hydraulic-actuators","Hydraulic actuators","Devices that move large control surfaces using hydraulic power; fly-by-wire can signal them electrically.",[42],"In the described fly-by-wire arrangement, electrical signals command _____ actuators.","hydraulic"],
], ["controlConstruction"]);
group("primaryStructure","control-details","Control balance, split rudders & wing features",[
  ["surface-cg-balance","At or forward of the hinge","The course's mass-balance position for a control surface's centre of gravity to help prevent flutter; actual balance must meet that aircraft's specifications.",[11,12],"The course balance example puts the control-surface CG at or _____ of the hinge.","forward",["ahead"]],
  ["aerodynamic-horn","Control-surface horn","The aerodynamic extension illustrated as assisting control-surface movement; it is not automatically a replacement for specified mass balance.",[23],"The aerodynamic extension assisting control movement is a control-surface _____.","horn"],
  ["split-rudder-redundancy","Split rudder","The depicted arrangement of two independently controlled rudder sections, one above the other, reducing loads and providing redundancy.",[26],"The two independently operated rudder sections provide control-system _____.","redundancy"],
  ["split-rudder-high-speed","Lower rudder section","The section used at high speed in the particular split-rudder example; this is not a universal rule for every aircraft.",[26],"In this deck's split-rudder example, only the _____ section is used at high speed.","lower"],
  ["inboard-high-speed","Inboard ailerons","The ailerons used alone at high speed on the deck's aircraft with inboard and outboard sets.",[15],"On the described dual-aileron aircraft, high-speed roll uses the _____ ailerons.","inboard"],
  ["vortex-feature","Vortex generators","Small airfoil-like devices creating vortices that help maintain the boundary layer; also found on fuselage and empennage surfaces.",[46],"The small devices that energize boundary-layer flow are vortex _____.","generators",["generator"]],
  ["stall-fence","Stall fence","A chordwise upper-wing barrier that inhibits spanwise flow and helps retain chordwise airflow, particularly on swept wings.",[47],"The chordwise barrier that inhibits spanwise airflow is a stall _____.","fence"],
  ["ground-friction","Greater tire/runway friction","The braking benefit of dumping wing lift with ground spoilers after landing, as more load rests on the wheels.",[39],"Dumping lift after landing improves wheel braking by increasing tire/runway _____.","friction"],
], ["splitRudder","stallFence"]);
group("engineStructure","engine-compartment","Engine compartment, mounts & fuel storage",[
  ["engine-cowling","Cowling","The outer engine covering labelled separately from the engine and firewall in the source drawing.",[7,9,11],"The labelled outer engine covering is the _____.","cowling",["cowl"]],
  ["nose-cowl","Nose cowl","The forward engine-inlet surround identified in the source photograph.",[10],"The forward inlet surround illustrated is the nose _____.","cowl",["cowling"]],
  ["engine-mount-member","Engine mount","The supporting framework pictured for attaching the engine to aircraft structure.",[12,13,16],"The supporting framework attaching an engine is its engine _____.","mount"],
  ["engine-pylon","Pylon","The labelled supporting structure between the illustrated wing and its suspended jet engine.",[14,15,17],"The illustrated support between the wing and jet engine is a _____.","pylon"],
  ["engine-firewall","Firewall","The separation labelled behind the engine in the source drawing. The review explains its role in limiting the spread of an engine-compartment fire.",[7,8,24],"The fire-resistant separation behind the engine is the _____.","firewall"],
  ["tank-rigid-shell","Rigid removable tank","The listed fuel-tank category that is separately removable and has a rigid shell.",[18],"A removable fuel tank with a stiff shell is described as _____ removable.","rigid"],
  ["tank-flexible-cell","Bladder tank","The flexible fuel-cell type illustrated and listed alongside rigid removable and integral tanks.",[18,19,20],"The flexible fuel-cell type is called a _____ tank.","bladder"],
  ["tank-wet-structure","Integral tank","The listed fuel-tank type called a wet wing, using sealed aircraft structure rather than a separate removable tank.",[18,22],"A wet-wing fuel tank is an _____ tank.","integral"],
  ["fuel-locations","Wing, centre, auxiliary and tail tanks","The variety of fuel-storage locations labelled on the example large-aircraft diagram; not every aircraft has every illustrated tank.",[21],"The example fuel diagram includes wing, centre, auxiliary and _____ tanks.","tail"],
], ["engineCovering","enginePylon","fuelLocations"]);
group("stations","coordinate-detail","Datums, stations & each coordinate abbreviation",[
  ["reference-datum","Datum","The reference that establishes zero for a coordinate measurement; the aircraft's documentation defines its exact placement.",[6,8,9,10,11],"The reference establishing coordinate zero is a _____.","datum"],
  ["fs-dimension","Fuselage station — length","The coordinate measuring along aircraft length from a vertical datum, illustrated at or near the nose in this lecture.",[8],"Fuselage stations locate positions along aircraft _____.","length"],
  ["bl-dimension","Buttock line — width","The coordinate measuring lateral distance to the left or right of a vertical centreline datum.",[9],"Buttock lines locate positions across aircraft _____.","width"],
  ["wl-dimension","Water line — height","The coordinate measuring vertical distance from a horizontal datum, illustrated below the fuselage.",[10],"Water lines locate positions along aircraft _____.","height"],
  ["ws-dimension","Wing station — wing position","The coordinate locating positions along a wing; this deck illustrates a wing-specific datum near the leading-edge/fuselage intersection. Use the applicable aircraft drawing for its convention.",[11],"The coordinate locating positions along a wing is a _____ station.","wing"],
  ["lbl-side","Left buttock line","The coordinate designation LBL, indicating the left side of the aircraft's centreline datum.",[9],"The first L in LBL means _____.","left"],
  ["rbl-side","Right buttock line","The coordinate designation RBL, indicating the right side of the aircraft's centreline datum.",[9],"The R in RBL means _____.","right"],
  ["wl-positive","Above the horizontal datum","The positive water-line direction shown in this lecture's side-view drawing.",[10],"In the water-line drawing, positive measurements lie _____ the datum.","above"],
], ["stationReferences"]);
group("stressDistribution","force-types","Forces, units, equilibrium & moments",[
  ["force-vector","Force vector","A push or pull described by both magnitude and direction.",[6],"Force has magnitude and direction, making it a _____ quantity.","vector"],
  ["contact-force","Contact force","A force between objects physically touching each other.",[7],"A force requiring objects to touch is a _____ force.","contact"],
  ["noncontact-force","Non-contact force","A force acting without physical contact, such as gravitational, magnetic or electrostatic attraction/repulsion.",[7,9],"Gravity acts without touching, so it is a _____ force.","non-contact",["noncontact"]],
  ["applied-force","Applied force","An external force imposed on an object.",[8],"An externally imposed force is an _____ force.","applied"],
  ["normal-force","Normal force","The contact-force component perpendicular to the contact surface.",[8],"The contact force perpendicular to a surface is the _____ force.","normal"],
  ["frictional-force","Frictional force","The contact resistance opposing relative sliding or its tendency at a surface.",[8,17,18],"The resisting force along contacting surfaces is _____ force.","frictional",["friction"]],
  ["air-resistance","Air resistance","The resistive force exerted by air on a moving object.",[8],"The lecture names the resistive force from air as air _____.","resistance"],
  ["spring-force","Spring force","The force generated by a compressed or stretched spring.",[8],"Compressing or stretching a spring produces a _____ force.","spring"],
  ["gravity-force","Gravitational force","The attractive force between bodies with mass.",[9,14],"The attractive force between bodies with mass is _____ force.","gravitational",["gravity"]],
  ["magnetic-force","Magnetic force","The non-contact attraction or repulsion associated with magnetic poles.",[9],"Attraction or repulsion associated with magnetic poles is _____ force.","magnetic"],
  ["electrostatic-force","Electrostatic force","The non-contact attraction or repulsion associated with electric charges.",[9],"Attraction or repulsion between electric charges is _____ force.","electrostatic"],
  ["net-resultant","Resultant","The single equivalent force representing the vector sum of forces acting on an object.",[11],"The vector sum can be represented by one _____ force.","resultant",["net"]],
  ["force-equilibrium","Equilibrium","The translational condition of zero net force: an object is at rest or moves at constant velocity. Rotational equilibrium also requires zero net moment.",[11,13],"Zero net force and constant velocity describe translational _____.","equilibrium"],
  ["force-newton","Newton","The SI unit of force, corresponding to one kilogram accelerated at one metre per second squared.",[12],"The SI unit of force is the _____.","newton",["newtons"]],
  ["force-pound","Pound-force","The imperial force unit given alongside the newton, distinct from a mass unit.",[12],"The imperial force unit in the lecture is the _____.","pound-force",["poundforce","lbf"]],
  ["force-moment","Moment","The turning tendency of a force about a point or axis, depending on force and perpendicular distance to its line of action.",[13],"A force's turning tendency about a point is its _____.","moment",["torque"]],
  ["inertial-mass","Mass","The measure of resistance to a change in velocity (inertia), distinguished from gravitational force.",[14],"The quantity measuring inertia is _____.","mass"],
  ["gravitational-weight","Weight","The force exerted on an object by gravity; it changes with gravitational-field strength even when mass is unchanged.",[14,16],"The gravitational force acting on an object's mass is its _____.","weight"],
]);
group("stressDistribution","friction-strain","Friction, stress, strain & material response",[
  ["static-friction","Static friction","Friction acting without relative sliding between contact surfaces; its maximum must be overcome to start sliding.",[17,18],"Friction before relative sliding begins is _____ friction.","static"],
  ["kinetic-friction","Kinetic friction","Friction opposing relative sliding once surfaces are moving against each other.",[17,18],"Friction during relative sliding is _____ friction.","kinetic",["sliding"]],
  ["stress-intensity","Stress","Force distributed per unit area of a section.",[19,27],"Force per unit section area is _____.","stress"],
  ["strain-ratio","Normal strain","Axial deformation divided by original length; it is not an unconditional constant for a material.",[20],"Axial deformation per unit original length is normal _____.","strain"],
  ["tensile-sign","Positive normal stress","The lecture's sign convention for a member in tension.",[19],"In the lecture, tensile stress has a _____ sign.","positive"],
  ["compressive-sign","Negative normal stress","The lecture's sign convention for a member in compression.",[19],"In the lecture, compressive stress has a _____ sign.","negative"],
  ["elastic-response","Elastic deformation","A change in shape recovered when the load is removed, within the elastic range.",[22],"Deformation that recovers on unloading is _____ deformation.","elastic"],
  ["plastic-response","Plastic deformation","Permanent deformation remaining after unloading beyond the elastic range.",[22],"Permanent deformation after unloading is _____ deformation.","plastic"],
  ["yield-point","Yield point","The transition from elastic behaviour to permanent plastic deformation in the lecture's stress-strain model.",[23],"The transition into permanent deformation occurs at the _____ point.","yield"],
  ["ultimate-strength","Ultimate tensile strength","The maximum tensile stress reached on the illustrated stress-strain curve.",[21,23],"The maximum tensile stress on the curve is _____ tensile strength.","ultimate"],
  ["breaking-strength","Breaking strength","The stress associated with fracture in the lecture's stress-strain diagram, distinguished from the maximum earlier stress on a ductile curve.",[21,23,25],"The stress at fracture is called _____ strength in the diagram.","breaking",["rupture","fracture"]],
  ["thermal-restraint","Restrained thermal expansion","The condition under which temperature-induced expansion can generate stress because supports prevent the free dimensional change.",[26],"Thermal expansion creates stress when the expansion is _____.","restrained",["constrained"]],
  ["shear-angle","Shearing strain","Angular distortion, illustrated by a square element changing into a rhomboid under shear.",[29,32],"Angular distortion of an element under shear is shearing _____.","strain"],
  ["shaft-shear","Torsional shear stress","The stress produced by torque in the circular-shaft example; in its elastic model it increases with radius and is greatest at the outer surface.",[31,33],"Torque in the circular shaft produces _____ stress.","shear",["shearing"]],
  ["torsion-radius","Outer surface","The location of maximum torsional shear in the lecture's elastic circular-shaft model.",[33],"In the circular-shaft example, maximum torsional shear occurs at the _____ surface.","outer",["outside","external"]],
  ["pure-bending","Pure bending","The loading condition involving bending moment without accompanying axial force or shear force.",[35],"Bending moment without axial or shear force is _____ bending.","pure"],
  ["neutral-surface","Neutral surface","The surface experiencing no longitudinal extension or shortening in the illustrated bending model.",[36],"The bending surface with no longitudinal extension or shortening is the _____ surface.","neutral"],
  ["stress-concentration","Stress concentration","High localized stress near a hole or sudden change of cross-section.",[38],"A hole or abrupt section change may cause a stress _____.","concentration"],
  ["safety-ratio","Factor of safety","The conceptual ratio of failure strength to applied working stress; too small increases failure risk, while excessively large can add weight or cost.",[39],"Failure strength divided by applied stress is the factor of _____.","safety"],
]);
group("stressDistribution","material-properties","Each material property & temperature relationship",[
  ["malleable-property","Malleability","The ability to deform under compression, for example being rolled or hammered into thin sheet.",[40],"The ability to form sheet under compression is _____.","malleability"],
  ["ductile-property","Ductility","The degree of plastic deformation sustained before failure under tensile loading.",[40],"Plastic deformation before tensile failure describes _____.","ductility"],
  ["hardness-property","Hardness","Resistance to localized plastic deformation.",[40],"Resistance to plastic deformation is _____.","hardness"],
  ["thermal-stability","Thermal stability","The ability to resist changes of shape or size as temperature changes.",[40],"Resistance to dimensional change with temperature is thermal _____.","stability"],
  ["toughness-property","Toughness","The ability to absorb energy before fracture.",[40],"The ability to absorb energy before fracture is _____.","toughness"],
  ["hot-strength","Decreasing strength","The general trend for ultimate tensile and yield strength as temperature increases in this lecture's comparison, not a universal material rule.",[24],"In the lecture's general trend, yield strength _____ as temperature increases.","decreases",["falls","reduces"]],
  ["hot-ductility","Increasing ductility","The general trend for ductility as temperature increases in this lecture's comparison, not a universal material rule.",[24],"In the lecture's general trend, ductility _____ as temperature increases.","increases",["rises"]],
]);
group("stressDistribution","load-distribution","Aircraft loads & flight-force balance",[
  ["flight-lift","Lift","The aerodynamic force balancing weight in straight-and-level unaccelerated flight; it is not always equal to weight in other manoeuvres.",[41,42],"In straight-and-level unaccelerated flight, _____ balances weight.","lift"],
  ["flight-drag","Drag","The aerodynamic force opposing motion through the air.",[41],"The aerodynamic force opposing flight through the air is _____.","drag"],
  ["flight-thrust","Thrust","The propulsive force balancing drag in the lecture's straight-and-level unaccelerated flight example.",[41,42],"In straight-and-level unaccelerated flight, _____ balances drag.","thrust"],
  ["flight-momentum","Momentum","The quantity of motion dependent on both mass and velocity.",[42],"The quantity of motion dependent on mass and velocity is _____.","momentum"],
  ["reaction-force","Reaction","The equal and opposite force exerted on the other interacting body, not a cancelling force on the same body.",[42],"The equal and opposite force on the other interacting body is the _____ force.","reaction"],
  ["fuselage-pressure-load","Pressurization load","The fuselage loading associated with a pressurized cabin.",[46],"Cabin _____ subjects the fuselage to pressure loads.","pressurization",["pressurisation"]],
  ["fuselage-tail-load","Empennage load","The fuselage load associated with tail trim, manoeuvring, turbulence and gusts.",[46],"Tail trim, manoeuvring and gusts impose _____ loads on the fuselage.","empennage",["tail"]],
  ["ground-gear-load","Landing-gear load","The load transmitted into surrounding structure by landing impact, taxiing and ground manoeuvring.",[47],"Landing impact and taxiing impose landing-_____ loads.","gear"],
  ["limit-working-load","Limit load","The lecture's working-load threshold used when discussing avoidance of permanent structural deformation; not a promise of unlimited fatigue life.",[52,55],"The working-load threshold associated with avoiding permanent deformation is the _____ load.","limit"],
  ["proof-load","Proof load","The lecture's term for a load demonstrating structural capacity beyond expected working loads; it is distinct from failure at ultimate load.",[55],"The lecture names the demonstration beyond expected working load as a _____ load.","proof"],
  ["ultimate-load","Ultimate load","The lecture's failure-related structural load, distinguished from the working/limit load and from ultimate tensile stress of a material.",[55],"The failure-related structural load in the lecture is the _____ load.","ultimate"],
]);
// Explicit source cautions are searchable and never graded as incorrect absolutes.
aeroFinalNotes.push({ id:"aero-new-source-cautions", title:"Presentations 26–29: source wording to watch", items:[
  ["Flap location — conflicting slide text", "Presentation 26 page 29 describes trailing-edge flaps but also says they extend from the leading edge. Read trailing-edge flaps and the separate leading-edge devices on page 34 as different devices; the conflicting sentence is not an answer key."],
  ["Normal stress — orientation typo", "Presentation 29 page 19 says normal stress is perpendicular to the rod axis. For an axially loaded rod, normal stress acts perpendicular to its cross-sectional plane, along the rod axis. The test uses the correct section-based definition, not that sentence."],
  ["Strain — conditional, not constant", "Presentation 29 page 20's unqualified claim that strain stays constant is misleading. Normal strain is deformation divided by original length and depends on loading/material response; it is not an unconditional material constant."],
  ["Scope of examples", "Split-rudder section use, coupled flap deployment, station datums, material-temperature trends and aircraft load limits are lecture/aircraft examples. Use the applicable aircraft documentation for the actual arrangement. Normal-stress signs are the lecture convention. Shear distributions and circular-shaft torsion models are not interchangeable."],
  ["Bank angle and regulatory numbers", "Presentation 29 page 50 repeats the misleading 35-degree onset claim; level-turn load factor rises with bank before that angle. Page 39's regulatory factor is not used as a universal legal rule. Questions ask conceptual safety factors, without numerical calculations."],
] });
