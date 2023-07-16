// превращаем дату в удобочитаемый вид 
export const convertIsoDate = (dateISO) => {
  const date = new Date(`${dateISO}`)
  const day = date.getDate()
  .toString()
  .padStart(2, 0)
  const month = (date.getMonth() + 1)
  .toString()
  .padStart(2, 0)
  const year = date.getFullYear()
  const hour = date.getUTCHours()
  .toString()
  .padStart(2, 0)
  const minute = date.getUTCMinutes()
  .toString()
  .padStart(2, 0)

  return `${day}.${month}.${year} ${hour}:${minute}`
}

// превращаем дату в число, которое можно будет сравнить с числом другой даты
export const convertDateForSort = (dateISO) => {
  const date = new Date(`${dateISO}`)
  const day = date.getDate()
  const month = (date.getMonth() + 1)
  const year = date.getFullYear()
  const hour = date.getUTCHours()
  const minute = date.getUTCMinutes()

  return Number(`${year}${month}${day}${hour}${minute}`)
}