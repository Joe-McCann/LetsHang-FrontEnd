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
  // import store from '@/store'

  export default {
    data: () => {
      return {
        // center: store.getters.mapCenter,
        // markers: store.getters.mapMarkers
        center: { lat: 40.5000283, lng: -74.3068167 },
        /* eslint-disable */
        markers: [
          { position: { lat: 40.4087405, lng: -74.2505561 },
            icon: (new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + 'FE7569',
              new google.maps.Size(21, 34),
              new google.maps.Point(0, 0),
              new google.maps.Point(10, 34)))
          },
          { position: { lat: 40.5913161, lng: -74.3630773 },
            icon: (new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + 'FE7569',
              new google.maps.Size(21, 34),
              new google.maps.Point(0, 0),
              new google.maps.Point(10, 34)))
          },
          { position: { lat: 40.5000283, lng: -74.3068167 },
            icon: (new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + '3AED0E',
              new google.maps.Size(21, 34),
              new google.maps.Point(0, 0),
              new google.maps.Point(10, 34)))
          }
        ]
        /* eslint-enable */
      }
    }
  }
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 400px;
  margin: none;
}
</style>