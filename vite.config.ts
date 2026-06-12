import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { readBuildMeta } from './vite/buildMeta';

interface WebConfig {
  app?: {
    name?: string;
  };
  devServer?: {
    host?: string;
    port?: number;
    previewPort?: number;
  };
  links?: {
    ossUrl?: string;
    downloadUrl?: string;
    purchaseUrl?: string;
    proPriceLabel?: string;
    appUrl?: string;
  };
  creator?: {
    name?: string;
    website?: string;
    github?: string;
  };
}

const webRoot = path.dirname(fileURLToPath(import.meta.url));

function readWebConfig(): WebConfig {
  const configPath = path.resolve(webRoot, 'config', 'web.json');
  if (!fs.existsSync(configPath)) return {};
  return JSON.parse(fs.readFileSync(configPath, 'utf-8')) as WebConfig;
}

function numberSetting(value: string | number | undefined, fallback: number): number {
  if (value == null || value === '') return fallback;
  return Number(value);
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, webRoot, '');
  const webConfig = readWebConfig();
  const appName = env.VITE_NETBOX_APP_NAME || webConfig.app?.name || 'Netbox';
  const links = webConfig.links ?? {};
  const host = env.NETBOX_WEB_HOST || webConfig.devServer?.host || '127.0.0.1';
  const port = numberSetting(env.NETBOX_WEB_PORT, webConfig.devServer?.port ?? 5176);
  const previewPort = numberSetting(env.NETBOX_WEB_PREVIEW_PORT, webConfig.devServer?.previewPort ?? 4176);

  const ossUrl = env.VITE_NETBOX_OSS_URL || links.ossUrl || 'https://github.com/solomonmarvel97/netbox';
  const downloadUrl = env.VITE_NETBOX_DOWNLOAD_URL || links.downloadUrl || '/download';
  const purchaseUrl = env.VITE_NETBOX_PURCHASE_URL || links.purchaseUrl || '/roadmap#subscribe';
  const proPriceLabel = env.VITE_NETBOX_PRO_PRICE_LABEL || links.proPriceLabel || '$1 / month';
  const appUrl = env.VITE_NETBOX_APP_URL || links.appUrl || 'http://127.0.0.1:5177';
  const buildMeta = readBuildMeta(webRoot);
  const creator = webConfig.creator ?? {};
  const creatorName = env.VITE_NETBOX_CREATOR_NAME || creator.name || 'Marvelous Solomon';
  const creatorWebsite = env.VITE_NETBOX_CREATOR_WEBSITE || creator.website || 'https://solomonmarvel.com';
  const creatorGithub = env.VITE_NETBOX_CREATOR_GITHUB || creator.github || 'https://github.com/solomonmarvel97';

  return {
    envDir: webRoot,
    plugins: [vue()],
    optimizeDeps: {
      include: ['motion-v'],
    },
    define: {
      __NETBOX_APP_NAME__: JSON.stringify(appName),
      __NETBOX_OSS_URL__: JSON.stringify(ossUrl),
      __NETBOX_DOWNLOAD_URL__: JSON.stringify(downloadUrl),
      __NETBOX_PURCHASE_URL__: JSON.stringify(purchaseUrl),
      __NETBOX_PRO_PRICE_LABEL__: JSON.stringify(proPriceLabel),
      __NETBOX_APP_URL__: JSON.stringify(appUrl),
      __NETBOX_APP_VERSION__: JSON.stringify(buildMeta.version),
      __NETBOX_APP_ID__: JSON.stringify(buildMeta.appId),
      __NETBOX_BUILD_COPYRIGHT__: JSON.stringify(buildMeta.copyright),
      __NETBOX_BUILDER_NAME__: JSON.stringify(buildMeta.builderName),
      __NETBOX_BUILDER_VERSION__: JSON.stringify(buildMeta.builderVersion),
      __NETBOX_BUILD_AUTHOR__: JSON.stringify(buildMeta.author),
      __NETBOX_CREATOR_NAME__: JSON.stringify(creatorName),
      __NETBOX_CREATOR_WEBSITE__: JSON.stringify(creatorWebsite),
      __NETBOX_CREATOR_GITHUB__: JSON.stringify(creatorGithub),
    },
    server: {
      host,
      port,
    },
    preview: {
      host,
      port: previewPort,
    },
  };
});
