export default class resetPasswordService {
  constructor(ExportService, PublicServer) {
    this.ExportService = ExportService;
    this.PublicServer = PublicServer;
  }
  // 获取登陆用户信息
  getLoginUser() {
    return this.ExportService.get(loginURL + '/user', null, null, true);
  }
  // 发送验证码
  sendCode() {
    return this.ExportService.post(loginURL + '/user/send-code', null, null, true);
  }
  // 检查验证码
  checkCode(data) {
    return this.ExportService.get(loginURL + '/user/verify-code', data, null, true);
  }
  // 检查验证码
  savePassword(data) {
    return this.ExportService.put(loginURL + '/user/update-password', data, null, true);
  }
}
resetPasswordService.$inject = ['ExportService', 'PublicServer'];