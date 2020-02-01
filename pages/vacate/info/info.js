// pages/vacate/info/info.js
let gData;
const requestMap = getApp().globalData.requestMap;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stepList: ['辅导员', '教务', '任课教师'],
        iconList: ['roundclosefill', 'radioboxfill', 'roundcheckfill'],
        //取值0,1,2
        step: '',
        status: '',
        vacateData:'',
        courseList:'',
        identity:'',
        showButton:false
    },

    returnBack: function () {
        let vacate_id = gData.vacateData.vacate.vacate_id;
        console.log(vacate_id);
        wx.request({
            method: 'GET',
            url: requestMap + '/student/trash/add',
            data: {
                userId: wx.getStorageSync("userData").id,
                vacate_id: vacate_id
            },
            success: function (res) {
                console.log(res.data);
                //填入新的数据
                wx.setStorageSync("Audit", res.data);
                wx.navigateBack({
                    delta: 1
                })
            }
        });
    },

    findCourse:function(){
        let _this = this;
        let course = gData.vacateData.vacate.course_list;
        wx.request({
            method: 'GET',
            url: requestMap + '/student/findCourseName',
            data:{
                course: course
            },
            success:function(res){
                console.log(res.data);
                _this.setData({
                    courseList: res.data.data
                });
            }
        })
    },

    buttonClick: function(e){
        console.log(e);
        let upStatus = e.currentTarget.dataset.upstatus;
        let identity = this.data.identity;
        let url = requestMap;
        if (identity == 2) {
            url = url + "/edu/verified";
        } else {
            url = url + "/tutor/verified";
        }
        wx.request({
            method: 'GET',
            url: url,
            data: {
                userId: wx.getStorageSync("userData").id,
                vacate_id: gData.vacateData.vacate.vacate_id,
                identity: wx.getStorageSync("identity"),
                upStatus: upStatus
            },
            success: function (res) {
                console.log(res.data);
                wx.setStorageSync("Audit", res.data);
                wx.navigateBack({
                    delta:1
                })
            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        gData = this.data;
        this.setData({
            identity: wx.getStorageSync("identity"),
            vacateData:JSON.parse(options.vacateData),
            showButton:options.showButton
        });
        console.log(gData.vacateData);
        //进入页面后查询课程名称
        this.findCourse();
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
        let temp = gData.vacateData;
        this.setData({
            step:temp.step,
            status: temp.status
        });
        console.log(gData.identity);
        console.log(gData.step + "+" + gData.status);
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