# AFN Voice Agent Demo

An interactive FAQ page for **Advance Funds Network (AFN)** powered by an ElevenLabs AI voice agent. Users can read frequently asked business loan questions or speak directly with an AI agent in real time.

Live site: [afnvoiceagent.vercel.app](https://afnvoiceagent.vercel.app)

---

## What It Does

- Displays a FAQ accordion covering common AFN business loan questions
- Embeds an ElevenLabs conversational AI voice agent that users can call directly from the browser
- The agent answers questions about business loans, funding options, and AFN requirements using natural voice conversation
- Fully responsive layout that works on mobile, tablet, and desktop

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Font | Plus Jakarta Sans (Google Fonts) |
| Voice Agent | ElevenLabs (`@elevenlabs/react`) |
| Deployment | Vercel |

---

## How It Works

1. **FAQ Accordion** — Five common business loan questions are rendered as expandable cards. Only one is open at a time. Built as a client component with `useState`.

2. **Voice Widget** — Uses the `@elevenlabs/react` `ConversationProvider` to establish a WebSocket connection to the ElevenLabs agent. When the user clicks **Call Agent**:
   - The browser requests microphone permission
   - A WebSocket session opens with the configured `AGENT_ID`
   - The orb animates to indicate the agent is active/speaking
   - Clicking again ends the session cleanly

3. **Layout** — Two-column grid on desktop (left: heading + voice widget card, right: FAQ accordion). Single column on mobile. Matches AFN brand colors, logo, and favicon from the official site.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Configuration

The ElevenLabs agent ID is set in `components/VoiceWidget.tsx`:

```ts
const AGENT_ID = "agent_8901knj3m8b4evptjwe0y3hembcd";
```

Replace with your own agent ID from the [ElevenLabs dashboard](https://elevenlabs.io).

---

## What We Achieved

- Pixel-accurate implementation of the Figma design
- Live AI voice agent embedded directly in the page with no backend required
- WebSocket-based real-time conversation with animated orb feedback
- Fully responsive and production-ready
- Deployed on Vercel with automatic CI/CD from GitHub
- Matched official AFN branding (logo, favicon, colors, typography)
