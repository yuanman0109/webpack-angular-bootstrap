const _init_ = Symbol('_init_');
export default class CompDetailCtrl {
  constructor ($http, $stateParams, CompService, basicConfig) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.CompService = CompService;
    this.basicConfig = basicConfig;
    this.compDetail = {};
    this[_init_]();
  }
  [_init_]() {
    let comId = this.$stateParams.id;
    this.getCompDetail(comId);
  }
    //获取企业详情
  getCompDetail(id) {
    let _that = this;
    _that.CompService.getCompDetail(id).then(function(data) {
      _that.basicConfig.callback(data, function(data) {
        _that.compDetail = data.data;
        console.log(_that.compDetail);
      });
    }, _that.basicConfig.errorCallback);
  }
}
CompDetailCtrl.$inject = ['$http', '$stateParams', 'CompService', 'basicConfig'];