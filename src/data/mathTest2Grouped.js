import { mathTest2Path } from "./mathTest2.js";

// Five variations of each method in the supplied review, lectures and Nov 18 examples.
// practiceGroup opts into consecutive blocks in the shared practice persistence layer.
const review = "practice test 2.pdf";
const percent = "Percentage_ Avergages_ odds_ PCR.pdf";
const geometry = "Geometry.pdf";
const physics = "Physics .pdf";
const piston = "Piston Displacement_ Horsepower.pdf";
const extra = "User-supplied extra Math questions, 18 November 2026";
const g = 9.81;
const fixed = (value, digits = 2) => Number(value.toFixed(digits)).toFixed(digits);
const number = (value, digits = 2, unit = "") => `${fixed(value, digits)}${unit ? ` ${unit}` : ""}`;
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const fraction = (a, b) => { const d = gcd(a, b); return `${a / d}/${b / d}`; };

function choices(value, distractors, digits = 2, unit = "") {
  const format = n => number(n, digits, unit);
  const result = [format(value)];
  for (const n of [...distractors, value * 2, value / 2, value + 10, value + 1]) {
    const text = format(n);
    if (Number.isFinite(n) && n >= 0 && !result.includes(text)) result.push(text);
    if (result.length === 4) return result;
  }
  throw new Error("A Math question needs four distinct answers");
}

function group(id, title, topic, source, examples, build) {
  return { id, title, topic, source, questions: examples.map((values, index) => {
    const q = build(values, index);
    return { ...q, id: `math2-group-${id}-${index + 1}`, topic,
      practiceGroup: id, practiceGroupTitle: title, practiceGroupSize: examples.length,
      correctIndex: 0, source, explanation: `${q.explanation} Source: ${source}.` };
  }) };
}

export const mathTest2Groups = [
  group("simplify-ratio", "Simplify a ratio", "ratio", `${review} p1 Q1–2`, [[320,40],[160,32,4],[84,36],[150,90,30],[72,108]], a => {
    const d = a.reduce(gcd), simplest = a.map(n => n / d);
    return { prompt: `Simplify ${a.join(":")} to its lowest whole-number ratio.`,
      options: [simplest.join(":"), [...simplest].reverse().join(":"), a.map(n => n / d * 2).join(":"), simplest.map((n,i) => i ? n : n + 1).join(":")],
      explanation: `The greatest common factor is ${d}. Divide every term by ${d}: ${a.join(":")} becomes ${simplest.join(":")}. Keep the order and divide every term by the same factor; a proportional ratio with a remaining common factor is not in lowest terms.` };
  }),
  group("mixture", "Scale a mixture", "ratio", `${review} p1 Q4`, [[1.75,.5,.75,60],[2,1,3,48],[3,2,5,80],[1.5,.5,2,72],[4,3,1,96]], ([a,b,c,total]) => {
    const sum = a+b+c, value = total*b/sum;
    return { prompt: `A mixture uses ${a} oz of A, ${b} oz of B and ${c} oz of C. How many ounces of B are needed for ${total} oz total? Round to two decimal places.`, options: choices(value,[total*a/sum,total*c/sum,total*b/(a+c)],2,"oz"),
      explanation: `The original mixture totals ${a}+${b}+${c}=${sum} oz. B makes up ${b}/${sum} of it. Preserve that share: ${total}×${b}/${sum}=${fixed(value)} oz. Scaling only B without considering the total would change the mixture.` };
  }),
  group("included-tax", "Recover included tax", "percent", `${review} p1 Q5`, [[1073.5,13],[226,13],[560,12],[945,5],[345,15]], ([total,rate]) => {
    const base = total/(1+rate/100), value = total-base;
    return { prompt: `For this exercise, a $${fixed(total)} bill already includes ${rate}% tax. How much of the total is tax? Round to cents.`, options: choices(value,[total*rate/100,base,total/(rate/100)],2,"dollars"),
      explanation: `The total represents ${100+rate}% of the original price. Recover the base: ${fixed(total)}/(1+${rate}/100)=$${fixed(base)}. Subtract it from the inclusive total: tax=$${fixed(value)}. Multiplying the inclusive total by the rate would tax the tax. The rate is supplied exercise data.` };
  }),
  group("percent-of", "Find a percentage of a quantity", "percent", `${extra} Q4; ${review} p1 Q6`, [[5,5000],[12,450],[7,2300],[18,650],[3,1750]], ([p,total]) => {
    const value = p*total/100;
    return { prompt: `${p}% of a bird species have a rare colour. In a sample of ${total} birds, how many would you expect to have that colour? Round to the nearest whole bird.`, options: choices(value,[total/p,total*(1-p/100),total*p],0,"birds"),
      explanation: `Convert ${p}% to ${p/100}, then multiply by the sample size: (${p}/100)×${total}=${value}. The expected count rounds to ${fixed(value,0)} birds. This is an expected number from a proportion, not a guarantee about every sample.` };
  }),
  group("percent-number", "Find a percentage without count rounding", "percent", `${review} p1 Q6`, [[12,45],[8,125],[17,82],[6.5,240],[22,63]], ([p,whole]) => ({
    prompt: `What is ${p}% of ${whole}? Round to two decimal places.`, options: choices(p*whole/100,[whole/p,p*whole,whole*(1-p/100)]),
    explanation: `Convert the percentage to a decimal: ${p}%=${p/100}. Multiply by the whole: ${p/100}×${whole}=${fixed(p*whole/100)}. Keep the decimal result because this question asks for a numerical quantity, whereas an expected count of whole birds would require whole-number rounding.`
  })),
  group("percent-compare", "One quantity as a percentage of another", "percent", `${review} p1 Q7`, [[84,58],[42,60],[135,90],[27,48],[96,75]], ([part,whole]) => {
    const value = part/whole*100;
    return { prompt: `${part} is what percentage of ${whole}? Round to two decimal places.`, options: choices(value,[whole/part*100,value-100,part/whole],2,"%"),
      explanation: `Use the stated reference whole: percent=part/whole×100=${part}/${whole}×100=${fixed(value)}%. A result above 100% is valid when the first quantity is larger. Percentage increase would require subtracting the original value first, which this question does not ask.` };
  }),
  group("reverse-percent", "Find the original whole", "percent", `${review} p1 Q8`, [[37,35],[48,16],[81,45],[56,70],[125,25]], ([part,p]) => {
    const value = part/(p/100);
    return { prompt: `${part} is ${p}% of what number? Round to two decimal places.`, options: choices(value,[part*p/100,p/part*100,part/(1-p/100)]),
      explanation: `Let the whole be x. The equation is (${p}/100)x=${part}. Divide by the decimal percentage: x=${part}/${p/100}=${fixed(value)}. Check by multiplying the unrounded whole by ${p/100}; it returns ${part}.` };
  }),
  group("ratio-percent", "Convert a ratio to a percentage", "percent", `${extra} Q2; ${review} p1 Q14`, [[6,13],[12,13],[3,8],[7,9],[11,4]], ([red,blue]) => {
    const total = red+blue, value = red/total*100;
    return { prompt: `The ratio of red balls to blue balls is ${red}:${blue}. What percentage of all the balls are red? Round to the nearest whole percent.`, options: choices(value,[red/blue*100,blue/total*100,red/total],0,"%"),
      explanation: `The ratio contains ${red}+${blue}=${total} total parts. Red is ${red}/${total} of the whole, so ${red}/${total}×100=${fixed(value)}%, rounding to ${fixed(value,0)}%. Dividing red by blue compares the two colours instead of red with all balls.` };
  }),
  group("percent-ratio", "Convert a percentage to an x:1 ratio", "ratio", `${extra} Q3; ${percent} p14`, [88,75,92,65,84], p => {
    const fail = 100-p, value = p/fail;
    return { prompt: `${p}% of products are to standard; the rest are defective. Express to standard:defective as x:1. What is x, to the nearest tenth?`, options: choices(value,[fail/p,p/100,100/fail],1),
      explanation: `Defective products account for 100−${p}=${fail}%. The ratio is ${p}:${fail}. Divide both sides by ${fail} to make the second term 1: ${p/fail}:1, or ${fixed(value,1)}:1. The order is to standard first, defective second.` };
  }),
  group("defective-percent", "Find a defective percentage", "percent", `${review} p1 Q15`, [[340,27],[500,35],[240,18],[750,42],[128,9]], ([total,bad]) => ({
    prompt: `A shipment contains ${total} products, of which ${bad} are defective. What percentage is defective? Round to two decimal places.`, options: choices(bad/total*100,[(total-bad)/total*100,bad/(total-bad)*100,bad/total],2,"%"),
    explanation: `Defective is the part and all ${total} products are the whole. Calculate ${bad}/${total}×100=${fixed(bad/total*100)}%. Dividing by the good products would give a defective:good comparison rather than a percentage of the shipment.`
  })),
  group("complement-percent", "Find the remaining percentage", "percent", `${percent} p14`, [5,12,7.5,18,2.5], bad => ({
    prompt: `A shipment is ${bad}% defective. Every product is either defective or functioning. What percentage is functioning? Give one decimal place.`, options: choices(100-bad,[bad,100/bad,bad/100],1,"%"),
    explanation: `The two non-overlapping categories account for the entire shipment, or 100%. Functioning=100%−${bad}%=${fixed(100-bad,1)}%. This subtraction is valid because the prompt says every product belongs to exactly one of the two categories.`
  })),
  group("decimal-percent", "Convert a decimal to a percentage", "percent", `${percent} p2–7`, [.125,.045,.72,1.35,.006], decimal => ({
    prompt: `Express the decimal ${decimal} as a percentage, to one decimal place.`, options: choices(decimal*100,[decimal,decimal*10,decimal/100],1,"%"),
    explanation: `Percent means per hundred, so multiply the decimal by 100: ${decimal}×100=${fixed(decimal*100,1)}%. Moving the decimal point two places to the right preserves the same quantity expressed using a different scale.`
  })),
  group("mean", "Calculate an arithmetic mean", "averages", `${percent} p9`, [[24,10,12,36],[60,72,88,80],[12,17,23,28],[32,48,56,64],[7,11,18,24]], a => {
    const total = a.reduce((s,n)=>s+n,0), value = total/a.length;
    return { prompt: `What is the arithmetic mean of ${a.join(", ")}? Round to two decimal places.`, options: choices(value,[total,total/(a.length-1),(Math.max(...a)+Math.min(...a))/2]),
      explanation: `Add all ${a.length} values: ${a.join("+")}=${total}. Divide by the number of equally weighted observations: ${total}/${a.length}=${fixed(value)}. The mean uses every value, rather than only the maximum and minimum.` };
  }),
  group("weighted-grade", "Calculate a weighted course grade", "averages", `${review} p1 Q9; ${percent} p9`, [[60,85,36,62.5,94],[72,80,68,90,100],[84,76,92,88,95],[55,70,65,78,85],[90,82,74,86,100]], a => {
    const w=[15,20,25,30,10], value=a.reduce((s,n,i)=>s+n*w[i]/100,0);
    return { prompt: `Course grades: assignments ${a[0]}% (weight 15%), Test 1 ${a[1]}% (20%), Test 2 ${a[2]}% (25%), final ${a[3]}% (30%), project ${a[4]}% (10%). Find the overall grade to two decimal places.`, options: choices(value,[a.reduce((s,n)=>s+n,0)/5,value*.8,value+10],2,"%"),
      explanation: `Multiply each percentage by its decimal course weight, then add: ${a.map((n,i)=>`${n}×${w[i]/100}`).join(" + ")}=${fixed(value)}%. The weights total 100%. A simple mean would incorrectly give each assessment the same importance.` };
  }),
  group("required-final", "Find the required final-exam grade", "averages", `${review} p1 Q10; ${percent} p10`, [[80,78,69,84,100],[70,75,68,72,90],[85,88,80,90,100],[75,70,76,80,85],[90,92,88,94,100]], ([target,a,b,c,d]) => {
    const completed=a*.15+b*.15+c*.25+d*.1, value=(target-completed)/.35;
    return { prompt: `Target overall grade: ${target}%. Assignments ${a}% (weight 15%), Test 1 ${b}% (15%), Test 2 ${c}% (25%), project ${d}% (10%); final weight 35%. What final percentage is required, to two decimal places?`, options: choices(value,[target-completed,completed,target],2,"%"),
      explanation: `Completed assessments contribute ${a}×0.15+${b}×0.15+${c}×0.25+${d}×0.10=${fixed(completed)} percentage points. The final must add ${fixed(target-completed)} points. Divide by its 0.35 weight to obtain ${fixed(value)}%. Keep the intermediate contributions unrounded.` };
  }),
  group("dice", "Probability on a fair die", "probability", `${review} p1 Q11; ${percent} p13–14`, [5,4,3,2,6], threshold => ({
    prompt: `Roll a fair six-sided die once. What is the probability of getting at least ${threshold}?`, options: [fraction(7-threshold,6),fraction(1,6),fraction(threshold,6),fraction(6-threshold,6)].filter((v,i,a)=>a.indexOf(v)===i).concat(["1/12","1/2","0/1"]).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4),
    explanation: `'At least ${threshold}' includes ${Array.from({length:7-threshold},(_,i)=>i+threshold).join(", ")}. There are ${7-threshold} favourable outcomes among six equally likely outcomes. Probability=${7-threshold}/6=${fraction(7-threshold,6)}. Include the boundary value itself.`
  })),
  group("coins-at-least", "Coins: at least one head", "probability", `${review} p1 Q12`, [3,2,4,5,6], n => ({
    prompt: `Flip ${n} fair coins independently. What is the probability of at least one head?`, options: [fraction(2**n-1,2**n),fraction(1,2**n),fraction(n,2**n),"0/1"],
    explanation: `There are 2^${n}=${2**n} equally likely sequences. Only the all-tails sequence has no heads, with probability 1/${2**n}. Subtract that one excluded outcome: 1−1/${2**n}=${fraction(2**n-1,2**n)}. Exactly one head is a different event.`
  })),
  group("coins-exact", "Coins: an exact number of tails", "probability", `${review} p1 Q13a`, [[5,2],[4,1],[6,2],[5,3],[6,1]], ([n,k]) => {
    let ways=1; for(let i=1;i<=k;i++) ways=ways*(n-i+1)/i;
    return { prompt: `Flip ${n} fair coins independently. What is the probability of exactly ${k} tails?`, options: [fraction(ways,2**n),fraction(1,2**n),fraction(n-k,2**n),fraction(2**n-ways,2**n)],
      explanation: `There are 2^${n}=${2**n} equally likely sequences. Choose which ${k} of the ${n} positions contain tails; this gives ${ways} arrangements. Divide arrangements by total sequences: ${ways}/${2**n}=${fraction(ways,2**n)}. One particular arrangement alone has probability 1/${2**n}.` };
  }),
  group("coins-both", "Coins: at least one of each", "probability", `${review} p1 Q13b`, [5,3,4,6,7], n => ({
    prompt: `Flip ${n} fair coins independently. What is the probability of at least one head AND at least one tail?`, options: [fraction(2**n-2,2**n),fraction(2**n-1,2**n),fraction(2,2**n),"1/2"],
    explanation: `Both outcomes must appear. Out of ${2**n} sequences, exclude the all-heads and all-tails sequences. That leaves ${2**n-2}/${2**n}=${fraction(2**n-2,2**n)}. Excluding only all tails would incorrectly keep the all-heads sequence.`
  })),
  group("coins-more-heads", "Coins: more heads than tails", "probability", `${review} p1 Q13c`, [3,4,5,6,8], n => {
    let ways=0; for(let k=Math.floor(n/2)+1;k<=n;k++) { let c=1; for(let i=1;i<=k;i++) c=c*(n-i+1)/i; ways+=c; }
    const options=[fraction(ways,2**n),fraction(2**n-ways,2**n),fraction(1,2**n),fraction(n,2**n),fraction(2**n-1,2**n)].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    return { prompt: `Flip ${n} fair coins independently. What is the probability of MORE heads than tails?`, options,
      explanation: `More heads than tails requires at least ${Math.floor(n/2)+1} heads. Count the sequences for each allowed head count, giving ${ways} favourable sequences among ${2**n}. Probability=${fraction(ways,2**n)}. A tied result does not satisfy 'more'; with an even number of coins, ties reduce the probability below one half.` };
  }),
  group("pcr-swept-clearance", "PCR from swept and clearance volumes", "pcr", `${review} p1 Q3; ${percent} p16–17`, [[108,12],[94,12],[160,20],[225,25],[324,36]], ([swept,clearance]) => ({
    prompt: `A cylinder has swept displacement ${swept} cc and TDC clearance ${clearance} cc. What is the PCR? Give the first term to three decimal places.`, options: choices((swept+clearance)/clearance,[swept/clearance,clearance/(swept+clearance),(swept+clearance)/swept],3,":1"),
    explanation: `BDC contains both swept and clearance volumes: Vt=${swept}+${clearance}=${swept+clearance} cc. PCR=Vt/Vc=${swept+clearance}/${clearance}=${fixed((swept+clearance)/clearance,3)}:1. Dividing swept volume alone by clearance omits the space remaining at TDC.`
  })),
  group("pcr-total-swept", "PCR from total and swept volumes", "pcr", `${review} p1 Q18`, [[90,10],[240,216],[350,315],[180,160],[450,400]], ([total,swept]) => ({
    prompt: `Total BDC volume is ${total} cc and swept displacement is ${swept} cc. Find the PCR; give the first term to three decimal places.`, options: choices(total/(total-swept),[total/swept,swept/(total-swept),(total+swept)/total],3,":1"),
    explanation: `Clearance is the portion not swept out: Vc=Vt−Vd=${total}−${swept}=${total-swept} cc. Now PCR=Vt/Vc=${total}/${total-swept}=${fixed(total/(total-swept),3)}:1. The given displacement is not the clearance volume, even if swapping them produces a more familiar-looking ratio.`
  })),
  group("pcr-total-clearance", "PCR directly from BDC and TDC volumes", "pcr", `${percent} p16–17`, [[140,20],[180,15],[240,30],[325,25],[450,50]], ([total,clearance]) => ({
    prompt: `The volume above a piston is ${total} cc at BDC and ${clearance} cc at TDC. What is the compression ratio? Give the first term to two decimal places.`, options: choices(total/clearance,[(total-clearance)/clearance,clearance/total,(total+clearance)/clearance],2,":1"),
    explanation: `Compression ratio directly compares the largest chamber volume with the smallest: PCR=VBDC/VTDC=${total}/${clearance}=${fixed(total/clearance)}:1. BDC volume already includes clearance, so do not add clearance a second time.`
  })),
  group("pcr-partial", "PCR from a percentage of total BDC volume", "pcr", `${review} p1 Q19; ${percent} p18`, [[140,70,20],[183,73,15],[180,60,30],[225,75,25],[168,80,21]], ([measured,p,clearance]) => {
    const total=measured/(p/100), value=total/clearance;
    return { prompt: `${measured} cc is ${p}% of full BDC TOTAL chamber volume, not a percentage of stroke. TDC clearance is ${clearance} cc. Find PCR; give the first term to two decimal places.`, options: choices(value,[measured/clearance,(total+clearance)/clearance,(measured-clearance)/(p/100)/clearance+1],2,":1"),
      explanation: `The measured chamber volume represents ${p/100} of the full total. Recover Vt=${measured}/${p/100}=${fixed(total)} cc. Using the unrounded total, PCR=Vt/${clearance}=${fixed(value)}:1. A percentage of piston stroke would need a different clearance-aware equation; the prompt specifies the lecture's total-volume convention.` };
  }),
  group("pcr-clearance", "Recover clearance from PCR", "pcr", `${percent} p16–17; Piston compression ratio algebra`, [[140,7],[240,12],[315,9],[360,10],[480,8]], ([total,ratio]) => ({
    prompt: `A cylinder has total BDC volume ${total} cc and PCR ${ratio}:1. What is its TDC clearance volume? Give two decimal places.`, options: choices(total/ratio,[total/(ratio-1),total-total/ratio,total*ratio],2,"cc"),
    explanation: `PCR=Vt/Vc. Multiply by Vc and divide by PCR to isolate clearance: Vc=Vt/PCR=${total}/${ratio}=${fixed(total/ratio)} cc. Dividing by PCR−1 would apply if the supplied volume were swept displacement; this question supplies total BDC volume.`
  })),
  group("arc-length", "Arc length: less than one full turn", "arc-angle", `${extra} Q9; ${geometry} p6–9`, [[6.9,22],[3,120],[4.2,75],[8,135],[5.5,210]], ([r,angle]) => ({
    prompt: `A particle follows a circle of radius ${r} nm through ${angle}°. How far does it travel along the arc? Use calculator π; round to the nearest tenth of a nm.`, options: choices(2*Math.PI*r*angle/360,[2*Math.PI*r,Math.PI*r*angle/360,r*angle],1,"nm"),
    explanation: `The travelled fraction of a revolution is ${angle}/360. Multiply by circumference: s=(${angle}/360)×2π×${r}=${fixed(2*Math.PI*r*angle/360,1)} nm. Use the radius as given and retain calculator π until final rounding; arc length follows the curved path.`
  })),
  group("arc-multiple-turns", "Arc length: more than one full turn", "arc-angle", `${extra} Q10; ${geometry} p6–9`, [[6.9,501],[4,450],[3.5,720],[8,810],[5.2,1085]], ([r,angle]) => ({
    prompt: `A particle follows a circle of radius ${r} nm and rotates ${angle}° in one direction. What TOTAL distance does it travel? Use calculator π; round to the nearest tenth of a nm.`, options: choices(2*Math.PI*r*angle/360,[2*Math.PI*r*(angle%360)/360,2*Math.PI*r,Math.PI*r*angle/360],1,"nm"),
    explanation: `Total travel includes every complete revolution. Use the entire angle: s=(${angle}/360)×2π×${r}=${fixed(2*Math.PI*r*angle/360,1)} nm. Reducing the angle modulo 360 describes only the final partial turn, losing the distance covered during full turns.`
  })),
  group("arc-angle", "Find an angle from arc length", "arc-angle", `${geometry} p8–9`, [[2.1,5.4],[3,4.5],[4,8],[6,5],[1.5,3.6]], ([r,s]) => ({
    prompt: `A point travels an arc of ${s} m on a circle of radius ${r} m. What angle does it sweep in degrees? Use calculator π and round to two decimal places.`, options: choices(s/r*180/Math.PI,[s/r,s/r*360/Math.PI,r/s*180/Math.PI],2,"°"),
    explanation: `Rearrange s=rθ to θ=s/r=${s}/${r} radians. Convert to degrees by multiplying by 180/π: θ=${fixed(s/r*180/Math.PI)}°. The simple quotient s/r is in radians, not degrees.`
  })),
  group("degrees-radians", "Convert degrees to radians", "arc-angle", `${geometry} p5–9`, [65,30,120,225,300], angle => ({
    prompt: `Convert ${angle}° to radians. Use calculator π and round to three decimal places.`, options: choices(angle*Math.PI/180,[angle*180/Math.PI,angle/180,angle*Math.PI/360],3,"rad"),
    explanation: `Because 180° equals π radians, multiply by π/180: ${angle}×π/180=${fixed(angle*Math.PI/180,3)} rad. The reciprocal factor 180/π is used for converting radians to degrees, so its direction matters.`
  })),
  group("triangle-angle", "Find a missing triangle angle", "arc-angle", `${review} p1 Q22; ${geometry} p11`, [[35,105],[48,62],[70,55],[90,28],[42,42]], ([a,b]) => ({
    prompt: `A triangle has interior angles ${a}° and ${b}°. What is its third interior angle?`, options: choices(180-a-b,[a+b,360-a-b,(180-a-b)/2],0,"°"),
    explanation: `The interior angles of a triangle add to 180°. Subtract both known angles: 180−${a}−${b}=${180-a-b}°. Check that all three angles sum to 180°. Dividing the remainder by two would apply to two equal unknown angles, not the single unknown here.`
  })),
  group("equilateral-area", "Area of an equilateral triangle", "pythagoras", `${extra} Q1; ${geometry} p17, p19; ${review} p2 Q24`, [5,6,8,10,12], side => {
    const h=Math.sqrt(side**2-(side/2)**2), value=side*h/2;
    return { prompt: `An equilateral triangle has three sides of length ${side} cm. What is its area? Round to two decimal places in cm².`, options: choices(value,[side**2/2,side*h,side**2],2,"cm²"),
      explanation: `An altitude bisects the base into ${side/2} cm halves. Pythagoras gives h=√(${side}²−${side/2}²)=${fixed(h)} cm. Triangle area is A=½×base×perpendicular height=½×${side}×h=${fixed(value)} cm², retaining the unrounded height. Equivalently A=(√3/4)×side²; a sloping side is not the height.` };
  }),
  group("circle", "Area and circumference of a circle", "circle", `${geometry} p4, p18; Formula sheet for Test 2.pdf`, [3,2.5,4.5,7,10], r => {
    const a=Math.PI*r*r,c=2*Math.PI*r, format=(area,circ)=>`A = ${fixed(area)} cm²; C = ${fixed(circ)} cm`;
    return { prompt: `A circle has radius ${r} cm. Select its area A and circumference C. Use calculator π; round each to two decimal places.`, options: [format(a,c),format(c,a),format(a*4,c*2),format(a,c/2)],
      explanation: `Area is the enclosed surface: A=πr²=π×${r}²=${fixed(a)} cm². Circumference is boundary length: C=2πr=2π×${r}=${fixed(c)} cm. Use square units for area and linear units for circumference. The stated measurement is a radius, not a diameter.` };
  }),
  group("distance", "Distance between two points", "coordinates", `${extra} Q5; ${review} p1 Q16; Formula sheet for Test 2.pdf`, [[3,-6,-1,-4],[3,3,0,-1],[-2,-1,2,3],[-5,4,7,-1],[1,-8,-4,4]], ([x1,y1,x2,y2]) => {
    const dx=x2-x1,dy=y2-y1,value=Math.hypot(dx,dy);
    return { prompt: `Find the straight-line distance between (${x1}, ${y1}) and (${x2}, ${y2}). Round to the nearest tenth.`, options: choices(value,[Math.abs(dx)+Math.abs(dy),dx*dx+dy*dy,Math.abs(dx-dy)],1),
      explanation: `Horizontal change Δx=${x2}−(${x1})=${dx}; vertical change Δy=${y2}−(${y1})=${dy}. Apply Pythagoras: d=√[(${dx})²+(${dy})²]=√${dx*dx+dy*dy}=${fixed(value,1)}. Squaring handles negative changes. Add the squares before taking the square root.` };
  }),
  group("midpoint", "Midpoint of two points", "coordinates", `${extra} Q6; ${review} p1 Q17; Formula sheet for Test 2.pdf`, [[-8,-5,9,3],[10,22,-4,2],[3,3,0,-1],[-6,8,4,-2],[7,-9,-3,-5]], ([x1,y1,x2,y2]) => {
    const mx=(x1+x2)/2,my=(y1+y2)/2, format=(x,y)=>`(${fixed(x,1)}, ${fixed(y,1)})`;
    return { prompt: `Find the midpoint between (${x1}, ${y1}) and (${x2}, ${y2}). Give both coordinates to one decimal place.`, options: [format(mx,my),format(x1+x2,y1+y2),format((x2-x1)/2,(y2-y1)/2),format(my,mx)].filter((v,i,a)=>a.indexOf(v)===i).concat([format(mx+1,my),format(mx,my-1)]).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4),
      explanation: `Average matching coordinates separately: xM=(${x1}+${x2})/2=${fixed(mx,1)} and yM=(${y1}+${y2})/2=${fixed(my,1)}. Therefore M=${format(mx,my)}. Differences describe displacement; the midpoint needs coordinate sums divided by two.` };
  }),
  group("right-triangle", "Right triangle: hypotenuse, perimeter and area", "pythagoras", `${review} p1 Q20; ${geometry} p17, p19–21`, [[5,12],[3,4],[6,8],[8,15],[9,12]], ([a,b]) => {
    const h=Math.hypot(a,b),p=a+b+h,area=a*b/2, format=(c,P,A)=>`c = ${fixed(c)} cm; P = ${fixed(P)} cm; A = ${fixed(A)} cm²`;
    return { prompt: `A right triangle has perpendicular legs ${a} cm and ${b} cm. Select its hypotenuse c, perimeter P and area A, each to two decimal places.`, options: [format(h,p,area),format(a+b,2*(a+b),area),format(h,p,2*area),format(h,a+b,area)],
      explanation: `The hypotenuse is opposite the right angle: c=√(${a}²+${b}²)=${fixed(h)} cm. Add all three sides for P=${a}+${b}+${fixed(h)}=${fixed(p)} cm. The legs are perpendicular, so A=½×${a}×${b}=${fixed(area)} cm².` };
  }),
  group("missing-leg", "Find a missing right-triangle leg", "pythagoras", `${geometry} p21`, [[10,6],[13,5],[17,8],[25,7],[15,9]], ([hyp,leg]) => ({
    prompt: `A right triangle has hypotenuse ${hyp} cm and one perpendicular leg ${leg} cm. Find the other leg, to two decimal places.`, options: choices(Math.sqrt(hyp*hyp-leg*leg),[Math.hypot(hyp,leg),hyp-leg,hyp*hyp-leg*leg],2,"cm"),
    explanation: `Write c²=a²+b² with ${hyp} as c. Rearrange for the unknown leg: b=√(${hyp}²−${leg}²)=√${hyp*hyp-leg*leg}=${fixed(Math.sqrt(hyp*hyp-leg*leg))} cm. Subtract squares because the hypotenuse is already known; adding them would produce a side longer than the hypotenuse.`
  })),
  group("prism", "Volume of an equilateral triangular prism", "displacement", `${review} p2 Q24; ${geometry} p17, p27–29`, [[10,1],[6,2],[8,1.5],[12,.5],[5,3]], ([side,feet]) => {
    const depth=feet*12,area=Math.sqrt(3)/4*side**2,value=area*depth;
    return { prompt: `A prism has an equilateral triangular face with side ${side} in and a perpendicular prism length of ${feet} ft. Find its volume in in³ to two decimal places. Use 1 ft = 12 in.`, options: choices(value,[area*feet,side**2*depth,side**2/2*depth],2,"in³"),
      explanation: `Convert prism length first: ${feet} ft=${depth} in. The triangle's altitude is √(${side}²−${side/2}²), so its area is (√3/4)×${side}²=${fixed(area)} in². Multiply the unrounded face area by ${depth} in to obtain ${fixed(value)} in³. The prism's length is different from the triangle's altitude.` };
  }),
  group("weight", "Convert mass to weight", "force", `${review} p2 Q25; ${physics} p5, p10`, [30,52,18,72.5,125], mass => ({
    prompt: `What is the weight of a ${mass} kg mass on Earth? Use g = 9.81 m/s²; round to one decimal place in newtons.`, options: choices(mass*g,[mass,mass/g,mass*g*10],1,"N"),
    explanation: `Weight is gravitational force: F=mg=${mass}×9.81=${fixed(mass*g,1)} N. Kilograms measure mass; newtons measure force. Multiplying kg by m/s² gives N, which confirms the units.`
  })),
  group("pressure", "Pressure from weight on a circular pad", "pressure", `${review} p2 Q26; ${physics} p11–12`, [[18,30],[25,20],[40,25],[75,15],[120,40]], ([mass,cm]) => {
    const r=cm/100,force=mass*g,area=Math.PI*r*r,value=force/area/1000;
    return { prompt: `A ${mass} kg mass presses evenly on a circular pad of radius ${cm} cm. Find pressure due to its weight in kPa. Use g = 9.81 m/s² and calculator π; round to three decimal places.`, options: choices(value,[value*1000,value*4,mass/area/1000],3,"kPa"),
      explanation: `Convert radius to metres: r=${cm}/100=${r} m. Force F=mg=${mass}×9.81=${fixed(force)} N; area A=π×${r}² m². Pressure P=F/A=${fixed(force/area,3)} Pa. Divide by 1,000: ${fixed(value,3)} kPa. Convert the length before squaring and use radius, not diameter.` };
  }),
  group("potential", "Gravitational potential energy", "potential", `${extra} Q7; ${review} p2 Q30; ${physics} p19–20`, [[39.3,23.1],[100,2],[70,23],[42.8,15.6],[65.2,8.4]], ([mass,h]) => ({
    prompt: `A ${mass} kg object is held ${h} m above the chosen zero-height level. Find its gravitational potential energy. Use g = 9.81 m/s²; round to the nearest tenth of a joule.`, options: choices(mass*g*h,[mass*h,.5*mass*h*h,mass*g],1,"J"),
    explanation: `Potential energy relative to the stated level is Ep=mgh=${mass}×9.81×${h}=${fixed(mass*g*h,1)} J. Height must be measured from that reference level. The object can store gravitational potential energy while motionless.`
  })),
  group("kinetic", "Kinetic energy from mass and speed", "conservation", `${extra} Q8; ${physics} p21–22`, [[43.5,20.8],[25,12],[62.4,8.5],[15.6,32.1],[80,14.7]], ([mass,v]) => ({
    prompt: `An object of mass ${mass} kg moves at ${v} m/s. What is its kinetic energy? Round to the nearest tenth of a joule.`, options: choices(.5*mass*v*v,[mass*v*v,.5*mass*v,mass*v],1,"J"),
    explanation: `Kinetic energy is Ek=½mv². Square the speed first: ${v}²=${fixed(v*v)}. Then calculate 0.5×${mass}×${v}²=${fixed(.5*mass*v*v,1)} J. The half factor and squared speed both matter; speed is already in m/s.`
  })),
  group("stopping-energy", "Stopping energy with km/h to m/s conversion", "conservation", `${review} p2 Q31; ${physics} p21–22`, [[720,60],[1000,72],[850,54],[1200,90],[640,45]], ([mass,kmh]) => {
    const speed=kmh/3.6,value=.5*mass*speed**2/1000;
    return { prompt: `A ${mass} kg vehicle moving at ${kmh} km/h is brought completely to rest at the same height. How much initial kinetic energy must be dissipated? Convert km/h to m/s; give kJ to two decimal places.`, options: choices(value,[.5*mass*kmh**2/1000,value*2,value*1000],2,"kJ"),
      explanation: `Convert the speed before squaring: v=${kmh}/3.6=${fixed(speed,4)} m/s. With final speed zero and no height change, energy dissipated equals initial kinetic energy: E=½×${mass}×(${kmh}/3.6)²=${fixed(value*1000)} J=${fixed(value)} kJ. This gives energy; impact force would require stopping distance or time.` };
  }),
  group("lifting-work", "Work lifting a combined mass", "work", `${review} p2 Q27; ${physics} p13, p19`, [[78,10,100],[65,8,25],[82,12,45],[54,6,18],[90,15,32]], ([person,bag,h]) => ({
    prompt: `A ${person} kg climber carries a ${bag} kg backpack up a vertical height of ${h} m. Find the work against gravity on both together. Use g = 9.81 m/s²; give kJ to three decimal places.`, options: choices((person+bag)*g*h/1000,[person*g*h/1000,bag*g*h/1000,(person+bag)*h/1000],3,"kJ"),
    explanation: `Both masses rise, so total mass=${person}+${bag}=${person+bag} kg. Work against gravity equals the potential-energy gain: W=mgh=${person+bag}×9.81×${h}=${fixed((person+bag)*g*h)} J. Divide by 1,000 to obtain ${fixed((person+bag)*g*h/1000,3)} kJ.`
  })),
  group("imperial-work", "Work from force and distance", "work", `${physics} p13–15; Block 2 - Physics Summary.pdf`, [[323.5,19.1],[180,12],[450,8.5],[275,16],[520,6.2]], ([force,feet]) => ({
    prompt: `A crane lifts a load weighing ${force} lbf through ${feet} ft vertically. What work does it do against gravity? Round to two decimal places in ft·lbf.`, options: choices(force*feet,[force/feet,force*feet*g,force+feet],2,"ft·lbf"),
    explanation: `For constant force parallel to motion, W=Fd=${force}×${feet}=${fixed(force*feet)} ft·lbf. The supplied lbf value is already a force, so it is not multiplied by gravitational acceleration. Force times distance gives work, not power.`
  })),
  group("drop-speed", "Conservation: speed after a drop", "conservation", `${review} p2 Q28; ${physics} p23–24`, [100,25,40,12,65], h => ({
    prompt: `An object is dropped from rest ${h} m above the ground. Ignore air resistance. Find its speed just before impact. Use g = 9.81 m/s²; round to two decimal places.`, options: choices(Math.sqrt(2*g*h),[Math.sqrt(g*h),2*g*h,g*h],2,"m/s"),
    explanation: `Initial potential becomes kinetic energy: mgh=½mv². Mass cancels. Solve v=√(2gh)=√(2×9.81×${h})=${fixed(Math.sqrt(2*g*h))} m/s. This uses zero starting speed and no energy losses.`
  })),
  group("maximum-height", "Conservation: maximum height above ground", "conservation", `${physics} p23`, [[25,15],[12,10],[30,18],[8,12],[20,22]], ([roof,v]) => ({
    prompt: `A ball is thrown straight upward at ${v} m/s from a ${roof} m roof. Ignore air resistance. What maximum height ABOVE GROUND does it reach? Use g = 9.81 m/s²; round to two decimal places.`, options: choices(roof+v*v/(2*g),[v*v/(2*g),roof+v*v/g,roof+v/(2*g)],2,"m"),
    explanation: `At the top, speed is zero. Initial total mechanical energy is conserved: mg×${roof}+½m×${v}²=mg×hmax. Cancel mass and solve hmax=${roof}+${v}²/(2×9.81)=${fixed(roof+v*v/(2*g))} m. The starting roof height must be added because the reference is ground.`
  })),
  group("impact-speed", "Conservation: impact speed from a roof", "conservation", `${physics} p23–24`, [[25,15],[12,10],[30,18],[8,12],[20,22]], ([roof,v]) => ({
    prompt: `A ball starts ${roof} m above ground, thrown vertically upward at ${v} m/s. Ignore air resistance. What is its speed when it later reaches the ground? Use g = 9.81 m/s²; round to two decimal places.`, options: choices(Math.sqrt(v*v+2*g*roof),[Math.sqrt(2*g*roof),v+Math.sqrt(2*g*roof),Math.sqrt(v*v+g*roof)],2,"m/s"),
    explanation: `At the ground, potential energy relative to ground is zero. Set mg×${roof}+½m×${v}²=½m×vground². Cancel mass: vground=√(${v}²+2×9.81×${roof})=${fixed(Math.sqrt(v*v+2*g*roof))} m/s. Include both initial kinetic energy and the loss of gravitational potential energy.`
  })),
  group("power", "Power from energy and time", "power", `${physics} p17–18`, [[764,4.3],[2400,12],[18000,45],[5250,15],[9600,24]], ([energy,time]) => ({
    prompt: `A machine transfers ${energy} J of energy in ${time} s. What is its average power? Round to two decimal places in watts.`, options: choices(energy/time,[energy*time,time/energy,energy/time/1000],2,"W"),
    explanation: `Power is the rate of energy transfer: P=E/t=${energy}/${time}=${fixed(energy/time)} W. A watt is a joule per second. Multiplying energy by time does not give power; dividing by 1,000 would express kilowatts rather than the requested watts.`
  })),
  group("power-time", "Time from energy and power", "power", `${review} p2 Q29; ${physics} p17–18`, [[2000,100],[3600,120],[7500,250],[4800,80],[18000,600]], ([energy,power]) => ({
    prompt: `A device uses energy at a constant ${power} W. How long does it take to transfer ${energy} J? Give seconds to two decimal places.`, options: choices(energy/power,[power/energy,energy*power,energy/power/60],2,"s"),
    explanation: `From P=E/t, rearrange t=E/P=${energy}/${power}=${fixed(energy/power)} s. Since W means J/s, J divided by J/s leaves seconds. The answer requires time rather than energy or power.`
  })),
  group("engine-volume", "Total engine swept displacement", "displacement", `${review} p2 Q32–33; ${piston} p2–4`, [[8,10,8],[12,4,4],[6,5,6],[4,3.5,4.2],[9,5.25,5.5]], ([k,bore,stroke]) => {
    const one=Math.PI*(bore/2)**2*stroke,value=k*one;
    return { prompt: `An engine has ${k} cylinders, each with bore ${bore} in and stroke ${stroke} in. Find TOTAL swept displacement. Use calculator π; round to two decimal places in in³.`, options: choices(value,[one,value*4,value/2],2,"in³"),
      explanation: `Bore is diameter, so r=${bore}/2=${bore/2} in. One cylinder sweeps πr²L=π×${bore/2}²×${stroke}=${fixed(one)} in³. Multiply the unrounded value by ${k} cylinders to obtain ${fixed(value)} in³. No clearance volume is supplied, so this is swept displacement.` };
  }),
  group("cylinder-volume", "Swept displacement of one cylinder", "displacement", `${piston} p2–4`, [[4.25,5],[3,4],[5.5,6],[4.8,5.2],[6,7]], ([bore,stroke]) => ({
    prompt: `ONE cylinder has bore ${bore} in and stroke ${stroke} in. Find its swept displacement. Use calculator π; round to two decimal places in in³.`, options: choices(Math.PI*(bore/2)**2*stroke,[Math.PI*bore*bore*stroke,Math.PI*(bore/2)**2,Math.PI*bore*stroke],2,"in³"),
    explanation: `The cylinder's swept volume is circular piston area times stroke: V=π(bore/2)²L=π×${bore/2}²×${stroke}=${fixed(Math.PI*(bore/2)**2*stroke)} in³. Halve bore before squaring. This asks for one cylinder, so no engine cylinder-count multiplier is needed.`
  })),
  group("solve-bore", "Recover bore from swept volume", "displacement", `${piston} p3–4`, [[100,.8],[150,.5],[80,.4],[210,.75],[320,1]], ([volume,feet]) => {
    const inches=feet*12,bore=2*Math.sqrt(volume/(Math.PI*inches));
    return { prompt: `One cylinder has swept volume ${volume} in³ and stroke ${feet} ft. Find its BORE in inches. Use calculator π; round to two decimal places.`, options: choices(bore,[bore/2,2*Math.sqrt(volume/(Math.PI*feet)),volume/inches],2,"in"),
      explanation: `Make the units consistent: L=${feet}×12=${inches} in. Rearrange V=π(bore/2)²L: bore=2√[V/(πL)]=2√[${volume}/(π×${inches})]=${fixed(bore)} in. The square root alone gives radius; double it for bore.` };
  }),
  group("plank-pressure", "PLANK: solve mean effective pressure", "plank", `${review} p2 Q34; ${piston} p6–7; Formula sheet for Test 2.pdf`, [[1800,18,9,2800,12],[150,6,5,2400,4],[350,7,5.5,2600,6],[500,8,6,2200,8],[225,5.5,4.5,3000,6]], ([hp,stroke,bore,rpm,k]) => {
    const L=stroke/12,A=Math.PI*(bore/2)**2,N=rpm/2,value=hp*33000/(L*A*N*k);
    return { prompt: `A FOUR-STROKE engine produces ${hp} indicated hp. Stroke ${stroke} in, bore ${bore} in, speed ${rpm} rpm, ${k} cylinders. Use ihp=PLANK/33,000 and N=rpm/2. Find P in psi, using calculator π and two decimal places.`, options: choices(value,[value/2,value/12,value*4],2,"psi"),
      explanation: `Use L=${stroke}/12=${fixed(L,4)} ft, A=π×(${bore}/2)² in², N=${rpm}/2=${N} power strokes/min per cylinder, K=${k}. Rearrange P=ihp×33,000/(LANK). Keeping full precision gives ${fixed(value)} psi. Stroke is in feet while piston area is in square inches; the four-stroke cycle halves rpm.` };
  }),
  group("plank-hp", "PLANK: solve indicated horsepower", "plank", `${review} p2 Q35; ${piston} p6–7; Formula sheet for Test 2.pdf`, [[160,7,5,1200,4],[200,48,12,2400,12],[125,6,4.5,2200,4],[175,8,5.5,2600,6],[145,5.5,4,2800,8]], ([P,stroke,bore,rpm,k]) => {
    const value=P*(stroke/12)*Math.PI*(bore/2)**2*(rpm/2)*k/33000;
    return { prompt: `A FOUR-STROKE engine has P=${P} psi, stroke ${stroke} in, bore ${bore} in, speed ${rpm} rpm and ${k} cylinders. Find ihp using PLANK/33,000, N=rpm/2 and calculator π. Round to two decimal places.`, options: choices(value,[value*2,value*12,value/k],2,"hp"),
      explanation: `Convert L=${stroke}/12 ft; A=π×(${bore}/2)² in²; N=${rpm}/2=${rpm/2} power strokes/min per cylinder; K=${k}. Substitute ihp=${P}×(${stroke}/12)×π×(${bore}/2)²×${rpm/2}×${k}/33,000=${fixed(value)} hp. Keep calculator π and the unrounded stroke conversion until the end.` };
  }),
  group("plank-rpm", "PLANK: recover engine rpm", "plank", `${piston} p7; Formula sheet for Test 2.pdf`, [[2400,200,11,7,6],[150,160,6,5,4],[350,175,7,5.5,6],[500,180,8,6,8],[225,145,5.5,4.5,6]], ([hp,P,stroke,bore,k]) => {
    const value=2*hp*33000/(P*(stroke/12)*Math.PI*(bore/2)**2*k);
    return { prompt: `A FOUR-STROKE engine develops ${hp} indicated hp at P=${P} psi, stroke ${stroke} in, bore ${bore} in and ${k} cylinders. Find rpm using N=rpm/2 and calculator π. Round to the nearest whole rpm.`, options: choices(value,[value/2,value/12,value*2],0,"rpm"),
      explanation: `First isolate N=ihp×33,000/(PLAK), with L=${stroke}/12 ft and A=π×(${bore}/2)² in². For four-stroke operation rpm=2N, so rpm=2×${hp}×33,000/[${P}×(${stroke}/12)×π×(${bore}/2)²×${k}]=${fixed(value,0)} rpm. N is power strokes per minute per cylinder, not rpm itself.` };
  }),
];

export const mathTest2GroupedQuestions = mathTest2Groups.flatMap(group => group.questions);
export const mathTest2Grouped = {
  slug: "math-test-2-grouped", course: "Math", courseSlug: "math", kind: "choice",
  title: "Test 2 · Five of each type", basePath: mathTest2Path,
  path: `${mathTest2Path}/practice-3`, storageId: `${mathTest2Path}/practice-3`,
  questions: mathTest2GroupedQuestions,
};

export const mathTest2GroupedNotes = [{ id: "math2-five-each", title: "Five of each type · extra examples & methods", items: [
  ["Block practice", `This additional practice test has ${mathTest2Groups.length} calculation methods, five questions per method (${mathTest2GroupedQuestions.length} total). Blocks follow a fixed study order; questions shuffle within each block and answer choices shuffle. Progress and highest score are separate from the original 30-question and extended 60-question tests. The supplied 30-question image remains the exam breakdown, not this practice test's length.`],
  ["Equilateral triangle area", "For side a, the perpendicular altitude bisects the base: h=√[a²−(a/2)²]. Thus A=½ah=(√3/4)a². With a=5, area=25√3/4≈10.83 square units. Retain the unrounded altitude. The new Q1 specifies no units or rounding; practice explicitly supplies cm and two decimal places. Source: new Q1; Geometry p17, p19; review p2 Q24."],
  ["Ratio to percentage", "For red:blue=6:13, red is 6/(6+13) of all balls. Multiply by 100 and round to the nearest percent: 31.5789…% becomes 32%. Red/blue gives a comparison with blue alone, not with the whole. Source: new Q2; review p1 Q14."],
  ["To standard:defective as x:1", "At 88% to standard, defective=100−88=12%. Divide both terms of 88:12 by 12 to give 7.333…:1, or 7.3:1 to one decimal place. Preserve the requested order and round only the final first term. Source: new Q3; Percentage lecture p14."],
  ["Expected count from a percentage", "Expected number=(percentage/100)×sample size. Five percent of 5,000 birds is 0.05×5,000=250 birds. This is an expectation from a stated rate. Source: new Q4; review p1 Q6."],
  ["Negative-coordinate distance and midpoint", "For (3,−6) and (−1,−4), changes are −4 and 2: distance=√20≈4.5 to one decimal. For (−8,−5) and (9,3), midpoint=((−8+9)/2,(−5+3)/2)=(0.5,−1). Average coordinates for a midpoint; use squared differences for distance. Source: new Q5–6; formula sheet."],
  ["New energy examples and gravity", "Potential energy uses Ep=mgh; kinetic energy uses Ek=½mv². The new Q7 does not specify g, so practice explicitly uses the supplied formula sheet's g=9.81 m/s²: 39.3×9.81×23.1≈8,905.8 J. New Q8: ½×43.5×20.8²=9,409.9 J to one decimal. Square the speed before multiplying. Source: new Q7–8; Physics p19–22; formula sheet."],
  ["Multi-turn arc length and total distance", "Use s=(θ/360)×2πr with the ENTIRE angle, even beyond 360°. At r=6.9 nm and 22°, s≈2.6 nm; at 501°, s≈60.3 nm. Reducing 501° to 141° discards the distance from a complete revolution. The nm unit follows the radius; no conversion is needed. Source: new Q9–10; Geometry p6–9."],
  ["Pasted results omit the entered answers", "The pasted online review shows Correctsvg where most entered answers would be, so it does not supply an answer key to copy. The practice answers are calculated from the supplied questions and course formulas. Assumptions, units, calculator π, gravity and final rounding are stated explicitly."],
] }];
