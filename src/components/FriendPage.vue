
<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12 md10 offset-md1 p-0 m-0>
        <friendDetail v-bind:isopen="openForm"
                      v-bind:formTitle="formTitle"
                      v-on:result="resetForm" 
                      v-on:savePerson="savePerson">
        </friendDetail>
        <v-card>
          <v-toolbar color="primary" dark tabs>
            <v-text-field append-icon="mic"
                          class="mx-3"
                          flat
                          label="Search"
                          prepend-inner-icon="search"
                          solo-inverted>
            </v-text-field>
            <v-tabs slot="extension"
                    v-model="tab"
                    centered
                    color="transparent"
                    slider-color="error">
              <v-tab v-for="(tabName, i) in tabNames" :key="i">{{ tabName }}</v-tab>
            </v-tabs>
            </v-toolbar>
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card>
                  <v-card-text>
                    <v-list two-line>
                      <template v-for="(item, index) in items">
                        <v-list-tile :key="item.id" avatar @click="chooseItem(item)">
                          <v-list-tile-avatar>
                            <v-avatar :color="functions.randomColor()" size="40"><span class="white--text headline">{{functions.initial(item)}}</span></v-avatar>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="functions.fullName(item)"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="item.nickName"></v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>          
                      </template>
                    </v-list>
                  </v-card-text>
                <v-card-text style="position: relative">
                  <v-btn color="accent"
                         dark
                         small
                         absolute
                         top
                         right
                         v-on:click.stop="openForm = true"
                         fab>
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card>
                <v-card-text>{{ text }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import People from '@/library/people'
  import store from '@/store'
  import FriendDetail from '@/components/FriendDetail'
  import Functions from '@/library/global'
  import Profile from '@/library/profile2api'
  import Friends from '@/library/friends2api'
  import Logger from '../library/logger'
  const logger = new Logger('debug')

  export default {
    name: 'friendPage',
    components: { 'friendDetail': FriendDetail },
    computed: {
      items: () => store.getters.myFriends.friends
    },
    data () {
      store.commit('setThePerson', new People())
      return {
        openForm: false,
        formTitle: 'Add a Friend',
        tab: null,
        tabNames: ['My friends', 'Contacts'],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        person: new People(),
        functions: new Functions(),
        profileAPI: new Profile(),
        friendsAPI: new Friends()
      }
    },
    methods: {
      resetForm: function (payload) { this.openForm = payload.isopen },
      savePerson: function (payload) {
        let person = payload.person
        person.newMember = false
        logger.debug('FriendPage.vue', 'savePerson', `1. The userId of the friend is ${person.id}`)
        store.commit('addFriend', person) // add the profile to the user's friends
        store.commit('addAttendee', person) // add the person to the list attending the event
        store.commit('setThePerson', new People()) // reset the profile used by the form
        logger.debug('FriendPage.vue', 'savePerson', `2. The userId of the friend is ${person.id}`)
        this.profileAPI.PostProfile(person) // update the profile on Firebase
        logger.debug('FriendPage.vue', 'savePerson', `3. The userId of the friend is ${store.getters.myFriends.id}`)
        this.friendsAPI.PutFriends(store.getters.myFriends) // save the friends to Firebase
        logger.debug('FriendPage.vue', 'savePerson', `4. The userId of the friend is ${store.getters.myFriends.id}`)
      },
      chooseItem (item) {
        logger.debug('FriendPage.vue', 'chooseItem', `The picked the friend from the list ${item.id}`)
        store.commit('setThePerson', item)
        this.openForm = true

      }

    }
  }
</script>