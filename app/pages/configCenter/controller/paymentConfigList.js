'use strict';

const _init_ = Symbol('_init_');

class paymentConfigListCtrl {
  constructor(DialogService, $stateParams, $state, PaymentConfigService, $filter) {
    Object.assign(this, {DialogService, $stateParams, $state, PaymentConfigService, $filter});
    this[_init_]();
  }[_init_]() {
    this.params = {
      pageSize: '10',
      pageNo: '1'
    };
    this.params.storeId = this.$stateParams.storeId;
    this.getList();
  }
  
  getList() {
    const _that = this;
    _that.PaymentConfigService.getPaymentlist(_that.params).then(res => {
      this.storeName = res.storeName;
      this.brandName = res.brandName;
      this.companyName = res.companyName;
      
      _that.List = res.list;
      _that.total = res.count;
    }, (err) => {
      if (err.data.code === 'S403') {
        this.$state.go('configCenter.restaurantList');
        return false;
      }
    });
  }
  pageChanged() {
    this.getList();
  }
  // 禁用
  disable(item) {
    this.defaultConfirmOptions = {
      title: '停 用',
      message: '确认停用【' + this.storeName + '】的【' + this.$filter('PaymentPayMode')(item.payMode) + '】的【' + this.$filter('PaymentConnectionMode')(item.connectionMode) + '】-【' + this.$filter('PaymentConnectionOrg')(item.connectionOrg) + '】',
      confirmBtnText: '确 定',
      cancelBtnText: '取 消'
    };

    this
      .DialogService
      .openConfirm(this.defaultConfirmOptions).then(() => {
        const _that = this;
        var obj = {
          'state': 'DISABLED'
        };
        _that.PaymentConfigService.disable(item.id, obj, '停用成功').then(res => {
          this.getList();
        }, () => {
          if (err.data.code === 'S403') {
            return false;
          }
          this
            .DialogService
            .showMessage('操作失败，请重新操作', false);
        });
        console.log('confirm');
      }, () => {
        console.log('cancel');
      });
  }
  channelSwitch() {
    var _that = this;
    _that
      .DialogService
      .openModal({
        template: require('../views/modal/channelSwitch.modal.html'),
        controller: channelSwitchModalCtrl,
        controllerAs: 'ctrl',
        resolve: {
          options: function() {
            return {
              'reloadData': function() {
                return _that.getList();
              },
              'storeId': _that.params.storeId
            };
          }
        }
      }).then(() => {
        console.log('confirm');
        _that.getList();
      }, () => {
        console.log('cancel');
      });
  }
}

paymentConfigListCtrl.$inject = [
  'DialogService',
  '$stateParams',
  '$state',
  'PaymentConfigService',
  '$filter'
];

export default angular.module('paymentConfigListModule', [])
  .controller('paymentConfigListCtrl', paymentConfigListCtrl)
  .name;

//切换通道弹窗
const _initSwitch_ = Symbol('_initSwitch_');

class channelSwitchModalCtrl {
  constructor($uibModalInstance, PaymentConfigService, $filter, $state, DialogService, options) {
    Object.assign(this, {$modalInstance: $uibModalInstance, PaymentConfigService, $filter, $state, DialogService, options});
    this[_initSwitch_]();
  }[_initSwitch_]() {
    this.getChannelSwitch();
  }
  // 查看支付通道
  getChannelSwitch() {
    const _that = this;
    _that.PaymentConfigService.getChannelSwitch(_that.options.storeId).then(res => {
      _that.list = res.list;
    }, (err) => {
      if (err.data.code === 'S403') {
        _that.$modalInstance.dismiss();
      }
    });
  }
  // 确认 
  confirm() {
    this.dataArr = [];
    if ((this.data[0].connectionOrg === null || this.data[1].connectionOrg === null)) {
      this.DialogService.showMessage('请选择切换的通道', false);
      return false;
    }
    this.dataArr.push(this.data[0]);
    this.dataArr.push(this.data[1]);
    var obj = {
      'data': this.dataArr 
    };
    this.PaymentConfigService.channelSwitch(this.options.storeId, obj, '切换成功').then(res => {
      this.options.reloadData();
    });
    this.$modalInstance.close();
  }
  // 取消
  cancel() {
    this
      .$modalInstance
      .dismiss();
  }
}
channelSwitchModalCtrl.$inject = [
  '$uibModalInstance',
  'PaymentConfigService',
  '$filter',
  '$state',
  'DialogService',
  'options'
];
