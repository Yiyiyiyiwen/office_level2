// pages/tabs/test/signup.js
var utils = require('../../../utils/util.js')
var baseURL = utils.baseURL
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slider: [
      {
        img: "../../resources/banner.png",
      },
      {
        img: "../../resources/banner.png",
      },
      {
        img: "../../resources/banner.png",
      }
    ],
    buttons_left: [
      {
        img: "../../resources/icon/vip_class_static.png",
        text: "VIP课程",
      },
      {
        img: "../../resources/icon/icon_skill.png",
        text: "图标技巧",
      }
    ],
    buttons_left2: [
      {
        img: "../../resources/icon/homepage_exam_classroom.png",
        text: "学车课堂",
      },
      {
        img: "../../resources/icon/error_question_notebook.png",
        text: "错题本",
      }
    ],
    buttons_right: [
      {
        img: "../../resources/icon/random_exercise.png",
        text: "随机练习",
      },
      {
        img: "../../resources/icon/special_exercise.png",
        text: "专项练习",
        url: "special/special"
      }
    ],
    buttons_right2: [
      {
        img: "../../resources/icon/course_rank.png",
        text: "我的成绩",
      },
      {
        img: "../../resources/icon/collect_exclude.png",
        text: "收藏",
      }
    ],
    progress_txt: '顺序练习',
    progress_txt2: '模拟考试',
    ques_order_0: '',
    ques_outoforder_0: '',
    ques_order_1: '180',
    ques_outoforder_1: '200',
    token: '',
    finish:false
  },
  drawProgressbg: function (ctx) {
    // 使用 wx.createContext 获取绘图上下文 context
    //var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(10);// 设置圆环的宽度
    ctx.setStrokeStyle('#eee'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(60, 60, 50, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (step, context) {
    //var context = wx.createCanvasContext('canvasProgress');
    // 设置渐变
    var gradient = context.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0", "#2661DD");
    gradient.addColorStop("0.5", "#40ED94");
    gradient.addColorStop("1.0", "#5956CC");

    context.setLineWidth(10);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(60, 60, 50, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },
  drawline:function(){
    var that = this
    console.log("开始绘图")
    var ctx1 = wx.createCanvasContext('canvasProgressbg')
    this.drawProgressbg(ctx1)
    var ctx2 = wx.createCanvasContext('canvasProgressbg2')
    this.drawProgressbg(ctx2)
    var context1 = wx.createCanvasContext('canvasProgress');
    var progress1 = that.data.ques_order_0 / that.data.ques_outoforder_0 * 2
    console.log('顺序练习进度' + progress1 / 2)
    this.drawCircle(progress1, context1)
    var progress2 = that.data.ques_order_1 / that.data.ques_outoforder_1 * 2
    console.log('模拟考试进度' + progress2 / 2)
    var context2 = wx.createCanvasContext('canvasProgress2');
    this.drawCircle(progress2, context2)
  },
  /**
   * 获取题库数据
   */
  getexamcount:function(){
    var that = this
    //var mytoken = that.data.token
    var mytoken='741852963'
    console.log("token=" + mytoken)
    wx.request({
      url: baseURL +'/api/user/exam_type?token='+mytoken,
      data:{
        token:mytoken
      },
      method:"GET",
      success:function(res){
        console.log(res)
        that.setData({
          ques_order_0:res.data.data.done,
          ques_outoforder_0:res.data.data.total,
          exam_id:res.data.data.examId
        })
        wx.setStorage({
          key: 'examId',
          data: that.data.exam_id,
          success(res){
            console.log("examid本地存储成功 examid=" + that.data.exam_id)
          }
        })
        that.drawline()
      },
      fail:function(){
        console.log("获取题库信息失败")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(utils.baseURL)
    var baseURL = utils.baseURL
    var debug = utils.debug
    var that = this
    wx.getStorageInfo({
      success: function (res) {
        console.log(res.keys)
      },
    })
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log("localtoken=" + res.data)
        that.setData({
          token: res.data
        })
        wx.checkSession({
          success() {
            console.log("session_key没过期")
          },
          fail() {
            wx.login({
              success: function (res) {
                var code = res.code
                wx.request({
                  url: baseURL + '/api/user/login?code=' + code,
                  data: {
                    code: code,
                  },
                  success: function (res) {
                    if (res.statusCode && res.statusCode == '200') {
                      console.log("登陆成功哈哈哈哈哈哈哈哈哈哈哈")
                      that.setData({
                        token: res.data.data
                      })
                      console.log("token=" + that.data.token)
                    }
                  },
                  fail: function () {
                    console.log("登陆失败")
                  }
                })
              }
            })
          }
        })
      },
      fail: function () {
        console.log("本地无token数据")
        wx.login({
          success: function (res) {
            var code = res.code
            wx.request({
              url: baseURL + '/api/user/login?code=' + code,
              data: {
                code: code,
              },
              success: function (res) {
                if (res.statusCode && res.statusCode == '200') {
                  console.log("登陆成功哈哈哈哈哈哈哈哈哈哈哈")
                  that.setData({
                    token: res.data.data
                  })
                  console.log(that.data)
                  console.log("token=" + that.data.token)
                  wx.setStorage({
                    key: 'token',
                    data: that.data.token,
                    success: function (res) {
                      console.log("本地token存储成功，token=" + that.data.token)
                    },
                    fail: function (res) {
                      console.log("本地token存储失败")
                    }
                  })
                }
              },
              fail: function () {
                console.log("登陆失败")
              }
            })
          }
        })
      }
    })


    // wx.request({
    //   url: baseURL + '/api/user/temp',
    //   method: "GET",
    //   data: {
    //     token: 741852963
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   },
    //   fail: function () {
    //     console.log('request fail')
    //   }
    // })
    that.getexamcount()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    
    while(that.data.finish==true){
      console.log("开始绘图")
      var ctx1 = wx.createCanvasContext('canvasProgressbg')
      this.drawProgressbg(ctx1)
      var ctx2 = wx.createCanvasContext('canvasProgressbg2')
      this.drawProgressbg(ctx2)
      var context1 = wx.createCanvasContext('canvasProgress');
      var progress1 = that.data.ques_order_0 / that.data.ques_outoforder_0 * 2
      console.log('顺序练习进度' + progress1 / 2)
      this.drawCircle(progress1, context1)
      var progress2 = that.data.ques_order_1 / that.data.ques_outoforder_1 * 2
      console.log('模拟考试进度' + progress2 / 2)
      var context2 = wx.createCanvasContext('canvasProgress2');
      this.drawCircle(progress2, context2)
      that.setData({
        finish:false
      })
    }

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