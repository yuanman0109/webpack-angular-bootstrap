const _init_ = Symbol('_init_');
export default class LoginCtrl {
  constructor($http, $stateParams, $state, $rootScope, PublicServer, LoginService, toaster, $filter, $httpParamSerializerJQLike) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.PublicServer = PublicServer;
    this.LoginService = LoginService;
    this.$rootScope = $rootScope;
    this.toaster = toaster;
    this.$filter = $filter;
    this.$httpParamSerializerJQLike = $httpParamSerializerJQLike;
    this[_init_]();
  }[_init_]() {
    let _that = this;
    console.log('进入login页面中');
    _that.isLogin = false;
  }
  loginBt() {
    let _that = this;
    let req = {
      method: 'POST',
      url: loginURL + '/oauth/token?client_id=mobile-client&client_secret=mobile&grant_type=password&sc' +
        'ope=read',
      data: _that.$httpParamSerializerJQLike(_that.formData), 
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' } 
    };
    _that.isLogin = true;
    _that
      .$http(req)
      .then(function(data) {
        if (data.status === 200) {
          let token = data.data.access_token;
          localStorage.token = token;
          _that.toaster.pop({
            body: '登录成功!',
            timeout: 1000,
            toasterId: 1
          });
          _that.PublicServer.getMenu().then(data => {
            _that.PublicServer.getBtn();
            _that.$rootScope.menutData = data;
            // 前端本地开放调试路由
           // _that.$rootScope.menutData.push({code: 'ATTENDANCE', id: null, isReferenced: null, name: '考勤管理', children: [{id: null, code: 'ATTENDANCE_01', name: '考勤打卡设置', isReferenced: null}, {id: null, code: 'ATTENDANCE_02', name: '考勤打卡报表', isReferenced: null}]});
            
            _that.LoginService.getpage(_that.$rootScope);
            setTimeout(function() {
              if (sessionStorage.prevPage) {
                _that

                    .$state
                    .go(sessionStorage.prevPage);
              } else {
                _that
                    .$state
                    .go(_that.$rootScope.defaultPage);
              }
            }, 1000);
          }, (err) => {
            console.log(err);
            // 第一次登陆
            if (err.data.code === 'S402') {
              console.log('it is first login !!!!!!');
              _that.$state.go('resetPassword.step1');
            }
          });
        }
      }, (err) => {
        let msg = _that.$filter('loginErrMsg')(err.data.error);
        if (msg) {
          _that
            .toaster
            .pop({
              body: msg,
              timeout: 1000,
              toasterId: 1
            });
        };
        _that.isLogin = false;
      });
  }
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.loginBt();
    }
  }
}
LoginCtrl.$inject = [
  '$http',
  '$stateParams',
  '$state',
  '$rootScope',
  'PublicServer',
  'LoginService',
  'toaster',
  '$filter',
  '$httpParamSerializerJQLike'
];