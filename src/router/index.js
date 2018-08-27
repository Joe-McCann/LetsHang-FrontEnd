import Vue from 'vue'
import Router from 'vue-router'
import LetsHang from '@/components/LetsHang'
import callback from '@/components/callback'
import Home from '@/components/Home'
import EventDetailHorizontal from '@/components/EventDetailHorizontal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'LetsHang', component: LetsHang },
    { path: '/home', name: 'Home', component: Home },
    { path: '/callback', name: 'Callback', component: callback },
    { path: '/eventdetailhorizontal', name: 'EventDetailHorizontal', component: EventDetailHorizontal }
  ]
})
