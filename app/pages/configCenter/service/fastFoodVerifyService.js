export default class FastFoodVerifyService {
  constructor($http, PublicServer) {
    this.$http = $http;
    this.PublicServer = PublicServer;
  }
  //获取快餐进件列表
  getList(parm) {
    return this
      .PublicServer
      .get('/customer/fastfoodcases/web/list', parm, null);
  }
  //进件审核
  Verify(data, _successMsg) {
    return this
      .PublicServer
      .put('/customer/fastfoodcases/audit', data, _successMsg);
  }
  //历史记录
  history(id) {
    return this
      .PublicServer
      .get('/customer/fastfoodcases/web/historyrecord', id, null);
  }
  //详情
  Details(parm) {
    return this
      .PublicServer
      .get('/customer/fastfoodcases/web/details', parm, null);
  }
}
FastFoodVerifyService.$inject = ['$http', 'PublicServer'];