// pages/search/search.js
const requestMap = getApp().globalData.requestMap;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        elements:[{
            title: '学期查询',
            name: 'term',
            color: 'cyan',
            icon: 'searchlist'
        },
        {
            title: '时间段查询',
            name: 'period',
            color: 'olive',
            icon: 'countdown'
        },
        {
            title: '类型查询',
            name: 'type',
            color: 'green',
            icon: 'similar'
        }]
    },

    searchForVacate: function (typeName) {
        let lower = typeName.toLowerCase();
        var _this = this;
        this.setData({
            loadModal: true
        });
        wx.request({
            method: 'GET',
            url: requestMap + '/vacate/search',
            data: {
                userId: wx.getStorageSync("userData").id,
                identity: wx.getStorageSync("identity"),
                type:typeName
            },
            success: function (res) {
                let resMessage = res.data;
                wx.setStorageSync(typeName, resMessage.data);
                console.log(resMessage.data);
                wx.navigateTo({
                    url: '../vacate/' + lower + '/' + lower,
                })
                _this.setData({
                    loadModal: false
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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