'use strict';
const _init_ = Symbol('_init_');

class myOrderCtrl {
  constructor($state, $stateParams, orderService, ExportService) {
    var startOpen = false;
    var endOpen = false;
    var finStart = false;
    var finEnd = false;
    var getParame = {
      taskType: $stateParams.taskType || null,
      businessId: $stateParams.businessId || null,
      type: $stateParams.type || null,
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10,
      access_token: localStorage.token,
      storeName: $stateParams.storeName || null,
      status: $stateParams.status || null,
      createUser: $stateParams.createUser || null,
      finishUser: $stateParams.finishUser || null
    };
    var typeList = [{
      name: 'SYS_PAY',
      type: '支付-系统派单'
    }, {
      name: 'MANUAL',
      type: '人工派单'
    }, {
      name: 'SERVICE_CHARGE_REMIND',
      type: '服务费到期提醒'
    }];
    var status = [{
      name: 'RECEIVED ',
      status: '待处理'
    }, {
      name: 'FINISHED',
      status: '已处理'
    }];
    Object.assign(this, {
      $state, 
      $stateParams, 
      orderService,
      status,
      startOpen,
      endOpen,
      finStart,
      finEnd,
      ExportService,
      getParame,
      typeList
    });
    // this.getType = {
    //   XINZHUANG: '新装',
    //   WEIHU: '维护'
    // };
    this[_init_]();
  }
  [_init_]() {
    console.log('...init my order list ctrl');
    this.timestamp = (new Date()).valueOf(); 
    this.getMyOrder();
    this.getTaskType();
    this.getBusiness();
  }

  // 选择时间
  selDate(str) {
    const _that = this;
    if (str === 'start') {
      _that.endDateOps.minDate = _that.createStart;
    } else if (str === 'end') {
      _that.startDateOps.maxDate = _that.createEnd;
    } else if (str === 'finStart') {
      _that.finendDateOps.minDate = _that.finishStart;
    } else if (str === 'finEnd') {
      _that.finstartDateOps.maxDate = _that.finishEnd;
    }
  }
  
  // 我的工单列表
  getMyOrder() {
    let _that = this;
    _that.timeTransform();
    _that
    .orderService
    .getMyOrder(this.getParame)
    .then((res) => {
      _that.myOrderList = res.list;
      _that.total = res.total;
      console.log(_that.myOrderList.length);
    });
  }
  //获取接单人信息
  getUserName(val) {
    let _that = this;
    if (!val) {
      _that.getParame.createUser = null;
      return;
    }
    _that.orderService.PublicServer.getUserFormName(val).then(function (data) {
      _that.userList = data.list;
    }, err => {
      console.log(err);
    });
  }
  // //获取完成人信息
  getfinishUser(val) {
    let _that = this;
    if (!val) {
      _that.getParame.finishUser = null;
      return;
    }
    _that.orderService.PublicServer.getUserFormName(val).then(function (data) {
      _that.userList = data.list;
    }, err => {
      console.log(err);
    });
  }
  focus() {
    this.userList = [];
  }

  // 导出
  export() {
    this.type = this.getParame.type;
    this.finishUser = this.getParame.finishUser;
    let params = {
      'access_token': localStorage.token,
      'storeName': this.getParame.storeName,
      'businessId': this.getParame.businessId,
      'taskType': this.getParame.taskType,
      'type': this.type,
      'status': this.getParame.status,
      'createUser': this.getParame.createUser,
      'finishUser': this.finishUser,
      'createStart': this.getParame.createStart,
      'createEnd': this.getParame.createEnd,
      'finishStart': this.getParame.finishStart,
      'finishEnd': this.getParame.finishEnd
    };
    this.ExportService.download('/workorders/_self/_pc/export', params, false);
  };

  // 任务类型
  getTaskType() {
    let _that = this;
    _that
    .orderService
    .getTaskType()
    .then((res) => {
      _that.taskType = res;
    });
  }

  // 业务类型
  getBusiness() {
    let _that = this;
    _that
    .orderService
    .getBusinessType()
    .then((res) => {
      _that.businessId = res;
    });
  }

  //时间转换
  timeTransform(time) {
    const _that = this;
    // console.log(_that.startTime);
    // console.log(_that.endTime);
    if (_that.createStart) {
      _that.getParame.createStart = _that.createStart.getTime();
    } else if (time) {
      _that.getParame.createStart = null;
    } else if (_that.$stateParams.createStart) {
      _that.getParame.createStart = _that.$stateParams.createStart;
      _that.createStart = new Date(parseInt(_that.$stateParams.createStart));
    };
    if (_that.createEnd) {
      _that.getParame.createEnd = _that.createEnd.getTime() + (1000 * 59 * 59 * 23);
    } else if (time) {
      _that.getParame.createEnd = null;
    } else if (_that.$stateParams.createEnd) {
      _that.getParame.createEnd = _that.$stateParams.createEnd;
      _that.createEnd = new Date(parseInt(_that.$stateParams.createEnd));
    };

    if (_that.finishStart) {
      _that.getParame.finishStart = _that.finishStart.getTime();
    } else if (time) {
      _that.getParame.finishStart = null;
    } else if (_that.$stateParams.finishStart) {
      _that.getParame.finishStart = _that.$stateParams.finishStart;
      _that.finishStart = new Date(parseInt(_that.$stateParams.finishStart));
    };
    if (_that.finishEnd) {
      _that.getParame.finishEnd = _that.finishEnd.getTime() + (1000 * 59 * 59 * 23);
    } else if (time) {
      _that.getParame.finishEnd = null;
    } else if (_that.$stateParams.finishEnd) {
      _that.getParame.finishEnd = _that.$stateParams.finishEnd;
      _that.finishEnd = new Date(parseInt(_that.$stateParams.finishEnd));
    };
  }

  // 搜索
  searchBt() {
    const _that = this;
    _that.timeTransform(1);
    this.goLists();
  }
  
  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchBt();
    }
  }

  // 翻页
  pageChanged() {
    this.goLists();
  }
  //路由跳转
  goLists() {
    this.$state.go('order.myOrder', this.getParame);
  }
}

myOrderCtrl.$inject = ['$state', '$stateParams', 'orderService', 'ExportService'];
export default angular.module('myOrder', [])
  .controller('myOrderCtrl', myOrderCtrl)
  .name;