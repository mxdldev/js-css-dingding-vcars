App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch start...');
    console.info('corpId:' + options.query.corpId);
    this.session.corpId = options.query.corpId;
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    console.info('App onShow start...');  
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
