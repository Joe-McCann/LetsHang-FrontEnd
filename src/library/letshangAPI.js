// letshangAPI
// This class holds the helper functions for the API calls exposed
// by the Lets Hang backend. These are REST calls.
import axios from 'axios'

export default class LetsHangAPI {
  constructor () {
    this.baseURL = 'http://Lenovo-laptop:8080'
    this.token = 'ThisCanBeAnything'
    this.authorizationType = 'Bearer'
    this.firstName = 'Yogi'
  }

  getProfileFromDB (userId) {
    let url = `${this.baseURL}/profile/${userId}`
    let bearerToken = `${this.authorizationType} ${this.token}`
    let axiosConfig = {
      headers: { 'Authorization': bearerToken }
    }
    axios
      .get(url, axiosConfig)
      .then((response) => {
        this.firstName = 'Bob'
        alert('Response status=' + response.status)
        console.log(response.status)
        console.log(response.data)
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert('Response error ' + error.response.status)
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          alert('Request error ' + error.request.config.adapter.url)
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          alert('Setup error' + error.message)
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
    alert('First name is ' + this.firstName)
  }
}
