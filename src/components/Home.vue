<template>
    <v-container fluid><v-layout column><v-flex xs12 md8 offset-md2 p-0 m-0>
    <div v-if="eventCount < 1">
        <v-container fluid text-xs-center>
            <v-slide-y-transition mode="out-in">
                <v-layout column align-center>
                    <v-flex xs12>
                            <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
                            <blockquote>
                            &#8220;Hanging out with friends should be easy.&#8221;
                            </blockquote>
                            <router-link to="./eventdetailhorizontal">
                                <div class="headline mt-4" @click="handleNewEvent">Let's Get Started {{ myFirstName }}!</div>
                            </router-link>
                    </v-flex>
                </v-layout>
            </v-slide-y-transition>
        </v-container>
    </div>
    <div v-else>
        <v-container grid-list-md fluid>
            <v-slide-y-transition mode="out-in">
                <v-layout row wrap>
                    <v-flex xs12 md4 v-for="event in myEvents" :key="event.id">
                        <v-card>
                            <v-card-media src="/static/img/samplemap.jpg" height="200px"></v-card-media>
                            <v-card-title primary-title>
                                <div>
                                <h3>{{ event.eventDescription }}</h3>
                                <strong>When:&nbsp;</strong>{{ event.formatMMDDYYY() }}&nbsp;&nbsp;<strong>at&nbsp;</strong>{{ event.formatHHMMAM() }}
                                </div>
                                <div class="text-xs-left">
                                    <v-chip color="info" 
                                            text-color="white" 
                                            v-for="person in event.invited" 
                                            :key="person.id">
                                        <v-avatar>
                                            <v-icon>check_circle</v-icon>
                                        </v-avatar>
                                        {{ person.firstName }}
                                    </v-chip>
                                </div>                                
                            </v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <router-link to="./eventdetailhorizontal">
                                    <v-btn icon @click="handleEdit(event.id)">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                </router-link>
                                <v-btn icon @click="handleDelete(event.id)">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <router-link to="./eventdetailhorizontal">
                        <v-btn color="teal accent-4" relative dark fixed bottom right fab>
                            <v-icon @click="handleNewEvent">add</v-icon>
                        </v-btn>
                    </router-link>
                </v-layout>
            </v-slide-y-transition>
        </v-container>
    </div>
    <friendDetail v-bind:isopen="openForm" 
                  v-bind:formTitle="formTitle"
                  v-on:result="resetForm" 
                  v-on:savePerson="savePerson">
    </friendDetail>
    </v-flex></v-layout></v-container>
</template>

<script>
import FriendDetail from '@/components/FriendDetail'
import store from '@/store'
import Profile from '@/library/profile'
import Logger from '../library/logger'
const logger = new Logger('debug')

export default {
  name: 'home',
  props: ['auth', 'authenticated'],
  components: { 'friendDetail': FriendDetail },
  computed: {
    myEvents: () => store.getters.myEvents.events,
    eventCount: () => store.getters.numberOfEvents,
    openForm: {
      get: () => {
        this.profile = store.getters.currentUser // set the profile to the current user
        store.commit('setThePerson', this.profile) // open the form on the profile
        return store.getters.isNewMember
      },
      set: (value) => value
    },
    myFirstName: () => store.getters.myFirstName
  },
  data: function () {
    logger.debug('Home.vue', 'data', 'In the data function of Home.Vue')
    this.auth.handleAuthentication()
    return {
      formTitle: 'Your Let\'s Hang Profile',
      profile: store.getters.currentUser
    }
  },
  methods: {
    resetForm: function (payload) { this.openForm = payload.isopen },
    savePerson: function (payload) {
      let person = payload.person
      person.newMember = false
      let profileAPI = new Profile()
      profileAPI.PutProfile(person)
      store.commit('setCurrentUser', person)
    },
    handleNewEvent: () => {
      logger.debug('Home.vue', 'handleNewEvent', 'Create a new event')
      this.profile = store.getters.currentUser
      store.commit('newEvent')
      logger.debug('Home.vue', 'handleNewEvent', 'Now add the user as an attendee ' + this.profile.id)
      store.commit('addAttendee', this.profile)
      logger.debug('Home.vue', 'handleNewEvent', 'handleNewEvent is done')
    },
    handleDelete: (id) => {
      logger.debug('Home.vue', 'handleDelete', 'handleDelete')
      // ToDo: display a popup confirmtion
      store.commit('removeEvent', id)
    },
    handleEdit: (id) => {
      logger.debug('Home.vue', 'handleEdit', 'handleEdit')
      store.commit('setEvent', id)
    }
  }
}
</script>
