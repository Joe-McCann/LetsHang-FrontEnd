import Functions from '@/library/global'
import People from '@/library/people'

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
    var p = new People()
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
}
