# 🛡️ DeGigamon

> **The comprehensive, open-source alternative to [PrivacyPack.org](https://privacypack.org/).**
> Break free from data-collecting gigamons. Showcase your privacy-first digital life, track your sovereignty score, and export your privacy wins in high-resolution shareable cards.

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](./LICENSE)
[![Zero Telemetry](https://img.shields.io/badge/Telemetry-Zero-brightgreen.svg)](#zero-tracking-guarantee)
[![100% Client-Side](https://img.shields.io/badge/Runtime-100%25%20Client--Side-blue.svg)](#architecture)

---

## 🌟 Why DeGigamon? (Comparison with PrivacyPack)

| Feature | PrivacyPack.org | DeGigamon |
| :--- | :--- | :--- |
| **Catalog Depth** | Limited curated list | **Exhaustive coverage of all major data-collecting gigamons & top private alternatives** across 24+ categories |
| **Gigamon Surveillance Dossiers** | ❌ None | **Detailed threat intelligence** (revenue model, surveillance vectors, regulatory fines, and violation records) |
| **Surveillance Matrix / Radar** | ❌ None | **Live Gigamons Eviction Matrix** tracking decoupling from Google, Meta, Microsoft, Apple, Amazon, ByteDance, OpenAI |
| **Digital Sovereignty Score** | ❌ None | **Dynamic real-time independence score meter (0–100%)** factoring in E2EE, FOSS, and self-hosted upgrades |
| **Card Export Customization** | Single fixed layout | **Multi-theme studio** (Matrix Cyber, Titanium Slate, Forest Emerald, Terminal Green, E-Ink Monochrome) + Aspect ratios (1:1 Square, 16:9 Banner, 4:5 Story) |
| **Preset Migration Stacks** | ❌ None | **1-Click Stacks**: "The De-Google Blueprint", "The Anti-Meta Shield", "The Homelab Sovereign", "Maximum Privacy & E2EE", "Everyday Practical Privacy" |
| **Shareable URL Configuration** | ❌ None | **Zero-server URL hash state** (`#pack=...`) to share exact setups with friends |
| **Hosting & Privacy** | Web app | **100% Client-Side**, zero cookies, zero third-party telemetry, fully offline capable |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (tested on Node 22 & Node 26)
- `pnpm` (recommended), `npm`, or `yarn`

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/your-username/degigamon.git
cd degigamon

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

## 🗂️ Covered Categories & Surveillance Monoliths

DeGigamon catalogs all major mainstream tech "gigamons" and their privacy-respecting counterparts across 24+ core areas:

1. **Mail**: Gmail, Outlook, Yahoo Mail, iCloud ➔ Proton Mail, Tuta, mailbox.org, Posteo, SimpleLogin, Addy.io, Forward Email
2. **Search**: Google Search, Bing, Yahoo, Yandex ➔ DuckDuckGo, Brave Search, Kagi, SearXNG, Startpage, Mojeek, Qwant
3. **Browser**: Chrome, Edge, Safari, Opera, Samsung Internet ➔ Firefox, LibreWolf, Mullvad Browser, Brave, Tor Browser, Ungoogled Chromium
4. **Mobile OS**: Stock Android (GMS), iOS ➔ GrapheneOS, CalyxOS, LineageOS, /e/OS, DivestOS, postmarketOS
5. **Desktop OS**: Windows 11, macOS, ChromeOS ➔ Debian, Fedora, Arch Linux, Linux Mint, Tails OS, Qubes OS, NixOS
6. **Messaging**: WhatsApp, Messenger, Telegram, Discord, Teams, Slack ➔ Signal, SimpleX Chat, Session, Matrix / Element, Threema, Briar
7. **Cloud Storage**: Google Drive, OneDrive, Dropbox, iCloud Drive ➔ Nextcloud, Proton Drive, Filen, Syncthing, Cryptomator, Seafile
8. **Photos & Gallery**: Google Photos, Apple Photos, Amazon Photos ➔ Ente Photos, Immich, PhotoPrism, Nextcloud Memories, Fossify Gallery
9. **Password Managers**: Google Passwords, iCloud Keychain, LastPass, Dashlane ➔ Bitwarden, KeePassXC, Proton Pass, Vaultwarden, Strongbox
10. **2FA Authenticator**: Google Authenticator, MS Authenticator, Authy, Duo ➔ Aegis Authenticator, 2FAS, Ente Auth, FreeOTP+
11. **Notes & Knowledge**: Google Keep, OneNote, Apple Notes, Notion, Evernote ➔ Obsidian, Joplin, Standard Notes, Cryptee, Notesnook, Logseq
12. **AI Assistants & LLMs**: OpenAI ChatGPT, Google Gemini, MS Copilot, Meta AI ➔ Local LLMs (Ollama / LM Studio), Venice.ai, DuckDuckGo AI, Brave Leo
13. **Maps & Navigation**: Google Maps, Apple Maps, Waze ➔ Organic Maps, OsmAnd, OpenStreetMap, Magic Earth
14. **VPN & Encrypted Tunnels**: ExpressVPN (Kape), NordVPN, CyberGhost ➔ Mullvad VPN, Proton VPN, IVPN, Self-Hosted WireGuard, Tailscale/Headscale
15. **DNS & Ad Blocking**: Google DNS (8.8.8.8), Cloudflare, ISP DNS ➔ Quad9 (9.9.9.9), Pi-hole, AdGuard Home, NextDNS, Mullvad DNS
16. **Keyboards**: Gboard, SwiftKey, Samsung Keyboard ➔ FUTO Keyboard, HeliBoard, FlorisBoard, AnySoftKeyboard
17. **Social & Microblogs**: X/Twitter, Instagram, Facebook, TikTok, Reddit ➔ Mastodon, Lemmy, Pixelfed, Bluesky, Nostr
18. **Video & Entertainment**: YouTube, Spotify, Netflix ➔ Jellyfin, NewPipe, Invidious/Piped, AntennaPod, Spotube
19. **Office & Productivity**: Google Docs/Sheets, Microsoft 365, Adobe Acrobat ➔ LibreOffice, CryptPad, ONLYOFFICE, Collabora Online
20. **App Stores**: Google Play Store, Apple App Store ➔ F-Droid, Aurora Store, Obtainium, Accrescent
21. **Smart Home & IoT**: Google Home/Nest, Amazon Alexa/Ring, Tuya ➔ Home Assistant, ESPHome, Zigbee2MQTT
22. **Web Analytics**: Google Analytics (GA4), Meta Pixel ➔ Plausible Analytics, Umami, Matomo
23. **Payments & Currency**: PayPal, Venmo, Google Pay, Apple Pay ➔ Physical Cash, Monero (XMR), Bisq, Liberapay
24. **Remote Desktop**: TeamViewer, AnyDesk ➔ RustDesk

---

## 🔒 Zero-Tracking Guarantee

- **No Remote Telemetry**: Zero analytics pings, no Google Analytics, no tracking pixels.
- **Client-Side Card Rendering**: Cards are rendered directly in your browser using standard HTML5 Canvas without sending image data to any external server.
- **No Third-Party Cookies**: Operates with standard browser local storage for keeping your selections across sessions.
- **Audited FOSS Links**: All alternative links point to official websites and open-source repositories.

---

## 🤝 Contributing & Adding New Apps

New apps can be submitted by updating `src/data/catalog.ts`. Run the validation check before submitting a PR:

```bash
pnpm test:catalog
```

All contributions must follow our criteria:
- **Mainstream Apps**: Must identify the parent corporate monopoly and list documented surveillance vectors.
- **Private Alternatives**: Must provide verifiable source repositories or independent privacy audits.

---

## 📄 License

Distributed under the [MIT License](./LICENSE).
