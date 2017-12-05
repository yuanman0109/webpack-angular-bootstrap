const _init_ = Symbol('_init_');

class AddRoleCtrl {
  constructor(ivhTreeviewBfs, RoleService, $stateParams, UserService, $state, DialogService, $timeout, $filter) {
    Object.assign(this, {ivhTreeviewBfs, RoleService, $stateParams, UserService, $state, DialogService, $timeout, $filter});
    this.rolePower = [];
    this.addRoleData = {
      id: null,
      name: '',
      permissionCodes: null
    };
    this.customOpts = {
      childrenAttribute: 'children',
      labelAttribute: 'name',
      selectedAttribute: 'isReferenced',
      defaultSelectedState: false,
      idAttribute: 'code',
      expandToDepth: -1
    };
    this[_init_]();
  }[_init_]() {
    let _that = this;

    if (this.$stateParams.id) {
      let roleid = this.$stateParams.id;
      //获取当前角色信息
      _that
        .RoleService
        .getRoleInfo(roleid)
        .then((data) => {
          _that.addRoleData.name = data.name;
        });
      //获取当前角色权限 根据角色ID获取权限CODE列表
      _that
        .UserService
        .getRolepowers(roleid)
        .then((data) => {
          _that.rolePower = data;
        });
    } else {
      _that.getPowerList();
    }
  }
  //获取所有权限
  getPowerList() {
    let _that = this;
    _that
      .UserService
      .getPowerList()
      .then(function(data) {
        _that.rolePower = data;
      });
  }

  // 权限确定按钮
  saveRole() {
    let _that = this;
    _that.addRoleData.permissionCodes = [];

    if (_that.rolePower) {
      _that
        .ivhTreeviewBfs(_that.rolePower, null, function(n, parents) {
          if (n.isReferenced) {
            if (_that.addRoleData.permissionCodes.indexOf(n.code) === -1) {
              _that
                .addRoleData
                .permissionCodes
                .push(n.code);
            }
            angular
              .forEach(parents, function(val) {
                if (_that.addRoleData.permissionCodes.indexOf(val.code) === -1) {
                  _that
                    .addRoleData
                    .permissionCodes
                    .push(val.code);
                }
              });
          }
        });
    }
    //更新权限
    if (this.$stateParams.id) {
      this.addRoleData.id = this.$stateParams.id;
      this.RoleService.modifyRole(this.addRoleData).then(() => {
        this.callback('修改成功！');
      }, (err) => {
        this.errCallback(err);
      });
    } else {
      // 新增权限
      delete this.addRoleData.id;
      this.RoleService.saveRole(this.addRoleData).then(() => {
        this.callback('添加成功！');
      }, (err) => {
        this.errCallback(err);
      });
    }
  }
  //成功回调
  callback(msg) {
    this.DialogService.showMessage(msg);
    this.$timeout(() => {
      this.$state.go('account.roleManagerLists');
    }, 1500);
  }
  //失败回调
  errCallback(err) {
    const msg = this.$filter('RoleErrMsg')(err.data.code);
    msg && this.DialogService.showMessage(msg, false);
  }
}
AddRoleCtrl.$inject = [
  'ivhTreeviewBfs',
  'RoleService',
  '$stateParams',
  'UserService',
  '$state',
  'DialogService',
  '$timeout',
  '$filter'
];

export default angular.module('AddRoleModule', [])
  .controller('AddRoleCtrl', AddRoleCtrl)
  .name;