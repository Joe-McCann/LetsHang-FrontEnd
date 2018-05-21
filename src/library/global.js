// Methods
// This class contains common fuctions that are used throughout the
// application
//
export default class Functions {
  idGenerator () {
    return 'LETS-HANG|' + Math.floor(Math.random() * 1000000).toString()
  }
}
