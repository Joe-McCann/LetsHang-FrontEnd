// Profile
// This class simply returns a special People object with the values for the
// logged in user
//
// This implementation is using hardcoded values
// ToDo: implement an API call to retrieve the profile from a database
//
import People from '@/library/people'

export default function GetProfile (userId) {
  var me = new People()
  me.setFirstName('Bill')
  me.setLastName('McCann')
  return me
}
