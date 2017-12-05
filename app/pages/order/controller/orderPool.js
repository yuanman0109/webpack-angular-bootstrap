const _init_ = Symbol('_init_');

class orderPoolCtrl {
  constructor($state, $stateParams, orderService, ExportService) {
    this.startOpen = false;
    this.endOpen = false;
    Object.assign(this, {
      $state,
      $stateParams,
      orderService,
      ExportService
    });
    this.getParame = {
      businessId: $stateParams.businessId || null,
      type: $stateParams.type || null,
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10,
      storeName: $stateParams.storeName || null,
      taskType: $stateParams.taskType || null,
      createUser: $stateParams.createUser || null
    };
    // this.getType = {
    //   XINZHUANG: '新装',
    //   WEIHU: '维护'
    // };
    this.typeList = [{
      name: 'SYS_PAY',
      type: '支付-系统派单'
    }, {
      name: 'MANUAL',
      type: '人工派单'
    }, {
      name: 'SERVICE_CHARGE_REMIND',
      type: '服务费到期提醒'
    }];
    this[_init_]();
  }
  [_init_]() {
    console.log('...init order list ctrl');
    this.timestamp = (new Date()).valueOf();
    this.getOrderPool();
    this.getTaskList();
    this.getBusiness();
  }
  // 选择时间
  selDate(str) {
    const _that = this;
    if (str === 'start') {
      _that.endDateOps.minDate = _that.createStart;
    } else {
      _that.startDateOps.maxDate = _that.createEnd;
    }
  }

  // 工单池列表
  getOrderPool() {
    this.timeTransform();
    let _that = this;
    _that
    .orderService
    .getOrderPoolList(_that.getParame)
    .then((res) => {
      _that.poolList = res.list;
      _that.total = res.total;
    }, (err) => {
      console.log(err);
    });
  }

  // 任务类型
  getTaskList() {
    let _that = this;
    _that
    .orderService
    .getTaskType()
    .then((res) => {
      _that.taskType = res;
      console.log(res);
    });
  }

  // 业务类型
  getBusiness() {
    let _that = this;
    _that
    .orderService
    .getBusinessType()
    .then((res) => {
      _that.businessType = res;
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
  focus() {
    this.userList = [];
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
  }

  // 搜索
  searchBt() {
    this.timeTransform(1);
    this.goLists();
  }

  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchBt();
    }
  }
    //路由跳转
  goLists() {
    this.$state.go('order.pool', this.getParame);
  }

  // 导出
  export() {
    this.storeName = this.getParame.storeName;
    this.businessId = this.getParame.businessId;
    this.type = this.getParame.type;
    this.createUser = this.getParame.createUser;
    let params = {
      'access_token': localStorage.token,
      'storeName': this.storeName,
      'businessId': this.businessId,
      'taskType': this.getParame.taskType,
      'type': this.type,
      'createUser': this.createUser,
      'createEnd': this.getParame.createEnd,
      'createStart': this.getParame.createStart
    };
    this.ExportService.download('/workorders/_pc/export', params, false);
  };

  // 翻页
  pageChanged() {
    this.goLists();
  }
}

orderPoolCtrl.$inject = ['$state', '$stateParams', 'orderService', 'ExportService'];
export default angular.module('orderPool', [])
  .controller('orderPoolCtrl', orderPoolCtrl)
  .name;