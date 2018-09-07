// pages/baoming5/baoming5.js
var timer;
var x, y, x1, y1, x2, y2, index, currindex, n, yy; //拖拽
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    move: {
      x: 0,
      y: 0
    },
    mainx: -1,
    height: 122,
    uname: '',
    uimg: '',
    quantity: 1,
    tianxuetj: 0,
    upimg: [],
    pushurl: [],
    jieitem: [{
      item_name: '',
      start: '09:00',
      end: '22:00',
      price: 0,
      amount: 0,
      checked: true
    }],
    dakatime: ['上午', '下午'],

    dakat: '00:00',
    ids: 0,
    setPlnr: '',
    xname: '',
    descont: '',
    jiage: '',
    shumu: '',
    shant: '',
    id: '',
    homepage: false,
    dianhua: true,
    qushe: true,
    dored: true,
    qitxiang: true,
    setime: true,
    xiantime: false,
    hometime: '',
    startime: {
      dadate: '',
      datime: '16:10'
    },
    endtime: {
      houdate: '2018-7-5',
      houtime: '00:00'
    },
    checked: true,
    group: [],
    groups: [

      {
        id: 0,
        title: '填写项',
        place: '输入填写项主题名称',
        iex: 0,
        ieb: 0,

      },
      {
        id: 1,
        title: '图片/视频',
        place: '输入图片/视频主题名称',
        iex: 0,
        ieb: 0,

      },
      {
        id: 2,
        title: '语音',
        place: '输入语音主题名称',
        iex: 0,
        ieb: 0,

      },

    ],
    qitaxiangmuneiy: [{
        xiangmu: '填写项',
        color: ''
      },
      {
        xiangmu: '图片/视频',
        color: ''
      },
      {
        xiangmu: '语音',
        color: ''
      },

    ],
    gongk: ['公开', '不公开'],
    bitian: ['必填', '非必填'],

    mofanzhut: '',
    mofanjieshao: '',
    ytianmap: '',
    Fill: '',
    kill: '',
    gill: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var Y = new Date().getFullYear()
    var M = new Date().getMonth()
    var D = new Date().getDate()
    var H = new Date().getHours()
    var F = new Date().getMinutes()

    D = D > 9 ? D : "0" + D
    var day3 = new Date();
    day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000 * 7);
    var s3 = day3.getFullYear() + "-" + ("0" + (day3.getMonth() + 1)).slice(-2) + "-" + day3.getDate();
    console.log(s3)

    let that = this
    that.data.startime.dadate = Y + "-" + ("0" + (M + 1)).slice(-2) + "-" + D
    that.data.startime.datime = H + ":" + F
    that.data.endtime.houdate = s3

    that.setData({
      startime: that.data.startime,
      hometime: ("0" + (M + 1)).slice(-2) + "/" + D,
      endtime: that.data.endtime,
      setPlnr: options.zhu,
      descont: options.nei,

    })

    wx.getStorage({
      key: 'key',
      success: function(res) {
        console.log(res)
        that.setData({
          shant: res.data,
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.zhuti = this.selectComponent("#zhuti")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      shant: app.globalData.tel,
      ytianmap: app.globalData.map,
      Fill: app.globalData.gongkai,
      kill: app.globalData.ongk,
      gill: app.globalData.ongks
    })
  },
  kefu() {


    wx.navigateTo({
      url: '../kefu/kefu',
    })
  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
    this.setData({
      uname: e.detail.userInfo.nickName,
      uimg: e.detail.userInfo.avatarUrl,

    })
  },


  stime: function(e) {
    var i = e.currentTarget.dataset.id
    this.data.jieitem[i].start = e.detail.value
    this.setData({
      jieitem: this.data.jieitem
    })
  },
  etime: function(e) {
    var i = e.currentTarget.dataset.id
    this.data.jieitem[i].end = e.detail.value
    console.log(this.data.checked)
    this.setData({
      jieitem: this.data.jieitem
    })
  },
  notime: function(e) {
    var i = e.currentTarget.dataset.id
    this.data.jieitem[i].checked = this.data.jieitem[i].checked == false ? true : false
  },


  //主题
  Plnr(e) {
    this.setData({
      setPlnr: e.detail.value
    })
  },
  //内容
  desc(e) {
    this.setData({
      descont: e.detail.value
    })
  },
  //项目名

  xiangname(e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    this.data.jieitem[index].item_name = e.detail.value
    this.setData({
      jieitem: this.data.jieitem
    })
  },
  //价格
  jiag(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    this.data.jieitem[index].price = e.detail.value
    this.setData({
      jieitem: this.data.jieitem
    })
    console.log(this.data.jieitem)
  },
  //数量
  shum(e) {
    let index = e.currentTarget.dataset.index
    this.data.jieitem[index].amount = e.detail.value
    this.setData({
      jieitem: this.data.jieitem
    })
  },
  fajielong(ev) {

    console.log(this.data.group)
    console.log(this.data.jieitem)
    var thgt = this;
    thgt.data.heti = {
      gong: thgt.data.Fill,
      bugong: thgt.data.kill,
      bugongs: thgt.data.gill
    }
    console.log(thgt.data.heti)


    var num = 10;
    if (thgt.zhuti.data.setPlnr == "" || thgt.data.setPlnr == undefined) {
      thgt.setData({
        dored: false
      })
      timer = setTimeout(function() {
        num--;
        thgt.setData({
          dored: true
        })
      }, 2000)

    } else {
      // 2 是预览 ；1 是发布
      let status = ev.detail.formId == undefined ? 2 : 1;

      wx.request({
        url: app.globalData.urlPrefix + 'signup/saveInfo',
        data: {
          user_id: app.globalData.idda.uid,
          dragonTheme: this.zhuti.data.setPlnr,
          item: this.data.jieitem,
          img_path: this.zhuti.data.upimg,
          descInfo: this.zhuti.data.descont,
          user_img: app.globalData.userInfo.avatarUrl,
          user_name: app.globalData.userInfo.nickName,
          servPhone: this.data.shant, //电话
          address: app.globalData.map,
          actor_info: thgt.data.heti,
          daka_type:thgt.data.group,
          start_time: this.data.startime,
          end_time: this.data.endtime,
          jl_type: 2
        },

        success: function(res) {
          console.log(res.data)
          app.globalData.socket.send({
            data: app.globalData.idda.user_name + '发布了一个报个到'
          })
          wx.navigateTo({
            url: '../huodong/huodong?id=' + res.data.theme_id + '&uid=' + app.globalData.idda.uid + '&theme_uid=' + app.globalData.idda.uid

          })
        }


      })
    }

  },
  //+新项目
  newitem: function() {
    let jieitem = this.data.jieitem
    jieitem.push({
      item_name: '',
      start: '09:00',
      end: '12:00',
      checked: false,
      price: 0,
      amount: 0,
    })
    this.setData({
      quantity: ++this.data.quantity,
      jieitem: jieitem,
    })
    console.log(this.data.jieitem)
  },
  delitem: function(e) {
    let id = e.currentTarget.dataset.id
    let jieitem = this.data.jieitem
    jieitem.splice(id, 1)
    this.setData({
      quantity: --this.data.quantity,
      jieitem: jieitem
    })
  },
  qitmu: function() {
    if (this.data.qitxiang == true) {
      this.setData({
        qitxiang: false
      })
    } else {
      this.setData({
        qitxiang: true
      })
    }
  },
  bindchangegk: function(e) {
    this.data.group[e.currentTarget.dataset.id].iex = Number(e.detail.value)
    console.log(e.currentTarget.dataset.id)
    console.log(this.data.groups)
    this.setData({
      group: this.data.group,
    })
  },
  bindchangebt: function(e) {
    this.data.group[e.currentTarget.dataset.id].ieb = Number(e.detail.value)

    this.setData({
      group: this.data.group,
    })
  },
  groupinp: function (e) {
    var i = e.currentTarget.dataset.id
    this.data.group[i].place = e.detail.value
  },
  newtx: function (e) {
    let id = e.currentTarget.dataset.id
    let that = this

    if (that.data.qitaxiangmuneiy[id]) {
      if (that.data.qitaxiangmuneiy[id].color == "") {
        that.data.group.push(that.data.groups[id])
        that.data.qitaxiangmuneiy[id].color = 'color:#999'
        that.setData({
          group: that.data.group,
          qitaxiangmuneiy: that.data.qitaxiangmuneiy
        })
      } else {
        that.setData({
          group: that.data.group,
          qitaxiangmuneiy: that.data.qitaxiangmuneiy
        })
      }
    }

    console.log(that.data.group)


  },
  newtup: function() {
    this.data.group.push(this.data.groups[1])
    this.setData({
      group: this.data.group
    })
  },
  deltx: function(e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let that = this
    console.log(that.data.qitaxiangmuneiy.xiangmu)
    //项目数组内容                     按钮数组内容
    if (that.data.group[index].title == that.data.qitaxiangmuneiy[id].xiangmu) {
      //空数组
      //删除其他项目
      that.data.group.splice([index], 1)
      that.data.qitaxiangmuneiy[id].color = ''
      this.setData({
        group: that.data.group,
        qitaxiangmuneiy: that.data.qitaxiangmuneiy
      })
    } else {
      //删除默认项目
      that.data.group.splice([index], 1)
      this.setData({
        group: that.data.group,
      })
    }

  },
  Tosetup: function() {

    wx.navigateTo({
      url: '../participants/participants'
    })
  },
  quetoshe: function() {
    this.setData({
      qushe: true,
      homepage: false
    })
  },
  xianshitime: function() {
    this.setData({
      setime: false,
      xiantime: true
    })
  },
  bindDateChange: function(e) {

    this.data.startime.dadate = e.detail.value
    this.setData({
      startime: this.data.startime
    })
  },
  bindTimeChange: function(e) {
    this.data.startime.datime = e.detail.value
    this.setData({
      startime: this.data.startime
    })
  },
  DateChange: function(e) {
    this.data.endtime.houdate = e.detail.value
    this.setData({
      endtime: this.data.endtime
    })
  },

  TimeChange: function(e) {
    this.data.endtime.houtime = e.detail.value
    this.setData({
      endtime: this.data.endtime
    })
  },
  phone: function(e) {
    this.setData({
      shant: e.detail.value
    })
  },
  queren: function() {
    this.setData({
      dianhua: true,
      homepage: false
    })
  },
  Addplace: function() {
    wx.navigateTo({
      url: '../shedidian/shedidian',
    })
  },

  movestart: function(e) {
    console.log(e)
    currindex = e.currentTarget.dataset.index
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
    x1 = e.currentTarget.offsetLeft;
    y1 = e.currentTarget.offsetTop;
  },
  move: function(e) {
    console.log(e)
    yy = e.currentTarget.offsetTop;
    x2 = e.touches[0].clientX - x + x1;
    y2 = e.touches[0].clientY - y + y1;
    console.log(x2, y2)
    this.setData({
      mainx: currindex,

      move: {
        x: x2,
        y: y2
      }
    })
  },
  moveend: function(e) {
    console.log(3)
    if (y2 != 0) {
      var arr = [];
      for (var i = 0; i < this.data.jieitem.length; i++) {
        arr.push(this.data.jieitem[i]);
      }
      var nx = this.data.jieitem.length;
      n = 1;
      for (var k = 2; k < nx; k++) {
        if (y2 > (139 * (k - 1) + k * 2 - 69.5)) {
          n = k;
        }
      }
      if (y2 > (139 * (nx - 1) + nx * 2 - 69.5)) {
        n = nx;
      }
      console.log(arr);

      arr.splice((currindex - 1), 1);
      arr.splice((n - 1), 0, this.data.jieitem[currindex - 1]);
      this.data.jieitem = [];
      for (var m = 0; m < this.data.jieitem.length; m++) {
        console.log(arr[m]);
        arr[m].id = m + 1;
        this.data.jieitem.push(arr[m]);
      }
      console.log(this.data.jieitem);
      this.setData({
        mainx: "",
        jieitem: arr,
        opacity: 1
      })
    }
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})