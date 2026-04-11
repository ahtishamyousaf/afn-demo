"use client";

import React from "react";
import Script from "next/script";

export default function VoiceWidgetLoader() {
  return (
    <>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
      />
      {React.createElement("elevenlabs-convai", {
        "agent-id": "agent_4101knscx09yfybre31jcbgj86mf",
      })}
    </>
  );
}
