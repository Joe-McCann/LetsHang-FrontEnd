import Event from '@/library/event'

export default function GetDefaultEvent () {
  let it = new Event()

  let today = new Date()
  let day = today.getDate()
  let month = today.getMonth()
  let yyyy = today.getFullYear()

  let hour = today.getHours()
  let minute = today.getMinutes()

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
