import electricitySource from "./electricity-module1-test1.json" with { type: "json" };
import { systemsHydraulicsQuestions } from "./systemsHydraulics.js";
import { systemsMixedQuestions } from "./systemsMixedTest.js";

// Each prompt targets one source-backed word. Keep the source's full explanation and diagram.
function recallBank(source, definitions) {
  const rows = definitions.trim().split("\n").map(row => row.split("|"));
  const originals = new Map(source.map(question => [String(question.id), question]));
  if (rows.length !== source.length || new Set(rows.map(row => row[0])).size !== source.length) throw new Error("Incomplete recall bank");
  return rows.map(([id, prompt, answer, aliases = ""]) => {
    const original = originals.get(id);
    if (!original || !prompt || !answer || /\s/.test(answer)) throw new Error(`Invalid recall question ${id}`);
    return { id: original.id, prompt, answer, acceptedAnswers: [answer, ...aliases.split(";").filter(Boolean)], explanation: original.explanation, ...(original.diagram ? { diagram: original.diagram } : {}), sourcePrompt: original.prompt };
  });
}

export const electricityRecallQuestions = recallBank(electricitySource, `
1|The nucleus contains protons and which neutral particles?|neutrons|neutron
2|Which atomic particle carries a negative charge?|electron|electrons
3|A neutral atom loses an electron and becomes a positive ion, also called a ___.|cation|positive ion;positive
4|A neutral atom gains an electron and becomes a negative ion, also called an ___.|anion|negative ion;negative
5|What process forms ions by gaining or losing electrons?|ionization|ionisation
6|Electrons in the outermost occupied shell are called ___ electrons.|valence|
7|An applied electric field produces a net movement of free ___ in a metal.|electrons|electron
8|Which metal named in the supplied quiz is an example of a good electrical conductor?|copper|
9|Which high-resistance alloy is named in the supplied quiz?|nichrome|
10|An accumulated charge imbalance is ___ electricity.|static|
11|Rain and snow contacting an aircraft can cause precipitation ___.|static|
12|Aircraft static discharge ___ release charge to reduce radio interference.|wicks|wick;static wicks;static wick
13|Friction, pressure, heat, light and chemical action are five basic electricity sources. What is the sixth?|magnetism|magnetic induction;electromagnetic induction
14|Rubbing insulating materials together can transfer which negatively charged particles?|electrons|electron
15|A piezoelectric crystal generates voltage through mechanical ___.|pressure|stress;deformation
16|A thermocouple generates EMF from a temperature difference. Which basic electricity source is this?|heat|
17|A photovoltaic cell converts which energy source into electricity?|light|sunlight
18|Battery reactions maintain a potential ___ between the terminals.|difference|
19|To induce EMF, the magnetic flux linking a conductor must ___.|change|vary
20|What is the rate of charge flow called?|current|electric current;electrical current
21|What is the unit of electric current?|ampere|amperes;amp;amps;a
22|What electrical potential difference can drive current through a circuit?|voltage|emf;electromotive force
23|What is the unit of electrical resistance?|ohm|ohms;Ω
24|Material, length and cross-sectional area are three resistance factors. What is the fourth?|temperature|
25|A longer wire of unchanged material and area has higher or lower resistance?|higher|greater;increased;increases
26|A thicker wire of unchanged material and length has higher or lower resistance?|lower|less;decreased;decreases
27|Heating ordinary copper normally makes its resistance increase or decrease?|increase|increases;rise;rises
28|A watt measures the rate of energy transfer. What quantity is this?|power|
29|James ___ developed and popularized horsepower as an engine power rating.|Watt|James Watt
30|Horsepower measures mechanical ___.|power|
31|Which quantity is the same through every component in a simple DC series circuit?|current|
32|Which quantity is the same across parallel branches connected to the same two nodes?|voltage|potential difference
33|The potential difference across a current-carrying resistor is called a voltage ___.|drop|
34|Total series resistance is the ___ of the individual resistances.|sum|total
35|Adding a positive-resistance parallel branch makes total resistance increase or decrease?|decrease|decreases;fall;falls;reduce;reduces
36|Parallel equivalent resistance is greater or less than the smallest positive branch resistance?|less|lower;smaller
37|The algebraic sum of voltages around a closed loop is ___.|zero|0
38|Total current entering a circuit node ___ total current leaving it.|equals|equal;matches
39|In Ohm's law V = I × R, which letter represents current?|I|
40|At constant resistance, increasing voltage makes current increase or decrease?|increase|increases;rise;rises
41|In the DC power equation P = V × I, which letter represents power?|P|
42|In a four-band resistor, the third band is the ___.|multiplier|
43|No tolerance band on a standard resistor indicates plus/minus ___ percent.|twenty|20
44|Which tolerance-band colour indicates plus/minus five percent?|gold|
45|A three-terminal voltage-divider variable resistor is called a ___.|potentiometer|pot
46|Galvanometer pointer torque results from ___ interaction between the coil and permanent magnet.|magnetic|magnetism;electromagnetic
47|Greater current sensitivity means more or less current for full-scale deflection?|less|lower
48|What feature reduces pointer oscillation in an analog meter?|damping|
49|Which pointer-zero adjustment sets an analog meter's resting position: mechanical or ohms?|mechanical|mechanical zero
50|An ammeter is connected in ___ with the load.|series|
51|Before inserting an ammeter, the circuit power should be on or off?|off|deenergized;de-energized;removed
52|The low-resistance parallel path around an ammeter movement is called a ___.|shunt|shunt resistor
53|A voltmeter is connected in ___ across the load.|parallel|
54|A high-resistance series resistor extending a voltmeter's range is called a ___ resistor.|multiplier|
55|Before resistance measurement, remove external power and safely ___ stored energy.|discharge|
56|Which internal source drives test current in a conventional analog series ohmmeter?|battery|cell
57|Which instrument tests very high insulation resistance?|megohmmeter|megger;insulation tester;insulation resistance tester
58|An insulation tester applies a specified elevated DC test ___.|voltage|
59|Which DMM indicator signals that its battery needs attention: low-battery or open-circuit?|low-battery|low battery;battery;low-battery indicator
60|The smallest increment a DMM can display is its ___.|resolution|
61|To test a diode's forward drop, use the DMM's ___ mode.|diode-test|diode;diode test
62|A Wheatstone bridge determines an unknown ___.|resistance|
63|Which instrument displays voltage against time and can compare multiple waveforms?|oscilloscope|scope
64|For waveform frequency, measure the time for one complete ___.|cycle|period
`);

export const systemsRecallQuestions = recallBank(systemsHydraulicsQuestions, `
1|The Greek word behind hydraulics means ___.|water|
2|Pressure applied to confined fluid is transmitted equally and undiminished according to ___'s law.|Pascal|Pascals;Pascal's;Pascal law;Pascal's law
3|Static pressure for a given liquid depends on the vertical ___ of its column.|height|depth
4|To multiply force at equal pressure, the output piston must be larger or smaller than the input piston?|larger|bigger;greater
5|A liquid's internal resistance to flow is called ___.|viscosity|
6|Cooling hydraulic liquid generally makes viscosity increase or decrease?|increase|increases;rise;rises
7|The course names the ___ universal viscosimeter.|Saybolt|
8|Resistance to oxidation and deterioration is chemical ___.|stability|chemical stability
9|Momentary vapour ignition when a flame is applied occurs at the ___ point.|flash|flash point
10|Vapour ignition that sustains burning occurs at the ___ point.|fire|fire point
11|What colour is the review's vegetable-base MIL-H-7644 fluid?|blue|
12|Vegetable-base fluid is paired with ___ rubber seals.|natural|natural rubber
13|What colour is mineral-base MIL-H-5606 fluid?|red|
14|Which synthetic rubber does the review list for MIL-H-5606 seals?|neoprene|
15|What colour is the review's phosphate-ester BMS 3-11 fluid?|purple|light purple;violet
16|Which phosphate-ester brand is named as most commonly used?|Skydrol|
17|Phosphate-ester-compatible seals include ethylene-propylene and ___ rubber.|butyl|butyl rubber
18|MIL-H-83282 is backward compatible with MIL-H-___.|5606|MIL-H-5606;MIL H 5606
19|Neutral flow passes through selectors and back to the reservoir in an ___-centre system.|open|open centre;open center
20|In the review's basic open-centre circuit, selectors are arranged in ___.|series|
21|Neutral supply passages are blocked while pressure remains available in a ___-centre system.|closed|closed centre;closed center
22|The review's closed-centre selectors are supplied in ___.|parallel|
23|Which component stores hydraulic energy for later use?|accumulator|
24|A self-contained electric pump, valves and reservoir form a hydraulic power ___.|pack|power pack;powerpack
25|A reservoir built into the power pack is described as ___.|integral|integrated
26|A separate reservoir connected by tubing or hose is described as ___.|in-line|inline;in line
27|Which component removes contaminants from circulating hydraulic fluid?|filter|
28|Reservoir pressurization ensures a positive fluid supply at the ___ inlet.|pump|
29|Engine or APU ___ air can pressurize a reservoir.|bleed|bleed air
30|Reservoir pressurization using hydraulic system pressure is called ___.|bootstrap|bootstrapping
31|Which pressure-control component maintains normal pressure within a preset range? Pressure ___.|regulator|pressure regulator
32|If regulation fails, backup overpressure protection comes from the system ___ valve.|relief|system relief valve;pressure relief valve;relief valve
33|Heating trapped fluid requires a ___ relief valve.|thermal|thermal relief valve
34|A lower-pressure branch can be supplied through a pressure ___.|reducer|pressure reducer;pressure-reducing valve;reducing valve
35|Excess pump flow can return to the reservoir at low load through an ___ valve.|unloading|unloading valve
36|Which brake component reduces pressure while increasing delivered fluid volume?|debooster|de-booster
38|The review's early rubber expander-tube brake uses a ___ hydraulic circuit.|closed|closed system
39|The review highlights a floating ___ brake.|disc|disk
40|An actuator driven hydraulically in one direction with spring or gas return is ___-acting.|single|single acting;single-acting
41|An actuator driven hydraulically on both sides is ___-acting.|double|double acting;double-acting
`);

export const systemsAppliedRecallQuestions = recallBank(systemsMixedQuestions, `
1|Compared with a gas, a hydraulic liquid has low ___.|compressibility|
2|A pressure change reaches confined pistons equally, but different areas can produce different ___.|forces|force
3|For the same liquid, depth and surface pressure, different container shapes have equal bottom ___.|pressure|pressures
4|An ideal larger output piston gives more force but less ___.|travel|movement;displacement
5-1|Cooling makes a liquid harder to move through a passage by increasing its ___.|viscosity|
5-2|Under identical flow conditions, a slower-flowing liquid generally has higher or lower viscosity?|higher|greater
5-3|Warming hydraulic liquid generally makes viscosity increase or decrease?|decrease|decreases;fall;falls
5-4|Different fluids at equal temperature must have equal viscosity: true or false?|false|no
5-5|Pressure is force per unit ___.|area|
5-6|What property does the Saybolt universal viscosimeter assess?|viscosity|
6|Brief vapour ignition without sustained burning is the ___ point.|flash|flash point
7-1|Both MIL-H-5606 and MIL-H-83282 can be what colour?|red|
7-2|The review's mineral fluid has a ___ base.|petroleum|mineral;oil;kerosene
7-3|In the fluid-family comparison, phosphate ester is paired with ethylene-propylene or ___ rubber.|butyl|butyl rubber
7-4|The fluid property resisting oxidation is chemical ___.|stability|chemical stability
8|Compatibility does not replace checking the aircraft's approved fluid ___.|specification|specifications
9|Which seal material conflicts with phosphate ester in the review: neoprene or butyl?|neoprene|
10|Suitable hydraulic fluid needs chemical stability and lubricating ___.|ability|properties;property
11-1|Keeping hydraulic systems and containers sealed helps exclude ___.|contamination|contaminants;moisture;air
11-2|Mixing incompatible fluid families can cause seals to swell and ___ down.|break|breakdown
12|With the illustrated open-centre selectors neutral, pump flow returns to the ___.|reservoir|
13-1|Closed-centre selectors receive pressure through ___ branches.|parallel|
13-2|Which component stores hydraulic energy rather than just holding the fluid supply?|accumulator|
13-3|Several actuators operating together need enough pressure and pump ___.|flow|
14|The neutral supply passage of the review's closed-centre selector is open or blocked?|blocked|closed
15|When the pump stops, a charged ___ can briefly release stored energy.|accumulator|
16-1|A localized self-contained hydraulic unit is a power ___.|pack|power pack;powerpack
16-2|A power pack contains an electric pump, pressure-control valves, selector valves and a ___.|reservoir|
17|Which reservoir is integral in the two diagrams: left or right?|left|
18|A reservoir must allow space for thermal ___.|expansion|
19-1|A pressurized reservoir maintains positive supply at the ___ inlet at altitude.|pump|
19-2|Hydraulic pressure acting through a piston arrangement pressurizes a ___ reservoir.|bootstrap|bootstrapping
20|The early rubber expander-tube brake example has a ___ hydraulic circuit.|closed|
21|Hydraulic brake pistons press friction surfaces against the ___.|disc|disk
22|Which sketch is single-acting with spring return: A or B?|A|
23-1|Normal hydraulic pressure is controlled by a pressure ___.|regulator|pressure regulator
23-2|Backup protection against excessive system pressure comes from a system ___ valve.|relief|system relief valve;pressure relief valve
23-3|Trapped fluid that warms needs a ___ relief valve.|thermal|thermal relief valve
23-4|A branch requiring lower pressure uses a pressure ___.|reducer|pressure reducer;pressure-reducing valve
23-5|Which brake component trades pressure for greater fluid displacement?|debooster|de-booster
23-6|At the required pressure, excess fixed-displacement pump flow returns through an ___ valve.|unloading|unloading valve
24|A system relief valve provides backup protection, while normal pressure control belongs to the ___.|regulator|pressure regulator
25-1|Component 1 is a ___ relief valve.|thermal|thermal relief valve
25-2|Which component is labelled 2?|filter|
25-3|Component 3 is the ___ relief valve.|system|system relief valve
25-4|Which component is labelled 4?|accumulator|
25-5|Which component is labelled 5?|reservoir|
26-1|The diagram shows selectors in series in an ___-centre system.|open|open centre;open center
26-2|After passing through both neutral selectors, pump flow returns to the ___.|reservoir|
27|Which sample represents phosphate-ester BMS 3-11: left or right?|right|
28-1|At equal piston areas, higher pressure produces more or less force?|more|greater;higher
28-2|At equal pressure, which piston produces more force: larger or smaller?|larger|bigger
28-3|At equal applied force, which input piston area creates higher pressure: smaller or larger?|smaller|less
28-4|On the rod side, the rod reduces the effective piston ___.|area|
28-5|At equal piston area, which stroke displaces more fluid: longer or shorter?|longer|
28-6|At equal force along the motion, a longer movement means more ___.|work|
28-7|Doing the same work in less time requires greater average ___.|power|
28-8|An ideal hydraulic force multiplier conserves ___ rather than creating it.|energy|
29-1|Phosphate ester is paired with butyl and ethylene-___ elastomers.|propylene|ethylene-propylene;ethylene propylene
29-2|Vegetable-base MIL-H-7644 uses ___ rubber seals.|natural|natural rubber
29-3|Which review seal material is paired with mineral-base MIL-H-5606?|neoprene|
29-4|Fire-resistant means completely fireproof: true or false?|false|no
29-5|In a gas-charged accumulator, the compressible storage medium is the ___.|gas|nitrogen
29-6|A ___ valve allows one-way flow and helps retain accumulator charge.|check|check valve
29-7|Alongside bleed air and bootstrap, which third reservoir-pressurizing method is named?|aspirator|
30-1|For a fixed gas mass at constant temperature, pressure and volume follow ___'s law.|Boyle|Boyles;Boyle's;Boyle's law
30-2|For a fixed gas mass at constant pressure, volume and temperature follow ___'s law.|Charles|Charles's;Charles law;Charles's law
30-3|For ideal steady incompressible flow at the same elevation, speed and static pressure along a streamline follow ___'s principle.|Bernoulli|Bernoullis;Bernoulli's;Bernoulli's principle
30-4|Equal bottom pressures in different-shaped containers illustrate the hydrostatic ___.|paradox|hydrostatic paradox
30-5|The reversible motor/pump arrangement is a hydraulic power ___.|pack|power pack;powerpack
30-6|In state A, neutral-valve flow returns to the ___.|reservoir|
30-7|The labelled closed-centre circuit stores hydraulic energy in an ___.|accumulator|
30-8|Under otherwise equal conditions, a more readily flowing liquid has higher or lower viscosity?|lower|less
30-9|Anti-foam additives limit formation of ___.|foam|foaming
30-10|Corrosion-inhibiting additives help limit ___.|corrosion|
30-11|Which fluid family does the review associate with blue MIL-H-7644?|vegetable|vegetable-base;vegetable based
30-12|The vegetable fluid contains ___ oil and alcohol.|castor|castor oil
30-13|A reservoir allows unwanted entrained ___ to separate from fluid.|air|
30-14|Contaminants remaining suspended in fluid are removed by a ___.|filter|
30-15|Extra reservoir capacity supplies a fluid ___ for limited losses.|reserve|
30-16|The review lists a dipstick or sight ___ for fluid quantity.|gauge|gage
30-17|The review's almost-100% efficiency wording means real losses are zero: true or false?|false|no
30-18|Flight controls and landing gear are hydraulic applications. Which wheel system is also listed?|brakes|brake
`);
