'use strict';
const _init_ = Symbol('_init_');

class toolPaymentCtrl {
  constructor($uibModal, toolService) {
    var getParame = {
      no: ''
    };
    Object.assign(this, {
      $uibModal,
      toolService,
      getParame
    });
   
    this[_init_]();
    // this.toolDeatil = {};//要一层一层给，不然会报错，找不到原型
    // this.toolDeatil.gatheredTime = '1496912849000';
    // this.toolDeatil.refundedTime = '1496912849000';
  }
  [_init_]() {
      // this.getOrderDeatil();
  }
  // 支付订单详情查询
  getOrderDeatil() {
    let _that = this;
    _that
      .toolService
      .getOrderDeatil(_that.getParame.no)
      .then((data) => {   
        _that.toolDeatil = data;
        if (!data) {
          _that.noList = true;
        } else {
          _that.noList = false;
        }
      }, (err) => {
        console.log(err);
      });
  }

  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.inquireBtn();
    }
  }

  showNo() {
    let _that = this;
    _that.toolDeatil = false;
    _that.noList = false;
  }

  // 查询交易明细
  inquireBtn() {
    let _that = this;
    // _that.getParame = data;
    _that.getOrderDeatil();
  }
}
toolPaymentCtrl.$inject = ['$uibModal', 'toolService'];
export default angular.module('payment', [])
  .controller('toolPaymentCtrl', toolPaymentCtrl)
  .name;