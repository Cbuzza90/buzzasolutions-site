import { useEffect, useState } from "react";
import { Link, Routes, Route, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, BookOpen, Calculator, ChevronRight, Compass, FileText, Layers, Plane, Search, Settings2, ShieldCheck, Wind, Zap } from "lucide-react";
import "./StudyHub.css";

const courses = [
  { slug: "electricity", title: "Aircraft Electricity 1", code: "AMEM-10001", category: "Foundations", icon: Zap, color: "amber", description: "Build your understanding of aircraft electricity, one topic at a time." },
  { slug: "aerodynamics", title: "Aircraft Eng & Aerodynamics", code: "AMEM-10002", category: "Foundations", icon: Wind, color: "sky", description: "Make sense of the principles behind flight and aircraft engineering." },
  { slug: "engines", title: "Aircraft Engines (Intro)", code: "AMEM-10057", category: "Aircraft", icon: Settings2, color: "violet", description: "Get familiar with aircraft engines and how their components work together." },
  { slug: "safety", title: "Aviation Health and Safety", code: "SAFE-10094", category: "Foundations", icon: ShieldCheck, color: "green", description: "Review the health and safety concepts covered in your aviation course." },
  { slug: "structures", title: "Basic Aircraft Structures 1", code: "AMEM-10003", category: "Aircraft", icon: Layers, color: "rose", description: "Explore aircraft construction, structures, and the parts that hold it all together." },
  { slug: "systems", title: "Basic Aircraft Systems", code: "AMEM-10004", category: "Aircraft", icon: Plane, color: "sky", description: "Connect the concepts behind the systems that keep an aircraft operating." },
  { slug: "math", title: "Math (Aviation Technician)", code: "MATH-10079", category: "Tools & math", icon: Calculator, color: "amber", description: "Practice the mathematical skills used in your aviation technician studies." },
  { slug: "publications", title: "Technical Publications/Documents", code: "AMEM-10033", category: "Tools & math", icon: FileText, color: "violet", description: "Find your way around the technical publications and documents used in class." },
];

function CourseList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All courses");
  const filtered = courses.filter(course => (category === "All courses" || category === course.category) && `${course.title} ${course.code}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <section className="study-hero">
      <div className="study-hero-copy">
        <p className="study-eyebrow"><span /> FALL 2026 · AVIATION TECHNICIAN</p>
        <h1>A little practice.<br /><span>A lot more confidence.</span></h1>
        <p>Your class, all in one place. Pick a course and make room for your next study session.</p>
        <a className="study-primary" href="#courses">Explore your courses <ChevronRight size={18} /></a>
      </div>
      <div className="study-flight-art" aria-hidden="true"><div className="study-orbit orbit-one" /><div className="study-orbit orbit-two" /><Plane className="study-art-plane" strokeWidth={1} /><span className="study-art-label">READY FOR YOUR NEXT CHAPTER</span><span className="study-art-coordinate">43° N / STUDY FLIGHT PLAN</span></div>
    </section>
    <div className="study-note"><BookOpen size={20} /><p><strong>Your study space is taking shape.</strong> Practice tests and questions are coming next.</p></div>
    <section id="courses" className="study-courses">
      <div className="study-section-heading"><div><p className="study-eyebrow">YOUR FLIGHT PLAN</p><h2>Find your course</h2></div><span className="study-count">8 courses</span></div>
      <label className="study-search"><Search size={20} /><span className="sr-only">Search courses by name or code</span><input type="search" placeholder="Search a course or course code" value={query} onChange={event => setQuery(event.target.value)} /></label>
      <div className="study-filters" aria-label="Filter courses">{["All courses", "Foundations", "Aircraft", "Tools & math"].map(item => <button key={item} className={category === item ? "selected" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <p className="sr-only" role="status">{filtered.length} courses found</p>
      <div className="study-grid">{filtered.map(course => <Link key={course.slug} to={`/study/${course.slug}`} className="study-course-card"><div className="study-card-top"><span className={`study-icon ${course.color}`}><course.icon size={24} strokeWidth={1.7} /></span><ArrowUpRight size={19} className="study-card-arrow" /></div><p className="study-course-code">{course.code}</p><h3>{course.title}</h3><div className="study-card-bottom"><span>{course.category}</span><span>View course <ChevronRight size={15} /></span></div></Link>)}</div>
      {filtered.length === 0 && <div className="study-empty"><Search size={28} /><h3>No courses found</h3><p>Try another name or course code.</p><button className="study-primary" onClick={() => { setQuery(""); setCategory("All courses"); }}>Show all courses</button></div>}
    </section>
    <section className="study-next"><Compass size={30} strokeWidth={1.5} /><div><h2>Built for the way you study.</h2><p>One place for your courses. Next up: practice questions, typed answers, and test mode.</p></div><span className="study-soon">COMING NEXT</span></section>
  </>;
}

function CourseDetail() {
  const { slug } = useParams();
  const course = courses.find(item => item.slug === slug);
  if (!course) return <section className="study-empty"><h1>Course not found</h1><p>Choose one of your eight courses to get started.</p><Link className="study-primary" to="/study">View courses</Link></section>;
  return <section className="study-detail"><Link className="study-back" to="/study"><ArrowLeft size={18} /> All courses</Link><span className={`study-icon ${course.color}`}><course.icon size={30} /></span><p className="study-eyebrow">{course.code} · FALL 2026</p><h1>{course.title}</h1><p className="study-detail-description">{course.description}</p><div className="study-detail-panel"><BookOpen size={32} strokeWidth={1.5} /><span className="study-soon">COMING NEXT</span><h2>Your practice starts here.</h2><p>We're preparing this course's study space. Topics and practice questions will appear here as they're added.</p><div className="study-planned"><span>Multiple choice</span><span>Typed answers</span><span>Practice & test modes</span></div></div><Link className="study-primary" to="/study">Explore another course <ChevronRight size={18} /></Link></section>;
}

export default function StudyHub() {
  useEffect(() => { const previous = document.title; document.title = "Student Study Hub | Buzza Solutions"; return () => { document.title = previous; }; }, []);
  return <div className="study-app"><a className="study-skip" href="#study-main">Skip to content</a><header className="study-header"><Link to="/study" className="study-brand"><span className="study-brand-mark"><Plane size={23} /></span><span>Buzza<span className="study-brand-light"> / Study</span><small>AVIATION STUDENT HUB</small></span></Link><Link to="/" className="study-site-link">Buzza Solutions <ArrowUpRight size={16} /></Link></header><main id="study-main" className="study-main" tabIndex={-1}><Routes><Route path="/study" element={<CourseList />} /><Route path="/study/:slug" element={<CourseDetail />} /><Route path="*" element={<CourseDetail />} /></Routes></main><footer className="study-footer"><span>Buzza Solutions / Study</span><p>An independent study space for classmates.</p><Link to="/study">All courses <ArrowUpRight size={14} /></Link></footer></div>;
}

