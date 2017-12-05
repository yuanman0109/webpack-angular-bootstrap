'use strict';
const _init_ = Symbol('_init_');

export default class storeVerifyDetailsCtrl {
  constructor($stateParams, DialogService, storeService, $filter, $timeout, ImgLightbox) {
    var verifyDetail = [];
    Object.assign(this, {
      $stateParams,
      DialogService,
      storeService,
      $filter,
      $timeout,
      ImgLightbox,
      verifyDetail
    });
    this.property = {
      '1': '直营',
      '2': '加盟'
    };
    this.verType = {
      WAIT: '释放',
      GET: '领取',
      SUBMIT: '提交',
      REJECT: '驳回',
      ONLINE: '通过'
    };
    this.status = {
      '0': '正常',
      '1': '禁用',
      '2': '删除'
    };
    this.attribution = {
      'OFFICE': '办公楼/写字楼',
      'INDUSTRY': '工业园区',
      'SCHOOL': '学区',
      'BUSINESS': '商圈',
      'STREET': '沿街',
      'OTHER': '其它'
    };
    this[_init_]();
  }

  [_init_]() {
    console.log('Init store verify details ctrl');
    var storeId = this.$stateParams.id;
    console.log('current store id : ' + storeId);
    this.getVerifyDetail(storeId);
  }

  // 审核弹窗
  verify() {
    if (!this.verifyDetail.poiLat || !this.verifyDetail.poiLng) {
      this.DialogService.showMessage('请先获取经纬度！', false);
      return;
    }
    this.DialogService
      .openModal({
        template: require('../views/modal/verify.modal.html'),
        controller: verifyModalCtrl,
        controllerAs: 'ctrl',
        resolve: {
          opts: () => {
            return {
              'id': this.$stateParams.id,
              'companyName': this.verifyDetail.companyName,
              'accountNo': this.verifyDetail.accountNo,
              'companyId': this.verifyDetail.companyId,
              'comTotal': this.comTotal,
              'brandTotal': this.brandTotal,
              'brandName': this.verifyDetail.brandName,
              'brandId': this.verifyDetail.brandId,
              'poiLat': this.verifyDetail.poiLat,
              'poiLng': this.verifyDetail.poiLng
            };
          }
        }
      })
      .then(result => {
        console.log(this.$stateParams.id);
      }).catch(error => {
        console.log(error);
      });
  }

  //查询企业编号
  getCompanyId(name) {
    let _that = this;
    _that
      .storeService
      .getCompanyId({
        name: name,
        fullMatch: true
      })
      .then((data) => {
        _that.comTotal = data.total;
        if (_that.comTotal <= 0) {
          _that.isNewCompany = true;
        } else {
          _that.isNewCompany = false;
        }
      });
  }

  //查询品牌编号
  getBrandId(name) {
    let _that = this;
    _that
      .storeService
      .getBrandId({
        name: name,
        fullMatch: true
      })
      .then((data) => {
        _that.brandTotal = data.total;
        if (_that.brandTotal <= 0) {
          _that.isNewBrand = true;
        } else {
          _that.isNewBrand = false;
        }
      });
  }

  // 获取审核详情
  getVerifyDetail(id) {
    let _that = this;
    _that
      .storeService
      .getVerifyDetail(id)
      .then((data) => {
        _that.verifyDetail = data;
        if (_that.verifyDetail.logoUrl) {
          _that.verifyDetail.logoUrl = _that.$filter('imgUrlWithToken')(_that.verifyDetail.logoUrl);
          _that.logoArr = [
            {
              url: _that.verifyDetail.logoUrl
            }
          ];
        };
        if (_that.verifyDetail.brandLogoUrl) {
          _that.verifyDetail.brandLogoUrl = _that.$filter('imgUrlWithToken')(_that.verifyDetail.brandLogoUrl);
          _that.brandLogoArr = [
            {
              url: _that.verifyDetail.brandLogoUrl
            }
          ];
        };
        if (_that.verifyDetail.vipBusinessAgreement) {
          _that.verifyDetail.vipBusinessAgreement = _that.$filter('imgUrlWithToken')(_that.verifyDetail.vipBusinessAgreement);
          _that.vipBusinessAgreementArr = [
            {
              url: _that.verifyDetail.vipBusinessAgreement
            }
          ];
        };
        _that.getCompanyId(_that.verifyDetail.companyName);
        _that.getBrandId(_that.verifyDetail.brandName);
        _that.getVerifyLog({
          businessId: _that.verifyDetail.businessId,
          storeId: _that.verifyDetail.storeId
        });
        console.log(_that.verifyDetail);
      });
  }

  //获取审核日志
  getVerifyLog(param) {
    const _that = this;
    _that.storeService.getVerifyLog(param).then((data) => {
      _that.verifyLog = data;
    });
  }
  //打开地图按钮
  openMap() {
    const that = this;
    that.isAMap(that.openModal.bind(that));
  }
  //判断是否已经加载地图api
  isAMap(fn) {
    const that = this;
    function getWinMap() {      
      if (window.AMap) {
        that.$timeout.cancel(that.mapTimeout);
        that.loadMapJs(fn);
      } else {
        $script('//webapi.amap.com/maps?v=1.3&key=81fac60f1f32651fd89a80449806238d', () => {
          that.mapTimeout = that.$timeout(getWinMap, 300);
        });
      }      
    }
    getWinMap();
  }
  //加载地图依赖js
  loadMapJs(fn) {
    $script('//webapi.amap.com/ui/1.0/plug/ext/jquery-1.12.4.min.js', () => {
      $script(['//webapi.amap.com/ui/1.0/main.js', '//a.amap.com/amap-ui/static/1.0/ui/misc/MarkerList/examples/jquery.twbsPagination.min.js'], 'mapUi');
      $script.ready('mapUi', () => {
        fn();
      });
    });
  }
  //获取经纬度
  openModal() {
    const that = this;
    that.DialogService.openModal({
      template: require('../views/modal/map.modal.html'),
      controller: mapModalCtrl,
      controllerAs: 'ctrl',
      size: 'lg',
      resolve: {
        opts: () => {
          return {
            'id': this.$stateParams.id,
            'name': this.verifyDetail.name,
            'companyName': this.verifyDetail.companyName,
            'accountNo': this.verifyDetail.accountNo,
            'companyId': this.verifyDetail.companyId,
            'comTotal': this.comTotal,
            'brandTotal': this.brandTotal,
            'brandName': this.verifyDetail.brandName,
            'brandId': this.verifyDetail.brandId,
            'address': this.verifyDetail.provinceName + this.verifyDetail.cityName + this.verifyDetail.districtName + this.verifyDetail.address
          };
        }
      }
    })
    .then(result => {
      console.log(result);
      if (result && result.lng) { 
        this.verifyDetail.poiLng = result.lng;
      };
      if (result && result.lat) { this.verifyDetail.poiLat = result.lat; };
    }, error => {
      console.log(error);
    });
  }
  // 查看图片
  openLightboxModal (images, index) {
    // let _that = this;
    // this.ImgLightbox.openModal([
    //   {images: _that.$filter('imgUrlWithToken')(images) + '&action=PREVIEW'}
    // ], index);
    this.ImgLightbox.openModal(images, index);
  };
}

storeVerifyDetailsCtrl.$inject = ['$stateParams', 'DialogService', 'storeService', '$filter', '$timeout', 'ImgLightbox'];

/**
 * 上线审核弹窗controller
 */
class verifyModalCtrl {
  constructor(opts, storeService, DialogService, $state, $filter, $uibModalInstance) {
    this.$modalInstance = $uibModalInstance;
    this.opts = opts;
    this.storeService = storeService;
    this.DialogService = DialogService;
    this.$filter = $filter;
    this.$state = $state;
    this.isStatus = true;
    // this.isFlag = true; 
    this.data = {
      'status': true,
      // 'flag': true,
      'remark': '',
      'poiLat': opts.poiLat,
      'poiLng': opts.poiLng
    };
    // Object.assign(this.data, opts);
    this.account = this.opts.accountNo;
    this.companyName = this.opts.companyName;
    this.comTotal = this.opts.comTotal;
    this.brandName = this.opts.brandName;
    this.brandTotal = this.opts.brandTotal;
    this.subBtnDisabled = false;
    //   this[_init_]();
    // }
    // [_init_]() {
    //   if ((this.comTotal > 0 && this.opts.companyId !== null) || (this.brandTotal > 0 && this.opts.brandId !== null)) {
    //     this.geneAccount();
    //   }
  }

  // 生成账号
  geneAccount() {
    let _that = this;
    _that.storeService
      .geneAccount(this.opts.id)
      .then((data) => {
        _that.account = data.accountNo;
        console.log(_that.account);
      }, err => {
        console.log(err);
        // if (this.comTotal > 0 && this.opts.companyId !== null) {
        //   _that.DialogService.showMessage("该企业已存在，请驳回", false, 2000);
        //   debugger
        //   _that.isStatus = false;
        //   _that.isDisabled = 'reject';
        // } else if (this.brandTotal > 0 && this.opts.brandId !== null) {
        //   _that.DialogService.showMessage("该品牌已存在，请驳回", false, 2000);
        //   _that.isStatus = false;
        //   _that.isDisabled = "reject";
        // }
      });
  }

  // 确定
  confirm() {
    let _that = this;
    console.log(_that.data);
    _that.data.status = _that.isStatus ? 'ONLINE' : 'REJECT';
    // _that.data.flag = _that.isFlag ? 'VI' : 'VII';
    _that.subBtnDisabled = true;
    _that.storeService.getVerify(_that.opts.id, _that.data).then(data => {
      _that.$modalInstance.close();
      _that.$state.go('store.verify');
      console.log(_that.data.auditResult);
    }, err => {
      let msg = _that.$filter('storeRespErrMsg')(err.data.code);
      if (msg) {
        _that
          .DialogService
          .showMessage(msg, false, 2000);
      }
      _that.subBtnDisabled = false;
    });
  }

  // 取消
  cancel() {
    this.$modalInstance.dismiss();
    return false;
  }
}
verifyModalCtrl.$inject = ['opts', 'storeService', 'DialogService', '$state', '$filter', '$uibModalInstance'];
/**
 * 打开地图弹框controller
 */
class mapModalCtrl {
  constructor(opts, storeService, DialogService, $state, $filter, $uibModalInstance) {
    this.$modalInstance = $uibModalInstance;
    this.opts = opts;
    this.storeService = storeService;
    this.DialogService = DialogService;
    this.$filter = $filter;
    this.$state = $state;
    this.isStatus = true;
    // this.isFlag = true; 
    this.data = {
      'status': true,
      // 'flag': true,
      'remark': ''
    };
    // Object.assign(this.data, opts);
    this.account = this.opts.accountNo;
    this.companyName = this.opts.companyName;
    this.comTotal = this.opts.comTotal;
    this.brandName = this.opts.brandName;
    this.brandTotal = this.opts.brandTotal;
    this.subBtnDisabled = false;
    //   this[_init_]();
    // }
    // [_init_]() {
    //   if ((this.comTotal > 0 && this.opts.companyId !== null) || (this.brandTotal > 0 && this.opts.brandId !== null)) {
    //     this.geneAccount();
    //   }
  }

  // 确定
  confirm() {
    let _that = this;
    this.$modalInstance.close(_that.location);
  }

  // 取消
  cancel() {
    this.$modalInstance.dismiss();
    return false;
  }
}
mapModalCtrl.$inject = ['opts', 'storeService', 'DialogService', '$state', '$filter', '$uibModalInstance'];