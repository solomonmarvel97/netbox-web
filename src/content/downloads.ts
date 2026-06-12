import type { DownloadManifest } from '../types/downloads';

const MANIFEST_URL = '/downloads/manifest.json';

export async function fetchDownloadManifest(): Promise<DownloadManifest> {
  const response = await fetch(MANIFEST_URL, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Could not load download manifest (${response.status})`);
  }
  return (await response.json()) as DownloadManifest;
}

export function formatDownloadSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '—';
  }
  const units = ['B', 'KB', 'MB', 'GB'] as const;
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  const precision = value >= 10 || unitIndex === 0 ? 0 : 1;
  return `${value.toFixed(precision)} ${units[unitIndex]}`;
}

export function primaryArtifacts(manifest: DownloadManifest): DownloadArtifact[] {
  const preferredFormats = new Map<string, string>([
    ['macOS', 'DMG'],
    ['Windows', 'Installer'],
    ['Linux', 'AppImage'],
  ]);

  const selected = new Map<string, DownloadArtifact>();
  for (const artifact of manifest.artifacts) {
    const preferred = preferredFormats.get(artifact.platform);
    const existing = selected.get(artifact.platform);
    if (!existing) {
      selected.set(artifact.platform, artifact);
      continue;
    }
    if (preferred && artifact.format === preferred && existing.format !== preferred) {
      selected.set(artifact.platform, artifact);
    }
  }

  return [...selected.values()];
}
