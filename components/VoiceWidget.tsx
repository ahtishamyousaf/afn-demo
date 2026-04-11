"use client";

import { useCallback, useState } from "react";
import { useConversation, ConversationProvider } from "@elevenlabs/react";
import { Orb } from "@/components/ui/orb";
import type { AgentState } from "@/components/ui/orb";

const AGENT_ID = "agent_4101knscx09yfybre31jcbgj86mf";

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

function ConversationWidget() {
  const [permissionError, setPermissionError] = useState("");

  const conversation = useConversation({
    agentId: AGENT_ID,
    onDisconnect: () => setPermissionError(""),
    onError: (error) => {
      console.error("ElevenLabs error:", error);
      setPermissionError("Connection failed. Please try again.");
    },
  });

  const isConnected = conversation.status === "connected";
  const isConnecting = conversation.status === "connecting";
  const isActive = isConnected || isConnecting;

  const agentState: AgentState = !isActive
    ? null
    : isConnecting
    ? "thinking"
    : conversation.isSpeaking
    ? "talking"
    : "listening";

  const handleCall = useCallback(async () => {
    if (isConnected) {
      conversation.endSession();
      return;
    }
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setPermissionError("Microphone access is required.");
      return;
    }
    setPermissionError("");
    conversation.startSession({ agentId: AGENT_ID });
  }, [isConnected, conversation]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: "100%", fontFamily: "var(--font-jakarta), sans-serif" }}>

      {/* 3D Orb */}
      <div style={{ position: "relative", width: 240, height: 240 }}>
        <Orb
          agentState={agentState}
          colors={["#2792dc", "#9ce6e6"]}
          className="absolute inset-0 w-full h-full"
        />

        {/* Speech bubble */}
        {!isActive && (
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
        )}
      </div>

      {/* Status */}
      {isActive && (
        <p style={{ fontSize: 13, color: "#4E5688", margin: 0 }}>
          {isConnecting ? "Connecting…" : conversation.isSpeaking ? "Agent is speaking…" : "Listening…"}
        </p>
      )}

      {permissionError && (
        <p style={{ fontSize: 12, color: "#DC2626", textAlign: "center", margin: 0 }}>{permissionError}</p>
      )}

      {/* Call button */}
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
  );
}

export default function VoiceWidget() {
  return (
    <ConversationProvider agentId={AGENT_ID}>
      <ConversationWidget />
    </ConversationProvider>
  );
}
