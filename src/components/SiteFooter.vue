<script setup lang="ts">
import { PhArrowSquareOut, PhGithubLogo } from '@phosphor-icons/vue';
import {
  siteCreatorGithub,
  siteCreatorName,
  siteCreatorWebsite,
  siteOssUrl,
} from '../site';
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__top">
      <a
        class="site-footer__oss"
        :href="siteOssUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <PhGithubLogo class="site-footer__oss-icon" weight="fill" aria-hidden="true" />
        <span>Open source version</span>
        <PhArrowSquareOut class="site-footer__oss-external" weight="bold" aria-hidden="true" />
      </a>
      <p class="site-footer__tagline">Local-first network monitoring from your machine.</p>
    </div>

    <p class="site-footer__credit">
      Built on Vibes by
      <a :href="siteCreatorWebsite" target="_blank" rel="noopener noreferrer">{{ siteCreatorName }}</a>
      <a
        class="site-footer__credit-github"
        :href="siteCreatorGithub"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${siteCreatorName} on GitHub`"
      >
        <PhGithubLogo class="site-footer__credit-icon" weight="fill" aria-hidden="true" />
      </a>
      <a
        class="site-footer__credit-site"
        :href="siteCreatorWebsite"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${siteCreatorName} website`"
      >
        <PhArrowSquareOut class="site-footer__credit-icon" weight="bold" aria-hidden="true" />
      </a>
    </p>
  </footer>
</template>
