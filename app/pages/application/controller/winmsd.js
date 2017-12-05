'use strict';
const _init_ = Symbol('_init_');

class winmsdCtrl {
  constructor($uibModal, MsgService, ExportService, DialogService) {
    var getParame = {
      appName: null,
      content: '',
      title: '',
      pageNo: 1,
      pageSize: 10
    };
    this.statusList = {
      'WITHDRAW': '已撤回',
      'SENDING': '发布中'
    };
    this.typeList = {
      'office': '官方消息',
      'spread': '推广消息'
    };
    // var appList = [{
    //   name: 'YUN_FAST', 
    //   appName: '云小二-快餐版'
    // }, {
    //   name: 'YUN_DINNER',
    //   appName: '云小二-正餐版'
    // }, {
    //   name: 'YUN_MANAGER',
    //   appName: '云掌柜'
    // }];
    Object.assign(this, {
      $uibModal,
      MsgService,
      ExportService,
      DialogService,
      getParame
    });
    this[_init_]();
  }

  /**
   * @param {*} pageNo当前页面number
   * @param {*} pageSize当前页数number
   * @param {*} appList:app名称映射信息
   */
  [_init_]() {
    console.log('Init application winmsd ctrl');
    this.getWinmsd();
  }

  // 获取系统消息列表
  getWinmsd() {
    let _that = this;
    _that
      .MsgService
      .getWinmsd(this.getParame)
      .then((res) => {
        _that.winList = res.list;
        _that.total = res.total;
        console.log(winList.length);
      });
  }
  recall(id) {
    this.defaultConfirmOptions = {
      title: '撤回消息',
      message: '确认撤回该条消息通知！撤回后，用户将看不到该条信息！',
      confirmBtnText: '确 定',
      cancelBtnText: '取 消'
    };
    this
      .DialogService
      .openConfirm(this.defaultConfirmOptions).then(() => {
        const _that = this;
        var obj = {
          'status': 'WITHDRAW',
          'id': id
        };
        _that.MsgService.recall(id, obj, '撤回成功').then(res => {
          this.getWinmsd();
        }, () => {
          if (err.data.code === 'S403') {
            return false;
          }
          this
            .DialogService
            .showMessage('操作失败，请重新操作', false);
        });
        console.log('confirm');
      }, () => {
        console.log('cancel');
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
    this.getWinmsd(this.getParame);
    console.log(this.getParame);
  }

  // 翻页
  pageChanged() {
    this.getWinmsd(this.getPage);
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
}

winmsdCtrl.$inject = ['$uibModal', 'MsgService', 'ExportService', 'DialogService'];

export default angular.module('winmsdModule', [])
  .controller('winmsdCtrl', winmsdCtrl)
  .name;