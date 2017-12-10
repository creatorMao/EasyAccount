// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeValue:'',
    resultValue:[],
    isClick:false,
    selectedWay:'',
    costIconList:[{ url: '/images/cost/drink.png',name:'饮料'},
                  { url: '/images/cost/rice.png', name:'三餐' },
                  { url: '/images/cost/car.png', name: '出行' },
                  { url: '/images/cost/study.png', name: '学习' },
                  { url: '/images/cost/phone.png', name: '通讯' },
                  { url: '/images/cost/smoke.png', name: '烟酒' },
                  { url: '/images/cost/hospital.png', name: '医疗' },
                  { url: '/images/cost/huabei.png', name: '还款' },
                  { url: '/images/cost/travel.png', name: '旅行' },
                  { url: '/images/cost/skincare.png', name: '护肤' },
                  { url: '/images/cost/rent.png', name: '房租' },
  
                  
                  ],
    incomeIconList: [{ url: '/images/income/livingexpenses.png', name: '生活费' },
                     { url: '/images/income/redenvelopes.png', name: '红包' },
                     { url: '/images/income/wages.png', name: '工资' },
                     { url: '/images/income/parttimejob.png', name: '兼职' },
                     { url: '/images/income/other.png', name: '其它' },
                    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date=new Date();
    var day = date.getDate();
    var month=date.getMonth()+1;
    var year=date.getFullYear();
    this.setData({
      timeValue: year.toString()+'-'+month.toString()+'-'+day.toString(),
    });
    console.log(this.data.timeValue);
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


  /*选择时间 */
  DatePickerValueChanged:function(e){
    this.setData({
      timeValue: e.detail.value
    })  
  },


  /*记一笔账单 */
  AddAnAccount:function()
  {
    var self=this;
    wx.request({
      url: 'https://www.creatordream.cn/api/products/all',
      method:'GET',
      dataType:'json',
      responseType:'text',
      success:function(res){
        self.setData({
          resultValue:res.data,
        });
        console.log(self.data.resultValue);
      }
    })
  },

  //点击转换
  ClickSwitch:function(){
    this.setData({
      isClick: !this.data.isClick,
    });
  },

  //选择一种方式
  ChooseAWay:function(event){
    //console.log(event);
    //console.log(event.currentTarget.dataset.index);
    var  index= event.currentTarget.dataset.index;
    if (this.data.isClick==false)
    {
      var wayText = this.data.costIconList[index].name;
    }
    else
    {
      var wayText = this.data.incomeIconList[index].name;
    }
    this.setData({
      selectedWay:wayText,
    });
  }

})