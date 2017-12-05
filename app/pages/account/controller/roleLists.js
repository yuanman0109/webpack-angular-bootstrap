/**
 * 账户管理/角色管理 ->控制器
 *
 */
//定义私有方法_init_
const _init_ = Symbol('_init_');
class RoleListsCtrl {
  constructor($http, $uibModal, DialogService, RoleService, $filter) {
    this.$uibModal = $uibModal;
    this.DialogService = DialogService;
    this.RoleService = RoleService;
    this.totalItems = 0;
    this.$http = $http;
    this.$filter = $filter;
    this.roleLists = [];
    this.params = {
      pageNo: 1,
      pageSize: 10
    };
    this[_init_]();
  }[_init_]() {
    this.getRolelists(this.params);
  }
  // 获取角色权限列表
  getRolelists(params) {
    let _that = this;
    this
      .RoleService
      .getRolePagelists(params)
      .then((data) => {
        _that.roleLists = data.list;
        _that.totalItems = data.total;
      });
  }
  // 页面切换
  pageChanged() {
    this.getRolelists(this.params);
  };
  // 删除角色权限
  deleteRole(roleInfo) {
    let _that = this;
    let fn = function($uibModalInstance) {
      var $ctrl = this;
      $ctrl.name = name;
      $ctrl.ok = function() {
        $uibModalInstance.close();
      };
      $ctrl.cancel = function() {
        $uibModalInstance.dismiss();
      };
    };
    fn.$inject = ['$uibModalInstance'];
    _that
      .$uibModal
      .open({
        templateUrl: 'deleteRole.html',
        controller: fn,
        controllerAs: '$ctrl'
      })
      .result
      .then(function() {
        _that
          .RoleService
          .deleteRole(roleInfo.id, '删除成功')
          .then(function(data) {
            _that.params.pageNo = 1;
            _that.getRolelists(_that.params);
          }, function(err) {
            let msg = _that.$filter('respErrMsg')(err.data.code);
            if (msg) {
              _that
                .DialogService
                .showMessage(msg, false);
            }
          });
      }, function() {
        console.log('取消删除');
      });
  }
}
RoleListsCtrl.$inject = ['$http', '$uibModal', 'DialogService', 'RoleService', '$filter'];
export default angular.module('RoleListsModule', [])
  .controller('roleListsCtrl', RoleListsCtrl)
  .name;