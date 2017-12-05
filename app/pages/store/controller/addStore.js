import 'style/amap_ui/pagination.css';
// import async from 'async';
class AddStoreCtrl {
  constructor($uibModal, $log, $http, $timeout, $location, $stateParams, CusService, PublicServer, $state, $filter, $ocLazyLoad, DialogService) {
    Object.assign(this, {$uibModal, $log, $http, $timeout, $location, $stateParams, CusService, PublicServer, $state, $filter, $ocLazyLoad, DialogService});
    this.tabIndex = 0;
    this.brandList = [];
    this.broadList = [];
    // this.openTime = new Date(2017, 1, 1, 0, 0, 0);
    // this.closeTime = new Date(2017, 1, 1, 23, 59, 0);
    this.basicInfo = {
      business: []
    };
    this.clickStatus = false;
    this.statuses = [
      {
        dataCode: 0,
        dataName: '正常'
      },
      {
        dataCode: 1,
        dataName: '禁用'
      },
      {
        dataCode: 2,
        dataName: '删除'
      }
    ];
    this.Properties = [
      {
        dataCode: 1,
        dataName: '直营'
      },
      {
        dataCode: 2,
        dataName: '加盟'
      }
    ];
    this.attribution = [
      {
        dataCode: 'OFFICE',
        dataName: '办公楼/写字楼'
      },
      {
        dataCode: 'INDUSTRY',
        dataName: '工业园区'
      },
      {
        dataCode: 'SCHOOL',
        dataName: '学区'
      },
      {
        dataCode: 'BUSINESS',
        dataName: '商圈'
      },
      {
        dataCode: 'STREET',
        dataName: '沿街'
      },
      {
        dataCode: 'OTHER',
        dataName: '其它'
      }
    ];
    this.grade = [{dataCode: 5.0, dataName: '5.0'}, {dataCode: 4.5, dataName: '4.5'}, {dataCode: 4.0, dataName: '4.0'}, {dataCode: 3.5, dataName: '3.5'},
    {dataCode: 3.0, dataName: '3.0'}, {dataCode: 2.5, dataName: '2.5'}, {dataCode: 2.0, dataName: '2.0'}, {dataCode: 1.5, dataName: '1.5'}, 
    {dataCode: 1.0, dataName: '1.0'}, {dataCode: 0.5, dataName: '0.5'}, {dataCode: 0.0, dataName: '0.0'}];
    this.getDisheslist();
    //是否是新增页面
    this.storeId = $stateParams.id;
    //判断是否是添加页面还是修改页面
    if (this.storeId) {
      this.Init();
      this.basicInfo = {};
      this.busTypeDisabled = ['PRINTER'];
      this.busTypeEdit = false;
    } else {
      // this.getBusinessType();
    }   
  }
  //修改页面初始化
  Init() {
    const _that = this;
    _that.getStoreInfo();
    // async.parallel({
    //   one: function(callback) {
    //     _that.getBusinessType(callback);      
    //   },
    //   two: function(callback) {
    //     _that.getStoreInfo(callback);
    //   }
    // }, function (error, results) {
    //   if (!error) {
    //     _that.businessList = results.one;
    //     _that.basicInfo = results.two;
    //     angular.forEach(_that.businessList, (val, index) => {
    //       val.select && _that.basicInfo.business.push(val.dataCode);
    //       angular.forEach(_that.basicInfo.business, (v, i) => {
    //         if (v.businessId === val.dataCode) {
    //           val.select = true;
    //         }
    //       });
    //     });
    //     if (_that.basicInfo.area) _that.basicInfo.area = Number(_that.basicInfo.area);
    //     _that.codes = [_that.basicInfo.province, _that.basicInfo.city, _that.basicInfo.county];
    //   } else {
    //     console.log(error);
    //   }
    // });    
  }
  openModal() {
    let _that = this;
    let $uibModal = this.$uibModal;
    let $log = this.$log;
    let basicInfo = this.basicInfo;
    let fn = function ($uibModalInstance) {
      var $ctrl = this;
      $ctrl.ok = function () {
        $uibModalInstance.close();
      };
      $ctrl.cancel = function () {
        $uibModalInstance.dismiss();
      };
      $ctrl.seldata = {
        address: '',
        name: '',
        poiId: '',
        poiLat: '',
        poiLng: '',
        provinceName: '',
        cityName: '',
        countyName: ''
      };
      $ctrl.sel = function () {
        $uibModalInstance.close();
        Object.assign(basicInfo, $ctrl.seldata);
        _that.names = [basicInfo.provinceName, basicInfo.cityName, basicInfo.countyName];
        _that.getaddressCode('00', 0);
      };
    };
    fn.$inject = ['$uibModalInstance'];
    $uibModal.open({
      size: 'lg',
      windowClass: 'commonDialog',
      templateUrl: 'openMap.html',
      controller: fn,
      controllerAs: '$ctrl',
      openedClass: 'map-warp'
    }).result.then(function () {
      $log.info('ok');
    }, function (err) {
      $log.info(err);
    });
  }
  replaceStr(e) {
    console.log(e);
  }
  //判断是否已经加载地图api
  openMap() {
    const that = this;
    function getWinMap() {
      if (window.AMap) {
        that.$timeout.cancel(that.mapTimeout);
        that.loadMapJs();
      } else {
        $script('http://webapi.amap.com/maps?v=1.3&key=81fac60f1f32651fd89a80449806238d', () => {
          that.mapTimeout = that.$timeout(getWinMap, 300);
        });
      }
    }
    getWinMap();
  }
  //加载地图依赖js
  loadMapJs() {
    $script('//webapi.amap.com/ui/1.0/plug/ext/jquery-1.12.4.min.js', () => {
      $script(['//webapi.amap.com/ui/1.0/main.js', '//a.amap.com/amap-ui/static/1.0/ui/misc/MarkerList/examples/jquery.twbsPagination.min.js'], 'mapUi');
      $script.ready('mapUi', () => {
        this.openModal();
      });
    });
  }
  //获取城市code
  getaddressCode(code, index) {
    let _that = this;
    let parms = {
      name: _that.names[index]
    };
    _that.CusService.getaddressCode(code, parms).then(function (data) {
      switch (index) {
        case 0:
          _that.basicInfo.provinceCode = data.areaCode;
          break;
        case 1:
          _that.basicInfo.cityCode = data.areaCode;
          break;
        case 2:
          _that.basicInfo.districtCode = data.areaCode;
          break;
      };
      if (data && data.areaCode && data.areaName && index < 2) {
        _that.getaddressCode(data.areaCode, ++index);
      }
    }, err => {
      console.log(err);
    });
  }
  //搜索品牌信息
  searchBrands(val) {
    let _that = this;
    if (!val) return;
    _that.CusService.searchBrands({ name: val }).then(function (data) {
      _that.brandList = data.list;
    }, err => {
      console.log(err);
    });
  }
  //选择品牌回调
  searchBrandsCallback(val) {
    let _that = this;
    _that.basicInfo.companyId = val.companyId;
    _that.basicInfo.companyName = val.companyName;
    _that.basicInfo.dishStyleCode = val.dishStyleCode;
  }
  //选择人员回调
  selCallback(per, type) {
    let _that = this;
    if (type === 'bd') {
      _that.basicInfo.bdUserName = per.realName;
      _that.basicInfo.bdUserNo = per.userNo;
    };
    if (type === 'fae') {
      _that.basicInfo.faeUserName = per.realName;
      _that.basicInfo.faeUserNo = per.userNo;
    };
    if (type === 'ls') {
      _that.basicInfo.lsUserName = per.realName;
      _that.basicInfo.lsUserNo = per.userNo;
    }
  }
  //保存基本信息
  saveStore() {
    let _that = this;
    let fn, tipMsg;
    // _that.basicInfo.openingTime = _that.$filter('date')(_that.openTime, 'HH:mm');
    // _that.basicInfo.closingTime = _that.$filter('date')(_that.closeTime, 'HH:mm');
    if (_that.basicInfo.business.length === 0 && _that.busTypeEdit === false) {
      _that.DialogService.showMessage('业务类型至少选择一个', false);
      return;
    }
    if (_that.storeId) {
      fn = _that.CusService.modifyStore(_that.basicInfo);
      tipMsg = '修改成功';
    } else {
      fn = _that.CusService.saveStore(_that.basicInfo);
      tipMsg = '添加成功';
    }
    _that.clickStatus = true;
    fn.then(function (data) {
      _that.DialogService.showMessage(tipMsg);
      setTimeout(function() {
        if (_that.storeId) {
          history.go(-2);
        } else {
          _that.$state.go('store.list');
        }
      }, 1500);
    }, err => {
      const msg = _that.$filter('addStoreErrMsg')(err.data.code);
      msg && _that.DialogService.showMessage(msg, false);
      _that.clickStatus = false;
      console.log(err);
    });
  }
  //获取菜系列表
  getDisheslist() {
    let _that = this;
    _that.CusService.getDisheslist().then(function (data) {
      _that.disheslist = data;
    }, err => {
      console.log(err);
    });
  }
  //获取销售维护人信息
  getSaleName(val) {
    let _that = this;
    if (!val) return;
    _that.PublicServer.getUserFormName(val).then(function (data) {
      _that.userList = data.list;
    }, err => {
      console.log(err);
    });
  }
  //上传
  uploadFiles(file, errFiles) {
    let _that = this;
    _that.PublicServer.uploadFiles(file, errFiles, 'publicimage').then(data => {
      const img = data.data;
      if (img.code === 'S200') {
        _that.basicInfo.logoUrl = img.data.url;
        _that.basicInfo.logo = img.data.id;
      } else {
        _that.DialogService.showMessage(_that.$filter('respUploadMsg')(img.code), false);
      }
      console.log(data);
    });
  }
  //获取门店详情
  getStoreInfo() {
    const _that = this;
    _that.CusService.getCustomerDetail(this.storeId).then(function (data) {
      // callback(null, data);
      _that.basicInfo = data;
      if (_that.basicInfo.area) _that.basicInfo.area = Number(_that.basicInfo.area);
      _that.codes = [_that.basicInfo.province, _that.basicInfo.city, _that.basicInfo.county];
      // _that.basicInfo = data;
      // if (data.area) _that.basicInfo.area = Number(data.area);
      // _that.codes = [_that.basicInfo.province, _that.basicInfo.city, _that.basicInfo.county];
      // let openTime = new Date('2017/01/01 ' + (_that.basicInfo.openingTime || '0:00'));
      // _that.basicInfo.openTime = openTime;
      // let closeTime = new Date('2017/01/01 ' + (_that.basicInfo.closingTime || '23:59'));
      // _that.basicInfo.closeTime = closeTime;
    }, err => {
      console.log(err);
    });
  }
}
AddStoreCtrl.$inject = [
  '$uibModal',
  '$log',
  '$http',
  '$timeout',
  '$location',
  '$stateParams',
  'CusService',
  'PublicServer',
  '$state',
  '$filter',
  '$ocLazyLoad',
  'DialogService'
];
export default angular
  .module('AddStoreModule', [])
  .controller('AddStoreCtrl', AddStoreCtrl)
  .name;