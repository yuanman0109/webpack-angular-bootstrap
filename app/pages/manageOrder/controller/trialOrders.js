'use strict';

const _init_ = Symbol('_init_');

class TrialOrdersCtrl {
  constructor($state, $stateParams, TrialOrdersService, ExportService, toaster, $filter) {
    Object.assign(this, {$state, $stateParams, TrialOrdersService, ExportService, toaster, $filter});
    this.params = {
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10,
      search: $stateParams.search || null,
      payType: $stateParams.payType || null,
      status: $stateParams.status || 'PAYED'
    };
    // 支付方式
    this.payType = {
      'WEIXIN': '微信',
      'ALIPAY': '支付宝'
    };
    this[_init_]();
  }
  [_init_]() {
    // 订单状态
    this.status = {
      'USED': '已抵扣',
      'NOT_PAY': '未支付',
      'PAYED': '已支付'
    };
    this.getList();
  }

  //获取模板列表
  getList() {
    this.timeTransform();
    const _that = this;
    _that.TrialOrdersService.getList(_that.params).then(data => {
      _that.List = data.list;
      _that.total = data.total;
      if (data.list.length === 0) {
        _that.noList = true;
      } else {
        _that.noList = false;
      }
    }, (err) => {
      console.log(err);
      _that.noList = true;
    });
  }
    //路由跳转
  goLists() {
    this.$state.go('manageOrder.trialOrders', this.params);
  }

  //搜索
  search() {
    this.timeTransform(1);
    this.params.pageNo = 1;
    this.goLists();
  }

  //翻页
  pageChanged() {
    this.goLists();
  }

  // 选择时间
  selDate(flag, str) {
    const _that = this;
    if (flag === 1) {
      if (str === 'start') {
        _that.endDateOps.minDate = _that.payStartTime;
      } else {
        _that.startDateOps.maxDate = _that.payEndTime;
      }
    } else if (flag === 2) {
      if (str === 'start') {
        _that.orderEndDateOps.minDate = _that.orderStartTime;
      } else {
        _that.orderStartDateOps.maxDate = _that.orderEndTime;
      }
    }
  }

    //时间转换
  timeTransform(time) {
    const _that = this;
    // if (this.payStartTime) params.payStartTime = this.$filter('date')(this.payStartTime, 'yyyy-MM-dd 00:00:00');
    // if (this.payEndTime)params.payEndTime = this.$filter('date')(this.payEndTime, 'yyyy-MM-dd 23:59:59');
    // if (this.orderStartTime)params.orderStartTime = this.$filter('date')(this.orderStartTime, 'yyyy-MM-dd 00:00:00');
    // if (this.orderEndTime)params.orderEndTime = this.$filter('date')(this.orderEndTime, 'yyyy-MM-dd 23:59:59');

    if (_that.payStartTime) {
      _that.params.payStartTime = _that.$filter('date')(_that.payStartTime, 'yyyy-MM-dd 00:00:00');
    } else if (time) {
      _that.params.payStartTime = null;
    } else if (_that.$stateParams.payStartTime) {
      _that.params.payStartTime = _that.$stateParams.payStartTime;
      _that.payStartTime = new Date(_that.$stateParams.payStartTime);
    };
    if (_that.payEndTime) {
      _that.params.payEndTime = _that.$filter('date')(_that.payEndTime, 'yyyy-MM-dd 23:59:59');
    } else if (time) {
      _that.params.payEndTime = null;
    } else if (_that.$stateParams.payEndTime) {
      _that.params.payEndTime = _that.$stateParams.payEndTime;
      _that.payEndTime = new Date(_that.$stateParams.payEndTime);
    };

    if (_that.orderStartTime) {
      _that.params.orderStartTime = _that.$filter('date')(_that.orderStartTime, 'yyyy-MM-dd 00:00:00');
    } else if (time) {
      _that.params.orderStartTime = null;
    } else if (_that.$stateParams.orderStartTime) {
      _that.params.orderStartTime = _that.$stateParams.orderStartTime;
      _that.orderStartTime = new Date(_that.$stateParams.orderStartTime);
    };
    if (_that.orderEndTime) {
      _that.params.orderEndTime = _that.$filter('date')(_that.orderEndTime, 'yyyy-MM-dd 23:59:59');
    } else if (time) {
      _that.params.orderEndTime = null;
    } else if (_that.$stateParams.orderEndTime) {
      _that.params.orderEndTime = _that.$stateParams.orderEndTime;
      _that.orderEndTime = new Date(_that.$stateParams.orderEndTime);
    };
  }

  // 导出
  export() {
    this.ExportService.get('/trialOrders/exportCsv').then((data) => {
      this.ExportService.exportCSV(data);
    }, (err) => {
      this.toaster.pop({
        type: 'error',
        body: '下载失败，请重新下载'
      });
      console.log(err);
    });
  }
  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  }
}
TrialOrdersCtrl.$inject = ['$state', '$stateParams', 'TrialOrdersService', 'ExportService', 'toaster', '$filter'];

export default angular.module('TrialOrdersModule', [])
  .controller('TrialOrdersCtrl', TrialOrdersCtrl)
  .name;