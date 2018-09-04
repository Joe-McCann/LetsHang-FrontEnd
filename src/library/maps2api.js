// Maps
// This class calls the Lets Hang API to retreive the points needed
// to display a Google Map
//
import store from '@/store'
import axios from 'axios'
import Functions from '@/library/global'
import Logger from '../library/logger'
const logger = new Logger('debug')

export default class Maps {
  constructor () {
    this.baseURL =  ( (new Functions()).environment() == 'development' )
      ? 'http://lets-hang.test:8000'
      : 'https://api-dot-letshang-v000.appspot.com'
    logger.debug('event2api.js', 'constructor', `The baseURL is ${this.baseURL}`)
    this.token = 'ThisCanBeAnything'
    this.authorizationType = 'Bearer'
    this.bearerToken = `${this.authorizationType} ${this.token}`
    this.axiosConfig = { headers: { 'Authorization': this.bearerToken } }
    this.colors = ['ffb900', 'ff6200', '87ad72', '728fad', '9c72ad']
  }

  PostMap () {
    logger.debug('maps2api.js', 'postMap', `Starting postMap`)
    let mapData = JSON.parse(this.getAddresses()) // the parse is needed because a JSON string is returned by getAddresses
    logger.debug('maps2api.js', 'postMap', `${mapData}`)

    let url = `${this.baseURL}/map`
    axios
      .post(url, mapData, this.axiosConfig)
      .then((response) => {
        logger.debug('maps2api.js', 'axios.post.then', 'In PostMap, successful response from backend')
        store.commit('setMapCenter', response.data.center)
        store.commit('setMapMarkers', this.getMarkers(response.data.markers))
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          logger.error('maps2api.js', 'axios.post.then.catch', error.response.data)
          logger.error('maps2api.js', 'axios.post.then.catch', error.response.status)
          logger.error('maps2api.js', 'axios.post.then.catch', error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          logger.error('maps2api.js', 'axios.post.then.catch', error.request.stack)
        } else {
          // Something happened in setting up the request that triggered an Error
          logger.error('maps2api.js', 'axios.post.then.catch', 'Error', error.message)
        }
        logger.error('maps2api.js', 'axios.post.then.catch', error.config)
      })
  }

  getMarkers (markerData) {
    logger.debug('maps2api.js', 'getMarkers', `Starting getMarkers`)

    let markers = []

    for (let i in markerData) {
      /* eslint-disable */
      let pin = new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + markerData[i].color)
      /* eslint-enable */
      let marker = {
        position: markerData[i].position,
        icon: pin
      }
      logger.debug('maps2api.js', 'getMarkers', `Marker ${i} has color ${markerData[i].color}`)
      markers.push(marker)
    }

    logger.debug('maps2api.js', 'getMarkers', `Returning markers for ${markers.length} points`)
    return markers
  }

  getAddresses () {
    logger.debug('maps2api.js', 'getAddresses', `Starting getMapData`)

    let mapData = '{ "mapData":{ '
    let event = store.getters.theEvent
    let me = store.getters.currentUser // added for issue #4
    let comma = ''
    let address = ''
    let color = ''

    for (let i in event.invited) {
      color = this.pickColor()
      // the follow line added for issue #4
      if ((event.invited[i].address == null) || (event.invited[i].address.trim() === '')) {
        event.invited[i].address = me.address
      }
      address = `${comma}"${event.invited[i].id}":{ "address":"${event.invited[i].address}", "color":"${color} "}`
      mapData = mapData + address
      comma = ','
    }

    mapData = mapData + ' }}'
    return mapData
  }

  pickColor () {
    let i = Math.floor(Math.random() * 5)
    return this.colors[i]
  }
}
