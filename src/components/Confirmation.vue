<template>
  <div class="text-xs-center">
    <v-dialog v-model="isopen" width="500">
      <v-card>
        <v-card-title
          class="headline"
          primary-title>
          Are you sure?
        </v-card-title>

        <v-card-text>{{ messageText }}</v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" v-on:click.native="closeThis('Yes')">Yes</v-btn>
          <v-btn flat v-on:click.native="closeThis('No')">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import Logger from '../library/logger'
  const logger = new Logger('error')

  export default {
    name: 'confirmation',
    props: [ 'isopen', 'messageText' ],
    data: function () {
      logger.debug('confirmation.vue', 'data', 'In the confirmation data function')
      return { }
    },
    methods: {
      closeThis (response) {
        logger.debug('confirmation.vue', 'closeThis', 'Closing the confirmation form')
        this.$emit('confirmed', {
          result: response,
          isopen: false
        })
      }
    }
  }
</script>