// pages/vacate/audit/audit.js
const requestMap = getApp().globalData.requestMap;
let gData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        identity:null,
        vacateList: []
    },

    moreInfo:function(e){
        let index = e.currentTarget.dataset.index;
        var _this = this;
        wx.navigateTo({
            url: '../info/info?vacateData=' + JSON.stringify(_this.data.vacateList[index])+'&showButton='+true,
        });
    },

    verified:function(e){
        var _this = this;
        let index = e.currentTarget.dataset.current;
        let vacate_id = this.data.vacateList[index].vacate.vacate_id;
        let identity = wx.getStorageSync("identity");
        let url = requestMap;
        if(identity == 2){
            url = url + "/edu/verified";
        }else{
            url = url + "/tutor/verified";
        }
        console.log(vacate_id);
        wx.request({
            method: 'GET',
            url: url,
            data: {
                userId: wx.getStorageSync("userData").id,
                vacate_id: vacate_id,
                identity: identity,
                upStatus: 1
            },
            success: function(res){
                console.log(res.data);
                wx.setStorageSync("Audit", res.data);
                _this.onShow();
            }
        });
    },

    /*requestForVacate: function (type,status) {
        var _this = this;
        wx.request({
            method: 'GET',
            url: requestMap + '/vacate/find',
            data: {
                userId: wx.getStorageSync("userData").id,
                identity: wx.getStorageSync("identity"),
                status: status
            },
            success: function (res) {
                wx.setStorageSync(type, res.data.data);
            }
        });
    },*/

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        gData = this.data;
        let auditVacate = wx.getStorageSync("Audit");
        this.setData({
            vacateList: auditVacate,
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
        let auditVacate = wx.getStorageSync("Audit");
        this.setData({
            vacateList: auditVacate
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