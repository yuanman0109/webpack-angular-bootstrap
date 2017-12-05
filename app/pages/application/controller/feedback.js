'use strict';
const _init_ = Symbol('_init_');
class feedbackCtrl {
  constructor($state, $stateParams, $uibModal, AppService, ExportService) {
    var getParame = {
      content: $stateParams.content || null,
      orgName: $stateParams.orgName || null,
      user: $stateParams.user || null,
      version: $stateParams.version || null,
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10
    };
    Object.assign(this, {
      $state, 
      $stateParams, 
      $uibModal,
      AppService,
      ExportService,
      getParame
    });
    this[_init_]();
  }

  /**
   * @param {*}pageNo当前页面number
   * @param {*}pageSize当前页数number10
   * @param {*}version搜索栏版本信息
   * @param {*}orgName搜索栏反馈企业/门店
   */
  [_init_]() {
    console.log('Init application feedback ctrl');
    this.getFeedBack();   
  }
  // 获取意见反馈列表
  getFeedBack() {
    let _that = this;
    _that
      .AppService
      .getFeedBack(this.getParame)
      .then((res) => {
        _that.feedBack = res.list;
        _that.total = res.total;
        console.log(total);
      }, (err) => {
        console.log(err);
      });
  }  
  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchBt();
    }
  }

  // 搜索
  searchBt() {
    this.getParame.pageNo = 1;
    this.goLists();
    // console.log(this.getParame);
  }

  // 翻页
  pageChanged() {
    this.goLists();
  }
  //路由跳转
  goLists() {
    this.$state.go('application.feedback', this.getParame);
  }

  // 导出
  exportCsv() {
    this.content = this.getParame.content;
    this.orgName = this.getParame.orgName;
    this.user = this.getParame.user;
    this.version = this.getParame.version;
    let params = {
      'access_token': localStorage.token,
      'content': this.content,
      'orgName': this.orgName,
      'user': this.user,
      'version': this.version
    };
    this.ExportService.download('/management/feefback/_export', params, false);
  }
}

feedbackCtrl.$inject = ['$state', '$stateParams', '$uibModal', 'AppService', 'ExportService'];

export default angular.module('feedbackModule', [])
  .controller('feedbackCtrl', feedbackCtrl)
  .name;