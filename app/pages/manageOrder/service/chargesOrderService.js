export default class ChargesOrderService {
  constructor(PublicServer) {
    this.PublicServer = PublicServer;
  }
  // 获取服务费订单列表
  getChargesOrderLists(params) {
    return this.PublicServer.get('/orders/_pc', params, null, false);
  }
  // 获取订单详细信息
  getOrderDetail(id) {
    return this.PublicServer.get('/orders/' + id + '/detail', null, null, false);
  } 
  // 取消订单
  cancleOrder(id) {
    return this.PublicServer.put('/orders/' + id + '/cancel');
  } 
  // 改价
  changeChargePrice(newPrice) {
    return this.PublicServer.put('/orders/changePrice', newPrice);
  } 
}
ChargesOrderService.$inject = ['PublicServer'];