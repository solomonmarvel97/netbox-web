<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v';
import { RouterView, useRoute } from 'vue-router';
import { pageEnterAnimate, pageEnterInitial, pageExitAnimate } from './motion/marketingAnimations';

const route = useRoute();
</script>

<template>
  <AnimatePresence mode="wait">
    <motion.div
      :key="route.path"
      class="marketing-page"
      :initial="pageEnterInitial"
      :animate="pageEnterAnimate"
      :exit="pageExitAnimate"
    >
      <RouterView />
    </motion.div>
  </AnimatePresence>
</template>
