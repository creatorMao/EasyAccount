// pages/add/add.js

var startPot = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeValue:'',
    isClick:false,
    selectedWay:'',
    notes:'none',
    money:'',
    num:null,
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
                    ],   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var self=this;

    var date=new Date();
    var day = date.getDate();
    var month=date.getMonth()+1;
    var year=date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    self.setData({
      timeValue: year.toString() + '-' + month.toString() + '-' + day.toString() + ' ' + hour + ':' + minute
    });
    //console.log(this.data.timeValue);

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
    var date = new Date();
    var hour=date.getHours();
    var minute=date.getMinutes();
    var second=date.getSeconds();
    this.setData({
      timeValue: e.detail.value+' '+hour+':'+minute
    });
    console.log(this.data.timeValue);
  },


  /*记一笔账单 */
  AddAnAccount:function()
  {
    var self=this;

    var userid=1;
    if(this.data.isClick==false)
    {
      var way='支出';
    }
    else
    {
      var way = '收入';
    }

    //判断用户有没有
    if (this.data.selectedWay=='')
    {
        wx.showToast({
          title: '请选择一个类别',
          image:'/images/tips.png'
        })
    }
    else if (this.data.money=='')
    {
        wx.showToast({
          title: '请输入金额',
          image:'/images/tips.png'
        })
    }
    else
    {
      var url = 'https://www.creatordream.cn/api/Records/add/' + userid + '?way=' + way + '&specificWay=' + this.data.selectedWay + '&money=' + this.data.money + '&datetime=' + this.data.timeValue + '&notes=' + this.data.notes;
      //console.log(url);
      wx.request({
        url: url,
        method: 'Post',
        success: function (res) {
          //console.log(res.statusCode);
          if (res.statusCode!='500')
          {
              wx.showToast({
                title: '添加成功',
              });
              self.setData({
                selectedWay: '',
                money: '',
                num:null
              });
          }
        }
      })
    }
  },

  //点击转换
  ClickSwitch:function(){
    this.setData({
      isClick: !this.data.isClick,
      //当选择 支出或者输入时，清空一下选择
      selectedWay:'',
      num:null,
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
      this.setData({
        num:index,
      })
    }
    else
    {
      var wayText = this.data.incomeIconList[index].name;
      this.setData({
        num: index,
      })
    }
    this.setData({
      selectedWay:wayText,
    });
  },


  //绑定备注输入
  NotesInput:function(e){
    this.setData({
      notes:e.detail.value,
    });
    //console.log(this.data.notes);
  },

  //绑定money input
  MoneyInput:function(e){
    this.setData({
      money:e.detail.value,
    });
  },

  

  TouchStart:function(e){
      startPot=e.touches[0].pageX;
  },

  TouchMove:function(e)
  {
      var touchMove=e.touches[0].pageX;
      if (touchMove - startPot >= 35 )
      {
        this.setData({
          isClick: false,
          //当选择 支出或者输入时，清空一下选择
          selectedWay: '',
          num: null,
        });
      }
      else if (touchMove - startPot <= -35 ) {
        this.setData({
          isClick: true,
          //当选择 支出或者输入时，清空一下选择
          selectedWay: '',
          num: null,
        });
      }
      
  },


  TouchEnd:function(e){

  }


  
})

