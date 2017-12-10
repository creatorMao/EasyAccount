// pages/index/index.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEyeClose:false,
    eyeIconSrc:'/images/eye-show.png',
    
    //每月预算，总支出，总收入
    currentMonthAllCost:'0.00',
    currentMonthIncome:'0.00',

    //当前日期
    budget:'',
    currentMonth:'12',
    curentDate:'2017-12',

    resultValue:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.request({
      url: 'https://www.creatordream.cn/api/records/all',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        self.setData({
          resultValue: res.data,
        });
        console.log(self.data.resultValue);
      }
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

    this.setData({
      budget: getApp().globalData.monthlyBudget,
    })
    
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
  
  },


  //打开记账页面
  OpenAddPage:function()
  {
      wx.navigateTo({
        url: '/pages/add/add',
      })
  },

  //打开设置界面
  OpenSetPage:function()
  {
    wx.navigateTo({
      url: '/pages/set/set',
    })
    wx.ania
  },

  //改变眼睛图片
  SetEyeState:function()
  {
    this.setData({
      isEyeClose: !this.data.isEyeClose,
    }); 

    if (this.data.isEyeClose) 
    {
      //console.log(this.data.isEyeClose);
      this.setData({
        eyeIconSrc: '/images/eye-hide.png'
      }); 
    }
    else
    {
      //console.log(this.data.isEyeClose);
      this.setData({
        eyeIconSrc: '/images/eye-show.png'
      }); 
    }

  },

  //选择时间
  SelectDate:function(e){
    this.setData({
      curentDate:e.detail.value,
    });
  },


})