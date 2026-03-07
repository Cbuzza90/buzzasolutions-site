import { Link } from "react-router-dom";
import {
    ArrowRight,
    ShieldCheck,
    Laptop,
    Wifi,
    Mail,
    Printer,
    CheckCircle2,
    CircleHelp,
    Wrench,
} from "lucide-react";

function ServiceCard({ title, children, icon }) {
    const Icon = icon;
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <Icon className="h-5 w-5" />
                </div>

                <div>
                    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{children}</p>
                </div>
            </div>
        </div>
    );
}

function PricingCard({ title, price, description, featured = false }) {
    return (
        <div
            className={`rounded-3xl border p-6 shadow-sm ${featured
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-900"
                }`}
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3
                        className={`text-base font-semibold ${featured ? "text-white" : "text-slate-900"
                            }`}
                    >
                        {title}
                    </h3>

                    {price && (
                        <p
                            className={`mt-3 text-3xl font-bold tracking-tight ${featured ? "text-white" : "text-slate-900"
                                }`}
                        >
                            {price}
                        </p>
                    )}
                </div>

                {featured && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                        Most Popular
                    </span>
                )}
            </div>

            <p
                className={`mt-4 text-sm leading-6 ${featured ? "text-slate-200" : "text-slate-600"
                    }`}
            >
                {description}
            </p>
        </div>
    );
}

function InfoRow({ children }) {
    return (
        <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
            <p className="text-sm leading-6 text-slate-700">{children}</p>
        </div>
    );
}

export default function RemoteSupport() {
    return (
        <div className="space-y-8">
            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-sm">
                <div className="grid gap-10 p-8 md:grid-cols-[1.25fr_0.75fr] md:p-10">
                    <div>
                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                Windows & Mac & Androids & Apple
                            </span>
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                Session-based support
                            </span>
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                Friendly, clear help
                            </span>
                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Remote Support
                        </p>

                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            Professional remote tech support without the confusion.
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                            Get help with slow computers, Wi-Fi issues, email setup, printers,
                            software installs, and everyday tech problems. You stay in control
                            for the full session, can see what’s happening live, and can
                            disconnect at any time.
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/book"
                                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Book Remote Support
                            </Link>

                            <Link
                                to="/security"
                                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                            >
                                How this stays safe
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">
                            What to expect
                        </h2>

                        <div className="mt-6 space-y-4">
                            <InfoRow>
                                Clear troubleshooting for common home tech issues.
                            </InfoRow>
                            <InfoRow>
                                Support only with your permission while you are present.
                            </InfoRow>
                            <InfoRow>
                                Straightforward help without scare tactics or pressure.
                            </InfoRow>
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
                </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Services
                        </p>
                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            What I can help with
                        </h2>
                    </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <ServiceCard title="Slow computer / startup cleanup" icon={Laptop}>
                        Speed checks, startup apps, storage cleanup, updates, and basic
                        performance tuning to help your device run more smoothly.
                    </ServiceCard>

                    <ServiceCard title="Wi-Fi, internet, and app issues" icon={Wifi}>
                        Connectivity troubleshooting, browser problems, software installs,
                        and general login or app-related issues.
                    </ServiceCard>

                    <ServiceCard title="Email setup & syncing" icon={Mail}>
                        Gmail and Outlook setup, syncing issues, configuration problems,
                        and basic inbox cleanup guidance.
                    </ServiceCard>

                    <ServiceCard title="Printer & device setup" icon={Printer}>
                        Printer installs, scanning help, drivers, Bluetooth accessories,
                        and everyday device troubleshooting.
                    </ServiceCard>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm leading-6 text-slate-600">
                        <span className="font-semibold text-slate-900">Note:</span> iPhone and
                        iPad help is usually more guided, since Apple limits full remote control,
                        but I can still walk you through steps clearly.
                    </p>
                </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Pricing
                        </p>
                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            Simple, transparent session pricing
                        </h2>
                    </div>

                    <Link
                        to="/book"
                        className="text-sm font-semibold text-slate-900 underline underline-offset-4"
                    >
                        Book now
                    </Link>
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-3">
                    <PricingCard
                        title="Quick Fix"
                        price="$39"
                        description="30 minutes. Best for quick issues like printer problems, basic email setup, or simple troubleshooting."
                    />

                    <PricingCard
                        title="Standard Session"
                        price="$69"
                        description="60 minutes. Best for deeper troubleshooting, multiple issues, or more hands-on setup help."
                        featured
                    />

                    <PricingCard
                        title="Not sure what you need?"
                        price={null}
                        description="Book a request, describe the issue, and I’ll keep the process simple and transparent."
                    />
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <div className="rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="h-6 w-6" />
                        <h2 className="text-2xl font-bold tracking-tight">Safety first</h2>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="flex gap-3 rounded-2xl bg-white/5 p-4">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                            <p className="text-sm text-slate-200">
                                You stay in control of the session the whole time.
                            </p>
                        </div>

                        <div className="flex gap-3 rounded-2xl bg-white/5 p-4">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                            <p className="text-sm text-slate-200">
                                Remote access only happens with your permission.
                            </p>
                        </div>

                        <div className="flex gap-3 rounded-2xl bg-white/5 p-4">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                            <p className="text-sm text-slate-200">
                                I will never ask for banking passwords or use scare tactics.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link
                            to="/security"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4"
                        >
                            Read Security & Privacy
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="flex items-center gap-3">
                        <CircleHelp className="h-6 w-6 text-slate-700" />
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                            What I don’t do
                        </h2>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="flex gap-3">
                            <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                            <p className="text-sm leading-6 text-slate-700">
                                Crypto wallet recovery or anything involving seed phrases.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                            <p className="text-sm leading-6 text-slate-700">
                                Advanced data recovery or forensic-style work.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                            <p className="text-sm leading-6 text-slate-700">
                                Large Business servers or complex managed IT environments.
                            </p>
                        </div>
                    </div>

                    <p className="mt-6 text-sm leading-6 text-slate-500">
                        If something is high-risk or outside scope, I’ll tell you directly and
                        suggest the next best option where possible.
                    </p>
                </div>
            </section>
        </div>
    );
}