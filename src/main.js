import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import VueTheMask from 'vue-the-mask'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import PortalVue from 'portal-vue'
import { 
	ValidationProvider,
	ValidationObserver,
	extend,
	localize
} from 'vee-validate'
import pt_BR from 'vee-validate/dist/locale/pt_BR.json'
import * as rules from 'vee-validate/dist/rules'

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

// instala as regras e localização do VeeValidate
Object.keys(rules).forEach(rule => {
	extend(rule, rules[rule])
})

localize('pt_BR', pt_BR)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router: router
}).$mount('#app')
