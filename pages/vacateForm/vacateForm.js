// pages/vacateForm/vacateForm.js
let app = getApp();
let util = require('../../utils/util.js');
const requestMap = app.globalData.requestMap;
let gData;
let user;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentDate: '',
        //进入权限
        showIdentity:false,
        flag:true,
        idtentityMessage:'',
        submitTime:'',
        startDate: '',
        endDate: '',
        index:null,
        //显示请假理由
        showResult:false,
        picker: ['病假', '事假', '学院学生辅助工作', '其它(请描述原因)'],
        courseList:[],
        //暂存选择的课程ID
        tempIndex:[],
        //暂存选择的课程ID
        selectedIndex:[],
        //存储选择的课程对象
        selectedList:[],
        //显示全部课程
        showDialog: false,
        //显示已选择的课程
        showList:false,
        //显示结果框
        showResponse:false,
        response:'',
        name:''
    },

    //请求课程列表
    showDialog:function(){
        var _this = this;
        /*if(this.data.startDate == ''){
            console.log("开始时间为空");
            return false;
        }
        if (this.data.endDate == '') {
            console.log("结束时间为空");
            return false;
        }*/
        wx.request({
            method:'GET',
            url: requestMap + '/student/findCourse',
            data:{
                stuId: user.id,
                startDate: this.data.startDate,
                endDate: this.data.endDate
            },
            success:function(res){
                console.log(res.data);
                _this.setData({
                    courseList: res.data                        
                });
            }
        });
        _this.setData({
            showDialog: true
        });
    },

    //数据清空
    refresh:function(){
        /*if (getCurrentPages().length != 0) {
            getCurrentPages()[getCurrentPages().length - 1].onLoad();
        }*/
        this.setData({
            startDate:'',
            endDate: '',
            index:null,
            courseList:[],
            selectedList:[],
            showResult:false
        })
    },

    hideResponse:function(){
        this.setData({
            showResponse:false
        });
        if(gData.response.status == 'success'){
            this.refresh();
        }
    },

    //隐藏模态窗口
    hideDialog: function(){
        this.setData({
            showDialog: false
        });
    },

    //多选框状态改变事件
    checkboxChange:function(e){
        this.setData({
            tempIndex: e.detail.value
        });
    },

    cancel: function(){
        this.hideDialog();
    },

    //模态框，确认按钮事件
    confirm: function(){
        var _this = this;
        var temp = [];
        //为缓存添加课程对象
        gData.tempIndex.forEach((item) => {
            temp.push(gData.courseList[item]);
        });

        _this.setData({
            selectedList: temp,
            selectedIndex: gData.tempIndex,
            showList: gData.tempIndex.length != 0
        });
        /*console.log(gData.selectedList);
        console.log(gData.selectedIndex);
        console.log(gData.showList);*/
        this.hideDialog();
    },

    PickerChange(e) {
        //console.log(e);
        this.setData({
            index: e.detail.value,
            showResult:e.detail.value == 3,
        });
        //console.log(this.data.showResult);
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

    formSubmit:function(data){
        var _this = this;
        var stuName = data.detail.value['stuName'];
        var typeIndex = gData.index;
        var result = data.detail.value['result'];
        var selectedId = [];
        gData.selectedList.forEach( (item) => {
            selectedId.push(item.course_id);
        });
        selectedId = selectedId.join(',');
        //result可能未定义
        result = result == null?'':result;
        //console.log(selectedId);
        wx.request({
            method: 'GET',
            url: requestMap + '/student/addVacate',
            data: {
                stuName: stuName,
                submitTime: util.formatTime(new Date()),
                startDate: gData.startDate,
                endDate: gData.endDate,
                typeIndex: typeIndex,
                result: result,
                courses:selectedId
            },
            success:function(res){
                console.log(res.data);
                _this.setData({
                    response: res.data,
                    showResponse:true
                });
            }
        });
    },

    jump2Login:function(){
        /*未实现的功能*/
        this.setData({
            showIdentity: false,
        });
        let pages = getCurrentPages();
        let url = pages[pages.length - 1].route;
        if (url != 'pages/login/login'){
            wx.navigateTo({
                url: '/pages/login/login',
            });
        }
    },

    hideIntentity:function(){
        this.setData({
            showIdentity: false
        });
        wx.switchTab({
            url:'../home/home'
        });
    },

    judgeIdentity:function(){
        let _this = this;
        let identity = wx.getStorageSync('identity');
        user = wx.getStorageSync('userData');
        if(user == ''){
            this.setData({
                idtentityMessage: '请先登录!\n3秒后跳转',
                showIdentity: true,
                flag: true
            });
            setTimeout(function () {
                _this.jump2Login();
            }, 3000);
        }else{
            if(identity != '0'){
                this.setData({
                    idtentityMessage: '无权限查看',
                    showIdentity: true,
                    flag: false
                });
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        gData = this.data;

        let date = new Date();
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        gData.currentDate = Y+'-'+M+'-'+D;
        console.log(gData.currentDate);
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
        this.setData({
            name:user.name
        });
        this.judgeIdentity();
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