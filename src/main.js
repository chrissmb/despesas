// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { rtdbPlugin } from 'vuefire';
import Vue from 'vue';

import App from './App.vue';
import router from './core/router';


Vue.use(rtdbPlugin);
Vue.prototype.$global = {};

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

