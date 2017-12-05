const _init_ = Symbol('_init_');
class voucherCtrl {
  constructor($state, $stateParams, monitorService) {
    var getParame = {
      pageNum: $stateParams.pageNum || 1,
      status: $stateParams.status || null,
      brandId: $stateParams.brandId || null,
      couponName: $stateParams.couponName || null,
      couponType: $stateParams.couponType || null,
      endTime: $stateParams.endTime || null,
      shopId: $stateParams.shopId || null,
      startTime: $stateParams.startTime || null,
      size: $stateParams.size || 10
    };
    var couponType = [{
      dataCode: 'CASH',
      dataName: '现金券'
    }, {
      dataCode: 'DEDUCTE',
      dataName: '满减券'
    }];
    var status = [{
      dataCode: 'EXPIRED',
      dataName: '过期'
    }, {
      dataCode: 'NORMAL',
      dataName: '正常'
    }, {
      dataCode: 'INVALID',
      dataName: '作废'
    }];
    Object.assign(this, {
      monitorService,
      $stateParams,
      getParame,
      couponType,
      $state,
      status
    });
    this[_init_]();
  }
  [_init_]() {
    console.log('....init voucher ctrl');
    this.getVoucherList();
  }

  // 获取验券记录列表
  getVoucherList() {
    if (!this.getParame.shopId) {
      return;
    }
    let _that = this;    
    _that
      .monitorService
      .getSendCouponList(_that.getParame)
      .then((res) => {
        _that.voucherList = res.model;
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
    this.getVoucherList();
    this.goLists();
  }

  // 翻页
  pageChanged() {
    this.goLists();
    this.getVoucherList();
  }
  //路由跳转
  goLists() {
    this.$state.go('memberMonitor.voucher', this.getParame);
  }

  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchBt();
    }
  }
}

voucherCtrl.$inject = ['$state', '$stateParams', 'monitorService'];
export default angular.module('voucher', [])
  .controller('voucherCtrl', voucherCtrl)
  .name;