//定义私有方法_init_
const _init_ = Symbol('_init_');
class UserDetailCtrl {
  constructor($http, $stateParams, UserService) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.UserService = UserService;
    this.userDetail = {};
    this.detailOpts = {
      childrenAttribute: 'children',
      labelAttribute: 'name',
      selectedAttribute: 'selected',
      defaultSelectedState: false,
      idAttribute: 'code',
      expandToDepth: -1
    };
    this[_init_]();
  };
  [_init_]() {
    this.userId = this.$stateParams.userId;
    this.getUserDetail(this.userId);
  }
  getUserDetail(id) {
    let _that = this;
    _that.UserService.getUserDetail(id).then(data => {
      _that.userDetail = data;
    });
  }
}
UserDetailCtrl.$inject = ['$http', '$stateParams', 'UserService'];
export default angular.module('UserDetailModule', [])
  .controller('userDetailCtrl', UserDetailCtrl)
  .name;