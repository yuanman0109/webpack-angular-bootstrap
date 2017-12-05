const _init_ = Symbol('_init_');
export default class CustomerDetailCtrl {
  constructor($http, $stateParams, CusService, basicConfig, $uibModal) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.CusService = CusService;
    this.basicConfig = basicConfig;
    this.$uibModal = $uibModal;
    this.customerDetail = {};
    this.normalImg = require('../../../images/normal.png');
    this[_init_]();
  }
  [_init_]() {
    let customerId = this.$stateParams.id;
    this.getCustomerDetail(customerId);
  }
    //获取门店详情
  getCustomerDetail(id) {
    let _that = this;
    _that.CusService.getCustomerDetail(id).then(function(data) {
      _that.basicConfig.callback(data, function(data) {
        _that.customerDetail = data.data;
        console.log(_that.customerDetail);
      });
    }, _that.basicConfig.errorCallback);
  };
    //地图
  openMap() {
    let _that = this;
    let $uibModal = this.$uibModal;
    let fn = function ($uibModalInstance) {
      var $ctrl = this;
      $ctrl.cancel = function () {
        $uibModalInstance.dismiss();
      };
      $ctrl.addXY = [_that.customerDetail.poiLng, _that.customerDetail.poiLat];
    };
    fn.$inject = ['$uibModalInstance'];
    $uibModal.open({
      size: 'lg',
      templateUrl: 'openMap.html',
      controller: fn,
      controllerAs: '$ctrl'
    }).result.then(function () {
      console.log('ok');
    }, function () {
      console.log('cancle');
    });
  };
}
CustomerDetailCtrl.$inject = ['$http', '$stateParams', 'CusService', 'basicConfig', '$uibModal'];