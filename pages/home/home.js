// pages/home/home.js
const requestMap = getApp().globalData.requestMap;
let user;
let gData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        elements: [{
            title: '审批通过',
            name: 'pass',
            color: 'green',
            icon: 'roundcheck',
            bindtap:'clickPass',
            show:true
        },
        {
            title: '审核中',
            name: 'audit',
            color: 'orange',
            icon: 'loading2',
            bindtap: 'clickAudit',
            show: true
        },
        {
            title: '未通过',
            name: 'reject',
            color: 'red',
            icon: 'roundclose',
            bindtap: 'clickReject',
            show: true
        },
        {
            title: '垃圾桶',
            name: 'trash',
            color: 'grey',
            icon: 'deletefill',
            bindtap: 'clickTrash',
            show: false
        }],
        loadModal:false,
        isHide:true,
        isHide1: true,
        newCount:''
    },

    jump2Login: function () {
        this.setData({
            isHide1: true
        });
        wx.navigateTo({
            url: '../login/login',
        });
    },

    clickPass: function(){
        this.requestForVacate("Pass",1)
    },

    clickAudit: function () {
        this.requestForVacate("Audit",0)
    },

    clickReject: function () {
        this.requestForVacate("Reject",-1)
    },

    clickTrash: function () {
        wx.request({
            method: 'GET',
            url: requestMap + '/student/trash/find',
            data: {
                userId: wx.getStorageSync("userData").id
            },
            success: function(res){
                console.log(res.data);
                wx.setStorageSync("Trash", res.data);
                wx.navigateTo({
                    url: '../vacate/trash/trash'
                });
            }
        });
    },

    requestForVacate: function(type,status){
        if (user == '') {
            this.setData({
                isHide1: false
            });
            return false;
        }
        let lower = type.toLowerCase();
        console.log(status);
        var _this = this;
        this.setData({
            loadModal: true
        });
        wx.request({
            method: 'GET',
            url: requestMap + '/vacate/find',
            data: {
                userId: wx.getStorageSync("userData").id,
                identity: wx.getStorageSync("identity"),
                status: status
            },
            success: function (res) {
                let resMessage = res.data;
                wx.setStorageSync(type, resMessage.data);
                console.log(resMessage.data);
                wx.navigateTo({
                    url: '../vacate/'+lower+'/'+lower,
                })
                _this.setData({
                    loadModal: false
                });
            }
        });
    },

    hideModal: function(){
        this.setData({
            isHide: true
        });
    },

    findnew:function(){
        let _this = this;
        let identity = wx.getStorageSync('identity');
        wx.request({
            method: 'GET',
            url: requestMap + '/vacate/count',
            data: {
                userId: wx.getStorageSync('userData').id,
                identity: identity
            },
            success: function (res) {
                console.log(res.data);
                if (res.data != 0 && identity != 0) {
                    _this.setData({
                        isHide: false,
                        newCount: res.data
                    });
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        gData = this.data;
        user = wx.getStorageSync('userData');
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
        user = wx.getStorageSync('userData');
        let identity = wx.getStorageSync("identity");
        let temp = gData.elements;
        if (identity == '0') {
            temp[3].show = true;
        }else{
            temp[3].show = false;
        }
        if (identity == '3') {
            temp[2].show = false;
        }else{
            temp[2].show = true;
        }
        this.setData({
            elements: temp
        });
        if (user != '') {
            this.findnew();
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.setData({
            loadModal: false
        });
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