'use strict';

const _init_ = Symbol('_init_');

class PaymentVerfiyCtrl {
  constructor($state, $stateParams, vertifyService, ExportService, DialogService) {
    Object.assign(this, {$state, $stateParams, vertifyService, ExportService, DialogService});
    this.params = {
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10,
      searchWord: $stateParams.searchWord || '',
      tabIndex: Number($stateParams.tabIndex) || 0,
      status: $stateParams.status || null,
      cityCode: $stateParams.cityCode || null,
      applicantUser: $stateParams.applicantUser || null,
      isNewAdd: $stateParams.isNewAdd || null,
      settleMethod: $stateParams.settleMethod || null,
      connectionOrg: $stateParams.connectionOrg || null,
      selDisabled: $stateParams.selDisabled || null,
      bankCardNo: $stateParams.bankCardNo || null,
      businessLinkman: $stateParams.businessLinkman || null,
      businessLinkmanMobile: $stateParams.businessLinkmanMobile || null,
      ownerCardNo: $stateParams.ownerCardNo || null,
      businessLicenseNo: $stateParams.businessLicenseNo || null,
      beginDate: $stateParams.beginDate || null,
      endDate: $stateParams.endDate || null,
      auditBeginTime: $stateParams.auditBeginTime || null,
      auditEndTime: $stateParams.auditEndTime || null
    };
    this.fileName = '';
    this[_init_]();
  }

  [_init_]() {
    this.getIndex();
    this.getLists();
    //this.selTab('AUDIT')
    // if (Number(this.$stateParams.tabIndex) > 0) {
    //   this.tabIndex = this.$stateParams.tabIndex;
    // } else {
    //   this.tabIndex = 0;
    // }
  }
  //tabIndex切换
  getIndex() {
    if (this.params.tabIndex === 0) {
      this.params.status = 'AUDIT';
    } else if (this.params.tabIndex === 1) {
      this.params.status = 'THIRD_AUDIT';
    }
  }
  export() {
    let params = Object.assign({
      'access_token': localStorage.token
    }, this.params);
    this.ExportService.download('/customer/cases/export', params);
  }
  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  }
  //搜索
  search() {
    this.params = {
      pageNo: 1,
      pageSize: 10,
      tabIndex: this.params.tabIndex,
      searchWord: this.params.searchWord
    };
    this.getIndex();
    this.goLists();
  }
  setFileName(status) {
    if (status === 'AUDIT') {
      this.fileName = '我方审核进件';
      this.params.tabIndex = 0;
    } else if (status === 'THIRD_AUDIT') {
      this.fileName = '第三方审核进件';
      this.params.tabIndex = 1;
    } else if (status === '') {
      this.fileName = '全部进件';
      this.params.tabIndex = 2;
    }
  }
  //tab切换
  selTab(status) {
    this.params = {
      pageNo: 1,
      status: status,
      pageSize: 10
    };
    this.status = status;
    this.setFileName(status);
    this.goLists();
  }
  //获取列表
  getLists() {
    let _that = this;
    _that.vertifyService.queryAll(_that.params, (data) => {
      _that.list = data.list;
      _that.total = data.total;
    });
  }
  //高级搜索
  searchBtn(ind) {
    this.DialogService.openModal({
      template: require('../views/modal/seniorSearch.html'),
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
      this.getIndex();
      this.goLists();
    });
  }
  //翻页
  pageChanged() {
    this.goLists();
  }
  //路由跳转
  goLists() {
    this.$state.go('configCenter.paymentVerify', this.params, {inherit: false});
  }
}

PaymentVerfiyCtrl.$inject = ['$state', '$stateParams', 'vertifyService', 'ExportService', 'DialogService'];

export default angular.module('PaymentVerfiyCtrl', [])
  .controller('PaymentVerfiyCtrl', PaymentVerfiyCtrl)
  .name;

/**
 *  高级搜索弹窗controller
 */
class SeniorSearchCtrl {
  constructor($uibModalInstance, DialogService, opts, $filter, PublicServer) {
    Object.assign(this, {$modalInstance: $uibModalInstance, DialogService, opts, $filter, PublicServer});
    this.params = {
      pageNo: 1,
      pageSize: 10,
      status: '',
      tabIndex: opts.tabIndex
    };
    this.tabIndex = this.opts.tabIndex;
    this.selDisabled = false;
    if (this.tabIndex === 0) {
      this.selDisabled = true;
      this.params.status = 'AUDIT';
    } else if (this.tabIndex === 1) {
      this.selDisabled = true;
      this.params.status = 'THIRD_AUDIT';
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
  // 确认
  confirm() {
    const _that = this;
    _that.params.beginDate = _that.$filter('date')(_that.applyStartTime, 'yyyy-MM-dd 00:00:00');
    _that.params.endDate = _that.$filter('date')(_that.applyEndTime, 'yyyy-MM-dd 23:59:59');
    _that.params.auditBeginTime = _that.$filter('date')(_that.verifyStartTime, 'yyyy-MM-dd 00:00:00');
    _that.params.auditEndTime = _that.$filter('date')(_that.verifyEndTime, 'yyyy-MM-dd 23:59:59');
    _that.$modalInstance.close(_that.params);
  }
  // 取消
  cancel() {
    this.$modalInstance.dismiss();
  }
}
SeniorSearchCtrl.$inject = ['$uibModalInstance', 'DialogService', 'opts', '$filter', 'PublicServer'];
