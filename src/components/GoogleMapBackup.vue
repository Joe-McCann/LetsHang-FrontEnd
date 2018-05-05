<template>
    <v-container fluid>
        <div class="google-map" id="map-canvas"></div>
    </v-container>
</template>

<script>
import Logger from '../library/logger'
const logger = new Logger('debug')

export default {
  data: function () {
    return { }
  },
  mounted: function () {
    function initializeMap () {
      const canvasElement = document.getElementById('map-canvas')
      logger.debug('GoogleMapBackup.vue', 'mounted', canvasElement)
      if (canvasElement) {
        /* eslint-disable */
        let map = new google.maps.Map(this.canvasElement, {
        zoom: 8,
        center: new google.maps.LatLng(40.5000283, -74.3068167)
        })
        /* eslint-enable */
      }
    }
    /* eslint-disable */
    google.maps.event.addDomListener(window, 'load', initializeMap)
    /* eslint-enable */
  }
}
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>