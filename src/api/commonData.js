var getNowDate = function() {
  const date = new Date()
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let H = date.getHours()
  let mm = date.getMinutes()
  let s = date.getSeconds()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  H = H < 10 ? '0' + H : H
  mm = mm < 10 ? '0' + mm : mm
  s = s < 10 ? '0' + s : s
  const time = y + '-' + m + '-' + d + ' ' + H + ':' + mm + ':' + s
  return time
}
export default getNowDate
