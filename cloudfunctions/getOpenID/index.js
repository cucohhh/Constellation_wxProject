// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-4g3tlmrt6eba6134',
  traceUser: true
 })

// 云函数入口函数
exports.main = async (event, context) => {
  return event.userInfo; //返回用户信息
}