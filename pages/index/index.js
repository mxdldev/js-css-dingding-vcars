Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    //获取免登录访问授权码
    var that = this;
    dd.getAuthCode({
      success: function (res) {
        console.info('authCode:' + res.authCode);
        getApp().session.authCode = res.authCode;
        that.getUserInfo();
      },
      fail: function (err) {
      }
    });
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示  
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  getUserInfo() {
    //获取用户ID
    var url = 'http://123.56.26.99:9050/UserInfo/GetUserInfoByAuthCode?authCode=' + getApp().session.authCode
    var that=this;
    dd.httpRequest({
      headers: {
        "Content-Type": "application/json",
        "corpid": getApp().session.corpId,
      },
      url: url,
      timeout: 10000,
      method: 'GET',
      success: function (res) {
        console.info('success start...');
        console.info(res);

        getApp().session.userId = res.data.UserId;
        getApp().session.IsAdmin = res.data.IsAdmin;
        getApp().session.Name = res.data.Name;
        getApp().session.IsSuperAdmin = res.data.IsSuperAdmin;
        console.log('获取用户信息完毕..');

        //获取车辆列表开始
        that.getListVehicle();
        

      },
      fail: function (res) {
        console.info('fail start...');
        console.info(res);

      },
      complete: function (res) {
        console.info('complete start...');
        //console.info(res);
      }
    });
  },
  getListVehicle() {
    var url = 'http://123.56.26.99:9050/ApplyVehicle/GetVehicleUseableList?authCode=' + getApp().session.authCode

    dd.httpRequest({
      headers: {
        "Content-Type": "application/json",
        "corpid": getApp().session.corpId,
        "userid": getApp().session.userId
      },
      url: url,
      timeout: 10000,
      method: 'GET',
      dataType: 'text',
      success: function (res) {
        console.info('success start...');
        console.info(res);

      },
      fail: function (res) {
        console.info('fail start...');
        console.info(res);

      },
      complete: function (res) {
        console.info('complete start...');
        //console.info(res);
      }
    });
  },
});
