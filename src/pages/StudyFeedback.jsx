import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { feedbackEmail, feedbackTypes, feedbackImageTypes, validateFeedbackImage, sendStudyFeedback } from "./studyFeedbackDelivery.js";
import "./StudyFeedback.css";

const draftKey = "study-feedback-draft";
const emptyDraft = { type: "Suggestion", course: "", message: "" };

function readDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem(draftKey));
    return Object.fromEntries(Object.entries(emptyDraft).map(([key, fallback]) => [key, typeof draft?.[key] === "string" ? draft[key] : fallback]));
  } catch { return emptyDraft; }
}

export default function StudyFeedback() {
  const [draft, setDraft] = useState(readDraft);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState(null);
  const imageInput = useRef(null);
  useEffect(() => {
    try { sessionStorage.setItem(draftKey, JSON.stringify(draft)); }
    catch { /* The form still works without browser draft storage. */ }
  }, [draft]);
  function update(key, value) {
    setDraft(current => ({ ...current, [key]: value }));
    setError("");
    setSent(false);
  }
  async function submit(event) {
    event.preventDefault();
    if (sending) return;
    if (!draft.message.trim()) {
      setError("Write your complaint or suggestion first.");
      return;
    }
    setSending(true);
    setError("");
    setSent(false);
    try {
      await sendStudyFeedback({ ...draft, image });
      setSent(true);
      setDraft(emptyDraft);
      setImage(null);
      if (imageInput.current) imageInput.current.value = "";
    } catch (failure) {
      setError(failure instanceof TypeError || ["AbortError", "SyntaxError"].includes(failure.name) ? "Could not confirm submission. Your message is still here. Check your connection and try again." : failure.message);
    } finally { setSending(false); }
  }
  return <section className="study-detail study-feedback-page">
    <h1>Leave a complaint or suggestion</h1>
    <p className="study-detail-description">Want a new type of practice test? Is a test date missing? Found a mistake? Let me know.</p>
    <form className="study-feedback-form" onSubmit={submit} aria-busy={sending}>
      <fieldset disabled={sending || sent}>
      <label htmlFor="feedback-type">What’s it about?</label>
      <select id="feedback-type" value={draft.type} onChange={event => update("type", event.target.value)}>
        {feedbackTypes.map(type => <option key={type}>{type}</option>)}
      </select>
      <label htmlFor="feedback-course">Course <span>(optional)</span></label>
      <input id="feedback-course" value={draft.course} onChange={event => update("course", event.target.value)} maxLength={100} placeholder="e.g. Structures" />
      <label htmlFor="feedback-message">Your message</label>
      <textarea id="feedback-message" value={draft.message} onChange={event => update("message", event.target.value)} required maxLength={2000} rows={6} placeholder="Tell me what you’d like added or fixed. For a missing test date, include the course, test and date." aria-describedby="feedback-help" />
      <label htmlFor="feedback-image">Attach an image <span>(optional)</span></label>
      <input ref={imageInput} id="feedback-image" type="file" accept={feedbackImageTypes.join(",")} aria-describedby="feedback-image-help" onChange={event => {
        const selected = event.target.files?.[0] ?? null;
        try { validateFeedbackImage(selected); setImage(selected); setError(""); }
        catch (failure) { event.target.value = ""; setImage(null); setError(failure.message); }
      }} />
      <p id="feedback-image-help">JPG, PNG, WebP or GIF · up to 10 MB. Images stay selected until you send or leave this page.</p>
      {image && <button type="button" className="study-primary" onClick={() => { setImage(null); imageInput.current.value = ""; }}>Remove image</button>}
      <p id="feedback-help">Send directly to {feedbackEmail} through FormSubmit.</p>
      </fieldset>
      {error && <p role="alert">{error}</p>}
      {!sent && <button type="submit" className="study-primary" disabled={sending}><Mail size={18} /> {sending ? "Sending…" : "Send feedback"}</button>}
      {sent && <><p role="status">Feedback submitted. Thank you!</p><button type="button" className="study-primary" onClick={() => setSent(false)}>Leave another message</button></>}
    </form>
    <div className="study-flow-actions"><Link to="/"><ArrowLeft size={18} /> Back to courses</Link></div>
  </section>;
}
