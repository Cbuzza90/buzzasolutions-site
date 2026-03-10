import {
    Download,
    Monitor,
    Key,
    Eye,
    MousePointerClick,
    ShieldCheck,
} from "lucide-react";

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
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                        {children}
                    </p>
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
                <h1 className="text-3xl font-bold tracking-tight">
                    How Remote Support Works
                </h1>

                <p className="mt-3 max-w-2xl text-slate-600">
                    Remote support lets me safely help you with your computer
                    while you watch everything live. You stay fully in control
                    the entire time and can disconnect whenever you want.
                </p>
            </section>

            {/* Steps */}
            <section className="grid gap-6 md:grid-cols-2">

                <Step icon={Download} title="1. Download AnyDesk">
                    I will send you a download link for AnyDesk or click{" "}
                    <a
                        href="https://anydesk.com/en/downloads/windows"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-slate-900 underline underline-offset-4"
                    >
                        here
                    </a>{" "}
                    to download it. Simply download the small program onto your computer.
                    No account is required.
                </Step>

                <Step icon={Monitor} title="2. Open AnyDesk">
                    Once you open the program, you will see a number labeled
                    <strong> “Your Address”</strong> or <strong>“This Desk”</strong>.
                    This is your AnyDesk ID.
                </Step>

                <Step icon={Key} title="3. Send Me Your ID">
                    Send me the number shown in AnyDesk. This allows me to send
                    a connection request to your computer.
                </Step>

                <Step icon={Eye} title="4. Choose View Only or Full Access">
                    When the connection request appears, you can choose what
                    level of access to allow. You may allow
                    <strong> screen viewing only</strong> so I can guide you,
                    or allow <strong>full remote control</strong> so I can fix
                    the issue directly.
                </Step>

                <Step icon={MousePointerClick} title="5. Get Help">
                    Once connected, I can troubleshoot the issue while you watch.
                    This might include fixing software issues, removing unwanted
                    programs, setting up devices, or adjusting settings.
                </Step>

                <Step icon={ShieldCheck} title="6. You Stay in Control">
                    You can disconnect at any time simply by closing AnyDesk.
                    The session ends immediately, and I cannot reconnect unless
                    you approve another session.
                </Step>

            </section>

            {/* Safety section */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold">Your Privacy & Safety</h2>

                <ul className="mt-4 space-y-2 text-slate-600">
                    <li>• You must approve the connection before it starts</li>
                    <li>• You can allow view-only or full access</li>
                    <li>• You can disconnect anytime</li>
                    <li>• Nothing stays connected after the session ends</li>
                </ul>
            </section>

        </div>
    );
}