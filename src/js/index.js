Vue.config.productionTip = false;



// import dependencies
import "@babel/polyfill";
import Vue from "vue";
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Notify from 'vue-notifyjs/dist/vue-notifyjs';
import VueProgressBar from 'vue-progressbar';
import VeeValidate from 'vee-validate'
import VuePageTransition from 'vue-page-transition'
import VueTouch from 'vue-touch'


import {
	library
} from '@fortawesome/fontawesome-svg-core';

import {
	faCoffee,
	faCog,
	faFile,
	faDungeon,
	faTimes,
	faSkull,
	faSkullCrossbones
} from '@fortawesome/free-solid-svg-icons';

import {
	faDiceD20
} from '@fortawesome/pro-light-svg-icons'

import {
	faSwords
} from '@fortawesome/pro-solid-svg-icons'

import {
	faAngleRight
} from '@fortawesome/pro-regular-svg-icons'

import {
	faVuejs
} from '@fortawesome/free-brands-svg-icons';

import {
	FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';




// create instance of vue "plugins"
library.add(
	faCoffee,
	faCog,
	faDungeon,
	faFile,
	faVuejs,
	faTimes,
	faSkull,
	faSwords,
	faDiceD20,
	faSkullCrossbones,
	faAngleRight
);
Vue.use(VueRouter);
Vue.use(Vuetify, {
	theme: {
		primary: '#1976D2',
		secondary: '#424242',
		accent: '#82B1FF',
		error: '#FF5252',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FFC107'
	}
});
Vue.use(VueTouch, { name: 'v-touch'})
Vue.use(Notify, {
	type: 'primary',
	timeout: 5000,
	horizontalAlign: 'right',
	verticalAlign: 'bottom'
});
Vue.use(VueProgressBar, {
	color: 'rgb(143, 255, 199)',
	failedColor: 'red',
	height: '2px'
});
Vue.use(VeeValidate, {
	
})
// Vue.use(VuePageTransition)



// import files
import router from '../vue/router/Routes';
import store from "../vue/store/Store";
import App from '../vue/App.vue';




// Component registers
Vue.component('font-awesome-icon', FontAwesomeIcon);


// Firebase.auth().onAuthStateChanged(() => {
//   if (!app) {
// create SPA instance
let app = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
//   }
// })