export default class QrcodeService {
  constructor($http, PublicServer) {
    this.$http = $http;
    this.PublicServer = PublicServer;
  }
  //获取二维码列表
  getQrcodelist(parm, _successMsg) {
    return this
      .PublicServer
      .get('/barcodes', parm, _successMsg);
  }

  // 获取模板列表
  getTemplatelist(_successMsg) {
    return this
      .PublicServer
      .get('/barcode_templates/_list', null, _successMsg);
  }
  // 二维码下载
  QrcodeDownload(token, data, _successMsg) {
    return this
      .PublicServer
      .post('/barcodes/download?access_token=' + token, data, _successMsg);
  }
  // 生成二维码
  generatorQrcode(token, data, _successMsg) {
    return this
      .PublicServer
      .post('/barcodes?access_token=' + token, data, _successMsg);
  }
}
QrcodeService.$inject = ['$http', 'PublicServer'];