export const enginesTest3Path = "/study/engines/module-3";

export const enginesTest3Diagrams = {
  timing: {
    src: "/engines/test3-valve-timing.png",
    alt: "Example four-stroke timing chart showing ignition, valve events and shaded overlap around exhaust TDC.",
    crop: { x: 0, y: 0, width: 830, height: 602, imageWidth: 830, imageHeight: 602 },
  },
  numbering: {
    src: "/engines/test3-cylinder-numbering.png",
    alt: "Single-row radial, double-row radial and opposed examples. On the double-row radial, red numbers mark the odd rear row and yellow numbers mark the even front row.",
    crop: { x: 0, y: 0, width: 683, height: 337, imageWidth: 683, imageHeight: 337 },
  },
};

// Each row pairs a condensed study topic with a question. The engine shuffles the options.
const topics = [
  {
    id: "engine-cycles", title: "Operating cycles", source: "Questions pp. 4–10 and Condensed pp. 6–18",
    entries: [
      ["tdc", "Top dead centre (TDC)", "Where is the piston when cylinder volume above it is smallest?", ["Top dead centre", "Bottom dead centre", "Mid-stroke on compression", "Mid-stroke on intake"], "Top dead centre is the highest piston position. The volume above it is the clearance volume."],
      ["bdc", "Bottom dead centre (BDC)", "Where is the piston when cylinder volume above it is greatest?", ["Bottom dead centre", "Top dead centre", "Mid-stroke on power", "Mid-stroke on exhaust"], "Bottom dead centre is the lower limit of piston travel. The volume above it includes both swept and clearance volumes."],
      ["intake", "Intake stroke", "Which stroke uses downward piston travel to draw a fresh charge into the cylinder?", ["Intake", "Compression", "Power", "Exhaust"], "On intake, the descending piston draws in the fresh charge through the open intake valve."],
      ["compression", "Compression stroke", "Which stroke squeezes the trapped charge as the piston rises before ignition?", ["Compression", "Exhaust", "Intake", "Power"], "On compression, the rising piston reduces the volume available to the trapped charge after the intake valve closes."],
      ["ignition", "Ignition event", "Which event starts combustion near the end of compression in the gasoline four-stroke cycle?", ["Ignition", "Exhaust", "Intake", "Valve overlap"], "Ignition is the spark that starts combustion late in compression, so it is an event within a stroke."],
      ["power", "Power stroke", "During which stroke do expanding gases drive the piston down?", ["Power", "Exhaust", "Compression", "Intake"], "On the power stroke, pressure from expanding combustion gases pushes the piston down. The connecting rod transfers force to the crankshaft."],
      ["exhaust", "Exhaust stroke", "Which stroke uses upward piston travel to remove spent gases through an open valve?", ["Exhaust", "Compression", "Intake", "Power"], "The rising piston clears combustion products through the open exhaust valve."],
      ["events", "Four strokes and five events", "What is the correct sequence of events in a gasoline four-stroke cycle?", ["Intake, compression, ignition, power, exhaust", "Intake, ignition, compression, power, exhaust", "Intake, compression, power, ignition, exhaust", "Intake, power, compression, ignition, exhaust"], "The four strokes are intake, compression, power and exhaust. The fifth event is ignition, which occurs during compression."],
      ["revolutions", "Crankshaft revolutions", "How many crankshaft revolutions does one four-stroke cycle take?", ["Two", "One", "Three", "Four"], "One full cycle takes two crankshaft rotations (720°). Each cylinder has one power stroke during those two rotations."],
      ["ports", "Two-stroke port control", "What covers and uncovers the cylinder ports in the two-stroke design illustrated?", ["Piston", "Crankshaft counterweight", "Magneto distributor", "Exhaust manifold"], "The moving piston passes across the ports, exposing or closing the openings that gases flow through."],
      ["two-stroke", "Two-stroke advantages and limitations", "Which trade-off describes the two-stroke designs used in the course’s ultralight examples?", ["Simple and light, with lower efficiency and harder cooling", "Simple and light, with greater efficiency and easier cooling", "Heavier and more complex, with lower efficiency and harder cooling", "Heavier and more complex, with greater efficiency and easier cooling"], "Simplicity and low weight suit ultralights and some light sport aircraft. Lower efficiency, cooling difficulty and limited power constrain larger applications."],
    ],
  },
  {
    id: "engine-timing", title: "Mechanical valve timing", source: "Questions pp. 8–14 and Condensed p. 13", diagramKey: "timing",
    notes: [
      ["Timing chart legend", "BTC and ATC mean before and after top centre. BBC and ABC mean before and after bottom centre. The shaded triangle marks valve overlap."],
    ],
    entries: [
      ["timing-reference", "Timing reference", "What is the angular reference for valve and ignition events?", ["Crankshaft degrees", "Camshaft degrees", "Magneto rotor degrees", "Accessory shaft degrees"], "Crankshaft degrees relate each valve or ignition event to piston position in the cycle."],
      ["intake-open", "Intake valve opening", "When does the intake valve start opening in the illustrated cycle?", ["Before the intake stroke", "After the intake stroke", "Late in compression", "Early in the power stroke"], "The intake valve opens late in the exhaust stroke. Outgoing gases can help draw in the fresh charge."],
      ["intake-close", "Intake valve closing", "When does the intake valve finish closing in the illustrated cycle?", ["After the intake stroke", "Before the intake stroke", "Late in the power stroke", "Just before the exhaust stroke"], "The intake valve stays open past BDC into early compression, extending the time available for the charge to enter."],
      ["exhaust-open", "Exhaust valve opening", "When does the exhaust valve start opening in the illustrated cycle?", ["Before the exhaust stroke", "After the exhaust stroke", "Late in compression", "At the start of intake"], "The exhaust valve opens late in the power stroke. Cylinder pressure starts driving the spent gases out before the piston rises."],
      ["exhaust-close", "Exhaust valve closing", "When does the exhaust valve finish closing in the illustrated cycle?", ["After the exhaust stroke", "Before the exhaust stroke", "Late in compression", "At the start of the power stroke"], "The exhaust valve stays open into early intake, creating an interval when both valves are open."],
      ["overlap", "Valve overlap", "What happens around TDC between exhaust and intake during valve overlap?", ["Both valves are open", "Both valves are closed", "Only the intake valve is open", "Only the exhaust valve is open"], "The intake valve starts opening before the exhaust valve finishes closing. Outgoing exhaust can help draw in a fresh charge and that flow aids cylinder cooling."],
      ["camshaft", "Camshaft", "What controls mechanical valve timing in the four-stroke engine?", ["Camshaft", "Magneto distributor", "Starter ring gear", "Throttle plate"], "The camshaft uses its lobes to control valve timing and is driven from the crankshaft."],
      ["cam-speed", "Camshaft speed", "How fast does the camshaft turn relative to the crankshaft in the illustrated four-stroke design?", ["Half as fast", "Twice as fast", "At the same speed", "One-quarter as fast"], "One camshaft rotation schedules the valve events for a complete cycle while the crankshaft turns twice."],
    ],
  },
  {
    id: "engine-ignition", title: "Cylinder numbering, firing order and ignition",
    source: "Questions pp. 16–21, Condensed p. 31 and Review pp. 42–54", diagramKey: "numbering",
    notes: [
      ["Cylinder diagram legend", "In the double-row example, red labels mark the odd rear-row cylinders and yellow labels mark the even front-row cylinders."],
      ["Single-row radial firing pattern", "The review’s seven- and nine-cylinder examples fire odd-numbered cylinders in sequence, then even-numbered cylinders in sequence. The impulses follow the rotating crank throw."],
      ["Opposed-engine numbering", "The crankcase markings identify the cylinders on the opposed engines discussed. Use the engine manual to confirm cylinder numbering and firing order for that model."],
    ],
    entries: [
      ["front", "Engine front", "Which end defines the front of the engine for cylinder numbering?", ["Propeller shaft end", "Accessory end", "End nearest the aircraft nose", "End nearest the firewall"], "The propeller shaft end defines the engine front regardless of its orientation in the airframe."],
      ["rear", "Engine rear", "Which end defines the rear of the engine?", ["Accessory end", "Propeller shaft end", "End nearest the aircraft tail", "End with the No. 1 cylinder"], "The engine rear is the accessory end. Its definition stays tied to the engine even if the installation changes."],
      ["single-radial", "Single-row radial numbering", "From the pilot’s perspective, how are cylinders numbered on the illustrated single-row radial?", ["From the top, clockwise", "From the top, counterclockwise", "From the bottom, clockwise", "From the bottom, counterclockwise"], "The diagram places No. 1 at the top and continues clockwise as viewed from the pilot’s position."],
      ["radial-rear", "Double-row radial rear row", "Which cylinders occupy the rear row in the illustrated double-row radial?", ["Odd numbers, with No. 1 at the top", "Even numbers, with No. 2 at the top", "The lowest consecutive numbers", "The highest consecutive numbers"], "The condensed drawing places No. 1 at top aft. The rest of that row also uses odd numbers, while even numbers occupy the front row."],
      ["radial-front", "Double-row radial front row", "Which numbers identify the front row of the illustrated double-row radial?", ["Even numbers starting at No. 2", "Odd numbers starting at No. 1", "The lowest consecutive numbers", "The highest consecutive numbers"], "The condensed drawing labels the front row with even numbers, interleaved with the odd numbers in the rear row."],
      ["firing-order", "Firing order", "What does an engine’s firing order specify?", ["The sequence of cylinder power events", "The numbering sequence around the crankcase", "The sequence in which one cylinder’s valves close", "The order in which spark plugs are serviced"], "The manufacturer selects the sequence of power events to balance the engine and reduce vibration. Cylinder numbering identifies physical locations."],
      ["spark-advance", "Spark advance", "When does the normal spark occur on the four-stroke cycle shown?", ["Before TDC late in compression", "After TDC early in intake", "Before BDC late in power", "After BDC early in exhaust"], "The spark starts combustion near the end of compression, before the piston starts the power stroke. The exact advance depends on the engine."],
      ["magneto", "Magneto", "Which component generates the ignition pulse in the conventional engine described?", ["Magneto", "Starter motor", "Alternator regulator", "Throttle plate"], "The self-contained magneto uses a rotating magnet and coil to generate electricity for the high-voltage pulse that fires the spark plug."],
      ["distributor", "Magneto distributor", "What routes the magneto’s output to the spark plug leads in sequence?", ["Distributor", "Starter ring gear", "Ignition timing mark", "Crankcase"], "The distributor sends the high-voltage pulse into the lead for the appropriate cylinder, following the firing order."],
      ["redundancy", "Dual ignition and redundancy", "Why are two magnetos installed in the conventional system shown?", ["To provide independent ignition paths", "To combine current for starting", "To set independent valve timing", "To drive the propeller at two speeds"], "Two magnetos, two sets of high-tension leads and two plugs per cylinder provide redundancy. One path can still supply spark if the other fails."],
      ["timing-cylinder", "No. 1 compression reference", "Which cylinder and stroke does the course use as the magneto-to-engine timing reference?", ["No. 1 on compression", "No. 1 on exhaust", "No. 2 on intake", "No. 2 on power"], "No. 1 on compression defines the approach to the firing position. The piston also reaches TDC at the end of exhaust, so identifying the stroke matters."],
      ["timing-mark", "Ignition timing marks", "Where are the timing marks found on many Lycoming engines in the review?", ["Starter ring gear", "Intake manifold", "Exhaust collector", "Oil sump"], "Many Lycoming examples use the starter ring gear. Locations vary with engine design, and the engine maintenance manual identifies the required marks and settings."],
    ],
  },
  {
    id: "engine-induction", title: "Induction, fuel metering and carburetor icing", source: "Questions pp. 23–33 and Condensed pp. 39–51",
    entries: [
      ["scoop", "Air scoop", "Which part collects outside induction air at the engine cowling?", ["Air scoop", "Intake manifold", "Throttle plate", "Fuel nozzle"], "The cowling air scoop directs incoming air into ducting leading to the filter."],
      ["filter", "Air filter", "Which component keeps dirt and sand out of the induction airflow?", ["Air filter", "Fuel metering nozzle", "Heat exchanger", "Manifold pressure gauge"], "The filter at or near the scoop traps foreign material before it reaches the engine."],
      ["manifold", "Intake manifold", "What distributes the incoming charge through passages leading to the cylinders?", ["Intake manifold", "Air scoop", "Exhaust collector", "Magneto distributor"], "The intake manifold routes the charge to the cylinders through pipes or passages after the inlet and metering stages."],
      ["slip-joint", "Induction slip joint", "Why does the intake pipe use a sealed slip joint in the arrangement shown?", ["To allow movement as cylinders expand and contract", "To vent manifold pressure during ignition", "To admit warm air during icing", "To meter fuel at each cylinder"], "The joint accommodates movement while keeping unmetered air out. An induction leak can alter the intended fuel-to-air ratio."],
      ["alternate-air", "Alternate air valve", "What provides another air path around a blocked normal inlet on an aircraft equipped with this feature?", ["Alternate air valve", "Mixture control", "Fuel shutoff valve", "Exhaust wastegate"], "An alternate air valve opens a path around a restriction in the normal induction inlet."],
      ["map", "Manifold absolute pressure (MAP)", "What does a MAP gauge indicate?", ["Absolute pressure in the intake manifold", "Pressure above ambient in the exhaust manifold", "Pressure at each fuel nozzle", "Peak cylinder pressure during power"], "Manifold absolute pressure is intake manifold pressure referenced to a vacuum. The gauge used in the course reads in inches of mercury."],
      ["map-units", "Inches of mercury (inHg)", "What units does the course use for manifold pressure?", ["Inches of mercury (inHg)", "Pounds per hour (lb/h)", "Foot-pounds (ft·lb)", "Revolutions per minute (RPM)"], "Inches of mercury describe pressure. A MAP gauge expresses intake manifold absolute pressure in these units."],
      ["throttle", "Black throttle control", "What does the black throttle control regulate in the illustrated carburetor?", ["Airflow through the throttle plate", "Fuel-to-air ratio through the mixture linkage", "Air routing through the carburetor heat valve", "Spark timing through the magnetos"], "The throttle moves a plate that regulates airflow. At a given engine speed, opening it increases manifold pressure and power."],
      ["mixture", "Red mixture control", "What does the red mixture control change?", ["Fuel metered relative to the airflow", "Airflow through the main throttle plate", "Nozzle count in the metering system", "The manifold pressure gauge reference"], "Changing the fuel metered into the airflow adjusts the fuel-to-air ratio."],
      ["carburetor", "Carburetor nozzle", "How is fuel supplied to the cylinders in the basic carburetor layout taught?", ["One common nozzle meters fuel into the airflow for all cylinders", "A separate nozzle meters fuel at each intake port", "One nozzle supplies each exhaust port", "A nozzle at the scoop meters fuel before the air filter"], "In this basic carburetor design fuel mixes into a common airstream. Intake passages carry the resulting charge to the cylinders."],
      ["injection", "Port fuel injection", "Where does the illustrated port-injection system meter fuel into the airflow?", ["At a nozzle near each cylinder’s intake port", "At a single nozzle upstream of the common manifold", "At a nozzle in each exhaust collector", "At a common nozzle before the filter"], "An individual nozzle meters fuel for each cylinder. This helps distribute fuel-to-air ratios more evenly."],
      ["icing", "Carburetor icing", "Which combination can produce an ice blockage in the carburetor throat?", ["Cooling of the throat and enough moisture to freeze", "Rising throat temperature and dry air", "Increased fuel pressure and a clogged nozzle", "Warm inlet air and reduced humidity"], "Ice can form when the throat cools enough in moist air. The ice restricts airflow and reduces the charge reaching the cylinders."],
      ["carb-heat", "Carburetor heat", "What does the carburetor heat valve do when heat is selected?", ["Routes warmed air to the carburetor", "Increases spark voltage", "Enlarges the normal inlet filter area", "Sends exhaust directly through the carburetor"], "The heat valve selects an air path warmed by the heat exchanger. Warmer induction air helps clear ice from the throat."],
    ],
  },
  {
    id: "engine-exhaust-boost", title: "Exhaust, altitude and boost", source: "Questions pp. 34–36 and Condensed pp. 52–56, 74–76",
    entries: [
      ["exhaust-system", "Exhaust system and scavenging", "What is the basic gas-flow role of the exhaust system?", ["Carries combustion gases away from the cylinders", "Routes the fresh charge to the intake ports", "Distributes fuel to the nozzles", "Circulates cooling air around the cylinders"], "The exhaust system collects and carries spent gases away. This removal is part of scavenging."],
      ["heat-muff", "Heater muff and heat exchanger", "What recovers exhaust heat for cabin heat or carburetor heat in the course example?", ["Heater muff", "Exhaust valve spring", "Induction filter", "Magneto cooling duct"], "The heater muff transfers exhaust heat to a separate airflow for the cabin heater or carburetor heat supply."],
      ["density", "Altitude and air density", "Why does a naturally aspirated engine take in less air mass per cycle as altitude increases?", ["Ambient air becomes less dense", "The cylinders develop less swept volume", "The camshaft changes the valve sequence", "Geometric compression ratio decreases"], "Ambient pressure and density fall as altitude increases. A given cylinder volume then holds less air mass."],
      ["turbo", "Turbocharger", "How does a turbocharger help sustain engine output as ambient pressure falls?", ["Uses exhaust energy to compress intake air", "Reduces swept volume to maintain pressure", "Advances the magnetos with altitude", "Increases fuel flow without compressing intake air"], "Exhaust energy drives the turbocharger. The compressor raises manifold pressure, allowing a greater air mass into a given cylinder volume."],
      ["boost", "Turbocharging and supercharging", "What can boosting increase without changing the engine’s displacement?", ["Air mass inducted per cycle", "Piston stroke length", "Cylinder bore", "Clearance volume"], "A turbocharger or supercharger raises intake pressure and increases the charge mass in a given cylinder volume. This can support greater output."],
    ],
  },
  {
    id: "engine-performance", title: "Pressure, work, horsepower and efficiency", source: "Condensed pp. 58–74 and Review pp. 95–115",
    entries: [
      ["energy", "Energy conversion", "What directly turns combustion heat into mechanical motion at the piston?", ["Pressure from expanding gas", "Torque from the magneto", "Heat transfer to the exhaust wall", "Fuel pressure at the metering nozzle"], "Combustion releases chemical energy as heat. Expanding gases push the piston and the crankshaft converts its linear motion into rotation."],
      ["kinetic", "Kinetic energy", "Which energy does a turning propeller have because it is moving?", ["Kinetic energy", "Chemical potential energy", "Elastic potential energy", "Gravitational potential energy"], "Kinetic energy is energy of motion, including the rotation of the propeller."],
      ["potential", "Potential energy", "What kind of energy is stored in gasoline before combustion?", ["Chemical potential energy", "Rotational kinetic energy", "Gravitational potential energy", "Elastic potential energy"], "Fuel stores chemical energy that can be released as heat by combustion."],
      ["boyle", "Boyle’s law", "For a fixed amount of gas at constant temperature, what happens to absolute pressure when volume decreases?", ["Pressure increases", "Pressure decreases", "Pressure stays constant", "Pressure falls to atmospheric pressure"], "Boyle’s law describes the inverse relationship between absolute pressure and volume at constant temperature."],
      ["work", "Mechanical work", "What makes expanding gas driving a piston an example of mechanical work?", ["The gas exerts force through a distance", "The gas exerts force on a stationary piston", "The crankshaft runs for a given time", "The charge contains chemical energy"], "Work involves a force acting through displacement. Gas pressure acts on the piston as the piston moves."],
      ["power-rate", "Power and horsepower (HP)", "Two engines perform the same work. Which develops greater average power?", ["The one that finishes in less time", "The one that finishes in more time", "The one that starts at higher altitude", "Both have equal power because their work is equal"], "Power is the rate of doing work, and horsepower is a unit of power. Doing the same work faster requires higher average power."],
      ["displacement", "Piston displacement", "Which volume is swept by one piston between TDC and BDC?", ["Volume at BDC minus clearance volume at TDC", "Volume at BDC including the clearance volume", "Clearance volume alone", "Intake manifold volume"], "Displacement is the volume swept by the piston. Bore area and stroke determine it, and total displacement includes every cylinder’s swept volume."],
      ["ratio", "Compression ratio", "Which volumes define geometric compression ratio?", ["Total cylinder volume at BDC compared with clearance volume at TDC", "Clearance volume at TDC compared with total volume at BDC", "Swept volume compared with total volume at BDC", "Intake manifold volume compared with exhaust manifold volume"], "Compression ratio compares the greatest volume above the piston at BDC with the least volume above it at TDC. The BDC volume includes swept and clearance volume."],
      ["ihp", "Indicated horsepower (IHP)", "Which type of horsepower describes the power developed inside the cylinders?", ["Indicated", "Brake", "Friction", "Thrust"], "Indicated horsepower represents the work rate developed by cylinder pressure acting on the pistons, before internal losses."],
      ["bhp", "Brake horsepower (BHP)", "Which type of horsepower describes useful power at the engine output shaft?", ["Brake", "Indicated", "Friction", "Thrust"], "Brake horsepower is available at the output shaft after internal losses. Shaft torque and rotational speed determine it."],
      ["fhp", "Friction horsepower (FHP)", "What accounts for the gap between indicated horsepower and brake horsepower?", ["Friction horsepower", "Thrust horsepower", "Additional brake horsepower", "Propeller slippage"], "Friction horsepower is the difference between indicated and brake horsepower. It represents internal losses and power required to turn the engine."],
      ["thp", "Thrust horsepower (THP)", "Which measure describes useful propulsive power after propeller losses?", ["Thrust horsepower", "Brake horsepower", "Indicated horsepower", "Friction horsepower"], "Thrust horsepower is useful propulsive power after losses in the propeller. Brake horsepower is the shaft power supplied to it."],
      ["torque", "Torque and the Prony brake", "What does a Prony brake measure using reaction force on a lever arm?", ["Output shaft torque", "Cylinder gas pressure", "Propeller thrust", "Fuel flow"], "Torque is a twisting moment. The Prony brake uses a reaction force at a known perpendicular lever arm to determine the shaft torque."],
      ["imep", "Indicated mean effective pressure (IMEP)", "What does IMEP represent in the course’s power model?", ["An equivalent average cylinder pressure representing indicated work", "The highest instantaneous cylinder pressure", "The absolute pressure in the intake manifold", "The pressure of air acting on the propeller"], "IMEP expresses indicated work as an equivalent average pressure over the swept volume. Actual cylinder pressure varies through the engine cycle."],
      ["bsfc", "Brake specific fuel consumption (BSFC)", "What does a lower BSFC mean at the same brake power?", ["Less fuel mass used per hour", "More fuel mass used per hour", "Greater propeller friction losses", "Higher manifold pressure in every case"], "BSFC is the fuel mass consumed per hour per unit of brake horsepower. At the same shaft power, a lower value means less fuel is used."],
      ["mechanical-efficiency", "Mechanical efficiency", "Which comparison shows how much power developed in the cylinder reaches the output shaft?", ["Brake horsepower relative to indicated horsepower", "Indicated horsepower relative to brake horsepower", "Inducted air volume relative to swept volume", "Useful work relative to fuel energy"], "Mechanical efficiency expresses brake horsepower as a fraction of indicated horsepower, showing how much cylinder power remains after internal losses."],
      ["thermal-efficiency", "Thermal efficiency", "Which comparison describes thermal efficiency?", ["Useful work relative to available fuel energy", "Output shaft power relative to cylinder power", "Inducted air volume relative to swept volume", "Thrust horsepower relative to brake horsepower"], "Thermal efficiency measures how much of the fuel’s potential energy becomes useful work. Heat carried away through exhaust and cooling reduces that fraction."],
      ["volumetric-efficiency", "Volumetric efficiency", "Which measure reflects how effectively cylinders fill relative to their swept volume?", ["Volumetric efficiency", "Mechanical efficiency", "Thermal efficiency", "Propeller efficiency"], "Volumetric efficiency concerns cylinder filling. Air density, induction restrictions, valve timing and boost can affect how much charge enters."],
    ],
    notes: [
      ["PLANK — P", "Indicated mean effective pressure, expressed in psi in the course formula."],
      ["PLANK — L", "Piston stroke length, expressed in feet in the course formula."],
      ["PLANK — A", "Piston head area, expressed in square inches."],
      ["PLANK — N", "Power strokes per minute for one cylinder. A four-stroke cylinder delivers one power stroke per two crankshaft revolutions."],
      ["PLANK — K", "Number of cylinders contributing to total indicated horsepower."],
    ],
  },
  {
    id: "engine-abnormal-combustion", title: "Pre-ignition and detonation", source: "Condensed pp. 79–82 and Review pp. 116–119",
    entries: [
      ["pre-ignition", "Pre-ignition", "The charge begins burning before the scheduled spark because of a hot spot. What is this?", ["Pre-ignition", "Detonation", "Normal spark advance", "Valve overlap"], "Pre-ignition starts at a hot spot before the spark. Early burning can drive up heat and pressure while the piston is still rising."],
      ["detonation", "Detonation", "A spark starts the normal flame, then the remaining unburned mixture auto-ignites abruptly. What is this?", ["Detonation", "Pre-ignition", "Normal flame propagation", "Valve overlap"], "Detonation occurs after normal ignition begins. Abrupt auto-ignition of the remaining charge causes pressure spikes that can damage engine parts."],
      ["detonation-risk", "Detonation risk factors", "Which conditions can promote detonation in the course examples?", ["Low-octane fuel and high charge temperature", "Effective cooling and adequate octane", "Low charge temperature and reduced load", "A clean air filter and specified timing"], "Low octane makes the unburned charge more prone to auto-ignition. High temperatures and pressures increase that tendency."],
      ["symptoms", "Abnormal combustion symptoms", "Which clue distinguishes pre-ignition from detonation when both cause heat and rough running?", ["When abnormal burning starts relative to the normal spark", "Whether cylinder head temperature rises", "Whether the engine runs roughly", "Whether engine power falls"], "Both can raise cylinder head temperature (CHT), reduce power and cause roughness. Pre-ignition starts before spark, while detonation follows the start of normal ignition."],
    ],
  },
];

export const enginesTest3Questions = topics.flatMap(({ entries, source }) =>
  entries.map(([id, learningTarget, prompt, options, explanation]) => ({
    id,
    learningTarget,
    prompt,
    options,
    explanation,
    correctIndex: 0,
    learningNotes: [["Course reference", source]],
  }))
);

export const enginesTest3NoteSections = [
  ...topics.map(({ id, title, entries, source, diagramKey, notes = [] }) => ({
    id,
    title,
    diagramKey,
    items: [...entries.map(([, label, , , explanation]) => [label, explanation]), ...notes, ["Course reference", source]],
  })),
  {
    id: "engine-test3-source-checks",
    title: "Source checks",
    items: [
      ["Double-row radial numbering", "Questions p. 17 and Review p. 43 reverse the front and rear rows in their text while putting No. 1 at top aft. Condensed p. 31 and its diagram agree on odd numbers aft and even numbers forward."],
      ["Five events", "Condensed p. 9 repeats compression as the last event. Questions p. 5 and Condensed p. 7 correctly list exhaust as the final event."],
      ["Ignition and valve angles", "Review p. 46 gives an approximate advance while Questions p. 19 gives a wider range. Timing angles shown are examples. Use the specific engine maintenance manual for approved settings."],
      ["Horsepower relationships", "Review p. 96 is ambiguous about actual horsepower. Review pp. 100 and 104 identify brake horsepower as output and indicated minus brake horsepower as friction horsepower."],
      ["Manifold pressure and density", "Condensed p. 74 describes manifold pressure as air weight. MAP measures absolute pressure. The hot-day example on p. 75 is about reduced density as air warms at a given pressure."],
    ],
  },
];
