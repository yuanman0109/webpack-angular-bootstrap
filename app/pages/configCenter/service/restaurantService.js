export default class RestaurantService {
  constructor($http, PublicServer) {
    this.$http = $http;
    this.PublicServer = PublicServer;
  }
  //获取列表
  getList(parm) {
    return this
      .PublicServer
      .get('/customer/restaurants', parm);
  }
}
RestaurantService.$inject = ['$http', 'PublicServer'];