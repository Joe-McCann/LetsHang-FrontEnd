// Profile
// This class simply returns a special People object with the values for the
// logged in user
//
// This implementation is using hardcoded values
// ToDo: implement an API call to retrieve the profile from a database
//
import People from '@/library/people'
import store from '@/store'
import axios from 'axios'
import Logger from '../library/logger'
const logger = new Logger('debug')

export default function GetProfile (userId) {
  logger.debug('profile.js', 'GetProfile', 'In GetProfile for ' + userId)
  let me = new People()
  logger.debug('profile.js', 'GetProfile', 'New persion id ' + me.id)
  me.id = userId
  logger.debug('profile.js', 'GetProfile', 'Updated persion id ' + me.id)

  let baseURL = 'http://Lenovo-laptop:8080'
  let token = 'ThisCanBeAnything'
  let authorizationType = 'Bearer'

  let url = `${baseURL}/profile/${userId}`
  let bearerToken = `${authorizationType} ${token}`
  let axiosConfig = {
    headers: { 'Authorization': bearerToken }
  }

  axios
    // .get(url, axiosConfig)
    .get(url, axiosConfig)
    .then((response) => {
      logger.debug('profile.js', 'axios.get.then', 'In GetProfile, successful response from backend')
      me.firstName = response.data.firstName
      me.lastName = response.data.lastName
      me.address = response.data.address
      me.phone = response.data.phone
      me.email = response.data.email
      me.newMember = response.data.newMember
      me.nickName = response.data.nickName.replace(/\s/g, '')
      store.commit('setCurrentUser', me)
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        logger.error('profile.js', 'axios.get.then.catch', error.response.data)
        logger.error('profile.js', 'axios.get.then.catch', error.response.status)
        logger.error('profile.js', 'axios.get.then.catch', error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        logger.error('profile.js', 'axios.get.then.catch', error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        logger.error('profile.js', 'axios.get.then.catch', 'Error', error.message)
      }
      logger.error('profile.js', 'axios.get.then.catch', error.config)
    })
}
