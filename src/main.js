import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Routes from './routes'
import VueTheMask from 'vue-the-mask'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import PortalVue from 'portal-vue'

// arquivos css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueTheMask)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(PortalVue)

const router = new VueRouter({
	routes: Routes,
	mode: 'history'
})

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router: router
}).$mount('#app')
