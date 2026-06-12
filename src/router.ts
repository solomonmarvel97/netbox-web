import { createRouter, createWebHistory } from 'vue-router';
import DownloadView from './views/DownloadView.vue';
import LandingView from './views/LandingView.vue';
import RoadmapView from './views/RoadmapView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      meta: { title: 'Netbox - Local network monitor' },
    },
    {
      path: '/download',
      name: 'download',
      component: DownloadView,
      meta: { title: 'Download Netbox' },
    },
    {
      path: '/roadmap',
      name: 'roadmap',
      component: RoadmapView,
      meta: { title: 'Netbox Roadmap' },
    },
    {
      path: '/pro',
      redirect: '/roadmap',
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Netbox';
  document.title = title;
});
