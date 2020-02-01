// pages/search/period/period.js
let gData;
const requestMap = getApp().globalData.requestMap;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        vacateList:[],
        currentDate:'',
        startDate: '',
        endDate: ''
    },

    formSubmit: function (data) {
        let _this = this;
        let startTime = gData.startDate;
        let endTime = gData.endDate;
        console.log(startTime +'~'+endTime);
        wx.request({
            method: 'GET',
            url: requestMap + '/vacate/search/period',
            data: {
                userId: wx.getStorageSync("userData").id,
                identity: wx.getStorageSync("identity"),
                startTime: startTime,
                endTime: endTime
            },
            success: function (res) {
                console.log(res.data);
                let temp = res.data.data;
                _this.setData({
                    vacateList: temp
                });
                _this.onShow();
            }
        })
    },

    moreInfo: function (e) {
        let index = e.currentTarget.dataset.index;
        var _this = this;
        wx.navigateTo({
            url: '../../vacate/info/info?vacateData=' + JSON.stringify(_this.data.vacateList[index]),
        });
    },

    startDateChange(e) {
        this.setData({
            startDate: e.detail.value
        })
    },

    endDateChange(e) {
        this.setData({
            endDate: e.detail.value
        })
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