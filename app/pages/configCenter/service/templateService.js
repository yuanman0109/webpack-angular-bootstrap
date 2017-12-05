export default class TemplateService {
  constructor($http, PublicServer) {
    this.$http = $http;
    this.PublicServer = PublicServer;
  }
  //获取模板列表
  getTemplatelist(data) {
    return this.PublicServer.get('/barcode_templates', data);
  }
  //新建模板
  getQrcodeTpl(data) {
    return this.PublicServer.get('/qrCode', data);
  }
  //新建模板
  postTemplate(data, _successMsg) {
    return this.PublicServer.post('/barcode_templates', data, _successMsg);
  }
  //修改模板
  putTemplate(data, _successMsg) {
    return this.PublicServer.put('/barcode_templates', data, _successMsg);
  }
  //获取模板详情
  getTemplate(id) {
    return this.PublicServer.get('/barcode_templates/' + id + '/detail');
  }
  //校验模板是否重名
  checkName(data) {
    return this.PublicServer.get('/barcode_templates/exist', data);
  }
  // 获取业务类型
  getBusinesses() {
    return this.PublicServer.get('/customer/businesses');
  }
}
TemplateService.$inject = ['$http', 'PublicServer'];