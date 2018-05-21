// Add the following import if logging is necessary
// import Logger from '../library/logger'
// const logger = new Logger('debug')

export default class FriendList {
  constructor (userId) {
    this.id = userId
    this.friends = []
  }

  addFriend (person) {
    let id = person.id
    this.friends.push(id)
  }
}
