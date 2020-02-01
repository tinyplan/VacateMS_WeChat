// pages/vacate/pass/pass.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        identity: null,
        vacateList: []
    },

    moreInfo: function (e) {
        let index = e.currentTarget.dataset.index;
        var _this = this;
        wx.navigateTo({
            url: '../info/info?vacateData=' + JSON.stringify(_this.data.vacateList[index]),
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            identity: wx.getStorageSync("identity")
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
        let auditVacate = wx.getStorageSync("Pass");
        this.setData({
            vacateList: auditVacate == null?[]:auditVacate
        });
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