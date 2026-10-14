import { useEffect, useRef, useState } from "react";
import { Mail, Users } from "lucide-react";

// Offer help below 70% using the actual score, before display rounding.
export default function PeerTutoringSupport({ score, total, course }) {
  if (total <= 0 || score / total >= 0.7) return null;
  return <TutoringWindow course={course} />;
}

function TutoringWindow({ course }) {
  const [open, setOpen] = useState(true);
  const dialogRef = useRef(null);
  const email = "laszlo.marozsan@mohawkcollege.ca";
  const emailHref = `mailto:${email}?subject=${encodeURIComponent("Aviation peer tutoring enquiry")}&body=${encodeURIComponent(`Hi Les,\n\nI'd like some help studying ${course}. Could we arrange a peer tutoring session?\n\nThank you!`)}`;

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return <>
    <button type="button" className="study-torque-chart-button" onClick={() => setOpen(true)}><Users size={18} /> Get peer tutoring support</button>
    <dialog ref={dialogRef} className="study-answer-dialog study-tutoring-dialog" aria-labelledby="study-tutoring-title" aria-describedby="study-tutoring-description" onCancel={event => { event.preventDefault(); setOpen(false); }}>
      <div className="study-answer-dialog-content">
        <p className="study-eyebrow">PEER TUTORING</p>
        <h2 id="study-tutoring-title">A little extra support can help</h2>
        <p id="study-tutoring-description">Keep practising and review your missed questions. If you'd like help with confusing topics or preparing for a test, you can email a peer tutor.</p>
        <div className="study-tutoring-contact">
          <h3>Les Marozsan</h3>
          <p>The Mohawk College aviation tutoring poster lists free peer tutoring at the Aviation Campus, Room 303, or online.</p>
          <a href={emailHref}>{email}</a>
          <p>Email Les to ask about availability and arrange a session.</p>
        </div>
        <p className="study-tutoring-privacy">The email button opens a draft in your email app. Your test score and answers are not included.</p>
      </div>
      <div className="study-answer-dialog-footer study-tutoring-actions">
        <a className="study-primary" href={emailHref}><Mail size={18} /> Email Les</a>
        <button type="button" className="study-torque-chart-button" autoFocus onClick={() => setOpen(false)}>Review my results</button>
      </div>
    </dialog>
  </>;
}
