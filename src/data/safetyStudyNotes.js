export const safetyNoteSections = [
  { id: "fire", title: "Fire classes, colours & extinguisher agents", items: [
    ["Class A · green triangle", "Ordinary combustibles: wood, paper and cloth. A suitably rated water extinguisher cools the material. CO₂ may allow deeply smouldering material to reignite.", "/safety/fire-class-a.svg"],
    ["Class B · red square", "Flammable liquids, including fuel, solvent and oil. Suitable agents include rated foam, CO₂ or dry chemical. A water stream can spread burning liquid.", "/safety/fire-class-b.svg"],
    ["Class C · blue circle", "Energized electrical equipment. Use an agent rated for energized equipment, such as appropriately rated CO₂ or dry chemical. Isolate power if safe.", "/safety/fire-class-c.svg"],
    ["Class D · yellow star", "Combustible metals, such as magnesium. Use Class D dry powder approved for the particular metal. An ABC rating does not cover D.", "/safety/fire-class-d.svg"],
    ["Read the label", "These are traditional fire-class symbols, not cylinder paint colours. The extinguisher's rating and instructions determine its use. Suitably rated foam commonly covers A/B; CO₂ commonly covers B/C; ABC dry chemical can leave residue."]
  ] },
  { id: "fire-response", title: "Fire triangle, PASS & escape", items: [
    ["Fire triangle", "Fuel, heat and oxygen. Removing one can stop combustion."],
    ["PASS", "Pull the pin; Aim at the base; Squeeze the handle; Sweep side to side."],
    ["Response", "Raise the alarm. Use an extinguisher only when trained and conditions permit, with a clear escape route behind you. Unknown fire or unsuitable equipment: evacuate and get emergency help."],
    ["CO₂ hazard", "CO₂ can displace oxygen in an enclosed space. Do not treat its lack of residue as a lack of hazard."],
    ["Inspection & servicing", "Required weighing can reveal loss of agent, particularly for CO₂. A partially discharged extinguisher needs the required servicing or recharge before return."]
  ] },
  { id: "pear", title: "PEAR · all four categories", items: [
    ["P · People", "The people doing the work: capabilities, condition, experience and interactions."],
    ["E · Environment", "Lighting, temperature, noise and the physical/work surroundings."],
    ["A · Actions", "The tasks, steps and demands of the work being performed."],
    ["R · Resources", "Current manuals, approved tools, equipment, information and support available to do the work."]
  ] },
  { id: "dirty-dozen", title: "Dirty Dozen · all twelve factors", items: [
    ["Lack of communication", "Important work status is not passed on, such as a disconnected component at shift change."],
    ["Complacency", "Self-satisfaction reduces vigilance toward possible dangers."],
    ["Lack of knowledge", "The person lacks the training or understanding needed for the task."],
    ["Distraction", "An interruption draws attention away from the current step. Re-establish the last completed step before resuming."],
    ["Lack of teamwork", "People do not coordinate their work effectively."],
    ["Fatigue", "Tiredness can impair cognition, coordination and reaction time."],
    ["Lack of resources", "Required tools, current information or support are unavailable."],
    ["Pressure", "A deadline or other demand creates urgency to rush the work."],
    ["Lack of assertiveness", "A person does not voice a valid concern. Explain the specific issue and seek a safe resolution."],
    ["Stress", "Physical, psychological or physiological demands create strain."],
    ["Lack of awareness", "The person fails to recognize the consequences of an action."],
    ["Norms", "An unofficial shortcut becomes accepted because everyone does it, despite the approved procedure."]
  ] },
  { id: "shop", title: "Shop safety, PPE & housekeeping", items: [
    ["Responsibility", "Everyone shares responsibility for safety. Clean as you work; clean equipment and return it to its designated storage."],
    ["Walkways & exits", "Use designated pedestrian walkways. Know emergency exit locations and keep access clear."],
    ["PPE vs guards", "PPE is worn on the person; a fixed machine guard controls access at the equipment. Replace damaged required PPE before starting."],
    ["Clothing & jewellery", "Loose clothing can become caught in machinery; jewellery can also create electrical hazards."],
    ["Defects & missing tools", "Remove defective equipment from use and report it through the procedure. Resolve a missing-tool inventory before releasing work."],
    ["Stored pressure", "Before servicing a hydraulic system, isolate it and safely release stored pressure according to the procedure."]
  ] },
  { id: "storage", title: "Cylinders, liquids & identification", items: [
    ["Compressed gas cylinders", "Normally store upright and secured, valve closed and protective cap fitted where applicable."],
    ["Flammable liquids", "Use approved containers in designated flammable-liquid storage."],
    ["Unknown liquids", "Verify identification and applicable handling information. Appearance or smell is not a reliable substitute."]
  ] },
  { id: "models", title: "Error models & cause analysis", items: [
    ["Active error", "An error during the work, such as incorrectly tightening a fitting."],
    ["Latent failure", "A hidden weakness that may remain dormant before contributing to an event."],
    ["Swiss Cheese", "Weaknesses in several defences can align, allowing a hazard through."],
    ["Fishbone / Ishikawa", "A cause-and-effect diagram organizes possible causes. A branch is a hypothesis to investigate, not proof."],
    ["Heinrich's domino example", "Your slides identify a person's social environment as the first domino in the original model."]
  ] },
  { id: "disciplines", title: "Human factors disciplines & course facts", items: [
    ["Anthropometry", "Dimensions and physical abilities of the human body."],
    ["Cognitive science", "The mind as an information processor."],
    ["Organizational psychology", "People's relationships with work, organizational structure and job satisfaction."],
    ["Computer science", "The discipline assigned to human-computer interaction in your introduction slides."],
    ["Safety engineering", "Identify hazards and design systems to remain safe when failures occur."],
    ["Why human factors?", "Improve quality, reduce errors and improve worker/aircraft safety. The 80% figure is the statement in your supplied slides, not a universal statistic."]
  ] }
];
