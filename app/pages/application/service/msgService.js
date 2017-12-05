export default class AppService {
  constructor(PublicServer) {
    Object.assign(this, {PublicServer});
  }
  //获取消息详情
  getMsgDetail(infoId) {
    return this.PublicServer.get(`/management/sys/info/${infoId}`);
  }
  //系统消息
  getWinmsd(data) {
    return this.PublicServer.get('/management/sys/info/_page', data);
  }
  //新增系统消息
  getAddWinmsd(data, _sucessMsg) {
    return this.PublicServer.post('/management/sys/info', data, _sucessMsg);
  }
  // 撤回消息
  recall(id, data, _sucessMsg) {
    return this.PublicServer.put('/management/sys/info/status/' + id, data, _sucessMsg);
  }
}
AppService.$inject = ['PublicServer'];