// 正常日志消息
const info = (...params) => {
  console.log(...params)
}
// 错误消息
const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info, error
}
