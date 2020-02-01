// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show:false,
        userData:'',
        list:[
            {
                name:'slide-bottom',
                title:'修改密码',
                color:'cyan',
                bindtap:'clickEdit'
            },
            {
                name: 'slide-bottom',
                title:'退出登录',
                color:'blue',
                bindtap:'clickOut'
            }
        ]
    },

    toggle:function(e) {
        console.log(e);
        var anmiaton = e.currentTarget.dataset.class;
        console.log(anmiaton);
        var that = this;
        that.setData({
            animation: anmiaton
        })
        setTimeout(function () {
            that.setData({
                animation: ''
            })
        }, 1000)
    },

    clickEdit:function(e){
        wx.navigateTo({
            url: '../changePwd/changePwd',
        })
        console.log("edit");
    },

    clickOut:function(e){
        wx.removeStorageSync('userData');
        this.onLoad();
    },

    toLogin: function(){
        wx.navigateTo({
            url: '../login/login',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let userData = wx.getStorageSync("userData");
        if(userData != ''){
            this.setData({
                userData: userData,
                show:true
            });
        }else{
            this.setData({
                userData: userData,
                show: false
            });
            setTimeout(function(){
                wx.navigateTo({
                    url: '../login/login',
                });
            },2000);
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let userData = wx.getStorageSync("userData");
        if (userData != '') {
            this.setData({
                userData: userData,
                show: true
            });
        }else{
            this.setData({
                userData: userData,
                show:false
            });
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