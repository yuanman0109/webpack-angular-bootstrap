'use strict';

const _init_ = Symbol('_init_');

class PaymentTemplateDetailsCtrl {
  constructor($state, $stateParams, Upload, paymentTemplateService, DialogService, $filter, toaster) {
    Object.assign(this, {$state, $stateParams, Upload, paymentTemplateService, DialogService, $filter, toaster});
    // 餐桌类型
    this.tableType = [
      {
        type: 'TABLE',
        name: '桌台'  
      }, {
        type: 'TABLE_STICKER',
        name: '桌贴'  
      }];
    this[_init_]();
  }
  [_init_]() {
    // 获取模板id
    // this.isAdd ? '新增模板' : '编辑模板'
    if (this.$stateParams.id) {
      this.isAdd = false;
      this.getTempDetail(this.$stateParams.id);
    } else {
      this.isAdd = true;
    }
    this.getBusinesses();
  }
  // 获取业务类型
  getBusinesses() {
    this.paymentTemplateService.getBusinesses().then(data => {
      this.businessIds = data;
      data.forEach((x) => {
        if (x.dataCode === 'DINNER') {
          this.details.businessId = 'DINNER';
        }
      });
    }, err => { console.log(err); });
  }
    //获取详情
  getTempDetail(id) {
    const _that = this;
    _that.paymentTemplateService.getTemplate(id).then((data) => {
      _that.details = data;
      _that.oldName = data.name;
      _that.thumbnail = data.url;
    }, (err) => {
      if (err.data.code === 'S403') {
        this.$state.go('configCenter.template');
        return false;
      }
    });
  }
 
  //校验重名
  checkName() {
    const _that = this;
    if (_that.details.name === _that.oldName) {
      _that.sameName = false;
      return false;
    }
    let params = {
      name: _that.details.name
    };
    _that.paymentTemplateService.checkName(params).then((data) => {
      if (data.exist) {
        _that.sameName = true;
      } else {
        _that.sameName = false;
      }
    });
  }
  //提交模板
  submit(valid) {
    const _that = this;
    if (valid) {
      _that.DialogService.showMessage('请检查表单输入是否正确', false);
      return false;
    }
    
    let fn = null;
    if (_that.$stateParams.id) {
      _that.details.id = _that.$stateParams.id;
      fn = _that.paymentTemplateService.putTemplate(_that.details, '修改成功');
    } else {
      fn = _that.paymentTemplateService.postTemplate(_that.details, '新增成功');
    }
    fn.then((res) => {
      _that.$state.go('configCenter.template');
    }, (err) => {
      if (err.data.code === 'S403') {
        this.$state.go('configCenter.template');
        return false;
      }
      let msg = _that.$filter('uploadMsg')(err.data.code);
      msg && _that.DialogService.showMessage(msg, false);
    });
  }
  //上传模板
  uploadFiles(file, errFiles) {
    const _that = this;
    let url = '/api/private_barcode_tmpl_image/upload';
    if (file) {
      let toastInstance = _that.toaster.pop({ type: 'info', body: '正在上传模板,请稍等...', timeout: 1000000, tapToDismiss: false });
      _that.Upload.upload({
        url: url,
        data: {
          file: file
        }
      })
      .then((response) => {
        let data = response.data;
        if (data.code === 'S200') {
          _that.toaster.clear(toastInstance);
          _that.thumbnail = data.data.url;
          _that.details.fileId = data.data.id;
          _that.isUploadFile = true;
        } else {
          let msg = _that.$filter('uploadMsg')(data.code);
          msg && _that.DialogService.showMessage(msg, false);
          _that.toaster.clear(toastInstance);
        }
      });
    }
  }
  // 获取图片真实尺寸
  getImgSize() {
    // 获取模板图片
    let tpl = angular.element(document.querySelector('#tplimage'))[0];
    this.naturalWidth = tpl.naturalWidth;
    this.naturalHeight = tpl.naturalHeight;
    // 如果页面模板尺寸没有值 给模板重新赋值为原始尺寸大小
    if (!this.details.width || this.isUploadFile) {
      this.details.width = tpl.naturalWidth; 
      this.details.height = tpl.naturalHeight; 
    } else if (!this.details.height || this.isUploadFile) {
      this.details.height = tpl.naturalHeight; 
    }
    this.isUploadFile = false;
    this.tplWidth = tpl.width;
    this.getSizePre = this.details.width / this.tplWidth; 
    this.tplHeight = this.details.height / this.getSizePre;
    this.setTplImage();
  }

  // 模板和二维码合成
  setTplImage() {
    let allSize = [this.thumbnail, this.details.width, this.details.height, this.details.barcodeWidth, this.details.barcodeHeight, this.details.barcodeVertical, this.details.barcodeHorizon];
    if (allSize.includes(undefined)) {
      return false;
    } 
     // 获取模板图片
    let tpl = angular.element(document.querySelector('#tplimage'))[0];
    this.tplWidth = tpl.width;
    this.getSizePre = this.details.width / this.tplWidth; 
    this.tplHeight = this.details.height / this.getSizePre;
    let qrcodeUrl = require('../../../images/qrcode-img.png');
    let QrcodeImage = angular.element(document.querySelector('#qrcode'))[0];
    this.per = this.tplWidth / this.details.width;
    QrcodeImage.src = qrcodeUrl;
    // 模板样式
    this.TplStyle = {
      'width': this.tplWidth + 'px',
      'height': this.tplHeight + 'px'
    };
    // 合成模板样式
    this.qrcodeTplStyle = {
      'width': this.details.barcodeWidth * this.per + 'px',
      'height': this.details.barcodeHeight * this.per + 'px',
      'top': this.details.barcodeVertical * this.per + 10 + 'px',
      'left': this.details.barcodeHorizon * this.per + 10 + 'px'
    };
  }
}
PaymentTemplateDetailsCtrl.$inject = [
  '$state',
  '$stateParams',
  'Upload',
  'paymentTemplateService',
  'DialogService',
  '$filter',
  'toaster'
];

export default angular.module('PaymentTemplateDetailsCtrl', [])
  .controller('PaymentTemplateDetailsCtrl', PaymentTemplateDetailsCtrl)
  .name;