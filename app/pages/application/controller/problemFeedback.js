'use strict';
const _init_ = Symbol('_init_');
class problemFeedbackCtrl {
  constructor($uibModal, $filter, problemFeedbackService, DialogService, ExportService) {
    Object.assign(this, {
      $uibModal,
      $filter,
      problemFeedbackService,
      DialogService,
      ExportService
    });
    this[_init_]();
  }
  [_init_]() {
    this.params = {};
    this.types = [
      {
        'type': 'PROBLEM',
        'name': '产品问题'

      }, {
        'type': 'ADVICE',
        'name': '产品建议'
      }];
    this.getList();
  }
  // ui-select获取用户列表
  getUserName(val) {
    let _that = this;
    if (!val) {
      _that.params.createUser = '';
      return;
    }
    _that.problemFeedbackService.PublicServer.getUserFormName(val).then(function (data) {
      _that.userList = data.list;
    }, err => {
      console.log(err);
    });
  }
  focus() {
    this.userList = [];
  }
  searchBt() {
    this.params.pageNo = 1;
    this.getList();
  }
  // 获取问题反馈列表
  getList() {
    let _that = this;
    let obj = {};
    Object.assign(obj, _that.params);
    if (_that.params.begin) {
      obj.beginTime = new Date(_that.params.begin).valueOf();
    }
    if (_that.params.end) {
      obj.endTime = new Date(_that.params.end).valueOf();
    }
    delete obj.begin;
    delete obj.end;
    console.log(angular.isNumber(obj.beginTime));
    _that
      .problemFeedbackService
      .getList(obj)
      .then((res) => {
        _that.List = res.list;
        _that.total = res.total;
        console.log(total);
      }, (err) => {
        console.log(err);
      });
  }  

  // 翻页
  pageChanged() {
    this.getList(this.params);
  }

  // 详情
  Detail(id) {
    let _that = this;
    let item = {};
    _that
      .problemFeedbackService
      .getDetail(id)
      .then((res) => {
        item = res;
        let fn = function($uibModalInstance) {
          var $ctrl = this;
          $ctrl.item = item;
          $ctrl.cancel = function() {
            $uibModalInstance.dismiss();
          };
        };
        fn.$inject = ['$uibModalInstance'];
        _that
          .$uibModal
          .open({
            template: require('../views/modal/problemFeedback.detail.html'),
            controller: fn,
            controllerAs: '$ctrl',
            size: 'lg'
          })
          .result
          .then(() => {}, () => {
            console.log('cancle');
          });
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

  // 导出
  exportCsv() {
    this.params.access_token = localStorage.token;
    this.ExportService.download('/questionFeedbacks/_exportCsv', this.params, false);
  }
}

problemFeedbackCtrl.$inject = ['$uibModal', '$filter', 'problemFeedbackService', 'DialogService', 'ExportService'];

export default angular.module('problemFeedbackModule', [])
  .controller('problemFeedbackCtrl', problemFeedbackCtrl)
  .name;