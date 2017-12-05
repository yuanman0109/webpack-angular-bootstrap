export default class PaymentConfigService {
  constructor($http, PublicServer) {
    this.$http = $http;
    this.PublicServer = PublicServer;
  }
  //获取支付列表
  getPaymentlist(parm) {
    return this
      .PublicServer
      .get('/customer/payconfig', parm);
  }
  //停用
  disable(id, data, _successMsg) {
    return this
      .PublicServer
      .put('/customer/payconfig/state/' + id, data, _successMsg);
  }
 
  //切换支付通道
  channelSwitch(id, data, _successMsg) {
    return this
      .PublicServer
      .put('/customer/payconfig/pass/' + id, data, _successMsg);
  }
  //查看支付通道
  getChannelSwitch(id) {
    return this
      .PublicServer
      .get('/customer/payconfig/pass/' + id);
  }
  //支付详情
  Details(id) {
    return this
      .PublicServer
      .get('/customer/payconfig/' + id);
  }
  //保存
  Save(id, data, _successMsg) {
    return this
      .PublicServer
      .put('/customer/payconfig/' + id, data, _successMsg);
  }
  //新建添加
  Add(data, _successMsg) {
    return this
      .PublicServer
      .post('/customer/payconfig', data, _successMsg);
  }
}
PaymentConfigService.$inject = ['$http', 'PublicServer'];