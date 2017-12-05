export default class trialOrdersService {
  constructor(PublicServer) {
    this.PublicServer = PublicServer;
  }
    //试用费订单列表
  getList(data) {
    return this.PublicServer.get('/trialOrders/_pc', data);
  }
  // 试用费订单详情
  getDetail(id) {
    return this.PublicServer.get('/trialOrders/' + id + '/detail');
  }
  //试用费订单导出
  export() {
    return this.PublicServer.get('/trialOrders/exportCsv');
  }
}
trialOrdersService.$inject = ['PublicServer'];
