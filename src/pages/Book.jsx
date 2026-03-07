export default function Book() {
    return (
        <div className="space-y-10">
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-3xl font-bold tracking-tight">Book Remote Support</h1>
                <p className="mt-3 max-w-2xl text-slate-600">
                    Fill this out and I’ll get back to you ASAP. You stay in control the entire time —
                    you can see everything I do and disconnect anytime.
                </p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <form
                    action="https://formspree.io/f/meerjwek"
                    method="POST"
                    className="grid gap-5"
                >
                    {/* Spam honeypot (bots fill this, humans won't) */}
                    <input type="text" name="_gotcha" className="hidden" />

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            name="name"
                            required
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                            placeholder="Your name"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                            placeholder="you@email.com"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Phone (optional)</label>
                        <input
                            name="phone"
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                            placeholder="(###) ###-####"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Device</label>
                        <select
                            name="device"
                            required
                            defaultValue=""
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                        >
                            <option value="" disabled>Select one</option>
                            <option>Windows PC</option>
                            <option>Mac</option>
                            <option>iPhone / iPad (guided)</option>
                            <option>Android</option>
                            <option>Not sure</option>
                        </select>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">What’s going on?</label>
                        <textarea
                            name="issue"
                            required
                            rows={5}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                            placeholder="Describe the issue, any error messages, and what you’ve already tried."
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Preferred time (optional)</label>
                        <input
                            name="preferred_time"
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                            placeholder="e.g., Weeknights after 7pm, or Saturday afternoon"
                        />
                    </div>

                    <label className="flex items-start gap-3 text-sm text-slate-700">
                        <input
                            name="agree"
                            type="checkbox"
                            required
                            className="mt-1 h-4 w-4 rounded border-slate-300"
                        />
                        <span>
                            I agree to the Remote Support Terms and understand remote access is session-based and I can end the session at any time.
                        </span>
                    </label>

                    {/* Nice email subject */}
                    <input type="hidden" name="_subject" value="New Remote Support Request — Buzza Solutions" />

                    <button
                        type="submit"
                        className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                        Send Request
                    </button>

                    <p className="text-xs text-slate-500">
                        Tip: Never accept remote help from someone who cold-calls you. I only connect after you contact me through this website.
                    </p>
                </form>
            </section>
        </div>
    );
}