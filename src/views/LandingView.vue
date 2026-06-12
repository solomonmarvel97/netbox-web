<script setup lang="ts">
import { PhArrowSquareOut, PhDownloadSimple } from '@phosphor-icons/vue';
import { RouterLink } from 'vue-router';
import MarketingShell from '../components/MarketingShell.vue';
import MotionCard from '../components/MotionCard.vue';
import MotionSection from '../components/MotionSection.vue';
import { PLATFORM_AVAILABLE } from '../content/platform';
import { OSS_PLAN_FEATURES } from '../content/proPlan';
import {
  siteAppName,
  siteOssUrl,
  siteProPriceLabel,
  sitePurchaseUrl,
} from '../site';
</script>

<template>
  <MarketingShell>
    <MotionSection :index="1" class="marketing-hero">
      <p class="marketing-eyebrow">Pro network monitor</p>
      <h1 class="marketing-hero__title">Know when it is your Wi‑Fi, your router, or the internet.</h1>
      <p class="marketing-hero__lead">
        {{ siteAppName }} runs checks from your machine, stores history locally, and helps you separate
        local network issues from upstream problems.
      </p>
      <div class="marketing-hero__actions">
        <RouterLink class="ui-button ui-button--default ui-button--sm marketing-button" to="/download">
          <PhDownloadSimple weight="bold" aria-hidden="true" />
          <span>Download</span>
        </RouterLink>
      </div>
    </MotionSection>

    <MotionSection :index="2" class="marketing-features">
      <div class="marketing-features__head">
        <h2 class="marketing-section-title">What you get today</h2>
        <p class="marketing-features__hint">
          Local-first monitoring with history, alerts, and live network checks.
        </p>
      </div>
      <ul class="marketing-feature-grid">
        <MotionCard
          v-for="(feature, index) in PLATFORM_AVAILABLE"
          :key="feature.id"
          :index="index + 3"
          class="marketing-feature-card"
        >
          <component :is="feature.icon" class="marketing-feature-card__icon" weight="bold" aria-hidden="true" />
          <div>
            <strong>{{ feature.title }}</strong>
            <p>{{ feature.description }}</p>
          </div>
        </MotionCard>
      </ul>
      <RouterLink class="ui-button ui-button--ghost ui-button--sm marketing-button" to="/roadmap">
        View full roadmap
      </RouterLink>
    </MotionSection>

    <MotionSection :index="4" class="marketing-pricing">
      <h2 class="marketing-section-title">Choose your plan</h2>
      <div class="marketing-pricing__grid">
        <MotionCard :index="5" tag="article" class="marketing-plan">
          <p class="marketing-plan__label">Open source</p>
          <p class="marketing-plan__price">Free</p>
          <p class="marketing-plan__hint">Self-hosted monitoring for everyone.</p>
          <ul class="marketing-plan__list">
            <li v-for="feature in OSS_PLAN_FEATURES" :key="feature">{{ feature }}</li>
          </ul>
          <a
            class="ui-button ui-button--outline ui-button--sm marketing-button marketing-plan__cta"
            :href="siteOssUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Get open source</span>
            <PhArrowSquareOut weight="bold" aria-hidden="true" />
          </a>
        </MotionCard>

        <MotionCard :index="6" tag="article" class="marketing-plan marketing-plan--pro">
          <p class="marketing-plan__label">Netbox Pro</p>
          <p class="marketing-plan__price">{{ siteProPriceLabel }}</p>
          <p class="marketing-plan__hint">Toolkit, cloud sync, backup, and platform extras.</p>
          <ul class="marketing-plan__list">
            <li>Everything in open source</li>
            <li>Full network toolkit (port scan, traceroute, DNS, TLS)</li>
            <li>Google Sign-In and cloud web access</li>
            <li>Cloud sync and encrypted backup</li>
            <li>Desktop app with roadmap visibility</li>
          </ul>
          <div class="marketing-plan__actions">
            <a
              class="ui-button ui-button--default ui-button--sm marketing-button marketing-plan__cta"
              :href="sitePurchaseUrl"
            >
              Purchase Pro
            </a>
            <RouterLink class="ui-button ui-button--ghost ui-button--sm marketing-button" to="/roadmap">
              View roadmap
            </RouterLink>
          </div>
        </MotionCard>
      </div>
    </MotionSection>
  </MarketingShell>
</template>
