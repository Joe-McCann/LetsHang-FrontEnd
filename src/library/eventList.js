// EventList
// This class is a sad outcome of the quirks of JavaScript.
// The purpose of this class is to sheild the app's store from
// the problems of assigning values by reference instead of
// the instance. This class assures that each item in the
// event list is a unique instance entered by the user.
import Event from '@/library/event'
import EventAPI from '@/library/event2api'

export default class EventList {
  constructor () {
    this.events = []
    this.eventAPI = new EventAPI()
  }

  addEvent (event) {
    var newEvent = new Event()
    newEvent.id = event.id
    newEvent.eventDescription = event.eventDescription
    newEvent.date = event.date
    newEvent.time = event.time
    newEvent.invited = event.invited
    this.events.push(newEvent)
    this.eventAPI.PostEvent(newEvent)
  }

  removeEvent (id) {
    // Apologies for this unreadable JavaScript construct
    // This is creating and executing an anonymous function
    // to find the index of the item to delete. Events should always
    // be a very small array (so this will be fast)
    var index = (id => {
      for (var i = 0; i < this.events.length; i++) {
        if (this.events[i].id === id) return i
      }
      return -1
    })(id)
    if (index < 0) return // Something is wrong if the event is not found
    // TODO: Call the API to remove me from the event
    this.events.splice(index, 1)
    this.events = [...this.events] // compress the deleted items out of the array
  }

  getEvent (id) {
    return this.events.find(function (event) { return event.id === id })
  }

  replaceEvent (existingEvent, event) {
    existingEvent.eventDescription = event.eventDescription
    existingEvent.date = event.date
    existingEvent.time = event.time
    existingEvent.invited = event.invited
  }

  insertOrReplace (event) {
    var existingEvent = this.getEvent(event.id)
    if (existingEvent === undefined) {
      this.addEvent(event)
    } else {
      this.replaceEvent(existingEvent, event)
    }
  }
}
