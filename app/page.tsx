import FAQAccordion from "@/components/FAQAccordion";
import VoiceWidgetLoader from "@/components/VoiceWidgetLoader";

function AFNLogo() {
  return (
    <img src="/logo.svg" alt="Advance Funds Network" height={32} style={{ height: 32, width: "auto" }} />
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
