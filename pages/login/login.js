// pages/login/login.js
//var util = require('../../utils/util.js');
let app = getApp();
let gData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        message: '',
        isHide:true,
        isJump:false,
        index: '',
        picker: ['学生', '辅导员', '教务', '任课教师']
    },

    PickerChange(e) {
        console.log(e);
        this.setData({
            index: e.detail.value
        })
    },

    jump2Home:function(){
        wx.switchTab({
            url: '../home/home',
        })
    },

    formreset: function(){
        
    },

    hideModal: function(e){
        var _this = this;
        if(_this.data.isJump){
            this.jump2Index();
        }else{
            this.setData({
                isHide: true,
                isJump: false
            });
        }   
    },

    jump2User: function(){
        wx.switchTab({
            url: '../user/user',
        })
    },

    formsubmit: function (data) {
        var _this = this;
        //console.log(data.detail.value);
        var userId = data.detail.value["userId"];
        var password = data.detail.value["password"];
        var identity = _this.data.index;
        //console.log(identity);
        if(userId != '' && password != '' && identity != ''){
            wx.request({
                method: 'GET',
                url: 'http://127.0.0.1:8080/work/login',
                data:{
                    userId: userId,
                    password: password,
                    identity: identity
                },
                success: function (res) {
                    let resMessage = res.data;
                    console.log(resMessage);
                    if (resMessage.status == 'success') {
                        //登录成功
                        //wx.setStorageSync("userId", userId);
                        //wx.setStorageSync("password", password);
                        wx.setStorageSync("identity", identity);
                        getApp().globalData.identity = identity;
                        wx.setStorageSync("userData", res.data.data);
                        _this.setData({
                            isHide: false,
                            isJump: true,
                            title:'登录成功',
                            message: '欢迎你, ' + resMessage.data.name + gData.picker[identity] + ' !'
                        });
                    }else{
                        _this.setData({
                            isHide: false,
                            title: '登录失败',
                            message: 'ID或密码错误!'
                        });
                    }
                }
            });
        }else{
            if(userId == ''){
                _this.setData({
                    isHide: false,
                    title: '用户名为空',
                    message: '请填写用户名'
                });
            }else if(password == ''){
                _this.setData({
                    isHide: false,
                    title: '密码为空',
                    message: '请填写密码'
                });
            }else{
                _this.setData({
                    isHide: false,
                    title: '未选择身份',
                    message: '请选择用户身份'
                });
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        gData = this.data;
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