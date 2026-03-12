import { Link } from "react-router-dom";
import {
    GraduationCap,
    Laptop,
    Smartphone,
    Mail,
    Wifi,
    ShieldCheck,
    CheckCircle2,
    ArrowRight,
    BookOpen,
} from "lucide-react";

function LessonCard({ icon, title, children }) {
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

export default function ClassServices() {
    return (
        <div className="space-y-10">
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                        One-on-One Help
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                        Beginner Friendly
                    </span>
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                    Classes & Tech Lessons
                </h1>

                <p className="mt-3 max-w-3xl text-slate-600">
                    Need help learning how to use your devices with more confidence?
                    I offer simple, one-on-one tech lessons for everyday computer,
                    phone, email, and internet tasks without confusing jargon or pressure.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                        to="/book"
                        className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Book a Lesson
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
                <LessonCard icon={Laptop} title="Computer Basics">
                    Learn the basics of using a desktop or laptop, including files,
                    folders, downloads, settings, and everyday computer tasks.
                </LessonCard>

                <LessonCard icon={Smartphone} title="Phone & Tablet Help">
                    Get help learning your iPhone, Android phone, or tablet, including
                    settings, apps, photos, storage, and common tasks.
                </LessonCard>

                <LessonCard icon={Mail} title="Email & Online Accounts">
                    Learn how to send emails, organize your inbox, reset passwords,
                    sign in safely, and manage common online account issues.
                </LessonCard>

                <LessonCard icon={Wifi} title="Internet & Everyday Tech">
                    Learn how WiFi works, how to connect devices, use websites safely,
                    and handle common internet or home tech questions.
                </LessonCard>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                        <BookOpen className="h-5 w-5" />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            What these lessons are like
                        </h2>
                        <p className="mt-3 max-w-3xl text-slate-600">
                            These are practical, patient, one-on-one lessons based on what
                            you want to learn. Whether you are brand new to technology or
                            just want help with a few specific things, the goal is to make
                            everything feel simple and comfortable.
                        </p>
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-900">At your pace</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            No rushing, no pressure, and no assumptions about your experience level.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-900">Simple language</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            I explain things in plain English instead of overly technical terms.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-900">Focused on real tasks</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Learn the things you actually want to use in everyday life.
                        </p>
                    </div>
                </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Why people like this option</h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
                        <p className="text-sm text-slate-600">
                            Great for people who want help understanding their device, not just fixing one issue.
                        </p>
                    </div>

                    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
                        <p className="text-sm text-slate-600">
                            Helpful for seniors, beginners, or anyone who wants patient one-on-one support.
                        </p>
                    </div>

                    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
                        <p className="text-sm text-slate-600">
                            Lessons can focus on computers, phones, email, online safety, and more.
                        </p>
                    </div>

                    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
                        <p className="text-sm text-slate-600">
                            The goal is confidence and clarity, not making things feel complicated.
                        </p>
                    </div>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-6">
                    <Link
                        to="/book"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-700"
                    >
                        Book a lesson
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
                        <h2 className="text-xl font-semibold">Friendly and comfortable support</h2>
                        <p className="mt-3 max-w-3xl text-slate-300">
                            These lessons are designed to feel approachable and easy to follow.
                            There is no judgment, no pressure, and no confusing sales tactics —
                            just practical help with the technology you use every day.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}