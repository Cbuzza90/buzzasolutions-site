import { Link } from "react-router-dom";
import {
    House,
    Wifi,
    Printer,
    Monitor,
    Smartphone,
    ShieldCheck,
    CheckCircle2,
    ArrowRight,
    Wrench,
} from "lucide-react";

function ServiceItem({ icon, title, children }) {
    const Icon = icon;

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <Icon className="h-5 w-5" />
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{children}</p>
                </div>
            </div>
        </div>
    );
}

export default function InPersonServices() {
    return (
        <div className="space-y-10">
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                        Local Support
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                        Hands-on Help
                    </span>
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                    In-Person Tech Help
                </h1>

                <p className="mt-3 max-w-3xl text-slate-600">
                    Some problems are easier to solve in person. Buzza Solutions offers
                    local, hands-on tech help for setup, troubleshooting, device installs,
                    printer problems, WiFi issues, and other everyday tech tasks.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                        to="/book"
                        className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Book In-Person Help
                    </Link>

                    <Link
                        to="/services"
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                    >
                        Back to Services
                    </Link>
                </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
                <ServiceItem icon={Wifi} title="WiFi & Internet Issues">
                    Help with router setup, weak connections, disconnected devices,
                    and general home internet troubleshooting.
                </ServiceItem>

                <ServiceItem icon={Printer} title="Printer Setup & Troubleshooting">
                    Help connecting printers, resolving printing problems, and getting
                    devices working properly with your computer or network.
                </ServiceItem>

                <ServiceItem icon={Monitor} title="Computer Setup & Troubleshooting">
                    Hands-on help with desktops, monitors, cables, device connections,
                    software basics, and common setup problems.
                </ServiceItem>

                <ServiceItem icon={Smartphone} title="Phone & Device Setup">
                    Help setting up phones, tablets, smart devices, accounts, email,
                    and basic everyday device problems.
                </ServiceItem>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                        <Wrench className="h-5 w-5" />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            Great for problems that are easier in person
                        </h2>
                        <p className="mt-3 max-w-3xl text-slate-600">
                            Some tech issues are just easier when someone can be there in
                            person to see the setup, cables, devices, and environment. This
                            option is ideal for home tech setups, printer issues, WiFi
                            troubleshooting, and device installs.
                        </p>
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-900">Hands-on support</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Helpful for physical setups, cables, devices, and home tech issues.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-900">Local service</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            A good fit when remote support would be inconvenient or limited.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-900">Clear guidance</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Straightforward help without pressure, jargon, or unnecessary upsells.
                        </p>
                    </div>
                </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Common reasons to book</h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
                        <p className="text-sm text-slate-600">
                            Setting up a new computer, printer, router, or smart device
                        </p>
                    </div>

                    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
                        <p className="text-sm text-slate-600">
                            Fixing home WiFi or device connection issues
                        </p>
                    </div>

                    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
                        <p className="text-sm text-slate-600">
                            Getting help with cables, monitors, accessories, and physical setup
                        </p>
                    </div>

                    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
                        <p className="text-sm text-slate-600">
                            Solving issues that are difficult to explain remotely
                        </p>
                    </div>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-6">
                    <Link
                        to="/book"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-700"
                    >
                        Book in-person help
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                        <ShieldCheck className="h-5 w-5" />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">Professional, respectful service</h2>
                        <p className="mt-3 max-w-3xl text-slate-300">
                            In-person help is focused on solving real tech problems clearly and
                            respectfully. The goal is to make your setup easier, less stressful,
                            and more reliable.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}