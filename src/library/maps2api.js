// Maps
// This class calls the Lets Hang API to retreive the points needed
// to display a Google Map
//
import store from '@/store'
import axios from 'axios'

import Logger from '../library/logger'
const logger = new Logger('debug')

export default class Maps {
  constructor () {
    this.baseURL = 'http://Localhost:8000'
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
        store.commit('setMapMarkers', response.data.markers)
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

  getAddresses () {
    logger.debug('maps2api.js', 'getAddresses', `Starting getMapData`)

    let mapData = '{ "mapData":{ '
    let event = store.getters.theEvent
    let comma = ''
    let address = ''
    let color = ''

    for (let i in event.invited) {
      color = this.pickColor()
      address = `${comma}"${event.invited[i].address}":{"color":"${color}"}`
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
