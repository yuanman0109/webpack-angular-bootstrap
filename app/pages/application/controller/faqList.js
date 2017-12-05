'use strict';
const _init_ = Symbol('_init_');

class faqListCtrl {
  constructor($state, $stateParams, DialogService, $uibModal, AppService, replaceUrl, ExportService) {
    Object.assign(this, {$state, $stateParams, DialogService, $uibModal, AppService, replaceUrl, ExportService});
    this.getParame = {
      ownerProduct: $stateParams.ownerProduct || null,
      questionType: $stateParams.questionType || null,
      status: $stateParams.status || '1',
      title: $stateParams.title || '',
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10
    };
    this[_init_]();
  }

  /**
   * @param {*} pageNo当前页面number
   * @param {*} pageSize当前页数number
   * 
   */
  [_init_]() {
    console.log('Init application winmsd ctrl');
    this.getFaqList();
    this.getFaqTypeList();
  }

  // 获取FAQ问题类型列表
  getFaqTypeList(code) {
    console.log('aaa');
    let _that = this;
    var params = {
      product: code,
      questionType: null
    };
    console.log(params);
    _that.AppService
    .getFaqTypeList(params)
    .then((res) => {
      _that.faqTypeList = res.list;
      console.log(res);
    });
  }

  // 获取FAQ列表
  getFaqList() {
    let _that = this;
    _that
      .AppService
      .getFaqList(this.getParame)
      .then((res) => {
        _that.faqList = res.list;
        _that.total = res.total;
        console.log(res);
        console.log(_that.faqList.length);
      });
  }
  // 获取FAQ详情
  getFaqDetail(id) {
    // var url = 'http://10.15.114.48:8089?way=detail&id=' + id;
    var url = '';
    if (isDevelopment) {
      url = faqLocalUrl + '?way=detail&id=' + id;
    } else if (isfor14) {
      url = faq14Url + '?way=detail&id=' + id;
    } else {
      // url = this.replaceUrl.set('content') + '?way=detail&id=' + id;
      // url = 'https://content.bizwell.cn?way=detail&id=' + id;
      if (window.location.protocol === 'http:') {
        url = this.replaceUrl.set('content') + '?way=detail&id=' + id;
      } else {
        url = 'https://content.bizwell.cn?way=detail&id=' + id;
      }
    } 
    window.open(url, '_blank');   
  }

  // 搜索
  searchBt() {
    this.getParame.pageNo = 1;
    this.goLists();
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
    this.goLists();
  }
  //路由跳转
  goLists() {
    this.$state.go('application.faqList', this.getParame);
  }

  // 导出系统消息
  export() {
    let params = {
      'access_token': localStorage.token,
      'ownerProduct': this.getParame.ownerProduct,
      'questionType': this.getParame.questionType,
      'status': this.getParame.status,
      'title': this.getParame.title
    };
    console.log(params);
    this.ExportService.download('/management/faqs/export', params);
  }

  //删除
  deleteFaq(item) {
    this.defaultConfirmOptions = {
      title: '删除FAQ',
      message: `确认删除【${item.title}】，删除后，用户将在【${item.ownerProductName}】不能查看该条FAQ!`,
      confirmBtnText: '确 定',
      cancelBtnText: '取 消'
    };

    this.DialogService.openConfirm(this.defaultConfirmOptions).then(() => {
      const _that = this;
      _that.AppService.deleteFaq([item.id]).then(res => {
        this.getFaqList();
      }, () => {
        // _that.DialogService.showMessage('删除失败，请重新操作', false);
      });
    }, () => {
      console.log('cancel');
    });
  }
}

faqListCtrl.$inject = ['$state', '$stateParams', 'DialogService', '$uibModal', 'AppService', 'replaceUrl', 'ExportService'];

export default angular.module('faqListModule', [])
  .controller('faqListCtrl', faqListCtrl)
  .name;