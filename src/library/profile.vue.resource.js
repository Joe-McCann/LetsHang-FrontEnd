// Profile
// This class simply returns a special People object with the values for the
// logged in user
//
// This implementation is using hardcoded values
// ToDo: implement an API call to retrieve the profile from a database
//
import People from '@/library/people'
import Vue from 'vue'

export default function GetProfile (userId) {
  let me = new People()
  me.firstName = 'Yogi'

  let resource = `profile/${userId}`
  Vue.http.get(resource)
    .then(
      response => {
        me.firstName = 'Bob'
      },
      response => {
        console.log(response.statusText)
      }
    )
  return me
}
