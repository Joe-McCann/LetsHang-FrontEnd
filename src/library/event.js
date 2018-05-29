import Functions from '@/library/global'
import People from '@/library/people'
import Logger from '../library/logger'
const logger = new Logger('debug')

export default class Event {
  constructor () {
    var functions = new Functions()
    this.id = functions.idGenerator()
    this.eventDescription = ''
    this.date = ''
    this.time = ''
    this.invited = []
  }

  formatMMDDYYY () { return this.date.substr(5, 2) + '/' + this.date.substr(8, 2) + '/' + this.date.substr(0, 4) }
  formatHHMMAM () {
    var hours = parseInt(this.time.substr(0, 2))
    if (hours <= 12) {
      return hours.toString() + ':' + this.time.substr(3, 2) + ' am'
    }
    return (hours - 12).toString() + ':' + this.time.substr(3, 2) + ' pm'
  }
  setEventDescription (eventDescription) { this.eventDescription = eventDescription }
  setDate (date) { this.date = date }
  setTime (time) { this.time = time }

  // More JS nonsense. To prevent pointing to the same object over and over in the
  // array, create a new instance to push.
  invitePerson (person) {
    if (this.inInvited(person)) return
    var p = new People()
    logger.debug('event.js', 'invitePerson', 'The id of the person being added ' + person.id)
    p.id = person.id
    p.firstName = person.firstName
    p.lastName = person.lastName
    p.nickName = person.nickName
    p.phone = person.phone
    p.address = person.address
    p.email = person.email
    this.invited.push(p)
  }

  removePerson (person) {
    this.invited.splice(this.invited.indexOf(person), 1)
    this.invited = [...this.invited]
  }

  inInvited (person) {
    for (let p in this.invited) {
      if (this.invited[p].id === person.id) return true
    }
    return false
  }
}
