import { aerodynamicsChoiceQuestions } from "./aerodynamicsModule2Base.js";

const bank = [];
function reuse(position, targets) {
  for (const target of targets) {
    const source = aerodynamicsChoiceQuestions.find(q => q.learningTarget === target);
    if (!source) throw new Error(`Missing Aerodynamics review target ${target}`);
    bank.push({ ...source, id: `aero-review-${position}-${target}`, quizPositions: [position], reviewQuestions: [] });
  }
}
function add(position, target, prompt, options, explanation, pages) {
  bank.push({ id: `aero-review-${position}-${target}`, learningTarget: target, topic: "review-quiz", prompt,
    options, correctIndex: 0, explanation: `${explanation} (Supplied Module 2 review, pages ${pages.join(", ")}; practice quiz Q${position}.)`,
    source: { deck: "review", pages }, quizPositions: [position], reviewQuestions: [] });
}
reuse(1, ["longitudinal", "vertical", "lateral"]);
reuse(2, ["cg"]);
reuse(3, ["roll", "pitch", "yaw", "ailerons", "elevator", "rudder"]);
for (const [target, label, category] of [["aileron","Aileron","Primary"],["elevator","Elevator","Primary"],["rudder","Rudder","Primary"],["flap","Flap","Secondary"],["slat","Slat","Secondary"],["spoiler","Spoiler","Secondary"],["trim-tab","Trim tab","Secondary"]]) {
  add(4, `class-${target}`, `Group the control surfaces into the correct category: ${label}.`, [category, category === "Primary" ? "Secondary" : "Primary", "Structural member", "Pilot input device"], `${label} is a ${category.toLowerCase()} flight control. Primary controls govern pitch, roll and yaw; secondary controls assist or modify flight.`, [1,2,3]);
}
add(5, "adverse-yaw", "What is the tendency of an aircraft to yaw in the opposite direction of its intended turn called?", ["Adverse yaw", "Dutch roll", "Mach tuck", "Aileron reversal"], "Unequal drag from aileron deflection causes adverse yaw, countered with coordinated rudder.", [1]);
reuse(6, ["coordinated"]);
reuse(7, ["elevons"]); reuse(8, ["ruddervators"]); reuse(9, ["flaperons"]); reuse(10, ["spoilerons"]); reuse(11, ["stabilator"]);
for (const property of ["camber", "lift", "drag"]) add(12, `flap-${property}`, `Describe the effect of extending flaps: what happens to wing ${property} in the course example?`, ["It increases", "It decreases", "It stays unchanged", "It becomes zero"], `Flap extension increases ${property}. The review's general flap description is refined by flap type; Fowler flaps also increase area.`, [3]);
reuse(13, ["fowler-flap"]); reuse(14, ["slat", "slot"]);
add(15, "spoiler-roll", "Which statement about spoilers is true?", ["They assist ailerons in roll movement", "They increase wing area", "They are the primary pitch controls", "They always increase wing lift"], "A raised spoiler reduces lift on the down-going wing and can assist roll control.", [3]);
add(15, "spoiler-speed", "How can spoilers be used as speed brakes?", ["Raise them symmetrically to increase drag and reduce lift", "Lower both to increase wing camber", "Raise only the elevator", "Move them aft to increase wing area"], "Symmetric spoiler deployment can slow the aircraft or assist descent.", [3]);
reuse(15, ["ground-spoilers"]);
reuse(16, ["adjustable-tab"]); reuse(17, ["balance-tab"]); reuse(18, ["anti-servo-tab"]); reuse(19, ["servo-tab"]); reuse(20, ["flutter"]);
reuse(21, ["static", "dynamic"]); reuse(22, ["positive-static"]); reuse(23, ["positive-dynamic", "negative-dynamic", "neutral-dynamic"]);
reuse(24, ["lateral-stability", "longitudinal-stability", "directional-stability"]);
reuse(25, ["longitudinal-features"]); reuse(26, ["lateral-features"]); reuse(27, ["directional-features"]); reuse(28, ["review-cg-position"]);
reuse(29, ["stall"]); reuse(30, ["lower-stall-speed"]); reuse(31, ["canard"]); reuse(32, ["canard-first"]);
reuse(33, ["shear", "torsion", "bending", "tension", "compression"]);
reuse(34, ["bank-onset"]); reuse(35, ["bank-load"]); reuse(36, ["course-limit"]); reuse(37, ["course-cabin"]); reuse(38, ["outboard-lockout"]);
reuse(39, ["subsonic", "transonic", "supersonic", "hypersonic"]);
// Q40 is a numerical Mach calculation; keep it outside Structures/Aerodynamics
// calculation practice under the user's established non-Math-course standard.
reuse(41, ["water-air"]);
add(42, "sound-knots", "What is the speed of sound at sea level on a standard day, in knots, as rounded in the review?", ["About 661 knots", "About 761 knots", "About 331 knots", "About 1,000 knots"], "The review rounds the standard-day sea-level value to 661 knots; the PDF gives 661.7 knots. It depends on temperature.", [7]);
add(42, "sound-mph", "What is the speed of sound at sea level on a standard day, in statute miles per hour, as given in the review?", ["About 761 mph", "About 661 mph", "About 331 mph", "About 1,000 mph"], "The supplied review gives about 761 statute miles per hour. This is direct reference recall rather than a conversion exercise.", [7]);
reuse(43, ["cooling-sound"]);
add(44, "above-critical", "An airspeed above the critical Mach number can result in what over the wing?", ["Local supersonic flow and shock waves", "Only incompressible flow everywhere", "No possible shock waves until Mach five", "A permanent disappearance of drag"], "Local sonic onset occurs at critical Mach; above it local supersonic regions and shocks can develop while the aircraft is still subsonic.", [8]);
add(45, "higher-critical", "Is a higher or lower critical Mach number desirable for delaying compressibility effects?", ["Higher", "Lower", "Exactly zero", "It has no relationship to local sonic onset"], "A higher critical Mach delays first local sonic flow as aircraft speed rises.", [8]);
reuse(46, ["thin-airfoil", "low-camber", "wing-sweep"]);
add(46, "vortex-generators", "What is the main boundary-layer benefit of vortex generators in the supplied notes?", ["Energize the boundary layer to help resist separation", "Guarantee that no shock can ever form", "Eliminate every source of drag", "Replace the wing's main spar"], "The PDF describes energizing the boundary layer to resist the adverse pressure gradient behind a shock. Its critical-Mach claim is not used as a guarantee about first sonic onset.", [8]);
add(47, "shock-lift-drag", "Shock-induced separation on the wing tends to produce which combination?", ["Decreased lift and increased drag", "Increased lift and decreased drag", "Increased lift with no drag change", "No change in lift or drag"], "Shock-induced flow separation reduces lift and increases drag in the transonic example.", [8]);
reuse(48, ["mach-tuck", "mach-trim", "mach-feel"]);
reuse(49, ["fuselage", "wings", "empennage", "powerplant", "landing-gear"]);
reuse(50, ["monocoque", "truss", "semimonocoque"]); reuse(51, ["spar"]);
add(52, "tip-vortices", "Movement of higher-pressure air from under the wing, around the wingtip, to the upper surface describes what?", ["Wingtip vortices", "A stall", "Angle of attack", "Angle of incidence"], "The pressure difference drives flow around the wingtip and produces wingtip vortices. The review identifies winglets as a design feature reducing their effects.", [10]);
add(53, "empennage-parts", "Which components belong to a conventional empennage?", ["Horizontal and vertical stabilizers, elevator and rudder", "Wings, ailerons, flaps and spoilers", "Spars, ribs and main landing gear", "Engine, propeller and firewall only"], "The empennage includes stabilizing surfaces and primary pitch/yaw controls.", [9]);
reuse(54, ["buttock-line", "wing-station", "fuselage-station", "water-line"]);

// Map all 60 review entries, including every member of grouped concepts.
// Reuse a quiz item when its learning target is already represented; add the
// review-only concepts once. No random slide-only material enters this bank.
const reviewMap = {
  1:["ailerons","elevator","rudder","roll","pitch","yaw"],2:["cg"],3:["pilot-roll","pilot-pitch","pilot-yaw"],4:["adverse-yaw"],5:["coordinated"],6:["coordinated"],7:["stabilator"],8:["ruddervators"],9:["adjustable-tab"],10:["servo-tab","balance-tab"],11:["anti-servo-tab"],12:["flap-camber","flap-lift","flap-drag"],13:["plain-flap","fowler-flap"],14:["slotted-flap"],15:["slot"],16:["slat","slot"],17:["spoiler-roll","spoiler-speed","ground-spoilers"],18:["static"],19:["positive-static","negative-static","neutral-static"],20:["dynamic"],21:["positive-dynamic","negative-dynamic","neutral-dynamic"],22:["lateral-stability","longitudinal-stability","directional-stability"],23:["longitudinal-features"],24:["review-cg-position"],25:["lateral-features"],26:["directional-features"],27:["tension","compression","shear","torsion","bending"],28:["slipstream"],29:["dutch-roll"],30:["stall"],31:["lower-stall-speed"],32:["canard","canard-first"],33:["tension","compression","shear","torsion","bending"],34:["course-cabin"],35:["load-factor"],36:["bank-load"],37:["course-limit"],38:["sound-definition","temperature"],39:["sound-knots","sound-mph"],40:["mach"],41:["subsonic","transonic","supersonic","hypersonic"],42:["critical-mach","thin-airfoil","low-camber","wing-sweep"],43:["mach-tuck"],44:["coffin-corner"],45:["aileron-reversal"],46:["truss","monocoque"],47:["semimonocoque"],48:["stressed-skin","formers","bulkheads","longerons","fuselage-stringers"],49:["firewall"],50:["wing-skin","spar","rib","wing-stringer"],51:["conventional-tail","t-tail"],52:["h-tail"],53:["v-tail"],54:["tricycle","bicycle","tailwheel"],55:["flutter"],56:["balance-methods"],57:["adverse-yaw-designs"],58:["winglets"],59:["rigid-tank","bladder","integral-tank"],60:["fuselage-station","water-line","buttock-line","wing-station"],
};
const extra = {
  "sound-definition": ["What is the speed of sound?", ["The transmission speed of a small disturbance through a medium", "The aircraft's ground speed", "The velocity at which all wings stall", "The speed of wingtip airflow in every flight condition"], "Sound speed describes disturbance propagation; in air of unchanged composition it depends primarily on temperature.", [7]],
  "stressed-skin": ["Which outer component shares primary loads in semimonocoque construction?", ["Stressed skin", "Unstressed fabric covering only", "Cabin upholstery", "Decorative paint only"], "The skin shares loads with internal members in semimonocoque construction.", [9]],
  "wing-skin": ["Which wing component carries aerodynamic loads into the supporting framework?", ["Wing skin", "Cabin lining", "Rudder pedals", "Landing-gear fairing only"], "The review lists skin, spars, ribs and stringers as wing structure; the wing notes describe their load path.", [9]],
};
for (const [number, targets] of Object.entries(reviewMap)) for (const target of targets) {
  let question = bank.find(q => q.learningTarget === target);
  if (!question) {
    const source = aerodynamicsChoiceQuestions.find(q => q.learningTarget === target);
    if (source) question = { ...source, id: `aero-review-sheet-${target}`, quizPositions: [], reviewQuestions: [] };
    else {
      const [prompt, options, explanation, pages] = extra[target];
      question = { id: `aero-review-sheet-${target}`, learningTarget: target, topic: "review-sheet", prompt, options, correctIndex: 0, explanation: `${explanation} (Supplied Module 2 review, page ${pages.join(", ")}.)`, source: { deck: "review", pages }, quizPositions: [], reviewQuestions: [] };
    }
    bank.push(question);
  }
  question.reviewQuestions.push(Number(number));
}
export const aerodynamicsReviewQuestions = bank;
export const aerodynamicsReviewExclusions = [{ quizPosition: 40, reason: "Numerical Mach calculation excluded under the existing non-Math-course standard." }];
