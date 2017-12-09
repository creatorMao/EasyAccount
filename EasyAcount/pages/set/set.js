// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    displayItemWay:'只显示当天',
    nickName:'',
    userPic:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var self=this;
      wx.getUserInfo({
        success:function(res){
          self.setData({
            nickName: res.userInfo.nickName,
            userPic: res.userInfo.avatarUrl
          })
        }
      });
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

  //跳转到跟新页面
  NavigateToUpdateHistoryPage:function(){
    wx.navigateTo({
      url: '/pages/updateHistory/updateHistory',
    })
  },

  //改变每月预算
  ChangeBudgetValue:function(e){
    getApp().globalData.monthlyBudget=e.detail.value;
    /*wx.showToast({
      title: '设置成功',
    })*/
  },

  //显示方式
  ChangeDisplayItemWay:function(){
   var self = this; 
   wx.showActionSheet({
     itemList: ['只显示当天', '全部展开', '全部收起'],
     success:function(res){
        if (res.tapIndex==0)
        {
          self.setData({
            displayItemWay: '只显示当天'
          }); 
        }
        else if (res.tapIndex == 1)
        {
            self.setData({
              displayItemWay: '全部展开',
            });
        }
        else if (res.tapIndex == 2)
        {
             self.setData({
               displayItemWay: '全部收起',
            });
        }
     }
   })
  }
  
})