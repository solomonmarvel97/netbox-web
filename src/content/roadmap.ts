import type { Component } from 'vue';
import {
  PhArrowsClockwise,
  PhArrowsLeftRight,
  PhArticle,
  PhBroadcast,
  PhBrowsers,
  PhChartBar,
  PhChartLine,
  PhCirclesThree,
  PhCloudArrowDown,
  PhDesktop,
  PhDevices,
  PhDivide,
  PhFingerprint,
  PhGlobe,
  PhGlobeHemisphereWest,
  PhGoogleLogo,
  PhHardDrives,
  PhIdentificationBadge,
  PhIdentificationCard,
  PhLightning,
  PhListBullets,
  PhLockKey,
  PhMagnifyingGlass,
  PhPath,
  PhPhoneCall,
  PhPlugs,
  PhPulse,
  PhRadio,
  PhScan,
  PhShieldCheck,
  PhSignature,
  PhTerminal,
} from '@phosphor-icons/vue';

export type RoadmapStatus = 'shipped' | 'partial' | 'in_progress' | 'planned' | 'later';

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  icon: Component;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  subtitle: string;
  /** Highlights the phase we are actively building toward. */
  active?: boolean;
  items: RoadmapItem[];
}

export const ROADMAP_STATUS_LABEL: Record<RoadmapStatus, string> = {
  shipped: 'Shipped',
  partial: 'Partial',
  in_progress: 'In progress',
  planned: 'Planned',
  later: 'Later',
};

export const ROADMAP_FOUNDATION: RoadmapItem[] = [
  {
    id: 'monitor-icmp',
    title: 'ICMP monitoring',
    description: 'Scheduled ping checks with latency and loss stats.',
    status: 'shipped',
    icon: PhPulse,
  },
  {
    id: 'monitor-http',
    title: 'HTTP / HTTPS checks',
    description: 'Status codes, methods, and keyword matching.',
    status: 'shipped',
    icon: PhGlobeHemisphereWest,
  },
  {
    id: 'monitor-tcp-dns',
    title: 'TCP & DNS checks',
    description: 'Port reachability and record validation.',
    status: 'shipped',
    icon: PhMagnifyingGlass,
  },
  {
    id: 'gateway-diagnosis',
    title: 'Gateway diagnosis',
    description: 'Local gateway vs upstream incident classification.',
    status: 'shipped',
    icon: PhPath,
  },
  {
    id: 'live-network',
    title: 'Live network & speed',
    description: 'Wi‑Fi/Ethernet rows with per-network speed snapshots.',
    status: 'shipped',
    icon: PhPlugs,
  },
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 'phase-1',
    title: 'Phase 1 - Network & ports',
    subtitle: 'First pro toolkit release',
    active: true,
    items: [
      {
        id: 'ping',
        title: 'Ping',
        description: 'On-demand reachability with burst mode and loss stats.',
        status: 'in_progress',
        icon: PhPulse,
      },
      {
        id: 'ping-analyzer',
        title: 'Ping Analyzer',
        description: 'Live latency chart for short diagnostic sessions.',
        status: 'planned',
        icon: PhChartLine,
      },
      {
        id: 'traceroute',
        title: 'Traceroute',
        description: 'Hop-by-hop path when upstream issues are suspected.',
        status: 'planned',
        icon: PhPath,
      },
      {
        id: 'network-info',
        title: 'Network Info',
        description: 'IP, gateway, DNS servers, and connection stats.',
        status: 'partial',
        icon: PhGlobeHemisphereWest,
      },
      {
        id: 'interfaces',
        title: 'Interfaces',
        description: 'All local adapters with service type and SSID.',
        status: 'partial',
        icon: PhPlugs,
      },
      {
        id: 'devices',
        title: 'LAN Devices',
        description: 'Discover hosts on your subnet with consent prompts.',
        status: 'planned',
        icon: PhDevices,
      },
      {
        id: 'port-scanner',
        title: 'Port Scanner',
        description: 'TCP sweep across configurable port lists.',
        status: 'planned',
        icon: PhScan,
      },
      {
        id: 'banner-grabber',
        title: 'Banner Grabber',
        description: 'Service fingerprint from the first bytes on a port.',
        status: 'planned',
        icon: PhFingerprint,
      },
    ],
  },
  {
    id: 'phase-2',
    title: 'Phase 2 - DNS & security',
    subtitle: 'Interactive lookups beyond monitor checks',
    items: [
      {
        id: 'dns-lookup',
        title: 'DNS Lookup',
        description: 'A, MX, TXT, and other record types in one view.',
        status: 'partial',
        icon: PhMagnifyingGlass,
      },
      {
        id: 'dns-propagation',
        title: 'DNS Propagation',
        description: 'Compare answers across public resolvers worldwide.',
        status: 'planned',
        icon: PhGlobe,
      },
      {
        id: 'dkim-selectors',
        title: 'DKIM Selectors',
        description: 'Discover common DKIM selector TXT records.',
        status: 'planned',
        icon: PhSignature,
      },
      {
        id: 'whois',
        title: 'Whois',
        description: 'Domain registration and registrar details.',
        status: 'planned',
        icon: PhIdentificationCard,
      },
    ],
  },
  {
    id: 'phase-3',
    title: 'Phase 3 - Discovery',
    subtitle: 'Local services and NAT (desktop-first)',
    items: [
      {
        id: 'upnp',
        title: 'UPnP',
        description: 'List UPnP devices on your LAN.',
        status: 'planned',
        icon: PhBroadcast,
      },
      {
        id: 'port-mapper',
        title: 'Port Mapper',
        description: 'View NAT port mappings via UPnP IGD.',
        status: 'planned',
        icon: PhArrowsLeftRight,
      },
      {
        id: 'bonjour',
        title: 'Bonjour',
        description: 'Browse mDNS services on the local network.',
        status: 'planned',
        icon: PhCirclesThree,
      },
      {
        id: 'mqtt-browser',
        title: 'MQTT Browser',
        description: 'Read-only topic explorer for MQTT brokers.',
        status: 'later',
        icon: PhRadio,
      },
    ],
  },
  {
    id: 'phase-4',
    title: 'Phase 4 - VoIP',
    subtitle: 'SIP and NAT diagnostics',
    items: [
      {
        id: 'sip-ping',
        title: 'SIP Ping',
        description: 'SIP OPTIONS probe to a registrar or trunk.',
        status: 'later',
        icon: PhPhoneCall,
      },
      {
        id: 'stun-nat',
        title: 'STUN / NAT',
        description: 'Detect NAT type and binding behavior.',
        status: 'later',
        icon: PhShieldCheck,
      },
    ],
  },
  {
    id: 'phase-5',
    title: 'Phase 5 - HTTP / TLS',
    subtitle: 'Deep web inspection',
    items: [
      {
        id: 'http-waterfall',
        title: 'HTTP Waterfall',
        description: 'DNS → connect → TLS → TTFB request timeline.',
        status: 'planned',
        icon: PhChartBar,
      },
      {
        id: 'http-headers',
        title: 'HTTP Headers',
        description: 'Inspect response headers with redirect control.',
        status: 'planned',
        icon: PhArticle,
      },
      {
        id: 'tls-inspector',
        title: 'TLS Inspector',
        description: 'Certificates, cipher suites, and chain validation.',
        status: 'planned',
        icon: PhLockKey,
      },
    ],
  },
  {
    id: 'phase-6',
    title: 'Phase 6 - Enterprise',
    subtitle: 'Protocol inspectors (read-only)',
    items: [
      {
        id: 'smb-inspector',
        title: 'SMB Inspector',
        description: 'SMB dialect and signing negotiation.',
        status: 'later',
        icon: PhHardDrives,
      },
      {
        id: 'ssh-inspector',
        title: 'SSH Inspector',
        description: 'Banner, transport, and KEX details.',
        status: 'planned',
        icon: PhTerminal,
      },
      {
        id: 'ldap-inspector',
        title: 'LDAP Inspector',
        description: 'Anonymous bind and mechanism probe.',
        status: 'later',
        icon: PhIdentificationBadge,
      },
      {
        id: 'rdp-inspector',
        title: 'RDP Inspector',
        description: 'TLS and NLA negotiation peek.',
        status: 'later',
        icon: PhDesktop,
      },
    ],
  },
  {
    id: 'phase-7',
    title: 'Phase 7 - Utilities',
    subtitle: 'Helpers and product docs',
    items: [
      {
        id: 'subnet-calc',
        title: 'Subnet Calc',
        description: 'CIDR breakdown with host and broadcast ranges.',
        status: 'planned',
        icon: PhDivide,
      },
      {
        id: 'wake-on-lan',
        title: 'Wake on LAN',
        description: 'Send magic packets to wake sleeping devices.',
        status: 'planned',
        icon: PhLightning,
      },
      {
        id: 'features',
        title: 'Features guide',
        description: 'Pro vs open-source capability matrix.',
        status: 'planned',
        icon: PhListBullets,
      },
    ],
  },
  {
    id: 'phase-8',
    title: 'Phase 8 - Auth & cloud',
    subtitle: 'Accounts, hosted web, sync, and backup',
    items: [
      {
        id: 'google-auth',
        title: 'Google Sign-In',
        description: 'OAuth sign-in for Pro accounts on desktop and web.',
        status: 'planned',
        icon: PhGoogleLogo,
      },
      {
        id: 'cloud-web',
        title: 'Cloud web version',
        description: 'Hosted Pro dashboard in the browser without a local install.',
        status: 'planned',
        icon: PhBrowsers,
      },
      {
        id: 'cloud-sync',
        title: 'Cloud sync',
        description: 'Sync targets, settings, and history between local and cloud.',
        status: 'planned',
        icon: PhArrowsClockwise,
      },
      {
        id: 'data-backup',
        title: 'Data backup',
        description: 'Export, restore, and optional encrypted cloud snapshots.',
        status: 'planned',
        icon: PhCloudArrowDown,
      },
    ],
  },
];
