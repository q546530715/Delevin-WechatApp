"use strict";
var app = getApp();
var root_path = "../../../";
var index_obj = require(root_path+'function/personal_index.js')

Page({
  data:{
    userInfo: {},
    y_menus:[
      {title:'公益课'},
      {title:'我的案例'},
      {title:'DSU分享'},
    ],
    x_menus:[
      {title:'收藏',icon:'/images/collection.png'},
      {title:'课程管理',icon:'/images/eve.png',classes:'two_side'},
      {title:'设置',icon:'/images/set.png'},
    ],
  },
  onLoad:function(options){
    var that = this;
    app.getUserInfo(function(userInfo){
       // console.log(userInfo);
        
        //设置用户信息
        that.setData({
            userInfo:userInfo
        })
    });
  },
  onReady:function(){
        index_obj.set_title();
  },
  onShow:function(){
        index_obj.set_title();
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})