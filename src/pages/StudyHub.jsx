import CotterPinPractice from "./CotterPinPractice";
import { studyPracticeNavigation } from "./studyPracticeNavigation.js";
import { ElectricityWordPractice, SystemsWordPractice, SystemsAppliedWordPractice } from "./WordAnswerPractice";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Navigate, Routes, Route, useLocation, useParams } from "react-router-dom";
import { ArrowUpRight, BookOpen, CalendarDays, Calculator, ChevronRight, FileText, Layers, Moon, Pause, Plane, Play, RotateCcw, Settings2, ShieldCheck, Sun, Wind, X, Zap } from "lucide-react";
import "./StudyHub.css";
import CompletedTestStatus from "./CompletedTestStatus";
import SafetyPractice, { SafetyTestList, HumanFactorsTestList, HumanFactorsPractice } from "./SafetyPractice";
import ResistorBandPractice from "./ResistorBandPractice";
import ElectricityPractice, { ElectricityEasyPractice, ElectricityTestList } from "./ElectricityPractice";
import StudyFeedback from "./StudyFeedback";
import StudyWelcome from "./StudyWelcome";
import { CourseActivity } from "./StudentDashboard";
import { loadDashboard } from "../data/studyDashboard.js";
import StructuresModule2Practice from "./StructuresModule2Practice";
import { AerodynamicsTestList, AerodynamicsPartPractice, AerodynamicsReviewPractice, AerodynamicsChoicePractice, AerodynamicsWordPractice } from "./AerodynamicsPractice";
import { EnginesTestList, EnginesReviewPractice, EnginesAllNotesPractice } from "./EnginesPractice";
import MeasuringToolsPractice from "./MeasuringToolsPractice";
import StructuresTorquePractice, { StructuresTestList } from "./StructuresTorquePractice";
import CourseStudyNotes from "./CourseStudyNotes";
import SystemsMixedPractice from "./SystemsMixedPractice";
import SystemsPractice, { SystemsTestList } from "./SystemsPractice";
import { isModuleCompleted, formatClassSession, testClassSessions, formatClassEndTime, formatScheduledTestDate, nextCourseTest, sortCoursesByNextTest, studyGroup, torontoDate, upcomingTests, visibleTests } from "../data/studySchedule";

import { RESET_PRACTICE_EVENT } from "./practiceProgress";

const courses = [
  { slug: "electricity", title: "Aircraft Electricity 1", code: "AMEM-10001", category: "Foundations", icon: Zap, color: "amber", hasTests: true, description: "Build your understanding of aircraft electricity, one topic at a time." },
  { slug: "aerodynamics", title: "Aircraft Eng & Aerodynamics", code: "AMEM-10002", category: "Foundations", icon: Wind, color: "sky", hasTests: true, description: "Make sense of the principles behind flight and aircraft engineering." },
  { slug: "engines", title: "Aircraft Engines (Intro)", code: "AMEM-10057", category: "Aircraft", icon: Settings2, color: "violet", hasTests: true, description: "Get familiar with aircraft engines and how their components work together." },
  { slug: "safety", title: "Aviation Health and Safety", code: "SAFE-10094", category: "Foundations", icon: ShieldCheck, color: "green", hasTests: true, description: "Review the health and safety concepts covered in your aviation course." },
  { slug: "structures", title: "Basic Aircraft Structures 1", code: "AMEM-10003", category: "Aircraft", icon: Layers, color: "rose", hasTests: true, description: "Explore aircraft construction, structures, and the parts that hold it all together." },
  { slug: "systems", title: "Basic Aircraft Systems", code: "AMEM-10004", category: "Aircraft", icon: Plane, color: "sky", hasTests: true, description: "Connect the concepts behind the systems that keep an aircraft operating." },
  { slug: "math", title: "Math (Aviation Technician)", code: "MATH-10079", category: "Tools & math", icon: Calculator, color: "amber", description: "Practice the mathematical skills used in your aviation technician studies." },
  { slug: "publications", title: "Technical Publications/Documents", code: "AMEM-10033", category: "Tools & math", icon: FileText, color: "violet", description: "Find your way around the technical publications and documents used in class." },
];

function useStudyClock() {
  const [instant, setInstant] = useState(() => new Date());
  useEffect(() => {
    const refresh = () => setInstant(new Date());
    let timer;
    const tick = () => {
      refresh();
      timer = setTimeout(tick, 60_000 - Date.now() % 60_000);
    };
    // Class ends are minute-based. Align refreshes to the minute boundary.
    timer = setTimeout(tick, 60_000 - Date.now() % 60_000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => { clearTimeout(timer); window.removeEventListener("focus", refresh); document.removeEventListener("visibilitychange", refresh); };
  }, []);
  return [instant, () => setInstant(new Date())];
}

function TestDateBanner({ today, refreshDate }) {
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef(null);
  const tests = visibleTests(upcomingTests, today);
  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [expanded]);
  function openDates() { refreshDate(); dialogRef.current?.showModal(); setExpanded(true); }
  function closeDates() { dialogRef.current?.close(); }
  return <aside className={`study-calendar ${paused ? "paused" : ""}`} aria-label={`Upcoming tests for group ${studyGroup}`}>
    <button type="button" className="study-calendar-open" aria-label="Test dates" aria-haspopup="dialog" aria-expanded={expanded} onClick={openDates}>
      <span className="study-calendar-heading"><span><CalendarDays size={13} /> TEST DATES</span></span>
      <span className="study-calendar-window">{tests.length ? <span className="study-calendar-track" style={{ animationDuration: `${tests.length * 5}s` }}>{[false, true].map(copy => <span className="study-calendar-dates" key={String(copy)} aria-hidden={copy || undefined}>{tests.map(test => <span className={`study-date ${test.tone}`} key={`${test.courseSlug}-${test.date}-${test.title ?? "test"}`}><strong>{test.title ?? `${test.course} Test`}{test.possible ? " (possible)" : ""}</strong><time dateTime={test.date}>{formatScheduledTestDate(test, true)}</time></span>)}</span>)}</span> : <span className="study-calendar-empty">No upcoming tests</span>}</span>
    </button>
    {tests.length > 1 && <button type="button" className="study-calendar-pause" aria-label={paused ? "Resume test dates" : "Pause test dates"} onClick={() => setPaused(value => !value)}>{paused ? <Play size={12} /> : <Pause size={12} />}</button>}
    <dialog ref={dialogRef} className="study-dates-dialog" aria-labelledby="study-dates-title" onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) closeDates(); }}>
      <div className="study-dates-heading"><CalendarDays size={26} /><h2 id="study-dates-title">Test dates</h2><p>Group {studyGroup}</p></div>
      <div className="study-dates-list">{tests.length ? tests.map(test => <article className={`study-date ${test.tone}`} key={`${test.courseSlug}-${test.date}-${test.title ?? "test"}`}><strong>{test.title ?? `${test.course} Test`}{test.possible ? " (possible)" : ""}</strong><time dateTime={test.date}>{formatScheduledTestDate(test)}</time>{test.endDate && <span>Date window · Exact date pending</span>}{test.questionCount && <span>{test.questionCount} questions</span>}{testClassSessions(test).length > 0 && <div className="study-test-rooms"><span>Scheduled classes</span>{testClassSessions(test).map(slot => <small key={slot.start}>{formatClassSession(slot)}</small>)}</div>}{formatClassEndTime(test) && <span>Ends {formatClassEndTime(test)} (Toronto)</span>}{test.endDate && test.date <= torontoDate(today) ? <span className="study-date-today">Test window in progress</span> : !test.endDate && test.date === torontoDate(today) && <span className="study-date-today">Today</span>}</article>) : <p>No upcoming tests. New dates will appear here when added.</p>}</div>
      <p className="study-dates-note">Dates clear at class end in Toronto time. Date windows remain through their final day; dates without a known class time clear at midnight.</p>
      <div className="study-dates-footer"><button type="button" className="study-primary" onClick={closeDates}><X size={18} /> Close</button></div>
    </dialog>
  </aside>;
}
function CourseCard({ course, today, summaries }) {
  const nextTest = nextCourseTest(course.slug, upcomingTests, today);
  const countdown = nextTest ? nextTest.days === 0 ? nextTest.endDate ? "WINDOW OPEN" : "TODAY" : `${nextTest.days} day${nextTest.days === 1 ? "" : "s"}` : null;
  const cardProps = { className: `study-course-card${course.hasTests ? "" : " unavailable"}`, "data-test-urgency": nextTest?.urgency, style: nextTest ? { "--test-hue": nextTest.hue } : undefined };
  const content = <><div className="study-card-top"><span className={`study-icon ${course.color}${nextTest ? " study-course-countdown-icon" : ""}`} title={nextTest ? `${nextTest.possible ? "Possible test" : "Next test"}: ${formatScheduledTestDate(nextTest)} · ${countdown}` : undefined}><course.icon size={24} strokeWidth={1.7} />{nextTest && <span className="study-course-countdown">{countdown}</span>}</span>{course.hasTests && <ArrowUpRight size={19} className="study-card-arrow" />}</div>{nextTest?.urgency === "urgent" && <span className="study-test-soon">{nextTest.endDate && nextTest.days === 0 ? "TEST WINDOW" : "TEST SOON!"}</span>}<CompletedTestStatus courseSlug={course.slug} today={today} showCompletedLabel={course.slug !== "safety"} /><p className="study-course-code">{course.code}</p><h3>{course.title}</h3><div className="study-card-bottom"><span>{course.hasTests ? course.category : <span className="study-unavailable-badge">No tests made yet</span>}</span>{nextTest?.possible && <span className="study-test-possible">Possible test · {formatScheduledTestDate(nextTest, true)}</span>}</div></>;
  return course.hasTests ? <Link to={`/study/${course.slug}`} {...cardProps}>{content}<CourseActivity summaries={summaries} courseSlug={course.slug} /></Link> : <article {...cardProps} aria-disabled="true">{content}</article>;
}

function CourseList() {
  const [today, refreshDate] = useStudyClock();
  const summaries = loadDashboard();
  const [category, setCategory] = useState("All courses");
  const filtered = sortCoursesByNextTest(courses.filter(course => category === "All courses" || category === course.category), upcomingTests, today);
  return <>
    <section className="study-welcome"><p className="study-eyebrow">FALL 2026</p><div className="study-welcome-row"><h1 className="sr-only">Aviation study courses</h1><Link className="study-feedback-link" to="/study/feedback">Complaint or suggestion?</Link><TestDateBanner today={today} refreshDate={refreshDate} /></div></section>
    <section id="courses" className="study-courses">
      <div className="study-filters" aria-label="Filter courses">{["All courses", "Foundations", "Aircraft", "Tools & math"].map(item => <button key={item} className={category === item ? "selected" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <p className="sr-only" role="status">{filtered.length} courses found</p>
      <div className="study-grid">{filtered.map(course => <CourseCard key={course.slug} course={course} today={today} summaries={summaries} />)}</div>
      {filtered.length === 0 && <div className="study-empty"><BookOpen size={28} /><h3>No courses in this category</h3><button className="study-primary" onClick={() => setCategory("All courses")}>Show all courses</button></div>}
    </section>
  </>;
}

// All course sections share the same active-first ordering.
const courseModules = {
  engines: [{ slug: "module-2", title: "Test 2", description: "Reciprocating-engine oil & lubrication" }],
  aerodynamics: [{ slug: "module-2", title: "Module 2", description: "Controls, stability, high-speed flight & aircraft structure" }],
  electricity: [{ slug: "module-1", title: "Module 1", description: "Electrical fundamentals · Circuits & meters" }],
  safety: [
    { slug: "module-1", title: "Module 1", description: "Original mixed Safety practice" },
    { slug: "human-factors", title: "Human Factors Quiz", description: "PEAR, Dirty Dozen & error models" },
  ],
  structures: [{ slug: "module-2", title: "Module 2", description: "Measuring tools · Safetying, cables & hardware" }],
  systems: [{ slug: "module-1", title: "Module 1", description: "Hydraulics · Choice, recall & diagrams" }],
};

function CourseDetail() {
  const { slug } = useParams();
  const course = courses.find(item => item.slug === slug);
  const modules = [...(courseModules[slug] ?? [])].sort((a, b) => Number(isModuleCompleted(slug, a.slug)) - Number(isModuleCompleted(slug, b.slug)));
  if (!course) return <section className="study-empty"><h1>Course not found</h1><p>Choose one of your eight courses to get started.</p><Link className="study-primary" to="/">View courses</Link></section>;
  return <section className="study-detail"><span className={`study-icon ${course.color}`}><course.icon size={30} /></span><p className="study-eyebrow">{course.code} · FALL 2026</p><h1>{course.title}</h1><p className="study-detail-description">{course.description}</p>{modules.length ? modules.map(module => <Link key={module.slug} className="study-option-link" to={`/study/${slug}/${module.slug}`}><span><strong>{module.title}</strong><small>{module.description}</small>{isModuleCompleted(slug, module.slug) && <><small className="study-completed-badge">Completed</small><CompletedTestStatus courseSlug={slug} moduleSlug={module.slug} showCompletedLabel={false} /></>}</span><ChevronRight size={22} /></Link>) : <div className="study-detail-panel"><BookOpen size={32} strokeWidth={1.5} /><span className="study-soon">COMING NEXT</span><h2>Your practice starts here.</h2><p>We're preparing this course's study space. Topics and practice questions will appear here as they're added.</p><div className="study-planned"><span>Multiple choice</span><span>Typed answers</span><span>Practice & test modes</span></div></div>}</section>;
}


export default function StudyHub() {
  const { pathname } = useLocation();
  const { onPractice, testsPath } = studyPracticeNavigation(pathname);
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem("study-theme") !== "light"; }
    catch { return true; }
  });
  function toggleTheme() {
    const next = !darkMode;
    setDarkMode(next);
    try { localStorage.setItem("study-theme", next ? "dark" : "light"); }
    catch { /* The toggle still works for this session when storage is unavailable. */ }
  }
  useEffect(() => { const previous = document.title; document.title = "Aviation Study"; return () => { document.title = previous; }; }, []);
  return <div className="study-app" data-theme={darkMode ? "dark" : "light"}>
    <StudyWelcome />
    <a className="study-skip" href="#study-main">Skip to content</a>
    <header className="study-header"><Link to="/" className="study-brand"><span className="study-brand-mark"><Plane size={23} /></span><span><span className="study-brand-title">Study<span className="study-group">{studyGroup}</span></span><small>AVIATION TECHNICIAN</small></span></Link><div className="study-header-controls"><span className="study-term">FALL '26</span><button type="button" className="study-theme-toggle" aria-label="Dark mode" aria-pressed={darkMode} title={darkMode ? "Turn dark mode off" : "Turn dark mode on"} onClick={toggleTheme}>{darkMode ? <Moon size={19} /> : <Sun size={19} />}</button></div></header>
    <main id="study-main" className="study-main" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/study/feedback" element={<StudyFeedback />} />
        <Route path="/study/engines/module-2" element={<EnginesTestList />} />
        <Route path="/study/engines/module-2/practice-1" element={<EnginesReviewPractice />} />
        <Route path="/study/engines/module-2/practice-2" element={<EnginesAllNotesPractice />} />
        <Route path="/study/aerodynamics/module-2" element={<AerodynamicsTestList />} />
        <Route path="/study/aerodynamics/module-2/practice-1/:partSlug" element={<AerodynamicsPartPractice familyId="review" />} />
        <Route path="/study/aerodynamics/module-2/practice-1" element={<AerodynamicsReviewPractice />} />
        <Route path="/study/aerodynamics/module-2/practice-2/:partSlug" element={<AerodynamicsPartPractice familyId="choice" />} />
        <Route path="/study/aerodynamics/module-2/practice-2" element={<AerodynamicsChoicePractice />} />
        <Route path="/study/aerodynamics/module-2/one-word-1/:partSlug" element={<AerodynamicsPartPractice familyId="word" />} />
        <Route path="/study/aerodynamics/module-2/one-word-1" element={<AerodynamicsWordPractice />} />
        <Route path="/study" element={<Navigate to="/" replace />} />
        <Route path="/study/review/*" element={<Navigate to="/" replace />} />
        <Route path="/study/saved" element={<Navigate to="/" replace />} />
        <Route path="/study/about" element={<Navigate to="/" replace />} />
        <Route path="/study/electricity/module-1" element={<ElectricityTestList />} />
        <Route path="/study/electricity/module-1/practice-1" element={<ElectricityPractice />} />
        <Route path="/study/electricity/module-1/practice-2" element={<ElectricityEasyPractice />} />
        <Route path="/study/electricity/module-1/one-word-1" element={<ElectricityWordPractice />} />
        <Route path="/study/electricity/module-1/resistor-band-calculations" element={<ResistorBandPractice />} />
        <Route path="/study/safety/module-1" element={<SafetyTestList />} />
        <Route path="/study/safety/module-1/practice-1" element={<SafetyPractice key="practice-1" testNumber={1} />} />
        <Route path="/study/safety/module-1/practice-2" element={<SafetyPractice key="practice-2" testNumber={2} />} />
        <Route path="/study/safety/module-1/practice-4" element={<Navigate to="/study/safety/human-factors/practice-1" replace />} />
        <Route path="/study/safety/human-factors" element={<HumanFactorsTestList />} />
        <Route path="/study/safety/human-factors/practice-1" element={<HumanFactorsPractice />} />
        <Route path="/study/safety/module-1/practice-3" element={<SafetyPractice key="practice-3" testNumber={3} />} />
        <Route path="/study/safety/module-1/recall" element={<Navigate to="/study/safety/module-1/practice-3" replace />} />
        <Route path="/study/structures/module-2" element={<StructuresTestList />} />
        <Route path="/study/structures/module-1" element={<Navigate to="/study/structures/module-2" replace />} />
        <Route path="/study/structures/module-1/notes" element={<Navigate to="/study/structures/module-2/notes" replace />} />
        <Route path="/study/structures/module-2/practice-2" element={<StructuresModule2Practice />} />
        <Route path="/study/structures/module-2/practice-1" element={<MeasuringToolsPractice />} />
        <Route path="/study/structures/module-2/cotter-pin-sizing" element={<CotterPinPractice />} />
        <Route path="/study/structures/module-2/torque-bolt-nut" element={<StructuresTorquePractice />} />
        <Route path="/study/structures/module-1/torque-bolt-nut" element={<Navigate to="/study/structures/module-2/torque-bolt-nut" replace />} />
        <Route path="/study/structures/module-1/practice-1" element={<Navigate to="/study/systems/module-1/practice-2" replace />} />
        <Route path="/study/systems/module-1" element={<SystemsTestList />} />
        <Route path="/study/:slug/:module/notes" element={<CourseStudyNotes />} />
        <Route path="/study/systems/module-1/practice-1" element={<SystemsPractice />} />
        <Route path="/study/systems/module-1/practice-2" element={<SystemsMixedPractice />} />
        <Route path="/study/systems/module-1/one-word-1" element={<SystemsWordPractice />} />
        <Route path="/study/systems/module-1/one-word-2" element={<SystemsAppliedWordPractice />} />
        <Route path="/study/safety/module-1/test-1/multiple-choice/practice-1" element={<Navigate to="/study/safety/module-1/practice-1" replace />} />
        <Route path="/study/safety/module-1/test-1/*" element={<Navigate to="/study/safety/module-1" replace />} />
        <Route path="/study/:slug" element={<CourseDetail />} />
        <Route path="*" element={<CourseDetail />} />
      </Routes>
    </main>
    <nav className="study-tab-bar" aria-label="Study navigation">
      <NavLink to="/"><BookOpen size={22} /><span>Courses</span></NavLink>
      {onPractice && <><button type="button" className="study-reset-nav" title="Start a new attempt; keep your highest score" onClick={() => window.dispatchEvent(new CustomEvent(RESET_PRACTICE_EVENT, { detail: { testId: pathname } }))}><RotateCcw size={22} /><span>Reset Test</span></button><Link className="study-tests-nav" to={testsPath}><BookOpen size={22} /><span>Tests</span></Link></>}
    </nav>
  </div>;
}
