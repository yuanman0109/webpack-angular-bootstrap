export default class headerService {
  constructor($http, PublicServer) {
    this.$http = $http;
    this.PublicServer = PublicServer;
  }
  //获取登录用户信息
  getUserInfo() {
    return this.PublicServer.get('/sys/users/auth_user');
  }
  //获取当前角色信息
  getRoleInfo(id) {
    return this.PublicServer.get('/sys/roles/' + id);
  }
  loginOut() {
    return this.PublicServer.post(loginURL + '/user/logout', null, null, true);
  }
  updatePwd(data, _successMsg) {
    return this.PublicServer.put(loginURL + '/user', data, _successMsg, null, true);
  }
  //  消息列表
  getMessageList(data, _successMsg) {
    return this
      .PublicServer
      .get('/message/notices/list', data, _successMsg);
  }
  //   消息列表统计
  getMessage(data, _successMsg) {
    return this
      .PublicServer
      .get('/message/notices', data, _successMsg);
  }
  //    消息状态修改
  putMessage(id, data) {
    return this
      .PublicServer
      .put('/message/notices/' + id + '?status=READ', data);
  }
}
headerService.$inject = ['$http', 'PublicServer'];