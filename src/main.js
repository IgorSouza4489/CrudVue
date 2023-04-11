import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/style.css';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import store from '../src/store/store'
const app = createApp(App)
app.use(router)
app.use(store)
app.use(Toast)
app.mount('#app')
