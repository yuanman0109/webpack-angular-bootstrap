'use strict';
const _init_ = Symbol('_init_');
class addMessageCtrl {
  constructor($uibModal, MsgService, DialogService, $state) {
    var getParame = {
      appName: null,
      content: '',
      title: ''
    };
    // var addWin = [{
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
      DialogService,
      $state,
      getParame
    });
    this[_init_]();
  }

  /**
   * @param {*}appName名
   * @param {*}content消息内容
   * @param {*}addWin:app名称映射信息
   * @param {*}name:value,appName:key
   */
  [_init_]() {
    console.log('Init application addMessage ctrl');
    // this.getAddWinmsd();
  }
  // 新增系统消息
  // getAddWinmsd() {
  //   let _that = this;
  //   _that
  //     .MsgService
  //     .getAddWinmsd(this.getParame)
  //     .then((data) => {
  //     }, (err) => {
  //       let msg = _that.$filter('addRespErrMsg')(err.data.code);
  //       if (msg) {
  //         _that
  //           .DialogService
  //           .showMessage(msg, false, 2000);
  //       }
  //     });
  // }

  //提交
  getSubmit() {
    let _that = this;
    _that
      .MsgService
      .getAddWinmsd(_that.getParame, '提交成功')
      .then((data) => {
        _that.getParame = {
          appName: '',
          title: '',
          content: ''
        };
        _that.$state.go('application.winmsd');
        console.log(data);
      }, (err) => {
        let msg = _that.$filter('addRespErrMsg')(err.data.code);
        if (msg) {
          _that
            .DialogService
            .showMessage(msg, false, 2000);
        }
      });
  }
}

addMessageCtrl.$inject = ['$uibModal', 'MsgService', 'DialogService', '$state'];

export default angular.module('addMessageModule', [])
  .controller('addMessageCtrl', addMessageCtrl)
  .name;