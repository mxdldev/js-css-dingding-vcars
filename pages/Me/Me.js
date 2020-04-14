Page({
  data: {
    cargroup:[],
  },
  onLoad() {
    console.info("onLoad start:" + getApp().session.Name);

    //var pages = getCurrentPages();
    //var prevPage = pages[pages.length - 2];
    //var vehicleId = prevPage.data.vehicle.Id;
    //var groupId = prevPage.data.vehicle.Id;

    this.getCarGroup();
  },
  getCarGroup() {
    console.info('getCarGroup start...');
    
    //获取车辆列表开始
    var url = 'http://10.1.11.125:9009/Vehicle/GetVehicleGroupList?authCode=' + getApp().session.authCode
    var that = this;
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
        console.info('getCarGroup success...');
        console.info(JSON.stringify(res.data));

        that.setData({
          cargroup: JSON.parse(res.data),
        })

      },
      fail: function (res) {
        console.info('getCarGroup fail...');
        console.info(JSON.stringify(res));

      },
      complete: function (res) {
        console.info('getCarGroup complete...');
      }
    });
  },
  onAddCarGroup(){
    console.info("onAddCarGroup start...");
  }
});
