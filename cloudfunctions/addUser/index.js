// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-4g3tlmrt6eba6134',
  traceUser: true
 })
const db = cloud.database()
const _ = db.command



// 云函数入口函数
exports.main = async (event, context) => {
  
  return await db.collection('users').add({
    data: {
      nickname:event.nickname,
      userAvatarUrl:event.userAvatarUrl,
      userConstellation:event.userConstellation,
      birthday:event.birthday,
      openID:event.openID,
    }
  })
}