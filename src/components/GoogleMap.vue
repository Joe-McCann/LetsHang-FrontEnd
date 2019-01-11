<template>
    <v-container fluid>
        <GmapMap
          :center="center"
          :zoom="10"
          class="google-map">
            <GmapMarker
              :key="index"
              v-for="(pin, index) in markers"
              :position="pin.position"
              :icon="pin.icon"
              :clickable="true"
              :draggable="false"
              @click="center=pin.position">
            </GmapMarker>
            <GmapCircle
              
              :key="index"
              :center="center"
              :radius="4000"
              :visible="true"
              :options="{fillColor:'red',fillOpacity:0.3}">
            </GmapCircle>
        </GmapMap>
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