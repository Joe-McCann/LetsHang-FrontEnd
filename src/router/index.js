import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import callback from '@/components/callback'
import Home from '@/components/Home'
import EventDetailHorizontal from '@/components/EventDetailHorizontal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/home', name: 'Home', component: Home },
    { path: '/callback', name: 'Callback', component: callback },
    { path: '/eventdetailhorizontal', name: 'EventDetailHorizontal', component: EventDetailHorizontal }
  ]
})
