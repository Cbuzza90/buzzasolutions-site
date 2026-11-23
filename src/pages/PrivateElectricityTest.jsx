import { useState } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import MultipleChoicePractice from "./MultipleChoicePractice";
import { StudyNotesGuide } from "./CourseStudyNotes";
import { practiceQuestionNotes } from "../data/practiceQuestionNotes.js";
import { privateTestKey, openPrivateData, privateProgressStorage } from "../data/privateTestCrypto.js";
import { practiceSummary } from "./practiceProgress.js";
import "./PrivateElectricityTest.css";

const basePath = "/study/electricity/module-2";
const testId = `${basePath}/private-test:v1`;

export default function PrivateElectricityTest() {
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(null);
  const [started, setStarted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function unlock(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setError("");
    try {
      const response = await fetch("/private/electricity-test.enc.json", { cache: "no-store" });
      if (!response.ok) throw new Error("The private test could not be loaded. Please try again.");
      const envelope = await response.json();
      const key = await privateTestKey(password, envelope.salt);
      let payload;
      try { payload = await openPrivateData(envelope, key); }
      catch { throw new Error("Incorrect password. Please try again."); }
      if (payload.questions?.length !== 25 || !payload.sections?.length) throw new Error("The private test file is invalid.");
      let backing;
      try { backing = window.localStorage; } catch { /* The quiz can run without browser persistence. */ }
      let storage;
      try { storage = await privateProgressStorage(key, backing); }
      catch { throw new Error("Saved private progress could not be opened. The saved data has been kept."); }
      const notes = {
        course: "Electricity", intro: "Private Test study guide. Search the paper's question wording or review the topics below.",
        basis: "Based on your five Test # 2-01 Version A photographs and supplied electrical course presentations. Printed choices are preserved. No marked answer key is visible; intended answers are derived from the course sources. Paper errors are explained rather than silently rewritten.",
        sections: [...payload.sections, ...practiceQuestionNotes(basePath, [payload.questions])],
      };
      setSession({ ...payload, storage, notes });
      setPassword(""); setStarted(false);
    } catch (failure) { setError(failure.message || "The test could not be opened."); }
    finally { setBusy(false); }
  }

  async function lock() {
    setBusy(true);
    try { await session.storage.flush(); setError(""); }
    catch { setError("The latest progress could not be saved on this browser."); }
    setSession(null); setStarted(false); setPassword(""); setBusy(false);
  }

  if (!session) return <section className="study-detail private-electricity-test">
    <p className="study-eyebrow">AIRCRAFT ELECTRICITY 1</p><h1>Private Test</h1>
    <p>Enter the password to open this test.</p>
    <form className="private-test-password" onSubmit={unlock}>
      <label htmlFor="private-test-password">Password</label>
      <input id="private-test-password" type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="off" required disabled={busy} />
      {error && <p role="alert">{error}</p>}
      <button className="study-primary" type="submit" disabled={busy}>{busy ? "Unlocking…" : "Unlock Private Test"}</button>
    </form>
    <div className="study-flow-actions"><Link to={basePath}>Electricity tests</Link></div>
  </section>;

  const summary = practiceSummary(session.questions, testId, session.storage);
  return <>
    <div className="private-test-lock"><button className="study-primary" type="button" onClick={lock} disabled={busy}><LockKeyhole size={17} /> Lock test</button></div>
    {started ? <MultipleChoicePractice questions={session.questions} progressKey={testId} testTitle="Private Test" course="Electricity" basePath={basePath} storage={session.storage} studyNotes={session.notes} /> :
      <section className="study-detail private-electricity-test">
        <p className="study-eyebrow">AIRCRAFT ELECTRICITY 1</p><h1>Private Test</h1>
        <h2>Study Guide</h2><p>25 questions from your five paper photos, with the original wording and choices. Question numbers match the paper; practice order is shuffled.</p>
        <StudyNotesGuide basePath={basePath} notesOverride={session.notes} />
        {summary.best && <p>Highest score: {summary.best.score}/25</p>}
        <button className="study-primary" type="button" onClick={() => setStarted(true)}>{summary.answered ? "Continue Private Test" : "Start Private Test"}</button>
        <div className="study-flow-actions"><Link to={basePath}>Electricity tests</Link></div>
      </section>}
  </>;
}
