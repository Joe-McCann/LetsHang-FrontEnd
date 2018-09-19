// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import * as VueGoogleMaps from 'vue2-google-maps'
import Logger from './library/logger'
const logger = new Logger('error')

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.base,
    secondary: colors.blueGrey.darken3,
    accent: colors.teal.accent4,
    error: colors.deepOrange.base,
    info: colors.blueGrey.lighten1,
    success: colors.teal.lighten2,
    warning: colors.blueGrey.darken1
  }
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBCOPpz9nItjNrXMrTbA71B0pCX2o5P1E8',
    libraries: 'places,drawing,visualization'
  }
})

Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

logger.debug('main.js', '', '*** Starting Let\'s Hang App ***')
