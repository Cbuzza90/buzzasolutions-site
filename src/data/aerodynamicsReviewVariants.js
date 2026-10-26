// Explicit links make review/quiz coverage auditable without copying the easy
// test verbatim. Existing topic questions may satisfy the same learning target.
const choicePrompts = {
  cg:"Which common point lies on the longitudinal, lateral and vertical rotation axes?",
  "ground-spoilers":"After touchdown, what benefit does the pilot gain by dumping wing lift with spoilers?",
  flutter:"Why is a control surface's specified mass balance important after repair?",
  "canard-first":"What protective pitching response is intended when the course's canard stalls ahead of the main wing?",
  "bank-load":"Maintaining altitude in a steeper coordinated turn calls for what change in load factor?",
  "cooling-sound":"The air becomes colder without a composition change. How does its local sound speed respond?",
  "class-aileron":"An aileron is used directly for roll control. Which category does it belong to?",
  "class-elevator":"How is the elevator classified among aircraft flight controls?",
  "class-rudder":"Yaw is commanded by the rudder. What class of flight control is the rudder?",
  "class-flap":"A flap modifies low-speed wing performance. How is it classified?",
  "class-slat":"A leading-edge slat supplements the basic pitch/roll/yaw controls. Which category applies?",
  "class-spoiler":"What category contains the lift-dumping spoiler?",
  "class-trim-tab":"A trim tab relieves sustained control pressure. What category does it belong to?",
  "flap-camber":"Compared with the retracted condition, how does deploying the described flap change camber?",
  "flap-lift":"At the same suitable angle of attack, what is the intended effect of flap extension on lift?",
  "flap-drag":"In the course flap comparison, what happens to drag after extension?",
  "spoiler-roll":"A spoiler rises on one wing. Which roll-control role can it perform?",
  "spoiler-speed":"For a symmetric descent/slowdown, how can the pilot use spoilers?",
  "sound-knots":"Which approximate standard-day sea-level sound speed belongs in a reference expressed in knots?",
  "sound-mph":"Which approximate standard-day sea-level sound speed belongs in a reference expressed in statute mph?",
  "above-critical":"The aircraft is above critical Mach but still below Mach one. What can already exist over part of its wing?",
  "higher-critical":"A designer wants to delay first local sonic flow. Which critical-Mach trend is desirable?",
  "vortex-generators":"Small vortex-generating devices help airflow negotiate an adverse pressure gradient. What is their boundary-layer role?",
  "shock-lift-drag":"A shock causes upper-wing airflow separation. Which lift/drag trend is expected?",
  "tip-vortices":"What flow phenomenon results when pressure drives air around the wingtip from the lower to upper surface?",
  "empennage-parts":"Which assembly of surfaces would you expect at a conventional aircraft tail?",
  "sound-definition":"When discussing a small pressure disturbance in a medium, what does its sound speed mean?",
  "stressed-skin":"In semimonocoque construction, which outer member works with the internal framework to carry loads?",
  "wing-skin":"Which outer wing member passes aerodynamic loading into the supporting members?",
  "coordinated":"Which description fits a balanced turn with neither a slip nor a skid?",
  "pilot-roll":"To command roll through the ailerons, how does the pilot move the yoke?",
  "pilot-pitch":"To command pitch through the elevator, how does the pilot move the column?",
  "pilot-yaw":"Which cockpit input commands yaw through the rudder?",
  "review-cg-position":"Which CG position is used in the review's conventional-tail stability example?",
  "longitudinal-features":"Which design-factor group concerns pitch stability in the review?",
  "lateral-features":"Which design-factor group concerns roll stability in the review's simplified model?",
  "directional-features":"Which design-factor group concerns yaw stability in the review?",
  "slipstream":"How can spiralling propeller airflow create an unintended yawing moment?",
  "lower-stall-speed":"What operational benefit is associated with reduced stall speed in the landing configuration?",
  "course-cabin":"Which cabin-altitude/pressure pair matches the supplied airliner review example?",
  "course-limit":"Which positive limit-load example is quoted for the review's light-GA aircraft?",
  "bank-onset":"A coordinated level turn uses a modest bank below 35 degrees. Is the load factor necessarily still exactly one?",
  "balance-methods":"Which group contains the review's mass and aerodynamic control-balance methods?",
  "adverse-yaw-designs":"Which named aileron designs help address unequal drag in a turn?",
  "water-air":"For the supplied comparison of water and air, which medium transmits sound faster?",
};
const aliases = {
  cg:"cg-gravity", "adverse-yaw":"adverse-yaw-word", flutter:"flutter-word", "load-factor":"load-weight", "wing-stringer":"stringer-direction",
};
const recallVariants = {
  "class-aileron":["An aileron belongs to the _____ flight-control category.","primary"],
  "class-elevator":["The elevator is a _____ flight control.","primary"],
  "class-rudder":["The rudder is a _____ flight control.","primary"],
  "class-flap":["A flap belongs to the _____ flight-control category.","secondary"],
  "class-slat":["The slat is a _____ flight control.","secondary"],
  "class-spoiler":["A spoiler belongs to the _____ control category.","secondary"],
  "class-trim-tab":["A trim tab is classified as a _____ flight control.","secondary"],
  coordinated:["A balanced turn without slip or skid is a _____ turn.","coordinated"],
  "flap-camber":["In the flap-extension comparison, camber _____.","increases",["rises"]],
  "flap-lift":["At a suitable unchanged angle of attack, flap extension _____ lift.","increases",["raises"]],
  "flap-drag":["In the lecture's flap-extension comparison, drag _____.","increases",["rises"]],
  "spoiler-roll":["Raising a spoiler on only one wing assists _____ control.","roll"],
  "spoiler-speed":["When used symmetrically as speed brakes, spoilers increase _____.","drag"],
  "ground-spoilers":["After touchdown, ground spoilers dump _____ to improve wheel braking.","lift"],
  "longitudinal-features":["CG position, horizontal-tail size and thrust line affect _____ stability.","longitudinal"],
  "lateral-features":["The review groups dihedral, sweep and the simplified pendulum effect under _____ stability.","lateral"],
  "directional-features":["Vertical-tail size, dorsal fins and ventral fins affect _____ stability.","directional"],
  "review-cg-position":["In the conventional-tail review example, the CG is slightly _____ of the centre of lift.","ahead",["forward"]],
  "lower-stall-speed":["Reducing stall speed permits _____ approach flight before stall: slower or faster?","slower"],
  "canard-first":["The course's stall-resistant canard should stall _____ the main wing.","before"],
  "bank-onset":["Load factor in a steady coordinated level turn _____ with bank, even below 35 degrees.","increases",["rises"]],
  "bank-load":["A steeper coordinated level turn requires a _____ load factor: higher or lower?","higher",["greater"]],
  "course-limit":["The review's positive 3.8 G example is a _____ load factor, not an ultimate failure load.","limit"],
  "course-cabin":["The 8,000-ft cabin reference describes cabin _____, rather than the aircraft's geometric altitude.","altitude"],
  "water-air":["In the course comparison, sound travels faster in _____ than in air.","water"],
  "sound-knots":["The review's sea-level standard-day sound speed of about 661 is expressed in _____.","knots",["knot","kts"]],
  "sound-mph":["The review's sea-level standard-day sound speed of about 761 is in statute miles per _____.","hour"],
  "cooling-sound":["For unchanged air composition, sound speed _____ when temperature falls.","decreases",["falls"]],
  "above-critical":["Beyond critical Mach, some local wing airflow can become _____ while the aircraft remains subsonic.","supersonic"],
  "higher-critical":["To delay first local sonic flow, a _____ critical Mach is desirable: higher or lower?","higher"],
  "vortex-generators":["Vortex generators help resist boundary-layer flow _____.","separation"],
  "shock-lift-drag":["When shock separation reduces lift, the associated drag generally _____.","increases",["rises"]],
  "landing-gear":["The wheels/floats/skis supporting the aircraft belong to its landing _____.","gear"],
  "tip-vortices":["Air rolling around the wingtip creates wingtip _____.","vortices",["vortex"]],
  "empennage-parts":["The conventional tail's stabilizers, elevator and rudder form the _____.","empennage"],
  "pilot-roll":["To command aileron movement with a yoke, _____ the control wheel left or right.","rotate",["turn"]],
  "pilot-pitch":["Pushing or pulling the control column commands the _____.","elevator"],
  "pilot-yaw":["The pilot commands rudder movement through rudder _____.","pedals",["pedal"]],
  slipstream:["Spiralling propeller flow striking the fin is the propeller _____ effect.","slipstream"],
  "sound-definition":["Sound speed describes how fast a small disturbance travels through a _____.","medium"],
  "stressed-skin":["In semimonocoque construction the load-carrying outer covering is stressed _____.","skin"],
  "wing-skin":["Aerodynamic wing loads pass through the wing _____ to supporting structure.","skin"],
  "balance-methods":["Alongside horn and inset hinge balance, the review lists _____ balance weights.","mass"],
  "adverse-yaw-designs":["The two named adverse-yaw-reducing designs are Frise and _____ ailerons.","differential"],
};
export function includeReviewConcepts(choice, recall, review) {
  const resultChoice = choice.map(q => ({...q})), resultRecall = recall.map(q => ({...q}));
  for (const reference of review) {
    const target = reference.learningTarget;
    let mc = resultChoice.find(q => q.learningTarget === target);
    if (!mc) { mc = { ...reference, id:`aero-module-review-${target}`, topic:"review-transfer" }; resultChoice.push(mc); }
    if (mc.prompt === reference.prompt) {
      mc.prompt = choicePrompts[target] ?? (mc.prompt.startsWith("Which term matches this description?\n")
        ? mc.prompt.replace("Which term matches this description?", "Identify the aircraft concept from its behaviour or function:")
        : `Consider this aircraft behaviour or function.\n${mc.prompt}`);
    }
    mc.reviewQuestions = [...reference.reviewQuestions]; mc.quizPositions = [...reference.quizPositions];
    mc.reviewTargets = [target];
    let typed = resultRecall.find(q => q.learningTarget === target || q.learningTarget === aliases[target]);
    if (!typed) {
      const variant = recallVariants[target];
      if (!variant) throw new Error(`Missing one-word review transfer target: ${target}`);
      const [prompt,answer,accepted=[]] = variant;
      typed = { id:`aero-word-review-${target}`, learningTarget:target, topic:"review-transfer", prompt, answer, acceptedAnswers:[answer,...accepted], explanation:reference.explanation, source:reference.source };
      resultRecall.push(typed);
    }
    typed.reviewQuestions = [...new Set([...(typed.reviewQuestions ?? []),...reference.reviewQuestions])];
    typed.quizPositions = [...new Set([...(typed.quizPositions ?? []),...reference.quizPositions])];
    typed.reviewTargets = [...new Set([...(typed.reviewTargets ?? []),target])];
  }
  return { choice:resultChoice, recall:resultRecall };
}
