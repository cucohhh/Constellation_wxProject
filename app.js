// app.js

App({




  //动画效果设定
  // 渐入渐出
  show : function(that,param,opacity){
    var animation = wx.createAnimation({
     //持续时间800ms
     duration: 3000,
     timingFunction: 'ease',
    });
    //var animation = this.animation
    animation.opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
   },

   //滑动渐入渐出
  slideupshow:function(that,param,px,opacity){
    var animation = wx.createAnimation({
      duration: 10000,
      timingFunction: 'ease',
    });
    animation.translateY(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },





  redirectToAIChat() {
    // app.globalData.nickname=this.userInfo;
    // console.log(this.nickName)
   wx.redirectTo({
     url: '../../pages/AIChat/AIChat',
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
        this.openID = res.result.openId;
        this.userAvatarUrl = res.result.userAvatarUrl;
        
        console.log("执行获取openid函数")
        //console.log("app.openID",app.globalData.openID),
        //打印所有的全局用户数据 
        //this.OutputGlobalData()
        //用户数据存入云服务器 
        // this.addUserInfo()
        return res.result.openId;
      }

    })

  },

  //是否是新用户检查
  userCheck() {

    console.log("openID"+this.openID)
    wx.cloud.callFunction({
      name: 'searchUser',
      data: {
        openID: this.openID
      },
      complete: res => {
        console.log('callFunction searchUser result: ', res)
        if (res != null) {
          console.log("重定向到AIChat")
          this.redirectToAIChat()
        }
      }

    })
  },
  onLaunch() {
    wx.cloud.init({
      env: "cloud1-4g3tlmrt6eba6134",
      traceUser: true,

    });
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // this.getOpenID();
        // this.userCheck();
        console.log("app.js login 函数")
      }
    })
  },
  globalData: {
    userInfo: "",
    nickname: "testNickname",
    userAvatarUrl: "",
    userConstellation: "",
    birthday: "testbirthday",
    openID: "",
    id:""
    
  }
})