App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
    console.info('App onLaunch,corpId:' + options.query.corpId);
    this.session.corpId = options.query.corpId;
    console.info('session corpId:' + this.session.corpId);
  },
  onShow(options) {

    // 从后台被 scheme 重新打开
    // options.query == {number:1}
    console.info('onShow start...');

   
  },
  session: {
    corpId: '',
    authCode: '',
    userId: '',
    Name: '',
    IsAdmin: '',
    IsSuperAdmin: ''
  }
});
