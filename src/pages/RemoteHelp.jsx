import {
    Download,
    Monitor,
    Key,
    Eye,
    MousePointerClick,
    ShieldCheck,
    PlayCircle,
    ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function Step(props) {
    const { icon, title, children } = props;
    const Icon = icon;

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <Icon className="h-5 w-5" />
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                    <p className="mt-2 leading-relaxed text-slate-600">{children}</p>
                </div>
            </div>
        </div>
    );
}

export default function RemoteHelp() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                        Remote Support
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                        Step-by-step guide
                    </span>
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                    How Remote Support Works
                </h1>

                <p className="mt-3 max-w-2xl text-slate-600">
                    Remote support lets me safely help you with your computer while
                    you watch everything live. You stay fully in control the entire
                    time and can disconnect whenever you want.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                        to="/book"
                        className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Book Remote Support
                    </Link>

                    <a
                        href="https://anydesk.com/en/downloads/windows"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                    >
                        Download AnyDesk
                    </a>
                </div>
            </section>

            {/* Video Tutorial */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5 text-slate-700" />
                    <h2 className="text-xl font-semibold text-slate-900">
                        Watch: How to Install AnyDesk
                    </h2>
                </div>

                <p className="mt-3 max-w-2xl text-slate-600">
                    This short video walks you through how to download and open
                    AnyDesk so we can begin a remote support session. If you would
                    rather read the steps, you can follow the guide below.
                </p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                    <div className="aspect-video w-full">
                        <iframe
                            className="h-full w-full"
                            src="https://www.youtube.com/embed/KqkVJEmKg4A"
                            title="How to install AnyDesk"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>

            {/* Steps */}
            <section className="grid gap-6 md:grid-cols-2">
                <Step icon={Download} title="1. Download AnyDesk">
                    I will send you a download link for AnyDesk, or you can click{" "}
                    <a
                        href="https://anydesk.com/en/downloads/windows"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-slate-900 underline underline-offset-4"
                    >
                        here
                    </a>{" "}
                    to download it directly. It is a small program and you do not
                    need to create an account.
                </Step>

                <Step icon={Monitor} title="2. Open AnyDesk">
                    Once the program opens, you will see a number labeled{" "}
                    <strong>“Your Address”</strong> or <strong>“This Desk”</strong>.
                    That number is your AnyDesk ID.
                </Step>

                <Step icon={Key} title="3. Send Me Your ID">
                    Send me the number shown in AnyDesk. This lets me send a secure
                    connection request to your computer.
                </Step>

                <Step icon={Eye} title="4. Choose Your Access Level">
                    When the connection request appears, you can choose how much
                    access to allow. You may allow <strong>view-only access</strong>{" "}
                    so I can guide you, or <strong>full remote control</strong> so I
                    can fix the issue directly.
                </Step>

                <Step icon={MousePointerClick} title="5. Get Help">
                    Once connected, I can troubleshoot the issue while you watch.
                    This may include fixing software problems, removing unwanted
                    programs, setting up devices, or adjusting settings.
                </Step>

                <Step icon={ShieldCheck} title="6. You Stay in Control">
                    You can disconnect at any time simply by closing AnyDesk or ending
                    the session. Once the session ends, I cannot reconnect unless you
                    approve a new one.
                </Step>
            </section>

            {/* Safety section */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">
                    Your Privacy & Safety
                </h2>

                <ul className="mt-4 space-y-3 text-slate-600">
                    <li>• You must approve the connection before it starts</li>
                    <li>• You can choose view-only or full access</li>
                    <li>• You can disconnect anytime</li>
                    <li>• Nothing stays connected after the session ends</li>
                    <li>• Remote support only happens when you request it</li>
                </ul>

                <div className="mt-6 border-t border-slate-200 pt-6">
                    <Link
                        to="/security"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-700"
                    >
                        Read Security & Privacy
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}