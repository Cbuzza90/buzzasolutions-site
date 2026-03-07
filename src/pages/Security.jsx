import { Link } from "react-router-dom";
import {
    ShieldCheck,
    Lock,
    Eye,
    MonitorSmartphone,
    CheckCircle2,
    Ban,
    ArrowRight,
    Handshake,
} from "lucide-react";

function InfoCard({ title, children, icon }) {
    const Icon = icon;

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
                {Icon && (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                        <Icon className="h-5 w-5" />
                    </div>
                )}

                <div>
                    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                    <div className="mt-3 text-sm leading-6 text-slate-600">{children}</div>
                </div>
            </div>
        </div>
    );
}

function CheckItem({ children }) {
    return (
        <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
            <p className="text-sm leading-6 text-slate-700">{children}</p>
        </div>
    );
}

function BanItem({ children }) {
    return (
        <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
            <Ban className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
            <p className="text-sm leading-6 text-slate-700">{children}</p>
        </div>
    );
}

export default function Security() {
    return (
        <div className="space-y-8">
            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-sm">
                <div className="grid gap-10 p-8 md:grid-cols-[1.25fr_0.75fr] md:p-10">
                    <div>
                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                Security & Privacy
                            </span>
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                Session-based access
                            </span>
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                You stay in control
                            </span>
                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Trust matters
                        </p>

                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            Remote support should feel safe, clear, and fully in your control.
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                            My process is designed to be transparent and easy to understand.
                            No cold calls, no scare tactics, and no pressure. You decide when
                            a session starts, you can watch everything happening live, and you
                            can disconnect whenever you want.
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/book"
                                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Book Remote Support
                            </Link>

                            <Link
                                to="/terms"
                                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                            >
                                Read Terms
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">
                            My safety promise
                        </h2>

                        <div className="mt-6 space-y-4">
                            <CheckItem>I will never cold call you.</CheckItem>
                            <CheckItem>I will never ask for banking passwords.</CheckItem>
                            <CheckItem>You can disconnect at any time.</CheckItem>
                            <CheckItem>Remote access is session-based only.</CheckItem>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
                <InfoCard title="How remote sessions work" icon={MonitorSmartphone}>
                    <ol className="grid gap-3">
                        <li>1. You contact me through the website.</li>
                        <li>2. We agree on the issue and the type of support needed.</li>
                        <li>3. You start the remote connection with your permission.</li>
                        <li>4. You stay in control of your device throughout the session.</li>
                    </ol>
                </InfoCard>

                <InfoCard title="What makes this safer" icon={ShieldCheck}>
                    <ul className="grid gap-3">
                        <li>• Support only starts after you request it.</li>
                        <li>• You can see what is happening on your screen.</li>
                        <li>• Access is used only for the active session.</li>
                        <li>• The session ends when you close it or disconnect.</li>
                    </ul>
                </InfoCard>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Boundaries
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                        What I will never ask for
                    </h2>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <BanItem>Banking passwords</BanItem>
                    <BanItem>Credit card numbers over random chat</BanItem>
                    <BanItem>Gift cards or crypto payments</BanItem>
                    <BanItem>Permanent unattended access to your device</BanItem>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <div className="rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <Handshake className="h-6 w-6" />
                        <h2 className="text-2xl font-bold tracking-tight">
                            Why this is different from scam tech support
                        </h2>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="flex gap-3 rounded-2xl bg-white/5 p-4">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                            <p className="text-sm text-slate-200">
                                I only connect after you contact me through this website.
                            </p>
                        </div>

                        <div className="flex gap-3 rounded-2xl bg-white/5 p-4">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                            <p className="text-sm text-slate-200">
                                You choose whether to begin the session.
                            </p>
                        </div>

                        <div className="flex gap-3 rounded-2xl bg-white/5 p-4">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                            <p className="text-sm text-slate-200">
                                You can see what is happening on your screen the whole time.
                            </p>
                        </div>

                        <div className="flex gap-3 rounded-2xl bg-white/5 p-4">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                            <p className="text-sm text-slate-200">
                                The session ends when you close it or disconnect.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="flex items-center gap-3">
                        <Lock className="h-6 w-6 text-slate-700" />
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                            Privacy-first approach
                        </h2>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="flex gap-3">
                            <Eye className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                            <p className="text-sm leading-6 text-slate-700">
                                I do not intentionally access personal files unless it is needed
                                to help with the issue and you are aware of it.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Eye className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                            <p className="text-sm leading-6 text-slate-700">
                                My goal is to solve the problem clearly and respectfully, without
                                pressuring you into unnecessary software or services.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Eye className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                            <p className="text-sm leading-6 text-slate-700">
                                If something feels outside scope or higher risk, I will tell you
                                directly rather than guessing.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 border-t border-slate-200 pt-6">
                        <Link
                            to="/book"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-700"
                        >
                            Start a support request
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}