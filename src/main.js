import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueFormulate from '@braid/vue-formulate'
import VueFormulateExtended from 'vue-formulate-extended'
import './assets/formulate.css'
import { pt } from '@braid/vue-formulate-i18n'
import axios from 'axios'
import Routes from './routes'

Vue.use(VueFormulate, {
	plugins: [
		VueFormulateExtended({
			features: {
				formEvents: true,
				textMask: true,
				enforceNumber: false
			}
		}),
		pt
	],
	locale: 'pt',
})
Vue.use(VueRouter)

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
