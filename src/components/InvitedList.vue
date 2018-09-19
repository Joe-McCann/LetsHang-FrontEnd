<template>
    <v-card class="mb-5">
        <v-layout row wrap>
            <v-flex sm10 offset-sm1>
                <p class="headline mt-5 noUnderline" v-if="invited.length < 2">Hey, it's lonely here.</p>
                <div class="text-xs-left my-5">
                    <v-chip close 
                            color="info" 
                            text-color="white" 
                            v-for="person in invited" 
                            :key="person.id" 
                            @input="remove(person)">
                        <v-avatar>
                            <v-icon>check_circle</v-icon>
                        </v-avatar>
                        {{ person.firstName }}&nbsp;<span><strong v-if="person.nickName.trim()!=''">&quot;{{ person.nickName }}&quot;&nbsp;</strong></span>{{ person.lastName }}
                    </v-chip>
                </div>
                <!-- TODO: Add logic for -->
                <v-btn
                    color="accent"
                    dark
                    small
                    absolute
                    bottom
                    right
                    v-on:click.stop="isOpen = true"
                    fab>
                  <v-icon>add</v-icon>
                </v-btn>
                <component v-bind:is="componentName"
                           v-bind:isopen="isOpen" 
                           v-bind:formTitle="formTitle"
                           v-on:result="resetForm" 
                           v-on:savePerson="savePerson">
                </component>
            </v-flex>
        </v-layout>                        
    </v-card>
</template>

<script>
  import FriendDetail from '@/components/FriendDetail'
  import FriendList from '@/components/FriendList'
  import Profile from '@/library/profile2api'
  import Friends from '@/library/friends2api'
  import Maps from '@/library/maps2api'
  import People from '@/library/people'
  import store from '@/store'

  // Remove the comments below to turn on loggin
  import Logger from '../library/logger'
  const logger = new Logger('error')

  export default {
    name: 'invitedList',
    components: {
      'friendDetail': FriendDetail,
      'friendList': FriendList
    },
    computed: {
      currentUser: () => store.getters.currentUser,
      invited: () => store.getters.theEvent.invited,
      componentName: () => store.getters.numberOfFriends > 0 ? 'friendList' : 'friendDetail'
    },
    data: function () {
      store.commit('setThePerson', new People())
      return {
        isOpen: false,
        formTitle: 'Invite a Friend',
        // componentName: 'friendDetail',
        profileAPI: new Profile(),
        friendsAPI: new Friends(),
        mapAPI: new Maps()
      }
    },
    methods: {
      resetForm: function (payload) { this.isOpen = payload.isopen },
      // TODO. This only supports adding friends to the database; need to support update.
      savePerson: function (payload) {
        let person = payload.person // obain the profile from the form
        person.newMember = false // set the person's newMember flag to false
        logger.debug('InvitedList.vue', 'savePerson', `1. The userId of the friend is ${person.id}`)
        store.commit('addFriend', person) // add the profile to the user's friends
        store.commit('addAttendee', person) // add the person to the list attending the event
        store.commit('setThePerson', new People()) // reset the profile used by the form
        this.mapAPI.PostMap() // obtain the map data
        logger.debug('InvitedList.vue', 'savePerson', `2. The userId of the friend is ${person.id}`)
        this.profileAPI.PostProfile(person) // update the profile on Firebase
        logger.debug('InvitedList.vue', 'savePerson', `3. The userId of the friend is ${store.getters.myFriends.id}`)
        this.friendsAPI.PutFriends(store.getters.myFriends) // save the friends to Firebase
        logger.debug('InvitedList.vue', 'savePerson', `4. The userId of the friend is ${store.getters.myFriends.id}`)
      },
      remove: function (person) { store.commit('removeAttendee', person) }
    }
  }
</script>