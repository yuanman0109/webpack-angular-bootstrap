const _init_ = Symbol('_init_');
class UserListsCtrl {
  constructor($http, UserService, $stateParams, $state) {
    this.totalItems = 0;
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.UserService = UserService;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.userLists = [];
    this.roleLists = [];
    this.deptLists = [];
    this.stateLists = [];
    this.status = false;
    this.getParame = {
      deptId: parseInt($stateParams.deptId) || null,
      roleId: $stateParams.roleId || null,
      searchWord: $stateParams.searchWord || null,
      status: $stateParams.status || null,
      pageNo: parseInt($stateParams.pageNo) || 1,
      pageSize: 10
    };
    this[_init_]();
  }[_init_]() {
    this.getUserlists(this.getParame);
    this.getRolelists();
    this.getDeptlists();
    this.getStatelists();
  }
  //获取用户列表
  getUserlists(parm) {
    let _that = this;
    _that
      .UserService
      .getUserlists(parm)
      .then((data) => {
        _that.userLists = data.list;
        _that.totalItems = data.total;
        _that.$stateParams.searchWord = _that.getParame.searchWord;
        console.log(_that.getParame);
        _that.$state.go('account.userLists', {searchWord: _that.getParame.searchWord});
      });
  }
  //搜索
  searchBt(data) {
    this.getParame.pageNo = 1;
    this.goUserLists();
  }
  //路由跳转
  goUserLists() {
    this.$state.go('account.userLists', this.getParame);
  }
  // 回车键搜索
  enterKeyup(e) {   
    if (e.keyCode === 13) {
      this.getParame.pageNo = 1;
      this.goUserLists();
    }
  }
  //修改状态
  disableBt(id, str, index) {
    let _that = this;
    let userStatus = {
      ENABLED: '/sys/users/disable/',
      DISABLED: '/sys/users/enable/'
    };
    _that
      .UserService
      .EnableDisable(userStatus[str] + id)
      .then(data => {
        _that.userLists[index].status = str === 'ENABLED' ? 'DISABLED' : 'ENABLED';
      });
  }
  //列表翻页
  pageChanged() {
    this.goUserLists();
  };

  //获取角色列表
  getRolelists() {
    let _that = this;
    _that
      .UserService
      .getRoleDownlists()
      .then((data) => {
        _that.roleLists = data;
      });
  }
  //获取部门列表
  getDeptlists() {
    let _that = this;
    _that
      .UserService
      .getDeptlists()
      .then((data) => {
        _that.deptLists = data;
      });
  }
  //获取状态列表
  getStatelists() {
    let _that = this;
    _that
      .UserService
      .getStatus()
      .then((data) => {
        _that.stateLists = data;
      });
  }
}
UserListsCtrl.$inject = ['$http', 'UserService', '$stateParams', '$state'];
export default angular.module('UserListsModule', [])
  .controller('UserListsCtrl', UserListsCtrl)
  .name;