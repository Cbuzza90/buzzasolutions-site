// Focused lessons from the supplied three-page Engines Test 2 digest.
// Stable learning targets keep the lesson attached when choices are shuffled.
const lessons = [
  ["hydraulic-lock lock-location lock-damage", [
    ["Follow the mechanism", "Shutdown → gravity collects oil in lower radial-engine cylinders → the piston approaches top dead centre (TDC) → trapped oil cannot compress. Forcing the piston transfers the load into rods and cylinders, which can bend, break or crack. (PDF p1, review Q1.)"],
    ["Recognize the clue", "Lower cylinders, trapped oil and resistance to piston movement point to hydraulic lock. This is a cylinder problem, rather than the system-pressure problem measured by the oil-pressure gauge. Actual checks and corrective work follow the approved engine procedure. (PDF p1–2, review Q1,24.)"],
  ]],
  ["sliding rolling wiping", [
    ["Compare the three contacts", "Sliding: one surface moves across another. Rolling: a ball or roller moves along a surface. Wiping: the supplied review's name for contacting gear teeth. Classify the movement at the contact, rather than choosing a word because the whole engine rotates. (PDF p1, review Q2.)"],
    ["Connect it to lubrication", "An oil film separates moving metal surfaces, reducing direct contact, wear and horsepower loss. Friction remains within the moving fluid; lubrication does not mean all friction disappears. (PDF p1–2, review Q3 and lecture.)"],
  ]],
  ["lubricant-purpose friction-duty fluid-friction power-loss", [
    ["What the oil film changes", "Without the separating film, moving metal surfaces contact each other. With the film, the surfaces are separated and friction becomes internal fluid friction. Reducing direct contact reduces wear and the horsepower lost to friction. (PDF p1–2, review Q3 and lecture.)"],
    ["Keep the functions separate", "Friction reduction is the main purpose, but oil also cools, protects against corrosion, cleans, cushions and seals. A question about carrying heat tests cooling; one about separating moving surfaces tests friction reduction. (PDF p1–2, review Q3–4.)"],
  ]],
  ["cooling-duty oil-heat-path cooling-share cooler-purpose", [
    ["Follow the heat", "Hot pistons and cylinder walls transfer heat to circulating oil. The oil carries that heat to the oil-to-air cooler, where it is transferred away. Oil therefore helps cool parts as well as lubricate them. (PDF p2, review Q25 and lecture.)"],
    ["Avoid the mix-up", "A cooler removes heat; a filter traps contaminants. The lecture's 'up to 50%' cooling contribution is an estimate from this course, not a fixed percentage for every engine. (PDF p2, review Q20,25 and lecture.)"],
  ]],
  ["corrosion-duty preservation", [
    ["How protection works", "Oil forms a barrier between metal and moisture/oxygen. That is corrosion protection, whereas separating two moving surfaces is friction reduction. Both involve a film, but protect against different causes of damage. (PDF p1–2, review Q4 and lecture.)"],
    ["Connect it to storage", "The lecture advises preservation/inhibition when an engine is inactive for more than 30 days. Recognize this as the course's storage guidance; actual preservation methods and intervals come from the engine's approved instructions. (PDF p2, lecture.)"],
  ]],
  ["cleaning-duty dispersancy ad-action", [
    ["Follow the contamination", "Dispersancy keeps dirt, carbon, water and particles suspended so circulating oil can carry them toward filtration. Cleaning is the lubrication duty; dispersancy is the property that helps transport contamination. (PDF p1–2, review Q4,11 and lecture.)"],
    ["Remember the distinction", "AD means ashless dispersant: A = ashless, D = dispersant. Holding particles in suspension does not make the filter unnecessary. Suspension and filtration are connected steps, rather than interchangeable terms. (PDF p1, review Q11.)"],
  ]],
  ["cushioning-duty sealing-duty", [
    ["Compare the jobs", "Cushioning softens forces at bearings and valve mechanisms. Sealing uses the film between piston rings and cylinder walls to help limit combustion-gas leakage. Look for either a loaded moving contact or gas trying to pass the rings. (PDF p1–2, review Q4 and lecture.)"],
    ["Use the wording as a clue", "Forces at a bearing point to cushioning. Combustion gases at the ring/cylinder interface point to sealing. Neither description is the same as transporting heat to a cooler or carrying particles to a filter. (PDF p1–2, review Q4 and lecture.)"],
  ]],
  ["viscosity viscosity-temperature cold-oil hot-oil", [
    ["Follow temperature and flow", "Viscosity means resistance to flow. Cooling makes oil thicker and harder to move; heating makes it thinner. Extreme cold can leave it nearly semisolid, while excessive heat can thin the film enough to lose protection. (PDF p1, review Q5,7.)"],
    ["Viscosity versus viscosity index", "Viscosity describes resistance to flow at a condition. Viscosity index describes how much that resistance changes as temperature changes. Higher VI means less change, not automatically thicker oil and not zero change. (PDF p1, review Q5,8.)"],
  ]],
  ["vi-definition high-vi viscosity-vi-scenario multigrade", [
    ["Compare across temperatures", "Cold oil thickens and hot oil thins. A higher viscosity index means comparatively less of that change, helping cold starting and hot lubrication. Two oils can have similar viscosity at one temperature but different VI values. (PDF p1–2, review Q7–8 and lecture.)"],
    ["Read the clue carefully", "'Resistance to flow' asks for viscosity; 'changes less with temperature' asks for viscosity index. Multigrade oil covers a wider range of cold/hot conditions, but still needs to meet the engine's approved requirements. (PDF p1–2, review Q5,8,13 and lecture.)"],
  ]],
  ["saybolt saybolt-volume sus saybolt-temperature sae-groups", [
    ["Understand the measurement", "The Saybolt Universal Viscosimeter times 60 cc of heated oil flowing through a calibrated orifice. The result is elapsed time in Saybolt Universal Seconds: S = Saybolt, U = Universal, S = Seconds. Volume is the sample; seconds are the result. (PDF p1–2, review Q6 and lecture.)"],
    ["Keep the scales separate", "The lecture references 210°F (99°C), SUS readings 80/100/120 and SAE groups 10–70. SUS is a flow-time reading and SAE is a grade system, so their numbers are not interchangeable. (PDF p2, lecture.)"],
  ]],
  ["cloud-point pour-point", [
    ["Compare what is observed", "Cloud point marks fine wax/solid crystals forming and making oil cloudy. Pour point is the lowest temperature at which it still flows or pours. Appearance and ability to flow are different observations. (PDF p1, review Q9.)"],
    ["Check the clue", "Cloudy/crystals → cloud point. Lowest temperature that still allows pouring → pour point. The source's 'within 5°F' starting-temperature wording is unclear about direction, so it is not used as a universal selection rule. (PDF p1, review Q9.)"],
  ]],
  ["flash-point fire-point fire-above-flash", [
    ["Ignition versus sustained burning", "At flash point, oil gives off vapour that can ignite briefly. At fire point, enough vapour is produced to sustain a flame. Both concern vapour and ignition; sustained burning is the important distinction. (PDF p1, review Q10.)"],
    ["Remember the progression", "Flash = brief ignition; fire = continued flame. The lecture places fire point typically about 50–60°F above flash point, as an approximation. Cloud and pour points instead concern cold-oil behaviour. (PDF p1–2, review Q9–10 and lecture.)"],
  ]],
  ["break-in-oil ring-seating after-break-in shipping-oil", [
    ["Connect oil to its stage of use", "The review identifies straight mineral oil for new/overhauled piston-engine break-in because controlled wear helps piston rings seat. After break-in, ashless-dispersant oil is common. Preservative shipping oil serves another purpose and is not the permanent normal-operation fill. (PDF p1–2, review Q12 and lecture.)"],
    ["Keep the example in context", "The lecture gives a first-25-operating-hours statement for removing shipping oil. Actual break-in oil, exceptions and schedules come from approved engine instructions; the classroom example is not a universal oil-change schedule. (PDF p2, lecture.)"],
  ]],
  ["winter-w aviation-w", [
    ["Read the whole grade", "In SAE 20W50 or 15W50, W denotes winter performance/use. In the review's aviation-prefix example W100, W identifies ashless-dispersant oil. The same letter is used in different naming contexts. (PDF p1, review Q13.)"],
    ["Try the comparison", "If the question shows 20W50, think winter. If it shows the course's aviation W100, think ashless dispersant. Do not assign one meaning to every W without checking the example. (PDF p1, review Q13.)"],
  ]],
  ["synthetic-caution mixing-caution", [
    ["Why the label is not enough", "The lecture discusses compatible synthetic-oil uses but cautions about leaded 100LL residues and initial break-in. Selection involves compatibility and approval, rather than simply a familiar viscosity number. (PDF p2, lecture.)"],
    ["Separate study statements from approvals", "The lecture cautions about intermixing mineral/synthetic oils or brands. Those statements do not establish permission for a particular combination. Use actual engine and oil manufacturers' approved requirements for servicing. (PDF p2, lecture.)"],
  ]],
  ["castor-history ash-history", [
    ["Connect the historical changes", "Early rotary engines often used castor oil, associated with gumming. Mineral aviation oils became common by WWII. Ash residues from metallic additives helped drive ashless-dispersant development. Each example links an oil choice with a deposit concern. (PDF p2, lecture.)"],
    ["Do not merge the terms", "Gumming is the drawback named for historical castor oil. Metallic-additive ash is the issue linked to ashless-dispersant development. Dispersancy itself means holding contaminants in suspension for transport toward filtration. (PDF p1–2, review Q11 and lecture.)"],
  ]],
  ["system-categories wet-sump dry-sump scavenge-return dry-return-scenario wet-capacity intake-sump", [
    ["Trace the return", "Wet sump: crankcase/sump storage → engine circulation → return to that sump. Dry sump: separate tank → engine → scavenge sump → scavenge pump → tank. Where oil is stored and how it returns identify the layout. (PDF p1,3, review Q14–16 and lecture.)"],
    ["Connect layout to heat", "The lecture notes limited storage and difficult cooling from engine heat in a wet sump. Some opposed engines route intake tubes through the sump for heat exchange. A dry sump uses a separate reservoir; 'dry' does not mean the engine operates without oil. (PDF p1–3, review Q16 and lecture.)"],
  ]],
  ["distribution pump-displacement pump-types scavenge-capacity", [
    ["Separate delivery from return", "Pressure supply, supplemented by splash, distributes oil to engine parts. In a dry sump, scavenging returns collected oil to the separate tank. Gear and gerotor pumps are named for pressure/scavenge duties; the lecture gives greater capacity to the scavenge pump. (PDF p1,3, review Q17,19 and lecture.)"],
    ["Fixed volume is not fixed pressure", "Constant displacement means the pump moves a fixed volume per revolution. It does not mean pressure stays constant regardless of conditions. The pressure-relief/regulating valve separately routes excess oil away to control pressure. (PDF p1–2, review Q19,21.)"],
  ]],
  ["tank-expansion tank-vent tank-cap tank-material tank-sizing tank-hopper", [
    ["Give each feature its job", "Expansion space accommodates expanding oil. Atmospheric venting prevents pressure buildup. OIL and permitted-oil identification on the cap identify the servicing fluid. These features serve different needs in the same tank. (PDF p1, review Q18.)"],
    ["Connect size and warming", "The lecture describes usually aluminium-alloy tanks sized for endurance and oil consumption. Some historic tanks used a hopper to speed warming. The review's numerical expansion-space wording has an unclear capacity basis, so no exact universal rule is inferred. (PDF p1,3, review Q18 and lecture.)"],
  ]],
  ["filter-types common-filter disposable-filter anti-drainback screen-circuits", [
    ["Organize the four names", "The review lists screen, Cuno, canister and spin-on. Spin-on is most common on small piston engines in this source and is usually disposable. Metal screens can be cleaned/reused and may occur in pressure or scavenge circuits. (PDF p2–3, review Q20 and lecture.)"],
    ["What the source supports", "A spin-on unit is normally full-flow and may include anti-drainback and pressure-relief valves, depending on design. The digest names Cuno and canister but gives no construction details, so those details are not inferred. (PDF p2–3, review Q20 and lecture.)"],
  ]],
  ["filter-location suction-screen full-flow", [
    ["Trace normal filtration", "The described main filter follows the pump and precedes bearings: pump → filter → bearings. A fine-mesh suction screen may separately protect the pump inlet. The suction screen and downstream filter occupy different points in the flow. (PDF p3, lecture.)"],
    ["Normal flow versus blockage", "Full-flow means normally all supplied oil passes through the element. If it clogs, bypass allows oil to reach components unfiltered to prevent starvation. Full-flow describes normal operation, not a promise that bypass never occurs. (PDF p2–3, review Q23 and lecture.)"],
  ]],
  ["pressure-relief pressure-adjust excess-pressure-scenario", [
    ["Identify the controlled condition", "Pressure relief/regulation routes excess oil away to limit system pressure. The pump moves oil; the valve regulates pressure. The course's typical screw adjustment increases maximum pressure when turned clockwise; actual adjustments require approved instructions. (PDF p1–2, review Q19,21–22.)"],
    ["Compare the other valves", "Filter bypass preserves supply around a blockage. Thermostatic bypass selects cooler routing by temperature. Surge protection bypasses a cooler when congealed oil produces excessive inlet pressure. None is a substitute name for overall pressure regulation. (PDF p2–3, review Q21–27 and lecture.)"],
  ]],
  ["filter-bypass clogged-filter-scenario", [
    ["Follow cause and effect", "Blocked filter → restricted normal path → bypass opens → oil still reaches components, although unfiltered. The tradeoff is maintaining supply instead of starving components. Bypass does not clean the blocked element. (PDF p2, review Q23.)"],
    ["Choose by the trigger", "Clogged filter → filter bypass. Cold oil normally going around the cooler → thermostatic bypass. Excessive cooler-inlet pressure from congealed oil → surge protection. Identify which component is bypassed and why. (PDF p2–3, review Q23,26–27 and lecture.)"],
  ]],
  ["cold-route thermostat-cold thermostat-hot cold-core-scenario", [
    ["Track the bypass path", "Cold: the bypass around the cooler core is open and oil follows the outer bypass jacket. As oil warms: the bypass closes, directing oil through the cooling core. 'Closed' refers to the bypass, not a shutoff of all engine oil flow. (PDF p2, review Q25–26.)"],
    ["Temperature versus pressure", "Thermostatic bypass changes routing with temperature during normal operation. Surge protection responds to excessive cooler-inlet pressure from congealed oil. Both can divert oil around the cooler, but their triggers differ. (PDF p2–3, review Q26–27 and lecture.)"],
  ]],
  ["surge congealed-core-scenario", [
    ["Follow the pressure problem", "Congealed oil creates excessive cooler-inlet pressure in the dry-sump example. The surge-protection valve opens a diversion around the cooler. The clues are the cooler inlet, congealed oil and excessive pressure. (PDF p2, review Q27.)"],
    ["Distinguish similar valves", "Thermostatic bypass uses temperature to choose the normal cooler path. Filter bypass goes around a clogged filter. System pressure relief regulates overall pressure. Cooler-inlet pressure from congealed oil specifically identifies surge protection. (PDF p2–3, review Q21,23,26–27 and lecture.)"],
  ]],
  ["pressure-gauge pressure-range pressure-pickup low-pressure-risk high-pressure-risk pressure-variation quantity-dipstick quantity-sender", [
    ["Read the correct indication", "Pressure is shown in psi, with the source's pickup at the pump outlet. Quantity is the amount of oil, checked by dipstick or a tank sender/cockpit gauge. A pressure reading is not a direct measurement of tank quantity. (PDF p2–3, review Q24 and lecture.)"],
    ["Why pressure matters", "Low pressure risks starvation; excessive pressure can damage seals/gaskets. Air in the gauge system or low quantity can cause variations, so a changing reading alone does not prove one cause. The lecture's 35–90 psi range depends on engine model. (PDF p3, lecture.)"],
  ]],
  ["no-pressure pressure-interval", [
    ["Connect the indication to supply", "The gauge monitors oil pressure, not simply quantity. Failure to establish pressure after start raises concern about lubricating supply; low pressure risks starvation. That explains why the review calls for shutdown instead of increasing power. (PDF p2–3, review Q24 and lecture.)"],
    ["Remember the course value", "The review quotes 15–20 seconds without a pressure rise after start. Learn that value for this review, while recognizing that actual starting limits and actions are aircraft/engine-specific. (PDF p2, review Q24.)"],
  ]],
  ["temp-circuit warmup temperature-probe", [
    ["Trace the indication", "A probe/bulb senses oil temperature and wiring carries the input to the cockpit indicator. Wheatstone-bridge and ratiometer circuits are the two indication arrangements named. They concern temperature, rather than quantity or filter condition. (PDF p2–3, review Q29 and lecture.)"],
    ["Connect temperature to operation", "Cold oil is thicker and resists flow; hot oil is thinner and can lose its protective film if excessively hot. The review cautions against high power before adequate warm-up. Temperature matters because it affects lubricant behaviour. (PDF p1–2, review Q7,29.)"],
  ]],
  ["metal-debris filter-inspection cooler-overhaul cooler-testing", [
    ["Use trapped material as evidence", "Oil transports contaminants and filter media/screens retain debris. The lecture describes opening/unfolding filter paper to examine it. Metal particles, shavings or flakes can indicate premature/excessive wear; examining only the outside canister misses trapped material. (PDF p2–3, review Q30 and lecture.)"],
    ["Connect inspection with servicing", "The review describes removing/flushing the cooler at overhaul. The lecture adds cleaning/replacement for contamination and manufacturer-specified pressure testing after cleaning/repair. Debris is evidence to evaluate using approved criteria, rather than a complete diagnosis by itself. (PDF p2–3, review Q28,30 and lecture.)"],
  ]],
  ["oil-dilution dilution-purpose dilution-timing dilution-evaporation", [
    ["Follow the sequence", "On applicable large radial engines in extreme cold, fuel is introduced near the oil pump before shutdown. It helps resist oil congealing and aids lubrication at the next startup. As oil warms after startup, fuel evaporates and exits through the crankcase breather. (PDF p2–3, review Q31 and lecture.)"],
    ["Keep the purpose clear", "Dilution addresses extreme-cold oil behaviour. It is not filtration, a dispersant additive or a permanent replacement for oil. The source describes fitted equipment on applicable aircraft, not a general instruction to add fuel to other engines' oil. (PDF p2–3, review Q31 and lecture.)"],
  ]],
];

export const enginesLearningNotesByTarget = Object.fromEntries(lessons.flatMap(([targets, notes]) => targets.split(" ").map(target => [target, notes])));
