// Methods
// This class contains common fuctions that are used throughout the
// application
//

export default class Functions {
  idGenerator () { return 'LETSHANG|' + Math.floor(Math.random() * 1000000).toString() }
  getFullName (person) { return person.firstName + ' ' + person.lastName }
  getInitials (person) { return person.firstName[0].toUpperCase() + person.lastName[0].toUpperCase() }
  environment () { return 'development' }
  fullName (item) { return this.getFullName(item) } // deprecate this function
  initials (item) { return this.getInitials(item) } // deprecate this function
  initial (item) { return item.firstName[0].toUpperCase() }
  randomColor () {
    let i = Math.floor(Math.random() * 6 + 1)
    let color = 'black'
    switch (i) {
      case 1: color = 'red'; break
      case 2: color = 'orange'; break
      case 3: color = 'yellow'; break
      case 4: color = 'green'; break
      case 5: color = 'blue'; break
      case 6: color = 'purple'; break
      default: color = 'gray'
    }
    return color
  }
}
