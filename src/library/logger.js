// This is a simple generalized logging class. Logging is done to the console.
//
// Log levels are:
//  1. debug
//  2. info
//  3. warning
//  4. error
//  5. critical

export default class Logger {
  constructor (level) {
    this.level = level
    this.logLevel = 0

    switch (this.level.toLowerCase()) {
      case 'debug': { this.logLevel = 1; break }
      case 'info': { this.logLevel = 2; break }
      case 'warning': { this.logLevel = 3; break }
      case 'error': { this.logLevel = 4; break }
      case 'critical': { this.logLevel = 5; break }
    }
  }

  timeStamp () {
    const now = new Date()
    const year = '' + now.getFullYear()
    let month = '' + (now.getMonth() + 1); if (month.length === 1) { month = '0' + month }
    let day = '' + now.getDate(); if (day.length === 1) { day = '0' + day }
    let hour = '' + now.getHours(); if (hour.length === 1) { hour = '0' + hour }
    let minute = '' + now.getMinutes(); if (minute.length === 1) { minute = '0' + minute }
    let second = '' + now.getSeconds(); if (second.length === 1) { second = '0' + second }
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  }

  log (msgLevel, source, method, message) {
    console.log(this.timeStamp() +
      ', ' +
      msgLevel +
      ', ' +
      source +
      ', ' +
      method +
      ', ' +
      message)
  }

  debug (source, method, message) { if (this.logLevel >= 1) this.log('DEBUG', source, method, message) }
  info (source, method, message) { if (this.logLevel >= 1) this.log('INFO', source, method, message) }
  warning (source, method, message) { if (this.logLevel >= 1) this.log('WARNING', source, method, message) }
  error (source, method, message) { if (this.logLevel >= 1) this.log('ERROR', source, method, message) }
  critical (source, method, message) { if (this.logLevel >= 1) this.log('CRITICAL', source, method, message) }
}
