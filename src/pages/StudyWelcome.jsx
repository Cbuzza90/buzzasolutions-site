import { useEffect, useRef, useState } from "react";
import { ChevronRight, Users } from "lucide-react";
import { studyGroup } from "../data/studySchedule";

const welcomeKey = `study-welcome-seen-${studyGroup}`;

export default function StudyWelcome() {
  const dialogRef = useRef(null);
  const [showWelcome, setShowWelcome] = useState(() => {
    try { return localStorage.getItem(welcomeKey) !== "yes"; }
    catch { return true; }
  });

  useEffect(() => {
    if (!showWelcome) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; };
  }, [showWelcome]);

  function continueToCourses() {
    try { localStorage.setItem(welcomeKey, "yes"); }
    catch { /* Remember for this visit when browser storage is unavailable. */ }
    setShowWelcome(false);
  }

  return <dialog className="study-welcome-dialog" ref={dialogRef} aria-labelledby="study-welcome-title" onCancel={event => event.preventDefault()}>
    <div className="study-welcome-content">
      <span className="study-welcome-icon"><Users size={28} /></span>
      <p className="study-eyebrow">BEFORE YOU GET STARTED</p>
      <h1 id="study-welcome-title">This is for group <span>{studyGroup}</span></h1>
      <p className="study-welcome-instruction">Not sure what that means?</p>
      <p className="study-canvas-steps">Go to <strong>myCanvas</strong> <ChevronRight size={15} /> <strong>Courses</strong> <ChevronRight size={15} /> <strong>Home</strong></p>
      <p className="study-welcome-explanation">Look for the group number at the top, like the one circled below.</p>
      <figure className="study-canvas-guide">
        <div className="study-canvas-image"><img src="/canvas-group-guide.png" alt="myCanvas course Home page showing group 15886.202635 at the top, above Home, Announcements, and Modules." /><span className="study-group-circle" aria-hidden="true" /></div>
        <figcaption>Your group number is at the top of the course page.</figcaption>
      </figure>
    </div>
    <div className="study-welcome-footer"><button type="button" className="study-primary" onClick={continueToCourses}>Got it — continue <ChevronRight size={18} /></button></div>
  </dialog>;
}
