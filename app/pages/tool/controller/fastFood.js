const _init_ = Symbol('_init_');
class fastFoodCtrl {
  constructor($state, $stateParams, toolService, $filter) {
    var getParame = {
      status: Number($stateParams.status) || null,
      type: Number($stateParams.type) || null,
      payType: Number($stateParams.payType) || null,
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10,
      storeId: $stateParams.storeId || null,
      shopName: $stateParams.shopName || null,
      no: $stateParams.no || null
    };
    var status = [{
      dataCode: 3,
      dataName: '待支付'
    }, {
      dataCode: 4,
      dataName: '已完成'
    }, {
      dataCode: 5,
      dataName: '手动取消'
    }, {
      dataCode: 6,
      dataName: '自动取消'
    }, {
      dataCode: 7,
      dataName: '已退款'
    }];
    var type = [{
      dataCode: 4,
      dataName: '微信扫描'
    }, {
      dataCode: 5,
      dataName: '支付宝扫描'
    }];
    var payType = [{
      dataCode: 1,
      dataName: '微信'
    }, {
      dataCode: 2,
      dataName: '线下'
    }, {
      dataCode: 3,
      dataName: '支付宝'
    }];
    Object.assign(this, {
      $state, 
      $stateParams, 
      toolService,
      getParame,
      status,
      type,
      payType,
      $filter
    });
    this[_init_]();
  }
  [_init_]() {
    console.log('init tool fastFood ctrl');
    this.getFastFoodList();
  }

  //选择时间
  selDate(str) {
    const _that = this;
    if (str === 'start') {
      _that.endDateOps.minDate = _that.beginTime;
    } else {
      _that.startDateOps.maxDate = _that.endTime;
    }
  }

  // 快餐订单列表
  getFastFoodList() {
    if (!this.getParame.storeId){
      return;
    }
    this.timeTransform();
    let _that = this;
    _that
    .toolService
    .getFastFoodList(this.getParame)
    .then((res) => {
      _that.fastOrderList = res.list;
      _that.total = res.total;
      console.log(_that.fastOrderList);
    });
  }

   //获取门店名称信息
  getStoreName(val) {
    let _that = this;
    if (_that.getParame.storeId && !val) {
      _that.toolService.getStoreId(_that.getParame.shopName).then(function (data) {
        _that.storeList = data.list;
      });
      return;
    } else if (!_that.getParame.storeId && !val) {
      _that.getParame.storeId = '';
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
    this.storeList.forEach(item => {
      if (item.id === this.getParame.storeId) {
        this.getParame.shopName = item.name;
      }
    });
    this.getParame.pageNo = 1;
    this.timeTransform(1);
    this.goLists();
  }

  // 翻页
  pageChanged() {
    this.goLists();
  }
  //路由跳转
  goLists() {
    this.$state.go('tool.fastFood', this.getParame);
  }
  //时间转换
  timeTransform(time) {
    const _that = this;
    if (_that.beginTime) {
      _that.getParame.beginTime = _that.$filter('date')(_that.beginTime, 'yyyy-MM-dd 00:00:00');
    } else if (time) {
      _that.getParame.beginTime = null;
    } else if (_that.$stateParams.beginTime) {
      _that.getParame.beginTime = _that.$stateParams.beginTime;
      _that.beginTime = new Date(_that.$stateParams.beginTime);
    };
    if (_that.endTime) {
      _that.getParame.endTime = _that.$filter('date')(_that.endTime, 'yyyy-MM-dd 23:59:59');
    } else if (time) {
      _that.getParame.endTime = null;
    } else if (_that.$stateParams.endTime) {
      _that.getParame.endTime = _that.$stateParams.endTime;
      _that.endTime = new Date(_that.$stateParams.endTime);
    };
  }
}

fastFoodCtrl.$inject = ['$state', '$stateParams', 'toolService', '$filter'];
export default angular.module('fastFood', [])
  .controller('fastFoodCtrl', fastFoodCtrl)
  .name;