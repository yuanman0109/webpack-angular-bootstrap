export default class CompService {
  constructor($http, PublicServer) {
    this.$http = $http;
    this.PublicServer = PublicServer;
  };
    //保存企业
  saveComp(data) {
    return this.PublicServer.post('/customer/companies', data);
  }
    //修改企业
  modifyComp(data) {
    return this.PublicServer.put('/customer/companies', data);
  }
    //修改品牌
  modifyBrand(data) {
    return this.PublicServer.put('/customer/companies/' + data.id + '/brands', data);
  }
    //保存签约
  saveContract(data) {
    return this.PublicServer.put('/customer/companies/' + data.id + '/contracts', data);
  }
    //获取企业规模
  getDictionory() {
    return this.PublicServer.get('/cfg/dictionaries/COMPANY_SCALE');
  }
    //获取客户类型
  getCustomerType() {
    return this.PublicServer.get('/cfg/dictionaries/CUSTOMER_TYPE');
  }
    //获取签约业务
  getBusiness() {
    return this.PublicServer.get('/cfg/dictionaries/BUSINESS_TYPE');
  }
    //获取银行
  getBank() {
    return this.PublicServer.get('/cfg/banks');
  }
    //获取支行
  getSubBank(parentCode, data) {
    return this.PublicServer.get('/cfg/banks/' + parentCode + '/subs', data);
  }
    //获取企业详情
  getCompDetail(id) {
    return this.PublicServer.get('/customer/companies/' + id);
  }
    //获取客户来源
  getCustomerSource() {
    return this.PublicServer.get('/cfg/dictionaries/CUSTOMER_SOURCE/');
  }
}
CompService.$inject = ['$http', 'PublicServer'];