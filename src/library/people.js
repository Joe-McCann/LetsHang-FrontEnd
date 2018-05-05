import Functions from '@/library/global'
import Logger from '../library/logger'
const logger = new Logger('debug')

export default class People {
  constructor () {
    var functions = new Functions()
    this.id = functions.idGenerator()
    this.firstName = ''
    this.lastName = ''
    this.nickName = ''
    this.address = ''
    this.phone = ''
    this.email = ''
    this.newMember = false
    this.fullName = this.getFullName.bind(this)
    logger.debug('people.js', 'constructor', 'Allocated a new People object for id ' + this.id)
  }

  setFirstName (firstName) { this.firstName = firstName }
  setLastName (lastName) { this.lastName = lastName }
  setNickName (nickName) { this.nickName = nickName }
  setAddress (address) { this.address = address }
  setEmail (email) { this.email = email }
  setPhone (phone) { this.phone = phone }
  setNewMember (newMember) { this.newMember = newMember }
  getFullName () { return this.firstName + ' ' + this.lastName }
}
