// Pure SVG definitions for crisp canvas rendering
export function getAppSvgString(appId: string): string | null {
  switch (appId) {
    // Google
    case 'google_search':
    case 'google_dns':
    case 'google_analytics':
    case 'google_pay':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"/>
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z"/>
        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.6H1.25C.45 8.2.005 10.05.005 12s.45 3.8 1.245 5.4l4.03-3.13z"/>
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.6l4.03 3.13c.95-2.83 3.6-4.98 6.72-4.98z"/>
      </svg>`;

    case 'gmail':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M2 19h4v-8.5L2 7.5z"/>
        <path fill="#EA4335" d="M22 6c0-1.1-.9-2-2-2L12 11 4 4C2.9 4 2 4.9 2 6l10 7.5z"/>
        <path fill="#34A853" d="M18 10.5V19h4V7.5z"/>
        <path fill="#FBBC05" d="M6 19h12v-8.5l-6 4.5-6-4.5z"/>
      </svg>`;

    case 'chrome':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#EA4335"/>
        <circle cx="12" cy="12" r="5" fill="#FFFFFF"/>
        <circle cx="12" cy="12" r="4" fill="#4285F4"/>
        <path fill="#FBBC05" d="M12 12l8.66 5A10 10 0 0 1 3.34 17L7.66 9.5z" opacity="0.9"/>
        <path fill="#34A853" d="M12 12V2a10 10 0 0 1 8.66 15z" opacity="0.9"/>
      </svg>`;

    case 'google_drive':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#34A853" d="M8.2 19.5L16.4 19.5L22 10L13.8 10z"/>
        <path fill="#4285F4" d="M13.8 10L8.2 0L2.6 10L8.2 19.5z"/>
        <path fill="#FFBB00" d="M16.4 19.5L22 10L16.4 0L10.8 10z"/>
      </svg>`;

    case 'google_photos':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#EA4335" d="M12 0a6 6 0 0 0-6 6v6h6a6 6 0 0 0 6-6 6 6 0 0 0-6-6z"/>
        <path fill="#4285F4" d="M24 12a6 6 0 0 0-6-6h-6v6a6 6 0 0 0 6 6 6 6 0 0 0 6-6z"/>
        <path fill="#34A853" d="M12 24a6 6 0 0 0 6-6v-6h-6a6 6 0 0 0-6 6 6 6 0 0 0 6 6z"/>
        <path fill="#FBBC05" d="M0 12a6 6 0 0 0 6 6h6v-6a6 6 0 0 0-6-6 6 6 0 0 0 6 6z"/>
      </svg>`;

    case 'google_maps':
    case 'waze':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M12 0C7.58 0 4 3.58 4 8c0 5.25 7 13 8 16 1-3 8-10.75 8-16 0-4.42-3.58-8-8-8z"/>
        <circle cx="12" cy="8" r="3.5" fill="#FFFFFF"/>
        <circle cx="12" cy="8" r="2.2" fill="#EA4335"/>
      </svg>`;

    case 'stock_android':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#3DDC84" d="M6 18c0 .55.45 1 1 1h1v3c0 .55.45 1 1 1s1-.45 1-1v-3h4v3c0 .55.45 1 1 1s1-.45 1-1v-3h1c.55 0 1-.45 1-1V8H6v10zm-2-9c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1zm16 0c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1zM15.5 1.5l1.3-1.3c.2-.2.2-.5 0-.7s-.5-.2-.7 0l-1.5 1.5C13.6.7 12.8.5 12 .5s-1.6.2-2.6.5L7.9.5c-.2-.2-.5-.2-.7 0s-.2.5 0 .7l1.3 1.3C6.6 3.1 5.3 5.4 5.1 8h13.8c-.2-2.6-1.5-4.9-3.4-6.5z"/>
        <circle cx="9" cy="5.5" r=".9" fill="#FFFFFF"/>
        <circle cx="15" cy="5.5" r=".9" fill="#FFFFFF"/>
      </svg>`;

    case 'youtube':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
        <polygon fill="#FFFFFF" points="9.545,15.568 15.818,12 9.545,8.432"/>
      </svg>`;

    case 'google_gemini':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.627 12 12 0-6.627 5.627-12 12-12-6.627 0-12-5.627-12-12z"/>
      </svg>`;

    // Microsoft
    case 'windows':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#00A4EF" d="M0 3.449L9.75 2.1v9.451H0V3.449zm10.75-1.5L24 0v11.551H10.75V1.949zM0 12.449h9.75V21.9L0 20.551v-8.102zm10.75 0H24V24l-13.25-1.949V12.449z"/>
      </svg>`;

    case 'outlook':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#0078D4"/>
        <path fill="#FFFFFF" d="M4 6h16v12H4z" opacity="0.3"/>
        <polygon fill="#FFFFFF" points="4,7 12,13 20,7"/>
        <circle cx="8" cy="14" r="3" fill="#28A8EA"/>
        <text x="8" y="16.5" font-size="7" font-weight="bold" fill="#FFF" text-anchor="middle">O</text>
      </svg>`;

    case 'edge':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#0078D4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>`;

    // Apple
    case 'ios':
    case 'macos':
    case 'icloud_mail':
    case 'icloud_drive':
    case 'icloud_keychain':
    case 'apple_photos':
    case 'apple_notes':
    case 'apple_maps':
    case 'app_store':
    case 'imessage':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#FFFFFF" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.61.71-1.14 1.85-.99 2.95 1.07.08 2.15-.55 2.8-1.35z"/>
      </svg>`;

    case 'safari':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#006CFF"/>
        <circle cx="12" cy="12" r="9" fill="#FFFFFF" opacity="0.2"/>
        <polygon fill="#FF3B30" points="12,12 17,7 13,11"/>
        <polygon fill="#FFFFFF" points="12,12 7,17 11,13"/>
      </svg>`;

    // Meta & Social
    case 'whatsapp':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#25D366" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
        <path fill="#FFFFFF" d="M17.5 14.33c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.24-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.11 3.23 5.12 4.53.72.31 1.28.5 1.71.64.72.23 1.37.2 1.89.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.31.18-1.43-.08-.13-.28-.2-.58-.35z"/>
      </svg>`;

    case 'instagram':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="6" fill="#E1306C"/>
        <circle cx="12" cy="12" r="4.5" fill="none" stroke="#FFFFFF" stroke-width="2"/>
        <circle cx="18" cy="6" r="1.2" fill="#FFFFFF"/>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="#FFFFFF" stroke-width="2"/>
      </svg>`;

    case 'facebook':
    case 'messenger':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#1877F2"/>
        <path fill="#FFFFFF" d="M14.5 12h-2v8h-3v-8H8V9.5h1.5v-2C9.5 6.1 10.6 5 12 5h2.5v2.5h-1.5c-.3 0-.5.2-.5.5v1.5h2.5L14.5 12z"/>
      </svg>`;

    case 'tiktok':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#000000"/>
        <path fill="#25F4EE" d="M12.5 4v10.5a3.5 3.5 0 1 1-3.5-3.5c.3 0 .6.04.9.12V8.9a5.7 5.7 0 0 0-.9-.07 5.7 5.7 0 1 0 5.7 5.7V9.2a7.8 7.8 0 0 0 4.3 1.3v-2.3a5.5 5.5 0 0 1-4.3-4.2h-2.2z"/>
        <path fill="#FE2C55" d="M12 4v10.5a3.5 3.5 0 1 1-3.5-3.5c.3 0 .6.04.9.12V8.9a5.7 5.7 0 0 0-.9-.07 5.7 5.7 0 1 0 5.7 5.7V9.2a7.8 7.8 0 0 0 4.3 1.3v-2.3a5.5 5.5 0 0 1-4.3-4.2H12z" opacity="0.8"/>
      </svg>`;

    case 'chatgpt':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#10A37F"/>
        <path fill="#FFFFFF" d="M12 4.5a3.5 3.5 0 0 0-3.3 2.3 3.5 3.5 0 0 0-3.2 2.4 3.5 3.5 0 0 0 .8 3.9 3.5 3.5 0 0 0 1.2 3.8 3.5 3.5 0 0 0 3.8.7 3.5 3.5 0 0 0 3.7.3 3.5 3.5 0 0 0 2.8-2.6 3.5 3.5 0 0 0 0-4 3.5 3.5 0 0 0-2.3-3.3 3.5 3.5 0 0 0-3.5-3.5zm0 2c.8 0 1.5.7 1.5 1.5v3.5l-3 1.7V9.7c0-.8.7-1.5 1.5-1.5z"/>
      </svg>`;

    // Privacy Alternatives
    case 'proton_mail':
    case 'proton_drive':
    case 'proton_pass':
    case 'proton_vpn':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#6D4AFF"/>
        <path fill="#FFFFFF" d="M12 3L4 7v6c0 5 3.5 9.5 8 10.5 4.5-1 8-5.5 8-10.5V7l-8-4zm0 3.3l5.5 2.8v4.9c0 3.6-2.4 6.9-5.5 7.8-3.1-.9-5.5-4.2-5.5-7.8V9.1L12 6.3z"/>
      </svg>`;

    case 'tuta_mail':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#EA1A35"/>
        <path fill="#FFFFFF" d="M6 7h12v3H13.5v7h-3v-7H6V7z"/>
      </svg>`;

    case 'signal':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#2C6BED"/>
        <path fill="#FFFFFF" d="M12 5a7 7 0 0 0-7 7c0 1.8.7 3.5 1.9 4.8L6 20l3.4-.9c.8.4 1.7.6 2.6.6a7 7 0 0 0 7-7 7 7 0 0 0-7-7zm0 2.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6z"/>
      </svg>`;

    case 'simplex_chat':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#00D26A"/>
        <path fill="#FFFFFF" d="M12 6a6 6 0 1 0 6 6h-2.5a3.5 3.5 0 1 1-3.5-3.5V6z"/>
      </svg>`;

    case 'firefox':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#FF7139"/>
        <circle cx="13" cy="12" r="7" fill="#6C2BD9" opacity="0.8"/>
        <path fill="#FFBD4F" d="M12 2a10 10 0 0 0-9 14.5c1-1 2.5-1.5 4-1.5 3 0 5-2 5-5 0-1.5-.5-3-1.5-4.5 1 .5 2.5 1.5 3 3 1-1.5 1-3.5 0-5.5 2.5 1 4.5 3.5 4.5 6.5 0 4.5-3.5 8-8 8A10 10 0 0 0 22 12 10 10 0 0 0 12 2z"/>
      </svg>`;

    case 'librewolf':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#0575E6"/>
        <polygon fill="#FFFFFF" points="12,5 7,16 12,13 17,16"/>
      </svg>`;

    case 'mullvad_browser':
    case 'mullvad_vpn':
    case 'mullvad_dns':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#192A3E"/>
        <circle cx="12" cy="12" r="7" fill="#F2C500"/>
        <circle cx="9.5" cy="10" r="1.5" fill="#192A3E"/>
        <circle cx="14.5" cy="10" r="1.5" fill="#192A3E"/>
      </svg>`;

    case 'brave':
    case 'brave_search':
    case 'brave_leo':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#FB542B"/>
        <polygon fill="#FFFFFF" points="12,4 17,8 15,18 12,20 9,18 7,8"/>
      </svg>`;

    case 'tor_browser':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#7D4698"/>
        <circle cx="12" cy="12" r="8" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
        <circle cx="12" cy="12" r="5" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
        <circle cx="12" cy="12" r="2" fill="#FFFFFF"/>
      </svg>`;

    case 'duckduckgo':
    case 'duckduckgo_ai':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#DE5833"/>
        <circle cx="12" cy="10" r="4.5" fill="#FFFFFF"/>
        <polygon fill="#F9A01B" points="12,12 16,13 12,14"/>
      </svg>`;

    case 'grapheneos':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#1A1A1A"/>
        <polygon fill="#2E7D32" points="12,4 19,8 19,16 12,20 5,16 5,8"/>
        <polygon fill="#4CAF50" points="12,6 17,9 17,15 12,18 7,15 7,9"/>
      </svg>`;

    case 'debian':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#D70A53"/>
        <path fill="#FFFFFF" d="M12 6c-3.3 0-6 2.7-6 6 0 1.5.5 2.9 1.4 4l1.5-1.5c-.5-.7-.9-1.6-.9-2.5 0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.1-.4 2.1-1.2 2.8l1.4 1.4c1.2-1.1 1.8-2.6 1.8-4.2 0-3.3-2.7-6-6-6z"/>
      </svg>`;

    case 'arch_linux':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#1793D1"/>
        <polygon fill="#FFFFFF" points="12,4 5,19 8,19 12,9 16,19 19,19"/>
      </svg>`;

    case 'nextcloud':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#0082C9"/>
        <circle cx="12" cy="12" r="4" fill="#FFFFFF"/>
        <circle cx="6" cy="12" r="2.5" fill="#FFFFFF"/>
        <circle cx="18" cy="12" r="2.5" fill="#FFFFFF"/>
      </svg>`;

    case 'ente_photos':
    case 'ente_auth':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#14B8A6"/>
        <circle cx="12" cy="12" r="6" fill="#FFFFFF"/>
        <circle cx="14" cy="10" r="1.5" fill="#14B8A6"/>
      </svg>`;

    case 'immich':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#4255FF"/>
        <circle cx="12" cy="12" r="6" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
      </svg>`;

    case 'bitwarden':
    case 'vaultwarden':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#175DDC"/>
        <path fill="#FFFFFF" d="M12 4L5 7.5v6c0 4.5 3 8 7 9.5 4-1.5 7-5 7-9.5v-6L12 4zm0 3.5l4.5 2.2v4.3c0 3.1-2 5.6-4.5 6.7-2.5-1.1-4.5-3.6-4.5-6.7V9.7L12 7.5z"/>
      </svg>`;

    case 'keepassxc':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#54BA43"/>
        <path fill="#FFFFFF" d="M12 6a4 4 0 0 0-4 4c0 1.6 1 3 2.5 3.6V18h3v-2h2v-2h-2v-1.4c1.5-.6 2.5-2 2.5-3.6a4 4 0 0 0-4-4zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
      </svg>`;

    case 'aegis':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#00A86B"/>
        <polygon fill="#FFFFFF" points="12,5 18,9 18,15 12,19 6,15 6,9"/>
      </svg>`;

    case 'obsidian':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#7C3AED"/>
        <polygon fill="#FFFFFF" points="12,4 18,10 14,20 10,20 6,10"/>
      </svg>`;

    case 'quad9':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#00529B"/>
        <text x="12" y="16.5" font-size="13" font-weight="bold" fill="#FFFFFF" text-anchor="middle">9</text>
      </svg>`;

    case 'pihole':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#C51A4A"/>
        <circle cx="12" cy="10" r="2.5" fill="#FFFFFF"/>
        <circle cx="9" cy="13" r="2.5" fill="#FFFFFF"/>
        <circle cx="15" cy="13" r="2.5" fill="#FFFFFF"/>
      </svg>`;

    case 'mastodon':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#6364FF"/>
        <path fill="#FFFFFF" d="M19 10c0-4-3-4.5-3-4.5-1.5-.5-4.5-.5-4.5-.5s-3 0-4.5.5c0 0-3 .5-3 4.5 0 2.5 0 6 3 6.5 1 .2 2 .2 3 .1v-1.5c-1 0-2 0-2.5-.2-1-.4-1-1.5-1-1.9 0 0 1 .5 3 .5 1.5.1 3 .1 4.5 0 2-.2 3.5-.8 3.5-.8v-3.2zm-2.5 2h-1.5v-3.5h-1.5v2.5h-1.5V8.5H10.5V12H9V7.5h2.5L12 9.2l.5-1.7h2.5V12z"/>
      </svg>`;

    case 'jellyfin':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#00A4DC"/>
        <polygon fill="#FFFFFF" points="12,6 18,17 6,17"/>
      </svg>`;

    case 'monero':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#FF6600"/>
        <polygon fill="#FFFFFF" points="12,12 16,8 16,16 12,16 12,12 8,16 8,8"/>
      </svg>`;

    case 'libreoffice':
    case 'cryptpad':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#18A303"/>
        <polygon fill="#FFFFFF" points="6,4 14,4 18,8 18,20 6,20"/>
      </svg>`;

    case 'rustdesk':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#0E7490"/>
        <circle cx="12" cy="12" r="5" fill="none" stroke="#FFFFFF" stroke-width="2"/>
      </svg>`;

    default:
      return null;
  }
}
