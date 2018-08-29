// pages/joinJlong/index
const app = getApp();
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    pushurl: [],
    hid: false,
    hid2: true,
    ad: true,
    tesu: true,
    pay: true,
    ad2: true,
    color: true,
    num: 0,
    theme_id: '',
    user_id: '',
    act: '',
    address_info: '',
    self_info: '',
    self_data: [],
    item_info: '',
    adr_panduan: '',
    address: '',
    summation: {
      zongshu: 0,
      jiage: [],
      zongjiage: 0
    },
    beizhu: '',
    hzhifu: true,
    hqueren: true,
    luyin:false,
    luzhi:true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function(options) {
      var that = this;
      that.setData({
        theme_id: options.theme_id,
        user_id: options.user_id
      })
      console.log(that.data.act)
      wx.request({
        url: app.globalData.urlPrefix + 'joinJl/join_jl',
        data: {
          user_id: that.data.user_id,
          theme_id: that.data.theme_id
        },
        success: function(res) {
          console.log(res)
          that.setData({
            address_info: res.data.address_info,
            self_info: res.data.self_info,
            item_info: res.data.item_info,
            adr_panduan: res.data.adr_panduan,
            act: res.data.act
          })
        }
      })
    
    },
    onShow: function() {
      var that = this;
      wx.request({
        url: app.globalData.urlPrefix + 'joinJl/xuanAdr',
        data: {
          user_id: that.data.user_id
        },
        success: function(res) {
          that.setData({
            address: res.data
          })
        },
      })
    },
    binddata: function(e) {
      console.log(e)
      var id = e.currentTarget.dataset.id
      this.data.self_info[id].value = e.detail.value
      console.log(this.data.self_info)
      this.setData({
        self_info: this.data.self_info
      })
      console.log(this.data.self_info)
    },
    /**加号 */
    add: function(e) {
      this.data.summation.zongshu = 0
      this.data.summation.zongjiage = 0
      var id = e.currentTarget.dataset.id
      var aa = this.data.item_info[id].may_amount

      if (aa >= this.data.item_info[id].amount) {
        wx.showToast({
          title: '库存不足！',
          icon:'none'
        })
      } else {
        this.data.item_info[id].may_amount = aa + 1
        for (var i = 0; i < this.data.item_info.length; i++) {
          this.data.summation.zongshu += this.data.item_info[i].may_amount
          this.data.summation.jiage[i] = this.data.item_info[i].price * this.data.item_info[i].may_amount
          this.data.summation.zongjiage += this.data.summation.jiage[i]
          this.data.summation.zongjiage = Math.round(this.data.summation.zongjiage * 100) / 100

          console.log(this.data.summation.zongjiage.toFixed(2))
        }
        if (this.data.summation.zongjiage > 0) {
          this.data.hzhifu = false
        } else if (this.data.summation.zongshu > 0) {
          this.data.hqueren = false
        }
        this.setData({
          item_info: this.data.item_info,
          summation: this.data.summation,
          color: false,
          hzhifu: this.data.hzhifu,
          hqueren: this.data.hqueren
        })

      }

    },
    /**减号 */
    reduce: function(e) {
      this.data.summation.zongshu = 0
      this.data.summation.zongjiage = 0
      console.log(e.currentTarget.dataset.id)
      var that = this
      var id = e.currentTarget.dataset.id
      var aa = that.data.item_info[id].may_amount

      console.log(that.data.item_info)
      if (that.data.item_info[id].may_amount <= 0) {
        that.data.item_info[id].may_amount = 0
        that.setData({
          item_info: that.data.item_info,
          color: true
        })
      } else {
        that.data.item_info[id].may_amount = aa - 1
        for (var i = 0; i < this.data.item_info.length; i++) {
          this.data.summation.zongshu += this.data.item_info[i].may_amount
          this.data.summation.jiage[i] = this.data.item_info[i].price * this.data.item_info[i].may_amount
          this.data.summation.zongjiage += this.data.summation.jiage[i]
          this.data.summation.zongjiage = Math.round(this.data.summation.zongjiage * 100) / 100
        }
        if (this.data.summation.zongjiage == 0) {
          this.data.hzhifu = true
        } else if (this.data.summation.zongshu == 0) {
          this.data.hqueren = true
        }

        that.setData({
          item_info: that.data.item_info,
          summation: this.data.summation,
          color: false,
          hzhifu: this.data.hzhifu,
          hqueren: this.data.hqueren
        })
      }
    },
    //录音
    luyin:function(){
      this.setData({luyin:true,luzhi:false})
    },
    luyinstart:function(){
      this.recorderManager = wx.getRecorderManager();
      console.log(this)
      recorderManager.start({
        format: 'mp3' // 如果录制acc类型音频则改成aac
      });
    },
    luyinend:function(){
      var that=this
      recorderManager.stop()
      recorderManager.onStop(function(res){
        that.setData({luysrc:res.tempFilePath})
      });
    },
    luyinbofang:function(){
     innerAudioContext.src = this.data.luysrc;
     innerAudioContext.play()
    },
    adr: function() {
      var that = this
      wx: wx.navigateTo({
        url: '../adr/index?uid=' + that.data.user_id,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    changcolro1: function() {
      this.setData({
        color: true
      })
    },
    changcolro2: function() {
      this.setData({
        color: false
      })
    },
    tesu: function() {
      this.setData({
        tesu: false
      })
    },
    add_info: function() {
      var that = this;
      wx.request({
        url: app.globalData.urlPrefix + 'joinJl/add_actor',
        data: {
          name: that.data.name,
          mobile: that.data.mobile,
          area: that.data.area,
          address: that.data.address,
          code: that.data.code
        },
        success: function(res) {
          console.log(res.data.act)
          that.setData({
            address_info: res.data.address_info,
            self_info: res.data.self_info,
            item_info: res.data.item_info,
            adr_panduan: res.data.adr_panduan
          })
        }
      })
    },
    beizhu: function(e) {
      console.log(e.detail.value)
      this.setData({
        beizhu: e.detail.value
      })

    },
    zhifu: function() {
      var that = this;
      console.log(that.data.item_info)
      wx.request({
        url: app.globalData.urlPrefix + 'Joinjl/add_actor',
        data: {
          user_id: app.globalData.idda.uid,
          item: that.data.item_info,
          self_info: that.data.self_info,
          openid: app.globalData.idda.openid,
          price: that.data.summation.zongjiage,
          amount: that.data.summation.zongshu,
          desc: that.data.beizhu,
          act_id: that.data.act.id
        },
        success: function(res) {
          var params = JSON.parse(res.data.params)
          var oid = res.data.oid

          console.log(params)
          wx.requestPayment({
            'timeStamp': params.timeStamp,
            'nonceStr': params.nonceStr,
            'package': params.package,
            'signType': params.signType,
            'paySign': params.paySign,
            'success': function(res) {
              wx.request({
                url: app.globalData.urlPrefix + 'Joinjl/sucf',
                data: {
                  oid: oid,
                  theme_id: that.data.theme_id,
                  user_id: that.data.user_id,
                  price: that.data.summation.zongjiage
                },
                success: function(res) {
                  wx.redirectTo({
                    url: '../huodong/huodong'
                  })
                },
              })
            },
            'fail': function(res) {
              console.log(res)
            },
            'complete': function(res) {
              console.log(res)
            }
          })
        }
      })
    },
    queren: function() {
      var that = this;
      console.log(that.data.item_info)
      wx.request({
        url: app.globalData.urlPrefix + 'Joinjl/qrjl',
        data: {
          user_id: app.globalData.idda.uid,
          item: that.data.item_info, //项目
          self_info: that.data.self_info, //别名
          openid: app.globalData.idda.openid,
          price: that.data.summation.zongjiage,
          amount: that.data.summation.zongshu,
          desc: that.data.beizhu, //备注
          act_id: that.data.act.id
        },
        success: function(res) {
          app.globalData.socket.send({
            data: app.globalData.idda.user_name + '刚刚参加了一个接龙'
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })

    },
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

  }
})