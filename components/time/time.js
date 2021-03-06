// components/time/time.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Time: {
      type: String,
      value: '',
      observer(newVal, oldVal) {
        
        if (oldVal != '' && !(oldVal > 0) ){
         this.setData({
           Time: oldVal
         })
         return 
       }
      
        // this.HeTime()
          
      }
    },
    zc:{
      type: Boolean,
      value:false
    }
  },
  ready() {
  
    this.HeTime()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
    HeTime: function () {
      var that = this
      if(this.data.zc){
        var time = new Date(that.data.Time * 1000) 
        var mon = time.getMonth() + 1;
        var day = time.getDate();
        var hour = time.getHours();
        var min = time.getMinutes();
        if (mon < 10) {
          mon = '0' + mon
        }
        if (day < 10) {
          day = '0' + day
        }
        if (hour < 10) {
          hour = '0' + hour
        } if (min < 10) {
          min = '0' + min
        }
        that.data.Time = time.getFullYear() + '-'+ mon + '-' + day + ' ' + hour + ':' + min
      }else{
        
        var Time = new Date().getTime();
        var sjcha = (Time - that.data.Time * 1000);
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
          that.data.Time = tian + '天前'
        } else if (xiaoshi > 0) {
          that.data.Time = xiaoshi + '小时前'
        } else if (fenzhong > 0) {
          that.data.Time = fenzhong + '分钟前'
        } else if (miao < 0) {
          that.data.Time = 1 + '秒前'
        } else {
          that.data.Time = miao + '秒前'
        }
      }
     
      
      

       that.setData({ Time: that.data.Time })
    },
  }
})
