const _init_ = Symbol('_init_');
class testCouponCtrl {
  constructor($state, $stateParams, monitorService) {
    var getParame = {
      pageNum: $stateParams.pageNum || 1,
      size: $stateParams.size || 10,
      brandId: $stateParams.brandId || null,
      code: $stateParams.code || null,
      couponName: $stateParams.couponName || null,
      couponType: $stateParams.couponType || null,
      endTime: $stateParams.endTime || null,
      no: $stateParams.no || null,
      phone: $stateParams.phone || null,
      shopId: $stateParams.shopId || null,
      startTime: $stateParams.startTime || null,
      access_token: localStorage.token      
    };
    var couponType = [{
      dataCode: 'CASH',
      dataName: '现金券'
    }, {
      dataCode: 'DEDUCTE',
      dataName: '满减券'
    }];
    Object.assign(this, {
      monitorService,
      $stateParams,
      getParame,
      couponType,
      $state
    });
    this[_init_]();
  }
  [_init_]() {
    console.log('...init testCoupon ctrl');
    this.getCouponList();
  }

  // 获取验券记录列表
  getCouponList() {
    if (!this.getParame.shopId) {
      return;
    }
    let _that = this;
    console.log(_that.getParame);
    _that
      .monitorService
      .getValidCouponList(_that.getParame)
      .then((res) => {
        _that.couponList = res.model;
        _that.total = res.total;
        console.log(res);
      });
  }
  //获取门店名称信息
  getStoreName(val) {
    let _that = this;
    if (_that.getParame.shopId && !val) {
      _that.monitorService.getStoreId(_that.shopName).then(function (data) {
        _that.storeList = data.list;
      });
      return;
    } else if (!_that.getParame.shopId && !val) {
      _that.getParame.shopId = '';
      return;
    };
    _that.monitorService.getStoreId(val).then(function (data) {
      _that.storeList = data.list;
    }, err => {
      console.log(err);
    });
  }
  store() {
    this.storeList = [];
  }
  // 搜索
  searchBt() {
    this.storeList.forEach(item => {
      if (item.id === this.getParame.shopId) {
        this.shopName = item.name;
      }
    });
    this.getParame.pageNum = 1;
    this.getCouponList();
    this.goLists();
  }
  // 翻页
  pageChanged() {
    this.goLists();
    this.getCouponList();
  }
  //路由跳转
  goLists() {
    this.$state.go('memberMonitor.testCoupon', this.getParame);
  }
  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchBt();
    }
  }
}

testCouponCtrl.$inject = ['$state', '$stateParams', 'monitorService'];
export default angular.module('testCoupon', [])
  .controller('testCouponCtrl', testCouponCtrl)
  .name;