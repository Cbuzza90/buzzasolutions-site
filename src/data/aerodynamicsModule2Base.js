// Answers and page references use the PDFs supplied in Module 2 Test Info.
// Page numbers refer to PDF pages (some printed slide numbers differ).
export const aerodynamicsModule2Path = "/study/aerodynamics/module-2";
import { aeroStructureSources, aeroStructureChoice, aeroStructureRecall, aeroStructureNotes } from "./aerodynamicsStructureContent.js";
export const aeroSources = {
  ...aeroStructureSources,
  review: { title: "AMEM-10002 Fall 2025 Review [Module 2] — supplied text", pages: 10 },
  axes: { title: "14. B4.03 Axes of Flight", pages: 71 },
  stability: { title: "15. B4.03 Aircraft Stability", pages: 39 },
  stall: { title: "16. B4.03 Wing stall", pages: 25 },
  loads: { title: "17. B4.03 Fuselage and Wing Loading", pages: 21 },
  speed: { title: "18. B4.04 High Speed Aerodynamics", pages: 26 },
  flight: { title: "19. B4.04 High Speed Flight", pages: 25 },
  design: { title: "20. B4.04 High Speed Aircraft Design", pages: 26 },
  control: { title: "21. B4.04 High Speed Flight Control", pages: 19 },
  fuselage: { title: "22. C11.01 Aircraft Structure-Fuselage", pages: 40 },
  wings: { title: "23. C11.01 Aircraft Structure-Wings", pages: 45 },
};
const choiceQuestions = [], recallQuestions = [], noteSections = [];
function group(deck, id, title, rows, diagramKeys = []) {
  const items = [];
  for (const [index, [target, label, description, pages, recallPrompt, recallAnswer, aliases = []]] of rows.entries()) {
    const explanation = `${label}: ${description} (${aeroSources[deck].title}, PDF pages ${pages.join(", ")}.)`;
    const peers = [...rows.slice(index + 1), ...rows.slice(0, index)].map(row => row[1]);
    const source = { deck, pages };
    choiceQuestions.push({ id: `aero-${target}`, learningTarget: target, topic: id,
      prompt: `Which term matches this description?\n${description}`, options: [label, ...peers.slice(0, 3)], correctIndex: 0, explanation, source });
    items.push([label, `${description} (${aeroSources[deck].title}, PDF pages ${pages.join(", ")}.)`]);
    if (recallPrompt || /^\p{L}+(?:-\p{L}+)*$/u.test(label)) {
      const answer = recallAnswer ?? label;
      recallQuestions.push({ id: `aero-word-${target}`, learningTarget: target, topic: id,
        prompt: recallPrompt ?? `Name the term (one word): ${description}`, answer,
        acceptedAnswers: [answer, ...aliases], explanation, source });
    }
  }
  noteSections.push({ id: `aero-${id}`, title, items, ...(diagramKeys.length ? { diagramKeys } : {}) });
}

group("axes", "axes", "Axes, movements & primary controls", [
  ["longitudinal", "Longitudinal", "The nose-to-tail axis through the centre of gravity; roll occurs about this axis.", [8,12], "Roll occurs about the _____ axis.", "longitudinal"],
  ["lateral", "Lateral", "The wingtip-to-wingtip axis through the centre of gravity; pitch occurs about this axis.", [16], "Pitch occurs about the _____ axis.", "lateral"],
  ["vertical", "Vertical", "The top-to-bottom axis through the centre of gravity; yaw occurs about this axis.", [20], "Yaw occurs about the _____ axis.", "vertical"],
  ["roll", "Roll", "Rotation about the aircraft's longitudinal axis.", [12]],
  ["pitch", "Pitch", "Rotation about the aircraft's lateral axis.", [16]],
  ["yaw", "Yaw", "Rotation about the aircraft's vertical axis.", [20]],
  ["ailerons", "Ailerons", "Wing controls near the tips that normally deflect oppositely to control roll.", [12,14], undefined, undefined, ["aileron"]],
  ["elevator", "Elevator", "The hinged primary control on the horizontal stabilizer that controls pitch.", [16,17], undefined, undefined, ["elevators"]],
  ["rudder", "Rudder", "The primary control on the vertical stabilizer, operated by pedals to control yaw.", [20,21]],
], ["rollAxis", "stability"]);
group("axes", "compound", "Compound controls — every combined function", [
  ["elevons", "Elevons", "Combined elevator and aileron functions, providing pitch and roll control.", [27,28], undefined, undefined, ["elevon"]],
  ["ruddervators", "Ruddervators", "Combined rudder and elevator functions, providing yaw and pitch control on a V-tail.", [27,29], undefined, undefined, ["ruddervator"]],
  ["flaperons", "Flaperons", "Combined flap and aileron functions, providing lift modification and roll control.", [27,30], undefined, undefined, ["flaperon"]],
  ["spoilerons", "Spoilerons", "Combined spoiler and aileron functions; asymmetric spoiler use provides roll control.", [27,31], undefined, undefined, ["spoileron"]],
  ["stabilator", "Stabilator", "An all-moving horizontal stabilizer used as the pitch-control surface.", [27,32], undefined, undefined, ["stabilators"]],
], ["compoundControls"]);
group("axes", "tabs", "Trim, balance & servo tabs", [
  ["fixed-tab", "Fixed trim tab", "A trim tab adjusted only on the ground.", [35,36], "A trim tab adjusted only on the ground is called a _____ trim tab.", "fixed", ["ground-adjustable"]],
  ["adjustable-tab", "Adjustable trim tab", "A cockpit-controlled tab that holds a primary control deflected and relieves sustained pilot force.", [37,38], "A cockpit-controlled trim tab is an _____ trim tab.", "adjustable"],
  ["balance-tab", "Balance tab", "A linked tab moving opposite the primary control to assist its motion and reduce control forces.", [40], "A _____ tab is linked to move opposite the primary control and assist its movement.", "balance"],
  ["servo-tab", "Servo tab", "A pilot-controlled tab whose aerodynamic force drives the larger primary surface in the opposite direction.", [41], "A pilot-controlled tab that aerodynamically drives the main surface is a _____ tab.", "servo"],
  ["anti-servo-tab", "Anti-servo tab", "A stabilator tab moving in the same direction as the stabilator to increase control force and reduce oversensitivity.", [42,43], "A tab moving with a stabilator to increase control force is an _____ tab.", "anti-servo", ["antiservo"]],
]);
group("axes", "lift-devices", "Flaps, leading-edge devices & spoilers", [
  ["plain-flap", "Plain flap", "A hinged trailing-edge section that pivots downward.", [48], "The simple trailing-edge flap that pivots down is a _____ flap.", "plain"],
  ["split-flap", "Split flap", "A lower trailing-edge portion that hinges down and produces substantial drag.", [49], "A flap in which a lower trailing-edge portion hinges down is a _____ flap.", "split"],
  ["slotted-flap", "Slotted flap", "A flap with a passage directing high-energy lower-surface air over the flap to help delay separation.", [50,51], "A flap with an airflow passage that delays separation is a _____ flap.", "slotted"],
  ["fowler-flap", "Fowler flap", "A trailing-edge flap that initially moves aft, increasing wing area as well as camber.", [52,53], "Which flap type initially moves aft to increase wing area?", "Fowler"],
  ["slot", "Slot", "A fixed leading-edge gap directing high-energy air onto the upper surface to delay separation.", [55,56], undefined, undefined, ["slots"]],
  ["slat", "Slat", "A movable leading-edge section that extends to form a gap and delay separation at high angles of attack.", [57,58,59], undefined, undefined, ["slats"]],
  ["leading-flap", "Leading-edge flap", "A leading-edge device deflected down to increase wing camber.", [60]],
  ["spoilers", "Spoilers", "Surfaces raised into the airflow to reduce wing lift and increase drag.", [61,62], undefined, undefined, ["spoiler"]],
  ["airbrakes", "Airbrakes", "Devices intended to increase drag while making little change to lift.", [66], undefined, undefined, ["airbrake", "air-brakes"]],
]);
group("stability", "stability", "Static & dynamic stability", [
  ["static", "Static stability", "The initial tendency after equilibrium is disturbed.", [6,7], "The initial tendency after a disturbance is _____ stability.", "static"],
  ["dynamic", "Dynamic stability", "How the response and any oscillations develop over time after a disturbance.", [8,9,10,11], "The response over time after a disturbance is _____ stability.", "dynamic"],
  ["positive-static", "Positive static stability", "An initial tendency to return toward the original equilibrium attitude.", [6], "An initial tendency to return toward equilibrium is _____ static stability.", "positive"],
  ["negative-static", "Negative static stability", "An initial tendency to move farther from the original equilibrium attitude.", [7], "An initial tendency to move farther from equilibrium is _____ static stability.", "negative"],
  ["neutral-static", "Neutral static stability", "An initial tendency to remain in the displaced attitude.", [7], "Remaining in a displaced attitude is _____ static stability.", "neutral"],
  ["positive-dynamic", "Positive dynamic stability", "Returning toward equilibrium directly or with diminishing oscillations.", [9], "Oscillations that diminish indicate _____ dynamic stability.", "positive"],
  ["neutral-dynamic", "Neutral dynamic stability", "Oscillations that maintain the same amplitude over time.", [10], "Constant-amplitude oscillations indicate _____ dynamic stability.", "neutral"],
  ["negative-dynamic", "Negative dynamic stability", "Oscillations whose amplitude grows over time.", [11], "Growing oscillations indicate _____ dynamic stability.", "negative"],
], ["stability"]);
group("stability", "stability-design", "Stability about each axis & design features", [
  ["longitudinal-stability", "Longitudinal stability", "Pitch stability about the lateral axis, influenced by CG location and the horizontal tail.", [14,15,18], "Pitch stability is called _____ stability.", "longitudinal"],
  ["lateral-stability", "Lateral stability", "Roll stability about the longitudinal axis; returning toward wings level after a roll disturbance.", [20], "Roll stability is called _____ stability.", "lateral"],
  ["directional-stability", "Directional stability", "Yaw stability about the vertical axis, aided by the vertical stabilizer and fins.", [31,32,33], "Yaw stability is called _____ stability.", "directional"],
  ["dihedral", "Dihedral", "An upward wing angle that contributes to lateral stability in a sideslip.", [22,23]],
  ["anhedral", "Anhedral", "A downward wing angle used to reduce excessive lateral stability and improve responsiveness.", [28,29]],
  ["sweepback", "Sweepback", "Rearward wing sweep that can contribute to lateral and directional stability.", [26,35], undefined, undefined, ["sweep"]],
  ["dutch-roll", "Dutch roll", "A coupled out-of-phase rolling and yawing oscillation.", [37,38], "The coupled roll/yaw oscillation is called _____ roll.", "Dutch"],
  ["weather-vane", "Weathervane effect", "The vertical stabilizer's tendency to align the aircraft with the relative wind.", [33], "The vertical stabilizer's directional restoring action is called the _____ effect.", "weathervane", ["weather-vane"]],
]);
group("stall", "stall", "Stall, warning devices & wing design", [
  ["stall", "Stall", "Separation of airflow associated with exceeding the critical angle of attack, causing a rapid reduction in lift.", [5,6]],
  ["buffeting", "Buffeting", "Shaking that can occur when separated turbulent airflow from the wing strikes the tail near a stall.", [10]],
  ["stick-shaker", "Stick shaker", "A warning device that rapidly vibrates the control column as a stall approaches.", [12], "Which stick device vibrates the control column to warn of a stall?", "shaker"],
  ["stick-pusher", "Stick pusher", "A device that physically moves the control column forward to reduce angle of attack.", [13], "Which stick device moves the control column forward to reduce angle of attack?", "pusher"],
  ["washout", "Washout", "Wing twist giving the root a higher incidence than the tip, encouraging the root to stall first.", [15], undefined, undefined, ["wash-out"]],
  ["canard", "Canard", "A small lifting surface ahead of the main wing; in the course's stall-resistant design it stalls before the main wing.", [16,17,18]],
  ["forward-sweep", "Forward-swept wing", "A wing angled forward from the root, with inward spanwise flow that can delay tip stall.", [19,20]],
  ["t-tail", "T-tail", "A horizontal tail on top of the vertical stabilizer; it can be vulnerable to disturbed airflow and deep stall.", [21,22,23], undefined, undefined, ["ttail"]],
], ["washout"]);
group("loads", "loads", "Five stresses, load factor & wing loading", [
  ["tension", "Tension", "Stress tending to pull material apart.", [6,7]],
  ["compression", "Compression", "Stress tending to push material together.", [6,7]],
  ["bending", "Bending", "Stress combining tension on one side of a member and compression on the other.", [6,8]],
  ["shear", "Shear", "Stress tending to slide adjacent parts of material past one another.", [6,9]],
  ["torsion", "Torsion", "Stress tending to twist material.", [6,10]],
  ["load-factor", "Load factor", "The ratio of lift to weight, commonly expressed in G; it rises in a constant-altitude coordinated turn.", [16,17]],
  ["wing-loading", "Wing loading", "Loaded aircraft weight divided by wing area.", [20]],
  ["limit-load", "Limit load factor", "The course's maximum design load factor without resulting permanent structural deformation.", [19]],
]);
group("speed", "speed", "Mach number, regimes & sound", [
  ["mach", "Mach number", "Aircraft speed divided by the local speed of sound; the ratio is dimensionless.", [6,8], "Aircraft speed divided by local sound speed gives the _____ number.", "Mach"],
  ["subsonic", "Subsonic", "A flow regime below the local speed of sound (Mach less than one).", [9,10]],
  ["transonic", "Transonic", "The near-sonic flight regime in which local subsonic and supersonic flow can coexist.", [9,11]],
  ["supersonic", "Supersonic", "A flow regime faster than the local speed of sound.", [9,12]],
  ["hypersonic", "Hypersonic", "The very-high-speed regime around Mach five and above, with severe heating and important gas-chemistry effects.", [13,14]],
  ["compressibility", "Compressibility", "The importance of local air-density changes as air is compressed at high speed.", [6,7]],
  ["temperature", "Temperature", "The main atmospheric property controlling the speed of sound in air of the same composition.", [18]],
  ["knot", "Knot", "A speed of one nautical mile per hour.", [19], undefined, undefined, ["knots"]],
  ["sonic-boom", "Sonic boom", "The thunder-like sound heard as an aircraft's pressure shock system passes an observer.", [24], "The thunder-like sound associated with a passing supersonic shock system is a sonic _____.", "boom"],
  ["vapor-cone", "Vapor cone", "A visible condensation cloud caused by local pressure and temperature changes; it does not prove Mach one has been exceeded.", [25], "The visible condensation cloud sometimes seen near transonic aircraft is a _____ cone.", "vapor", ["vapour"]],
]);
group("flight", "mach-effects", "Critical Mach, Mach tuck & trim", [
  ["critical-mach", "Critical Mach number", "The lowest free-stream Mach number at which local airflow first reaches the speed of sound.", [9], "The first local sonic flow occurs at the _____ Mach number.", "critical"],
  ["mach-tuck", "Mach tuck", "A high-speed nose-down pitching tendency associated with compressibility effects and an aft shift of aerodynamic loading.", [7,13,15], "The high-speed nose-down pitching tendency is Mach _____.", "tuck"],
  ["mach-trim", "Mach trim", "Automatic stabilizer/elevator trimming toward nose-up to counter Mach tuck.", [19], "The automatic nose-up correction for Mach tuck is Mach _____.", "trim"],
  ["mach-feel", "Mach feel", "Artificial control feel and reduced high-speed control movement to help prevent overcontrol.", [20], "The system providing artificial pitch-control force at high speed is Mach _____.", "feel"],
]);
group("design", "waves", "Shock waves & expansion waves", [
  ["normal-shock", "Normal shock", "A compression shock oriented perpendicular to the incoming flow; it can stand ahead of a blunt body.", [8], "A shock perpendicular to the incoming flow is a _____ shock.", "normal"],
  ["oblique-shock", "Oblique shock", "A compression shock inclined to the incoming supersonic flow, such as at a suitable sharp leading edge.", [10], "An inclined shock at a suitable sharp leading edge is an _____ shock.", "oblique"],
  ["expansion", "Expansion wave", "A supersonic flow-turning process around a convex corner; it is not a compression shock.", [11], "A supersonic flow turning around a convex corner forms an _____ wave.", "expansion"],
  ["shock-separation", "Shock-induced separation", "Boundary-layer separation caused by the adverse pressure rise through a shock, reducing lift and control effectiveness.", [12]],
]);
group("design", "high-speed-design", "High-speed wing & airfoil design", [
  ["thin-airfoil", "Thin airfoil", "An airfoil section with reduced thickness, limiting airflow acceleration and tending to increase critical Mach.", [17], "A _____ airfoil generally has a higher critical Mach number than an otherwise similar thick one.", "thin", ["thinner"]],
  ["low-camber", "Low-camber airfoil", "An airfoil with reduced curvature that limits local airflow acceleration and tends to increase critical Mach.", [18], "Reducing airfoil _____ tends to increase critical Mach number.", "camber"],
  ["wing-sweep", "Swept wing", "A wing that reduces the airflow component normal to the leading edge, helping delay compressibility effects.", [19], "Which wing arrangement delays compressibility effects by reducing the normal flow component? Answer: _____ wing.", "swept"],
  ["delta", "Delta wing", "A triangular planform that can generate strong upper-surface vortices at high angle of attack but has demanding low-speed characteristics.", [22,23,24], "A triangular planform is a _____ wing.", "delta"],
  ["fineness", "High fineness ratio", "A long, slender aircraft shape associated with supersonic design.", [21], "A long, slender fuselage has a high _____ ratio.", "fineness"],
  ["biconvex", "Biconvex airfoil", "A thin supersonic airfoil with curved upper and lower surfaces and sharp leading and trailing edges.", [14], "Which curved, thin supersonic airfoil has sharp leading and trailing edges?", "biconvex"],
  ["double-wedge", "Double-wedge airfoil", "A thin supersonic airfoil made of straight wedge surfaces with sharp leading and trailing edges.", [14], "A supersonic airfoil with straight wedge faces is a _____ airfoil.", "double-wedge", ["doublewedge"]],
]);
group("control", "high-speed-control", "High-speed control, Dutch roll & reversal", [
  ["coffin-corner", "Coffin corner", "A high-altitude condition in which the low-speed and high-speed buffet margins converge.", [6], "The narrowing high-altitude margin between low- and high-speed limits is called _____ corner.", "coffin", ["coffin's"]],
  ["yaw-damper", "Yaw damper", "An automatic rudder-feedback system that damps Dutch-roll yawing motion.", [14], "The automatic system that damps Dutch roll is a yaw _____.", "damper"],
  ["aileron-reversal", "Aileron control reversal", "Wing twisting under aileron aerodynamic loads causes a roll response opposite the commanded direction.", [17], "Wing twisting that reverses the commanded aileron response is control _____.", "reversal"],
  ["outboard-lockout", "Outboard aileron lockout", "A high-speed feature disabling the outer ailerons to reduce overcontrol and wing twisting.", [15,16], "High-speed aileron _____ prevents the outboard surfaces from responding to roll input.", "lockout"],
  ["roll-spoiler", "Roll spoiler", "A spoiler raised on the down-going wing to reduce lift and assist roll control.", [18]],
]);
group("fuselage", "components", "Five main aircraft components", [
  ["fuselage", "Fuselage", "The main body carrying crew, passengers and cargo, with attachment points for other major assemblies.", [11,20]],
  ["wings", "Wings", "The main lifting assemblies, also supporting roll controls and often fuel tanks.", [11], undefined, undefined, ["wing"]],
  ["empennage", "Empennage", "The tail assembly providing stabilizing surfaces and pitch/yaw control.", [11]],
  ["powerplant", "Powerplant", "The engine/propulsion assembly supplying thrust.", [11], undefined, undefined, ["power-plant"]],
  ["landing-gear", "Landing gear", "The assembly supporting the aircraft on the ground, including wheels, floats or skis.", [11]],
]);
group("fuselage", "fuselage", "Fuselage construction & load-carrying members", [
  ["truss", "Truss", "A rigid framework of beams, struts or bars carrying tension and compression, often covered by fabric or panels.", [22]],
  ["monocoque", "Monocoque", "A single-shell construction relying primarily on the skin to carry stresses, with formers/bulkheads providing shape and concentrated-load support.", [25,27]],
  ["semimonocoque", "Semimonocoque", "Stressed skin reinforced by longitudinal and transverse members so the skin and framework share loads.", [28,39], undefined, undefined, ["semi-monocoque"]],
  ["longerons", "Longerons", "Relatively heavy longitudinal fuselage members extending across several frames and helping carry bending loads.", [28], undefined, undefined, ["longeron"]],
  ["fuselage-stringers", "Stringers", "More numerous, lighter longitudinal fuselage members supporting the stressed skin.", [28], undefined, undefined, ["stringer"]],
  ["formers", "Formers", "Transverse fuselage members helping establish the fuselage's cross-sectional shape.", [27,39], undefined, undefined, ["former"]],
  ["bulkheads", "Bulkheads", "Heavier transverse fuselage structures used for shape and concentrated-load support at important attachments.", [27,39], undefined, undefined, ["bulkhead"]],
], ["semimonocoque"]);
group("wings", "wings", "Wing structure, support & load paths", [
  ["spar", "Spar", "A main spanwise wing member that ultimately carries the wing loads.", [16,35], undefined, undefined, ["spars"]],
  ["rib", "Rib", "A crosspiece establishing airfoil shape and transmitting skin/stringer loads to the spars.", [16,41], undefined, undefined, ["ribs"]],
  ["wing-stringer", "Wing stringer", "A spanwise stiffener running between ribs and helping transfer wing loads into the framework.", [44]],
  ["cantilever", "Full cantilever wing", "A wing supported internally by structural members and skin without external bracing.", [32], "A wing with no external bracing is a full _____ wing.", "cantilever"],
  ["semi-cantilever", "Semi-cantilever wing", "A wing supported by internal structure plus one or two external struts or wires to the fuselage.", [32], "A wing with internal support plus external struts is a _____ wing.", "semi-cantilever", ["semicantilever"]],
  ["externally-braced", "Externally braced wing", "A wing arrangement using external struts and flying/landing wires, illustrated by a biplane.", [32]],
], ["wingRibs"]);

function applied(deck, topic, target, prompt, answer, distractors, explanation, pages) {
  choiceQuestions.push({ id: `aero-${target}`, learningTarget: target, topic, prompt,
    options: [answer, ...distractors], correctIndex: 0,
    explanation: `${explanation} (${aeroSources[deck].title}, PDF pages ${pages.join(", ")}.)`, source: { deck, pages } });
}
applied("axes", "axes", "left-roll", "The pilot commands a left roll. Which conventional aileron movement produces it?", "Left aileron up; right aileron down", ["Left aileron down; right aileron up", "Both ailerons up equally", "Both ailerons down equally"], "The right wing gains lift while the left loses lift, rolling the aircraft left.", [14]);
applied("axes", "axes", "elevator-down", "On the conventional tail shown in the notes, what happens when the elevator deflects down?", "Tail rises and nose pitches down", ["Tail lowers and nose pitches up", "Aircraft yaws right without pitching", "Aircraft rolls left without pitching"], "Down elevator increases the tail's upward aerodynamic force and produces a nose-down pitching moment.", [17,18]);
applied("axes", "axes", "adverse-yaw", "Why can aileron input initially yaw the aircraft away from the intended turn?", "The wing producing more lift also produces more drag", ["Both wings always produce identical drag", "Elevator input directly creates unequal wing drag", "The lower-lift wing always produces the greater induced drag"], "Unequal aileron-induced lift and drag create adverse yaw; coordinated rudder counters it.", [24,26]);
applied("axes", "axes", "cg", "Where do all three aircraft axes of rotation intersect?", "At the centre of gravity", ["At the wing's leading edge", "At the centre of pressure in all conditions", "At the rudder hinge"], "The CG is the theoretical point through which aircraft weight acts; all three rotation axes pass through it.", [8,9]);
applied("axes", "lift-devices", "flap-effect", "At a given angle of attack, what is the usual effect of extending trailing-edge flaps?", "Increased lift and drag", ["Reduced lift and drag", "Increased lift with no drag change", "Reduced lift with increased drag"], "Flap extension changes wing camber and increases both lift and drag in the course example.", [47]);
applied("axes", "lift-devices", "ground-spoilers", "Why deploy ground spoilers after landing?", "Dump lift, increase drag and improve wheel-braking effectiveness", ["Increase lift to unload the wheels", "Increase wing camber for additional lift", "Increase tail downforce to hold the nose higher"], "Destroying lift places more load on the landing gear and improves braking effectiveness.", [65]);
applied("axes", "tabs", "flutter", "A repaired control surface must be checked for correct mass balance mainly to prevent what?", "Flutter", ["Adverse yaw", "Mach tuck", "Static pitch instability"], "Flutter is a potentially dangerous control-surface oscillation; correct balance helps prevent it.", [67]);
applied("stability", "stability", "static-vs-dynamic", "An aircraft initially tends toward equilibrium, but its oscillations grow. Which classification fits?", "Positive static and negative dynamic stability", ["Negative static and positive dynamic stability", "Neutral static and neutral dynamic stability", "Positive static and necessarily positive dynamic stability"], "Initial tendency and response over time are separate: positive static stability does not guarantee positive dynamic stability.", [8,11]);
applied("stability", "stability-design", "forward-cg", "What control limitation can an excessively forward CG create?", "Reduced ability to raise the nose", ["Reduced ability to lower the nose only", "No effect on pitch control", "An automatic increase in rudder authority"], "A forward CG increases the nose-heavy tendency and can limit available elevator/stabilator nose-up authority.", [18]);
applied("stability", "stability-design", "aft-cg", "What control limitation can an excessively aft CG create?", "Reduced ability to lower the nose", ["Reduced ability to roll only", "More guaranteed longitudinal stability", "No change in pitch response"], "A CG too far aft can limit the elevator's ability to lower the nose and reduce angle of attack.", [18]);
applied("stall", "stall", "stall-speed", "Can a wing stall at a high airspeed?", "Yes, if its critical angle of attack is exceeded", ["No, only low-speed flight can produce a stall", "Only if the aircraft has entered the hypersonic regime", "Only if angle of attack remains below its critical value"], "Stall is fundamentally an angle-of-attack condition. It does not require engine stoppage or a particular low airspeed.", [5,6,7]);
applied("stall", "stall", "ice", "How can ice or frost affect wing performance?", "Reduce lift, increase drag and raise stall speed", ["Increase lift and delay all stalls", "Reduce drag without changing lift", "Affect only engine performance"], "Surface contamination disturbs airflow. Do not assume the clean wing's critical angle remains unchanged after contamination.", [9]);
applied("stall", "stall", "canard-first", "Why is the canard in the course's stall-resistant configuration designed to stall before the main wing?", "To produce a nose-down pitching tendency before the main wing stalls", ["To force the nose up into a deeper stall", "To eliminate all need for pitch control", "To increase the main wing's critical angle without limit"], "Loss of the canard's forward lifting contribution tends to lower the nose and reduce main-wing angle of attack.", [18]);
applied("loads", "loads", "spar-bending", "In the positive-lift wing-spar bending example, which sides carry compression and tension?", "Upper side compression; lower side tension", ["Upper side tension; lower side compression", "Both sides carry only torsion", "Neither side carries stress"], "The notes show upper spar compression and lower spar tension under the illustrated in-flight bending load; reversed loading reverses the stresses.", [8]);
applied("loads", "loads", "pressurization", "When cabin pressure exceeds outside pressure, which way does the resulting pressure load act on the fuselage?", "Outward", ["Inward", "Only axially, without loading the shell", "It produces no shell load until the aircraft lands"], "Cabin differential pressure creates an outward load on the fuselage shell.", [13]);
applied("loads", "loads", "bank-load", "In a steady coordinated turn at constant altitude, what generally happens as bank angle increases?", "Required load factor increases", ["Required load factor decreases to zero", "Wing loading becomes independent of aircraft weight", "Total lift stays equal to weight regardless of bank"], "More total lift is needed to maintain the vertical lift component as bank increases; structural loading rises.", [16,17,18]);
applied("speed", "speed", "cooling-sound", "For air of unchanged composition, what happens to sound speed when temperature decreases?", "It decreases", ["It increases", "It is unaffected", "It changes only if atmospheric pressure changes"], "Sound speed in air depends primarily on absolute temperature and falls as temperature falls.", [18]);
applied("speed", "speed", "shock-pressure", "Across a compression shock, how do static pressure and total pressure change?", "Static pressure increases; total pressure decreases", ["Both increase", "Both decrease", "Static pressure decreases; total pressure increases"], "Compression shocks raise static pressure, temperature and density but cause a loss of total pressure.", [21,22]);
applied("flight", "mach-effects", "local-sonic", "Must the whole aircraft be travelling at Mach one for sonic airflow to occur over its wing?", "No; local flow can reach sonic speed while the aircraft is subsonic", ["Yes; every local airflow speed equals free-stream speed", "No; but only the flow beneath the wing can reach sonic speed", "Yes; local sonic flow occurs only after the free stream is supersonic"], "Local acceleration over the airfoil can produce sonic or supersonic regions at subsonic aircraft speeds.", [6,9]);
applied("flight", "mach-effects", "cp-aft", "What pitching tendency can result when the wing's aerodynamic loading shifts aft near the transonic regime?", "Nose-down pitch", ["Nose-up pitch in every case", "Pure yaw with no pitch", "Pure roll with no pitch"], "An aft shift in aerodynamic loading can increase the nose-down moment associated with Mach tuck.", [7,13]);
applied("design", "high-speed-design", "critical-design", "Which combination generally helps increase critical Mach number?", "Thinner section, less camber and wing sweep", ["Thicker section, more camber and no sweep", "More camber with an unchanged thick section", "A blunt thick section with greater flow acceleration"], "Reduced thickness and camber limit local acceleration; sweep reduces the leading-edge-normal flow component.", [17,18,19]);
applied("control", "high-speed-control", "tail-effectiveness", "Why is an all-moving horizontal tail useful at very high speed?", "It changes the whole tail's angle of attack when a hinged elevator may lose effectiveness", ["It prevents all changes in tail angle of attack", "It eliminates all shock waves on the aircraft", "It obtains pitch authority only by moving a small trim tab"], "An all-moving tail provides pitch authority by changing incidence, rather than relying only on a hinged elevator's camber change.", [9,10]);
applied("control", "high-speed-control", "lockout-reason", "Why are outboard ailerons locked out at high speeds on some aircraft?", "To reduce wing twisting, reversal risk and overcontrol", ["To concentrate more roll load at the flexible wingtips", "To increase wing twist deliberately", "To transfer all roll control to the elevator"], "The inboard controls/spoilers can provide roll control while reducing the outer wing's high-speed torsional loading.", [15,16,17]);
applied("fuselage", "fuselage", "skin-sharing", "Which description best distinguishes semimonocoque from true monocoque construction?", "Semimonocoque adds load-sharing longitudinal members to stressed skin", ["Semimonocoque has no stressed skin", "True monocoque requires more longitudinal stringers than semimonocoque", "Semimonocoque relies exclusively on unstressed fabric"], "Longerons and stringers reinforce the skin in semimonocoque construction. This is load sharing, not proof that every damaged member is safe.", [27,28,39]);
applied("wings", "wings", "load-path", "Which wing load path is described in the notes?", "Skin/stringers to ribs, then to spars", ["Skin to spars only, with ribs carrying no load", "Stringers directly to the fuselage, bypassing ribs and spars", "Ribs to unsupported skin, with spars providing shape only"], "Ribs preserve airfoil shape and transmit skin/stringer loads to the main spars.", [35,41,44]);

group("review", "coordinates", "Aircraft coordinate systems — each reference", [
  ["fuselage-station", "Fuselage station", "A reference defining position along the aircraft's length.", [10], "The reference for aircraft length is the fuselage _____.", "station"],
  ["water-line", "Water line", "A reference defining position along the aircraft's height.", [10], "Aircraft height is referenced by the _____ line.", "water"],
  ["buttock-line", "Buttock line", "A reference defining position along the aircraft's width.", [10], "Aircraft width is referenced by the _____ line.", "buttock"],
  ["wing-station", "Wing station", "A reference defining position along the wing's length/span.", [10], "Position along a wing is described by a wing _____.", "station"],
]);
group("review", "review-layouts", "Tail & landing-gear configurations", [
  ["conventional-tail", "Conventional tail", "A tail with a horizontal stabilizer at the base of a single centreline vertical stabilizer.", [9], "A tail with separate horizontal and single centreline vertical surfaces is a _____ tail.", "conventional"],
  ["h-tail", "H-tail", "A tail configuration with two offset vertical stabilizers rather than one on the aircraft centreline.", [9], undefined, undefined, ["htail"]],
  ["v-tail", "V-tail", "A tail with two compound ruddervator surfaces combining rudder and elevator functions.", [9], undefined, undefined, ["vtail"]],
  ["tricycle", "Tricycle", "The basic landing-gear configuration named for its nose wheel and main-wheel arrangement.", [10]],
  ["bicycle", "Bicycle", "The basic landing-gear configuration named for its fore-and-aft main-wheel arrangement.", [10]],
  ["tailwheel", "Tailwheel", "The basic landing-gear configuration named for a small wheel at the tail rather than a nose wheel.", [10], undefined, undefined, ["tail-wheel", "taildragger"]],
]);
group("review", "review-details", "Review additions — firewall, winglets & fuel tanks", [
  ["firewall", "Firewall", "A fire-resistant separation between the engine compartment and the rest of the aircraft.", [9]],
  ["winglets", "Winglets", "Wingtip design features used to reduce the effects of wingtip vortices.", [10], undefined, undefined, ["winglet"]],
  ["rigid-tank", "Rigid removable tank", "A separately removable rigid fuel-tank type, one of the three main fuel-tank types listed in the review.", [10], "The removable tank type with a rigid shell is a _____ removable tank.", "rigid"],
  ["bladder", "Bladder", "The flexible fuel-tank type listed alongside rigid removable and integral tanks.", [10]],
  ["integral-tank", "Integral tank", "The fuel-tank type also called a wet wing, using sealed aircraft structure as the tank.", [10], "A wet-wing fuel tank is an _____ tank.", "integral"],
]);
applied("review", "axes", "coordinated", "What is a coordinated turn?", "A balanced turn using ailerons, rudder and elevator without slipping or skidding", ["A turn using ailerons alone while deliberately skidding", "A turn with no elevator input permitted", "A turn in which yaw must always oppose the bank"], "The review describes aileron, rudder and elevator coordination to produce a smooth balanced turn.", [1,2]);
applied("review", "axes", "pilot-roll", "Which pilot input actuates the ailerons?", "Rotate the control wheel left or right", ["Push or pull the control column", "Push a rudder pedal", "Move the flap selector"], "The pilot rotates the control wheel/yoke left or right to command roll through the ailerons.", [1]);
applied("review", "axes", "pilot-pitch", "Which pilot input actuates the elevator?", "Push or pull the control column", ["Rotate the control wheel only", "Push a rudder pedal", "Select a landing-gear position"], "Push/pull movement of the column commands elevator pitch control.", [1]);
applied("review", "axes", "pilot-yaw", "Which pilot controls actuate the rudder?", "Rudder pedals", ["Control-wheel rotation", "Control-column push/pull", "Flap selector"], "Left and right rudder pedals provide rudder yaw input.", [1]);
applied("review", "stability-design", "review-cg-position", "In the review's conventional-tail example, where is the CG relative to the centre of lift?", "Slightly ahead", ["Well behind", "Always coincident at every speed", "Outside the aircraft"], "The review's conventional configuration has a CG slightly ahead of the centre of lift, balanced by tail downforce. This is a course example, not a universal CG location for all aircraft designs.", [4]);
applied("review", "stability-design", "longitudinal-features", "Which set lists the review's factors affecting longitudinal stability?", "CG position, horizontal-tail size/location and thrust line", ["Wing dihedral, wing sweep and high-wing placement only", "Vertical-tail size, dorsal fin and ventral fin only", "Landing-gear layout, cabin seats and fuel-tank shape only"], "Review Q23 lists CG relative to lift, horizontal stabilizer size/location and thrust-force line of action.", [4]);
applied("review", "stability-design", "lateral-features", "Which set does the review list as affecting lateral stability?", "Wing dihedral, wing sweep and the high-wing pendulum effect", ["CG position and horizontal-tail size only", "Vertical-tail size, dorsal fin and ventral fin only", "Cabin pressure and firewall position"], "The review lists dihedral, sweep and pendulum effect. The latter is the course's simplified high-wing explanation, not a complete universal mechanism.", [5]);
applied("review", "stability-design", "directional-features", "Which set does the review list as affecting directional stability?", "Wing sweep, vertical-tail size/location, dorsal and ventral fins", ["Horizontal-tail size and elevator trim only", "Dihedral and high-wing placement only", "Wing area and flap camber only"], "The review lists sweep, the vertical stabilizer, dorsal fins and ventral fins as directional-stability features.", [5]);
applied("review", "stability-design", "slipstream", "What is the propeller slipstream effect described in the review?", "Spiralling propeller airflow strikes the vertical stabilizer and creates unintended yaw", ["Equal straight airflow removes every yawing moment", "Aileron deflection alone twists the horizontal tail", "Cabin pressure moves the centre of gravity aft"], "Spiralling airflow from the propeller can act on the vertical stabilizer and produce an unintended yawing moment; direction depends on propeller rotation/configuration.", [5]);
applied("review", "stall", "lower-stall-speed", "Why is a lower stall speed useful for takeoff and landing?", "It permits slower flight before reaching the stall condition in that configuration", ["It prevents a stall at every angle of attack", "It guarantees the engines cannot stop", "It eliminates the need for pitch control"], "High-lift devices can lower stall speed; stall still occurs if the critical angle of attack is exceeded.", [3,6]);
applied("review", "loads", "course-cabin", "What cabin-pressure reference is given in the supplied review for a commercial airliner?", "8,000 ft cabin altitude, approximately 10.9 psi", ["Sea level cabin altitude, approximately 14.7 psi", "4,000 ft cabin altitude, approximately 12.7 psi", "12,000 ft cabin altitude, approximately 9.4 psi"], "Review Q34 and quiz Q37 give the 8,000-ft/10.9-psi reference. Actual requirements and operating limits depend on the aircraft and applicable rules; this is the course reference.", [6]);
applied("review", "loads", "course-limit", "What positive limit load factor does the supplied review give for its light general-aviation example?", "3.8 G", ["1.52 G", "2.0 G", "6.0 G"], "Review Q37 gives positive 3.8 G and negative 1.52 G for its example. These are not universal limits for every general-aviation aircraft.", [7]);
applied("review", "loads", "bank-onset", "In a steady coordinated level turn, does load factor begin increasing only at 35 degrees of bank?", "No; it increases with bank, becoming more noticeable as bank increases", ["Yes; it stays exactly 1 G at every smaller bank", "No; it decreases as bank increases", "Yes; it cannot exceed 1 G until 60 degrees"], "Quiz Q34's 'begins at 35 degrees' wording is misleading. The review says it increases significantly around that angle; the level-turn increase begins with bank, not at a universal 35-degree threshold.", [7]);
applied("review", "axes", "balance-methods", "Which set contains the control-balancing methods listed in the review?", "Mass balance weight, horn balance and inset hinge balance", ["Trim tab, slat and Fowler flap", "Winglet, spoiler and rudder pedal", "Dihedral, anhedral and wing sweep"], "Review Q56 lists mass weights, horn balance and inset hinge balance. Mass balancing and aerodynamic balancing serve related but different purposes; a horn or hinge arrangement is not automatically a substitute for specified mass balance.", [10]);
applied("review", "axes", "adverse-yaw-designs", "Which two aileron designs does the review name for reducing adverse yaw?", "Differential and Frise ailerons", ["Plain and Fowler ailerons", "Servo and anti-servo ailerons", "Inboard and outboard ailerons alone"], "Review Q57 identifies differential and Frise ailerons.", [10]);
applied("review", "speed", "water-air", "In the course comparison, does sound travel faster in water or in air?", "Water", ["Air", "At the same speed in both", "Sound cannot travel in water"], "Sound travels faster in water than in air in the course comparison. This does not justify a universal density-only rule for sound speed in all materials.", [7]);
applied("review", "speed", "course-sound", "What standard-day sea-level sound speed is given in the review?", "About 661 knots or 761 statute mph", ["About 761 knots or 661 statute mph", "About 331 knots or 661 statute mph", "About 1,000 knots or 1,000 statute mph"], "Review Q39 rounds the sea-level reference to 661 knots and 761 statute mph; the PDF gives 661.7 knots. These are reference values, not a conversion exercise.", [7]);

// Extra recall targets cover important review concepts whose full names have
// several words. Each prompt asks for exactly one explicitly defined word.
for (const [target, prompt, answer, deck, pages, aliases = []] of [
  ["cg-gravity", "All three axes pass through the centre of _____.", "gravity", "axes", [8,9]],
  ["adverse-yaw-word", "Yaw opposite the intended turn is called _____ yaw.", "adverse", "axes", [24]],
  ["flutter-word", "Which dangerous control-surface vibration is prevented by correct mass balancing?", "flutter", "axes", [67]],
  ["load-weight", "Load factor is lift divided by _____.", "weight", "loads", [17]],
  ["wing-area", "Wing loading is aircraft weight divided by wing _____.", "area", "loads", [20]],
  ["outboard-word", "Which ailerons are locked out at high speed on the course aircraft: inboard or outboard?", "outboard", "control", [15]],
  ["differential-word", "The review names Frise ailerons and _____ ailerons as designs that reduce adverse yaw.", "differential", "review", [10]],
  ["frise-word", "The review names differential ailerons and _____ ailerons as designs that reduce adverse yaw.", "Frise", "review", [10]],
  ["balance-weight-word", "The review's control-surface mass balancing uses a balance _____.", "weight", "review", [10]],
  ["horn-word", "The review lists mass weights, inset hinge balance and _____ balance.", "horn", "review", [10]],
  ["inset-word", "The review lists mass weights, horn balance and _____ hinge balance.", "inset", "review", [10]],
]) {
  recallQuestions.push({ id: `aero-word-${target}`, learningTarget: target, topic: deck === "review" ? "review-details" : deck === "axes" ? "axes" : deck === "control" ? "high-speed-control" : "loads", prompt, answer, acceptedAnswers: [answer, ...aliases], explanation: `${answer}: ${prompt.replace("_____", answer)} (${aeroSources[deck].title}, PDF pages ${pages.join(", ")}.)`, source: { deck, pages } });
}
noteSections.push({ id: "aero-review-additions", title: "Review relationships & source cautions", items: choiceQuestions.filter(q => q.source.deck === "review" && !q.prompt.startsWith("Which term")).map(q => [q.prompt, `${q.options[q.correctIndex]}. ${q.explanation}`]) });
export const legacyAerodynamicsChoiceQuestions = choiceQuestions;
export const legacyAerodynamicsRecallQuestions = recallQuestions;
export const aerodynamicsChoiceQuestions = [...choiceQuestions, ...aeroStructureChoice];
export const aerodynamicsRecallQuestions = [...recallQuestions, ...aeroStructureRecall];
export const aerodynamicsNoteSections = [...noteSections, ...aeroStructureNotes, {
  id: "aero-core-relationships", title: "Core relationships, abbreviations & qualifications", items: [
    ["CG — C", "C means centre (center)."], ["CG — G", "G means gravity. The centre of gravity is the point through which aircraft weight acts; axes intersect there. (Axes of Flight, PDF pages 8–9.)"],
    ["AOA — A", "The first A means angle."], ["AOA — O", "O means of."], ["AOA — final A", "The final A means attack. Angle of attack is the angle between the airfoil chord and relative airflow; exceeding the critical value produces a stall. (Wing stall, PDF pages 5–8.)"],
    ["Adverse yaw & coordination", "Extra drag on the higher-lift wing creates adverse yaw. Coordinated rudder counters it; a constant-altitude turn also needs sufficient vertical lift. (Axes of Flight, PDF pages 24–26.)"],
    ["Control-surface flutter", "A dangerous oscillation. Correct control-surface mass balance helps prevent flutter; the aerodynamic horn ahead of a hinge assists movement. (Axes of Flight, PDF pages 67–70.)"],
    ["Stall qualifications", "Critical angle is discussed for a given airfoil and configuration. Ice, contamination and other changes can alter stall behaviour; do not generalize a clean-airfoil statement to every configuration. Stall is not engine stoppage. (Wing stall, PDF pages 6–9, 25.)"],
    ["Load factor & wing loading", "Load factor is lift divided by weight; wing loading is weight divided by wing area. These are different quantities. The load factor in steady straight level flight is 1 G. Higher bank in a constant-altitude coordinated turn requires more lift. (Fuselage and Wing Loading, PDF pages 16–20.)"],
    ["Standard-day sound speed", "The supplied reference gives sea-level standard-day sound speed as approximately 661.7 knots (761 statute mph). This is a reference fact, not a conversion exercise. (High Speed Aerodynamics, PDF page 18.)"],
    ["Shock-wave changes", "Static pressure, temperature and density increase through a compression shock; total pressure and flow Mach number decrease. Expansion waves are not shock waves. A vapor cone does not prove an aircraft has passed Mach one. (High Speed Aerodynamics, PDF pages 21–25; High Speed Aircraft Design, PDF pages 8–12.)"],
    ["Source qualifications", "The notes use simplified classroom descriptions. General density-versus-sound-speed claims, fixed stall angles across changed configurations, guaranteed damage tolerance, exact re-entry surface temperatures and claims that a normal shock simply becomes an oblique shock are not used as answer keys. Hypersonic is treated as around Mach five and above. Fuel transfer moves CG, not directly the aerodynamic centre of pressure. Vortex generators help the boundary layer resist separation; they are not treated here as a guaranteed change in first local sonic onset."],
  ],
}];
const diagram = (file, alt) => ({ src: `/aerodynamics/module-2/${file}.png`, alt, crop: { x: 0, y: 0, width: 1920, height: 1080, imageWidth: 1920, imageHeight: 1080 } });
export const aerodynamicsDiagrams = {
  tailDesigns: diagram("tail-designs", "Original course comparison of conventional, T-tail, H-tail and V-tail arrangements"),
  tailFins: diagram("tail-fins", "Original course drawing labelling dorsal and ventral fins"),
  gearTypes: diagram("gear-types", "Original course reference showing wheels, floats and skis"),
  gearConfigurations: diagram("gear-configurations", "Original course diagram comparing tricycle, bicycle and tailwheel configurations"),
  gearTrunnion: diagram("gear-trunnion", "Original landing-gear trunnion reference and pivot drawing"),
  wingGeometry: diagram("wing-geometry", "Original wing geometry reference showing span, chord and aspect ratio"),
  wingLayouts: diagram("wing-layouts", "Original course drawings comparing high, mid and low wings and wing angles"),
  rollAxis: diagram("roll-axis", "Original course reference showing the longitudinal axis and opposing aileron motion"),
  compoundControls: diagram("compound-controls", "Original course list pairing each compound flight control with its two functions"),
  stability: diagram("stability", "Original labelled diagram and table linking roll, pitch and yaw to axes and stability names"),
  washout: diagram("washout", "Original wing washout reference showing lower tip incidence and root-first stall"),
  semimonocoque: diagram("semimonocoque", "Original labelled semimonocoque diagram with longeron, stringer, skin and bulkhead"),
  wingRibs: diagram("wing-ribs", "Original course reference explaining rib shape and the load path into spars"),
};
