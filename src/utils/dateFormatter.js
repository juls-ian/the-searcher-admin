const formatDateForLaravel = (date) => {
  if (!date) return null

  const d = new Date(date)

  const year = d.getFullYear
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  // Timezone offset
  const tzOffset = -d.getTimezoneOffset() / 60
  const tzString =
    (tzOffset >= 0 ? '+' : '') + String(Math.floor(Math.abs(tzOffset))).padStart(2, 0)

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${tzString}`
}
