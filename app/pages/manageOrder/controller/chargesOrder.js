'use strict';
// 定义私有方法_init_
const _init_ = Symbol('_init_');
class ChargesOrderCtrl {
  constructor($state, $stateParams, $http, PublicServer, DialogService, ChargesOrderService, ExportService) {
    Object.assign(this, {$state, $stateParams, $http, PublicServer, DialogService, ChargesOrderService, ExportService});
    this.brandLists = [];
    this.total = 0;
    this.params = {
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10,
      isChangePrice: Boolean($stateParams.isChangePrice) || null,
      payType: $stateParams.payType || null,
      status: $stateParams.status || null,
      search: $stateParams.search || null
    };
    this.statusLists = [{
      code: 'PAYED',
      name: '已支付'
    }, {
      code: 'NOT_PAY',
      name: '待支付'
    }, {
      code: 'CANCELLED',
      name: '已取消'
    }
    ];
    this.payTypeLists = [
      {
        code: 'WEIXIN',
        name: '微信'
      }, {
        code: 'ALIPAY',
        name: '支付宝'
      }
    ];
    this.payTypeCtrl = [];
    this.changePriceLists = [
      {
        code: true,
        name: '需要'
      }, {
        code: false,
        name: '不需要'
      }
    ];
    this[_init_]();
  }[_init_]() {
    this.getChargesOrderLists(this.params);
    this.payTypeCtrl = this.payTypeLists;
  }
  // 已支付金额控制
  // controlPayedAmount(status, price) {
  //   return status === 'PAYED' ? price : '--';
  // }
  // 搜索框支付方式控制
  getPayType() {
    let _that = this;
    if (_that.params.status !== 'PAYED' && _that.params.status !== null) {
      _that.payTypeCtrl = [];
    } else {
      _that.payTypeCtrl = _that.payTypeLists;
    }
  }
  // 获取服务费订单列表
  getChargesOrderLists(params) {
    this.timeTransform();
    let _that = this;
    _that
    .ChargesOrderService
    .getChargesOrderLists(params)
    .then((data) => {
      // console.log(data);
      _that.list = data.list;
      _that.total = data.total;
    }, (data) => {
      // console.log('获取服务费订单列表失败！！！！');
      var code = data.data.code;
      var msg = _that.validHttpCode(code);
      if (msg) {
        _that.DialogService.showMessage(msg, false, 2500);
      }      
    });
  }

  //时间选择
  selDate(str) {
    const _that = this;
    if (str === 'start') {
      _that.endDateOps.minDate = _that.orderStartTime;
    } else {
      _that.startDateOps.maxDate = _that.orderEndTime;
    }
  }

  validHttpCode(c) {
    var msg;
    switch (c) {
      case 'ServiceOrder001':
        msg = '门店id不存在';
        break;
      case 'ServiceOrder002':
        msg = '收费的服务不存在';
        break;
      case 'ServiceOrder003':
        msg = '订单不存在';
        break;
      case 'ServiceOrder004':
        msg = '不是待付款订单不能取消 不能改价';
        break;
      case 'ServiceOrder005':
        msg = '该订单不能改价';
        break;
      case 'ServiceOrder006':
        msg = '该服务配置已经下架不能修改';
        break;
    }
    return msg;
  }
  //时间转换
  timeTransform(time) {
    const _that = this;
    // console.log(_that.startTime);
    // console.log(_that.endTime);
    if (_that.orderStartTime) {
      _that.params.orderStartTime = _that.orderStartTime.getTime();
    } else if (time) {
      _that.params.orderStartTime = null;
    } else if (_that.$stateParams.orderStartTime) {
      _that.params.orderStartTime = _that.$stateParams.orderStartTime;
      _that.orderStartTime = new Date(parseInt(_that.$stateParams.orderStartTime));
    };
    if (_that.orderEndTime) {
      _that.params.orderEndTime = _that.orderEndTime.getTime() + (1000 * 59 * 59 * 23);
    } else if (time) {
      _that.params.orderEndTime = null;
    } else if (_that.$stateParams.orderEndTime) {
      _that.params.orderEndTime = _that.$stateParams.orderEndTime;
      _that.orderEndTime = new Date(parseInt(_that.$stateParams.orderEndTime));
    };
  }
  // 搜索
  searchData() {
    this.params.pageNo = 1;
    this.timeTransform(1);
    // console.log(this.params);
    this.goLists();
  }
  // 回车键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchData();
    }
  }
  // 导出
  exportCsv() {
    let params = Object.assign({
      'access_token': localStorage.token
    }, this.params);
    this.ExportService.download('/orders/exportCsv', params);
  }
  // 页面切换
  pageChanged() {
    this.goLists();
  }

   //路由跳转
  goLists() {
    this.$state.go('manageOrder.chargesOrder', this.params);
  }
}

ChargesOrderCtrl.$inject = ['$state', '$stateParams', '$http', 'PublicServer', 'DialogService', 'ChargesOrderService', 'ExportService'];

export default angular.module('ChargesOrderModule', [])
  .controller('ChargesOrderCtrl', ChargesOrderCtrl)
  .name;
