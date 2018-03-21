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
                <friendDetail v-bind:isopen="openForm" v-on:result="resetForm"></friendDetail>
            </v-flex>
        </v-layout>                        
    </v-card>
</template>

<script>
  import FriendDetail from '@/components/FriendDetail'
  import { mapState } from 'vuex'
  import store from '@/store'

  export default {
    name: 'invitedList',
    components: { 'friendDetail': FriendDetail },
    computed: mapState({
      myProfile: state => state.myProfile,
      invited: state => state.theEvent.invited
    }),
    data: function () {
      return { openForm: false }
    },
    methods: {
      resetForm: function (payload) { this.openForm = payload.isopen },
      remove: function (person) { store.commit('removeAttendee', person) }
    }
  }
</script>