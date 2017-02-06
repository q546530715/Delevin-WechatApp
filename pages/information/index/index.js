"use strict";

var root_path = "../../../";
var index_obj = require(root_path+'function/information_index.js')
var figure_obj = require(root_path+'function/information_figure.js')
var api = require(root_path+'api/information_api.js');
var menu_static = 0;

const config = require( root_path + 'config.js' );
const util = require(root_path + 'utils/util.js');
Page({
    
  data: {
    hid: false,
    news_no_data:false,
    get_news_list_status:false,
    menuStatic:menu_static,
    myake_url:'',
    news_list:[],
    offset:10,
    default_img:'',
    dis:"display_block",
    menu:['推荐','热点','视频','北京','社会','娱乐','图片','科技','汽车','体育','财经','军事',],
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    course_list:[],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    indicatorDots:true,
  },
   /** 
     * 页面初始化
     * options 为页面跳转所带来的参数
     */
    onLoad: function (options) {
        var that = this;
        
        /**
         * 显示 loading
         */
        that.setData({
            myake_url:config.API_HOST,
            default_img:'Public/images/default.png',
        });

        wx.request({
        url:  config.API_HOST + 'App/News/getNewCourse', //仅为示例，并非真实的接口地址
        data: {},
        method:'POST',
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function(res) {
            // 重新写入数据
             that.setData({
                course_list: res.data.course_list,
             });
        }
    })


        //请求php分类文章
        this.getNewsList();
        
    },
    
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        console.log(res, new Date())
      }
    })
  },
  onReady:function(){
      var that = this;
      setTimeout(function () {
          that.setData({ hid: true });
      }, 2000);
  },

  onShow:function(){
      var that = this;
      setTimeout(function () {
          that.setData({ dis:"display_none" });
      }, 1500);

      if(figure_obj.get_figure_cookie()){
          this.setData({ dis:"display_none" });
      }else{
          figure_obj.set_figure_cookie();
      }
  },

  detail: function(event) {
     
      index_obj.redirectTo_index(event);
  },

  click_menu:function(event){
      this.menu_static = event.currentTarget.id;
      this.setData({
         menuStatic:this.menu_static
      });
  },
  getNewsList:function(){
      var that = this;
      var postData = {offset:that.data.offset};
      if(that.data.news_no_data == true){
          return;
      }
      if(that.data.get_news_list_status == true){
          return;
      }
        that.setData({
            hid: false,
            get_news_list_status:true,
        });
      wx.request({
        url:  config.API_HOST + 'App/News/getNewsList', //仅为示例，并非真实的接口地址
        data: {offset:that.data.offset},
        method:'POST',
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function(res) {
            //获取当前现有数据进行保存
            var list = that.data.news_list;
            if(res.data.data.length < 10){
                 that.setData({
                     news_no_data:true,
                 });
            }
            // 重新写入数据
             that.setData({
                news_list: list.concat(res.data.data),
                offset: res.data.offset,
                hid:true,
                get_news_list_status:false
             });

           
        }
    })

  },
  scrolltolower: function (e) {

        /**
         * 发送请求数据
         */
        this.getNewsList();
        
    },
    imageOnLoadError:function(e){
        var that = this;
        var _errImg=e.target.dataset.errImg;  
        var _errObj={};  
        _errObj[_errImg]= that.err_img; 
        console.log( e.detail.errMsg+"----" + "----" +_errImg );  
        that.setData(_errObj);    
    }
  
});
