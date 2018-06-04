<template>
    <v-container fluid>
        <gmap-map
          :center="center"
          :zoom="10"
          class="google-map">
            <gmap-marker
              :key="index"
              v-for="(pin, index) in markers"
              :position="pin.position"
              :icon="pin.icon"
              :clickable="true"
              :draggable="true"
              @click="center=pin.position">
            </gmap-marker>
        </gmap-map>
    </v-container>
</template>

<script>
  import store from '@/store'

  export default {
    computed: {
      center: () => store.getters.mapCenter,
      markers: () => store.getters.mapMarkers
    },
    data: () => { return { } }
  }
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 400px;
  margin: none;
}
</style>