import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import Button from "primevue/button"
// import 'primevue/resources/themes/saga-blue/theme.css'; // Tema
// import 'primevue/resources/primevue.min.css';          // CSS base
import 'primeicons/primeicons.css';   


const app = createApp(App);
app.use(router);
app.use(ToastService);
  /* eslint-disable vue/multi-word-component-names */
app.component('Button', Button);
app.use(PrimeVue, {
    theme: {preset: Aura}
});
app.mount('#app');