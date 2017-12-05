export default class AppService {
  constructor($http, PublicServer, ExportService) {
    // this.$http = $http;
    // this.PublicServer = PublicServer;
    Object.assign(this, {$http, PublicServer, ExportService});
  }
  //获取应用名称cfg/dictionaries/:dictCode
  getAppName() {
    return this.PublicServer.get('/cfg/dictionaries/APP_NAME');
  }
  //添加app
  addApp(data) {
    return this.PublicServer.post('/app_versions', data);
  }
  //获取app列表
  getAppList(data) {
    return this.PublicServer.get('/app_versions', data);
  }
  //根据id获取app详情
  getAppDetail(id) {
    return this.PublicServer.get('/app_versions/' + id + '/detail');
  }
  //删除app
  deleteApp(ids) {
    return this.PublicServer.delete('/app_versions', {ids: ids});
  }
  //检验app版本
  checkAppVer(data) {
    return this.PublicServer.get('/app_versions/_maxVersion', data);
  }
  // 意见反馈
  getFeedBack(data) {
    return this.PublicServer.get('/management/feefback/_page', data);
  }
  
  //获取FAQ列表
  getFaqList(data) {
    return this.PublicServer.get('/management/faqs/_page', data);
  }
  //获取FAQ详情
  getFaqDetail(id) {
    return this.ExportService.get('/management/faqs/' + id);
  }
  //提交FAQ预览
  postFaqPreview(data) {
    return this.ExportService.post('/management/faqs/preview', data);
  }
  //删除FAQ
  deleteFaq(id) {
    return this.PublicServer.delete('/management/faqs/' + id);
  }
  //获取FAQ所属产品名称列表
  getFaqProductList(data) {
    return this.PublicServer.get('/cfg/dictionaries/product_name', data);
  }
  //获取FAQ问题类型列表
  getFaqTypeList(data) {
    return this.PublicServer.get('/management/question/types', data);
  }
  //获取产品下FAQ问题类型列表
  getProductFaqTypeList(data) {
    return this.PublicServer.get('/management/question/types/type/' + data);
  }
  //新增FAQ
  addFaq(data) {
    return this.PublicServer.post('/management/faqs', data);
  }
  //编辑FAQ
  editFaq(data) {
    return this.PublicServer.put('/management/faqs', data);
  }
  //新增FAQ问题类型
  addFaqType(data) {
    return this.PublicServer.post('/management/question/types', data);
  }
  //编辑FAQ问题类型
  editFaqType(data) {
    return this.PublicServer.put('/management/question/types', data);
  }
  //删除FAQ问题类型
  deleteFaqType(id) {
    return this.PublicServer.delete('/management/question/types/' + id);
  }
}
AppService.$inject = ['$http', 'PublicServer', 'ExportService'];