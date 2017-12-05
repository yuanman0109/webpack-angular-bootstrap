
// import async from 'async';
class AddAttendanceCtrl {
  constructor($uibModal, $log, $http, $timeout, $location, $stateParams, CusService, PublicServer, $state, $filter, $ocLazyLoad, DialogService, ivhTreeviewBfs, ivhTreeviewMgr) {
    Object.assign(this, {$uibModal, $log, $http, $timeout, $location, $stateParams, CusService, PublicServer, $state, $filter, $ocLazyLoad, DialogService, ivhTreeviewBfs, ivhTreeviewMgr});
    this.checkInBeginTime = null;
    this.checkInEndTime = null;
    this.checkOutBeginTime = null;
    this.checkOutEndTime = null;
    this.btnStatus = false;
    this.basicInfo = {
      depts: [],
      attendanceWorkDays: [],
      attendancePunchs: []
    };
    this.addWorkArr = [];
    this.removeWorkArr = [];
    this.selectIn = false;
    this.selectOut = false;
    this.checkIn = {
      attendanceType: null
    }; // 上班
    this.checkOut = {
      attendanceType: null
    }; // 下班
    this.clickStatus = false;
    this.addWorkOpen = false; // 添加工作日期开关
    this.removeWorkOpen = false; // 移除工作日期开关
    this.week = [{name: '周一', code: 1, select: false}, {name: '周二', code: 2, select: false}, {name: '周三', code: 3, select: false}, {name: '周四', code: 4, select: false}, {name: '周五', code: 5, select: false}, {name: '周六', code: 6, select: false}, {name: '周日', code: 0, select: false}];
    //是否是新增页面
    this.id = $stateParams.id;
    this.isAlldepts = false;
    // this.basicInfo = {
    //   endTime: null,
    //   deptsName: null,
    //   startTime: null
    // };
    this.cityOpts = {
      childrenAttribute: 'children',
      labelAttribute: 'name',
      selectedAttribute: 'selected',
      idAttribute: 'code',
      validate: false,
      expandToDepth: 1,
      twistieExpandedTpl: '<i class="iconfont icon-nb-l10"></i>',
      twistieCollapsedTpl: '<i class="iconfont icon-nb-l9"></i>',
      twistieLeafTpl: ' '
    };
    this.dateOptions = {
      dateDisabled: this.disabled,
      formatYear: 'yy',
      // maxDate: new Date(2020, 5, 22),
      // minDate: new Date(),
      startingDay: 1
    };
    this.removeOptions = {
      dateDisabled: this.disabled,
      formatYear: 'yy',
      startingDay: 1
    };

    //判断是否是添加页面还是修改页面
    if (this.id) {
      this.Init();
      this.basicInfo = {};
      this.busTypeDisabled = ['PRINTER'];
      this.busTypeEdit = false;
    } 
  }
  //修改页面初始化
  Init() {
    this.id = this.$stateParams.id;
    this.pageType = this.$stateParams.pageType;
    this.gitBtnStatus(this.pageType);
    if (this.pageType !== 'addNew') {
      this.getAttendanceInfo(this.id);
    }
  }
  openModal(work) {
    let _that = this;
    let $uibModal = this.$uibModal;
    let $log = this.$log;
    let basicInfo = this.basicInfo;
    let fn = function ($uibModalInstance) {
      var $ctrl = this;
      $ctrl.ok = function () {
        $uibModalInstance.close();
      };
      $ctrl.cancel = function () {
        $uibModalInstance.dismiss();
      };
      $ctrl.seldata = {
        address: '',
        name: '',
        poiId: '',
        poiLat: '',
        poiLng: '',
        provinceName: '',
        cityName: '',
        countyName: ''
      };
      console.log(work);
      $ctrl.seldata[work] = '';
      $ctrl.sel = function () {
        $uibModalInstance.close();
        $ctrl.seldata[work] = $ctrl.seldata.address;
        Object.assign(basicInfo, $ctrl.seldata);
        console.log(basicInfo);
        // basicInfo[work] = $ctrl.seldata.address;
        _that.names = [basicInfo.provinceName, basicInfo.cityName, basicInfo.countyName];
        _that.getaddressCode('00', 0);
      };
    };
    fn.$inject = ['$uibModalInstance'];
    $uibModal.open({
      size: 'lg',
      windowClass: 'commonDialog',
      templateUrl: 'openMap.html',
      controller: fn,
      controllerAs: '$ctrl',
      openedClass: 'map-warp'
    }).result.then(function () {
      $log.info('ok');
    }, function (err) {
      $log.info(err);
    });
  }
  replaceStr(e) {
    console.log(e);
  }
  //判断是否已经加载地图api
  openMap(work) {
    const that = this;
    function getWinMap() {
      if (window.AMap) {
        that.$timeout.cancel(that.mapTimeout);
        that.loadMapJs(work);
      } else {
        $script('//webapi.amap.com/maps?v=1.3&key=81fac60f1f32651fd89a80449806238d', () => {
          that.mapTimeout = that.$timeout(getWinMap, 300);
        });
      }
    }
    getWinMap();
  }
  //加载地图依赖js
  loadMapJs(work) {
    $script('//webapi.amap.com/ui/1.0/plug/ext/jquery-1.12.4.min.js', () => {
      $script(['//webapi.amap.com/ui/1.0/main.js', '//a.amap.com/amap-ui/static/1.0/ui/misc/MarkerList/examples/jquery.twbsPagination.min.js'], 'mapUi');
      $script.ready('mapUi', () => {
        this.openModal(work);
      });
    });
  }
  
  //获取城市code
  getaddressCode(code, index) {
    let _that = this;
    let parms = {
      name: _that.names[index]
    };
    _that.CusService.getaddressCode(code, parms).then(function (data) {
      switch (index) {
        case 0:
          _that.basicInfo.provinceCode = data.areaCode;
          break;
        case 1:
          _that.basicInfo.cityCode = data.areaCode;
          break;
        case 2:
          _that.basicInfo.districtCode = data.areaCode;
          break;
      };
      if (data && data.areaCode && data.areaName && index < 2) {
        _that.getaddressCode(data.areaCode, ++index);
      }
    }, err => {
      console.log(err);
    });
  }
 
  //保存基本信息
  saveAttendance() {
    let _that = this;
    let fn, tipMsg;
    console.log(_that.addWorkArr);
    _that.basicInfo.attendanceWorkDays = _that.basicInfo.attendanceWorkDays.concat(_that.addWorkArr, _that.removeWorkArr);
    if (_that.selectIn && !_that.checkIn.attendanceType) {
      _that.checkIn.attendanceType = 'CHECK_IN';
      console.log(_that.checkIn);
      _that.basicInfo.attendancePunchs.push(_that.checkIn);
    }
    if (_that.selectOut && !_that.checkOut.attendanceType) {
      _that.checkOut.attendanceType = 'CHECK_OUT';
      _that.basicInfo.attendancePunchs.push(_that.checkOut);
    }
    console.log(_that.basicInfo);
    // return;
    if (_that.id) {
      fn = _that.CusService.modifyAttendance(_that.basicInfo);
      tipMsg = '修改成功';
    } else {
      fn = _that.CusService.saveAttendance(_that.basicInfo);
      tipMsg = '添加成功';
    }
    _that.clickStatus = true;
    fn.then(function (data) {
      _that.DialogService.showMessage(tipMsg);
      setTimeout(function() {
        if (_that.id) {
          history.go(-2);
        } else {
          _that.$state.go('attendance.set');
        }
      }, 1500);
    }, err => {
      const msg = _that.$filter('addStoreErrMsg')(err.data.code);
      msg && _that.DialogService.showMessage(msg, false);
      _that.clickStatus = false;
      console.log(err);
    });
  }
 
  //获取门店详情
  getAttendanceInfo() {
    const _that = this;
    _that.CusService.getCustomerDetail(this.id).then(function (data) {
      // callback(null, data);
      _that.basicInfo = data;
      if (_that.basicInfo.area) _that.basicInfo.area = Number(_that.basicInfo.area);
      _that.codes = [_that.basicInfo.province, _that.basicInfo.city, _that.basicInfo.county];
    }, err => {
      console.log(err);
    });
  }

  // 编辑、提交按钮显示/隐藏
  gitBtnStatus(param) {
    if (param === 'detail') {
      this.btnStatus = true;
    } else {
      this.btnStatus = false;
    }
  }

  weekChange(bus) {
    console.log(this.week);
  }   
  
  isAddOpen() {
    let _that = this;
    // console.log(_that.week);
    let week = _that.week;
    _that.addWorkOpen = !_that.addWorkOpen;
    
    _that.dateOptions = {
      dateDisabled: disabled,
      formatYear: 'yy',
      // maxDate: new Date(2020, 5, 22),
      // minDate: new Date(),
      startingDay: 1
    };
    function disabled(data) {
      let disable = '',
          mode = data.mode;
      // console.log(week);
      week.forEach(item => {
        if (item.select) {
          if (disable === '') {
            disable += 'data.date.getDay() === ' + String(item.code);
          } else {
            disable += ' || data.date.getDay() === ' + String(item.code);
          }
        }   
      });
      let switchViewFunc = new Function('data', 'return ' + disable);      
      // console.log(disable);
      // eval(disable);
      return mode === 'day' && switchViewFunc(data);
      // return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }
  }
  isRmoveOpen() {
    let _that = this;
    // console.log(_that.week);
    let week = _that.week;
    _that.removeWorkOpen = !_that.removeWorkOpen;
    
    _that.removeOptions = {
      dateDisabled: disabled,
      formatYear: 'yy',
      // maxDate: new Date(2020, 5, 22),
      // minDate: new Date(),
      startingDay: 1
    };
    function disabled(data) {
      let disable = '',
          mode = data.mode;
      // console.log(week);
      week.forEach(item => {
        if (!item.select) {
          if (disable === '') {
            disable += 'data.date.getDay() === ' + String(item.code);
          } else {
            disable += ' || data.date.getDay() === ' + String(item.code);
          }
        }   
      });
      let switchViewFunc = new Function('data', 'return ' + disable);      
      return mode === 'day' && switchViewFunc(data);
    }
  }

  // 添加上班日期
  selDate(arr, node) {
    let _that = this;
    console.log(_that[arr]);
    console.log(_that[arr].length);
    console.log(_that.$filter('date')(_that[node], 'MM-dd'));
    console.log(_that[node]);
    let workDay = _that.$filter('date')(_that[node], 'MM-dd');
    if (_that[arr]) {
      console.log(1);
      if (_that[arr].every(item => {
        // console.log(_that.$filter('date')(item.workDay, 'MM-dd'));
        // console.log(new Date(_that[node]).getTime());
        // console.log(_that.$filter('date')(item.workDay, 'MM-dd') !== _that.$filter('date')(_that[node], 'MM-dd'));
        return _that.$filter('date')(item.workDay, 'MM-dd') !== workDay;
      })) {
        if (arr === 'addWorkArr') {
          _that[arr].push({'workDay': workDay, 'workDayType': 'WORK_DATE'});
          // _that.basicInfo.attendanceWorkDays.push({'workDay':workDay , 'workDayType':'WORK_DATE'});
        } else {
          _that[arr].push({'workDay': workDay, 'workDayType': 'HOLIDAY'});
          // _that.basicInfo.attendanceWorkDays.push({'workDay':workDay , 'workDayType':'HOLIDAY'});
        }
      };
    } else {
      if (arr === 'addWorkArr') {
        _that[arr].push({'workDay': workDay, 'workDayType': 'WORK_DATE'});
        // _that.basicInfo.attendanceWorkDays.push({'workDay':workDay , 'workDayType':'WORK_DATE'});
      } else {
        _that[arr].push({'workDay': _that[node], 'workDayType': 'HOLIDAY'});
        // _that.basicInfo.attendanceWorkDays.push({'workDay':_that[node] , 'workDayType':'HOLIDAY'});
      }
    }
   
    console.log(_that[arr]);
  }

  deleteAdd(key, arr) {
    this[arr].splice(key, 1);
    // this.basicInfo.attendanceWorkDays.splice(key, 1);
  }

  changedTime(check, be, time) {
    let _that = this;
    _that[check][be] = _that.$filter('date')(_that[time], 'HH:mm:ss');
    // console.log(_that[time])
  }
  
    //获取考勤管理员信息
  getUserName(val) {
    let _that = this;
    if (!val) {
      // _that.basicInfo.createUser = null;
      return;
    }
    _that.CusService.PublicServer.getUserFormName(val).then(function (data) {
      _that.userList = data.list;
    }, err => {
      console.log(err);
    });
  }
  focus() {
    this.userList = [];
  }
    //选择部门
  selDepts() {
    let _that = this;
    if (_that.depts) {
      _that.callback();
    } else {
      _that
        .CusService
        .getDepartmentsTree()
        .then(data => {
          _that.depts = data;
          _that.callback();
        }, err => {
          let msg = _that.$filter('AdvRespErrMsg')(err.data.code);
          if (msg) {
            _that
              .DialogService
              .showMessage(msg, false);
          }
        });
    }
  }
    //选择部门按钮回调
  callback() {
    let _that = this;
    if (_that.id) {
      let cityObj = {};
      // angular.forEach(_that.basicInfo.citys, function(val) {
      //   cityObj[val.code] = true;
      // });
      _that.ivhTreeviewBfs(_that.depts, null, function(n, parents) {
        if (cityObj[n.code]) {
          _that
            .ivhTreeviewMgr
            .select(_that.depts, n);
        }
      });
    };
    let fn = function($uibModalInstance) {
      var $ctrl = this;
      $ctrl.depts = _that.depts;
      $ctrl.isAlldepts = _that.isAlldepts;
      $ctrl.tpl = '<div title="{{trvw.label(node)}}"><label class="checkbox-inline"><span ivh-tree-checkbox-helper="node"></span><span>{{trvw.label(node)}}</span></label><div ng-if="trvw.isExpanded(node)" ivh-treeview-children></div></div>';
      $ctrl.cityOpts = _that.cityOpts;
      if ($ctrl.isAlldepts) {
        _that
          .ivhTreeviewMgr
          .selectAll(_that.depts);
      };
      $ctrl.selectAllCities = function(isSel) {
        if (isSel) {
          _that
            .ivhTreeviewMgr
            .selectAll(_that.depts);
        } else {
          _that
            .ivhTreeviewMgr
            .deselectAll(_that.depts);
        }
      };
      //选择部门node节点回调
      $ctrl.changeCallback = function(node) {
        if (!node.selected) {
          $ctrl.isAlldepts = false;
        } else {
          var selnum = 0;
          angular.forEach(_that.depts, function(v, i) {
            if (v.selected) {
              selnum++;
            }
          });
          if (selnum === _that.depts.length) {
            $ctrl.isAlldepts = true;
          }
        }
      };
      $ctrl.ok = function() {
        _that.isAlldepts = $ctrl.isAlldepts;
        _that.basicInfo.depts = [];
        // _that.basicInfo.citys = [];
        _that.deptsName = [];
        _that.ivhTreeviewBfs(_that.depts, null, function(n, parents) {
          if (n.selected) {
            if (parents && (parents.length === 0 || !parents[0].selected)) {
              _that
                .basicInfo
                .depts
                .push(n.code);
              _that
                .deptsName
                .push(n.name);
              // _that
              //   .basicInfo
              //   .citys
              //   .push(n.code);
            }
          }
        });
        if ($ctrl.isAlldepts) {
          _that.basicInfo.depts = '0';
        } else {
          // if (_that.basicInfo.depts.length > 0) {
          //   _that.basicInfo.depts = _that
          //     .basicInfo
          //     .depts
          //     .join(',');
          // };
          if (_that.deptsName.length > 0) {
            _that.deptsName = _that
              .deptsName
              .join(',');
          };
        }
        console.log(_that);
        // _that.
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
        templateUrl: 'selDepts.html',
        controller: fn,
        controllerAs: '$ctrl'
      })
      .result
      .then(function() {}, function() {
        console.log('cancle');
      });
  }
}
AddAttendanceCtrl.$inject = [
  '$uibModal',
  '$log',
  '$http',
  '$timeout',
  '$location',
  '$stateParams',
  'CusService',
  'PublicServer',
  '$state',
  '$filter',
  '$ocLazyLoad',
  'DialogService',
  'ivhTreeviewBfs', 
  'ivhTreeviewMgr'
];

export default angular.module('AddAttendanceModule', [])
  .controller('AddAttendanceCtrl', AddAttendanceCtrl)
  .name;