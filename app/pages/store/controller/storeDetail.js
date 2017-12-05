//导入echartechart指令
import Echart from 'common/directive/mapDirective.js';
const _init_ = Symbol('_init_');
class CustomerDetailCtrl {
  constructor($http, $state, DialogService, $stateParams, CusService, $uibModal, $timeout, ExportService, ImgLightbox, $filter) {
    Object.assign(this, {$http, $state, DialogService, $stateParams, CusService, $uibModal, $timeout, ExportService, ImgLightbox, $filter});
    moment.locale('zh-cn');
    this.customerDetail = {};
    this.tabIndex = Number(this.$stateParams.tabIndex) || 0;
    // alert(typeof this.tabIndex)
    this.normalImg = require('../../../images/normal.png');
    this.storeService = {
      storeId: this.$stateParams.id,
      pageNo: 1,
      pageSize: 20
    };
    this.serviceParam = {};
    this.status = {
      '0': '正常',
      '1': '禁用',
      '2': '删除'
    };
    this.storeType = {
      'CREATED': '创建在客户池',
      'ONLINE_AUDIT': '完成建店审核数据同步至云后台',
      'PAY_AUDIT': '完成支付第三方审核',
      'SNACK_AUDIT': '完成快餐进件审核 ',
      'PAY_ORDER': '产生第一笔支付订单',
      'SNACK_ORDER': '产生第一笔快餐订单'
    };
    this.barcodesType = {
      'PAY': '聚合支付',
      'DESK_PAY1': '点餐（正）',
      'DESK_PAY2': '点餐（快）'
    };
    this.attribution = {
      'OFFICE': '办公楼/写字楼',
      'INDUSTRY': '工业园区',
      'SCHOOL': '学区',
      'BUSINESS': '商圈',
      'STREET': '沿街',
      'OTHER': '其它'
    };
    this.printerSource = {
      'SELFPROCUREMEN': '自购',
      'GIVE': '赠送',
      'OTHER': '其他'
    };
    this.printerType = {
      'USB': 'USB接口',
      'RJ45': '网口（RJ45）',
      'PARALLEL': '并行接口',
      'BLUETOOTH': '蓝牙',
      'OTHER': '其他'
    };
    this.storeOrders = {
      storeId: this.$stateParams.id,
      beginDate: null,
      endDate: null
    };
    this.callingSystemImageUrlList = [];
    this.kitchenSystemImageUrlList = [];
    this.posSystemImageUrlList = [];
    this.orderSystemImageUrlList = [];
    this.payBusinessAgreementArr = [];
    this.businessAgreementArr = [];
    this.vipBusinessAgreementArr = [];
    this[_init_]();
  }
  [_init_]() {
    let customerId = this.$stateParams.id;
    this.getCustomerDetail(customerId);
    this.getOtherDetail(customerId);
    this.getStoreService(this.storeService);
    this.param = {
      pageSize: 48,
      pageNo: 1,
      storeId: this.$stateParams.id
    };
    this.getQrcodeList();  //门店二维码
    this.getStoreLog(this.$stateParams.id);  //门店大事件
    this.searchBt(7);
    this.getQrUrl();
  }
  //获取门店详情
  getCustomerDetail(id) {
    let _that = this;
    _that.CusService.getCustomerDetail(id).then(function(data) {
      _that.customerDetail = data;
      if (_that.customerDetail.brandLogoUrl) {
        _that.customerDetail.brandLogoUrl += '?access_token=' + localStorage.token;
      }
    }, err => {
      console.log(err);
    });
  }
  //获取其他信息
  getOtherDetail(id) {
    let _that = this;
    _that.CusService.getOtherInfo(id).then(function(data) {
      _that.otherInfo = data;
      console.log(data);
      if (data.callingSystemImageUrl) { 
        angular.forEach(data.callingSystemImageUrl, function(item) {
          _that.callingSystemImageUrlList.push({url: _that.$filter('imgUrlWithToken')(item)});
        });
      }
      if (data.kitchenSystemImageUrl) {
        angular.forEach(data.kitchenSystemImageUrl, function(item) {
          _that.kitchenSystemImageUrlList.push({url: _that.$filter('imgUrlWithToken')(item)});
        });
      }
      if (data.posSystemImageUrl) {
        angular.forEach(data.posSystemImageUrl, function(item) {
          _that.posSystemImageUrlList.push({url: _that.$filter('imgUrlWithToken')(item)});
        });
      }
      if (data.orderSystemImageUrl) {
        angular.forEach(data.orderSystemImageUrl, function(item) {
          _that.orderSystemImageUrlList.push({url: _that.$filter('imgUrlWithToken')(item)});
        });
      }
      _that.payBusinessAgreementArr.push({url: _that.$filter('imgUrlWithToken')(data.payBusinessAgreement)});
      _that.businessAgreementArr.push({url: _that.$filter('imgUrlWithToken')(data.businessAgreement)});
      _that.vipBusinessAgreementArr.push({url: _that.$filter('imgUrlWithToken')(data.vipBusinessAgreement)});
    }, err => {
      console.log(err);
    });
  }
  //地图
  openMap() {
    const that = this;
    function getWinMap() {      
      if (window.AMap) {
        that.$timeout.cancel(that.mapTimeout);
        that.openModal();
      } else {
        $script('//webapi.amap.com/maps?v=1.3&key=81fac60f1f32651fd89a80449806238d', () => {
          that.mapTimeout = that.$timeout(getWinMap, 300);
        });
      }      
    }
    getWinMap();
  }
  openModal() {
    let _that = this;
    let $uibModal = this.$uibModal;
    let fn = function ($uibModalInstance) {
      var $ctrl = this;
      $ctrl.cancel = function () {
        $uibModalInstance.dismiss();
      };
      $ctrl.addXY = [_that.customerDetail.poiLng, _that.customerDetail.poiLat];
    };
    fn.$inject = ['$uibModalInstance'];

    $uibModal.open({
      size: 'lg',
      windowClass: 'commonDialog',
      templateUrl: 'openMap.html',
      controller: fn,
      controllerAs: '$ctrl'
    }).result.then(function () {
      console.log('ok');
    }, function () {
      console.log('cancle');
    });
  }

  // 二维码配置url
  getQrUrl() {
    let _that = this;
    let editParam = {};
    _that.CusService
        .qrModel(editParam)
        .then(function(data) {
          console.log(data);
          _that.qrUrl = data;
        });
  }
  //显示二维码
  qrmodel(item) {
    let _that = this;
    let sendData = {};
    sendData.content = _that.qrUrl + '?code=' + item.id;
    let fn = function($uibModalInstance) {
      var $ctrl = this;
      $ctrl.ok = function() {
        $uibModalInstance.close();
      };
      $ctrl.cancel = function() {
        $uibModalInstance.dismiss();
      };
      let req = {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }; 
      _that.CusService
        .qrCode(sendData, req)
        .then(function(data) {
          $ctrl.qrImg = URL.createObjectURL(new Blob([[], data.data], {type: data.headers('content-type')}));
          console.log($ctrl.qrImg);
          console.log(data);
        }, function(err) {
          console.log(err);
        });
    };
    fn.$inject = ['$uibModalInstance'];
    _that
        .$uibModal
        .open({
          windowClass: 'commonDialog',
          templateUrl: 'preview.html',
          controller: fn,
          controllerAs: '$ctrl'
        }); 
  }

  //按需加载chart
  // getChart() {
  //   this.stats = 7;
    // let _that = this;
    // let fn = function($q, $ocLazyLoad) {
    //   return $q((resolve) => {
    //     require.ensure([], () => {
    //       // load whole module
    //       let module = require('common/directive/mapDirective.js');
    //       $ocLazyLoad.load({
    //         name: module.default
    //       });
    //       resolve();
    //     });
    //   });
    // }; 
    // fn.$inject = ['$q', '$ocLazyLoad']; 
  // }

  //获取服务费列表
  getStoreService(params) {
    let _that = this;
    _that.CusService.getStoreService(params).then(data => {
      // console.log(data);
      _that.services = data.list;
      var nowDate = new Date().getTime();
      angular.forEach(_that.services, function(item) {
        if (item.serviceEnd < nowDate) {
          // console.log(item.serviceEnd < nowDate);
          item.passedDate = true;
        }
      });
      _that.total = data.total;
    }, err => {
      console.log(err);
    });
  }
  // 验证返回码
  validHttpCode(c) {
    var msg;
    switch (c) {
      case 'ServiceCharge_007':
        msg = '该门店已使用的服务试用费不能修改有效期';
        break;      
      case 'ServiceCharge_008':
        msg = '门店试用费结束时间不能小于当前时间';
        break;      
      case 'ServiceCharge_009':
        msg = '门店试用费已过期，不能修改有效期';
        break;      
    }
    return msg;
  }
  // 修改服务费（试用费）
  editServiceCharge(charge) {
    let _that = this;
    let fn = function($uibModalInstance) {
      var $ctrl = this;
      $ctrl.charge = {
        serviceName: charge.serviceName,
        serviceStart: charge.serviceStart,
        serviceEnd: charge.serviceEnd
      };
      _that.serviceParam.id = charge.id;
      $ctrl.onTimeSet = function(newDate, oldDate) {
        $ctrl.newDateTime = newDate.getTime();
        $ctrl.oldDateTime = oldDate;
        $ctrl.showDateTimePicker = false;
      };
      $ctrl.ok = function() {
        _that.serviceParam.serviceEnd = $ctrl.newDateTime;
        $ctrl.submitTime = true;
        _that
          .CusService
          .editStoreService(_that.serviceParam)
          .then((data) => {
            _that.DialogService.showMessage('修改成功', true, 2000);
            charge.serviceEnd = $ctrl.newDateTime;
            $uibModalInstance.close();
          }, (data) => {
            var code = data.data.code;
            var msg = _that.validHttpCode(code);
            if (msg) {
              _that.DialogService.showMessage(msg, false, 2500);
            }
            $uibModalInstance.close();            
          });
      };
      $ctrl.cancel = function() {
        $uibModalInstance.dismiss();
      };
    };
    fn.$inject = ['$uibModalInstance'];
    _that
      .$uibModal
      .open({
        windowClass: 'commonDialog',
        templateUrl: 'editServiceCharge.html',
        controller: fn,
        controllerAs: '$ctrl'
      })
      .result
      .then(function() {
        // console.log('执行');
      }, function() {
        // console.log('取消操作');
      });
  }
  //新增服务费有效期
  addService() {
    this.DialogService.openModal({
      template: require('../views/modal/addService.html'),
      controller: AddServiceCtrl,
      controllerAs: 'ctrl',
      size: 'md',
      resolve: {
        opts: () => {
          return {
            storeId: this.$stateParams.id
          };
        }
      }
    }).then(() => {
      this.DialogService.showMessage('添加成功!', true);
      this.getStoreService(this.storeService);
    });
  }
  //获取门店大事件
  getStoreLog(id) {
    // let _that = this;
    this.CusService.getStoreLog(id).then(data => {
      // console.log(data);
      this.storeLog = data.reverse();
      // this.storeLog = [
      //   {type: 'CREATED', user: '刘涛', occurrenceTime: 1500271139000, usedTime: null, orderNo: null, tableNo: null, amount: null},
      //   {type: 'ONLINE_AUDIT', user: '刘涛', occurrenceTime: 1500271139000, usedTime: 0.00, orderNo: null, tableNo: null, amount: null}
      // ];
    });
  }

  searchBt(day) {
    // console.log(day);
    // this.stats = day;
    this.endDate = new Date().getTime() - 24 * 60 * 60 * 1000;
    this.beginDate = new Date().setDate(new Date().getDate() - day);
    this.selDate(day);
  }

  // 获取门店二维码
  getQrcodeList() { 
    const _that = this;    
    // 清空数组 清空字符串
    _that.choseArr = [];
    _that.str = '';    
    // _that.param.status = status;
    //  实时刷新数据
    // function getcode() {  
    //   // console.log(_that.$state);  
    //   if (_that.$state.current.name !== 'store.storeDetail') {
    //     _that.$timeout.cancel(_that.mapTimeout);
    //   } else {
    _that
    .CusService
    .getQrcodelist(_that.param)
    .then((data) => {
      _that.qrcodeList = data.list; //[{deskName: '名流33', type: 'DESK_PAY1'}, {deskName: '名流13', type: 'DESK_PAY2'}, {type: 'DESK_PAY1'}, {type: 'DESK_PAY2'}];        
      _that.qrcodeTotal = data.total; 
      // console.log(_that.qrcodeList);
      //清空定时器      
      // if (_that.mapTimeout) {
      //   _that.$timeout.cancel(_that.mapTimeout);
      // };
      // //每隔6秒调用列表
      // _that.mapTimeout = _that.$timeout(function() {
      //   _that.param.pageNo = 1;
      //   getcode();
      // }, 6000);
      _that.all(false);
    }, (err) => {
      let msg = _that.$filter('qrcodeRespErrMsg')(err.data.code);
      msg && _that.DialogService.showMessage(msg, false);
    });
    //   };  
    // }
    // getcode();
    // _that
    //   .CusService
    //   .getQrcodelist(_that.param)
    //   .then((data) => {
    //     _that.qrcodeList = data.list; //[{deskName: '名流33', type: 'DESK_PAY1'}, {deskName: '名流13', type: 'DESK_PAY2'}, {type: 'DESK_PAY1'}, {type: 'DESK_PAY2'}];        
    //     _that.param.pageNo = data.pageNum;
    //     _that.qrcodeTotal = data.total; 
    //     // console.log(_that.qrcodeList);      
    //     _that.all(false);       
    //   }, (err) => {
    //     let msg = _that.$filter('qrcodeRespErrMsg')(err.data.code);
    //     msg && _that.DialogService.showMessage(msg, false);
    //   });
  }

// 点击门店二维码拉取
  newcode() {
    this.tabIndex = 2;
    this.getQrcodeList();
  }

  //数据时间
  selDate(day) {  
    this.stats = day;
    if (this.beginDate && this.endDate) {
      this.timeTransform();
      let time = String(new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate());
      
      if (this.storeOrders.endDate === new Date(time).getTime()) {  //选择结束时间是前一天
        this.stats = Math.floor((this.storeOrders.endDate - this.storeOrders.beginDate) / 1000 / 60 / 60 / 24);
      } 
      // console.log(this.storeOrders.endDate); console.log(new Date(time).getTime());
    
      this.CusService.getStoreOrders(this.storeOrders).then((data) => {
        // this.$timeout(() => {
          // console.log(data);
        this.source = data;
        this.endDay = this.storeOrders.endDate;
        this.days = Math.floor((this.storeOrders.endDate - this.storeOrders.beginDate) / 1000 / 60 / 60 / 24);
        //  console.log(this.endDay);
        // this.source.reverse();
          // this.hasSource = true;
          // console.log(this.source);
        // }, 200);       
      });
    }
  }

    //导出
  export() {
    // this.storeOrders.access_token = localStorage.token;
    // this.ExportService.download('/customer/stores/orders/download', this.storeOrders, false);
    const _that = this;
    this.timeTransform();
    this.ExportService.get('/customer/store/orders/download', this.storeOrders).then(resp => {
      _that.ExportService.exportCSV(resp);
    }, err => {
      console.log(err);
    });
  }

  // 翻页
  pageChanged() {
    this.getStoreService(this.storeService);
  }

  //时间转换
  timeTransform() {
    const _that = this;
    if (_that.beginDate) {
      _that.storeOrders.beginDate = new Date(_that.beginDate).getTime() - 23 * 59 * 59 * 1000;
    } else {
      _that.storeOrders.beginDate = null;
    };
    if (_that.endDate) {
      let time = String(new Date(_that.endDate).getFullYear() + '/' + (new Date(_that.endDate).getMonth() + 1) + '/' + (new Date(_that.endDate).getDate() + 1));
      // console.log(time);

      _that.storeOrders.endDate = new Date(time).getTime();
    } else {
      _that.storeOrders.endDate = null;
    }
  }

    // 页码切换
  pageQrcodeChanged() {
    this.getQrcodeList();
  }
  // 查看图片
  openLightboxModal(images, index) {
    let _that = this;
    _that.ImgLightbox.openModal(images, index);
  };
}

CustomerDetailCtrl.$inject = ['$http', '$state', 'DialogService', '$stateParams', 'CusService', '$uibModal', '$timeout', 'ExportService', 'ImgLightbox', '$filter'];

export default angular.module('CustomerDetailModule', [Echart])
.controller('CustomerDetailCtrl', CustomerDetailCtrl)
.name;
/**
 *  添加服务费controller
 */
class AddServiceCtrl {
  constructor($uibModalInstance, $filter, PublicServer, CusService, opts) {
    Object.assign(this, {$modalInstance: $uibModalInstance, $filter, PublicServer, CusService, opts});
    this.getBusinessType();
    this.params = {
      storeId: this.opts.storeId
    };
  }
  //获取业务类型
  getBusinessType() {
    this.CusService.businessTypeSe(this.opts.storeId).then((data) => {
      this.businessType = data;
    });
  }
  //选择业务类型回调
  selBus(bus) {
    this.params.serviceName = bus && bus.serviceName ? bus.serviceName : null;
    this.params.businessId = bus && bus.businessId ? bus.businessId : null;
  }
  // 确认
  confirm() {
    const _that = this;
    _that.CusService.addServices(_that.params).then((data) => {
      _that.$modalInstance.close();
    });
  }
  // 取消
  cancel() {
    this.$modalInstance.dismiss();
  }
}
AddServiceCtrl.$inject = ['$uibModalInstance', '$filter', 'PublicServer', 'CusService', 'opts'];