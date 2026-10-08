export type GigamonParent = 
  | 'Google (Alphabet)'
  | 'Meta (Facebook)'
  | 'Microsoft'
  | 'Apple'
  | 'Amazon'
  | 'ByteDance'
  | 'OpenAI'
  | 'Adobe'
  | 'Commercial Data Brokers'
  | 'Other Monoliths';

export type SurveillanceVector = 
  | 'Behavioral Ad Profiling'
  | 'Continuous Geolocation Tracking'
  | 'AI Training Data Harvesting'
  | 'Biometric & Facial Telemetry'
  | 'Audio & Voice Ingestion'
  | 'Cross-Site & Cross-Device Graphs'
  | 'Keystroke & Input Logging'
  | 'Third-Party Data Broker Sales'
  | 'Telemetry & Diagnostics Surveillance';

export type RiskLevel = 'Critical' | 'Severe' | 'High' | 'Moderate';

export type PrivacyBadge = 
  | 'FOSS' 
  | 'E2EE' 
  | 'Self-Hostable' 
  | 'Zero-Knowledge' 
  | 'Audited' 
  | 'Decentralized' 
  | 'Local-Only' 
  | 'No-Logs';

export interface MainstreamApp {
  id: string;
  name: string;
  parent: GigamonParent;
  riskLevel: RiskLevel;
  surveillanceVectors: SurveillanceVector[];
  summary: string;
  iconBg?: string;
  symbol?: string; // Emoji or short symbol
}

export interface PrivacyAlternative {
  id: string;
  name: string;
  website: string;
  description: string;
  badges: PrivacyBadge[];
  license?: string;
  jurisdiction?: string;
  symbol?: string;
  recommended?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
  order: number;
  mainstreamApps: MainstreamApp[];
  alternatives: PrivacyAlternative[];
}

export interface GigamonDossier {
  name: GigamonParent;
  ticker?: string;
  revenueModel: string;
  surveillanceScope: string;
  privacyViolationsHighlight: string;
  accentColor: string;
}

export type CardTheme = 'matrix' | 'titanium' | 'emerald' | 'terminal' | 'eink';
export type CardAspectRatio = '1:1' | '16:9' | '4:5';

export interface PackSelection {
  [categoryId: string]: {
    mainstreamId: string;
    alternativeIds: string[]; // up to 3
  };
}

export interface PresetStack {
  id: string;
  title: string;
  badge: string;
  description: string;
  selections: PackSelection;
}
