// pages/AIChat/AIChat.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tittle: "AIChat",
    syas: [{
      'robot': '你好呀！我是星友，有什么星座问题都可以来问我！',
      
    }],
    // headLeft: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4139308026,2925331886&fm=26&gp=0.jpg',
    headLeft: "https://img1.baidu.com/it/u=3578259008,3805970919&fm=26&fmt=auto",
    headRight: '',
    imp_key: "",
    value:"",
    toView:"",

  },
  /* 获取百度机器人的token */
  getToken() {
    console.log("getToken")
    let that = this,

      ak = 'WuHEcA8RNDoAmqMG43r2PESo',
      sk = 'atMnQ3izbbAB1omnvg26iZoCweN93Rrn'
    //https://aip.baidubce.com/rpc/2.0/unit/bot/chat
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + ak + '&client_secret=' + sk,
      method: 'POST',
      success(res) {
        try {
          let access_token = res.data.access_token;
          that.setData({
            imp_key: access_token
          })
          that.imp_key = access_token;
          console.log(that.imp_key)
        } catch (error) {
          console.log(error)
        }
      }
    })

  },
 converSationTest(e){

  let that = this
  var isay = e.detail.value.says;
  console.log(e.detail.value.says);
  wx.request({
    url: 'http://192.168.31.156:9999/anyq?question='+isay, //仅为示例，并非真实的接口地址
    // data: {
    //   x: '',
    //   y: ''
    // },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res.data)
    }
  })

 },



 // 百度AI聊天机器人
  converSation(e) {
    console.log(e)
    let that = this
    console.log(e.detail.value.says)
    let obj = {},
      isay = e.detail.value.says,
      syas = this.data.syas,
      length = syas.length


    //发送
      wx.request({
        
        url: 'https://aip.baidubce.com/rpc/2.0/unit/service/v3/chat?access_token=' + this.data.imp_key,
        data:{
          "log_id":"UNITTEST_10000",
          "version":"3.0",
          "service_id":"S61605",
          
          "session_id":"1",
          "request":{
                  "terminal_id":"1",
                  "query": isay,
                  "user_id": "88888"},
                  "dialog_state":{
                  "contexts":{
                    "SYS_PRESUMED_SKILLS":[
                      
                      ]
                          }
                      }
                    },
        method:'POST',
        success(res) {
          console.log(res)
          try {
            // let tuling = res.data.result.response_list[0].action_list[0].say;
            let tuling = res.data.result.context.SYS_PRESUMED_HIST[1];
            obj.robot = tuling;
          } catch (error) {
            let tuling = '输入不能为空呀！';
            console.log("catch");
            obj.robot = tuling;
          }
          obj.isay = isay;
          syas[length] = obj;
          that.setData({
            syas: syas,
            value:'',
            toView:'msg-'+"length"
          })
          
        }
      }) 
  },







  /* 百度AI机器人  聊天Conversation */
  converSation2(e) {
    
    console.log(e)
    let that = this
    console.log(e.detail.value.says)
    let obj = {},
      // isay = e.detail.value.says,
      isay = e.detail.value.says,
      syas = this.data.syas,
      length = syas.length
    //发送
    wx.request({ 
      url: 'http://192.168.31.156:9999/anyq?question=魔羯座的今年爱情怎么样',
      data: {
        "log_id": "UNITTEST_1",
        "version": "3.0",
        "service_id": "S61605",
        "session_id": "test_2",
        "context": {
          "SYS_REMEMBERED_SKILLS": ['1126584'],
          "SYS_CHAT_HIST": [
            "问句1",
            "回复1",
            "问句2",
            "回复2",
            "问句3"
          ]
        },
        "request": {
          "query": isay,
          "terminal_id": "terminal_id_2",
          "user_id": "user_id_2",

        }

      },
      method: 'POST',
      success(res) {
        console.log(res)
        try {
          let tuling = res.data.result.response_list[0].action_list[0].say;
          obj.robot = tuling;
        } catch (error) {
          let tuling = '输入不能为空呀！';
          obj.robot = tuling;
        }
        obj.isay = isay;
        syas[length] = obj;
        that.setData({
          syas: syas,
          value: ''
        })

      }
    })
  },
  // fudongyu 聊天机器人
  converSation3(e) {
    console.log(e)
    let that = this
    console.log(e.detail.value.says)
    let obj = {},
      // isay = e.detail.value.says,
      isay = e.detail.value.says,
      syas = this.data.syas,
      length = syas.length
    //发送
    wx.request({ 
      url: 'http://192.168.31.156:9999/anyq?question=水瓶座'+isay, //仅为示例，并非真实的接口地址
      // data: {
      //   x: '',
      //   y: ''
      // },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success(res) {
        console.log(res)
        try {
          let tuling = res[0];
        } catch (error) {
          let tuling = '输入不能为空呀！';
          obj.robot = tuling;
        }
        obj.isay = isay;
        syas[length] = obj;
        that.setData({
          syas: syas,
          value: ''
        })

      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this
    wx.getUserInfo({
      success: function (e) {
        let header = e.userInfo.avatarUrl
        that.setData({
          headRight: app.globalData.userInfo.avatarUrl
        })
      }
    })

    this.getToken()


  },

  redirectToProfile: function () {
    wx.navigateTo({
      url: '../../pages/profile/profile',
    })
  },

  // conversation: function (e) {
  //   let that = this
  //   var obj = {},
  //     isay = e.detail.value.says,
  //     syas = that.data.syas,
  //     length = syas.length,
  //     key = 'apikey' //这里填入你得到的图灵机器人的apikey

  //   console.log(length)
  //   wx.request({
  //     url: 'http://www.tuling123.com/openapi/api?key=' + key + '&info=' + isay,
  //     success: function (res) {
  //       let tuling = res.data.text;
  //       obj.robot = tuling;
  //       obj.isay = isay;
  //       syas[length] = obj;
  //       that.setData({
  //         syas: syas
  //       })
  //     }
  //   })


  // },
  delectChat: function () {
    let that = this
    that.setData({
      syas: []
    })
  }

})