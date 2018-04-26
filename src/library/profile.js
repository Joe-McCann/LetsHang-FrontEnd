// Profile
// This class simply returns a special People object with the values for the
// logged in user
//
// This implementation is using hardcoded values
// ToDo: implement an API call to retrieve the profile from a database
//
import People from '@/library/people'
import axios from 'axios'

export default function GetProfile (userId) {
  let me = new People()
  me.firstName = 'Yogi'

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
      me.firstName = response.data.firstName
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config)
    })

  return me
}
