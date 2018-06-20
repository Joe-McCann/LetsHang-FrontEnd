<template>
  <v-container fluid>
    <v-layout row wrap>
        <v-flex xs12 md10 offset-md1>
            <v-stepper v-model="wizardStep" non-linear :fullscreen="$vuetify.breakpoint.xs">
                <v-stepper-header>
                    <v-stepper-step step="1" editable :complete="wizardStep > 1">What are you planning?</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="2" editable :complete="wizardStep > 2">Who is coming?</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="3" editable :complete="wizardStep > 3">Where do you want to go?</v-stepper-step>
                </v-stepper-header>
                <v-stepper-content step="1">
                    <eventDescription></eventDescription>
                    <v-btn color="primary" v-on:click.native="wizardStep = 2">Continue</v-btn>
                    <router-link to="./home" class="noUnderline">
                        <v-btn flat>Cancel</v-btn>
                    </router-link>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <invitedList></invitedList>
                    <v-btn color="primary" v-on:click.native="wizardStep = 3">Continue</v-btn>
                    <router-link to="./home" class="noUnderline">
                        <v-btn flat>Cancel</v-btn>
                    </router-link>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <googleMap></googleMap>
                    <router-link to="./home" class="noUnderline">
                        <v-btn color="primary" v-on:click.native="handleSave">Save</v-btn>
                    </router-link>
                    <router-link to="./home" class="noUnderline">
                        <v-btn flat>Cancel</v-btn>
                    </router-link>
                </v-stepper-content>
            </v-stepper>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import EventDescription from '@/components/EventDescription'
  import InvitedList from '@/components/InvitedList'
  import GoogleMap from '@/components/GoogleMap'
  import Maps from '@/library/maps2api'
  import store from '@/store'
  import Logger from '../library/logger'
  const logger = new Logger('debug')

  export default {
    name: 'eventdetailhorizontal',
    components: {
      'eventDescription': EventDescription,
      'invitedList': InvitedList,
      'googleMap': GoogleMap
    },
    props: ['auth', 'authenticated'],
    computed: { mapAPI: () => new Maps() },
    data () {
      logger.debug('EventDetailHorizontal.vue', 'Data', 'In the data for event detail stepper')
      this.auth.handleAuthentication()
      return { wizardStep: 1 }
    },
    methods: {
      handleSave: function () { store.commit('addEvent') }
    },
    created: function () { this.mapAPI.PostMap() }
  }
</script>

<style scoped>
.noUnderline {
    text-decoration: none;
}
</style>