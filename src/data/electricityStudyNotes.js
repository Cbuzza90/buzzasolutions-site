export const electricityNoteSections = [
  { id: "atoms", title: "Atoms, ions & current", items: [
    ["Atomic structure", "Protons (+) and neutrons (neutral) are in the nucleus. Electrons (−) occupy the region outside it; valence electrons are in the outermost occupied shell."],
    ["Lose an electron", "A neutral atom becomes a positive ion, or cation."],
    ["Gain an electron", "A neutral atom becomes a negative ion, or anion. Gaining or losing electrons to form ions is ionization."],
    ["Free electrons", "Mobile charge carriers let a conductor carry current under an applied electric field. Copper conducts readily; rubber, glass and ordinary plastics are insulators."],
    ["Current · ampere", "Current is the rate at which electric charge flows, measured in amperes (A). It is different from voltage, which is a difference in electric potential."]
  ] },
  { id: "sources", title: "All six sources of electricity", items: [
    ["Friction", "Contact and separation transfer electrons between surfaces, leaving a charge imbalance."],
    ["Pressure", "A piezoelectric material develops a voltage when mechanical pressure or deformation separates charge in it. Pressure is the source of electricity tested in this question."],
    ["Heat", "A thermocouple is a device made from dissimilar conductors whose junction temperatures produce a small voltage difference (EMF). It illustrates electricity produced by heat."],
    ["Light", "A photovoltaic cell is a device that converts incoming light directly into electrical energy. It illustrates electricity produced by light."],
    ["Chemical action", "Battery reactions maintain a potential difference between terminals."],
    ["Magnetism", "Electromagnetic induction means producing EMF by changing the magnetic flux linking a conductor. Magnetic flux describes the magnetic field passing through an area. A stationary conductor in an unchanging field does not continuously generate EMF."]
  ] },
  { id: "resistance", title: "Resistance · all four factors", items: [
    ["Material", "Resistivity describes how strongly a material opposes electric current. Nichrome is a high-resistance nickel-chromium alloy. It has greater resistance than copper, silver or aluminum when length, cross-sectional area and temperature are equal."],
    ["Length", "Longer conducting path means higher resistance, with other factors unchanged."],
    ["Cross-sectional area", "A thicker conductor means lower resistance, with material, length and temperature unchanged."],
    ["Temperature", "Ordinary copper resistance increases as temperature rises."],
    ["Voltage / electromotive force (EMF)", "Voltage is electrical potential difference: energy transferred per unit charge. A source's EMF describes the energy it supplies per unit charge; both are measured in volts. The course uses electrical pressure as a memory aid for voltage."],
    ["Units", "Resistance: ohms (Ω). Potential difference/EMF: volts (V). Current: amperes (A). Power: watts (W)." ]
  ] },
  { id: "circuits", title: "Series, parallel & circuit laws", items: [
    ["Series", "One current path: the same current through every component. Total resistance is the sum of the individual resistances."],
    ["Parallel", "Branches connected across the same two nodes have the same voltage. Adding a positive-resistance branch lowers total resistance; the result is below the smallest branch resistance."],
    ["Voltage drop", "Potential difference across a component as energy is transferred."],
    ["Ohm's law", "V = I × R. At fixed resistance, increasing voltage increases current. Practice Test #1 tests these relationships without arithmetic. Resistor Band Calculations requires numerical answers."],
    ["Kirchhoff's Voltage Law", "With consistent signs, voltage rises and drops around a closed loop sum to zero."],
    ["Kirchhoff's Current Law", "Total current entering a node equals total current leaving it."]
  ] },
  { id: "bands", title: "Resistor bands & variable resistors", items: [
    ["Four-band order", "First significant digit; second significant digit; multiplier; tolerance."],
    ["Tolerance", "Gold: ±5%. Silver: ±10%. No tolerance band: ±20%. The last band on a four-band resistor is tolerance."],
    ["Voltage divider", "A resistor network that takes an output voltage from a point between series resistances. A potentiometer is an adjustable voltage divider when all three terminals are used."],
    ["Wiper", "The movable electrical contact on a variable resistor. It touches different positions along the resistive element as the shaft or slider moves."],
    ["Potentiometer", "A potentiometer is an adjustable resistor with two end terminals and a movable contact called a wiper. Using all three terminals as a voltage divider selects an output voltage. Your supplied quiz gives volume control as an application: moving the wiper changes the signal level. It does not create extra voltage."],
    ["Rheostat", "A rheostat is a variable resistor used with two terminals: a wiper and one end of the resistive element. In series with a load, changing its resistance changes the current. Potentiometer operation selects voltage; rheostat operation varies series resistance."]
  ] },
  { id: "meters", title: "Meter connections, shunts & multipliers", items: [
    ["Ammeter · series", "An ammeter measures current in amperes. Connect it in series so the load current passes through it. Use the correct current input, ratings and range; de-energize for connection and observe DC polarity."],
    ["Ammeter shunt", "A shunt is a low-resistance bypass connected in parallel with the sensitive meter movement. Most of the measured current takes this path, extending the ammeter range while only a small portion passes through the movement."],
    ["Voltmeter · parallel", "A voltmeter measures the potential difference between two points, in volts. Connect it in parallel across those points or across the load."],
    ["Voltmeter multiplier", "A multiplier resistor is a high-value resistor in series with an analog voltmeter movement. It limits movement current so the meter can measure a higher voltage range. This is different from the multiplier colour band on a resistor."],
    ["Ohmmeter", "An ohmmeter measures resistance in ohms by applying its own test source and observing the response. A conventional analog series ohmmeter contains a battery. Remove external power and safely discharge stored energy before testing."],
    ["Megohmmeter", "A megohmmeter, or insulation resistance tester, measures very high resistance to assess insulation leakage. It applies a specified elevated DC test voltage. Isolate the circuit and check equipment suitability; connected electronics may be damaged."]
  ] },
  { id: "instruments", title: "Analog movements, DMMs & oscilloscopes", items: [
    ["Galvanometer", "A galvanometer is a sensitive current-detecting meter movement. In a permanent-magnet moving-coil type, current in the coil interacts with the magnet, turning a pointer against a restoring spring. The moving-coil movement is the measuring mechanism inside the instrument."],
    ["Meter sensitivity", "Current sensitivity describes how much current is needed for full-scale deflection. A more sensitive movement needs less current to move its pointer to the full-scale mark."],
    ["Full-scale deflection", "The pointer reaching the maximum marked reading of the selected meter range."],
    ["Damping / electrical damping", "Damping reduces repeated pointer movement (oscillation) so a reading settles promptly. Your supplied quiz names electrical damping as the ammeter method."],
    ["Mechanical zero vs ohms zero", "Mechanical zero adjustment sets the pointer's resting position with no input. Ohms-zero adjustment is a separate calibration of an analog resistance scale with the probes shorted together. These adjustments serve different purposes."],
    ["Digital multimeter (DMM)", "One instrument with a numerical display and selectable measurement functions, including voltage, current and resistance. Choose the correct function, input sockets and range for the measurement."],
    ["Accuracy", "How closely a reading agrees with a known reference or true value. It is different from resolution; compare the instrument specifications rather than assuming every digital meter is more accurate than every analog meter."],
    ["Low-battery indication", "The meter's low-battery indicator means its internal battery needs attention. An open-circuit display or a negative-polarity sign means something different."],
    ["Resolution", "Resolution is the smallest change a meter can display on the selected range. More display digits do not, by themselves, guarantee a more accurate reading."],
    ["Diode test", "A diode is a semiconductor component that normally conducts much more readily in its forward direction than in reverse. The DMM diode-test mode checks forward voltage drop and reverse blocking behaviour for an isolated diode."],
    ["Wheatstone bridge", "A Wheatstone bridge is a resistance-comparison circuit with two branches and a detector between their intermediate points. Known resistances are compared with the unknown resistance. At balance, those points have equal voltage and no current flows through the detector."],
    ["Waveform", "The shape of an electrical signal plotted over time. Amplitude is its height or magnitude, rather than its repetition rate."],
    ["Cycle", "One complete repetition of a repeating waveform."],
    ["Period / cycle time", "The time taken for one complete cycle. An oscilloscope lets you read this from the time axis."],
    ["Frequency", "The number of cycles per second, measured in hertz (Hz). Shorter cycle time means higher frequency; waveform amplitude alone does not establish frequency."],
    ["AC and DC", "Alternating current (AC) reverses direction repeatedly. Direct current (DC) flows in one direction, though its size can vary. These terms describe the signal being measured."],
    ["Oscilloscope", "An oscilloscope displays a signal's voltage against time as a waveform. Multiple channels let you compare signals. It can show AC, DC levels and brief changes called transients. It is different from a meter that mainly gives a numerical reading."]
  ] },
  { id: "static-power", title: "Aircraft static & power terminology", items: [
    ["Static electricity", "Accumulated charge imbalance, rather than sustained current. Precipitation/particle contact can charge an aircraft."],
    ["Static wicks", "Dissipate charge to reduce radio interference. They are not the aircraft's primary lightning protection."],
    ["Watt", "A unit of power: one joule per second. P = V × I; resistor power can also be expressed as I²R or V²/R."],
    ["Horsepower", "Mechanical power, or rate of doing work. James Watt developed and popularized the rating."]
  ] }
];
