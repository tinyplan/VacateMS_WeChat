// pages/vacate/trash/trash.js
const requestMap = getApp().globalData.requestMap;
let gData;
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
            url: '../info/info?vacateData=' + JSON.stringify(_this.data.vacateList[index])
        });
    },

    reSubmit: function(e){
        let _this = this;
        let index = e.currentTarget.dataset.index;
        let vacate = gData.vacateList[index].vacate;
        wx.request({
            method: 'GET',
            url: requestMap + '/student/trash/reSubmit',
            data: {
                userId: vacate.stu_id,
                vacate_id: vacate.vacate_id
            },
            success: function(res){
                console.log(res.data);
                wx.setStorageSync("Trash", res.data);
                _this.onShow();
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        gData = this.data;
        let temp = wx.getStorageSync("Trash");
        this.setData({
            vacateList: temp,
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
        this.setData({
            vacateList: wx.getStorageSync("Trash")
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