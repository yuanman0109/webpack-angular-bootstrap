const _init_ = Symbol('_init_');
class fastFoodDetailCtrl {
  constructor(toolService, $stateParams) {
    var status = {
      3: '待支付',
      4: '已完成',
      5: '手动取消',
      6: '自动取消',
      7: '已退款'
    };
    var type = {
      4: '微信扫描',
      5: '支付宝扫描'
    };
    var payType = {
      1: '微信',
      2: '线下',
      3: '支付宝'
    };
    Object.assign(this, {
      toolService,
      $stateParams,
      status,
      payType,
      type
    });
    this[_init_]();
  }
  [_init_]() {
    console.log('init tool fastFoodDetail ctrl');
    this.getParame = {
      storeId: this.$stateParams.storeId,
      id: this.$stateParams.id
    };
    this.getFastOrder(this.getParame);
  }

  // 订单详情
  getFastOrder(id) {
    let _that = this;
    _that
    .toolService
    .getFastOrderDeatil(id)
    .then((res) => {
      _that.orderDetail = res;
      _that.food = res.foods; 
      console.log(res);
    });
  }
}

fastFoodDetailCtrl.$inject = ['toolService', '$stateParams'];
export default angular.module('fastFoodDetailCtrl', [])
  .controller('fastFoodDetailCtrl', fastFoodDetailCtrl)
  .name;
