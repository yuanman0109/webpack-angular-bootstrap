'use strict';

const _init_ = Symbol('_init_');

class paymentConfigDetailCtrl {
  constructor(DialogService, PaymentConfigService, $stateParams, $state, $filter) {
    Object.assign(this, {DialogService, PaymentConfigService, $stateParams, $state, $filter});
    this[_init_]();
  }[_init_]() {
    this.details = {};
    this.storeId = this.$stateParams.storeId;
    this.id = this.$stateParams.id;
    this.storeId && this.getStoreInfo();
    this.id && this.getDetails();
  }
  getStoreInfo() {
    this.PaymentConfigService.getPaymentlist({storeId: this.storeId}).then(res => {
      this.details.storeName = res.storeName;
      this.details.brandName = res.brandName;
      this.details.companyName = res.companyName;
    }, (err) => {
      if (err.data.code === 'S403') {
        this.$state.go('configCenter.restaurantList');
        return false;
      }
    });
  }
  // 获取详情
  getDetails() {
    this.PaymentConfigService.Details(this.id).then(data => {
      this.details = data;
      if (data.payMode === 'ALIPAY') {
        this.zhifubao = data;
      } else {
        this.weixin = data;
      }
    }, (err) => {
      if (err.data.code === 'S403') {
        this.$state.go('configCenter.paymentConfigList', {'storeId': this.storeId});
        return false;
      } else if (err.data.code === 'S500') {
        this.$state.go('configCenter.paymentConfigList', {'storeId': this.storeId});
      }
    });
  }
  initOrg (connectionMode, flag) {
    if (connectionMode === 'INDIRECT' && !this.id) {
      if (flag === 'zhifubao') {
        this.zhifubao.connectionOrg = 'FUYOU';
      } else {
        this.weixin.connectionOrg = 'FUYOU';
      }
    }
  }
  // 修改
  edit() {
    this.isEdit = true;
  }
  // 提交修改
  save() {
    const _that = this;
    if (_that.details.payMode === 'ALIPAY') {
      _that.parmes = _that.zhifubao;
    } else if (_that.details.payMode === 'WEIXIN') {
      _that.parmes = _that.weixin;
    }
    _that.PaymentConfigService.Save(_that.id, _that.parmes, '修改成功').then(res => {
      _that.$state.go('configCenter.paymentConfigList', {storeId: this.storeId});
    }, (err) => {
      if (err.data.code === 'S403') {
        this.$state.go('configCenter.paymentConfigList', {'storeId': this.storeId});
        return false;
      }
      let payMode = _that.$filter('PaymentPayMode')(_that.details.payMode);
      let msg = _that.$filter('PaymentConfigRespErr')(err.data.code, payMode);
      msg && _that.DialogService.showMessage(msg, false, 2500);
    });
  }
  //新建添加
  add() {
    const _that = this;
    _that.parmes = {
      'payConfigInvo': [],
      'storeId': ''
    };
    _that.zhifubao.payMode = 'ALIPAY';
    _that.weixin.payMode = 'WEIXIN';
    _that.parmes.payConfigInvo.push(_that.zhifubao);
    _that.parmes.payConfigInvo.push(_that.weixin);
    _that.parmes.storeId = _that.storeId;
    _that.PaymentConfigService.Add(_that.parmes, '新建成功').then(res => {
      _that.$state.go('configCenter.paymentConfigList', {storeId: this.storeId});
    }, (err) => {
      if (err.data.code === 'S403') {
        this.$state.go('configCenter.paymentConfigList', {'storeId': this.storeId});
        return false;
      } 
      let msg = _that.$filter('PaymentConfigRespErr')(err.data.code, '支付宝或微信');
      msg && _that.DialogService.showMessage(msg, false, 2500);
    });
  }
}

paymentConfigDetailCtrl.$inject = [
  'DialogService',
  'PaymentConfigService',
  '$stateParams',
  '$state',
  '$filter'
];

export default angular.module('paymentConfigDetailModule', [])
  .controller('paymentConfigDetailCtrl', paymentConfigDetailCtrl)
  .name;