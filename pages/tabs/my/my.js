// pages/tabs/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head:'../../resources/lemon.png',
    exer_type:'小车题库',
    record:[
      {
        number:0,
        title:'已做题',
        describe:'共1334题'
      },
      {
        number: 0,
        title: '考试平均分',
        describe: '完成考试0次'
      },
      {
        number: 0,
        title: '已做题',
        describe: '完成考试0次'
      }
    ],
    buttons:[
      {
        icon: '../../resources/lemon.png',
        text:'我的收藏',
      },
      {
        icon: '../../resources/lemon.png',
        text: '设置',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})