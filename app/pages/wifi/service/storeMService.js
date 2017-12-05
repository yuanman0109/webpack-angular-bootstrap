export default class StoreMService {
  constructor($http, basicConfig, Upload) {
      this.$http = $http;
      this.basicConfig = basicConfig;
      this.Upload = Upload;
    }
    // 获取门店列表
  getStorelist(parme) {
      return this.$http(this.basicConfig.getRequestConfig('/devices/monitor/_store', 'GET', parme))
    }
    // 获取门店详情
  getStoreDetail(parme) {
      return this.$http(this.basicConfig.getRequestConfig('/devices/monitor/_store', 'GET', parme))
    }
    // 设备重启
  rebootDev(data, type) {
      switch (type) {
        case 'single': //单操作
          return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/monitor/reboot/' + data, 'POST'))
          break;
        case 'multiple': //多操作
          return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/monitor/reboot/', 'POST', data))
          break;
      }
    }
    // 批量添加设备
  multipleAddDev(data) {
      return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/monitor', 'POST', data))
    }
    // 文件上传
  uploadFiles(file, errFiles) {
    let _that = this;
    if (file) {
      file.upload = this.Upload.upload({
        url: '/devices/monitor/_store',
        data: { file: file }
      });
    }
  }
}
StoreMService.$inject = ['$http', 'basicConfig', 'Upload'];