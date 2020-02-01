// pages/changePwd/changePwd.js
const requestMap = getApp().globalData.requestMap;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        identity:'',
        userData:'',
        isHide:true,
        title:'',
        message:'',
        status:'error'
    },

    formsubmit:function(data){
        let newPwd = data.detail.value['newPwd'];
        let rePwd = data.detail.value['rePwd'];
        var _this = this;
        if(newPwd == rePwd){
            wx.request({
                method:'GET',
                url: requestMap + '/vacate/edit/pwd',
                data: {
                    userId: _this.data.userData.id,
                    identity: _this.data.identity,
                    newPwd: newPwd
                },
                success:function(res){
                    let response = res.data;
                    if(response.status == 'success'){
                        _this.setData({
                            isHide:false,
                            title:'成功',
                            message:response.message,
                            status:response.status
                        });
                    }else{
                        _this.setData({
                            isHide: false,
                            title: '失败',
                            message: response.message,
                            status: response.status
                        });
                    }
                }
            })
        }else{
            this.setData({
                isHide:false,
                title:'错误',
                message:'两次密码输入不一致'
            });
        }
    },

    hideModal:function(){
        this.setData({
            isHide: true
        });
        if(this.data.status == 'success'){
            wx.switchTab({
                url: '../user/user',
            });
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userData: wx.getStorageSync('userData'),
            identity: wx.getStorageSync('identity')
        });
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