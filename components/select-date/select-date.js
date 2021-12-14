// components/select-date/select-date.js
var app = getApp();
var min = new Date(1999,1,1);


var d = new Date();
d.setFullYear(1999,1,1);
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: String, //输入框标签
    place: String, //输入框提示

    valueKeyName: { //选择器 选项数组中 对象的value的默认key
      type: String,
      value: 'text'
    }
  },

  /**
   * 组件的初始数据
   */
  

  data: {

    currentDate: new Date().getTime(),
    minDate: new Date(1999,1,1).getTime(),
    date: "",
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },

    popShow: false,
    icon: 'arrow-down' //下拉箭头
  },
 
  

  /**
   * 组件的方法列表
   */
  methods: {

    onInput(event) {
      this.setData({
        currentDate: event.detail,
        minDate:min,
      });
    },

    //点击输入框触发
    tap() {
      this.setData({
        popShow: true,
        icon: 'arrow-up'
      })
    },
    //点击取消
    onCancel() {
      this.setData({
        popShow: false,
        icon: 'arrow-down'

      })
    },
    //点击确认
    onConfirm(e) {
      let pic,birthday
      pic = this.selectComponent('#date_picker')
      birthday = this.date
      this.setData({date:this.formatDate(new Date(e.detail))})
      app.globalData.birthday = this.formatDate(new Date(e.detail))
      console.log(app.globalData.birthday)
      this.triggerEvent('confirm', { //传递到组件外事件 ， 返回当前选中项 对象
        value: birthday,
        
      })
      this.onCancel()

    },
    formatDate(date) {
      let taskStartTime
      if (date.getMonth() < 9) {
        taskStartTime = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-"
      } else {
        taskStartTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
      }
      if (date.getDate() < 10) {
        taskStartTime += "0" + date.getDate()
      } else {
        taskStartTime += date.getDate()
      }
      
      // this.setData({
      //   taskStartTime: taskStartTime,
      // })
      return taskStartTime;
    }

  }


})