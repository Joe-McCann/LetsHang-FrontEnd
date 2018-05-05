<template>
  <v-app>
    <v-navigation-drawer
      persistent
      clipped
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      class="grey lighten-5"
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          v-bind:key="i"
          active-class="caption"
        >
          <v-list-tile-action v-if="item.isItem">
            <v-icon color="secondary" v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content v-if="item.isItem">
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
          <v-divider v-if="!item.isItem"></v-divider>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      dark
      color="primary"
      clipped-left
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-if="profile!=null">{{ profile.fullName() }}</v-btn>
        <v-btn flat v-if="!authenticated" v-on:click="login()">Sign In</v-btn>
        <v-btn flat v-if="authenticated"  v-on:click="signout()">Sign Out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view 
        v-bind:auth="auth" 
        v-bind:authenticated="authenticated">
      </router-view>
    </v-content>
    <v-footer fixed app>
      <span>&copy; 2018 <strong>WF and WJ McCann</strong></span>
    </v-footer>
  </v-app>
</template>

<script>
import AuthService from './auth/AuthService'
import { mapState } from 'vuex'
import store from '@/store'
import Logger from './library/logger'
const logger = new Logger('debug')

const auth = new AuthService()
const { login, logout, authenticated, authNotifier } = auth

export default {
  name: 'App',
  computed: mapState({
    title: 'appTitle',
    profile: 'currentUser'
  }),
  data: function () {
    logger.debug('App.vue', 'data', 'In the data function of App.Vue')
    authNotifier.on('authChange', authState => { this.authenticated = authState.authenticated })
    return {
      auth,
      authenticated,
      drawer: true,
      items: [
        { icon: 'event', title: 'Events', isItem: true },
        { icon: 'people', title: 'Friends', isItem: true },
        { isItem: false },
        { icon: 'settings', title: 'Settings', isItem: true },
        { icon: 'help', title: 'Help', isItem: true }
      ]
    }
  },
  methods: {
    login,
    logout,
    signout () {
      store.commit('removeProfile')
      this.logout() // log out from auth0
    }
  }
}
</script>
