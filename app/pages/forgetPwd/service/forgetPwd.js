export default class forgetPwdService {
  constructor($http, PublicServer) {
    this.$http = $http;
    this.PublicServer = PublicServer;
  }
  //发送邮件
  sendMail(data, _successMsg) {
    return this
      .PublicServer
      .post(loginURL + '/mail', data, _successMsg, true);
  }
  setPwd(data) {
    return this
      .PublicServer
      .put(loginURL + '/user-by-code', data, false, true);
  }
}
forgetPwdService.$inject = ['$http', 'PublicServer'];