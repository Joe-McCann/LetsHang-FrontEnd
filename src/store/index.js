import Vuex from 'vuex'
import Vue from 'vue'
import GetDefaultEvent from '@/library/defaultEvent'
import Event from '@/library/event'
import EventList from '@/library/eventList'
import People from '@/library/people'
import FriendList from '@/library/friendList'

// Add the following import if logging is necessary
import Logger from '../library/logger'
const logger = new Logger('error')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: 'Let\'s Hang',
    currentUser: new People(),
    thePerson: new People(),
    theEvent: new Event(),
    myEvents: new EventList(),
    myFriends: new FriendList(),
    selectedItem: 'None',
    mapCenter: { lat: 42.242933, lng: -83.624612 },
    mapMarkers: []
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
    numberOfFriends: state => state.myFriends.friends.length,
    selectedItem: state => state.selectedItem,
    mapCenter: state => state.mapCenter,
    mapMarkers: state => state.mapMarkers
  },
  mutations: {
    // functions that update the logged in user's profile
    setCurrentUser (state, profile) { state.currentUser = profile },
    setThePerson (state, profile) {
      logger.debug('Store/index.js', 'setThePerson', `The id is ${profile.id}`)
      state.thePerson = profile
    },
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
    loadEvent (state, event) { state.myEvents.addEvent(event) },
    removeEvent (state, id) { state.myEvents.removeEvent(id) },

    // functions that update miscellaneous variable
    setSelectedItem (state, item) { state.selectedItem = item },

    // functions that set the map data
    setMapCenter (state, mapCenter) { state.mapCenter = mapCenter },
    setMapMarkers (state, mapMarkers) { state.mapMarkers = mapMarkers }
  }
})
