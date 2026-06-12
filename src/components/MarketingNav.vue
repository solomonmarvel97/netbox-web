<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { PhList, PhX } from '@phosphor-icons/vue';

const desktopNavItems = [
  { to: '/download', label: 'Download' },
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/roadmap#subscribe', label: 'Pro' },
] as const;

const mobileNavItems = [
  { to: '/', label: 'Home' },
  ...desktopNavItems,
] as const;

const menuOpen = ref(false);
const route = useRoute();

function closeMenu() {
  menuOpen.value = false;
}

function openMenu() {
  menuOpen.value = true;
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeMenu();
  }
}

function setBodyScrollLocked(locked: boolean) {
  document.body.classList.toggle('is-marketing-nav-open', locked);
}

watch(menuOpen, (open) => {
  setBodyScrollLocked(open);
  if (open) {
    document.addEventListener('keydown', onDocumentKeydown);
  } else {
    document.removeEventListener('keydown', onDocumentKeydown);
  }
});

watch(() => route.fullPath, closeMenu);

onBeforeUnmount(() => {
  setBodyScrollLocked(false);
  document.removeEventListener('keydown', onDocumentKeydown);
});
</script>

<template>
  <nav class="marketing-shell__nav" aria-label="Site">
    <ul class="marketing-shell__nav-list marketing-shell__nav-list--desktop">
      <li v-for="item in desktopNavItems" :key="item.to">
        <RouterLink class="marketing-shell__link" :to="item.to">{{ item.label }}</RouterLink>
      </li>
    </ul>

    <button
      type="button"
      class="marketing-shell__menu-toggle"
      :aria-expanded="menuOpen"
      aria-controls="marketing-nav-menu"
      aria-label="Open menu"
      @click.stop="openMenu"
    >
      <PhList class="marketing-shell__menu-icon" weight="bold" aria-hidden="true" />
    </button>
  </nav>

  <Teleport to="body">
    <div
      v-if="menuOpen"
      class="marketing-shell__menu-overlay"
      @click.self="closeMenu"
    >
      <div class="marketing-shell__menu-overlay-inner">
        <div class="marketing-shell__menu-header">
          <button
            type="button"
            class="marketing-shell__menu-close"
            aria-label="Close menu"
            @click="closeMenu"
          >
            <PhX class="marketing-shell__menu-icon" weight="bold" aria-hidden="true" />
          </button>
        </div>

        <nav
          id="marketing-nav-menu"
          class="marketing-shell__menu-panel"
          aria-label="Site menu"
          @click.stop
        >
          <RouterLink
            v-for="item in mobileNavItems"
            :key="item.to"
            class="marketing-shell__menu-link"
            :to="item.to"
            @click="closeMenu"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </Teleport>
</template>
