<template>
    <v-container fluid>
        <gmap-map
          :center="center"
          :zoom="10"
          class="google-map"
        >
            <gmap-marker
            :key="index"
            v-for="(pin, index) in markers"
            :position="pin.position"
            :icon="pin.icon"
            :clickable="true"
            :draggable="true"
            @click="center=pin.position"
            ></gmap-marker>
        </gmap-map>
    </v-container>
</template>

<script>
  export default {
    data: () => {
      return {
        center: { lat: 40.5000283, lng: -74.3068167 },
        /* eslint-disable */
        markers: [
          { position: { lat: 40.4087405, lng: -75.2505561 },
            icon: (new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + 'FE7569'))
          },
          { position: { lat: 40.5913161, lng: -74.3630773 },
            icon: (new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + 'FE7569'))
          },
          { position: { lat: 40.5000283, lng: -74.3068167 },
            icon: (new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + '3AED0E'))
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