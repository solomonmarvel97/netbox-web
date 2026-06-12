import { PhBell, PhChartLine, PhDesktop } from '@phosphor-icons/vue';
import { ROADMAP_FOUNDATION, type RoadmapItem } from './roadmap';

/** Features shipping in Netbox today - shown on the landing page. */
export const PLATFORM_AVAILABLE: RoadmapItem[] = [
  ...ROADMAP_FOUNDATION,
  {
    id: 'incident-history',
    title: 'Incident history',
    description: 'Timeline, event log, and storage stats for past outages.',
    status: 'shipped',
    icon: PhChartLine,
  },
  {
    id: 'alerts',
    title: 'Desktop & email alerts',
    description: 'Sound, desktop notifications, and optional email on incidents.',
    status: 'shipped',
    icon: PhBell,
  },
  {
    id: 'desktop-app',
    title: 'Desktop app',
    description: 'Menu-bar tray, compact live checks, and deeper macOS network access.',
    status: 'shipped',
    icon: PhDesktop,
  },
];
