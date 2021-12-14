// components/select-popup/select-popup.js

var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: String, //输入框标签
    place: String, //输入框提示
    columns:Array, //选择器 选项
    valueKeyName:{ //选择器 选项数组中 对象的value的默认key
      type:String,
      value:'text'
    }
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    popShow: false,
    icon:'arrow-down'  //下拉箭头
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    //点击输入框触发
    tap() {
      this.setData({
        popShow: true,
        icon:'arrow-up'
      })
    },
    //点击取消
    onCancel() {
      this.setData({
        popShow: false,
        icon:'arrow-down'
      })
    },
    //点击确认
    onConfirm(e) {
      let pic, value
      pic = this.selectComponent('#picker')
      //获取当前选中项的值  改值为对象
      value = pic.getValues()

      this.setData({
        value: value[0][this.data.valueKeyName],  //设置输入框为选择器选中的值

      })
      app.globalData.userConstellation = value[0];
      console.log(app.globalData.userConstellation),
      this.triggerEvent('confirm', {  //传递到组件外事件 ， 返回当前选中项 对象
        value: value[0]
      })
      this.onCancel()
    }
  }
})