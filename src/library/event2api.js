// event2api
// This file contains the class that manages API calls for events.
import axios from 'axios'

import Logger from '../library/logger'
const logger = new Logger('debug')

export default class EventAPI {
  constructor () {
    logger.debug('event2api.js', 'constructor', 'Creating EventAPI class')
    this.baseURL = 'http://Localhost:8000'
    this.token = 'ThisCanBeAnything'
    this.authorizationType = 'Bearer'
    this.bearerToken = `${this.authorizationType} ${this.token}`
    this.axiosConfig = { headers: { 'Authorization': this.bearerToken } }
  }

  PostEvent (event) {
    logger.debug('event2api.js', 'PostEvent', 'In PostEvent for ' + event.id)
    let eventId = event.id

    let url = `${this.baseURL}/event/${eventId}`
    axios
      .post(url, event, this.axiosConfig)
      .then((response) => {
        logger.debug('event2api.js', 'axios.put.then', 'In PostEvent, successful response from backend')
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          logger.error('event2api.js', 'axios.post.then.catch', error.response.data)
          logger.error('event2api.js', 'axios.post.then.catch', error.response.status)
          logger.error('event2api.js', 'axios.post.then.catch', error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          logger.error('event2api.js', 'axios.post.then.catch', error.request.stack)
        } else {
          // Something happened in setting up the request that triggered an Error
          logger.error('event2api.js', 'axios.post.then.catch', 'Error', error.message)
        }
        logger.error('event2api.js', 'axios.post.then.catch', error.config)
      })
  }
}
