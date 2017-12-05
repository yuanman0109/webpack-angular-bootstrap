const _init_ = Symbol('_init_');
class payOrderListCtrl {
  constructor($state, $stateParams, toolService, $filter) {
    var getParame = {
      channel: Number($stateParams.channel) || null,
      payType: Number($stateParams.payType) || null,
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10,
      access_token: localStorage.token,
      shopId: $stateParams.shopId || null,
      search: $stateParams.search || null,
      shopName: $stateParams.shopName || null
    };
    var channel = [{
      dataCode: 3,
      dataName: '支付宝'
    }, {
      dataCode: 2,
      dataName: '微信'
    }];
    var payType = [{
      dataCode: 3,
      dataName: '支付宝'
    }, {
      dataCode: 1,
      dataName: '微信'
    }, {
      dataCode: 4,
      dataName: '储值卡'
    }];
    Object.assign(this, {
      $state, 
      $stateParams, 
      toolService,
      getParame,
      status,
      channel,
      payType,
      $filter
    });
    this.payStartHolder = '支付成功开始时间';
    this.payEndHolder = '支付成功结束时间';
    this[_init_]();
  }
  [_init_]() {
    this.getPayOrderList();
  }

  // 支付订单列表
  getPayOrderList() {
    if (!this.getParame.shopId) {
      return;
    }
    this.timeTransform();
    let _that = this;
    _that
    .toolService
    .getPayOrderList(this.getParame)
    .then((res) => {
      _that.fastOrderList = res.list;
      _that.total = res.total;
    });
  }

   //获取门店名称信息
  getStoreName(val) {
    let _that = this;
    if (_that.getParame.shopId && !val) {
      _that.toolService.getStoreId(_that.getParame.shopName).then(function (data) {
        _that.storeList = data.list;
      });
      return;
    } else if (!_that.getParame.shopId && !val) {
      _that.getParame.shopId = '';
      return;
    };
    _that.toolService.getStoreId(val).then(function (data) {
      _that.storeList = data.list;
    }, err => {
      console.log(err);
    });
  }
  store() {
    this.storeList = [];
  }

  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchBt();
    }
  }

  // 搜索
  searchBt() {
    let _that = this;
    _that.storeList.forEach(item => {
      if (item.id === _that.getParame.shopId) {
        _that.getParame.shopName = item.name;
      }
    });
    _that.getParame.pageNo = 1;
    _that.timeTransform(1);
    _that.goLists();
  }

  // 翻页
  pageChanged() {
    this.goLists();
  }
   //路由跳转
  goLists() {
    this.$state.go('tool.payOrderList', this.getParame);
  }
  //时间转换
  timeTransform(time) {
    const _that = this;
    // console.log(_that.beginTime);
    // console.log(_that.endTime);
    if (_that.startTime) {
      _that.getParame.payedTimeStart = _that.$filter('date')(_that.startTime, 'yyyy-MM-dd 00:00:00');
    } else if (time) {
      _that.getParame.payedTimeStart = null;
    } else if (_that.$stateParams.payedTimeStart) {
      _that.getParame.payedTimeStart = _that.$stateParams.payedTimeStart;
      _that.startTime = new Date(_that.$stateParams.payedTimeStart);
    };
    if (_that.endTime) {
      _that.getParame.payedTimeEnd = _that.$filter('date')(_that.endTime, 'yyyy-MM-dd 23:59:59');
    } else if (time) {
      _that.getParame.payedTimeEnd = null;
    } else if (_that.$stateParams.payedTimeEnd) {
      _that.getParame.payedTimeEnd = _that.$stateParams.payedTimeEnd;
      _that.endTime = new Date(_that.$stateParams.payedTimeEnd);
    };
  }
}

payOrderListCtrl.$inject = ['$state', '$stateParams', 'toolService', '$filter'];
export default angular.module('payOrderList', [])
  .controller('payOrderListCtrl', payOrderListCtrl)
  .name;