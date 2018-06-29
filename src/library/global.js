// Methods
// This class contains common fuctions that are used throughout the
// application
//

export default class Functions {
  idGenerator () { return 'LETSHANG|' + Math.floor(Math.random() * 1000000).toString() }
  getFullName (person) { return person.firstName + ' ' + person.lastName }
  getInitials (person) { return person.firstName[0].toUpperCase() + person.lastName[0].toUpperCase() }
}
