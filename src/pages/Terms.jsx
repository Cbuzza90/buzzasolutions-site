import { Link } from "react-router-dom";
import { ShieldCheck, FileText, ArrowRight, CheckCircle2 } from "lucide-react";

function TermCard({ number, title, children }) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-bold text-slate-700">
                    {number}
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                    <div className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SummaryItem({ children }) {
    return (
        <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
            <p className="text-sm leading-6 text-slate-700">{children}</p>
        </div>
    );
}

export default function Terms() {
    return (
        <div className="space-y-8">
            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-sm">
                <div className="grid gap-10 p-8 md:grid-cols-[1.25fr_0.75fr] md:p-10">
                    <div>
                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                Remote Support Terms
                            </span>
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                Clear expectations
                            </span>
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                Transparent service
                            </span>
                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Terms & Conditions
                        </p>

                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            Remote support terms, written clearly.
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                            By booking remote support with Buzza Solutions, you agree to the
                            following terms. These are here to keep expectations clear, protect
                            both sides, and make the process straightforward.
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/book"
                                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Book Support
                            </Link>

                            <Link
                                to="/security"
                                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                            >
                                Read Security & Privacy
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <FileText className="h-6 w-6 text-slate-700" />
                            <h2 className="text-lg font-semibold text-slate-900">
                                In plain English
                            </h2>
                        </div>

                        <div className="mt-6 space-y-4">
                            <SummaryItem>
                                You stay in control of the remote session and can disconnect at any time.
                            </SummaryItem>
                            <SummaryItem>
                                I do my best to resolve issues, but not every problem can be guaranteed to be fixed.
                            </SummaryItem>
                            <SummaryItem>
                                You are responsible for backing up important files before support sessions.
                            </SummaryItem>
                            <SummaryItem>
                                If something is unsafe, abusive, illegal, or outside scope, I may refuse service.
                            </SummaryItem>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
                <TermCard number="1" title="Consent to Remote Access">
                    <p>
                        By requesting remote support, you grant Buzza Solutions permission to
                        access your computer or device through secure remote access software for
                        the purpose of diagnosing and resolving technical issues.
                    </p>
                    <p>
                        You remain in control of your device at all times and may end the session
                        at any time.
                    </p>
                </TermCard>

                <TermCard number="2" title="Best Effort Service">
                    <p>
                        Technical support services are provided on a best-effort basis. While
                        every reasonable effort will be made to resolve your issue, Buzza
                        Solutions cannot guarantee that all problems can be resolved.
                    </p>
                </TermCard>

                <TermCard number="3" title="Data Responsibility">
                    <p>
                        Clients are responsible for maintaining backups of important data before
                        remote support sessions.
                    </p>
                    <p>
                        While care is taken to avoid data loss, Buzza Solutions is not responsible
                        for loss, corruption, or damage to files, software, or operating systems.
                    </p>
                </TermCard>

                <TermCard number="4" title="Software and System Changes">
                    <p>
                        Troubleshooting may involve installing, uninstalling, modifying, or
                        updating software and system settings.
                    </p>
                    <p>
                        By requesting support, you authorize these changes when reasonably needed
                        to diagnose or resolve the issue.
                    </p>
                </TermCard>

                <TermCard number="5" title="Security and Privacy">
                    <p>
                        Buzza Solutions will not intentionally access personal files, passwords,
                        or other sensitive information unless it is required to resolve the
                        technical issue and done with your knowledge during the session.
                    </p>
                </TermCard>

                <TermCard number="6" title="Payments and Refunds">
                    <p>
                        Payment is required for completed support sessions.
                    </p>
                    <p>
                        Refunds may be offered at the discretion of Buzza Solutions if a service
                        cannot reasonably be provided.
                    </p>
                </TermCard>

                <TermCard number="7" title="Limitation of Liability">
                    <p>
                        To the maximum extent permitted by law, Buzza Solutions is not liable for
                        indirect, incidental, or consequential damages resulting from remote
                        support services, including but not limited to loss of data, software
                        issues, or system downtime.
                    </p>
                </TermCard>

                <TermCard number="8" title="Right to Refuse Service">
                    <p>
                        Buzza Solutions reserves the right to refuse or discontinue service if a
                        request is unsafe, illegal, abusive, or outside the scope of provided
                        services.
                    </p>
                </TermCard>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6" />
                    <h2 className="text-2xl font-bold tracking-tight">Built around clarity and trust</h2>
                </div>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200">
                    These terms are meant to keep remote support clear, safe, and straightforward.
                    If you have questions before booking, you can review the security page or send
                    a support request with details first.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                        to="/security"
                        className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                        Read Security & Privacy
                        <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                        to="/book"
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                        Book Remote Support
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}