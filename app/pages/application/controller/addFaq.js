'use strict';
import 'ckeditor';
import './ckEditor';

import 'qrcode-generator';
import 'qrcode-generator/qrcode_UTF8';
import 'angular-qrcode';

const _init_ = Symbol('_init_');
class addFaqCtrl {
  constructor($uibModal, AppService, replaceUrl, $stateParams, DialogService, $state) {
    Object.assign(this, {$uibModal, AppService, replaceUrl, $stateParams, DialogService, $state});
    console.log('初始化成功！');
    this.newFaq = {
      content: '',
      ownerProduct: null,
      questionType: null,
      title: ''
    };
    this[_init_]();
  }

  [_init_]() {
    this.faqId = this.$stateParams.faqId;
    this.pageType = this.$stateParams.pageType === 'addFaq' ? '新增FAQ' : '编辑FAQ';
    // this.getFaqTypeList();
    if (this.$stateParams.pageType === 'editFaq') {
      this.getFaqDetail();
    }
    console.log(this.pageType, this.$stateParams.pageType);
    console.log('Init application addMessage ctrl');
  }

  // 获取FAQ详细信息
  getFaqDetail() {
    let _that = this;
    _that.AppService
    .getFaqDetail(_that.faqId)
    .then((res) => {
      console.log(res);
      _that.newFaq.title = res.data.data.title;
      _that.newFaq.content = res.data.data.content;
      _that.newFaq.ownerProduct = res.data.data.ownerProduct;
      _that.newFaq.questionType = res.data.data.questionType;
      console.log(res);
      _that.getFaqTypeList(_that.newFaq.ownerProduct);
    });
  }
  // 获取FAQ问题类型列表
  getFaqTypeList(code) {
    let _that = this;
    _that.AppService
    .getProductFaqTypeList(code)
    .then((res) => {
      _that.faqTypeList = res.list;
      console.log(res);
    });
  }
  //提交预览
  previewFaq() {
    let _that = this;
    _that.editParam = {
      content: _that.newFaq.content,
      title: _that.newFaq.title
    };
    let fn = function($uibModalInstance) {
      var $ctrl = this;
      $ctrl.topTitle = '预览效果';  
      $ctrl.ok = function() {
        $uibModalInstance.close();
      };
      $ctrl.cancel = function() {
        $uibModalInstance.dismiss();
      };
      _that.AppService
        .postFaqPreview(_that.editParam)
        .then(function(data) {
          console.log(_that.editParam);
          console.log(data.data);
          if (isDevelopment) {
            $ctrl.faqUrl = faqLocalUrl + '?id=' + data.data.data;
          } else if (isfor14) {
            $ctrl.faqUrl = faq14Url + '?id=' + data.data.data;
          } else {
            // $ctrl.faqUrl = _that.replaceUrl.set('content') + '?id=' + data.data.data;
            // $ctrl.faqUrl = 'https://content.bizwell.cn?id=' + data.data.data;
            if (window.location.protocol === 'http:') {
              $ctrl.faqUrl = _that.replaceUrl.set('content') + '?id=' + data.data.data;
            } else {
              $ctrl.faqUrl = 'https://content.bizwell.cn?id=' + data.data.data;
            }
          } 

          console.log($ctrl.faqUrl);             
        }, function(err) {
          console.log(err);
        });
    };
    fn.$inject = ['$uibModalInstance'];
    _that
        .$uibModal
        .open({
          windowClass: 'commonDialog',
          templateUrl: 'previewFaq.html',
          controller: fn,
          controllerAs: '$ctrl'
        }); 
  }

  //新增提交
  addSubmit() {
    let _that = this;
    console.log(_that.newFaq);
    _that
      .AppService
      .addFaq(_that.newFaq)
      .then((data) => {
        _that.DialogService.showMessage('提交成功', true);
        _that.$state.go('application.faqList');
        console.log(data);
      }, (err) => {
        console.log(err);
        // let msg = _that.$filter('addRespErrMsg')(err.data.code);
        // if (msg) {
        //   _that
        //     .DialogService
        //     .showMessage(msg, false, 2000);
        // }
      });
  }
  //编辑提交
  editSubmit() {
    let _that = this;
    _that.newFaq.id = _that.faqId;
    console.log(_that.newFaq);
    _that
      .AppService
      .editFaq(_that.newFaq)
      .then((data) => {
        _that.$state.go('application.faqList');
        console.log(data);
      }, (err) => {
        console.log(err);
        // let msg = _that.$filter('addRespErrMsg')(err.data.code);
        // if (msg) {
        //   _that
        //     .DialogService
        //     .showMessage(msg, false, 2000);
        // }
      });
  }
}

addFaqCtrl.$inject = ['$uibModal', 'AppService', 'replaceUrl', '$stateParams', 'DialogService', '$state'];

export default angular.module('addFaqModule', ['ng.ckeditor', 'monospaced.qrcode'])
  .controller('addFaqCtrl', addFaqCtrl)
  .name;