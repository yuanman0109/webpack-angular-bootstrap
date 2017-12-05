const _init_ = Symbol('_init_');

class orderDetailCtrl {
  constructor($stateParams, orderService, $state, DialogService, $filter, ImgLightbox) {
    Object.assign(this, {
      orderService,
      $stateParams,
      $state,
      DialogService,
      $filter,
      ImgLightbox
    });
    this.imgUrl = [];
    this.orderType = {
      CREATE: '创建',
      RELEASE: '释放',
      FLOW: '转派',
      RECEIVE: '接收',
      FINISH: '完成'
    };
    this.params = {
      workOrderId: this.$stateParams.id
    };
    this[_init_]();
  }
  [_init_]() {
    console.log('...init order detail ctrl');
    let storeId = this.$stateParams.id;
    this.getOrderPool(storeId);
  }

  // 工单池详情列表
  getOrderPool(id) {
    let _that = this;
    _that
    .orderService
    .getOrderDetail(id)
    .then((res) => {
      _that.poolDetail = res;
      _that.imgUrl.push({url: _that.$filter('imgUrlWithToken')(res.url) + '&action=PREVIEW'});
      _that.getOrderLog({
        workOrderId: _that.params.workOrderId
      });
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

  //获取工单历史日志
  getOrderLog(params) {
    const _that = this;
    _that.orderService.getOrderLog(params).then((data) => {
      _that.orderLog = data.list;
    });
  }

  // 查看图片
  openLightboxModal (images, index) {
    this.ImgLightbox.openModal(images, index);
  };

  // 领取工单按钮
  getWorkOrder() {
    let _that = this;
    _that
    .orderService
    .getWorkOrder(_that.$stateParams.id, '领取成功')
    .then(() => {    
      _that.$state.go('order.orderPending', {id: _that.$stateParams.id});
    }, (err) => {
      let msg = _that.$filter('orderErrMsg')(err.data.code);
      console.log(err);
      if (msg) {
        _that
          .DialogService
          .showMessage(msg, false, 2000);
      }
    });
  }
}

orderDetailCtrl.$inject = ['$stateParams', 'orderService', '$state', 'DialogService', '$filter', 'ImgLightbox'];
export default angular.module('orderDetail', [])
  .controller('orderDetailCtrl', orderDetailCtrl)
  .name;