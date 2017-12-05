const _init_ = Symbol('_init_');

export default class ResetPasswordCtrl {
  constructor($state, $timeout, $rootScope, ResetPasswordService, DialogService) {
    this.$state = $state;
    this.$timeout = $timeout;
    this.$rootScope = $rootScope;
    this.ResetPasswordService = ResetPasswordService;
    this.DialogService = DialogService;
    this.mobilePhone = '';
    this.code = '';
    this.warnWord = false;
    this.timeoutNum = 180;
    this.showTimeoutNum = false;
    this[_init_]();
  }[_init_]() {
    // console.log('ResetPasswordCtrl work !!!!!!');
    // console.log(localStorage.token);
    this.getLoginUser();     
    this.sendCode();  
  }
  goHome() {
    this.$state.go('login');
  }
  // 获取登陆用户信息
  getLoginUser() {
    let _that = this;
    _that.ResetPasswordService.getLoginUser().then((data) => {
      // console.log(data);      
      _that.mobilePhone = data.data.mobilePhone;
    }, (err) => {
      console.log(err);
    });
  }
  // 验证码倒计时
  timeControl() {
    let _that = this;
    if (_that.timeoutNum > 1) {
      _that.timeoutNum -= 1;
      _that.startTimeout = _that.$timeout(_that.timeControl.bind(_that), 1000);
    } else {
      _that.$timeout.cancel(_that.startTimeout);
      _that.showTimeoutNum = false;
    }
  }
  //发送验证码
  sendCode() {
    let _that = this;
    _that.ResetPasswordService.sendCode().then((data) => {
      // console.log(data);
      // console.log(data.data.errorCode);
      if (data.data.errorCode === 'S000') {
        _that.DialogService.showMessage('已经发送过验证码，请勿重复操作', false);
        _that.showTimeoutNum = true;
        _that.timeoutNum = data.data.leftTime;
        _that.timeControl();
      } else if (data.data.errorCode === 'S001') {
        _that.DialogService.showMessage('超过每天可发送验证码数量', false);
        _that.goHome();
      } else {
        _that.showTimeoutNum = true;
        _that.timeoutNum = data.data.leftTime;
        _that.timeControl();
      }            
    }, (err) => {
      console.log(err);
    });
  }
  changeCode() {
    this.warnWord = false;
  }
  //检查是否在输入
  // checkKey(e) {
  //   if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
  //     this.warnWord = false;
  //   }
  // }
  // 验证验证码，跳转到下一步
  goStep2() {
    let _that = this;
    var params = {
      code: _that.code
    };
    _that.ResetPasswordService.checkCode(params).then((data) => {
      console.log(data);
      this.$state.go('resetPassword.step2');
      _that.$timeout.cancel(_that.startTimeout);
      _that.$rootScope.checkCodePass = _that.code;
    }, (err) => {
      console.log(err);
      if (err.status === 500) {
        _that.warnWord = true;
      }
      if (err.status === 404) {
        console.log('it is 404');
        _that.DialogService.showMessage('验证码失效，请重新发送验证码', false);
      }
    });
  }
};

ResetPasswordCtrl.$inject = ['$state', '$timeout', '$rootScope', 'ResetPasswordService', 'DialogService'];