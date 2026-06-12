<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PhAppleLogo, PhDownloadSimple, PhLinuxLogo, PhWindowsLogo } from '@phosphor-icons/vue';
import MarketingShell from '../components/MarketingShell.vue';
import MotionCard from '../components/MotionCard.vue';
import MotionSection from '../components/MotionSection.vue';
import {
  fetchDownloadManifest,
  formatDownloadSize,
  primaryArtifacts,
} from '../content/downloads';
import { siteAppName, siteOssUrl } from '../site';
import type { DownloadArtifact, DownloadManifest } from '../types/downloads';

const manifest = ref<DownloadManifest | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

function platformIcon(platform: string) {
  if (platform === 'macOS') return PhAppleLogo;
  if (platform === 'Windows') return PhWindowsLogo;
  if (platform === 'Linux') return PhLinuxLogo;
  return PhDownloadSimple;
}

function platformIconClass(platform: string): string {
  return `download-card__icon-wrap--${platform.toLowerCase().replace(/\s+/g, '-')}`;
}

function artifactMeta(artifact: DownloadArtifact): string {
  const parts = [artifact.format, formatDownloadSize(artifact.sizeBytes)];
  if (artifact.arch) {
    parts.unshift(artifact.arch);
  }
  return parts.join(' · ');
}

onMounted(async () => {
  try {
    manifest.value = await fetchDownloadManifest();
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : 'Could not load downloads.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <MarketingShell>
    <MotionSection :index="1" class="marketing-hero marketing-hero--compact">
      <p class="marketing-eyebrow">Download</p>
      <h1 class="marketing-hero__title">Get {{ siteAppName }} for your desktop.</h1>
      <p class="marketing-hero__lead">
        Install the local monitor app for macOS, Windows, or Linux. Desktop builds are published here from the
        Netbox desktop repository.
      </p>
    </MotionSection>

    <MotionSection :index="2" class="download-section">
      <div v-if="loading" class="download-empty">Loading downloads…</div>
      <div v-else-if="error" class="download-empty">{{ error }}</div>
      <div v-else-if="!manifest?.artifacts.length" class="download-empty">
        <p>No desktop packages are available yet.</p>
        <p class="download-empty__hint">Run <code class="marketing-inline-code">make package</code> in the desktop repo to publish installers here.</p>
      </div>
      <template v-else>
        <div class="download-section__head">
          <h2 class="marketing-section-title">{{ manifest.productName }} {{ manifest.version }}</h2>
          <p class="download-section__hint">Choose your platform. Installers are served from this site.</p>
        </div>

        <ul class="download-grid">
          <MotionCard
            v-for="(artifact, index) in primaryArtifacts(manifest)"
            :key="artifact.id"
            :index="index + 3"
            tag="li"
            class="download-card"
          >
            <div class="download-card__head">
              <span class="download-card__icon-wrap" :class="platformIconClass(artifact.platform)">
                <component
                  :is="platformIcon(artifact.platform)"
                  class="download-card__icon"
                  :weight="artifact.platform === 'macOS' ? 'fill' : 'bold'"
                  aria-hidden="true"
                />
              </span>
              <div class="download-card__copy">
                <strong>{{ artifact.label }}</strong>
                <p>{{ artifactMeta(artifact) }}</p>
              </div>
            </div>
            <a
              class="ui-button ui-button--default ui-button--sm marketing-button download-card__cta"
              :href="artifact.href"
              :download="artifact.filename"
            >
              <PhDownloadSimple weight="bold" aria-hidden="true" />
              <span>Download</span>
            </a>
          </MotionCard>
        </ul>

        <details v-if="manifest.artifacts.length > primaryArtifacts(manifest).length" class="download-more">
          <summary>All builds</summary>
          <ul class="download-more__list">
            <li v-for="artifact in manifest.artifacts" :key="artifact.id">
              <a :href="artifact.href" :download="artifact.filename">{{ artifact.filename }}</a>
              <span>{{ formatDownloadSize(artifact.sizeBytes) }}</span>
            </li>
          </ul>
        </details>
      </template>
    </MotionSection>

    <MotionSection :index="4" class="download-oss">
      <p class="download-oss__lead">
        Prefer open source? Build from source or grab the OSS release on GitHub.
      </p>
      <a
        class="ui-button ui-button--outline ui-button--sm marketing-button"
        :href="siteOssUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open source on GitHub
      </a>
    </MotionSection>
  </MarketingShell>
</template>
