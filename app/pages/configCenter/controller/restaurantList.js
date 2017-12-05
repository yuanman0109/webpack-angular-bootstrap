'use strict';

const _init_ = Symbol('_init_');

class RestaurantListCtrl {
  constructor($state, $stateParams, DialogService, RestaurantService, $filter) {
    Object.assign(this, {$state, $stateParams, DialogService, RestaurantService, $filter});
    this.params = {
      pageNo: $stateParams.pageNo || 1,
      pageSize: '10',
      searchStr: $stateParams.searchStr || null,
      brandName: $stateParams.brandName || null
    };
    this[_init_]();
  }[_init_]() {
    this.getList();
  }
  //获取列表
  getList() {
    const _that = this;
    _that.RestaurantService.getList(_that.params).then(data => {
      _that.list = data.list;
      _that.total = data.total;
    });
  }
  // 搜索
  search() {
    this.params.pageNo = 1;
    this.goLists();
  }
  // 查看账户
  checkAccount() {
    var _that = this;
    _that
      .DialogService
      .openModal({
        template: require('../views/modal/restaurantAccount.modal.html'),
        controller: restaurantAccountModalCtrl,
        controllerAs: 'ctrl',
        size: 'md',
        resolve: {
          options: function () {
            return {
            };
          }
        }
      }).then(() => {
        console.log('confirm');
      }, () => {
        console.log('cancel');
      });
  }
  // 搜索快捷键
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  }
   //翻页
  pageChanged() {
    this.goLists();
  }
    //路由跳转
  goLists() {
    this.$state.go('configCenter.restaurantList', this.params);
  }
}

RestaurantListCtrl.$inject = [
  '$state', 
  '$stateParams', 
  'DialogService',
  'RestaurantService',
  '$filter'
];

export default angular.module('RestaurantListModule', [])
  .controller('RestaurantListCtrl', RestaurantListCtrl)
  .name;

//查看云餐厅账号
class restaurantAccountModalCtrl {
  constructor($uibModalInstance, RestaurantService, $rootScope, $filter, DialogService, toaster, options) {
    Object.assign(this, {$modalInstance: $uibModalInstance, RestaurantService, $rootScope, $filter, DialogService, toaster, options});
    $rootScope.token = localStorage.token;
  }
  
  // 确认 
  resetPWD() {
    console.log('密码重置成功');
    this.isResetPwd = true;
  }
  // 取消
  cancel() {
    this
      .$modalInstance
      .dismiss();
  }
}
restaurantAccountModalCtrl.$inject = [
  '$uibModalInstance',
  'paymentQrcodeService',
  '$rootScope',
  '$timeout',
  '$filter',
  'DialogService',
  'toaster',
  'options'
];
