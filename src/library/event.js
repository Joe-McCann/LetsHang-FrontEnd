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
    let hours = parseInt(this.time.substr(0, 2))
    let minutes = this.time.substr(3, 2)

    // validations for bad time data
    let testDigits = /^[0-5][0-9]$/
    if (!testDigits.test(minutes)) minutes = '00'

    if (hours < 0) hours = 0
    if (hours > 24) hours = 0

    // Adjust the displayed time because 0:00 is 12am and 12:00 is 12:00pm
    if (hours === 12) hours = 24
    if (hours === 0) hours = 12

    // Adjust military time to am and pm
    if (hours <= 12) {
      return hours.toString() + ':' + minutes + ' am'
    }
    return (hours - 12).toString() + ':' + minutes + ' pm'
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
