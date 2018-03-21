<template>
    <v-card class="mb-5">
        <v-layout row wrap>
            <!-- Event Description -->
            <v-flex xs10 offset-xs1>
                <v-text-field
                    label="What are you doing?"
                    v-model="eventDescription"
                    color="primary"
                    flat
                    class="my-3"
                    prepend-icon="description"
                    hint="describe what you are doing">
                </v-text-field>
            </v-flex>
            <!-- Date -->
            <v-flex xs5 offset-xs1>
                <v-dialog
                    ref="datePicker"
                    persistent
                    v-model="isDateOpen"
                    lazy
                    full-width
                    width="290px"
                    :return-value.sync="eventDate">
                    <v-text-field
                        slot="activator"
                        label="Date"
                        :value="monthDayYear"
                        prepend-icon="event"
                        readonly>
                    </v-text-field>
                    <v-date-picker v-model="eventDate" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" v-on:click="isDateOpen = false">Cancel</v-btn>
                        <v-btn flat color="primary" v-on:click="$refs.datePicker.save(eventDate)">OK</v-btn>
                    </v-date-picker>
                </v-dialog>
            </v-flex>
            <!-- Time -->
            <v-flex xs5>
                <v-dialog
                    ref="timePicker"
                    persistent
                    v-model="isTimeOpen"
                    lazy
                    full-width
                    width="290px"
                    :return-value.sync="eventTime">
                    <v-text-field
                        slot="activator"
                        label="Time"
                        :value="amPM"
                        prepend-icon="access_time"
                        readonly>
                    </v-text-field>
                    <v-time-picker v-model="eventTime" actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="isTimeOpen = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.timePicker.save(eventTime)">OK</v-btn>
                    </v-time-picker>
                </v-dialog>                                
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  // import { mapState } from 'vuex'
  import store from '@/store'
  
  export default {
    name: 'eventdescription',
    computed: {
      eventDescription: {
        get: function () { return this.$store.state.theEvent.eventDescription },
        set: function (value) { store.commit('setEventDescription', value) }
      },
      eventDate: {
        get: function () { return this.$store.state.theEvent.date },
        set: function (value) { store.commit('setEventDate', value) }
      },
      eventTime: {
        get: function () { return this.$store.state.theEvent.time },
        set: function (value) { store.commit('setEventTime', value) }
      },
      // function to format the date as mm/dd/yyy
      monthDayYear: function () { return this.$store.state.theEvent.formatMMDDYYY() },
      // function to format the time as hh:mm am
      amPM: function () { return this.$store.state.theEvent.formatHHMMAM() }
    },
    data: function () {
      return {
        isDateOpen: false,
        isTimeOpen: false
      }
    }
  }
</script>