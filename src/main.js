import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './assets/css/style.css';

export const app = createApp(App);
app.use(router);
app.mount('#app');
