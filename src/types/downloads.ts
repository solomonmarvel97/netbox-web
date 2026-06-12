export interface DownloadArtifact {
  id: string;
  platform: string;
  arch?: string;
  format: string;
  label: string;
  filename: string;
  href: string;
  sizeBytes: number;
}

export interface DownloadManifest {
  productName: string;
  version: string;
  generatedAt: string;
  artifacts: DownloadArtifact[];
}
