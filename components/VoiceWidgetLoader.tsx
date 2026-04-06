"use client";

import dynamic from "next/dynamic";

const VoiceWidget = dynamic(() => import("@/components/VoiceWidget"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-48">
      <div className="w-10 h-10 rounded-full border-2 border-[#16a34a] border-t-transparent animate-spin" />
    </div>
  ),
});

export default function VoiceWidgetLoader() {
  return <VoiceWidget />;
}
