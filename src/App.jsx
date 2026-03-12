import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import RemoteSupport from "./pages/RemoteSupport";
import Security from "./pages/Security";
import Book from "./pages/Book";
import Terms from "./pages/Terms";
import BusinessConsultation from "./pages/BusinessConsultation";
import RemoteHelp from "./pages/RemoteHelp";
import ClassServices from "./pages/ClassServices";
import InPersonServices from "./pages/InPersonServices";
import logo from "./assets/BuzzaSolutionsLogo.png";
import ScrollToTop from "./components/ScrollToTop";

function MobileMenuLink({ to, children, onClick, className = "" }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 ${className}`}
    >
      {children}
    </Link>
  );
}

function ServicesDropdown({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleNavigate() {
    setOpen(false);
    if (onNavigate) onNavigate();
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-2 transition hover:text-slate-900"
      >
        <span>Services</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
          role="menu"
        >
          <Link
            to="/remote-support"
            onClick={handleNavigate}
            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            role="menuitem"
          >
            Remote Support
          </Link>

          <Link
            to="/class-services"
            onClick={handleNavigate}
            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            role="menuitem"
          >
            Classes & Tech Lessons
          </Link>

          <Link
            to="/in-person-services"
            onClick={handleNavigate}
            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            role="menuitem"
          >
            In-Person Tech Help
          </Link>

          <Link
            to="/business-consultation"
            onClick={handleNavigate}
            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            role="menuitem"
          >
            Business Consultation
          </Link>
        </div>
      )}
    </div>
  );
}

function BottomPromoBar() {
  const promos = [
    {
      text: "Want to learn more about remote help?",
      cta: "Click here",
      to: "/remote-help",
    },
    {
      text: "Want to book a class and have it tailored to your needs?",
      cta: "Click here",
      to: "/class-services",
    },
    {
      text: "Have an issue that needs to be resolved in person?",
      cta: "Book here",
      to: "/in-person-services",
    },
  ];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 3000);

    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % promos.length);
        setVisible(true);
      }, 350);
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, [promos.length]);

  const currentPromo = promos[index];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <div
        className={`pointer-events-auto w-full max-w-2xl transform transition-all duration-500 ${visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0"
          }`}
      >
        <Link
          to={currentPromo.to}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 px-5 py-4 shadow-xl backdrop-blur"
        >
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">
              {currentPromo.text}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {currentPromo.cta}
            </p>
          </div>

          <div className="shrink-0 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-slate-800">
            Go
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  function closeMenus() {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 pb-28">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <Link
                to="/"
                className="rounded-2xl px-2 py-1 transition hover:bg-slate-100"
                onClick={closeMenus}
              >
                <img
                  src={logo}
                  alt="Buzza Solutions logo"
                  className="h-10 w-auto sm:h-11"
                />
              </Link>

              <div className="flex items-center gap-2">
                <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
                  <ServicesDropdown onNavigate={closeMenus} />

                  <Link
                    to="/remote-help"
                    className="transition hover:text-slate-900"
                    onClick={closeMenus}
                  >
                    Remote How To
                  </Link>

                  <Link
                    to="/security"
                    className="transition hover:text-slate-900"
                    onClick={closeMenus}
                  >
                    Your Privacy
                  </Link>

                  <Link
                    to="/terms"
                    className="transition hover:text-slate-900"
                    onClick={closeMenus}
                  >
                    Terms
                  </Link>
                </nav>

                <Link
                  to="/book"
                  className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 sm:px-4"
                  onClick={closeMenus}
                >
                  Book Support
                </Link>

                <button
                  type="button"
                  aria-label="Toggle menu"
                  aria-expanded={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {mobileMenuOpen ? (
                      <path d="M18 6 6 18M6 6l12 12" />
                    ) : (
                      <>
                        <path d="M3 6h18" />
                        <path d="M3 12h18" />
                        <path d="M3 18h18" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm md:hidden">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <span>Services</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""
                      }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {mobileServicesOpen && (
                  <div className="mt-1 space-y-1 pl-2">
                    <MobileMenuLink to="/remote-support" onClick={closeMenus}>
                      Remote Support
                    </MobileMenuLink>

                    <MobileMenuLink to="/class-services" onClick={closeMenus}>
                      Classes & Tech Lessons
                    </MobileMenuLink>

                    <MobileMenuLink
                      to="/in-person-services"
                      onClick={closeMenus}
                    >
                      In-Person Tech Help
                    </MobileMenuLink>

                    <MobileMenuLink
                      to="/business-consultation"
                      onClick={closeMenus}
                    >
                      Business Consultation
                    </MobileMenuLink>
                  </div>
                )}

                <MobileMenuLink to="/remote-help" onClick={closeMenus}>
                  Remote How To
                </MobileMenuLink>

                <MobileMenuLink to="/security" onClick={closeMenus}>
                  Your Privacy
                </MobileMenuLink>

                <MobileMenuLink to="/terms" onClick={closeMenus}>
                  Terms
                </MobileMenuLink>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 bg-slate-100">
            <div className="mx-auto max-w-6xl px-4 py-2 text-center text-sm text-slate-700 sm:px-6">
              <span className="block sm:inline">
                Need a website made or have a business inquiry?
              </span>{" "}
              <Link
                to="/business-consultation"
                className="mt-1 inline-block font-semibold text-slate-900 underline underline-offset-4 sm:mt-0"
                onClick={closeMenus}
              >
                Book a consultation →
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/remote-support" element={<RemoteSupport />} />
            <Route path="/class-services" element={<ClassServices />} />
            <Route path="/in-person-services" element={<InPersonServices />} />
            <Route path="/security" element={<Security />} />
            <Route path="/book" element={<Book />} />
            <Route path="/terms" element={<Terms />} />
            <Route
              path="/business-consultation"
              element={<BusinessConsultation />}
            />
            <Route path="/remote-help" element={<RemoteHelp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <BottomPromoBar />
      </div>
    </BrowserRouter>
  );
}