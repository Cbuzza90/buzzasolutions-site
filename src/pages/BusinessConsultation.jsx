import { Link } from "react-router-dom";
import { Briefcase, Globe, MessageSquare, ArrowRight } from "lucide-react";

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
                    <p className="mt-2 text-sm leading-6 text-slate-600">{children}</p>
                </div>
            </div>
        </div>
    );
}

export default function BusinessConsultation() {
    return (
        <div className="space-y-8">
            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-sm">
                <div className="grid gap-10 p-8 md:grid-cols-[1.25fr_0.75fr] md:p-10">
                    <div>
                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                Business Consultation
                            </span>
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                Website Projects
                            </span>
                            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                                Custom Inquiries
                            </span>
                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Buzza Solutions
                        </p>

                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            Let’s talk about your business, website, or custom project.
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                            Need a website made, help with business tech, or want to discuss a custom
                            project? Send over the details and I’ll review your inquiry to see how I can help.
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="#consultation-form"
                                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Start Your Inquiry
                            </a>

                            <Link
                                to="/remote-support"
                                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                            >
                                Need tech support instead?
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">What this page is for</h2>

                        <div className="mt-6 space-y-4">
                            <InfoCard title="Website projects" icon={Globe}>
                                Small business websites, landing pages, redesigns, and simple web presence setups.
                            </InfoCard>

                            <InfoCard title="Business tech help" icon={Briefcase}>
                                General business tech questions, setup help, workflow ideas, and project discussion.
                            </InfoCard>

                            <InfoCard title="Custom inquiries" icon={MessageSquare}>
                                If your request does not fit a standard service, send the details here.
                            </InfoCard>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="consultation-form"
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
            >
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Inquiry Form
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                        Business Consultation Request
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        Fill this out with as much detail as you can. The more context you provide,
                        the easier it is for me to understand your project and next steps.
                    </p>
                </div>

                <form
                    action="https://formspree.io/f/meerjwek"
                    method="POST"
                    className="mt-8 grid gap-5"
                >
                    <input type="text" name="_gotcha" className="hidden" />

                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-slate-900">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                                placeholder="Your name"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-slate-900">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="grid gap-2">
                            <label htmlFor="businessName" className="text-sm font-medium text-slate-900">
                                Business Name
                            </label>
                            <input
                                id="businessName"
                                name="businessName"
                                type="text"
                                className="rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                                placeholder="Your business name"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="projectType" className="text-sm font-medium text-slate-900">
                                What do you need help with?
                            </label>
                            <select
                                id="projectType"
                                name="projectType"
                                required
                                className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                            >
                                <option value="">Select one</option>
                                <option value="website">Website build</option>
                                <option value="website-redesign">Website redesign</option>
                                <option value="business-tech-help">Business tech help</option>
                                <option value="custom-project">Custom project</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="grid gap-2">
                            <label htmlFor="budget" className="text-sm font-medium text-slate-900">
                                Budget Range
                            </label>
                            <select
                                id="budget"
                                name="budget"
                                className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                            >
                                <option value="">Select a range</option>
                                <option value="under-500">Under $500</option>
                                <option value="500-1000">$500 – $1,000</option>
                                <option value="1000-2500">$1,000 – $2,500</option>
                                <option value="2500-plus">$2,500+</option>
                                <option value="not-sure">Not sure yet</option>
                            </select>
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="timeline" className="text-sm font-medium text-slate-900">
                                Timeline
                            </label>
                            <select
                                id="timeline"
                                name="timeline"
                                className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                            >
                                <option value="">Select a timeline</option>
                                <option value="asap">ASAP</option>
                                <option value="2-4-weeks">2–4 weeks</option>
                                <option value="1-2-months">1–2 months</option>
                                <option value="flexible">Flexible</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="details" className="text-sm font-medium text-slate-900">
                            Project Details
                        </label>
                        <textarea
                            id="details"
                            name="details"
                            rows="7"
                            required
                            className="rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                            placeholder="Tell me about your business, what you need, your goals, and anything else that would help."
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="website" className="text-sm font-medium text-slate-900">
                            Current Website or Social Link
                        </label>
                        <input
                            id="website"
                            name="website"
                            type="text"
                            className="rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                            placeholder="https://yourwebsite.com or social media page"
                        />
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm leading-6 text-slate-600">
                            This form is for business consultations and project inquiries. If you
                            need help with a computer issue, printer problem, virus cleanup, or
                            remote troubleshooting, please use the remote support booking page instead.
                        </p>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Send Business Inquiry
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}