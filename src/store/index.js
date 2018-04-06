import Vuex from 'vuex'
import Vue from 'vue'
import GetProfile from '@/library/profile'
import GetDefaultEvent from '@/library/defaultEvent'
import Event from '@/library/event'
import EventList from '@/library/eventList'
import People from '@/library/people'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: 'Let\'s Hang',
    myProfile: new People(),
    theEvent: new Event(),
    myEvents: new EventList()
  },
  getters: {
    numberOfEvents: state => { return state.myEvents.events.length }
  },
  mutations: {
    // functions that update the logged in user's profile
    getMyProfile (state, userId) { state.myProfile = GetProfile(userId) },
    removeProfile (state) { state.myProfile = new People() },

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
