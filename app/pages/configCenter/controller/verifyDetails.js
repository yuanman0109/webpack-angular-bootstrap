'use strict';

const _init_ = Symbol('_init_');

class PaymentVerifyDetailsCtrl {
  constructor($stateParams, $state, $filter, DialogService, vertifyService, ImgLightbox) {
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$filter = $filter;
    this.DialogService = DialogService;
    this.vertifyService = vertifyService;
    this.ImgLightbox = ImgLightbox;
    this.status = {
      '0': '正常',
      '1': '禁用',
      '2': '删除'
    };
    this.companyScale = {
      'SCALE_TEN': '10人以下',
      'SCALE_HUNDRED': '50-100人',
      'SCALE_FIVEHUNDRED': '100-500人',
      'SCALE_THOUSAND': '500-1000人',
      'SCALE_MAX': '1000人以上'
    };
    this.verType = {
      'PASSED': '通过了您的',
      'REJECTED': '驳回了您的',
      'APPLYING': '发起了',
      'APPLYING_AGAIN': '再次发起了'
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
    // console.log('current payment id : ' + this.$stateParams.id);
    this.vertifyService.queryById(this.$stateParams.id, (data) => {
      this.data = data;
      this.data.storeDetail.companyBusinessTypeNameStr = '';
      if (this.data.storeDetail.companyBusinessTypeName) {
        for (let elem of this.data.storeDetail.companyBusinessTypeName.values()) {
          if (this.data.storeDetail.companyBusinessTypeNameStr === '') {
            this.data.storeDetail.companyBusinessTypeNameStr += elem;
          } else {
            this.data.storeDetail.companyBusinessTypeNameStr += ',' + elem;
          }
        }
      }
      // if (data.businessLicenseFileIdUrl) this.imgurlList.push({url: this.$filter('imgUrlWithToken')(data.businessLicenseFileIdUrl) + '&action=PREVIEW', 'caption': '营业执照影印件件'});
      // if (data.orgLicenseFileIdUrl) this.imgurlList.push({url: this.$filter('imgUrlWithToken')(data.orgLicenseFileIdUrl) + '&action=PREVIEW', 'caption': '组织结构代码证影印件'});
      // if (data.caterersLicenseFileIdUrl) this.imgurlList.push({url: this.$filter('imgUrlWithToken')(data.caterersLicenseFileIdUrl) + '&action=PREVIEW', 'caption': '餐饮许可证影印件'});
      // if (data.storeFacesFileIdUrl) this.imgurlList.push({url: this.$filter('imgUrlWithToken')(data.storeFacesFileIdUrl) + '&action=PREVIEW', 'caption': '店铺门头照片'});
      // if (data.posFileIdUrl) this.imgurlList.push({url: this.$filter('imgUrlWithToken')(data.posFileIdUrl) + '&action=PREVIEW', 'caption': '收银台照片'});
      // if (data.agreementFileIdUrl) this.imgurlList.push({url: this.$filter('imgUrlWithToken')(data.agreementFileIdUrl) + '&action=PREVIEW', 'caption': '支付签约协议'});
      // if (data.handheldIdFileIdUrl) this.imgurlList.push({url: this.$filter('imgUrlWithToken')(data.handheldIdFileIdUrl) + '&action=PREVIEW', 'caption': '手持证件照'});
      // if (data.ownerCardFrontFileIdUrl) this.imgurlList.push({url: this.$filter('imgUrlWithToken')(data.ownerCardFrontFileIdUrl) + '&action=PREVIEW', 'caption': '证件影印件正面'});
      // if (data.ownerCardBackFileIdUrl) this.imgurlList.push({url: this.$filter('imgUrlWithToken')(data.ownerCardBackFileIdUrl) + '&action=PREVIEW', 'caption': '证件影印件反面'});
      // if (data.accountLicenseFileIdUrl) this.imgurlList.push({url: this.$filter('imgUrlWithToken')(data.accountLicenseFileIdUrl) + '&action=PREVIEW', 'caption': '开户许可证'});
      // if (data.bankCardFrontFileIdUrl) this.imgurlList.push({url: this.$filter('imgUrlWithToken')(data.bankCardFrontFileIdUrl) + '&action=PREVIEW', 'caption': '银行卡正面'});
      // if (data.consignmentAgreementFileIdUrl) this.imgurlList.push({url: this.$filter('imgUrlWithToken')(data.consignmentAgreementFileIdUrl) + '&action=PREVIEW', 'caption': '委托收款协议'});
      // if (data.storeDetail.logoUrl) this.imgurlList.push({url: this.$filter('imgUrlWithToken')(data.storeDetail.logoUrl) + '&action=PREVIEW', 'caption': '门店实景'});
      // if (data.storeDetail.brandLogoUrl) this.imgurlList.push({url: this.$filter('imgUrlWithToken')(data.storeDetail.brandLogoUrl) + '&action=PREVIEW', 'caption': '品牌LOGO'});
      // console.log(this.imgurlList);
      if (data.status === 'THIRD_AUDIT') {
        this.$stateParams.tabIndex = 1;
      } else if (data.status === 'AUDIT') {
        this.$stateParams.tabIndex = 0;
      }
    }, (err) => {
      if (err.data.code === 'S403') {
        this.$state.go('configCenter.paymentVerify', {tabIndex: this.$stateParams.tabIndex});
      }
    });
    //查询审核记录
    this.getVerifyLog(this.$stateParams.id);
  }
   // 查看图片
  openLightboxModal (obj) {
    this.ImgLightbox.openModal([{url: this.$filter('imgUrlWithToken')(obj.url), 'caption': obj.title}], 0);
  };
  // 显示审核按钮
  isShowBtn(status) {
    if (status === 'AUDIT' || status === 'THIRD_AUDIT') {
      return true;
    } else {
      return false;
    }
  }
  verify() {
    let payConfig = this.data,
        isStoreNoRequired = false,
        isTerminalNoRequired = false;
    if (payConfig) {
      if (payConfig.connectionMode === 'DIRECT' && payConfig.connectionOrg === 'WEIXIN') {
        isStoreNoRequired = true;
        isTerminalNoRequired = false;   
      } else if (payConfig.connectionMode === 'INDIRECT') {
        isStoreNoRequired = true;
        isTerminalNoRequired = true;
      }
    }
    this.DialogService.openModal({
      template: require('../views/modal/verify.modal.html'),
      controller: VerifyModalCtrl,
      controllerAs: 'ctrl',
      resolve: {
        opts: () => {
          return {
            'payConfig': payConfig,
            'isStoreNoRequired': isStoreNoRequired,
            'isTerminalNoRequired': isTerminalNoRequired,
            'caseId': this.$stateParams.id,
            'status': this.data.status,
            'tabIndex': this.$stateParams.tabIndex
          };
        }
      }
    });
  }
  //获取进件审核记录
  getVerifyLog(caseId) {
    this.vertifyService.getVerifyLog(caseId, (data) => {
      this.verifyLog = data;
    });
  }
  //查看
  openModal(data, time) {
    if (Object.values(data)[0] && time > 0) {
      this.DialogService.openModal({
        template: require('../views/modal/storeInfo.modal.html'),
        controller: StoreInfoModalCtrl,
        controllerAs: 'ctrl',
        size: 'lg',
        resolve: {
          opts: () => {
            return {
              caseId: this.$stateParams.id,
              obj: data
            };
          }
        }
      });
    }
  }
}
PaymentVerifyDetailsCtrl.$inject = ['$stateParams', '$state', '$filter', 'DialogService', 'vertifyService', 'ImgLightbox'];

export default angular.module('PaymentVerifyDetailsCtrl', [])
  .controller('PaymentVerifyDetailsCtrl', PaymentVerifyDetailsCtrl)
  .name;

/**
 *  进件审核弹窗controller
 */
class VerifyModalCtrl {
  constructor($uibModalInstance, opts, vertifyService, $state) {
    this.$modalInstance = $uibModalInstance;
    this.vertifyService = vertifyService;
    this.$state = $state;
    this.opts = opts;
    this.payConfig = opts.payConfig;
    this.regex = '^[0-9a-zA-Z]+$';
    this.data = {
      auditRemark: '',
      terminalNo: '',
      storeNo: ''
    };
    this.subBtnDisabled = false;
    Object.assign(this.data, opts);
    if (this.data.status === 'THIRD_AUDIT') {     
      this.data.isStoreNoRequired = this.opts.isStoreNoRequired;
      this.data.isTerminalNoRequired = this.opts.isTerminalNoRequired;
    }
    if (this.opts.tabIndex < 2) {
      this.opts.tabIndex = this.opts.tabIndex + 1;
    }
  }
  switch(obj) {
    this.data.auditResult = obj;
    if (this.data.auditResult === 'PASSED') {
      this.data.auditRemark = '通过';
    } else {
      this.data.auditRemark = '';
    }
  
    if (this.data.status === 'THIRD_AUDIT') {
      if (this.data.auditResult === 'REJECTED') {
        this.data.isStoreNoRequired = false;
        this.data.isTerminalNoRequired = false;
      } else {
        this.data.isStoreNoRequired = this.opts.isStoreNoRequired;
        this.data.isTerminalNoRequired = this.opts.isTerminalNoRequired;
      }
    }
  }
  confirm() {
    this.subBtnDisabled = true;
    this.vertifyService.verify(this.data, (data) => {
      this.$modalInstance.close();
      if ((this.data.status === 'THIRD_AUDIT' && this.data.auditResult === 'REJECTED') || (this.data.status === 'AUDIT' && this.data.auditResult === 'REJECTED')) {
        this.$state.go('configCenter.paymentVerify', {tabIndex: 0});
      } else {
        this.$state.go('configCenter.paymentVerify', {tabIndex: this.opts.tabIndex});
      }
    }, (err) => {
      if (err.data.code === 'S403') {
        this.$modalInstance.close(); 
        this.$modalInstance.dismiss();
        this.$state.reload();
        return false;
      }
      this.subBtnDisabled = false;
    });
  }
  cancel() {
    this.$modalInstance.close();   
  }
}
VerifyModalCtrl.$inject = ['$uibModalInstance', 'opts', 'vertifyService', '$state'];
/**
 *  查看门店详情controller
 */
class StoreInfoModalCtrl {
  constructor($uibModalInstance, opts, vertifyService, $state) {
    this.$modalInstance = $uibModalInstance;
    this.vertifyService = vertifyService;
    this.$state = $state;
    this.opts = opts;
    this.params = Object.assign({caseId: opts.caseId}, opts.obj);
    this.typeName = {
      bankCardNo: '银行账号',
      businessLicenseNo: '营业执照号',
      businessLinkmanMobile: '老板手机号',
      ownerCardNo: '证件号码',
      businessLinkman: '老板姓名'
    };
    this.getAssistInfo();
  }
  getAssistInfo() {
    this.vertifyService.getAssistInfo(this.params).then((data) => {
      this.assist = data;
    }, (err) => {
      console.log(err);
    });
  }
  //跳转门店详情
  goStoreDetail(id) {
    this.$state.go('store.storeDetail', {id});
    this.cancel();
  }
  confirm() {
    this.$modalInstance.close();
  }
  cancel() {
    this.$modalInstance.close();   
  }
}
StoreInfoModalCtrl.$inject = ['$uibModalInstance', 'opts', 'vertifyService', '$state'];