// pages/index/index.js

var startPot = 0;

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
    curentDate:'',

    resultValue:[],

    isRefresh:true,

    scrollPosition:0,
    isTop:null,
    refreshText:'松开同步数据'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var self = this;

    var date= new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    self.setData({
      curentDate: year.toString() + '-' + month.toString() + '-' + day.toString(),
    });

    
    wx.request({
      url: '',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        self.setData({
          resultValue: res.data,
        });
        //console.log(self.data.resultValue);
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
  

  //下拉刷新 触发开始触摸事件 判断当前滚动视图的滚动条的位置 选滚动条位置在0的位置并且下拉的时候
  TouchStart:function(e){
    if (this.data.scrollPosition <=10)
    {
      startPot = e.touches[0].pageY;
      this.setData({
        refreshText:'松开同步数据',
        isTop:true,
      });
    }
    else
    {
      this.setData({
        isTop:false,
      });
    }
  },

  //触摸移动事件 判断滚动条是不是从0位置开始的，如果是 并且滑动的距离大于50px的话，触发下拉滚动，
  TouchMove:function(e){
    //console.log(startPot);
    var touchMove = e.touches[0].pageY;
    //console.log(touchMove);
    if (this.data.isTop==true)
    {
      if (touchMove - startPot >= 50) {
        this.setData({
          isRefresh: false,
        });
      }
    }
   
    //console.log(touchMove - startPot);
  },

  //触摸结束的时候，也就是松开。 请求数据（当前我是获取数据库里所有数据...测试用）并且把一些参数设置为默认值
  TouchEnd:function(e)
  {
    
    var self=this;

    wx.request({
      url: '',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        self.setData({
          resultValue: res.data,
          refreshText:'同步成功',
          isRefresh: true,
        });
        //console.log(self.data.resultValue);
      }
    })
  },

  //因为小程序不能直接去获取一个元素的值，所以scrollView绑定了滚动事件，用来在后台获取滚动条的当前位置。
  BindScroll:function(event){
    //console.log(event);
    this.setData({
      scrollPosition: event.detail.scrollTop
    });
  }

})
