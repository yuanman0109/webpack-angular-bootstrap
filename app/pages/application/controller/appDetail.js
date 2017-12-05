const _init_ = Symbol('_init_');
class AppDetailCtrl {
  constructor(AppService, $stateParams) {
    this.AppService = AppService;
    this.$stateParams = $stateParams;
    this.appTypes = {
      'IOS': 'IOS',
      'ANDROID': '安卓'
    };
    this[_init_]();
  }[_init_]() {
    this.getAppDetail(this.$stateParams.id);
  }
  //获取app详情
  getAppDetail(id) {
    let _that = this;
    _that
      .AppService
      .getAppDetail(id)
      .then(data => {
        _that.appDetail = data;
      }, err => {
        console.log(err);
      });
  }
}
AppDetailCtrl.$inject = ['AppService', '$stateParams'];
export default angular.module('AppDetailModule', [])
  .controller('AppDetailCtrl', AppDetailCtrl)
  .name;