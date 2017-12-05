'use strict';
const _init_ = Symbol('_init_');
class faqTypeCtrl {
  constructor(DialogService, $uibModal, AppService, ExportService) {
    Object.assign(this, {DialogService, $uibModal, AppService, ExportService});
    this.getParame = {
      product: null,
      questionType: null,
      pageNo: 1,
      pageSize: 10
    };
    this[_init_]();
  }

  [_init_]() {
    console.log('Init application winmsd ctrl');
    this.getFaqTypeList();
    this.getProductList();
  }

  // 获取问题类型列表
  getFaqTypeList() {
    let _that = this;
    _that
      .AppService
      .getFaqTypeList(this.getParame)
      .then((res) => {
        _that.faqTypeList = res.list;
        _that.total = res.total;
        console.log(res);
      });
  }
    // 获取FAQ所属产品名称列表
  getProductList() {
    let _that = this;
    _that.AppService
    .getFaqProductList()
    .then((res) => {
      _that.productList = res;
      console.log(res);
    });
  }

  // 搜索
  searchBt() {
    this.getFaqTypeList(this.getParame);
    console.log(this.getParame);
  }
  // 回车键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchBt();
    }
  }

  // 翻页
  pageChanged() {
    this.getFaqTypeList(this.getPage);
  }

  // 导出系统消息
  export() {
    this.appName = this.getParame.appName;
    this.content = this.getParame.content;
    this.title = this.getParame.title;
    let params = {
      'access_token': localStorage.token,
      'appName': this.appName,
      'content': this.content,
      'title': this.title
    };
    this.ExportService.download('/management/sys/info/_export', params, false);
  }

  //编辑
  editFaqType(item) {
    let _that = this;
    _that.editParam = {
      id: item.id,
      // product: null,
      questionType: null
    };
    let fn = function($uibModalInstance) {
      var $ctrl = this;
      $ctrl.topTitle = '编辑问题类型';  
      $ctrl.productList = _that.productList;
      $ctrl.product = item.product;
      $ctrl.editStatus = true;
      $ctrl.questionType = item.questionType;
      $ctrl.ok = function() {
        // _that.editParam.product = $ctrl.product;
        _that.editParam.questionType = $ctrl.questionType;
        $uibModalInstance.close();
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
        templateUrl: 'addFaqType.html',
        controller: fn,
        controllerAs: '$ctrl'
      })
      .result
      .then(function() {
        _that
          .AppService
          .editFaqType(_that.editParam)
          .then(function(data) {
            console.log(data);
            console.log(_that.editParam);
            _that.DialogService.showMessage('编辑成功', true);
            _that.getFaqTypeList();
          }, function(err) {
            console.log(err);
            // _that.DialogService.showMessage('编辑失败', false);
            // let msg = _that.$filter('respErrMsg')(err.data.code);
            // if (msg) {
            //   _that
            //     .DialogService
            //     .showMessage(msg, false);
            // }
          });
      }, function() {
        console.log('取消编辑');
      });
  }
  //新增
  addFaqType() {
    let _that = this;
    _that.parames = {
      product: null,
      questionType: null
    };
    let fn = function($uibModalInstance) {
      var $ctrl = this;
      $ctrl.productList = _that.productList;
      $ctrl.editStatus = false;      
      $ctrl.topTitle = '新增问题类型';      
      $ctrl.ok = function() {
        // console.log('ccc');
        _that.parames.product = $ctrl.product;
        _that.parames.questionType = $ctrl.questionType;
        $uibModalInstance.close();
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
        templateUrl: 'addFaqType.html',
        controller: fn,
        controllerAs: '$ctrl'
      })
      .result
      .then(function() {
        console.log(_that.parames);
        _that
          .AppService
          .addFaqType(_that.parames)
          .then(function(data) {
            console.log(data);
            // _that.DialogService.showMessage('添加成功', true);
            _that.getFaqTypeList();
          }, function(err) {
            console.log(err);
            // let msg = _that.$filter('respErrMsg')(err.data.code);
            // if (msg) {
            //   _that
            //     .DialogService
            //     .showMessage(msg, false);
            // }
          });
      }, function() {
        console.log('取消新增');
      });
  }
  //删除
  deleteFaqType(item) {
    function getPName(i) {
      switch (i) {
        case 'BSS_PC':
          return 'BSS-PC';
        case 'BSS_APP':
          return 'BSS-APP';
        case 'CloudFastFood':
          return '云小二-快餐版';
        case 'CloudSmallDinner':
          return '云小二-正餐版';
        case 'CloudShopkeeper':
          return '云掌柜';
        case 'CloudSir':
          return '云客官';
        default:
          return '产品名称';
      }
    }
    var productName = getPName(item.product);
    this.defaultConfirmOptions = {
      title: '删除问题类型',
      message: `你确定删除【${productName}】对应的【${item.questionType}】！`,
      confirmBtnText: '确 定',
      cancelBtnText: '取 消'
    };

    this.DialogService.openConfirm(this.defaultConfirmOptions).then(() => {
      const _that = this;
      _that.AppService.deleteFaqType([item.id]).then(res => {
        console.log('删除成功');
        _that.DialogService.showMessage('删除成功', true);
        _that.getFaqTypeList();
      }, (res) => {
        // console.log(res.data.code);
        if (res.data.code === 'QUESTION_TYPE_ERROR_001') {
          _that.DialogService.showMessage('该类型有使用的FAQ，不能删除！', false);
        }    
      });
    }, () => {
      console.log('cancel');
    });
  }
}

faqTypeCtrl.$inject = ['DialogService', '$uibModal', 'AppService', 'ExportService'];

export default angular.module('faqTypeModule', [])
  .controller('faqTypeCtrl', faqTypeCtrl)
  .name;