'use strict';

const _init_ = Symbol('_init_');

class FastFoodListCtrl {
  constructor($stateParams, $filter, DialogService, FastFoodVerifyService, ExportService, $state) {
    Object.assign(this, {$stateParams, $filter, DialogService, FastFoodVerifyService, ExportService, $state});
    this[_init_]();
  }
  [_init_]() {
    this.params = {
      status: this.$stateParams.status || null,
      tabIndex: Number(this.$stateParams.tabIndex) || 0,
      pageNo: Number(this.$stateParams.pageNo) || 1,
      pageSize: Number(this.$stateParams.pageSize) || 10,
      applicat: this.$stateParams.applicat || null,
      applicationEndTime: this.$stateParams.applicationEndTime || null,
      applicationStartTime: this.$stateParams.applicationStartTime || null,
      auditEndTime: this.$stateParams.auditEndTime || null,
      auditStartTime: this.$stateParams.auditStartTime || null,
      auditUserId: this.$stateParams.auditUserId || null,
      cityCode: this.$stateParams.cityCode || null,
      name: this.$stateParams.name || null
    };
    this.setStatus();
    this.getFastFoodList();
  }
  //配置status
  setStatus() {
    this.status = '';
    if (Number(this.params.tabIndex) === 0) {
      this.params.status = 'SUBMIT';
      this.status = 'SUBMIT';
    }
  }
  //切换table
  getList(status) {
    const _that = this;
    _that.params = {
      tabIndex: _that.params.tabIndex,
      status: status,
      pageSize: 10,
      pageNo: 1
    };
    _that.goRouter();
  }
  //查询
  getFastFoodList() {
    const _that = this;
    _that.FastFoodVerifyService.getList(_that.params).then(data => {
      _that.list = data.list;
      _that.total = data.total;
    }, (err) => {
      let msg = this.$filter('FastFoodRespErrMsg')(err.data.code);
      msg && this.DialogService.showMessage(msg, false);
    });
  }
  //搜索
  search() {
    const _that = this;
    _that.params = {
      tabIndex: _that.params.tabIndex,
      pageSize: 10,
      pageNo: 1,
      name: _that.params.name
    };
    _that.setStatus();
    _that.goRouter();
  }
  //高级搜索
  searchBtn(ind) {
    this.DialogService.openModal({
      template: require('../views/modal/seniorSearch.1.html'),
      controller: SeniorSearchCtrl,
      controllerAs: 'ctrl',
      size: 'lg',
      resolve: {
        opts: () => {
          return {
            tabIndex: ind
          };
        }
      }
    }).then((data) => {
      this.params = data;
      this.goRouter();
    });
  }
  //跳转路由
  goRouter() {
    this.$state.go('configCenter.fastFoodList', this.params, {inherit: false});
  }
// 导出
  export() {
    let params = Object.assign({
      'access_token': localStorage.token
    }, this.params);
    this.ExportService.download('/customer/fastfoodcases/export', params);
  }
// 搜索快捷键
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  }
    //翻页
  pageChanged() {
    this.goRouter();
  }
}

FastFoodListCtrl.$inject = [
  '$stateParams',
  '$filter', 
  'DialogService',
  'FastFoodVerifyService',
  'ExportService',
  '$state'
];

export default angular.module('FastFoodListModule', [])
  .controller('FastFoodListCtrl', FastFoodListCtrl)
  .name;

/**
 *  高级搜索弹窗controller
 */
class SeniorSearchCtrl {
  constructor($uibModalInstance, DialogService, opts, $filter, PublicServer) {
    Object.assign(this, {$modalInstance: $uibModalInstance, DialogService, opts, $filter, PublicServer});
    this.params = {
      tabIndex: this.opts.tabIndex,
      pageSize: 10,
      pageNo: 1,
      status: ''
    };
    this.tabIndex = this.opts.tabIndex;
    this.selDisabled = false;
    if (this.tabIndex === 0) {
      this.selDisabled = true;
      this.params.status = 'SUBMIT';
    }
  }
  //获取申请人
  getApplyName(val) {
    let _that = this;
    if (!val) return;
    _that.PublicServer.getUserFormName(val).then(function (data) {
      _that.userList = data.list;
    }, err => {
      console.log(err);
    });
  }
  focus() {
    this.userList = [];
  }
  // 确认
  confirm() {
    const _that = this;
    _that.params.applicationStartTime = _that.$filter('date')(_that.applyStartTime, 'yyyy-MM-dd 00:00:00');
    _that.params.applicationEndTime = _that.$filter('date')(_that.applyEndTime, 'yyyy-MM-dd 23:59:59');
    _that.params.auditStartTime = _that.$filter('date')(_that.verifyStartTime, 'yyyy-MM-dd 00:00:00');
    _that.params.auditEndTime = _that.$filter('date')(_that.verifyEndTime, 'yyyy-MM-dd 23:59:59');
    _that.$modalInstance.close(_that.params);
  }
  // 取消
  cancel() {
    this.$modalInstance.dismiss();
  }
}
SeniorSearchCtrl.$inject = ['$uibModalInstance', 'DialogService', 'opts', '$filter', 'PublicServer'];