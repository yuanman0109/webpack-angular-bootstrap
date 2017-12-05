'use strict';

const _init_ = Symbol('_init_');

export default class header {
  constructor($scope, $rootScope, $state, $stateParams, $http, $filter, HeaderService, DialogService, $timeout) {
    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.$filter = $filter;
    this.HeaderService = HeaderService;
    this.DialogService = DialogService;
    this.$timeout = $timeout;

    this[_init_]();
  }[_init_]() {
    let _that = this;
    _that.$rootScope.$stateParams = _that.$stateParams;
    _that.$rootScope.isLoading = false;
    _that.$rootScope.access_token = '?access_token=' + localStorage.token;
    _that.userImg = require('../../../images/userdef.png');
    _that.getUserInfo();
    _that.getMessage();
  }
  //获取用户登录信息
  getUserInfo() {
    let _that = this;
    _that
      .HeaderService
      .getUserInfo()
      .then(function(data) {
        _that.$rootScope.loginInfo = data;
      }, function(err) {
        console.log(err);
      });
  }
  //登出
  loginOut() {
    let _that = this;
    _that
      .HeaderService
      .loginOut()
      .then(data => {
        localStorage.clear();
        sessionStorage.clear();
        this
          .$state
          .go('login');
      }, err => {
        console.log(err);
      });
  }
  goHome() {
    // this.$state.go('account.userHistory');
    this.$state.go(this.$rootScope.defaultPage);
  }
  // 修改/更新密码
  updatePwd() {
    let _that = this;
    _that
      .DialogService
      .openModal({
        template: require('../views/model/updatePwd.html'),
        controller: updatePwdCtrl,
        controllerAs: 'ctrl'
      })
      .then((data) => {}, (err) => {
        console.log(err);
      });
  }
//  消息列表统计 1分钟轮询
  getMessage() {
    const _that = this;    
    //  实时刷新数据
    function getcode() {  
      // console.log(new Date().getTime());
      // if (_that.$state.current.name !== 'store.storeDetail') {
      //   _that.$timeout.cancel(_that.mapTimeout);
      // } else {
      _that
      .HeaderService
      .getMessage({time: new Date().getTime()})
      .then((data) => {
        _that.$rootScope.messageTotal = 0; // 消息总数
        _that.$rootScope.messageGrope = []; // 消息分类
        data.forEach(item => {
          if (item.type === 'CUST_AUDIT') {
            _that.$rootScope.messageTotal += item.quantity;
            _that.$rootScope.messageGrope.push({type: 'CUST_AUDIT', name: '建店审核通知'});
          } else if (item.type === 'ORDER') {
            _that.$rootScope.messageTotal += item.quantity;
            _that.$rootScope.messageGrope.push({type: 'ORDER', name: '工单中心通知'});
          } else if (item.type === 'SERVICE_ORDER') {
            _that.$rootScope.messageTotal += item.quantity;
            _that.$rootScope.messageGrope.push({type: 'SERVICE_ORDER', name: '服务费通知'});
          } else if (item.type === 'kao') {
            _that.$rootScope.messageTotal += item.quantity;
            _that.$rootScope.messageGrope.push({type: 'kao', name: '考勤异常通知'});
          }
        });
        console.log(_that.$rootScope.messageGrope);
      });          
      _that.$timeout(getcode, 600000);
      // };  
    }
    getcode();
  }
}
header.$inject = [
  '$scope',
  '$rootScope',
  '$state',
  '$stateParams',
  '$http',
  '$filter',
  'HeaderService',
  'DialogService',
  '$timeout'
];

/**
 *  修改密码弹窗controller
 */
class updatePwdCtrl {
  constructor($uibModalInstance, $state, HeaderService, DialogService) {
    this.$modalInstance = $uibModalInstance;
    this.$state = $state;
    this.HeaderService = HeaderService;
    this.DialogService = DialogService;
  }
  // 确认修改密码
  confirm() {
    const _that = this;
    _that
      .HeaderService
      .updatePwd(_that.user)
      .then(data => {
        _that
          .$modalInstance
          .close();
        _that
          .DialogService
          .showMessage('密码修改成功,请重新登录^_^');
        localStorage.clear();
        sessionStorage.clear();
        this
          .$state
          .go('login');
      }, err => {
        console.log(err);
        if (err.status === 404) {
          _that
          .DialogService
          .showMessage('用户不存在或用户被禁用', false);
        } else {
          _that
          .DialogService
          .showMessage('密码修改失败,请检查旧密码', false);
        }
      });
  }
  // 取消
  cancel() {
    this
      .$modalInstance
      .dismiss();
  }
}
updatePwdCtrl.$inject = ['$uibModalInstance', '$state', 'HeaderService', 'DialogService'];