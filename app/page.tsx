import FAQAccordion from "@/components/FAQAccordion";
import VoiceWidgetLoader from "@/components/VoiceWidgetLoader";

function AFNLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="32" height="30" viewBox="0 0 48 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="28,2 48,38 8,38" fill="#22C55E" />
        <polygon points="16,6 36,42 0,42" fill="#000C5D" opacity="0.92" />
        <polygon points="22,10 34,34 10,34" fill="#3B82F6" opacity="0.6" />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="text-[12px] font-bold text-[#000c5d] tracking-[0.04em]">advance</span>
        <span className="text-[9px] font-semibold text-[#000c5d] tracking-[0.12em] uppercase">funds network</span>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>

      {/* Header */}
      <header
        className="bg-white sticky top-0 z-10 h-14 flex items-center px-6 md:px-10"
        style={{ boxShadow: "0px 2px 20px 0px rgba(43,43,43,0.08)" }}
      >
        <div className="w-full flex items-center justify-between gap-4">
          <AFNLogo />
          <span className="text-sm md:text-base font-semibold text-[#000c5d] tracking-tight">
            Eleven labs voice agent demo
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center px-6 py-8 md:px-10 md:py-10">
        <div className="max-w-5xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-16 items-start">

            {/* Left */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-[#000c5d] leading-snug tracking-tight m-0 whitespace-nowrap">
                  Frequently asked questions
                </h1>
                <p className="text-xs md:text-sm text-[#4e5688] mt-1.5 leading-relaxed">
                  Still need help? Try our AI Support Agent below.
                </p>
              </div>

              {/* Widget card */}
              <div className="bg-[#ecf2ff] rounded-2xl p-8">
                <VoiceWidgetLoader />
              </div>
            </div>

            {/* Right */}
            <div className="lg:pt-0.5">
              <FAQAccordion />
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
