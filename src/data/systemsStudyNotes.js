export const systemsNoteSections = [
  { id: "fluids", title: "Fluid colours, families & seals", items: [
    ["Blue · MIL-H-7644", "Vegetable base (castor oil/alcohol); natural rubber seals. Historical fluid family included in the review."],
    ["Red · MIL-H-5606", "Petroleum/mineral base; neoprene is the seal material named in the course key. Buna-N is another mineral-fluid seal material in FAA references."],
    ["Purple · phosphate ester", "Skydrol / HyJet; the review refers to BMS 3-11. Butyl or ethylene-propylene seals. Fire-resistant does not mean fireproof."],
    ["Red · MIL-H-83282", "Synthetic hydrocarbon fluid; the review identifies compatibility with MIL-H-5606. This is not permission to substitute on every aircraft."],
    ["Identification trap", "Colour is a clue, not a unique specification. Confirm the approved fluid and seal specifications. Different incompatible fluid families can damage seals; approved phosphate-ester fluids can be mutually compatible, subject to aircraft approval."]
  ] },
  { id: "principles", title: "Pressure, force & flow", items: [
    ["Pascal’s law", "A pressure change applied to a confined liquid at rest is transmitted equally and undiminished. Equal pressure does not mean equal piston force."],
    ["Pressure vs force", "Pressure is force per unit area. At the same pressure, a larger piston area produces more force."],
    ["Force vs travel", "An ideal system trades travel for force. A larger output piston moves less for the same displaced volume; it does not create energy."],
    ["Static head", "For the same liquid and surface pressure, bottom pressure depends on vertical depth, not container shape or total volume."],
    ["Work vs power", "Work depends on force and movement in its direction. Power is the rate of doing work. No numerical calculations are included in these practice tests."]
  ] },
  { id: "properties", title: "Fluid properties that are easy to confuse", items: [
    ["Viscosity", "Internal resistance to flow. Colder liquid is generally more viscous; warmer liquid is less viscous. Different fluids need not have equal viscosity at the same temperature."],
    ["Saybolt viscosimeter", "Assesses viscosity using controlled flow time through an opening."],
    ["Chemical stability", "Resistance to oxidation and deterioration, separate from resistance to flow."],
    ["Flash point", "Vapour ignites momentarily when a flame is applied."],
    ["Fire point", "Enough vapour is released to sustain burning. Remember: flash = brief; fire = sustained."],
    ["Useful fluid qualities", "Suitable flow behaviour, stability, lubrication and material compatibility. Keep contamination, moisture and unwanted air out."]
  ] },
  { id: "layouts", title: "Open centre vs closed centre", diagramKey: "open-centre", items: [
    ["Open centre", "In the basic review circuit, neutral selector passages are in series. Flow goes reservoir → pump → neutral selectors → reservoir."],
    ["Closed centre", "Neutral supply passages are blocked; operating pressure remains available. Selectors are supplied in parallel."],
    ["Stored energy", "An accumulator, when installed, stores hydraulic energy. A closed-centre label alone does not mean every system has an accumulator."],
    ["Multiple actuators", "Parallel supply allows several demands, but available pressure and pump flow must support them."],
    ["Terminology trap", "A closed hydraulic brake circuit is not automatically the same classification as a closed-centre selector circuit."]
  ] },
  { id: "valves", title: "All six pressure-control components", items: [
    ["Pressure regulator", "Controls normal system pressure within a preset range."],
    ["System relief valve", "Backup protection against excessive system pressure; not the normal regulator."],
    ["Thermal relief valve", "Protects trapped fluid from pressure caused by heating, even without pump input."],
    ["Pressure reducer", "Maintains a lower downstream pressure for a branch or component."],
    ["Debooster", "Reduces pressure while increasing delivered fluid displacement for the brake application in the review."],
    ["Unloading valve", "Returns excess pump flow to the reservoir when pressure demand has been met."],
    ["Settings trap", "The PDF’s 150% relief example is a course example, not a universal aircraft setting. Use the actual system limits."]
  ] },
  { id: "reservoirs", title: "Reservoirs & all three pressurizing methods", diagramKey: "reservoirs", items: [
    ["Reservoir", "Stores the fluid supply, receives return fluid, allows expansion and volume changes, and helps air separate."],
    ["Integral vs in-line", "Left diagram: integral reservoir built into the unit. Right diagram: separate in-line reservoir connected by tubing."],
    ["Why pressurize?", "Maintain a positive supply at the pump inlet, especially at altitude. Reservoir pressure is not the same as actuator operating pressure."],
    ["Bleed air", "Air from an engine or APU pressurizes the reservoir in designs using this method."],
    ["Bootstrap", "Uses hydraulic system pressure through a piston arrangement to maintain reservoir pressure."],
    ["Aspirator", "The third reservoir-pressurizing method named in the course review, alongside bleed air and bootstrap."],
    ["Power pack", "Self-contained unit: electric pump, pressure-control valves, selector valves and reservoir."]
  ] },
  { id: "components", title: "Numbered components & stored energy", diagramKey: "components", items: [
    ["Diagram key", "1 = thermal relief valve; 2 = filter; 3 = system relief valve; 4 = accumulator; 5 = reservoir."],
    ["Accumulator vs reservoir", "Accumulator stores energy; reservoir stores the fluid supply. A gas-charged accumulator stores energy by compressing separated gas."],
    ["Check valve", "Allows flow in one direction and prevents reverse flow, helping retain a charged portion of the circuit."],
    ["Filter", "Removes contaminants. It does not store energy or replace pressure-control valves."]
  ] },
  { id: "actuators", title: "Actuators & brakes", diagramKey: "actuators", items: [
    ["A · single-acting", "Hydraulic pressure drives one direction; a spring, gas pressure or another opposing force provides return. The sketch uses a spring."],
    ["B · double-acting", "Hydraulic ports reach both sides of the piston. Pressure is directed to one side while the other returns fluid."],
    ["Rod-side area", "The rod reduces effective piston area on that side. Equal pressures can therefore produce different extension and retraction forces."],
    ["Brake examples", "The review contrasts the early rubber expander-tube brake with a floating disc-brake example. Actual aircraft brake designs vary."]
  ] }
];
