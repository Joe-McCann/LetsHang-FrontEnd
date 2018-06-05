<template>
  <v-layout row justify-center>
    <v-dialog v-model="isopen" persistent max-width="500px" :fullscreen="$vuetify.breakpoint.xs">
      <v-card>
        <v-toolbar color="primary" dark extended>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-btn color="accent"
                 dark
                 small
                 absolute
                 bottom
                 right
                 v-on:click.stop="openForm = true"
                 fab>
            <v-icon>add</v-icon>
          </v-btn>
          <friendDetail v-bind:isopen="openForm"
                        v-bind:formTitle="formTitle"
                        v-on:result="resetForm" 
                        v-on:savePerson="savePerson">
          </friendDetail>
          <v-toolbar-title slot="extension" class="white--text">My Friends</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-list-tile :key="item.id" avatar @click="chooseItem(item)">
                <v-list-tile-avatar>
                  <v-avatar :color="randomColor()" size="40"><span class="white--text headline">{{initial(item)}}</span></v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="fullName(item)"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.nickName"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>          </template>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn flat v-on:click.native="closeThis()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import People from '@/library/people'
  import FriendDetail from '@/components/FriendDetail'
  import Profile from '@/library/profile2api'
  import Friends from '@/library/friends2api'
  import Functions from '@/library/global'
  import store from '@/store'
  import Logger from '../library/logger'
  const logger = new Logger('debug')

  export default {
    name: 'friendList',
    components: { 'friendDetail': FriendDetail },
    props: [ 'isopen' ],
    computed: {
      items: () => store.getters.myFriends.friends
    },
    data () {
      return {
        isOpen: false, // to determine if this list is open
        openForm: false, // to determine if the friendDetail is open
        formTitle: 'Invite a Friend',
        person: new People(),
        functions: new Functions(),
        profileAPI: new Profile(),
        friendsAPI: new Friends()
      }
    },
    methods: {
      resetForm: function (payload) { this.openForm = payload.isopen },
      closeThis () {
        logger.debug('FriendList.vue', 'closeThis', 'Closing the FriendList form')
        this.$emit('result', { isopen: false })
      },
      savePerson: function (payload) {
        let person = payload.person
        person.newMember = false
        logger.debug('FriendList.vue', 'savePerson', `1. The userId of the friend is ${person.id}`)
        store.commit('addFriend', person) // add the profile to the user's friends
        store.commit('addAttendee', person) // add the person to the list attending the event
        store.commit('setThePerson', new People()) // reset the profile used by the form
        logger.debug('FriendList.vue', 'savePerson', `2. The userId of the friend is ${person.id}`)
        this.profileAPI.PostProfile(person) // update the profile on Firebase
        logger.debug('FriendList.vue', 'savePerson', `3. The userId of the friend is ${store.getters.myFriends.id}`)
        this.friendsAPI.PutFriends(store.getters.myFriends) // save the friends to Firebase
        logger.debug('FriendList.vue', 'savePerson', `4. The userId of the friend is ${store.getters.myFriends.id}`)
      },
      chooseItem (item) {
        logger.debug('FriendList.vue', 'chooseItem', `The picked the friend from the list ${item.id}`)
        this.person = item
        this.$emit('savePerson', { person: this.person })
        this.closeThis()
      },
      fullName (item) { return this.functions.getFullName(item) },
      initials (item) { return this.functions.getInitials(item) },
      initial (item) { return item.firstName[0].toUpperCase() },
      randomColor () {
        let i = Math.floor(Math.random() * 6 + 1)
        let color = 'black'
        switch (i) {
          case 1: color = 'red'; break
          case 2: color = 'orange'; break
          case 3: color = 'yellow'; break
          case 4: color = 'green'; break
          case 5: color = 'blue'; break
          case 6: color = 'purple'; break
          default: color = 'gray'
        }
        return color
      }
    }
  }
</script>
