const _init_ = Symbol('_init_');
class AddAppCtrl {
  constructor(AppService, $state, toaster, Upload, $filter, DialogService) {
    Object.assign(this, {AppService, $state, toaster, Upload, $filter, DialogService});
    this.appTypes = [{
      code: 'IOS',
      name: 'IOS'
    }, {
      code: 'ANDROID',
      name: '安卓'
    }];
    this.params = {
      name: 'BSS',
      forceUpdated: true,
      type: 'ANDROID'
    };
    this[_init_]();
  };
  [_init_]() {
    //检验版本号
    this.checkAppVer();
  }
  //上传文件
  uploadFiles(file, errFiles) {
    const _that = this;
    if (file) {
      let isApk = file.name.endsWith('.apk');
      if (isApk) {
        var toastInstance = _that.toaster.pop({
          type: 'info',
          body: '正在上传,请稍等...',
          timeout: 1000000,
          tapToDismiss: false
        });
        let url = '/api/apk/upload';
        _that.Upload.upload({
          url: url,
          data: {
            file: file
          }
        }).then((response) => {
          _that.params.fileId = response.data.data.id;
          _that.toaster.clear(toastInstance);
        });
      } else {
        _that.toaster.pop({
          type: 'warning',
          body: '请选择.apk文件!',
          timeout: 1000,
          tapToDismiss: false
        });
      }
    }
  }
  //检测app版本
  checkAppVer() {
    const _that = this;
    _that.AppService.checkAppVer({
      name: _that.params.name,
      type: _that.params.type
    }).then(res => {
      _that.oldVers = res || 0;
    }, err => {
      console.log(err);
    });
  }
  //添加app
  addBt() {
    const _that = this;
    this.AppService.addApp(this.params).then((data) => {
      if (data) {
        this.$state.go('application.appList');
      }
    }, (err) => {
      let msg = _that.$filter('addRespErrMsg')(err.data.code);
      if (msg) {
        console.log(msg);
        _that.DialogService.showMessage(msg);
      }
    });
  }
}
AddAppCtrl.$inject = ['AppService', '$state', 'toaster', 'Upload', '$filter', 'DialogService'];
export default angular.module('AddAppModule', [])
  .controller('AddAppCtrl', AddAppCtrl)
  .name;