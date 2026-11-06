export const ataModulePath = "/study/publications/module-2";
export const ataPracticePath = `${ataModulePath}/ata-codes`;
export const ataStudySheetPath = `${ataModulePath}/ata-study-sheet`;
export const ataProgressKey = `${ataPracticePath}:review:v2`;
export const ataDeckTitle = "ATA A3.01_ A3.08_ AB.02.pptx";
const groups = {
  general:"Aircraft general", systems:"Airframe systems", structures:"Structures", powerplant:"Powerplant",
};
// Chapter titles come from the supplied ATA slides. Quiz scope comes only from
// Test 2 Material Worksheet: its chapter list plus 01 and 02, asked separately.
export const ataReviewCodes = [1,2,6,12,24,25,28,33,49,57,73,79];
const reviewCodes = new Set(ataReviewCodes);
const rows = [
  [1,"Maintenance Policy","general",8],
  [2,"Operations","general",8],
  [5,"Time Limits / Maintenance Checks","general",8],
  [6,"Dimensions and Areas","general",8],
  [7,"Lifting and Shoring","general",8],
  [8,"Leveling and Weighing","general",8],
  [9,"Towing and Taxi","general",8],
  [10,"Parking, Mooring, Storage and Return to Service","general",8],
  [11,"Placards and Markings","general",8],
  [12,"Servicing - Routine Maintenance","general",8],
  [18,"Vibration and Noise Analysis (Helicopter Only)","general",8],
  [20,"Standard Practices - Airframe","systems",9],
  [21,"Air Conditioning and Pressurization","systems",9],
  [22,"Auto Flight","systems",9],
  [23,"Communications","systems",9],
  [24,"Electrical Power","systems",9],
  [25,"Equipment / Furnishings","systems",9],
  [26,"Fire Protection","systems",9],
  [27,"Flight Controls","systems",9],
  [28,"Fuel","systems",9],
  [29,"Hydraulic Power","systems",9],
  [30,"Ice and Rain Protection","systems",9],
  [31,"Indicating / Recording System","systems",9],
  [32,"Landing Gear","systems",9],
  [33,"Lights","systems",9],
  [34,"Navigation","systems",9],
  [35,"Oxygen","systems",9],
  [36,"Pneumatic","systems",10],
  [37,"Vacuum / Pressure","systems",10],
  [38,"Water / Waste","systems",10],
  [39,"Electrical - Electronic Panels and Multipurpose Components","systems",10],
  [40,"Multisystem","systems",10],
  [41,"Water Ballast","systems",10],
  [42,"Integrated Modular Avionics","systems",10],
  [44,"Cabin Systems","systems",10],
  [45,"Diagnostic and Maintenance System","systems",10],
  [46,"Information Systems","systems",10],
  [47,"Nitrogen Generation System","systems",10],
  [48,"In Flight Fuel Dispensing","systems",10],
  [49,"Airborne Auxiliary Power","systems",10],
  [50,"Cargo and Accessory Compartments","systems",10],
  [51,"Standard Practices and Structures - General","structures",11],
  [52,"Doors","structures",11],
  [53,"Fuselage","structures",11],
  [54,"Nacelles / Pylons","structures",11],
  [55,"Stabilizers","structures",11],
  [56,"Windows","structures",11],
  [57,"Wings","structures",11],
  [61,"Propellers","powerplant",12],
  [62,"Main Rotor(s)","powerplant",12],
  [63,"Main Rotor Drive(s)","powerplant",12],
  [64,"Tail Rotor","powerplant",12],
  [65,"Tail Rotor Drive","powerplant",12],
  [66,"Rotor Blade / Tail Pylon","powerplant",12],
  [67,"Rotors Flight Control","powerplant",12],
  [70,"Standard Practices Engine","powerplant",12],
  [71,"Powerplant","powerplant",12],
  [72,"Engine General","powerplant",12],
  [73,"Engine - Fuel and Control","powerplant",12],
  [74,"Ignition","powerplant",12],
  [75,"Bleed Air","powerplant",13],
  [76,"Engine Controls","powerplant",13],
  [77,"Engine Indicating","powerplant",13],
  [78,"Exhaust","powerplant",13],
  [79,"Oil","powerplant",13],
];
export const ataChapters=rows.filter(([number])=>reviewCodes.has(number)).map(([number,title,group,slide])=>({number,code:String(number).padStart(2,"0"),title,group,slide}));
export const ataCodeQuestions=ataChapters.flatMap(chapter=>{
  const nearby=(list)=>list.sort((a,b)=>Math.abs(a.number-chapter.number)-Math.abs(b.number-chapter.number)||a.number-b.number);
  const sameGroup=nearby(ataChapters.filter(other=>other.group===chapter.group && other.number!==chapter.number));
  const peers=[...sameGroup,...nearby(ataChapters.filter(other=>other.group!==chapter.group))].slice(0,3);
  const source={title:ataDeckTitle,slide:chapter.slide};
  const common={chapter:chapter.code,topic:`ata-${chapter.group}`,source,
    explanation:`ATA ${chapter.code} is ${chapter.title} in the supplied ${groups[chapter.group].toLowerCase()} list. ATA chapter numbers are shared references that help readers find the same system or topic across aircraft manuals, so the answer comes from this fixed number/name pairing. For comparison, ATA ${peers[0].code} refers to ${peers[0].title}, a different heading. (${ataDeckTitle}, slides 6–7 and ${chapter.slide}.)`};
  return [
    {...common,id:`ata-${chapter.code}-name`,learningTarget:`ata-${chapter.code}-name`,direction:"name",prompt:`Which chapter name matches ATA ${chapter.code}?`,options:[chapter.title,...peers.map(p=>p.title)],correctIndex:0},
    {...common,id:`ata-${chapter.code}-code`,learningTarget:`ata-${chapter.code}-code`,direction:"code",prompt:`Which ATA chapter covers ${chapter.title}?`,options:[`ATA ${chapter.code}`,...peers.map(p=>`ATA ${p.code}`)],correctIndex:0},
  ];
});
export const ataNoteSections=[{
  id:"ata-overview",title:"ATA chapter practice: how to study",items:[
    ["ATA — first A","Air. The course expands ATA as Air Transport Association. (Supplied deck, slide 6.)"],
    ["ATA — T","Transport. (Supplied deck, slide 6.)"],
    ["ATA — final A","Association. (Supplied deck, slide 6.)"],
    ["Code and chapter name","Learn each pairing in both directions. For example, Electrical Power is ATA 24, and ATA 24 is Electrical Power. (Supplied deck, slides 7 and 9.)"],
    ["Scope: Test 2 review worksheet","Study only 01, 02, 06, 12, 24, 25, 28, 33, 49, 57, 73 and 79. The worksheet asks what chapters 01 and 02 define, then lists the other ten in its ATA question. Assignment-only chapters are outside this quiz."],
    ["Use your course wording","The chapter names follow the supplied ATA course slides. The Test 2 Material Worksheet selects which chapters to study; it does not provide the names. Titles in other manuals or editions may differ."],
    ["One complete randomized test","Every attempt includes all 24 questions: each of the 12 review chapters appears once as code-to-name and once as name-to-code. Questions and answer choices are shuffled. Progress saves so you can stop and resume. Reset reshuffles the test and preserves your highest score."],
  ],
},...Object.entries(groups).map(([group,title])=>({id:`ata-${group}`,title:`ATA chapters: ${title}`,items:ataChapters.filter(c=>c.group===group).map(c=>[
  `ATA ${c.code} · ${c.title}`,`Chapter ${c.code} in the ${title.toLowerCase()} group. Source: ${ataDeckTitle}, slide ${c.slide}.`,
])}))];
