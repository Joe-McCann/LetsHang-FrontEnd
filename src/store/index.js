import Vuex from 'vuex'
import Vue from 'vue'
import GetDefaultEvent from '@/library/defaultEvent'
import Event from '@/library/event'
import EventList from '@/library/eventList'
import People from '@/library/people'
import FriendList from '@/library/friendList'

// Add the following import if logging is necessary
// import Logger from '../library/logger'
// const logger = new Logger('debug')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: 'Let\'s Hang',
    currentUser: new People(),
    thePerson: new People(),
    theEvent: new Event(),
    myEvents: new EventList(),
    myFriends: new FriendList()
  },
  getters: {
    numberOfEvents: state => state.myEvents.events.length,
    isNewMember: state => {
      if (state.currentUser.newMember == null) return true
      return state.currentUser.newMember
    },
    myFirstName: state => state.currentUser.firstName,
    appTitle: state => state.appTitle,
    currentUser: state => state.currentUser,
    thePerson: state => state.thePerson,
    theEvent: state => state.theEvent,
    myEvents: state => state.myEvents,
    myFriends: state => state.myFriends,
    numberOfFriends: state => state.myFriends.friends.length
  },
  mutations: {
    // functions that update the logged in user's profile
    setCurrentUser (state, profile) { state.currentUser = profile },
    setThePerson (state, profile) { state.thePerson = profile },
    setNewMemberStatus (state, newMember) { state.currentUser.newMember = newMember },
    removeProfile (state) { state.currentUser = new People() },
    // functions that update the friends list
    setFriendList (state, friends) { state.myFriends = friends },
    addFriend (state, profile) { state.myFriends.addFriend(profile) },
    // functions that update the event
    newEvent (state) { state.theEvent = GetDefaultEvent() },
    setEvent (state, id) { state.theEvent = state.myEvents.getEvent(id) },
    setEventDescription (state, description) { state.theEvent.setEventDescription(description) },
    setEventDate (state, date) { state.theEvent.setDate(date) },
    setEventTime (state, time) { state.theEvent.setTime(time) },

    // functions that update the list of attendees
    addAttendee (state, person) { state.theEvent.invitePerson(person) },
    removeAttendee (state, person) { state.theEvent.removePerson(person) },

    // functions that update the list of events
    addEvent (state) { state.myEvents.insertOrReplace(state.theEvent) },
    removeEvent (state, id) { state.myEvents.removeEvent(id) }
  }
})
