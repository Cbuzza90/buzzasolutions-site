export const electricityNoteSections = [
  { id: "atoms", title: "Atoms, ions & current", items: [
    ["Atomic structure", "Protons (+) and neutrons (neutral) are in the nucleus. Electrons (−) occupy the region outside it; valence electrons are in the outermost occupied shell."],
    ["Lose an electron", "A neutral atom becomes a positive ion, or cation."],
    ["Gain an electron", "A neutral atom becomes a negative ion, or anion. Gaining or losing electrons to form ions is ionization."],
    ["Free electrons", "Mobile charge carriers let a conductor carry current under an applied electric field. Copper conducts readily; rubber, glass and ordinary plastics are insulators."],
    ["Current · ampere", "Rate of charge flow. Voltage is potential difference; resistance opposes current; power is the rate of energy transfer."]
  ] },
  { id: "sources", title: "All six sources of electricity", items: [
    ["Friction", "Contact and separation transfer electrons between surfaces, leaving a charge imbalance."],
    ["Pressure", "Deforming a piezoelectric material separates charge and produces voltage."],
    ["Heat", "A thermocouple uses a temperature difference across dissimilar-material junctions to produce EMF."],
    ["Light", "A photovoltaic cell converts incident light into electrical energy."],
    ["Chemical action", "Battery reactions maintain a potential difference between terminals."],
    ["Magnetism", "Changing magnetic flux linking a conductor induces EMF. A stationary conductor in an unchanging field does not continuously generate EMF."]
  ] },
  { id: "resistance", title: "Resistance · all four factors", items: [
    ["Material", "Resistivity depends on material. Nichrome has higher resistance than copper, silver or aluminum when geometry and temperature are equal."],
    ["Length", "Longer conducting path means higher resistance, with other factors unchanged."],
    ["Cross-sectional area", "A thicker conductor means lower resistance, with material, length and temperature unchanged."],
    ["Temperature", "Ordinary copper resistance increases as temperature rises."],
    ["Units", "Resistance: ohms (Ω). Potential difference/EMF: volts (V). Current: amperes (A). Power: watts (W)." ]
  ] },
  { id: "circuits", title: "Series, parallel & circuit laws", items: [
    ["Series", "One current path: the same current through every component. Total resistance is the sum of the individual resistances."],
    ["Parallel", "Branches connected across the same two nodes have the same voltage. Adding a positive-resistance branch lowers total resistance; the result is below the smallest branch resistance."],
    ["Voltage drop", "Potential difference across a component as energy is transferred."],
    ["Ohm's law", "V = I × R. At fixed resistance, increasing voltage increases current. These notes and this test require no arithmetic."],
    ["Kirchhoff's Voltage Law", "With consistent signs, voltage rises and drops around a closed loop sum to zero."],
    ["Kirchhoff's Current Law", "Total current entering a node equals total current leaving it."]
  ] },
  { id: "bands", title: "Resistor bands & variable resistors", items: [
    ["Four-band order", "First significant digit; second significant digit; multiplier; tolerance."],
    ["Tolerance", "Gold: ±5%. Silver: ±10%. No tolerance band: ±20%. The last band on a four-band resistor is tolerance."],
    ["Potentiometer", "Three terminals used as a voltage divider: both ends and a wiper."],
    ["Rheostat", "Wiper and one end terminal used as a two-terminal series variable resistance to control load current."]
  ] },
  { id: "meters", title: "Meter connections, shunts & multipliers", items: [
    ["Ammeter · series", "Insert it in the load's current path. Use the correct current input, ratings and range; de-energize for connection and observe DC polarity."],
    ["Ammeter shunt", "Low resistance in parallel with the movement diverts most of the measured current around it."],
    ["Voltmeter · parallel", "Connect across the two points whose potential difference is being measured."],
    ["Voltmeter multiplier", "High resistance in series with an analog movement limits current at the selected voltage range."],
    ["Ohmmeter", "Uses its own test source. Remove external power and safely discharge stored energy first. A conventional analog series ohmmeter contains a battery."],
    ["Megohmmeter", "Tests high insulation resistance using a specified elevated DC test voltage. Isolate the circuit and check equipment suitability; connected electronics may be damaged."]
  ] },
  { id: "instruments", title: "Analog movements, DMMs & oscilloscopes", items: [
    ["Galvanometer", "Current in a coil interacts with a permanent magnet to create pointer torque against a restoring spring."],
    ["Sensitivity & damping", "Greater current sensitivity means less current for full scale. Damping reduces oscillation so the pointer settles."],
    ["Mechanical zero vs ohms zero", "Mechanical adjustment sets the resting pointer. Ohms adjustment calibrates the resistance scale with shorted probes."],
    ["DMM resolution vs accuracy", "Resolution: smallest displayed change on a range. Accuracy: agreement with the true value. A low-battery indicator is different from an open-circuit or negative-polarity indication."],
    ["Diode test", "The DMM diode mode checks forward voltage drop and reverse blocking behaviour for an isolated diode."],
    ["Wheatstone bridge", "Compares known and unknown resistances. At balance, the detector has no current."],
    ["Oscilloscope", "Plots voltage against time; multiple channels compare signals. It can display AC, DC levels and transients. Cycle time establishes frequency; amplitude alone does not."]
  ] },
  { id: "static-power", title: "Aircraft static & power terminology", items: [
    ["Static electricity", "Accumulated charge imbalance, rather than sustained current. Precipitation/particle contact can charge an aircraft."],
    ["Static wicks", "Dissipate charge to reduce radio interference. They are not the aircraft's primary lightning protection."],
    ["Watt", "A unit of power: one joule per second. P = V × I; resistor power can also be expressed as I²R or V²/R."],
    ["Horsepower", "Mechanical power, or rate of doing work. James Watt developed and popularized the rating."]
  ] }
];
