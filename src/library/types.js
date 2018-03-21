export default {
  IDGenerator: function () {
    return Math.floor(Math.random() * 1000000)
  },
  Person: function (firstName, lastName, nickName, location, email, phone) {
    this.id = this.IDGenerator()
    this.firstName = firstName
    this.lastName = lastName
    this.nickName = nickName
    this.location = location
    this.email = email
    this.phone = phone
  },
  Event: function (eventDescription, date, time) {
    this.id = this.IDGenerator()
    this.eventDescription = eventDescription
    this.date = date
    this.time = time
  }
}
