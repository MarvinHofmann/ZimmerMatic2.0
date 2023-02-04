import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createPinia } from "pinia";
const pinia = createPinia();

import { createRouter, createWebHistory } from 'vue-router'

import dash from './views/dashboard.vue'
import temp from './views/temperatur.vue'
import licht from './views/licht.vue'
import leds from './views/leds.vue'
import heizung from './views/heizung.vue'
import rolladen from './views/rolladen.vue'
import drucker from './views/drucker.vue'
import login from './views/login.vue'
import einstellungen from './views/settings.vue'
import user from './views/user.vue'
import ota from './views/otaHandling.vue'

const router =
    createRouter({
        history: createWebHistory(),
        routes: [
            { path: '/', name: 'dashboard', component: dash },
            { path: '/login', name: 'login', component: login },
            { path: '/temperatur', name: 'temperatur', component: temp },
            { path: '/licht', name: 'licht', component: licht },
            { path: '/leds', name: 'leds', component: leds },
            { path: '/heizung', name: 'heizung', component: heizung },
            { path: '/rolladen', name: 'rolladen', component: rolladen },
            { path: '/drucker', name: 'drucker', component: drucker },
            { path: '/einstellungen', name: 'einstellungen', component: einstellungen },
            { path: '/user', name: 'user', component: user },
            { path: '/ota', name: 'ota', component: ota },
        ],
        scrollBehavior(to, from, savedPosition) {
            // always scroll to top
            return { top: -10 }
        },
    })

import {useAuthStore} from "./stores/auth.store"

router.beforeEach(async (to) => {
    const userStore = useAuthStore();
    const publicPages = ["/login"];
    const authRequired = !publicPages.includes(to.path);
    const auth = localStorage.getItem("TOKEN");
    console.log(auth);
    if (authRequired && !auth) {
        return "/login";
    }
})

import cronLight from '@vue-js-cron/light'
import '@vue-js-cron/light/dist/light.css'
import cronCore from '@vue-js-cron/core'

createApp(App)
    .use(cronLight)
    .use(cronCore)
    .use(router)
    .use(pinia)
    .mount('#app')