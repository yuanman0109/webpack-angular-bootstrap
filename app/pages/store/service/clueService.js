export default class ClueService {
  constructor($http, PublicServer, ExportService) {
    Object.assign(this, {$http, PublicServer, ExportService});
  }
  //获取线索列表
  getCluelist(data) {
    return this.PublicServer.get('/customer/clues', data);
  }
  //编辑线索
  editClue(data, _successMsg) {
    return this.PublicServer.put('/customer/clues', data, _successMsg);
  }
  //获取来源
  getSource() {
    return this.PublicServer.get('/cfg/dictionaries/CLUE_SOURCE');
  }
  // 线索详情
  getDetails(id) {
    return this.PublicServer.get('/customer/clues/' + id);
  }
  //模糊搜索user
  getUserSearch(data) {
    return this.PublicServer.get('/sys/users/_search', data);
  }
  //模糊搜索品牌brand
  getBrandSearch(data) {
    return this.PublicServer.get('/customer/brands', data);
  }
  //模糊搜索city
  getCity(data) {
    return this.PublicServer.get('/cfg/citys', data);
  }
  //获取业务类型
  getBusinessType() {
    return this.PublicServer.get('/customer/businesses');
  }
}
ClueService.$inject = ['$http', 'PublicServer', 'ExportService'];