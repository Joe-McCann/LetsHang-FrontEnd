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
        <template value="true"
                  v-for="(item, i) in items"
                  active-class="caption">
          <v-list-tile v-bind:key="i" @click="item.method" v-if="item.isItem">
            <v-list-tile-action>
              <v-icon color="secondary" v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content v-if="item.isItem">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-else-if="item.divider" v-bind:key="i"></v-divider>
        </template>
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
        <v-btn flat
               v-on:click.stop="editProfile()"
               v-if="profile!=null">
        {{ profile.fullName() }}
        </v-btn>
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
    <friendDetail v-bind:isopen="isOpen" 
                  v-bind:formTitle="formTitle"
                  v-on:result="resetForm" 
                  v-on:savePerson="savePerson">
    </friendDetail>
    <v-footer fixed app>
      <span>&copy; 2018 <strong>WF and WJ McCann</strong></span>
    </v-footer>
  </v-app>
</template>

<script>
import AuthService from './Auth/AuthService'
import store from '@/store'
import FriendDetail from '@/components/FriendDetail'
import Profile from '@/library/profile2api'
import Logger from './library/logger'
import router from './router'
const logger = new Logger('debug')

const auth = new AuthService()
const { login, logout, authenticated, authNotifier } = auth

export default {
  name: 'App',
  components: { 'friendDetail': FriendDetail },
  data: function () {
    logger.debug('App.vue', 'data', 'In the data function of App.Vue')
    authNotifier.on('authChange', authState => { this.authenticated = authState.authenticated })
    return {
      auth,
      authenticated,
      drawer: true,
      profile: store.getters.currentUser,
      title: store.getters.appTitle,
      formTitle: 'Your Profile',
      isOpen: false,
      items: [
        { icon: 'event', title: 'Events', isItem: true, method: () => this.showEvents() },
        { icon: 'people', title: 'Friends', isItem: true, method: () => this.showFriends() },
        { isItem: false, divider: true },
        { icon: 'settings', title: 'Settings', isItem: true, method: () => this.showSettings() },
        { icon: 'help', title: 'Help', isItem: true, method: () => this.showHelp() }
      ]
    }
  },
  methods: {
    login,
    logout,
    resetForm: function (payload) { this.isOpen = payload.isopen },
    savePerson: function (payload) {
      let person = payload.person
      person.newMember = false
      let profileAPI = new Profile()
      profileAPI.PutProfile(person)
    },
    showEvents() {
      router.replace({ path: '/home' })
    },
    showFriends() {
      alert('You have selected the Friends link')
    },
    showSettings() {
      alert('You have selected the Setting link')
    },
    showHelp() {
      alert('You have selected the Help link')
    },
    signout () {
      store.commit('removeProfile')
      this.logout() // log out from auth0
    },
    editProfile () {
      store.commit('setThePerson', store.getters.currentUser)
      this.isOpen = true
    }
  },
  beforeUpdate () {
    this.profile = store.getters.currentUser
  }
}
</script>
