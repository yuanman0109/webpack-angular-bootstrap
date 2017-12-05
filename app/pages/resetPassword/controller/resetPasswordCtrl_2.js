const _init_ = Symbol('_init_');

export default class ResetPasswordCtrlTwo {
  constructor($state, $rootScope, $timeout, ResetPasswordService, DialogService) {
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.ResetPasswordService = ResetPasswordService;
    this.DialogService = DialogService;
    this.code = '';
    this.password = '';
    this.repassword = '';
    this[_init_]();
  }[_init_]() {
    if (!this.$rootScope.checkCodePass) {
      this.goHome();
    } else {
      this.code = this.$rootScope.checkCodePass;
    }
  }
  goHome() {
    this.$state.go('login');
  }
  // 提交密码
  savePassword() {
    let _that = this;
    var params = {
      code: _that.code,
      password: _that.repassword
    };
    console.log(params);
    _that.ResetPasswordService.savePassword(params).then((data) => {
      console.log(data);
      localStorage.clear();
      sessionStorage.clear();
      _that.DialogService.showMessage('密码修改成功', true);
      _that.$timeout(function() {
        _that.goHome();
      }, 2000);           
    }, (err) => {
      console.log(err);
      if (err.status === 409) {
        _that.DialogService.showMessage('新密码不能和默认密码相同', false);
        _that.goHome();
      }
      if (err.status === 400) {
        _that.DialogService.showMessage('参数错误', false);
        _that.goHome();
      }
      if (err.status === 500) {
        _that.DialogService.showMessage('验证码错误，请重试', false);
        _that.goHome();
      }
      if (err.status === 404) {
        _that.DialogService.showMessage('验证码失效，请重试', false);
        _that.goHome();
      }
      if (err.status === 408) {
        _that.DialogService.showMessage('未知系统异常', false);
        _that.goHome();
      }
    });
  }
};

ResetPasswordCtrlTwo.$inject = ['$state', '$rootScope', '$timeout', 'ResetPasswordService', 'DialogService'];
