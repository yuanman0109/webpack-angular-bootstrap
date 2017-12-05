const _init_ = Symbol('_init_');

class AddCompCtrl {
  constructor (CompService, $stateParams, $state, CusService, $filter, $timeout, Upload, DialogService) {
    Object.assign(this, {CompService, $stateParams, $state, CusService, $filter, $timeout, Upload, DialogService});
    this.customerType = null;
    this.dishes = null;
    this.customerSource = null;
    this.business = [];
    this.defLogo = require('../../../images/company.png');
    //企业信息
    this.saveData = {
      brands: [
        {
          name: null,
          // customerTypeCode: null,
          // dishStyleCode: null,
          logoUrl: null
        }
      ]
    };
    
    this.scales = [
      {
        dataCode: 'SCALE_TEN',
        dataName: '10人以下'
      },
      {
        dataCode: 'SCALE_FIFTY',
        dataName: '10-50人'
      },
      {
        dataCode: 'SCALE_HUNDRED',
        dataName: '50-100人'
      },
      {
        dataCode: 'SCALE_FIVEHUNDRED',
        dataName: '100-500人'
      },
      {
        dataCode: 'SCALE_THOUSAND',
        dataName: '500-1000人'
      },
      {
        dataCode: 'SCALE_MAX',
        dataName: '1000人以上'
      }
    ];
    this[_init_]();
  }
  [_init_]() {
    let _that = this;
    // _that.getCustomerType();
    // _that.getDisheslist();
    _that.getBusinessType();
    //是否是修改企业
    this.companyId = _that.$stateParams.id;
  }
  //获取业务类型
  getBusinessType() {
    let _that = this;
    _that.CusService.getBusinessType().then(function (data) {
      _that.businessList = data;
      if (_that.companyId) {
        //初始化
        _that.CompService.getCompDetail(_that.companyId).then(function(data) {
          _that.saveData = data;
          if (_that.saveData.brands) {
            angular.forEach(_that.saveData.brands, (val, index) => {
              if (val.logoUrl) {
                val.logoUrl += '?access_token=' + localStorage.token;
              } 
            });
          }
          if (_that.saveData.businessType) {
            let business = _that.saveData.businessType.split(',');
            angular.forEach(business, (val, index) => {
              angular.forEach(_that.businessList, (v, i) => {
                if (val === v.dataCode) {
                  v.select = true;
                }
              });
            });
          }
        }, err => {
          console.log(err);
        });
      }
    }, err => {
      console.log(err);
    });
  }
  //获取客户类型
  // getCustomerType() {
  //   let _that = this;
  //   _that.CompService.getCustomerType().then(function(data) {
  //     _that.customerType = data;
  //   }, err => {
  //     console.log(err);
  //   });
  // }
  //获取菜系
  // getDisheslist() {
  //   let _that = this;
  //   _that.CusService.getDisheslist().then(function(data) {
  //     _that.dishes = data;
  //   }, err => {
  //     console.log(err);
  //   });
  // }
  //保存企业
  saveComp() {
    let _that = this;
    let fn, tipMsg;
    _that.saveData.businessType = [];
    angular.forEach(_that.businessList, (val, index) => {
      val.select && _that.saveData.businessType.push(val.dataCode);
    });
    if (_that.saveData.businessType.length === 0) {
      _that.DialogService.showMessage('业务类型至少选择一个', false);
      return;
    } else {
      _that.saveData.businessType = _that.saveData.businessType.join(',');
    }
    if (_that.saveData.id) {
      fn = _that.CompService.modifyComp(_that.saveData);
      tipMsg = '修改成功！';
    } else {
      fn = _that.CompService.saveComp(_that.saveData);
      tipMsg = '添加成功！';
    };
    fn.then(data => {
      _that.DialogService.showMessage(tipMsg);
      setTimeout(function() {
        _that.$state.go('store.compList');
      }, 1500);
    }, err => {
      const msg = _that.$filter('addCompErrMsg')(err.data.code);
      msg && _that.DialogService.showMessage(msg, false);
      console.log(err);
    });
  }
  //上传品牌logo
  uploadFiles(file, errFiles, index) {
    const _that = this;
    const url = '/api/publicimage/upload';
    if (file) {
      _that.Upload.upload({
        url: url,
        data: {
          file: file
        }
      })
      .then((response) => {
        let data = response.data;
        if (data.code === 'S200') {
          _that.saveData.brands[index].logoUrl = data.data.url + '?access_token=' + localStorage.token;
          _that.saveData.brands[index].logo = data.data.id;
        } else {
          _that.DialogService.showMessage(_that.$filter('respUploadMsg')(data.code), false);
        }
      });
    };
  }
   
  //添加品牌
  addBrand() {
    this.saveData.brands.push({
      name: null,
      // customerTypeCode: null,
      // dishStyleCode: null,
      logoUrl: null
    });
  }
  //删除品牌
  deleteBrand(index, count) {
    if (count) {
      this.DialogService.showMessage('该品牌已经有门店入驻，暂时无法删除！', false);
    } else {
      this.saveData.brands.splice(index, 1);
    }
  }
}
AddCompCtrl.$inject = ['CompService', '$stateParams', '$state', 'CusService', '$filter', '$timeout', 'Upload', 'DialogService'];
export default angular
  .module('AddCompModule', [])
  .controller('AddCompCtrl', AddCompCtrl)
  .name;