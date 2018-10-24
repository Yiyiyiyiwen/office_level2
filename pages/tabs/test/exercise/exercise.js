// pages/tabs/test/exercise/exercise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['答题模式', '学习模式'],
    //count:[0,2,3],                                  //记录不同状态记录的数量
    currentTab: 0,
    //currentTab2: 5,
    //currentTab3: 5,
    searchinput: '',
    current_right_choose: '',
    my_swiper: [
      {
        index: 1,
        right_choose: 'B',
        if_right:1,
        if_note: 'no_note',
        note:'',
        exercise: [{
          type: '单选题',
          question: '你知道吧啦吧啦吧啦吗？',
          number:1
        }],
        answer_four: [{
          answer: '啦啦啦',
          choose: 'A',
        },
        {
          answer: '啦啦啦2',
          choose: 'B',
        },
        {
          answer: '啦啦啦3',
          choose: 'C'
        },
        {
          answer: '啦啦啦4',
          choose: 'D'
        }
        ],
      },
      {
        index: 2,
        right_choose: 'C',
        if_note: 'have_note',
        note: '123',
        exercise: [{
          type: '单选题',
          question: '你怎么回事你',
          number:2
        }],
        answer_four: [{
          answer: '嘿嘿嘿',
          choose: 'A'
        },
        {
          answer: '嘿嘿嘿2',
          choose: 'B'
        },
        {
          answer: '嘿嘿嘿3',
          choose: 'C'
        },
        {
          answer: '嘿嘿嘿4',
          choose: 'D'
        }
        ],
      },
      {
        index: 3,
        right_choose: 'A',
        if_note: 'no_note',
        exercise: [{
          type: '单选题',
          question: '啥玩意',
          number: 3
        }],
        answer_four: [{
          answer: '咔咔咔2',
          choose: 'A'
        },
        {
          answer: '咔咔咔2',
          choose: 'B'
        },
        {
          answer: '咔咔咔23',
          choose: 'C'
        },
        {
          answer: '咔咔咔24',
          choose: 'D'
        }
        ],
      }
    ],
    choosestyle: 'choose',
    a: 5,
    havedone_count: 2,
    right_rate: 30,
    hiddenmodalput: true,
    myinput: null,
    right_total: 12,
    wrong_total: 20,
    current: 1,
    exer_total: 30,
    //if_right: 1,
    is_bind_true: false,
    day_item: [
      {
      }
    ],
    collection_image: '../../../resources/jiakao_ic_zuoti_xingxing_hui1.png',
    swiper_index:0
  },
  //点击隐藏弹出层
  showdays: function (e) {
    this.setData({
      is_bind_true: false
    })
  },
  show_days: function (e) {
    this.setData({
      is_bind_true: true
    })
  },
  //响应点击导航栏
  navbarTap: function (e) {
    var that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.idx,
      TypeItem: that.data.navbar[that.data.currentTab]
    })
  },
  //选择正确答案
  chooseanswer: function (options) {
    var that = this
    var index = options.currentTarget.dataset.index
    //console.log(index)

    var answer_four = that.data.my_swiper[that.data.swiper_index].answer_four
    console.log(answer_four)
    
    var my_swiper = that.data.my_swiper
    //console.log(my_swiper[0].if_right)

    var choose_answer = answer_four[index].choose
    console.log('用户选择了' + choose_answer)

    var right_choose = my_swiper[that.data.swiper_index].right_choose
    console.log('当前页面正确回答' + right_choose)
    if (choose_answer === right_choose) {
      that.setData({
        ['my_swiper[' + that.data.swiper_index + '].currentTab2']: options.currentTarget.dataset.index,
        choose_answer: '√',
        ['my_swiper['+that.data.swiper_index+'].if_right']: 0,
        right_total:that.data.right_total+1
      })
      //console.log(that.data.if_right)
      console.log(right_choose)
    } else {
      //console.log('执行')
      that.setData({
        ['my_swiper[' + that.data.swiper_index + '].currentTab3']: options.currentTarget.dataset.index,
        wrong_total:that.data.wrong_total+1
      })
    }
  },
  showmodel: function (e) {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  myinput: function (e) {
    var that = this
    that.data.myinput = e.detail.value
    //console.log(that.data.myinput)
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    })
  },
  confirm: function (e) {
    this.setData({
      hiddenmodalput: true
    })
    var that = this
    var index = 1

    var myadd_note = that.data.my_swiper[that.data.swiper_index].add_note
    that.setData({
      ['my_swiper[' + that.data.swiper_index + '].if_note']: 'have_note',
      ['my_swiper[' + that.data.swiper_index + '].note']: that.data.myinput,
      searchinput:''
    })

  },

  //跳转题目
  changecurrentpage:function(e){
    //TODO
  },

  
  //修改收藏图片
  changeimg: function (e) {
    this.setData({
      collection_image: '../../../resources/jiakao_ic_zuoti_xingxing_huang1.png'
    })
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
    })
  },

  onSlideChangeEnd: function (e) {
    var that = this;
    that.setData({
      swiper_index: e.detail.current,
      current: e.detail.current+1
    })
    console.log('当前页面'+that.data.swiper_index)


    var my_swiper = that.data.my_swiper
    var right_choose = my_swiper[that.data.swiper_index].right_choose
    var exchange_choose = that.get_right_answer(right_choose)
    that.setData({
      current_right_choose: exchange_choose
    })
    //console.log(that.data.current_right_choose)
    
  },

  get_right_answer: function (right_choose){
    if(right_choose=='A'){
      return 0
    }
    else if(right_choose=='B'){
      return 1
    }
    else if(right_choose=='C'){
      return 2
    }
    else if(right_choose=='D'){
      return 3
    }
    else{
      return 404
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const length = that.data.exer_total
    console.log(length)
    var index = 1
    for (index = length; index > 0; index--) {
      that.data.day_item = [
        {
          day: index
        }
      ].concat(that.data.day_item)
      that.setData({
        day_item: that.data.day_item
      })
    }
    //console.log(that.data.day_item)

    var my_swiper = that.data.my_swiper
    var right_choose = my_swiper[that.data.swiper_index].right_choose
    var exchange_choose = that.get_right_answer(right_choose)
    that.setData({
      current_right_choose: exchange_choose
    })
    console.log(that.data.current_right_choose)

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