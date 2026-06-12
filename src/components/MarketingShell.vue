<script setup lang="ts">
import { motion } from 'motion-v';
import { RouterLink } from 'vue-router';
import { sectionCardEntranceInitial, sectionEntranceAnimate } from '../motion/marketingAnimations';
import MarketingNav from './MarketingNav.vue';
import NetboxLogo from './NetboxLogo.vue';
import SiteFooter from './SiteFooter.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';
import { siteAppName } from '../site';
</script>

<template>
  <div class="marketing-shell">
    <motion.header
      class="marketing-shell__header"
      :initial="sectionCardEntranceInitial"
      :animate="sectionEntranceAnimate(0)"
    >
      <RouterLink class="marketing-shell__brand" to="/">
        <NetboxLogo :size="24" />
        <span>{{ siteAppName }}</span>
      </RouterLink>
      <MarketingNav />
    </motion.header>
    <ThemeSwitcher />
    <main class="marketing-shell__main">
      <slot />
    </main>
    <motion.div :initial="sectionCardEntranceInitial" :animate="sectionEntranceAnimate(6)">
      <SiteFooter />
    </motion.div>
  </div>
</template>
