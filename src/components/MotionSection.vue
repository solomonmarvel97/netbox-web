<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { motion } from 'motion-v';
import { sectionCardEntranceInitial, sectionEntranceAnimate } from '../motion/marketingAnimations';

const props = withDefaults(
  defineProps<{
    id?: string;
    index?: number;
    tag?: 'section' | 'header' | 'footer';
    class?: HTMLAttributes['class'];
  }>(),
  {
    index: 0,
    tag: 'section',
  },
);
</script>

<template>
  <motion.section
    v-if="tag === 'section'"
    :id="props.id"
    :class="props.class"
    :initial="sectionCardEntranceInitial"
    :animate="sectionEntranceAnimate(index)"
  >
    <slot />
  </motion.section>
  <motion.header
    v-else-if="tag === 'header'"
    :class="props.class"
    :initial="sectionCardEntranceInitial"
    :animate="sectionEntranceAnimate(index)"
  >
    <slot />
  </motion.header>
  <motion.footer
    v-else
    :class="props.class"
    :initial="sectionCardEntranceInitial"
    :animate="sectionEntranceAnimate(index)"
  >
    <slot />
  </motion.footer>
</template>
