import Functions from '@/library/global'

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
    this.fullName = this.getFullName.bind(this)
  }

  setFirstName (firstName) { this.firstName = firstName }
  setLastName (lastName) { this.lastName = lastName }
  setNickName (nickName) { this.nickName = nickName }
  setAddress (address) { this.address = address }
  setEmail (email) { this.email = email }
  setPhone (phone) { this.phone = phone }
  getFullName () { return this.firstName + ' ' + this.lastName }
}
