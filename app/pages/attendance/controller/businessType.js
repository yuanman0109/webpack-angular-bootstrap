export default class businessTypeCtrl {
  constructor(CusService, $scope) {
    Object.assign(this, {CusService, $scope});    
    this.targetIndex = 0;
    this.business = [];
    this.getBusinessType();
    $scope.$watch(() => {
      return this.result;
    }, (newVal, oldVal) => {
      if (newVal) {
        this.getDefaultCheck();
      }
    }, true);
  }
  // 设置默认选中
  getDefaultCheck() {    
    let _that = this;
    angular.forEach(_that.list, (val, index) => {
      val.select = false;
      angular.forEach(_that.result, (v, i) => {
        if (v.businessId === val.dataCode || v === val.dataCode) {
          val.select = true;
        }
      });
    });
  }
  // 设置禁用某个些项
  getDisabled() {
    let _that = this;
    angular.forEach(_that.list, (val, index) => {
      angular.forEach(_that.fewdisabled, (item, i) => {
        if (item === val.dataCode) {
          val.disabled = true;
        }
      });
    });
  }
  // 获取业务类型
  getBusinessType() {
    let _that = this;
    _that.CusService.getBusinessType().then(function (data) { 
      _that.list = data;
      if (_that.result) {
        _that.getDefaultCheck();
        _that.getBusiness();
      }
      if (_that.fewdisabled) {
        _that.getDisabled();
      }
    }, err => {
      console.log(err);
    });
  }
  /*
   *择百味云会员，则百味云支付默认选中；如果取消百味云支付，则百味云会员取消；
   *择百味云秒结，则百味云支付默认选中；如果取消百味云支付，则百味云秒结取消；
   *选择点餐（快），则百味云支付默认选中；如果取消百味云支付，则点餐（快）取消；
  */
  businessChange(bus) {
    let _that = this,
        code = bus.dataCode,
        select = bus.select;
    //百味云支付取消
    if (!select && code === 'PAY') {
      let arr = ['SNACK', 'SPAY', 'VIP'];
      arr.forEach((val, index) => {
        this.setBusinessSelect(val, false);
      });
    }
    //秒结，快餐，会员选中
    if (select && (code === 'SNACK' || code === 'SPAY' || code === 'VIP')) {
      _that.setBusinessSelect('PAY', true);
    }
    _that.getBusiness();
  }
  //设置select
  setBusinessSelect(code, sel) {
    let _that = this;
    angular.forEach(_that.list, function(item, index) {
      if (item.dataCode === code) {
        item.select = sel;
      }
    });
  }
  //返回结果
  getBusiness() {
    let _that = this;
    _that.business = [];
    angular.forEach(_that.list, function(item, index, arr) {
      if (item.select === true) {
        _that.business.push(item.dataCode);
      }
    });
    _that.result = _that.business;
  }
}
businessTypeCtrl.$inject = ['CusService', '$scope'];