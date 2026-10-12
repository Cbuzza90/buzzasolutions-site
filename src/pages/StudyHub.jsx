import { useEffect, useState } from "react";
import { Link, NavLink, Routes, Route, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Bookmark, BookOpen, Calculator, ChevronRight, FileText, Info, Layers, Plane, Search, Settings2, ShieldCheck, Wind, Zap } from "lucide-react";
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

function CourseList({ saved = [], savedOnly = false }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All courses");
  const filtered = courses.filter(course => (!savedOnly || saved.includes(course.slug)) && (category === "All courses" || category === course.category) && `${course.title} ${course.code}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <section className="study-welcome"><p className="study-eyebrow">FALL 2026</p><h1>{savedOnly ? "Saved courses" : "Your courses"}</h1><p>{savedOnly ? "Keep the courses you need close by." : "What are we studying today?"}</p></section>
    <section id="courses" className="study-courses">
      <label className="study-search"><Search size={20} /><span className="sr-only">Search courses by name or code</span><input type="search" placeholder="Search a course or course code" value={query} onChange={event => setQuery(event.target.value)} /></label>
      <div className="study-filters" aria-label="Filter courses">{["All courses", "Foundations", "Aircraft", "Tools & math"].map(item => <button key={item} className={category === item ? "selected" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <p className="sr-only" role="status">{filtered.length} courses found</p>
      <div className="study-grid">{filtered.map(course => <Link key={course.slug} to={`/study/${course.slug}`} className="study-course-card"><div className="study-card-top"><span className={`study-icon ${course.color}`}><course.icon size={24} strokeWidth={1.7} /></span><ArrowUpRight size={19} className="study-card-arrow" /></div><p className="study-course-code">{course.code}</p><h3>{course.title}</h3><div className="study-card-bottom"><span>{course.category}</span><span>View course <ChevronRight size={15} /></span></div></Link>)}</div>
      {filtered.length === 0 && <div className="study-empty"><Bookmark size={28} /><h3>{savedOnly && saved.length === 0 ? "Your shortcuts go here" : "No courses found"}</h3><p>{savedOnly && saved.length === 0 ? "Open a course and tap Save course to find it here." : "Try another name or course code."}</p>{savedOnly && saved.length === 0 ? <Link className="study-primary" to="/study">Browse courses</Link> : <button className="study-primary" onClick={() => { setQuery(""); setCategory("All courses"); }}>Clear filters</button>}</div>}
    </section>
  </>;
}

function CourseDetail({ saved, toggleSaved }) {
  const { slug } = useParams();
  const course = courses.find(item => item.slug === slug);
  if (!course) return <section className="study-empty"><h1>Course not found</h1><p>Choose one of your eight courses to get started.</p><Link className="study-primary" to="/study">View courses</Link></section>;
  return <section className="study-detail"><Link className="study-back" to="/study"><ArrowLeft size={18} /> All courses</Link><span className={`study-icon ${course.color}`}><course.icon size={30} /></span><p className="study-eyebrow">{course.code} · FALL 2026</p><h1>{course.title}</h1><p className="study-detail-description">{course.description}</p><button className="study-save" aria-pressed={saved.includes(course.slug)} onClick={() => toggleSaved(course.slug)}><Bookmark size={18} fill={saved.includes(course.slug) ? "currentColor" : "none"} />{saved.includes(course.slug) ? "Course saved" : "Save course"}</button><div className="study-detail-panel"><BookOpen size={32} strokeWidth={1.5} /><span className="study-soon">COMING NEXT</span><h2>Your practice starts here.</h2><p>We're preparing this course's study space. Topics and practice questions will appear here as they're added.</p><div className="study-planned"><span>Multiple choice</span><span>Typed answers</span><span>Practice & test modes</span></div></div><Link className="study-primary" to="/study">Explore another course <ChevronRight size={18} /></Link></section>;
}

function AboutStudy() {
  return <section className="study-detail"><div className="study-welcome"><p className="study-eyebrow">YOUR STUDY SPACE</p><h1>About Study</h1><p>An independent study app for our aviation class.</p></div><div className="study-detail-panel"><h2>Questions are coming next</h2><p>Browse all eight courses and save your favourites while we prepare practice questions. Multiple choice, typed answers, and test mode will be added next.</p></div><div className="study-detail-panel"><h2>Saved on this device</h2><p>Your saved courses stay in this browser. There are no accounts yet, so they won't sync between devices. Clearing browser data removes your saved courses.</p></div></section>;
}

export default function StudyHub() {
  const [saved, setSaved] = useState(() => {
    try {
      const value = JSON.parse(localStorage.getItem("study-saved-courses") || "[]");
      return Array.isArray(value) ? value.filter(slug => courses.some(course => course.slug === slug)) : [];
    } catch { return []; }
  });
  const [storageError, setStorageError] = useState(false);
  function toggleSaved(slug) {
    const next = saved.includes(slug) ? saved.filter(item => item !== slug) : [...saved, slug];
    setSaved(next);
    try { localStorage.setItem("study-saved-courses", JSON.stringify(next)); setStorageError(false); }
    catch { setStorageError(true); }
  }
  useEffect(() => { const previous = document.title; document.title = "Aviation Study"; return () => { document.title = previous; }; }, []);
  return <div className="study-app">
    <a className="study-skip" href="#study-main">Skip to content</a>
    <header className="study-header"><Link to="/study" className="study-brand"><span className="study-brand-mark"><Plane size={23} /></span><span>Study<small>AVIATION TECHNICIAN</small></span></Link><span className="study-term">FALL '26</span></header>
    <main id="study-main" className="study-main" tabIndex={-1}>
      {storageError && <p className="study-storage-message" role="status">Saving is unavailable in this browser. Your courses will stay saved for this session.</p>}
      <Routes>
        <Route path="/study" element={<CourseList />} />
        <Route path="/study/saved" element={<CourseList saved={saved} savedOnly />} />
        <Route path="/study/about" element={<AboutStudy />} />
        <Route path="/study/:slug" element={<CourseDetail saved={saved} toggleSaved={toggleSaved} />} />
        <Route path="*" element={<CourseDetail saved={saved} toggleSaved={toggleSaved} />} />
      </Routes>
    </main>
    <nav className="study-tab-bar" aria-label="Study navigation">
      <NavLink to="/study" end><BookOpen size={22} /><span>Courses</span></NavLink>
      <NavLink to="/study/saved"><Bookmark size={22} /><span>Saved</span></NavLink>
      <NavLink to="/study/about"><Info size={22} /><span>About</span></NavLink>
    </nav>
  </div>;
}
