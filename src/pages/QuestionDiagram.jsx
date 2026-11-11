import { useEffect, useId, useRef, useState } from "react";
import { Expand, X } from "lucide-react";

function CroppedImage({ diagram }) {
  const { crop } = diagram;
  return <div className="study-diagram-crop" style={{ aspectRatio: `${crop.width} / ${crop.height}` }}><img src={diagram.src} alt={diagram.alt} style={{ width: `${crop.imageWidth / crop.width * 100}%`, left: `${-crop.x / crop.width * 100}%`, top: `${-crop.y / crop.height * 100}%` }} /></div>;
}

function DiagramImage({ diagram }) {
  if (!diagram.lineBand) return <CroppedImage diagram={diagram} />;
  return <div className="study-line-identification" style={{ aspectRatio: `${diagram.crop.width * 4} / ${diagram.crop.height}` }} role="img" aria-label={diagram.alt}>
    <div className="study-line-colours" aria-hidden="true">{diagram.lineBand.colours.map((colour, index) => <span key={index} style={{ backgroundColor: colour }} />)}</div>
    <div className="study-line-pattern" aria-hidden="true"><CroppedImage diagram={diagram} /></div>
  </div>;
}

export default function QuestionDiagram({ diagram }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const [expanded, setExpanded] = useState(false);
  const { crop } = diagram;
  const aspect = (diagram.lineBand ? crop.width * 4 : crop.width) / crop.height;
  // Keep small symbols readable without expanding a narrow source strip to
  // hundreds of pixels across and several thousand pixels down.
  const enlargedWidth = (diagram.lineBand ? crop.width * 4 : crop.width) * Math.min(3, Math.max(1, 600 / crop.height));
  // Individual symbols should be visible in full on phones. Full reference
  // charts retain horizontal scrolling so their labels can stay readable.
  const enlargedStyle = crop.width <= 160 ? { maxWidth: "100%" } : undefined;
  useEffect(() => {
    if (!expanded) return;
    const dialog = dialogRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previous; };
  }, [expanded]);
  return <figure className="study-question-diagram" style={{ "--diagram-aspect": aspect, "--diagram-enlarged-width": `${enlargedWidth}px` }}><button type="button" className="study-diagram-open" aria-label="Enlarge question diagram" aria-haspopup="dialog" aria-expanded={expanded} onClick={() => setExpanded(true)}><DiagramImage diagram={diagram} /><span><Expand size={15} /> Tap to enlarge</span></button><dialog ref={dialogRef} className="study-diagram-dialog" aria-labelledby={titleId} onClose={() => setExpanded(false)}><h2 id={titleId}>{diagram.lineBand ? "Aircraft line marking" : "Question diagram"}</h2><p>{diagram.lineBand ? "Use the colour band and geometric pattern together." : "Scroll sideways or vertically to inspect the enlarged image."}</p><div className="study-diagram-scroll"><div className="study-diagram-enlarged" style={enlargedStyle}><DiagramImage diagram={diagram} /></div></div><div className="study-diagram-footer"><button type="button" className="study-primary" onClick={() => dialogRef.current?.close()}><X size={18} /> Close diagram</button></div></dialog></figure>;
}
