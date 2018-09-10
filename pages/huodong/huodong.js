// pages/huodong/huodong.js
const app = getApp();
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
var time = null,
  yintime = null,
  katime = null,
  Time, Stime, Etime, Daojitime = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xiangmu: "",
    itimg: "",
    theme: '',
    act: '',
    turl: app.globalData.urlfix,
    map: '',
    huabu: true,
    erweima: '',
    theme_id: '',
    user_id: '',
    comment: '',
    ord_time: '',
    baomingren: '',
    btn: 'woyao',
    apply: '我要接龙',
    shangpin: true,
    maxtime: "",
    isHiddenLoading: true,
    isHiddenToast: true,
    dataList: {},
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    guanli: true,
    luyin: false,
    luzhi: true,
    pushurl: [],
    hidtuyin: true,
    lustart: true,
    luzantin: false,
    luzhiwan: true,
    timekeeping: 0,
    hibo: true,
    hizan: true,
    qie: true,
    kaci: '',
    hikatime: false,
    nhkatime: true,
    textkui: false,
    hitext: true,
    pingz: 1,
    jiaodu: 90,
    heji: 0,
    zonjia: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     
    wx.request({
      url: app.globalData.urlPrefix + "Infoall/statistics",
    })
    if (options.theme_uid == app.globalData.idda.uid) {
      this.setData({
        guanli: false
      })
    }
    var that = this
    console.log(options)
    wx.request({
        url: app.globalData.urlPrefix + "qrcode/code",
        data: {
          path: 'pages/huodong/huodong?id=' + options.id + '&uid=' + options.uid + '&theme_uid=' + options.theme_uid
        },
        success: function(res) {
          console.log(res.data)
          that.setData({
            erweima: app.globalData.urlfix + res.data.code_img
          })
        }
      }),
      // 活动数据统计
      wx.request({
        url: app.globalData.urlPrefix + 'Infoall/lo',
        data: {
          theme_id: options.id,
          user_id: app.globalData.idda.uid,
          theme_uid: options.theme_uid,
          fen_user_id: options.fen_user_id
        },
        success: function(res) {
          console.log(res.data)
          that.setData({
            login_num: res.data.login_num,

            people: res.data.people,
            pz_num: res.data.pz_num


          })
        }
      }),
      wx.request({
        url: app.globalData.urlPrefix + "Carryuser/Carryuser",
        data: {
          theme_id: options.id,
          user_id: app.globalData.idda.uid,
          theme_uid: options.theme_uid
        },
        success: function(res) {}

      }),
      that.setData({
        theme_id: options.id,
      user_id: app.globalData.idda.uid,
        theme_uid: options.theme_uid,

      })
    wx.request({
      url: app.globalData.urlPrefix + 'Infoall/friend',
      data: {
        user_id: app.globalData.idda.uid,
        theme_id: options.id
      },
      success: function() {

      }
    })
    app.globalData.socket.send({
      data: 'home'
    })

  },
  people: function() {
    console.log(this.data.map)
    wx.navigateTo({
      url: '../people/people?theme_id=' + this.data.theme_id + '&user_id=' + app.globalData.idda.uid,
    })
  },
  qie: function() {
    if (this.data.pingz == 2) {
      if (this.data.qie == true) {
        this.setData({
          qie: false,
          jiaodu: 270
        })
      } else {
        this.setData({
          qie: true,
          jiaodu: 90
        })
      }
    }
  },
  pzManagement: function() {
    wx.navigateTo({
      url: '../pzManagement/pzManagement?theme_id=' + this.data.theme_id + '&user_id=' + this.data.user_id
    })
  },
  FabuTime: function() {
    console.log(this.data.theme)
    var Time = new Date().getTime()
    var sjcha = (Time - this.data.theme.add_time * 1000);
    //天
    var tian = Math.floor(sjcha / (24 * 3600 * 1000));
    //小时
    var leave1 = sjcha % (24 * 3600 * 1000);
    var xiaoshi = Math.floor(leave1 / (3600 * 1000));
    //分钟
    var leave2 = leave1 % (3600 * 1000);
    var fenzhong = Math.floor(leave2 / (60 * 1000));
    //秒
    var leave3 = leave2 % (60 * 1000);
    var miao = Math.floor(leave3 / 1000);
    if (tian > 0) {
      this.data.theme.add_time = tian + '天前'
    } else if (xiaoshi > 0) {
      this.data.theme.add_time = xiaoshi + '小时前'
    } else if (fenzhong > 0) {
      this.data.theme.add_time = fenzhong + '分钟前'
    } else if (miao < 0) {
      console.log(20)
      this.data.theme.add_time = 1 + '秒前'
    } else {
      console.log(30)
      this.data.theme.add_time = miao + '秒前'
    }
    this.setData({
      theme: this.data.theme,

    })
  },
  zhuangfa: function() {
    this.onShareAppMessage()
  },
  myhome: function() {
    console.log(this.data.map)
    wx.navigateTo({
      url: '../index/index',
    })
  },
  // 文本框
  textbox: function(e) {
    this.setData({
      textoc: e.detail.value
    })
  },
  textu: function() {
    this.setData({
      textkui: true,
      hitext: false,
    })
  },
  deltext: function() {
    this.setData({
      textoc: null,
      textkui: false,
      hitext: true,
    })
  },
  //打卡请求
  woydaka: function() {
    var that = this;
    wx.request({
      url: app.globalData.urlPrefix + 'smith/daka',
      data: {
        user_id: app.globalData.idda.uid,
        theme_id: that.data.theme_id,
        audio_path: that.data.luysrc,
        other_path: that.data.upimg,
        luyin_time: that.data.timekeeping,
        textoc: that.data.textoc
      },
      success: function(res) {
        wx.navigateTo({
          url: '/pages/huodong/huodong?id=' + that.data.theme_id + '&uid=' + app.globalData.idda.uid + '&theme_uid=' + that.data.theme_uid

        })

      }
    })
  },
  joinjl: function() {
     var that = this
    var jl_type = that.data.jl_type
    console.log(that.data.pushurl)
    if (jl_type == 2) {
      if (that.data.theme.has_daka == 1 || this.data.hidtuyin) {

        return
      }

      for (var i = 0; i < that.data.daka_info.length; i++) {

        if (that.data.daka_info[i].ieb == 0) {
          if (that.data.textoc == null && that.data.daka_info[i].id==0) {
            wx.showToast({
              title: '文本必须填写！',
              icon: 'none',
              duration: 2000
            })
            return
          } 
          else if (that.data.pushurl == [] && that.data.daka_info[i].id == 1) {
            wx.showToast({
              title: '图片/视频必须填写！',
              icon: 'none',
              duration: 2000
            })
            return
          } 
          else if (that.data.luysrc == null && that.data.daka_info[i].id == 2) {
            wx.showToast({
              title: '语音必须填写！',
              icon: 'none',
              duration: 2000
            })
            return
          } 
        }  
      }
      that.woydaka()
    }
    var xiangmu = 0
    if (jl_type == 0 || jl_type == 3 || jl_type == 5) {

      console.log(xiangmu)
      that.data.xiangmu = JSON.stringify(that.data.xiangmu)
      wx.navigateTo({
        url: '../joinJlong/index?theme_id=' + that.data.theme_id + '&user_id=' + that.data.user_id + '&theme_uid=' + that.data.theme_uid + '&xiangmu=' + that.data.xiangmu + '&jl_type=' + jl_type
      })
    } else if (jl_type == 1 || jl_type == 4) {
      for (var i = 0; i < that.data.xiangmu.length; i++) {
        xiangmu += that.data.xiangmu[i].may_amount
      }
      if (xiangmu > 0) {
        that.data.xiangmu = JSON.stringify(that.data.xiangmu)
        wx.navigateTo({
          url: '../joinJlong/index?theme_id=' + that.data.theme_id + '&user_id=' + that.data.user_id + '&theme_uid=' + that.data.theme_uid + '&xiangmu=' + that.data.xiangmu + '&jl_type=' + jl_type
        })
      }
    }

  },
  //参看地图
  chamap: function(e) {
    var id = e.currentTarget.dataset.id
    wx.openLocation({
      latitude: this.data.map[id].latitude,
      longitude: this.data.map[id].longitude,
      scale: 28,
      name: this.data.map[id].name,
      address: this.data.map[id].address
    })
  },
  //留言
  liuyan: function() {
    wx.navigateTo({
      url: '../liuyan/liuyan?theme_id=' + this.data.theme_id,
    })
  },
  // 数据
  findDrag: function(callback) {
    var that = this
    console.log(that.data.theme_id)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.urlPrefix + 'signup/findDragonItem',
      data: {
        theme_id: that.data.theme_id,
        user_id: that.data.user_id,
      },
      success: function(res) {


        res.data.comment.reverse()

        if (res.data.theme_imag) {
          that.data.itimg = res.data.theme_imag
        };
        if (res.data.theme_result.jl_type == 1) {
          that.setData({
            shangpin: false,
            xiangmu: that.data.xiangmu,
            apply: '请先选择商品'
          })
        }
        if (res.data.theme_result.jl_type == 2) {
          that.setData({
            daka_info: JSON.parse(res.data.daka_info)
          })
          if (res.data.theme_result.has_daka == 1) {
            that.setData({
              apply: '已打卡',
              btn: 'buwoyao',
              hidtuyin: true
            })
          } else {
            that.setData({
              apply: '我要打卡',
              hidtuyin: false
            })
          }
        }
        if (res.data.theme_result.jl_type == 3) {
          that.setData({
            apply: '我要聚会'
          })
        } else if (res.data.theme_result.jl_type == 5) {
          that.setData({
            apply: '报名课程'
          })
        } else if (res.data.theme_result.jl_type == 4) {

          that.setData({
            shangpin: false,
            xiangmu: that.data.xiangmu,
            apply: '请先选择商品'
          })
        }
        for (var y = 0; y < res.data.all_ord.length; y++) {
          if (res.data.all_ord[y].user_id == app.globalData.idda.uid) {
            if (res.data.all_ord[y].status > 0) {
              that.setData({
                btn: 'buwoyao',
                apply: '已参与'
              })
            }
          }
        }
        if (res.data.theme_result.address) {
          that.data.map = JSON.parse(res.data.theme_result.address)
        }

        for (var i = 0; i < res.data.item_result.length; i++) {
          if (res.data.item_result[i].p_goods_img) {
            res.data.item_result[i].p_goods_img = JSON.parse(res.data.item_result[i].p_goods_img)
          }
        }
        if (res.data.theme_result.daka_list) {
          for (var p = 0; p < res.data.theme_result.daka_list.length; p++) {
            res.data.theme_result.daka_list[p].other_path = JSON.parse(res.data.theme_result.daka_list[p].other_path)
            res.data.theme_result.daka_list[p].kab = 0
            res.data.theme_result.daka_list[p].dutiao = 0
            res.data.theme_result.daka_list[p].tiaobo = false
            res.data.theme_result.daka_list[p].tiaoting = true
          }
        }
        if (res.data.pz.info == '') {
          that.setData({
            pingz: 1,
            hijt: true
          })
        } else {
          that.setData({
            pingz: 2,
            qie: true,
            hijt: false,
          })
        }
        console.log(res.data.theme_result)
        that.setData({
          xiangmu: res.data.item_result,
          itimg: that.data.itimg,
          theme: res.data.theme_result,
          map: that.data.map,
          comment: res.data.comment,
          kaci: res.data.theme_result.daka_list,
          jl_type: res.data.theme_result.jl_type,
          baomingren: res.data.all_ord,
          peo: res.data.people,
          ord_time: res.data.pz.ord_time,
          info: res.data.pz.info,
          act: res.data.pz.act,
          baomingren: res.data.all_ord
        })
        if (res.data.item_result[0].checked == "0") {

        }
        that.FabuTime()
        setTimeout(function() {
          wx.hideLoading()
        }, 500)
        return callback(res)
      }
    })
  },
  //商品减号

  spjian: function(e) {
    var i = e.currentTarget.dataset.id
    var xiangmu = 0,
      jiage = [],
      zonjia = 0

    if (this.data.xiangmu[i].may_amount > 0) {
      this.data.xiangmu[i].may_amount--
        for (var j = 0; j < this.data.xiangmu.length; j++) {
          xiangmu += this.data.xiangmu[j].may_amount
          jiage[j] = this.data.xiangmu[j].price * this.data.xiangmu[j].may_amount
          zonjia += jiage[j]
          zonjia = Math.round(zonjia * 100) / 100
        }
      this.setData({
        zonjia: zonjia,
        heji: xiangmu,
        xiangmu: this.data.xiangmu,
      })
    }

    if (xiangmu == 0) {
      this.setData({

        apply: '请先选择商品'
      })
    }
  },
  //商品加号
  spjia: function(e) {
    var i = e.currentTarget.dataset.id
    var xiangmu = 0,
      jiage = [],
      zonjia = 0

    if (this.data.xiangmu[i].may_amount < this.data.xiangmu[i].amount) {
      this.data.xiangmu[i].may_amount++
        for (var j = 0; j < this.data.xiangmu.length; j++) {
          xiangmu += this.data.xiangmu[j].may_amount
          jiage[j] = this.data.xiangmu[j].price * this.data.xiangmu[j].may_amount
          zonjia += jiage[j]
          zonjia = Math.round(zonjia * 100) / 100
        }
      if (this.data.jl_type == 1) {
        this.data.apply = '我要团购'
      }
      if (this.data.jl_type == 4) {
        this.data.apply = '我要拼团'
      }
      this.setData({
        zonjia: zonjia,
        heji: xiangmu,
        apply: this.data.apply,
        xiangmu: this.data.xiangmu
      })
    }
    console.log(this.data.xiangmu)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    this.oime = this.selectComponent("#time")
    console.log(1)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this


    that.findDrag(function(res) {
      if (res.data.item_result[0].checked == "") {
        that.dakktime(res)
        that.setData({
          hikatime: false,
          nhkatime: true
        })
      } else {
        that.setData({
          hikatime: true,
          nhkatime: false,
          countDownHour: '打',
          countDownMinute: '',
          countDownSecond: '卡'
        })
      }

    })

    // that.FabuTime()


  },
  dakktime: function(res) {
    var that = this
    console.log(res)
    var Y = new Date().getFullYear()
    var M = new Date().getMonth() + 1
    var D = new Date().getDate()
    var Time = new Date().getTime()
    if (res.data.theme_result.jl_type == 2) {
      Stime = new Date(Y + '/' + M + '/' + D + ' ' + that.data.xiangmu[0].start).getTime();
      Etime = new Date(Y + '/' + M + '/' + D + ' ' + that.data.xiangmu[0].end).getTime();
      console.log(Stime)
      console.log(Etime)

      if (Time > Stime && Time < Etime) {
        console.log(11)
        clearInterval(Daojitime)
        that.Dakat()
      } else {
        console.log(22)
        clearInterval(time)
        that.Daojis()
      }

    }
  },
  Daojis: function() {
    var that = this

    Daojitime = setInterval(function() {

      var Y = new Date().getFullYear()
      var M = new Date().getMonth() + 1
      var D = new Date().getDate()

      var tomorrow = Y + '/' + M + '/' + D

      var dangqian = new Date().getTime()

      var tie = new Date(tomorrow + ' ' + that.data.xiangmu[0].start).getTime() + 24 * 60 * 60 * 1000


      var leave = tie - dangqian
      /**xi小时 */
      var leave1 = leave % (24 * 3600 * 1000)
      var hour = Math.floor(leave1 / (3600 * 1000))
      var hours = hour.toString()
      var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
      var minute = Math.floor(leave2 / (60 * 1000))
      var minutes = minute.toString()
      //计算相差秒数
      var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
      var second = Math.round(leave3 / 1000)
      var seconds = second.toString()
      if (hours == 0 && minutes == 0 && seconds == 0) {
        this.Dakat()
      }
      leave--;
      that.setData({
        countDownHour: hours + ':',
        countDownMinute: minutes + ':',
        countDownSecond: seconds,
        apply: '打卡未开始',
        btn: 'buwoyao',
        hidtuyin: true
      })
    }, 1000)
  },
  Dakat: function() {
    var that = this
    var Dakatime = (Etime - Time) / 1000
    time = setInterval(function() {
      var day = Math.floor(Dakatime / (60 * 60 * 24));
      var hour = Math.floor(Dakatime / (60 * 60)) - (day * 24);
      var minute = Math.floor(Dakatime / 60) - (day * 24 * 60) - (hour * 60);
      var second = Math.floor(Dakatime) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      Dakatime--;
      that.setData({
        countDownHour: '打',
        countDownMinute: '',
        countDownSecond: '卡'
      })
      //   console.log(Dakatime)
      if (Dakatime <= 0) {
        clearInterval(time)
        that.Daojis()
        that.setData({
          dakacolor: 'border: 8rpx solid #999;color:#999',
        })
      }
    }, 1000)


  },
  //录音
  luyin: function() {
    this.setData({
      luyin: true,
      luzhi: false
    })
    recorderManager.start({
      format: 'mp3' // 如果录制acc类型音频则改成aac
    });
    this.luyintime()
  },
  luyinstart: function() {
    this.luyintime()
    this.setData({
      lustart: true,
      luzantin: false
    })
    recorderManager.resume();
  },
  luyinzantin: function() {
    clearInterval(yintime)
    this.setData({
      lustart: false,
      luzantin: true
    })
    recorderManager.pause()
  },
  luyinend: function() {
    var that = this
    clearInterval(yintime)
    recorderManager.stop()
    recorderManager.onStop(function(res) {
      wx.showLoading({
        title: '上传中',
      })

      wx.uploadFile({
        url: app.globalData.urlPrefix + 'signup/uploadImg',
        filePath: res.tempFilePath,
        name: 'image',
        formData: {
          'user': 'test'
        },
        success: function(res) {
          //var data=res.data
          console.log(1)

          that.setData({
            luysrc: JSON.parse(res.data).imgPath,
            luzhiwan: false,
            luzhi: true,
            hibo: false,
            hizan: true,
            Daotimekeeping: that.data.timekeeping
          })
          setTimeout(function() {
            wx.hideLoading()
          }, 800)
        }
      })


    });
  },
  luyinbofang: function() {

    innerAudioContext.src = app.globalData.urlfix + this.data.luysrc;
    console.log(innerAudioContext.src)
    innerAudioContext.play()
    this.luyindaotime()
    this.setData({
      hibo: true,
      hizan: false,
    })
  },
  //暂停播放
  zanyin: function() {
    innerAudioContext.src = this.data.luysrc;
    innerAudioContext.pause()
    this.setData({
      hibo: false,
      hizan: true,
    })
    clearInterval(yintime)
  },
  //录音删除
  luyinDel: function() {
    recorderManager.stop()
    this.setData({
      luyin: false,
      luzhi: true,
      luysrc: '',
      timekeeping: 0,
      luzhiwan: true
    })
  },
  //计时
  luyintime: function(e) {
    var that = this
    yintime = setInterval(function() {

      that.setData({
        timekeeping: ++that.data.timekeeping
      })
    }, 1000)
  },
  //倒计时
  luyindaotime: function(e) {
    var that = this
    var huifu = that.data.Daotimekeeping
    yintime = setInterval(function() {
      if (that.data.Daotimekeeping >= 1) {
        that.setData({
          Daotimekeeping: --that.data.Daotimekeeping
        })
      } else {
        clearInterval(yintime)
        that.setData({
          Daotimekeeping: that.data.timekeeping,
          hibo: false,
          hizan: true
        })
      }

    }, 1000)
  },

  // 打卡信息
  katiaobo: function(e) {

    var i = e.currentTarget.dataset.id
    innerAudioContext.src = app.globalData.urlfix + this.data.kaci[i].audio_path
    this.katiaotime(i)
    this.data.kaci[i].tiaobo = true
    this.data.kaci[i].tiaoting = false
    this.setData({
      kaci: this.data.kaci
    })
    innerAudioContext.play()
    innerAudioContext.onPlay(() => {
      console.log(innerAudioContext.duration)
    })

  },
  katiaoting: function(e) {
    var i = e.currentTarget.dataset.id
    innerAudioContext.src = app.globalData.urlfix + this.data.kaci[i].audio_path
    innerAudioContext.pause()
    clearInterval(katime)
    this.data.kaci[i].tiaobo = false
    this.data.kaci[i].tiaoting = true
    this.setData({
      kaci: this.data.kaci
    })


  },
  luxtp: function(e) {
    var i = e.currentTarget.dataset.id
    var j = e.currentTarget.dataset.j
    var aa = []
    for (var o = 0; o < this.data.kaci[i].other_path.length; o++) {
      aa.push(app.globalData.urlfix + this.data.kaci[i].other_path[o])
    }
    wx.previewImage({
      current: app.globalData.urlfix + this.data.kaci[i].other_path[j],
      urls: aa
    })
  },
  //打卡播放时间
  katiaotime: function(i, dak) {
    var that = this
    katime = setInterval(function() {
      ++that.data.kaci[i].kab
      that.data.kaci[i].dutiao = that.data.kaci[i].kab / that.data.kaci[i].luyin_time * 100
      if (that.data.kaci[i].kab > that.data.kaci[i].luyin_time) {
        that.data.kaci[i].kab = 0;
        that.data.kaci[i].dutiao = 0;
        clearInterval(katime)
        that.data.kaci[i].tiaobo = false
        that.data.kaci[i].tiaoting = true
      }
      that.setData({
        kaci: that.data.kaci
      })
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log(12)
    clearInterval(time);
    clearInterval(Daojitime);
    clearInterval(katime);
    innerAudioContext.pause();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(time);
    clearInterval(Daojitime);
    clearInterval(yintime)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let that = this
    that.findDrag(function(res) {
      that.dakktime(res)
    })
    wx.stopPullDownRefresh()
  },
  // 凭证管理
  pzManagement: function() {
    wx.navigateTo({
      url: '../pzManagement/pzManagement' + '?user_id=' + app.globalData.idda.uid + '&theme_id=' + this.data.theme_id,
    })
  },

  // 上传图片
  box: function(e) {
    var that = this;
    var uppimg = [];
    console.log(e)
    wx.showActionSheet({
      itemList: ['图片', '视频'],
      success: function(res) {
        if (res.tapIndex === 0) {
          wx.chooseImage({
            sourceType: ['album', 'camera'],
            success: function(res) {
              var tempFilePaths = res.tempFilePaths
              console.log(that.data.pushurl)

              /*for (var i in tempFilePaths) {
                tempFilePaths.push(tempFilePaths[i])
              }*/
              for (var j in tempFilePaths) {
                var index1 = tempFilePaths[j].lastIndexOf(".");
                var index2 = tempFilePaths[j].length;
                var postf = tempFilePaths[j].substring(index1, index2);
                console.log(postf)
                if (postf == ".jpg" || postf == '.png') {
                  var gg = that.data.pushurl

                  gg.push({
                    pic: tempFilePaths[j],
                    video: ''
                  })
                  that.setData({
                    pushurl: gg
                  })
                }
              }
              wx.showLoading({
                title: '上传中',
              })

              for (var i = 0; i < gg.length; i++) {
                console.log(gg[i].pic)
                wx.uploadFile({
                  url: app.globalData.urlPrefix + 'signup/uploadImg',
                  filePath: gg[i].pic,
                  name: 'image',
                  formData: {
                    'user': 'test'
                  },
                  success: function(res) {
                    //var data=res.data
                    console.log(res)
                    uppimg.push(JSON.parse(res.data).imgPath)

                    that.setData({
                      upimg: uppimg,

                    })
                    setTimeout(function() {
                      wx.hideLoading()
                    }, 800)
                  }
                })
              }

            },
          })
          console.log(that.data.pushurl)
        } else if (res.tapIndex === 1) {
          wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success: function(res) {
              console.log(res.tempFilePath)
              var tempFilePaths = res.tempFilePath.split()
              var ovsrc = that.data.pushurl

              for (var j in tempFilePaths) {
                var index1 = tempFilePaths[j].lastIndexOf(".");
                var index2 = tempFilePaths[j].length;
                var postf = tempFilePaths[j].substring(index1, index2);
                console.log(postf)

                if (postf == ".mp4") {

                  var gg = that.data.pushurl
                  gg.push({
                    pic: '',
                    video: tempFilePaths[j]
                  })

                  that.setData({
                    pushurl: gg
                  })

                }


              }
              console.log(that.data.pushurl)
              for (var i = 0; i < gg.length; i++) {
                console.log(gg[i].video)
                wx.uploadFile({
                  url: app.globalData.urlPrefix + 'signup/uploadImg',
                  filePath: gg[i].video,
                  name: 'image',
                  formData: {
                    'user': 'test'
                  },
                  success: function(res) {
                    //var data=res.data
                    console.log(res)
                  }
                })
              }
            }
          })
        }
      }
    })

  },
  infodel: function(ev) {
    let index = ev.currentTarget.dataset.index;
    let Img = this.data.pushurl;
    Img.splice(index, 1)

    this.setData({
      pushurl: Img
    })
  },
  tup: function(e) {
    let ind = e.currentTarget.dataset.index
    var that = this
    console.log(ind)
    wx.showActionSheet({
      itemList: ["替换图片", "替换成视频", "删除"],
      success: function(res) {
        if (res.tapIndex == 0) {
          wx.chooseImage({
            sourceType: ['album'],
            count: '1',
            success: function(res) {
              console.log(ind)
              var tempFilePaths = res.tempFilePaths
              var aa = that.data.pushurl
              aa.splice(ind, 1, {
                pic: tempFilePaths,
                video: ''
              })
              that.setData({
                pushurl: aa
              })
            }
          })
        } else if (res.tapIndex == 1) {
          wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success: function(res) {
              var tempFilePaths = res.tempFilePath
              console.log(res)
              var aa = that.data.pushurl
              aa.splice(ind, 1, {
                pic: '',
                video: tempFilePaths
              })
              that.setData({
                pushurl: aa
              })
            }
          })
        } else if (res.tapIndex == 2) {
          let aa = that.data.pushurl
          aa.splice(ind, 1)
          that.setData({
            pushurl: aa
          })
        }
      }
    })
  },
  ship: function(e) {
    e.vioos = wx.createVideoContext('sps')
    let ind = e.currentTarget.dataset.index
    var that = this
    console.log(ind)
    wx.showActionSheet({
      itemList: ['播放', '替换视频', '替换成图片', '删除'],
      success: function(res) {
        if (res.tapIndex == 0) {
          e.vioos.play({})
          e.vioos.requestFullScreen({})
        } else if (res.tapIndex === 1) {
          wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success: function(res) {
              console.log(res.tempFilePath)
              var tempFilePaths = res.tempFilePath.split()
              var vsrc = that.data.pushurl
              vsrc.splice(ind, 1, {
                pic: '',
                video: tempFilePaths
              })


              that.setData({
                pushurl: vsrc
              })
              console.log(that.data.src.length)
            }
          })
        } else if (res.tapIndex == 2) {
          wx.chooseImage({
            sourceType: ['album', 'camera'],
            count: '1',
            success: function(res) {
              console.log(ind)
              var tempFilePaths = res.tempFilePaths
              var aa = that.data.pushurl
              aa.splice(ind, 1, {
                pic: tempFilePaths,
                video: ''
              })
              that.setData({
                pushurl: aa
              })
            }
          })
        } else if (res.tapIndex == 3) {
          let vos = that.data.pushurl;
          vos.splice(ind, 1)
          that.setData({
            pushurl: vos
          })
        }
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log(2)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: this.data.theme.theme_name,
      path: 'pages/huodong/huodong?id=' + this.data.theme_id + '&uid=' + this.data.user_id + '&fen_user_id=' + app.globalData.idda.uid + '&theme_uid=' + this.data.theme_uid
    }
  },
  eventDraw() {

    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    var vw = [
      /* {
         type: 'image',
         url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531103986231.jpeg',
         top: 0,
         left: 0,
         width: 335,
         height: 455
       },*/

      {
        type: 'image',
        url: this.data.theme.user_img,
        top: 20.5,
        left: 22,
        width: 25,
        height: 25
      },
      {
        type: 'text',
        content: this.data.theme.user_name,
        fontSize: 12,
        color: '#402D16',
        textAlign: 'left',
        top: 20,
        left: 50,
        bolder: true
      },
      {
        type: 'text',
        content: this.data.theme.theme_name,
        fontSize: 12,
        color: '#563D20',
        textAlign: 'left',
        top: 65.5,
        left: 30
      },

      {
        type: 'image',
        url: this.data.erweima,
        top: 13,
        left: 170,
        width: 40,
        height: 40
      },
      {
        type: 'text',
        content: this.data.theme.desc_info,
        fontSize: 12,
        lineHeight: 18,
        color: '#383549',
        textAlign: 'left',
        top: 275,
        left: 36,
        width: 197,
        MaxLineNumber: 3,
        breakWord: true,
        bolder: true
      },
      {
        type: 'text',
        content: '￥' + this.data.theme.btw_price,
        fontSize: 12,
        color: '#E62004',
        textAlign: 'left',
        top: 352,
        left: 154.5,
        bolder: true
      },
      {
        type: 'text',
        content: '原价:￥138.00',
        fontSize: 0,
        color: '#7E7E8B',
        textAlign: 'left',
        top: 391,
        left: 110,
        textDecoration: 'line-through'
      },
      {
        type: 'text',
        content: '长按识别图中二维码',
        fontSize: 10,
        color: '#383549',
        textAlign: 'left',
        top: 16,
        left: 215.5,
        lineHeight: 18,
        MaxLineNumber: 2,
        breakWord: true,
        width: 40
      }
    ]
    if (this.data.itimg[0]) {
      vw.push({
        type: 'image',
        url: app.globalData.urlfix + this.data.itimg[0],
        top: 86,
        left: 60.5,
        width: 160,
        height: 185
      })
    }
    this.setData({
      huabu: false,
      painting: {
        width: 285,
        height: 385,
        clear: true,
        views: vw
      }
    })
  },
  eventSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
    this.setData({
      huabu: true
    })
  },
  fabujiel: function() {
    wx.navigateTo({
      url: '../jielong/jielong',
    })
  },
  yulan: function(e) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    var aa = []
    for (var i = 0; i < this.data.itimg.length; i++) {
      aa.push(app.globalData.urlfix + this.data.itimg[i])
    }
    console.log(aa)
    wx.previewImage({
      current: app.globalData.urlfix + this.data.itimg[id],
      urls: aa
    })



  },
  fenxinghidd: function() {
    this.setData({
      huabu: true
    })
  },
  eventGetImage(event) {
    wx.hideLoading()
    const {
      tempFilePath
    } = event.detail
    this.setData({
      shareImage: tempFilePath
    })
  },
  renlaig: function() {
    wx.navigateTo({
      url: '../renlaig/renlaig?theme_id=' + this.data.theme_id + '&login_num=' + this.data.login_num,
    })
  },
  edit: function() {
    wx.navigateTo({
      url: '/pages/baoming0/edit?id=' + this.data.theme_id + '&uid=' + this.data.user_id + '&theme_uid=' + this.data.theme_uid,
    })
  },
})