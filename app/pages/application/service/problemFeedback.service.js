export default class problemFeedbackService {
  constructor($http, PublicServer) {
    this.$http = $http;
    this.PublicServer = PublicServer;
  }
  //问题反馈列表
  getList(params) {
    return this.PublicServer.get('/questionFeedbacks/_pc', params);
  }
  getDetail(id) {
    return this.PublicServer.get('/questionFeedbacks/' + id + '/detail')
  }
  // 获取产品名称
  getProduct(dictCode) {
    return this.PublicServer.get('/cfg/dictionaries/' + dictCode);
  } 
}
problemFeedbackService.$inject = ['$http', 'PublicServer'];