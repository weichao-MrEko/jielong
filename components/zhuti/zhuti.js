// components/zhuti/zhuti.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name:{
      type:String,
      value:''
    },
    setPlnr:{
      type: String,
      value: ''
    },
    descont: {
      type: String,
      value: ''
    },
    pushurl: {
      type: Array,
      value: ''
    },
    upimg: {
      type: Array,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    pushurl: [],
    setPlnr:'',
    descont:'',
    upimg:'',
    src: app.globalData.urlfix
  },

  /**
   * 组件的方法列表
   */
  methods: {
    box: function (e) {
      var that = this;
      var uppimg = [];
      console.log(e) 
      wx.showActionSheet({
        itemList: ['图片', '视频'],
        success: function (res) {
          if (res.tapIndex === 0) {
            wx.chooseImage({
              sourceType: ['album', 'camera'],
              success: function (res) {
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
                  if (postf == ".jpg" || postf=='.png') {
                    var gg = that.data.pushurl
                    gg.push({ pic: tempFilePaths[j], video: '' })
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
                    success: function (res) {
                      //var data=res.data
                      console.log(res)
                      uppimg.push(JSON.parse(res.data).imgPath)
                     console.log(uppimg)
                      that.setData({
                        upimg: uppimg,
                        
                      })
                      setTimeout(function () {
                        wx.hideLoading()
                      }, 800)
                    }
                  })
                }

              },
            })
           
          }
          else if (res.tapIndex === 1) {
            wx.chooseVideo({
              sourceType: ['album', 'camera'],
              maxDuration: 60,
              camera: 'back',
              success: function (res) {
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
                    gg.push({ pic: '', video: tempFilePaths[j] })

                    that.setData({
                      pushurl: gg
                    })

                  }


                }
                for (var i = 0; i < gg.length; i++) {
                  console.log(gg[i].video)
                  wx.uploadFile({
                    url: app.globalData.urlPrefix + 'signup/uploadImg',
                    filePath: gg[i].video,
                    name: 'image',
                    formData: {
                      'user': 'test'
                    },
                    success: function (res) {
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
    infodel: function (ev) {
      let index = ev.currentTarget.dataset.index;
      let Img = this.data.pushurl;
      Img.splice(index, 1)

      this.setData({ pushurl: Img })
    },
    tup: function (e) {
      let ind = e.currentTarget.dataset.index
      var that = this
      console.log(ind)
      wx.showActionSheet({
        itemList: ["替换图片", "替换成视频", "删除"],
        success: function (res) {
          if (res.tapIndex == 0) {
            wx.chooseImage({
              sourceType: ['album'],
              count: '1',
              success: function (res) {
                console.log(ind)
                var tempFilePaths = res.tempFilePaths
                var aa = that.data.pushurl
                aa.splice(ind, 1, { pic: tempFilePaths, video: '' })
                that.setData({
                  pushurl: aa
                })
              }
            })
          }
          else if (res.tapIndex == 1) {
            wx.chooseVideo({
              sourceType: ['album', 'camera'],
              maxDuration: 60,
              camera: 'back',
              success: function (res) {
                var tempFilePaths = res.tempFilePath
                console.log(res)
                var aa = that.data.pushurl
                aa.splice(ind, 1, { pic: '', video: tempFilePaths })
                that.setData({
                  pushurl: aa
                })
              }
            })
          }
          else if (res.tapIndex == 2) {
            let aa = that.data.pushurl
            aa.splice(ind, 1)
            that.setData({
              pushurl: aa
            })
          }
        }
      })
    },
    ship: function (e) {
      e.vioos = wx.createVideoContext('sps')
      let ind = e.currentTarget.dataset.index
      var that = this
      console.log(ind)
      wx.showActionSheet({
        itemList: ['播放', '替换视频', '替换成图片', '删除'],
        success: function (res) {
          if (res.tapIndex == 0) {
            e.vioos.play({})
            e.vioos.requestFullScreen({})
          }
          else if (res.tapIndex === 1) {
            wx.chooseVideo({
              sourceType: ['album', 'camera'],
              maxDuration: 60,
              camera: 'back',
              success: function (res) {
                console.log(res.tempFilePath)
                var tempFilePaths = res.tempFilePath.split()
                var vsrc = that.data.pushurl
                vsrc.splice(ind, 1, { pic: '', video: tempFilePaths })


                that.setData({
                  pushurl: vsrc
                })
                console.log(that.data.src.length)
              }
            })
          }
          else if (res.tapIndex == 2) {
            wx.chooseImage({
              sourceType: ['album', 'camera'],
              count: '1',
              success: function (res) {
                console.log(ind)
                var tempFilePaths = res.tempFilePaths
                var aa = that.data.pushurl
                aa.splice(ind, 1, { pic: tempFilePaths, video: '' })
                that.setData({
                  pushurl: aa
                })
              }
            })
          }
          else if (res.tapIndex == 3) {
            let vos = that.data.pushurl;
            vos.splice(ind, 1)
            that.setData({ pushurl: vos })
          }
        }
      })
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
  }
})
