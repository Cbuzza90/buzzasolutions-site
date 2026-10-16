import { useEffect, useRef, useState } from "react";
import { Expand, X } from "lucide-react";

function DiagramImage({ diagram }) {
  const { crop } = diagram;
  return <div className="study-diagram-crop" style={{ aspectRatio: `${crop.width} / ${crop.height}` }}><img src={diagram.src} alt={diagram.alt} style={{ width: `${crop.imageWidth / crop.width * 100}%`, left: `${-crop.x / crop.width * 100}%`, top: `${-crop.y / crop.height * 100}%` }} /></div>;
}

export default function QuestionDiagram({ diagram }) {
  const dialogRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (!expanded) return;
    const dialog = dialogRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previous; };
  }, [expanded]);
  return <figure className="study-question-diagram" style={{ "--diagram-aspect": diagram.crop.width / diagram.crop.height }}><button type="button" className="study-diagram-open" aria-label="Enlarge question diagram" aria-haspopup="dialog" onClick={() => setExpanded(true)}><DiagramImage diagram={diagram} /><span><Expand size={15} /> Tap to enlarge</span></button><dialog ref={dialogRef} className="study-diagram-dialog" aria-labelledby="study-diagram-title" onClose={() => setExpanded(false)}><h2 id="study-diagram-title">Question diagram</h2><p>Scroll sideways or vertically to inspect the enlarged image.</p><div className="study-diagram-scroll"><div className="study-diagram-enlarged"><DiagramImage diagram={diagram} /></div></div><div className="study-diagram-footer"><button type="button" className="study-primary" onClick={() => dialogRef.current?.close()}><X size={18} /> Close diagram</button></div></dialog></figure>;
}
