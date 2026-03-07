import { Link } from "react-router-dom";
import {
    ShieldCheck,
    MonitorSmartphone,
    CalendarCheck2,
    ArrowRight,
    CheckCircle2,
    Lock,
    Laptop,
    Wrench,
} from "lucide-react";

function Card({ title, children, to, icon }) {
    const Icon = icon;

    return (
        <Link
            to={to}
            className="group block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
        >
            <div className="flex items-start justify-between gap-4">
                {Icon && (
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                        <Icon className="h-5 w-5" />
                    </div>
                )}

                <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{children}</p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500 transition group-hover:text-slate-700">
                Click to learn more →
            </p>
        </Link>
    );
}

function Feature({ icon, title, text }) {
    const Icon = icon;

    return (
        <div className="flex gap-4">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                {Icon && <Icon className="h-5 w-5" />}
            </div>

            <div>
                <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <div className="space-y-8">
            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-sm">
                <div className="grid gap-10 p-8 md:grid-cols-[1.3fr_0.7fr] md:p-10">
                    <div>
                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                Remote Tech Support
                            </span>
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                Windows & Mac
                            </span>
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                Session-based access
                            </span>
                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Buzza Solutions · Over a decade of customer service experience
                        </p>

                        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            Friendly, secure, and remote tech help without the stress.
                        </h1>

                        <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-700">
                            Quick tip: most people don’t need to pay for expensive antivirus software.
                            Modern Windows and Mac devices already include strong built-in security.
                            I focus on fixing real problems, not selling unnecessary software.
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/remote-support"
                                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Remote Support Services →
                            </Link>
                        </div>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                            Get help with slow computers, viruses, software issues, printer problems,
                            email setup, and general troubleshooting. You stay in control of
                            the session the whole time and can disconnect whenever you want.
                        </p>

                        <div className="mt-8 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                                <div className="text-sm font-semibold text-slate-900">Secure sessions</div>
                                <div className="mt-1 text-sm text-slate-600">
                                    Remote access only with your permission.
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                                <div className="text-sm font-semibold text-slate-900">No-pressure help</div>
                                <div className="mt-1 text-sm text-slate-600">
                                    Clear support without scare tactics or upsells.
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                                <div className="text-sm font-semibold text-slate-900">You stay in control</div>
                                <div className="mt-1 text-sm text-slate-600">
                                    Watch everything live and disconnect anytime.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">Why people feel safer here</h2>

                        <div className="mt-6 space-y-5">
                            <Feature
                                icon={ShieldCheck}
                                title="No cold-call scam tactics"
                                text="Support starts only when you request it through the site."
                            />
                            <Feature
                                icon={Lock}
                                title="Privacy-first approach"
                                text="No banking passwords, no secret access, no surprise changes."
                            />
                            <Feature
                                icon={MonitorSmartphone}
                                title="Transparent remote support"
                                text="You can see what’s happening on your device during the session."
                            />
                        </div>

                        <div className="mt-6 border-t border-slate-200 pt-6">
                            <Link
                                to="/security"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-700"
                            >
                                Read Security & Privacy
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                <Card to="/remote-support" title="Remote Support" icon={Laptop}>
                    Help with slow PCs, printer problems, software installs, email setup,
                    updates, and general troubleshooting.
                </Card>
                <Card to="/book" title="Book a Session" icon={CalendarCheck2}>
                    Send a support request through the website and it goes directly to me
                    for review and follow-up.
                </Card>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                            How it works
                        </p>
                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            Simple, clear remote support
                        </h2>
                    </div>

                    <Link
                        to="/book"
                        className="text-sm font-semibold text-slate-900 underline underline-offset-4"
                    >
                        Start a request
                    </Link>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-3xl bg-slate-50 p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                            <CalendarCheck2 className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-base font-semibold text-slate-900">
                            1. Request support
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Fill out the booking form with your issue and device details.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-slate-50 p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                            <MonitorSmartphone className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-base font-semibold text-slate-900">
                            2. Connect securely
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            We start a remote session only with your permission and while
                            you are present.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-slate-50 p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                            <Wrench className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-base font-semibold text-slate-900">
                            3. Troubleshoot the issue
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            I work through the problem with you, explain what’s happening,
                            and keep the process straightforward.
                        </p>
                    </div>
                </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight">Safety promise</h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="flex gap-3 rounded-2xl bg-white/5 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                        <p className="text-sm text-slate-200">
                            I will never cold call you or pressure you into unnecessary work.
                        </p>
                    </div>

                    <div className="flex gap-3 rounded-2xl bg-white/5 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                        <p className="text-sm text-slate-200">
                            I will never ask for banking passwords or unrelated sensitive info.
                        </p>
                    </div>

                    <div className="flex gap-3 rounded-2xl bg-white/5 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                        <p className="text-sm text-slate-200">
                            You stay in control of the session and can disconnect anytime.
                        </p>
                    </div>

                    <div className="flex gap-3 rounded-2xl bg-white/5 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                        <p className="text-sm text-slate-200">
                            Remote access is session-based and only used to help resolve the issue.
                        </p>
                    </div>
                </div>

                <div className="mt-6">
                    <Link
                        to="/terms"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4"
                    >
                        Read Remote Support Terms
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}