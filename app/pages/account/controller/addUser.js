/**
 * 添加用户
 *
 */
const _init_ = Symbol('_init_');
class AddUserCtrl {
  constructor($http, $stateParams, UserService, ivhTreeviewBfs, $state, $timeout, ivhTreeviewMgr, $scope, PublicServer, DialogService, $filter) {
    Object.assign(this, {$http, $stateParams, UserService, ivhTreeviewBfs, $state, $timeout, ivhTreeviewMgr, $scope, PublicServer, DialogService, $filter});
    this.userData = {};
    this.rolePower = [];
    this.roleLists = [];
    this.deptLists = [];
    this.lazyTime = null;
    this.isModify = false;
    //this.pushPowerList=[];
    this.busincessScope = [];
    this.userId = $stateParams.userId || '';
    this.isSetOrder = true;
    this.addUserData = {
      businessScope: {
        scopeCodes: [],
        scopeType: 'WHOLE_COUNTRY'
      }
    };
    this.customOpts = {
      childrenAttribute: 'children',
      labelAttribute: 'name',
      selectedAttribute: 'isReferenced',
      defaultSelectedState: false,
      idAttribute: 'code',
      expandToDepth: -1
    };
    this.busiOpts = {
      childrenAttribute: 'children',
      labelAttribute: 'name',
      selectedAttribute: 'selected',
      idAttribute: 'code',
      validate: true,
      twistieExpandedTpl: '<i class="iconfont icon-nb-l10"></i>',
      twistieCollapsedTpl: '<i class="iconfont icon-nb-l9"></i>',
      twistieLeafTpl: ' '
    };
    this.$scope.$on('getCity', (d, data) => {  
      if (data) {
        //选择城市回调
        this.getIsOrder(data);
      }
    });
    this.$scope.$watch(() => {
      return this.busincessScope;
    }, (newValue, oldValue) => {
      if (newValue === oldValue) {
        return;
      };
      //遍历业务范围选中状态
      const _that = this;
      let scopeCodes = _that.addUserData.businessScope.scopeCodes = [];
      if (_that.isAllcities) {
        scopeCodes.push('0');
      } else {
        //遍历业务范围选中状态
        _that
          .ivhTreeviewBfs(newValue, null, function(n, parents) {
            if (n.selected) {
              if (parents && (parents.length === 0 || (parents.length === 1 && !parents[0].selected) || (parents.length === 2 && !parents[0].selected && !parents[1].selected))) {
                scopeCodes.push(n.code);
              }
            }
          });
      };
    }, true);
    this[_init_]();
  }[_init_]() {
    this.getPowerList();
    this.getBusinessScope();
    this.getRolelists();
    this.getDeptlists();
    if (this.userId) {
      let _that = this;
      _that.isModify = true;
      _that
        .UserService
        .getUserdata(_that.userId)
        .then((data) => {
          let userdetail = data;
          _that.userData.deptId = userdetail.deptId;
          _that.userData.email = userdetail.email;
          _that.userData.mobilePhone = userdetail.mobilePhone;
          _that.userData.password = userdetail.password;
          _that.userData.realName = userdetail.realName;
          _that.addUserData.userName = userdetail.userName;
          _that.userData.userName = userdetail.userName;
          _that.userData.userNo = userdetail.userNo;
          _that.userData.officeProvince = userdetail.officeProvince;
          _that.userData.officeCity = userdetail.officeCity;
          _that.addUserData.roleIds = userdetail.roleIds;
          _that.addUserData.isSystemAllocated = userdetail.isSystemAllocated;
          _that.userScopeCodes = userdetail.scopeCodes;
          _that.selectRole(userdetail.roleIds);
          _that.getIsOrder(userdetail.officeCity);
          if (!_that.isInitBusiness) {
            _that.initBusiness(userdetail.scopeCodes);
          }
        });
    };
  }
  //判断业务范围是否初始化
  initBusiness(scopeCodes) {
    let _that = this;
    if (!scopeCodes || scopeCodes.length <= 0 || !_that.busincessScope || _that.busincessScope.length <= 0) {
      return;
    }
    _that.isInitBusiness = true;
    //判断是否选中全国
    if (scopeCodes.length === 1 && scopeCodes[0] === '0') {
      _that.isAllcities = true;
      _that
        .ivhTreeviewMgr
        .selectAll(_that.busincessScope);
    } else {
      let businessCodes = {};
      angular.forEach(scopeCodes, function(val) {
        businessCodes[val] = true;
      });
      _that.ivhTreeviewBfs(_that.busincessScope, null, function(n, parents) {
        if (businessCodes[n.code]) {
          _that
            .ivhTreeviewMgr
            .select(_that.busincessScope, n);
        }
      });
    }
  }

  //获取所有权限
  getPowerList() {
    let _that = this;
    _that
      .UserService
      .getPowerList()
      .then((data) => {
        _that.rolePower = data;
        _that.ivhTreeviewBfs(_that.rolePower, null, function(n, parents) {
          n.disabled = true;
        });
      });
  }
  //输入姓名回调
  getInfoFormName(name) {
    if (!name || name === '') {
      return;
    }
    let _that = this;
    _that
      .PublicServer
      .getUserdataFormName(name)
      .then((data) => {
        _that.userList = data;
      });
  }
  //输入工号回调
  getInfoFormNo(no) {
    const _that = this;    
    if (_that.lazyTime) _that.$timeout.cancel(_that.lazyTime);
    _that.lazyTime = _that.$timeout(() => {
      if (!no || no === '') {
        return;
      };
      _that
        .PublicServer
        .getUserdataFormNo(no)
        .then((data) => {
          _that.userList = data;
          _that.selCallback(data[0]);
        });
    }, 800);
  }
  //选择姓名回调
  selCallback(data) {
    const _that = this;
    _that.userData = data;
    _that.getIsOrder(data.officeCity);
  }
  //判断用户是否可以成为该区域接单人
  getIsOrder(code) {
    const _that = this;
    let param = {
      cityCode: code,
      userId: _that.userId
    };
    _that.UserService.getIsOrder(param).then(data => {
      if (!data.isSystemAllocatedUser) _that.addUserData.isSystemAllocated = false;
      _that.isSetOrder = data.isSystemAllocatedUser;
      _that.systemAllocatedUser = data.systemAllocatedUser;
    }, err => {
      console.log(err);
    });
  }
  //获取业务范围
  getBusinessScope() {
    let _that = this;
    _that
      .UserService
      .getBusinessScope()
      .then((data) => {
        _that.busincessScope = data;
        if (!_that.isInitBusiness) {
          _that.initBusiness(_that.userScopeCodes);
        }
      });
  }
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
  //选择角色回调
  selectRole(arr) {
    let _that = this;
    if (arr.length < 1) {
      _that.ivhTreeviewBfs(_that.rolePower, null, function(n, parents) {
        n.isReferenced = false;
      });
      return;
    }
    let param = {};
    param.param = arr;
    _that
      .UserService
      .getPowers(param)
      .then(function(data) {
        let permissionCodes = {};
        angular.forEach(data, function(val) {
          permissionCodes[val] = true;
        });
        _that.ivhTreeviewBfs(_that.rolePower, null, function(n, parents) {
          if (permissionCodes[n.code]) {
            //_that.ivhTreeviewMgr.select(_that.rolePower, n)
            n.isReferenced = true;
          } else {
            n.isReferenced = false;
          }
        });
      });
  }
  //全选
  selectAllCities(isSel) {
    let _that = this;
    if (isSel) {
      _that
        .ivhTreeviewMgr
        .selectAll(_that.busincessScope);
    } else {
      _that
        .ivhTreeviewMgr
        .deselectAll(_that.busincessScope);
    }
  };
  //选择城市node节点回调
  changeCallback(node) {
    let _that = this;
    if (!node.selected) {
      _that.isAllcities = false;
    } else {
      var selnum = 0;
      angular.forEach(_that.busincessScope, function(v, i) {
        if (v.selected) {
          selnum++;
        }
      });
      if (selnum === _that.busincessScope.length) {
        _that.isAllcities = true;
      }
    }
  };
  //保存用户
  saveUser() {
    let _that = this;
    _that.addUserData.userNo = _that.userData.userNo;
    _that.addUserData.officeProvince = _that.userData.officeProvince;
    _that.addUserData.officeCity = _that.userData.officeCity;
    //更新账户
    if (_that.userId) {
      _that.addUserData.id = _that.userId;
      _that
        .UserService
        .modifyUser(_that.addUserData)
        .then((data) => {
          this.DialogService.showMessage('修改成功!', true);
          setTimeout(() => {
            _that.$state.go('account.userLists');
          }, 1500);
        }, err => {
          let msg = _that.$filter('respErrMsg')(err.data.code);
          if (msg) {
            _that
              .DialogService
              .showMessage(msg, false);
          }
        });
    } else {
      // 保存账户
      _that
        .UserService
        .saveUser(_that.addUserData)
        .then((data) => {
          this.DialogService.showMessage('添加成功!', true);
          setTimeout(() => {
            _that.$state.go('account.userLists');
          }, 1500);
        }, err => {
          if (err.data.code === 'S409') {
            this.DialogService.showMessage('账号已存在，请勿重复添加!', false);
          };
        });
    }
  }
}
AddUserCtrl.$inject = [
  '$http',
  '$stateParams',
  'UserService',
  'ivhTreeviewBfs',
  '$state',
  '$timeout',
  'ivhTreeviewMgr',
  '$scope',
  'PublicServer',
  'DialogService',
  '$filter'
];
export default angular.module('AddUserModule', [])
  .controller('AddUserCtrl', AddUserCtrl)
  .name;