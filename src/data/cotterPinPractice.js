import { shuffleQuestions } from "../pages/safetyTestLogic.js";

export const cotterPinPath = "/study/structures/module-2/cotter-pin-sizing";
export const cotterPinProgressKey = `${cotterPinPath}:20:v1`;
export const cotterPinSource = "https://shop.boeing.com/medias/0026.pdf";
// Explicit AN380 rows in the Boeing/Aviall interchangeability chart. Do not
// generate arbitrary part numbers, AN381 lengths, or the exceptional -1 length.
export const cotterPinSizes = [
  [1,[2,3,4]], [2,[2,3,4,5,6,7,8]], [3,[2,3,4,5,6,7,8]],
  [4,[2,3,4,5,6,7,8,10]], [5,[4,6,10]],
].flatMap(([diameter,lengths])=>lengths.map(length=>({part:`AN380-${diameter}-${length}`,diameter,length})));
const gcd = (a,b) => b ? gcd(b,a%b) : a;
export function inchFraction(numerator,denominator) {
  const divisor=gcd(numerator,denominator), n=numerator/divisor,d=denominator/divisor;
  const whole=Math.floor(n/d), remainder=n%d;
  return remainder ? `${whole ? `${whole} ` : ""}${remainder}/${d}` : String(whole);
}
const measure = (code,denominator) => `${inchFraction(code,denominator)} in`;
const diameterCodes=[1,2,3,4,5], lengthCodes=[2,3,4,5,6,7,8,10];
export const cotterPinQuestions=cotterPinSizes.flatMap(size=>["diameter","length"].map(field=>{
  const diameter=field==="diameter", code=diameter?size.diameter:size.length, denominator=diameter?32:4;
  const alternatives=(diameter?diameterCodes:lengthCodes).filter(n=>n!==code).sort((a,b)=>Math.abs(a-code)-Math.abs(b-code)||a-b).slice(0,3);
  const explanation=`${size.part}: the first size code is ${size.diameter}, so diameter = ${size.diameter} ÷ 32 = ${size.diameter}/32 = ${measure(size.diameter,32)}. The second size code is ${size.length}, so length = ${size.length} ÷ 4 = ${size.length}/4 = ${measure(size.length,4)}. Simplify fractions by dividing numerator and denominator by the same common factor; an improper fraction can be written as a mixed number. (Course: Safety Methods and Aircraft Cable, slides 41–42; Screws, Pins, Turn Lock Fasteners, slide 23. Size checked against Boeing/Aviall Split Cotter Pins interchangeability chart, page 26.)`;
  return {id:`cotter-${size.diameter}-${size.length}-${field}`,learningTarget:`cotter-${field}-${size.diameter}-${size.length}`,topic:`cotter-${field}`,partNumber:size.part,sizeCode:code,denominator,diameterCode:size.diameter,lengthCode:size.length,
    prompt:`For cotter pin ${size.part}, what is its ${field} in inches?`,options:[measure(code,denominator),...alternatives.map(n=>measure(n,denominator))],correctIndex:0,explanation,
    source:{title:"Boeing/Aviall Split Cotter Pins interchangeability chart",page:26,url:cotterPinSource}};
}));
export function sampleCotterPinQuestions(questions,count,random=Math.random) {
  const diameterCount=Math.ceil(count/2);
  return [...shuffleQuestions(questions.filter(q=>q.topic==="cotter-diameter"),random).slice(0,diameterCount),
    ...shuffleQuestions(questions.filter(q=>q.topic==="cotter-length"),random).slice(0,count-diameterCount)];
}
export const cotterPinNoteSections=[{id:"cotter-pin-sizing",title:"Cotter-pin diameter & length — how to calculate AN380 sizes",items:[
  ["Read AN380-D-L","AN380 identifies the pin family. D is the first size code (diameter); L is the second size code (length). This test uses AN380 only, with sizes verified against the Boeing/Aviall chart."],
  ["Diameter: first size code ÷ 32","The diameter is D/32 inch for the AN380 sizes used here. Example AN380-2-6: 2 ÷ 32 = 2/32 inch. Divide both 2 and 32 by 2 to simplify: 1/16 inch. Do not use the second size code to find diameter."],
  ["Length: second size code ÷ 4","For the verified quarter-inch length codes used in this test, length is L/4 inch. Example AN380-2-6: 6 ÷ 4 = 6/4 inch. Simplify to 3/2 inch, or 1 1/2 inches. The pin is 1/16 inch in diameter and 1 1/2 inches long."],
  ["Simplify a fraction","Divide the top and bottom by the same common factor. Examples: 4/32 = 1/8; 2/4 = 1/2; 8/4 = 2. This changes the way the dimension is written, not its size."],
  ["Convert to a mixed number","Divide the numerator by the denominator: 7/4 gives 1 whole with remainder 3, so 7/4 = 1 3/4 inches. Keep the remainder over the original denominator. 10/4 simplifies to 5/2 = 2 1/2 inches."],
  ["Another worked example: AN380-3-4","Diameter = 3/32 inch (already simplified). Length = 4/4 inch = 1 inch. Read and calculate each field separately."],
  ["Important chart exception: length code -1","Do not assume every possible AN380 code follows L/4. The supplied manufacturer chart lists AN380-1-1 and AN380-2-1 as 3/8 inch long. Those exceptional codes are excluded from this calculation test. Check the chart for a specific real part."],
  ["Do not transfer the rule to AN381 or MS24665","Different pin families can use different numbering. The same chart lists AN381 length codes in sixteenths for its illustrated rows; MS24665 uses chart-based dash numbers. This test's quarter-inch rule applies only to the verified AN380 examples, not every cotter pin."],
]}];
