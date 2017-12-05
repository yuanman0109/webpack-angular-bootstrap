export default class monitorService {
  constructor(PublicServer) {
    this.PublicServer = PublicServer;
  }
  // 会员监控
  getValidCouponList(data, _successMsg) {
    return this.PublicServer.get('/coupon/getValidCouponList', data, _successMsg);    
  }
  // 获取客户名称
  getStoreId(name) {
    return this.PublicServer.get('/customer/stores', {
      'searchStr': name
    });
  }
  getSendCouponList(data, _successMsg) {
    return this.PublicServer.get('/coupons/getSendCouponList', data, _successMsg);        
  }
}
monitorService.$inject = ['PublicServer'];