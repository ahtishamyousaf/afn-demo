"use client";

import { useCallback, useState } from "react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";

const AGENT_ID = "agent_8901knj3m8b4evptjwe0y3hembcd";

function OutgoingCallIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="white"/>
      <path d="M16 3H21V8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 3L15 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}


function EndCallIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="white"/>
      <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function Orb({ isActive }: { isActive: boolean }) {
  return (
    <div className={`relative flex items-center justify-center ${isActive ? "orb-active" : ""}`}>
      <div className="ring1 absolute rounded-full" style={{ width: 240, height: 240, background: "rgba(34,197,94,0.22)", opacity: 0 }} />
      <div className="ring2 absolute rounded-full" style={{ width: 240, height: 240, background: "rgba(34,197,94,0.16)", opacity: 0 }} />
      <div className="ring3 absolute rounded-full" style={{ width: 240, height: 240, background: "rgba(34,197,94,0.10)", opacity: 0 }} />
      <div
        className="orb-sphere relative z-10 rounded-full"
        style={{
          width: 240,
          height: 240,
          background: `radial-gradient(
            circle at 36% 32%,
            rgba(255,255,255,0.88) 0%,
            #6EE7D4 12%,
            #2DD4BF 26%,
            #34D399 42%,
            #10B981 60%,
            #059669 78%,
            #065F46 100%
          )`,
          boxShadow: `
            inset -18px -18px 36px rgba(0,0,0,0.18),
            inset 12px 12px 24px rgba(255,255,255,0.22),
            0 12px 40px rgba(16,185,129,0.32),
            0 4px 16px rgba(0,0,0,0.10)
          `,
        }}
      />
    </div>
  );
}

function ConversationWidget() {
  const conversation = useConversation();
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionError, setPermissionError] = useState("");

  const isConnected = conversation.status === "connected";
  const isConnecting = conversation.status === "connecting";
  const isActive = isConnected || isConnecting;

  const requestPermission = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      setPermissionError("");
      return true;
    } catch {
      setPermissionError("Microphone access is required.");
      return false;
    }
  }, []);

  const handleCall = useCallback(async () => {
    if (isConnected) { conversation.endSession(); return; }
    const ok = hasPermission || (await requestPermission());
    if (!ok) return;
    conversation.startSession({ agentId: AGENT_ID, connectionType: "websocket" });
  }, [isConnected, hasPermission, requestPermission, conversation]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, width: "100%", fontFamily: "var(--font-jakarta), sans-serif" }}>

      {/* Orb + speech bubble */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <Orb isActive={isActive} />

        {/* Speech bubble to the right */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translateY(-50%)",
          background: "#FFFFFF",
          borderRadius: 12,
          padding: "10px 14px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
          whiteSpace: "nowrap",
          zIndex: 20,
        }}>
          <div style={{
            position: "absolute",
            right: "100%",
            top: "50%",
            transform: "translateY(-50%)",
            width: 0, height: 0,
            borderTop: "7px solid transparent",
            borderBottom: "7px solid transparent",
            borderRight: "9px solid #FFFFFF",
          }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#000C5D" }}>
            Hey there! How can I help you?
          </span>
        </div>
      </div>

      {/* Status */}
      {isActive && (
        <p style={{ fontSize: 13, color: "#4E5688", marginTop: -12 }}>
          {isConnecting ? "Connecting…" : conversation.isSpeaking ? "Agent is speaking…" : "Listening…"}
        </p>
      )}

      {permissionError && (
        <p style={{ fontSize: 12, color: "#DC2626", textAlign: "center" }}>{permissionError}</p>
      )}

      {/* Circular buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {/* Primary */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <button
            onClick={handleCall}
            style={{
              width: 56, height: 56,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: isConnected ? "#DC2626" : "#000C5D",
              boxShadow: "0 4px 14px rgba(0,12,93,0.32)",
              transition: "transform 0.15s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            {isConnected ? <EndCallIcon /> : <OutgoingCallIcon />}
          </button>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#000C5D" }}>
            {isConnected ? "End Call" : "Call Agent"}
          </span>
        </div>

      </div>

    </div>
  );
}

export default function VoiceWidget() {
  return (
    <ConversationProvider agentId={AGENT_ID} connectionType="websocket">
      <ConversationWidget />
    </ConversationProvider>
  );
}
