import fs from 'node:fs';
import path from 'node:path';

export interface BuildMeta {
  version: string;
  appId: string;
  copyright: string;
  builderName: string;
  builderVersion: string;
  author: string;
}

interface WebConfig {
  app?: {
    id?: string;
    copyright?: string;
    author?: string;
  };
}

export function readBuildMeta(webRoot: string): BuildMeta {
  const packagePath = path.resolve(webRoot, 'package.json');
  const configPath = path.resolve(webRoot, 'config', 'web.json');

  const packageJson = fs.existsSync(packagePath)
    ? (JSON.parse(fs.readFileSync(packagePath, 'utf-8')) as {
        version?: string;
        author?: string;
      })
    : {};

  const webConfig = fs.existsSync(configPath)
    ? (JSON.parse(fs.readFileSync(configPath, 'utf-8')) as WebConfig)
    : {};

  return {
    version: packageJson.version ?? '0.0.0',
    appId: webConfig.app?.id ?? 'com.netbox.monitor',
    copyright: webConfig.app?.copyright ?? 'Copyright © 2026 Netbox',
    builderName: 'vite',
    builderVersion: 'unknown',
    author: webConfig.app?.author ?? packageJson.author ?? 'Netbox',
  };
}
