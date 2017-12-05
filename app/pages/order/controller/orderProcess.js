const _init_ = Symbol('_init_');

class orderProCtrl {
  constructor($stateParams, orderService, $filter, ImgLightbox) {
    Object.assign(this, {
      orderService,
      $stateParams,
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
    console.log('...init order process ctrl');
    let myOrderId = this.$stateParams.id;
    this.getMyOrder(myOrderId);
  }

  // 我的工单详情列表
  getMyOrder(id) {
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

  // 查看图片
  openLightboxModal (images, index) {
    this.ImgLightbox.openModal(images, index);
  };

  //获取工单历史日志
  getOrderLog(params) {
    const _that = this;
    _that.orderService.getOrderLog(params).then((data) => {
      _that.orderLog = data.list;
    });
  }
}

orderProCtrl.$inject = ['$stateParams', 'orderService', '$filter', 'ImgLightbox'];
export default angular.module('orderProcess', [])
  .controller('orderProCtrl', orderProCtrl)
  .name;