# AFN Voice Agent Demo

An interactive FAQ page for **Advance Funds Network (AFN)** powered by an ElevenLabs AI voice agent. Users can read frequently asked business loan questions or speak directly with an AI agent in real time.

**Live:** [afnvoiceagent.vercel.app](https://afnvoiceagent.vercel.app)

---

## Overview

Advance Funds Network needed a demo that showcases their AI voice agent capability alongside their most common business loan FAQs. This project delivers a clean, branded, production-ready page where visitors can either browse the FAQ accordion or start a live voice conversation with the AI agent directly from the browser — no phone, no app, no backend required.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Font | Plus Jakarta Sans |
| Voice Agent | ElevenLabs (`@elevenlabs/react`) |
| Deployment | Vercel |

---

## How It Works

**FAQ Accordion**
Five common business loan questions rendered as expandable cards. One open at a time, built with `useState` as a client component.

**Voice Widget**
Uses `@elevenlabs/react` `ConversationProvider` to open a WebSocket session with the ElevenLabs agent. When a user clicks Call Agent, the browser requests microphone access, connects to the agent, and the orb animates to reflect speaking or listening state. The session ends cleanly on disconnect.

**Layout**
Two-column grid on desktop — voice widget on the left, FAQ accordion on the right. Collapses to a single column on mobile. Brand colors, logo, and favicon match the official AFN website.

---

## What We Achieved

- Pixel-accurate build from Figma design
- Live AI voice agent embedded with no backend
- Real-time WebSocket conversation with animated orb feedback
- Fully responsive across all screen sizes
- Deployed on Vercel with automatic CI/CD from GitHub
- Matched official AFN branding across logo, favicon, colors, and typography
