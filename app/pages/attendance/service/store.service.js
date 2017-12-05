'use strict';

export default class storeService {
  constructor($http, PublicServer) {
    this.PublicServer = PublicServer;
    console.log('...store service init...');
  }

  // 建店审核
  getVerifyList(data, _successMsg) {
    return this
      .PublicServer
      .get('/customer/sourcestore/audits', data, _successMsg);
  }

  // 审核详情
  getVerifyDetail(id, _successMsg) {
    return this
      .PublicServer
      .get('/customer/sourcestore/audits/' + id);
  }

  // 企业查询
  getCompanyId(data, _successMsg) {
    return this
      .PublicServer
      .get('/customer/companies', data, _successMsg);
  }

  // 品牌查询
  getBrandId(data, _successMsg) {
    return this
      .PublicServer
      .get('/customer/brands', data, _successMsg);
  }

  // 审核弹窗确定按钮
  getVerify(id, data) {
    return this
      .PublicServer
      .put('/customer/sourcestore/audits/' + id, data);
  }

  // 生成账号
  geneAccount(id) {
    return this
      .PublicServer
      .get('/customer/sourcestore/accounts/' + id);
  }
  // 获取审核日志
  getVerifyLog(data) {
    return this
      .PublicServer
      .get('/customer/sourcestores/audits/history', data);
  }
   // 获取单个私海记录详情
  getSeaLog(data) {
    return this
      .PublicServer
      .get('/customer/sourcestores/details', data);
  }
  // 获取支付中心的省列表
  getAreasList(data) {
    return this
      .PublicServer
      .get('/cfg/bwpay/areas/_list', data);
  }
  //  获取支付中心市列表
  getCityList(code, data) {
    return this
      .PublicServer
      .get('/cfg/bwpay/areas/' + code + '/subs', data);
  }
    //获取银行
  getBank() {
    return this.PublicServer.get('/cfg/banks');
  }
   // 获取支付中心银行列表
  getBankList(data) {
    return this.PublicServer.get('/cfg/bwpay/bank/_list', data);
  }
    //获取支行
  getSubBank(data) {
    return this.PublicServer.get('/cfg/bwpay/bank_union/_list', data);
  }
}

storeService.$inject = ['$http', 'PublicServer'];