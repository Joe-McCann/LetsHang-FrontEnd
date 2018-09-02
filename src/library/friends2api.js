// Friends2api
// This class simply returns a list of friends for the logged in user.
// Each friend is a People object
//
// This implementation is using hardcoded values
// ToDo: implement an API call to retrieve the profile from a database
//
import store from '@/store'
import axios from 'axios'
import FriendList from '@/library/friendList'
import Functions from '@/library/global'
import Logger from '../library/logger'
const logger = new Logger('debug')

export default class Friends {
  constructor () {
    this.baseURL =  ( (new Functions()).environment() == 'development' )
      ? 'http://lets-hang.test:8000'
      : 'https://api-dot-letshang-v000.appspot.com'
    this.token = 'ThisCanBeAnything'
    this.authorizationType = 'Bearer'
    this.bearerToken = `${this.authorizationType} ${this.token}`
    this.axiosConfig = { headers: { 'Authorization': this.bearerToken } }
  }

  GetFriends (userId) {
    logger.debug('friends2api.js', 'GetFriends', `In GetFriends for ${userId}`)
    let myFriends = new FriendList(userId)
    logger.debug('friends2api.js', 'GetFriends', `New friends id ${myFriends.id}`)

    let url = `${this.baseURL}/friends/${userId}`
    axios
      .get(url, this.axiosConfig)
      .then((response) => {
        logger.debug('friends2api.js', 'axios.get.then', 'In GetProfile, successful response from backend')
        myFriends.friends = response.data.friends
        store.commit('setFriendList', myFriends)
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          logger.error('friends2api.js', 'axios.get.then.catch', error.response.data)
          logger.error('friends2api.js', 'axios.get.then.catch', error.response.status)
          logger.error('friends2api.js', 'axios.get.then.catch', error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          logger.error('friends2api.js', 'axios.get.then.catch', error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          logger.error('friends2api.js', 'axios.get.then.catch', 'Error', error.message)
        }
        logger.error('friends2api.js', 'axios.get.then.catch', error.config)
      })
  }

  PutFriends () {
    logger.debug('friends2api.js', 'PutFriends', `In PutFriends`)
    let myFriends = store.getters.myFriends

    let url = `${this.baseURL}/friends/${myFriends.id}`
    axios
      .put(url, myFriends, this.axiosConfig)
      .then((response) => {
        logger.debug('friends2api.js', 'axios.Put.then', 'In PutFriends, successful response from backend')
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          logger.error('friends2api.js', 'axios.Put.then.catch', error.response.data)
          logger.error('friends2api.js', 'axios.Put.then.catch', error.response.status)
          logger.error('friends2api.js', 'axios.Put.then.catch', error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          logger.error('friends2api.js', 'axios.Put.then.catch', error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          logger.error('friends2api.js', 'axios.Put.then.catch', 'Error', error.message)
        }
        logger.error('friends2api.js', 'axios.Put.then.catch', error.config)
      })
  }
}
