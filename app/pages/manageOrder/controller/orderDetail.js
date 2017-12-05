'use strict';
const _init_ = Symbol('_init_');
class OrderDetailCtrl {
  constructor($uibModal, $http, $state, PublicServer, DialogService, ChargesOrderService, $stateParams, $filter) {
    Object.assign(this, {$uibModal, $http, $state, PublicServer, DialogService, ChargesOrderService, $stateParams, $filter});
    this.newPrice = {
      id: null,
      payedAmount: 0
    };
    this[_init_]();
  };
  [_init_]() {
    this.orderId = this.$stateParams.orderId;
    this.pageType = this.$stateParams.pageType;
    // console.log(this.orderId, this.pageType);
    this.getOrderDetail(this.orderId);
  }
  // 获取订单详细信息
  getOrderDetail(id) {
    let _that = this;
    // console.log(_that);
    _that
      .ChargesOrderService
      .getOrderDetail(id)
      .then((data) => {
        // console.log(data);
        _that.orderInfo = data;     
        _that.trialOrder = data.trialOrderDetails;
        console.log(_that.trialOrder);
        // console.log('make it!');
      }, (data) => {
        // console.log('获取订单详细信息失败！！！');
        var code = data.data.code;
        var msg = _that.$filter('validHttpCode')(code);
        if (msg) {
          _that.DialogService.showMessage(msg, false, 2500);
        }        
      });
  }

  // 取消
  calcelOrder() {
    const _that = this;
    _that.commitOptions = {
      title: '取消订单',
      message: '确定要取消【' + _that.orderInfo.storeName + '】的订单吗？请仔细核对后确认！',
      confirmBtnText: '确定',
      cancelBtnText: '取消'
    };
    _that
      .DialogService
      .openConfirm(_that.commitOptions).then(() => {
        _that
          .ChargesOrderService
          .cancleOrder(_that.orderId, '成功取消订单')
          .then(res => {
            _that.$state.go('manageOrder.chargesOrder');
          }, (err) => {
            let msg = _that.$filter('validHttpCode')(err.data.code);
            if (msg) {
              _that
              .DialogService
              .showMessage(msg, false, 2000);
            }
          });
        console.log('confirm');
      }, () => {
        console.log('cancel');
      });
  }

  // 改价
  changeCharge() {
    const _that = this;
    _that.message = '确定将【' + _that.orderInfo.storeName + '】的该笔订单的服务费金额【' + _that.orderInfo.payedAmount + '】修改为【' + _that.newPriceInput.toFixed(2) + '】吗？请仔细核对后确认！';
    _that.commitOptions = {
      title: '改价',
      message: _that.message,
      confirmBtnText: '确定',
      cancelBtnText: '取消'
    };
    _that
      .DialogService
      .openConfirm(_that.commitOptions).then(() => {
        _that
          .ChargesOrderService
          .changeChargePrice({'id': _that.orderId, 'payedAmount': _that.newPriceInput.toFixed(2)}, '改价成功')
          .then((res) => {
            _that.$state.go('manageOrder.chargesOrder');
          }, (err) => {
            let msg = _that.$filter('validHttpCode')(err.data.code);
            if (msg) {
              _that
              .DialogService
              .showMessage(msg, false, 2000);
            }
          });
        console.log('confirm');
      }, () => {
        console.log('cancel');
      });
  }
}
OrderDetailCtrl.$inject = ['$uibModal', '$http', '$state', 'PublicServer', 'DialogService', 'ChargesOrderService', '$stateParams', '$filter'];
export default angular.module('OrderDetailModule', [])
  .controller('OrderDetailCtrl', OrderDetailCtrl)
  .name;