//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    people_data:[],
    add_data:[],
    loading: false ,
    images:[],
    hiddenLoading: false,
    cur_id:0,
    commont_list:[],
    pl_nr:''
  },
  //事件处理函数
  bindViewTap: function() {
    
  },
   loadMore (e) {
      if (this.data.add_data.length === 0) return
    var date = this.getNextDate()
    var that = this
    that.setData({ loading: true })
    wx.request({
      url: 'https://www.bslxx.com/public/xcxapi/shequ?page=' + this.index,
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) { 
         res.data.data.forEach(function (item,k) {
          if (item['img_path']) {
          item['img_path'] = JSON.parse(item['img_path'])
          }
          res.data.data[k] = item
        })
         that.setData({
           loading: false,
           add_data:res.data.data,
           people_data: that.data.people_data.concat(res.data.data)
         })
      }
    })
  },
  getNextDate (){
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  onLoad: function () {
    var that = this
    //  页面一加载
    wx.request({
      url: 'https://www.bslxx.com/public/xcxapi/shequ',
      success:function(rntD){
        
        if (rntD.data.data.length>0) {
            rntD.data.data.forEach(function (item,k) {
            if (item['img_path']) {
            item['img_path'] = JSON.parse(item['img_path'])
            }
            rntD.data.data[k] = item
          })
          that.setData({
             add_data:rntD.data.data,
            people_data:rntD.data.data
          })
        }
        
       
      }
    })

      this.index = 1
  },
  goPub:function(){
    wx.navigateTo({
      url:'/pages/pub/pub'
    })
  },
   ondoZan(event){
    console.log(event)
        var that = this
      //  页面一加载
      wx.request({
        url: 'https://www.bslxx.com/public/xcxapi/shequ/zan',
        data:{
          id:event.currentTarget.id
        },
        success:function(rntD){
          
        }
      })
  },
   onPlXs(event){
     var that = this
     this.setData({
       cur_id: event.currentTarget.id == this.data.cur_id ? 0 : event.currentTarget.id
     })
     that.setData({ commont_list: [] })
     if(this.data.cur_id>0){
       wx.request({
         url: 'https://www.bslxx.com/public/xcxapi/shequ/getPl',
         data: {
           id: this.data.cur_id
         },
         success: function (rntD) {
           console.log(rntD)
           that.setData({commont_list: rntD.data})
         }
       })
     }
   },
   setPlnr(e){
    this.setData({
      pl_nr:e.detail.value
    })
   },
   ondoPl(event){

    wx.request({
      url: 'https://www.bslxx.com/public/xcxapi/shequ/commont',
      data:{
        content: this.data.pl_nr,
        shequ_id: event.currentTarget.id
      },
    })
  },
   //滚动到底部触发事件  
  searchScrollLower: function(){  
    let that = this;  
    console.log(!that.data.loading)
    if(!that.data.loading){  
      
      that.loadMore();  
    }  
  },
   imageLoad(e) {
     var $width=e.detail.width,    //获取图片真实宽度
         $height=e.detail.height,
         ratio=$width/$height;    //图片的真实宽高比例
     var viewWidth=718,           //设置图片显示宽度，左右留有16rpx边距
         viewHeight=718/ratio;    //计算的高度值
      var image=this.data.images; 
      //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
      image[e.target.dataset.index]={
         width:viewWidth,
         height:viewHeight
      }
      this.setData({
           images:image
      })
  }  
})
