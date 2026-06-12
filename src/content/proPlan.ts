import type { Component } from 'vue';
import {
  PhArrowsClockwise,
  PhBell,
  PhBrowsers,
  PhChartLine,
  PhCloudArrowDown,
  PhDesktop,
  PhDevices,
  PhFingerprint,
  PhGlobe,
  PhGoogleLogo,
  PhImage,
  PhLockKey,
  PhMagnifyingGlass,
  PhMapTrifold,
  PhPalette,
  PhPath,
  PhPlugs,
  PhPulse,
  PhScan,
  PhTerminal,
} from '@phosphor-icons/vue';

export interface ProFeature {
  id: string;
  title: string;
  description: string;
  icon: Component;
}

export interface ProFeatureGroup {
  id: string;
  title: string;
  description: string;
  features: ProFeature[];
}

export const PRO_PLAN_GROUPS: ProFeatureGroup[] = [
  {
    id: 'monitor',
    title: 'Everything in open source',
    description: 'Full local monitoring with history, alerts, and live checks.',
    features: [
      {
        id: 'checks',
        title: 'HTTP, TCP, ICMP, and DNS monitoring',
        description: 'Scheduled checks with gateway vs upstream diagnosis.',
        icon: PhPulse,
      },
      {
        id: 'live',
        title: 'Live checks and speed tests',
        description: 'Per-network speed snapshots on Wi‑Fi and Ethernet rows.',
        icon: PhPlugs,
      },
      {
        id: 'alerts',
        title: 'Desktop, sound, and email alerts',
        description: 'Incident history with configurable notification defaults.',
        icon: PhBell,
      },
    ],
  },
  {
    id: 'toolkit',
    title: 'Pro network toolkit',
    description: 'On-demand tools inspired by a full network lab on your machine.',
    features: [
      {
        id: 'ping-tools',
        title: 'Ping and Ping Analyzer',
        description: 'Burst reachability tests and live latency charts.',
        icon: PhChartLine,
      },
      {
        id: 'traceroute',
        title: 'Traceroute',
        description: 'Hop-by-hop path when upstream issues are suspected.',
        icon: PhPath,
      },
      {
        id: 'port-scan',
        title: 'Port Scanner and Banner Grabber',
        description: 'TCP sweeps and service fingerprinting.',
        icon: PhScan,
      },
      {
        id: 'dns-tools',
        title: 'DNS Lookup and Propagation',
        description: 'Record lookups and resolver comparison.',
        icon: PhMagnifyingGlass,
      },
      {
        id: 'discovery',
        title: 'LAN discovery',
        description: 'Devices, UPnP, Bonjour, and NAT port mapping.',
        icon: PhDevices,
      },
      {
        id: 'tls-http',
        title: 'HTTP waterfall and TLS inspector',
        description: 'Request timing, headers, certificates, and ciphers.',
        icon: PhLockKey,
      },
      {
        id: 'enterprise',
        title: 'Enterprise inspectors',
        description: 'Read-only SSH, SMB, LDAP, and RDP probes.',
        icon: PhTerminal,
      },
      {
        id: 'fingerprints',
        title: 'Banner and service tools',
        description: 'Fingerprint services on common ports.',
        icon: PhFingerprint,
      },
    ],
  },
  {
    id: 'platform',
    title: 'Platform and cloud',
    description: 'Account-backed features on top of local-first monitoring.',
    features: [
      {
        id: 'google-auth',
        title: 'Google Sign-In',
        description: 'Proper authentication for Pro accounts.',
        icon: PhGoogleLogo,
      },
      {
        id: 'cloud-web',
        title: 'Cloud web version',
        description: 'Hosted Pro dashboard in the browser.',
        icon: PhBrowsers,
      },
      {
        id: 'cloud-sync',
        title: 'Cloud sync',
        description: 'Sync targets, settings, and history with your local app.',
        icon: PhArrowsClockwise,
      },
      {
        id: 'backup',
        title: 'Data backup',
        description: 'Export, restore, and optional encrypted cloud snapshots.',
        icon: PhCloudArrowDown,
      },
    ],
  },
  {
    id: 'product',
    title: 'Pro product extras',
    description: 'Polish and roadmap visibility built into the app.',
    features: [
      {
        id: 'roadmap',
        title: 'In-app roadmap',
        description: 'See what shipped, what is in progress, and what is next.',
        icon: PhMapTrifold,
      },
      {
        id: 'wallpaper',
        title: 'Pexels wallpaper',
        description: 'Curated dashboard backgrounds with rotation controls.',
        icon: PhImage,
      },
      {
        id: 'desktop',
        title: 'Desktop app',
        description: 'Menu-bar access, tray window, and deeper macOS network integration.',
        icon: PhDesktop,
      },
      {
        id: 'web-global',
        title: 'Whois and global DNS tools',
        description: 'Domain registration lookups and propagation checks.',
        icon: PhGlobe,
      },
      {
        id: 'appearance',
        title: 'Appearance controls',
        description: 'Theme switching and wallpaper categories.',
        icon: PhPalette,
      },
    ],
  },
];

export const OSS_PLAN_FEATURES = [
  'Local HTTP, TCP, ICMP, and DNS monitoring',
  'Gateway vs upstream diagnosis',
  'Live checks with network speed',
  'Incident history and alerts',
  'Open-source codebase on GitHub',
];
