// pages/tabs/signup/signup.js
var utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(utils.baseURL)
    var baseURL = utils.baseURL
    wx.login({
      success:function(res){
        var code = res.code
        wx.getUserInfo({
          success:function(res){
            console.log(res.userInfo)
            wx.request({
              url: baseURL + '/api/user/login?code=' + code,
              data:{
                code:code,

              },
              success:function(res){
                if(res.statusCode&&res.statusCode=='200'){
                  console.log("登陆成功哈哈哈哈哈哈哈哈哈哈哈")
                  console.log(res)
                }
              },
              fail:function(){
                console.log("登陆失败")
              }
            })
          }
        })
      }
    })

    wx.request({
      url: baseURL +'/api/user/temp',
      method:"GET",
      data:{
        token: 741852963
      },
      success:function(res){
        console.log(res.data)
      },
      fail:function(){
        console.log('request fail')
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