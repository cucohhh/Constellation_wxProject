// pages/register/register.js
// import Toast from '../../miniprogram_npm/vant-weapp/dist/toast/toast';
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {

    show_input:false,
    avatarurl: "",
    nicknname: "",
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    authorization: false,

    canIUseOpenData: true, //wx.base64ToArrayBuffer('base64')//wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') ,如需尝试获取用户信息可改为false
    list: [{
        code: '001',
        name: '白羊'
      },
      {
        code: '002',
        name: '金牛'
      },
      {
        code: '003',
        name: '双子'
      },
      {
        code: '004',
        name: '巨蟹'
      },
      {
        code: '005',
        name: '狮子'
      },
      {
        code: '006',
        name: '处女'
      },
      {
        code: '007',
        name: '天平'
      },
      {
        code: '008',
        name: '天蝎'
      },
      {
        code: '009',
        name: '射手'
      },
      {
        code: '010',
        name: '魔蝎'
      },
      {
        code: '011',
        name: '水瓶'
      },
      {
        code: '012',
        name: '双鱼'
      },
    ]

  },
  addUserInfo() {
    wx.cloud.callFunction({
      name: 'addUser',
      data: {
        nickname: app.globalData.nickname,
        userAvatarUrl: app.globalData.userAvatarUrl,
        userConstellation: app.globalData.userConstellation,
        birthday: app.globalData.birthday,
        openID: app.globalData.openID

      },
      complete: res => {
        console.log('callFunction test result: ', res)
      }
    })
  },

  getOpenID() {
    wx.cloud.callFunction({
      name: 'getOpenID',
      complete: res => {
        // 获取到用户的 openid
        console.log(res);
        console.log('云函数获取到的openid: ', res.result.openId); //注意这里的openId的'id'中的'i'是否大小写要根据你的res.result下数据的详情，有点要大写，有的不用。
        //wx.setStorageSync('openid', res.result.openId);

        //openID全局数据赋值
        app.globalData.openID = res.result.openId;
        console.log("执行获取openid函数")
        //console.log("app.openID",app.globalData.openID),
        //打印所有的全局用户数据 
        //this.OutputGlobalData()
        //用户数据存入云服务器 
        this.addUserInfo()
        return res.result.openId;
      }

    })

  },

  //是否是新用户检查
  userCheck(){
    
    
    wx.cloud.callFunction({
      name: 'searchUser',
      data: {
        openID:app.globalData.openID
      },
      complete: res => {
        console.log('callFunction searchUser result: ', res)
        if(res !=null){
          console.log("重定向到AIChat")
          this.RedirectToAIChat()  
        }
      }

    })
  },

  OutputGlobalData() {
    console.log(app.globalData.nickname),
      console.log(app.globalData.userAvatarUrl),
      console.log(app.globalData.userConstellation),
      console.log(app.globalData.birthday),
      console.log("myopenID:", app.globalData.openID)
  },
  getIndex(e) {
    //打印选中项
    //console.log(e.detail.value);
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that =this;
    setTimeout(function () {
      //要延时执行的代码
       that.show_input=true
       that.setData({
          show_input: true
       })

     }, 2000) //延迟时间 这里是1秒
    
    // this.getOpenID();
    // this.userCheck();
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    app.show(this, 'logo', 1)
    app.slideupshow(this,'input',0,1)

  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        //console.log(res),
        //全局数据赋值

          app.globalData.userInfo = res.userInfo,
          app.globalData.nickname = res.userInfo.nickName,
          app.globalData.userAvatarUrl = res.userInfo.avatarUrl,

          this.setData({  
            userInfo: res.userInfo,
            hasUserInfo: true,
            authorization:true,

          })
        this.getOpenID()
        this.OutputGlobalData()
        // this.login()
        console.log("存入用户数据、跳转至AIChat") 
        this.RedirectToAIChat()
        return true;
      }
    })
  },
  setGlobalData() {
    var name = this.userInfo.nickName;
    app.globalData.userInfo = this.userInfo;


  },
  loginJudge(e) {
    var constellation = app.globalData.userConstellation;
    var birth = app.globalData.birthday;
    if (constellation == "") {
      //提示信息
      console.log("请填写您的星座")
      wx.showToast({
        title: '请填写您的星座',
        icon: 'fail',
        duration: 2000,
        mask:true
      })
      
    } else if (birth == "") {
      //提示信息
      console.log("请填写您的生日")
      wx.showModal({
        title: '提示',
        content: '请填写您的生日',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    } else {
      //请求授权通过 
      this.getUserProfile(e);
      // console.log(this.authorization)
      if (this.authorization==true ){
        // 数据库存入用户信息
        // 跳转至聊天界面
        
      }
    }
  },
  RedirectToAIChat() {
    // app.globalData.nickname=this.userInfo;
    // console.log(this.nickName)
   wx.redirectTo({
     url: '../../pages/AIChat/AIChat',
   })

   


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
    // var that = this
    // var res = wx.getSystemInfoSync()
    // console.log(res)
    // that.globalData.statusBarHeight = res.statusBarHeight*2
    

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