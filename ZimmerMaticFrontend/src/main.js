import { createApp } from 'vue'
import App from './App.vue'
//import "bootstrap/dist/css/bootstrap.min.css"
//import "bootstrap"
import 'mdb-vue-ui-kit/css/mdb.min.css'

import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'

import dash from './views/dashboard.vue'
import temp from './views/temperatur.vue'
import licht from './views/licht.vue'
import leds from './views/leds.vue'
import heizung from './views/heizung.vue'
import rolladen from './views/rolladen.vue'
import drucker from './views/drucker.vue'

const router =
    createRouter({
        history: createWebHistory(),
        routes: [
            { path: '/', name: 'dashboard', component: dash },
            { path: '/temperatur', name: 'temperatur', component: temp },
            { path: '/licht', name: 'licht', component: licht },
            { path: '/leds', name: 'leds', component: leds },
            { path: '/heizung', name: 'heizung', component: heizung },
            { path: '/rolladen', name: 'rolladen', component: rolladen },
            { path: '/drucker', name: 'drucker', component: drucker },
        ],
        scrollBehavior(to, from, savedPosition) {
            // always scroll to top
            return { top: -10 }
        },
    })

createApp(App)
    .use(router)
    .mount('#app')