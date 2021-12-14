// pages/profile/profile.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openID: "",
    userAvatarUrl: "",
    nickname: "",
    birthday:"",
    constellation:"",
    constellationDes:"积极乐观、为人友善、善于学习新鲜事物",
    id:"859059a5618f99e00583c84f14f35dd7"
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
    this.setData({
      userAvatarUrl : app.globalData.userInfo.avatarUrl,
      openID :app.globalData.openID,
      nickname :app.globalData.nickname,
      birthday:app.globalData.birthday,
      constellation:app.globalData.userConstellation['name'],
    }),
    // console.log("constellation"+ this.constellation)
    this.getConstellationInfo()

  },

  getConstellationInfo(){
    

    console.log("searchConstellation方法调用")
    wx.cloud.init({
      env: 'cloud1-4g3tlmrt6eba6134',
      traceUser: true
     })
    wx.cloud.callFunction({
      name: 'searchConstellation',
      data: {  
       // name:app.globalData.userConstellation,
       name:this.constellation
      }, 
      
      complete: res => {
        //console.log('callFunction searchUser result: ', res)  
        if(res !=null){ 
          this.setData({ 
            //constellationDes:res, 
          })
        }
      }

    })
  },


  EditSignature(){
    //编辑个性签名
  },

  getFortune(){
    //获取今日运势
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("on show" + app.globalData.userConstellation)
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})