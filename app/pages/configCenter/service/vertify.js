export default class VertifyService {
  constructor(PublicServer) {
    this.PublicServer = PublicServer;
  }
    //进件查询
  queryAll(data, callback) {
    this.PublicServer.get('/customer/cases/audit/_page', data).then(callback);
  }
  queryById(id, success, err) {
    this.PublicServer.get('/customer/cases/' + id).then(success, err);
  }
  verify(data, success, err) {
    let url = '/customer/cases/' + data.status.toLowerCase();
    this.PublicServer.post(url, data).then(success, err);
  }
  //获取进件审核记录
  getVerifyLog(caseId, callback) {
    this.PublicServer.get('/customer/cases/' + caseId + '/audit_result').then(callback);
  }
  //进件辅助信息详情接口
  getAssistInfo(data) {
    return this.PublicServer.get('/customer/cases/assist', data);
  }
  //获取更多辅助
  getMoreAssist(caseId) {
    return this.PublicServer.get(`/customer/cases/${caseId}/change_result`);
  }
}
VertifyService.$inject = ['PublicServer'];
