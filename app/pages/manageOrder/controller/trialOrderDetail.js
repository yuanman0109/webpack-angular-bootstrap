'use strict';

const _init_ = Symbol('_init_');

class TrialOrderDetailCtrl {
  constructor($state, TrialOrdersService, $stateParams) {
    Object.assign(this, {$state, TrialOrdersService, $stateParams});
      // 订单状态
    this.status = {
      'USED': '已抵扣',
      'NOT_PAY': '未支付',
      'PAYED': '已支付'
    };
    // 支付方式
    this.payType = {
      'WEIXIN': '微信',
      'ALIPAY': '支付宝'
    };
    this[_init_]();
  }
  [_init_]() {
    this.getDetails(this.params);
  }
  //获取模板列表
  getDetails(params) {
    const _that = this;
    _that.TrialOrdersService.getDetail(this.$stateParams.id).then(data => {
      _that.details = data;
      console.log(_that.details);
    });
  }
}
TrialOrderDetailCtrl.$inject = ['$state', 'TrialOrdersService', '$stateParams'];

export default angular.module('TrialOrderDetailModule', [])
  .controller('TrialOrderDetailCtrl', TrialOrderDetailCtrl)
  .name;