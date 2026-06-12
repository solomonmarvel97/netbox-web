<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { motion } from 'motion-v';
import { cardEntranceAnimate, sectionCardEntranceInitial } from '../motion/marketingAnimations';

const props = withDefaults(
  defineProps<{
    index?: number;
    tag?: 'li' | 'article';
    class?: HTMLAttributes['class'];
  }>(),
  {
    index: 0,
    tag: 'li',
  },
);
</script>

<template>
  <motion.li
    v-if="tag === 'li'"
    :class="props.class"
    :initial="sectionCardEntranceInitial"
    :animate="cardEntranceAnimate(index)"
  >
    <slot />
  </motion.li>
  <motion.article
    v-else
    :class="props.class"
    :initial="sectionCardEntranceInitial"
    :animate="cardEntranceAnimate(index)"
  >
    <slot />
  </motion.article>
</template>
