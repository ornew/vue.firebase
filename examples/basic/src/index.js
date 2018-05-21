import 'babel-polyfill'

import Vue from 'vue'

import config from '../config.js'
import Test from './test.vue'

Vue.config.devtools = true

import VueFirebase from '../../dist/vue.firebase.esm.js'
Vue.use(VueFirebase)

const test = new Vue({
  render: h => h(Test),
  firebase: config,
})
window.onload = () => {
  test.$mount('#test')
}

