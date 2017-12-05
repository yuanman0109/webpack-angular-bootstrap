'use strict';
export default class toolService {
  constructor($http, PublicServer) {
    this.PublicServer = PublicServer;
    console.log('...tool service init...');
  }

  // 支付订单详情查询
  getOrderDeatil(no) {
    return this
      .PublicServer
      .get('/pay_order/' + no + '/detail');
  }

  // 快餐订单列表
  getFastFoodList(data, _successMsg) {
    return this
      .PublicServer
      .get('/fastFoodOrders', data, _successMsg);
  }

  // 快餐订单详情
  getFastOrderDeatil(data, _successMsg) {
    return this.PublicServer.get('/fastFoodOrders/detail', data, _successMsg);
  }

  // 获取客户名称
  getStoreId(name) {
    return this.PublicServer.get('/customer/stores', {
      'searchStr': name
    });
  }
  //支付订单列表
  getPayOrderList(data) {
    return this.PublicServer.get('/pay_order_v2', data);
  }
  //支付订单详情
  getPayOrderDetail(no) {
    return this.PublicServer.get(`/pay_order_v2/${no}/detail`);
  }
}

toolService.$inject = ['$http', 'PublicServer'];