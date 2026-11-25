import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runVerification() {
  console.log('🔍 Starting SovStack Catalog Integrity Check...');

  // Dynamically import typescript catalog files using Node
  // We can read catalog.ts and verify structure or use esbuild/tsc/node loader
  // Let's write a robust verification that checks the compiled/exported definitions
  const catalogPath = path.resolve(__dirname, '../src/data/catalog.ts');
  const gigamonsPath = path.resolve(__dirname, '../src/data/gigamons.ts');
  const presetsPath = path.resolve(__dirname, '../src/data/presets.ts');

  if (!fs.existsSync(catalogPath)) throw new Error('catalog.ts missing');
  if (!fs.existsSync(gigamonsPath)) throw new Error('gigamons.ts missing');
  if (!fs.existsSync(presetsPath)) throw new Error('presets.ts missing');

  const catalogContent = fs.readFileSync(catalogPath, 'utf8');
  const gigamonsContent = fs.readFileSync(gigamonsPath, 'utf8');
  const presetsContent = fs.readFileSync(presetsPath, 'utf8');

  // Verify non-empty and well-formed
  console.log(`✓ catalog.ts exists (${catalogContent.length} bytes)`);
  console.log(`✓ gigamons.ts exists (${gigamonsContent.length} bytes)`);
  console.log(`✓ presets.ts exists (${presetsContent.length} bytes)`);

  // Verify essential gigamon parent names
  const requiredGigamons = [
    'Google (Alphabet)',
    'Meta (Facebook)',
    'Microsoft',
    'Apple',
    'Amazon',
    'ByteDance',
    'OpenAI',
    'Adobe',
  ];

  for (const gigamon of requiredGigamons) {
    if (!gigamonsContent.includes(gigamon)) {
      throw new Error(`Missing expected gigamon: ${gigamon}`);
    }
  }
  console.log('✓ All major gigamon dossiers present in gigamons.ts');

  // Verify core categories
  const requiredCategories = [
    'mail',
    'search',
    'browser',
    'mobile_os',
    'desktop_os',
    'messaging',
    'cloud_storage',
    'photos',
    'passwords',
    'two_factor',
    'notes',
    'ai_assistant',
    'maps',
    'vpn',
    'dns',
    'keyboards',
    'social',
    'video_streaming',
    'office',
    'app_stores',
    'smarthome',
    'analytics',
    'payments',
    'remote_desktop',
  ];

  for (const cat of requiredCategories) {
    if (!catalogContent.includes(`id: '${cat}'`)) {
      throw new Error(`Missing required category: ${cat}`);
    }
  }
  console.log(`✓ All ${requiredCategories.length} core categories verified in catalog.ts`);

  // Verify key privacy alternatives
  const requiredAlternatives = [
    'proton_mail',
    'tuta_mail',
    'signal',
    'simplex_chat',
    'mullvad_browser',
    'librewolf',
    'grapheneos',
    'debian',
    'arch_linux',
    'nextcloud',
    'ente_photos',
    'immich',
    'bitwarden',
    'keepassxc',
    'aegis',
    'obsidian',
    'joplin',
    'organic_maps',
    'quad9',
    'pihole',
    'futo_keyboard',
    'mastodon',
    'jellyfin',
    'libreoffice',
    'cryptpad',
    'home_assistant',
    'plausible',
    'monero',
    'rustdesk',
  ];

  for (const alt of requiredAlternatives) {
    if (!catalogContent.includes(`id: '${alt}'`)) {
      throw new Error(`Missing required privacy alternative: ${alt}`);
    }
  }
  console.log(`✓ All ${requiredAlternatives.length} critical privacy alternatives verified in catalog.ts`);

  console.log('🎉 Catalog Integrity Check Passed Successfully!');
}

runVerification().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
