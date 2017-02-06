var root_path = "../../../";
const config = require( root_path + 'config.js' );
const util = require(root_path + 'utils/util.js');
var menu_static = 0;
Page({
  data:{
    // text:"这是一个页面"
    news_id:0,
    news_info:[],
  },
  onLoad:function(options){
    var that = this;
      that.setData({
        news_id:options.id
      });

      util.AJAX("App/News/getNewsInfo?nid="+ options.id, function (res) {  
          res.data.data.des =  res.data.data.des.replace( /<p>/g, '' )
                        .replace( /<\/p>/g, '' )
                        .replace( /<strong>/g, '' )
                        .replace( /<\/strong>/g, '' )
                        .replace( /<a.*?\/a>/g, '' )
                        .replace( /&nbsp;/g, ' ' )
                        .replace( /&ldquo;/g, '"' )
                        .replace( /&rdquo;/g, '"' );
            // 重新写入数据
             that.setData({
                news_info: res.data.data
             });
           
        });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})