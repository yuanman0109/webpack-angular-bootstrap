const _init_ = Symbol('_init_');
export default class ForgetPasswordCtrl {
  constructor($http, $stateParams, $state, $filter, $rootScope, ForgetPwdService, DialogService, toaster) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.ForgetPwdService = ForgetPwdService;
    this.$rootScope = $rootScope;
    this.toaster = toaster;
    this.DialogService = DialogService;
    this.$filter = $filter;
    this[_init_]();
  }[_init_]() {
    let _that = this;
    if (sessionStorage.email) {
      _that.email = sessionStorage.email;
    }
    if (_that.$stateParams.code) {
      _that.code = _that.$stateParams.code;
    }
  }
  goHome() {
    this.$state.go('login');
  }
  sendMail() {
    let _that = this;
    sessionStorage.email = _that.email;
    let objdata = JSON.stringify({
      'mail': _that.email
    });
    this
      .ForgetPwdService
      .sendMail(objdata, '邮件发送成功')
      .then((data) => {
        _that
          .$state
          .go('forgetPass.step2');
      }, err => {
        if (err.status === 409) {
          _that
            .$state
            .go('forgetPass.step2');
        }
        let msg = _that.$filter('EmailCodeErrMsg')(err.status);
        if (msg) {
          _that
            .DialogService
            .showMessage(msg, false);
        }
      });
  }
  setPWD() {
    let _that = this;
    let objdata = {
      'code': _that.code,
      'password': _that.password
    };

    /**
     * mock地址   /user
     * 测试地址   /user-by-code
     */
    this
      .ForgetPwdService
      .setPwd(objdata)
      .then(data => {
        _that
          .$state
          .go('forgetPass.step4');
      }, err => {
        let msg = _that.$filter('ForgetCodeErrMsg')(err.status);
        if (msg) {
          _that
            .DialogService
            .showMessage(msg, false);
        }
      });
  }
  setSuccess() {
    let _that = this;
    _that
      .$state
      .go('login');
  }
}

ForgetPasswordCtrl.$inject = [
  '$http',
  '$stateParams',
  '$state',
  '$filter',
  '$rootScope',
  'ForgetPwdService',
  'DialogService',
  'toaster'
];