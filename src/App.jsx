import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import RemoteSupport from "./pages/RemoteSupport";
import Security from "./pages/Security";
import Book from "./pages/Book";
import Terms from "./pages/Terms";
import BusinessConsultation from "./pages/BusinessConsultation";
import logo from "./assets/BuzzaSolutionsLogo.png";

function MobileMenuLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <Link
                to="/"
                className="rounded-2xl px-2 py-1 transition hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img
                  src={logo}
                  alt="Buzza Solutions logo"
                  className="h-10 w-auto sm:h-11"
                />
              </Link>

              <div className="flex items-center gap-2">
                <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
                  <Link
                    to="/remote-support"
                    className="transition hover:text-slate-900"
                  >
                    Remote Support
                  </Link>

                  <Link
                    to="/business-consultation"
                    className="transition hover:text-slate-900"
                  >
                    Business Consultation
                  </Link>

                  <Link
                    to="/security"
                    className="transition hover:text-slate-900"
                  >
                    Security
                  </Link>

                  <Link
                    to="/terms"
                    className="transition hover:text-slate-900"
                  >
                    Terms
                  </Link>
                </nav>

                <Link
                  to="/book"
                  className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 sm:px-4"
                  onClick={() => setMobileMenuOpen(false)}
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
                <MobileMenuLink
                  to="/business-consultation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Business Consultation
                </MobileMenuLink>
                <MobileMenuLink
                  to="/remote-support"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Remote Support
                </MobileMenuLink>

                <MobileMenuLink
                  to="/security"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Security
                </MobileMenuLink>

                <MobileMenuLink
                  to="/terms"
                  onClick={() => setMobileMenuOpen(false)}
                >
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
                onClick={() => setMobileMenuOpen(false)}
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
            <Route path="/security" element={<Security />} />
            <Route path="/book" element={<Book />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/business-consultation" element={<BusinessConsultation />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}