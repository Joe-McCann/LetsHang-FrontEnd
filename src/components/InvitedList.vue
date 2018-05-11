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
                <v-btn
                    color="accent"
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
            </v-flex>
        </v-layout>                        
    </v-card>
</template>

<script>
  import FriendDetail from '@/components/FriendDetail'
  import Profile from '@/library/profile'
  import People from '@/library/people'
  import store from '@/store'

  // Remove the comments below to turn on loggin
  // import Logger from '../library/logger'
  // const logger = new Logger('debug')

  export default {
    name: 'invitedList',
    components: { 'friendDetail': FriendDetail },
    computed: {
      currentUser: state => store.getters.currentUser,
      invited: state => store.getters.theEvent.invited
    },
    data: function () {
      store.commit('setThePerson', new People())
      return {
        openForm: false,
        formTitle: 'Invite a Friend'
      }
    },
    methods: {
      resetForm: function (payload) { this.openForm = payload.isopen },
      savePerson: function (payload) {
        let person = payload.person
        person.newMember = false
        let profileAPI = new Profile()
        // TODO. This only supports adding friends to the database; need to support update.
        profileAPI.PostProfile(person)
        store.commit('addAttendee', person)
        store.commit('setThePerson', new People())
      },
      remove: function (person) { store.commit('removeAttendee', person) }
    }
  }
</script>