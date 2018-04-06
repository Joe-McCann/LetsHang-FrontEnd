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
                                <div class="headline mt-4" @click="handleNewEvent">Let's Get Started {{ myProfile.firstName }}!</div>
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
    </v-flex></v-layout></v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import store from '@/store'

  export default {
    name: 'home',
    props: ['auth', 'authenticated'],
    computed: mapState({
      myEvents: state => state.myEvents.events,
      // eventCount: function () { return store.getters.numberOfEvents },
      eventCount: () => store.getters.numberOfEvents,
      myProfile: state => state.myProfile
    }),
    data: function () {
      this.auth.handleAuthentication()
      return { }
    },
    methods: {
      handleNewEvent () {
        store.commit('newEvent')
        store.commit('addAttendee', this.$store.state.myProfile)
      },
      handleDelete (id) {
        // ToDo: display a popup confirmtion
        store.commit('removeEvent', id)
      },
      handleEdit (id) {
        store.commit('setEvent', id)
      }
    },
    beforeMount: () => {
      let userId = localStorage.getItem('sub')
      store.commit('getMyProfile', userId) // retrieve the logged in user's profile
    }
  }
</script>
