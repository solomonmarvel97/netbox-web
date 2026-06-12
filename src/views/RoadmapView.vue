<script setup lang="ts">
import MarketingShell from '../components/MarketingShell.vue';
import MotionCard from '../components/MotionCard.vue';
import MotionSection from '../components/MotionSection.vue';
import {
  ROADMAP_FOUNDATION,
  ROADMAP_PHASES,
  ROADMAP_STATUS_LABEL,
  type RoadmapStatus,
} from '../content/roadmap';
import { siteProPriceLabel, sitePurchaseUrl } from '../site';

function statusClass(status: RoadmapStatus): string {
  return `roadmap-status--${status.replace(/_/g, '-')}`;
}

function phaseSectionIndex(phaseIndex: number): number {
  return 2 + phaseIndex;
}

function foundationCardIndex(itemIndex: number): number {
  return 3 + itemIndex;
}

function phaseCardIndex(phaseIndex: number, itemIndex: number): number {
  return 4 + phaseIndex * 6 + itemIndex;
}
</script>

<template>
  <MarketingShell>
    <MotionSection :index="1" class="marketing-hero marketing-hero--compact">
      <p class="marketing-eyebrow">Roadmap</p>
      <h1 class="marketing-hero__title">Everything we ship and everything next.</h1>
      <p class="marketing-hero__lead">
        Monitor foundation is live today. Phases below are the pro toolkit, cloud features, and utilities on the way.
      </p>
    </MotionSection>

    <MotionSection :index="2" class="roadmap-section">
      <div class="roadmap-section__head">
        <h2 class="marketing-section-title">Available now</h2>
        <p class="roadmap-section__hint">Core monitoring in open source and Pro.</p>
      </div>
      <ul class="marketing-feature-grid">
        <MotionCard
          v-for="(item, itemIndex) in ROADMAP_FOUNDATION"
          :key="item.id"
          :index="foundationCardIndex(itemIndex)"
          class="marketing-feature-card marketing-feature-card--shipped"
        >
          <component :is="item.icon" class="marketing-feature-card__icon" weight="bold" aria-hidden="true" />
          <div>
            <div class="roadmap-card-head">
              <strong>{{ item.title }}</strong>
              <span class="roadmap-status" :class="statusClass(item.status)">
                {{ ROADMAP_STATUS_LABEL[item.status] }}
              </span>
            </div>
            <p>{{ item.description }}</p>
          </div>
        </MotionCard>
      </ul>
    </MotionSection>

    <MotionSection
      v-for="(phase, phaseIndex) in ROADMAP_PHASES"
      :key="phase.id"
      :index="phaseSectionIndex(phaseIndex)"
      :class="['roadmap-section', { 'roadmap-section--active': phase.active }]"
    >
      <div class="roadmap-section__head roadmap-section__head--phase">
        <div>
          <h2 class="marketing-section-title">{{ phase.title }}</h2>
          <p class="roadmap-section__hint">{{ phase.subtitle }}</p>
        </div>
        <span v-if="phase.active" class="roadmap-phase-badge">Building now</span>
      </div>
      <ul class="marketing-feature-grid">
        <MotionCard
          v-for="(item, itemIndex) in phase.items"
          :key="item.id"
          :index="phaseCardIndex(phaseIndex, itemIndex)"
          :class="[
            'marketing-feature-card',
            {
              'marketing-feature-card--active': item.status === 'in_progress',
              'marketing-feature-card--shipped': item.status === 'shipped',
            },
          ]"
        >
          <component :is="item.icon" class="marketing-feature-card__icon" weight="bold" aria-hidden="true" />
          <div>
            <div class="roadmap-card-head">
              <strong>{{ item.title }}</strong>
              <span class="roadmap-status" :class="statusClass(item.status)">
                {{ ROADMAP_STATUS_LABEL[item.status] }}
              </span>
            </div>
            <p>{{ item.description }}</p>
          </div>
        </MotionCard>
      </ul>
    </MotionSection>

    <MotionSection id="subscribe" :index="20" class="marketing-subscribe">
      <div class="marketing-subscribe__card">
        <div class="marketing-subscribe__copy">
          <p class="marketing-plan__label">Netbox Pro</p>
          <p class="marketing-subscribe__price">{{ siteProPriceLabel }}</p>
          <p class="marketing-subscribe__hint">Unlock the full toolkit as each phase ships.</p>
        </div>
        <a
          class="ui-button ui-button--default ui-button--sm marketing-button marketing-subscribe__cta"
          :href="sitePurchaseUrl"
        >
          Purchase Pro
        </a>
      </div>
    </MotionSection>
  </MarketingShell>
</template>
