import People from '@/library/people'

// Add the following import if logging is necessary
import Logger from '../library/logger'
const logger = new Logger('error')

export default class FriendList {
  constructor (userId) {
    this.id = userId
    this.friends = []
  }

  addFriend (person) {
    if (this.inList(person)) return
    let p = new People()
    p.setId(person.id)
    p.setFirstName(person.firstName)
    p.setLastName(person.lastName)
    p.setNickName(person.nickName)
    p.setPhone(person.phone)
    p.setAddress(person.address)
    p.setEmail(person.email)
    logger.debug('friendList.js', 'addFriend', `Added ${p.id} with ${p.fullName} and ${p.initials}`)
    this.friends.push(p)
  }

  inList (person) {
    if (this.friends.indexOf(person) >= 0) return true
    return false
  }

  findFriendById (id) {
    for (friend in this.friends) {
      if (friend.id == id) return friend
    }
    return null
  }
}
