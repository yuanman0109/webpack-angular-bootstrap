'use strict';
const _init_ = Symbol('_init_');
class ChargesConfigCtrl {
  constructor($uibModal, $state, $stateParams, $http, DialogService, PublicServer, ChargesConfigService) {
    Object.assign(this, {$uibModal, $state, $stateParams, $http, DialogService, PublicServer, ChargesConfigService});
    this.chargesLists = [];
    this.businessTypes = [];
    this.total = 0;
    this.params = {
      businessId: $stateParams.businessId || null,
      name: $stateParams.name || null,
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10
    };
    this.upOrDownParams = {
      id: null,
      status: null
    };
    this[_init_]();
  }[_init_]() {
    this.getChargesCofig(this.params);
    this.getBusinessTypes();
  }
  // 获取业务类型
  getBusinessTypes() {
    let _that = this;
    _that
    .ChargesConfigService
    .getBusinessTypes()
    .then((data) => {
      // console.log('获取业务类型成功');
      // console.log(data);
      _that.businessTypes = data;
    }, () => {
      // console.log('获取业务类型失败！！！');
    });
  }
  // 获取服务费配置列表
  getChargesCofig() {
    let _that = this;
    _that
      .ChargesConfigService
      .getChargesCofig(_that.params)
      .then((data) => {
        // console.log(data);
        _that.chargesLists = data.list;
        _that.total = data.total;
        // console.log('获取服务费配置列表成功');
      }, (data) => {
        // console.log(params);
        // console.log('获取服务费配置列表失败！！！！！！！');
        var code = data.data.code;
        var msg = _that.validHttpCode(code);
        if (msg) {
          _that.DialogService.showMessage(msg, false, 3000);
        }        
      });
  }
  // 搜索
  searchData() {
    this.goLists();
  }
  // 回车键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchData();
    }
  }
  // 页面切换
  pageChanged() {
    this.goLists();
  }
    //路由跳转
  goLists() {
    this.$state.go('manageOrder.chargesConfig', this.params);
  }
  // http失败码
  validHttpCode(c) {
    var msg;
    switch (c) {
      case 'ServiceCharge_002':
        msg = '服务费配置不存在';
        break;
      case 'ServiceCharge_003':
        msg = '不能重复下架或上架';
        break;
      case 'ServiceCharge_004':
        msg = '服务费不存在';
        break;      
    }
    return msg;
  }
  // 下架、上架
  goDownCharges(charge, period, bl) {
    let _that = this;
    let fn = function($uibModalInstance) {
      var $ctrl = this;
      $ctrl.name = charge.name;
      $ctrl.validPeriod = period.validPeriod;
      _that.upOrDownParams.id = period.id;
      _that.upOrDownParams.status = bl;
      if (bl === true) {
        $ctrl.do = '上架';
        $ctrl.can = '可以';
      } else {
        $ctrl.do = '下架';
        $ctrl.can = '不可以';
      }
      $ctrl.ok = function() {
        $uibModalInstance.close();
      };
      $ctrl.cancel = function() {
        $uibModalInstance.dismiss();
      };
    };
    fn.$inject = ['$uibModalInstance'];
    _that
      .$uibModal
      .open({
        windowClass: 'commonDialog',
        templateUrl: 'goDownCharges.html',
        controller: fn,
        controllerAs: '$ctrl'
      })
      .result
      .then(function() {
        _that
          .ChargesConfigService
          .goDownCharges(_that.upOrDownParams)
          .then((data) => {
            // console.log('下架成功');
            period.status = bl;
          }, (data) => {
            // console.log(data);
            // console.log('下架失败!!!!!!!');
            var code = data.data.code;
            var msg = _that.validHttpCode(code);
            if (msg) {
              _that.DialogService.showMessage(msg, false, 2500);
            }            
          });
        // console.log('执行');
      }, function() {
        // console.log('取消操作');
      });
  }
}
ChargesConfigCtrl.$inject = ['$uibModal', '$state', '$stateParams', '$http', 'DialogService', 'PublicServer', 'ChargesConfigService'];
export default angular.module('ChargesConfigCtrlModule', [])
  .controller('ChargesConfigCtrl', ChargesConfigCtrl)
  .name;