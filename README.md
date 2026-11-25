# SovStack

> **Open-source digital sovereignty stack builder.**
> Live app: [abdullahon2006.github.io/sovstack](https://abdullahon2006.github.io/sovstack/)
> Showcase your privacy-first digital life, inspect corporate surveillance dossiers, track your sovereignty score, and export your stack as high-resolution shareable cards.

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](./LICENSE)
[![Zero Telemetry](https://img.shields.io/badge/Telemetry-Zero-brightgreen.svg)](#zero-tracking-guarantee)

---

## Key Features

- **24+ Categories & 215+ Services**: Covers Mail, Search, Browsers, Mobile/Desktop OS, Messaging, Cloud Storage, Photos, Passwords, 2FA, Notes, AI Assistants, Maps, VPNs, DNS, Keyboards, Social, Video, Office, App Stores, Smart Home, Analytics, Payments, and Remote Desktop.
- **Surveillance Dossiers**: Corporate threat profiles detailing revenue models, surveillance vectors, and documented regulatory penalties across Google, Meta, Microsoft, Apple, Amazon, ByteDance, OpenAI, and Adobe.
- **Digital Sovereignty Score**: Real-time 0–100% meter weighted by evicted monoliths and verified privacy properties (Zero-Knowledge, E2EE, FOSS, Self-Hostable).
- **Card Export Studio**: Multi-theme PNG generator (Dark Charcoal, Clean White, Titanium Slate, Terminal Green, Emerald Forest) in 1:1, 16:9, and 4:5 aspect ratios.
- **1-Click Presets & Stateless Sharing**: Ready-made blueprints ("The De-Google Blueprint", "The Anti-Meta Shield", "The Homelab Sovereign", "Maximum Privacy & E2EE", "Everyday Practical Privacy") and URL-hash sharing (`#pack=...`).

---

## Quick Start

### Prerequisites
- Node.js 18+
- `pnpm` (recommended), `npm`, or `yarn`

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/Abdullahon2006/sovstack.git
cd sovstack

# Install dependencies
pnpm install

# Start local development server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Verify catalog integrity
pnpm test:catalog

# Typecheck and build static production bundle
pnpm build

# Preview production build locally
pnpm preview
```

---

## Zero-Tracking Guarantee

- **No Remote Telemetry**: Zero analytics pings, no third-party font CDNs, no tracking pixels.
- **Local Card Rendering**: Cards are rendered in your browser using HTML5 Canvas without uploading data to any server.
- **No Cookies**: Uses standard browser `localStorage` to keep your selections across visits.
- **Audited FOSS Links**: Alternative links point to official project websites and open-source repositories.

---

## Contributing & Adding New Apps

New apps can be submitted by updating `src/data/catalog.ts` and `src/lib/iconSvgs.ts`. Run the validation check before submitting a PR:

```bash
pnpm test:catalog
```

---

## License

Distributed under the [MIT License](./LICENSE).
