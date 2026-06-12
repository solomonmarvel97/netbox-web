import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { applyThemePreference, getStoredThemePreference } from './theme';
import './styles.css';

applyThemePreference(getStoredThemePreference());

const app = createApp(App);
app.use(router);
app.mount('#app');
