import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import PrimeVue from "primevue/config";
import './input.css'
import {Tabs, Tab} from 'vue3-tabs-component';
import Lara from '@/presets/lara';

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(Tabs);
appInstance.use(Tab);
appInstance.mount("#app");

appInstance.use(PrimeVue, {
    unstyled: false,
    pt: Lara
});