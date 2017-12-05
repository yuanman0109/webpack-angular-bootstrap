'use strict';
const _init_ = Symbol('_init_');
class fastFoodDetailCtrl {
  constructor(DialogService, FastFoodVerifyService, $stateParams, $state, $filter, ImgLightbox) {
    Object.assign(this, {DialogService, FastFoodVerifyService, $stateParams, $state, $filter, ImgLightbox});
    this[_init_]();
  }[_init_]() {
    this.id = this.$stateParams.id;
    this.menuReferencesUrlList = [];
    this.tableReferenceUrlList = [];
    this.businessAgreementUrlList = [];
    this.params = {
      id: this.id
    };
    this.getDetails();
  }
  // 查看图片
  openLightboxModal (images, index) {
    this.ImgLightbox.openModal(images, index);
  };
  // 详情
  getDetails() {
    this.FastFoodVerifyService.Details(this.params).then(data => {
      this.details = data;
      if (data.menuReferencesUrl) {
        data.menuReferencesUrl.forEach(x => { return this.menuReferencesUrlList.push({url: this.$filter('MiddImg')(this.$filter('imgUrlWithToken')(x)), 'caption': '菜单参考'}); });
      }
      this.tableReferenceUrlList.push({url: this.$filter('MiddImg')(this.$filter('imgUrlWithToken')(data.tableReferenceUrl)), 'caption': '餐台参考'});
      this.businessAgreementUrlList.push({url: this.$filter('MiddImg')(this.$filter('imgUrlWithToken')(data.businessAgreementUrl)), 'caption': '餐台参考'});
      if (data.status === 'ONLINE') {
        this.$stateParams.tabIndex = 1;
      } else if (data.status === 'SUBMIT') {
        this.$stateParams.tabIndex = 0;
      }
      // 获取操作日志记录
      return this.FastFoodVerifyService.history(this.params);
    }, (err) => {
      if (err.data.code === 'S403') {
        this.$state.go('configCenter.fastFoodList', {tabIndex: this.$stateParams.tabIndex});
        return false;
      }
    }).then(data => {
      this.verifyLog = data;
    }, (err) => {
      if (err.data.code === 'S403') {
        this.$state.go('configCenter.fastFoodList', {tabIndex: this.$stateParams.tabIndex});
        return false;
      }
    }); 
  }
  // 审核
  verify() {
    this.DialogService.openModal({
      template: require('../views/modal/FastFoodverify.modal.html'),
      controller: FastFoodVerifyModalCtrl,
      controllerAs: 'ctrl',
      resolve: {
        opts: () => {
          return {
            'id': this.params.id,
            'tabIndex': this.$stateParams.tabIndex
          };
        }
      }
    });
  }
}

fastFoodDetailCtrl.$inject = [
  'DialogService',
  'FastFoodVerifyService',
  '$stateParams',
  '$state',
  '$filter',
  'ImgLightbox'
];

export default angular.module('fastFoodDetailModule', [])
  .controller('fastFoodDetailCtrl', fastFoodDetailCtrl)
  .name;

/**
 *  进件审核弹窗controller
 */
class FastFoodVerifyModalCtrl {
  constructor($uibModalInstance, $rootScope, DialogService, opts, FastFoodVerifyService, $state, $filter) {
    Object.assign(this, {$modalInstance: $uibModalInstance, $rootScope, DialogService, opts, FastFoodVerifyService, $state, $filter});
    this.data = {
      id: opts.id,
      remark: '通过',
      status: 'ONLINE'
    };
    this.opts.tabIndex = this.opts.tabIndex + 1;
  }
  //切换单选按钮
  switch(status) {
    if (status === 'ONLINE') {
      this.data.remark = '通过';
    } else {
      this.data.remark = '';
    }
    this.data.status = status;
  }
  // 确认
  confirm() {
    if (this.data.status && !this.data.remark) {
      return false;
    }
    this.FastFoodVerifyService.Verify(this.data, '操作成功')
    .then((data) => {
      this.$modalInstance.close();
      setTimeout(function() {
        history.go(-1);
      }, 1500);
    }, (err) => {
      if (err.data.code === 'S403') {
        this.$modalInstance.dismiss();
        this.$state.reload();
        return false;
      }
      let msg = this.$filter('FastFoodRespErrMsg')(err.data.code);
      msg && this.DialogService.showMessage(msg, false);
    });
  }
  // 取消
  cancel() {
    this.$modalInstance.dismiss();
  }
}
FastFoodVerifyModalCtrl.$inject = ['$uibModalInstance', '$rootScope', 'DialogService', 'opts', 'FastFoodVerifyService', '$state', '$filter'];