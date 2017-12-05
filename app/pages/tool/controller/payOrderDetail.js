const _init_ = Symbol('_init_');
class payOrderDetailCtrl {
  constructor(toolService, $stateParams) {
    Object.assign(this, {
      toolService,
      $stateParams
    });
    this[_init_]();
  }
  [_init_]() {
    this.getPayOrderDetail(this.$stateParams.id);
  }

  // 订单详情
  getPayOrderDetail(id) {
    let _that = this;
    _that
    .toolService
    .getPayOrderDetail(id)
    .then((res) => {
      _that.order = res;
      console.log(res);
    });
  }
}

payOrderDetailCtrl.$inject = ['toolService', '$stateParams'];
export default angular.module('payOrderDetail', [])
  .controller('payOrderDetailCtrl', payOrderDetailCtrl)
  .name;
