const _init_ = Symbol('_init_');

class myDetailCtrl {
  constructor($stateParams, orderService, ExportService, DialogService, $state, ImgLightbox, $filter) {
    this.getParame = {};
    Object.assign(this, {
      orderService,
      $stateParams,
      ExportService,
      $state,
      DialogService,
      ImgLightbox,
      $filter
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
    console.log('...init my detail list ctrl');
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

  //获取转接人信息
  getSaleName(val) {
    let _that = this;
    if (!val) {
      _that.transmitUser = '';
      return;
    };
    _that.orderService.PublicServer.getUserFormName(val).then(function (data) {
      _that.userList = data.list;
    }, err => {
      console.log(err);
    });
  }
  focus() {
    this.userList = [];
  }

  // 释放弹窗
  release() {
    this.commitOptions = {
      title: '释放弹窗',
      message: '释放后，工单将被退回至工单池！',
      confirmBtnText: '确 定',
      cancelBtnText: '取 消'
    };
    this
      .DialogService
      .openConfirm(this.commitOptions).then(() => {
        const _that = this;
        _that.orderService.getRelease(this.$stateParams.id, '确认释放成功').then(res => {
          _that.$state.go('order.myOrder');
        }, (err) => {
          let msg = _that.$filter('orderErrMsg')(err.data.code);
          if (msg) {
            this
            .DialogService
            .showMessage(msg, false, 2000);
          }
        });
        console.log('confirm');
      }, () => {
        console.log('cancel');
      }); 
  }

  // 确认提交
  getSubmit() {
    if (this.getParame.resolveBySelf) {
      this.message = '确认完成工单任务！';
    } else {
      this.message = '转派后,工单任务将转派到【新接单人-' + this.transmitUser.name + '】处理';
    }
    this.commitOptions = {
      title: '完成确认弹窗',
      message: this.message,
      confirmBtnText: '确 定',
      cancelBtnText: '取 消'
    };
    this
      .DialogService
      .openConfirm(this.commitOptions).then(() => {
        const _that = this;
        this.getParame.id = this.$stateParams.id;
        if (!this.getParame.resolveBySelf) {
          this.getParame.transmitUser = this.transmitUser.id;
        }
        _that.orderService.getOrderFinish(this.getParame, '确认提交成功')
        .then(res => {
          _that.$state.go('order.myOrder');
        }, (err) => {
          let msg = _that.$filter('orderErrMsg')(err.data.code);
          if (msg) {
            this
            .DialogService
            .showMessage(msg, false, 2000);
          }
        });
        console.log('confirm');
      }, () => {
        console.log('cancel');
      }); 
  }

  //获取工单历史日志
  getOrderLog(params) {
    const _that = this;
    _that.orderService.getOrderLog(params).then((data) => {
      _that.orderLog = data.list;
    });
  }
}

myDetailCtrl.$inject = ['$stateParams', 'orderService', 'ExportService', 'DialogService', '$state', 'ImgLightbox', '$filter'];
export default angular.module('myOrderDetail', [])
  .controller('myDetailCtrl', myDetailCtrl)
  .name;