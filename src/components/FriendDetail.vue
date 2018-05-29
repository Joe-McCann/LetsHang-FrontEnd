<template>
  <v-layout row justify-center>
    <v-dialog v-model="isopen" persistent max-width="500px" :fullscreen="$vuetify.breakpoint.xs">
        <v-card>
        <v-card-title>
            <span class="headline">{{ formTitle }}</span>
        </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                    <v-text-field label="First Name" required hint="type their first name here" v-model="person.firstName"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field
                        label="Last Name"
                        hint="type their surname here"
                        persistent-hint
                        v-model="person.lastName"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field label="Nickname" hint="this is what I call them" persistent-hint v-model="person.nickName"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                    <v-text-field label="Address" required v-model="person.address"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                    <v-text-field label="Email" required v-model="person.email"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                    <v-text-field label="Phone Number" required hint="the phone is used to send invites" v-model="person.phone"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat v-on:click.native="closeThis()">Cancel</v-btn>
            <v-btn color="primary" v-on:click.native="handleOk()">Ok</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import People from '@/library/people'
  import store from '@/store'
  import Logger from '../library/logger'
  const logger = new Logger('debug')

  export default {
    name: 'friendDetail',
    props: [ 'isopen', 'formTitle' ],
    data: function () {
      logger.debug('FriendDetail.vue', 'data', 'In the FriendDetail data function ' + store.getters.thePerson.id)
      return { person: store.getters.thePerson }
    },
    methods: {
      closeThis () {
        logger.debug('FriendDetail.vue', 'closeThis', 'Closing the FriendDetail form')
        this.person = new People()
        this.$emit('result', { isopen: false })
      },
      handleOk () {
        logger.debug('FriendDetail.vue', 'handleOk', 'The user clicked Ok on the FriendDetail form')
        this.$emit('savePerson', { person: this.person })
        this.closeThis()
      }
    },
    beforeUpdate: function () { this.person = store.getters.thePerson }
  }
</script>