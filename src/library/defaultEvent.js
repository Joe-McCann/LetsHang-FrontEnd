import Event from '@/library/event'

export default function GetDefaultEvent () {
  var it = new Event()

  var today = new Date()
  var day = today.getDate()
  var month = today.getMonth()
  var yyyy = today.getFullYear()

  var hour = today.getHours()
  var minute = today.getMinutes()

  // ToDo: find the way to accomplish this formatting
  // natively in JS without using this check
  if (day < 10) { day = '0' + day }
  if (month < 10) { month = '0' + month }
  if (hour < 10) { hour = '0' + hour }
  if (minute < 10) { minute = '0' + minute }

  it.eventDescription = 'Just hanging out.'
  it.date = yyyy + '-' + month + '-' + day
  it.time = hour + ':' + minute

  return it
}
