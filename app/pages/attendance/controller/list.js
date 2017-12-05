
const _init_ = Symbol('_init_');

class attendanceListCtrl {
  constructor($state, $stateParams, CusService, DialogService, ExportService, $filter, ImgLightbox) {
    var getParame = {
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10,
      userName: $stateParams.userName || null,
      deptName: $stateParams.deptName || null,
      imei: $stateParams.imei || null,
      punchType: $stateParams.punchType || null
    };
    var list = []; //客户列表
    Object.assign(this, {
      $state,
      $stateParams,
      CusService,
      DialogService,
      ExportService,
      $filter,
      getParame,
      list, 
      ImgLightbox
    });
    this.punchType = {
      'CHECK_IN': '上班打卡',
      'CHECK_OUT': '下班打卡'
      }

    this.startOpen = false;
    this.endOpen = false;
    this[_init_]();
  }

  [_init_]() {
    this.getDeptlists();
    this.getRecordList();
  }

  // 获取客户列表
  getRecordList() {
    this.timeTransform();
    let _that = this;
    _that
      .CusService
      .getRecordList(_that.getParame)
      .then((data) => {
        _that.total = data.total;
        _that.list = data.list;
      }, (err) => {
        console.log(err);
      });
  }
     // 查看图片
  openLightboxModal (obj) {
    this.ImgLightbox.openModal([{url: this.$filter('imgUrlWithToken')(obj.url), 'caption': obj.title}], 0);
  };

  //选择时间
  selDate(str) {
    const _that = this;
    if (str === 'start') {
      _that.endDateOps.minDate = _that.startTime;
    } else {
      _that.startDateOps.maxDate = _that.endTime;
    }
  }

  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchBt();
    }
  }
  // 搜索
  searchBt() {
    this.getParame.pageNo = 1;
    this.timeTransform(1);
    this.goLists();
  }
    //路由跳转
  goLists() {
    this.$state.go('attendance.list', this.getParame);
  }
  //时间转换
  timeTransform(time) {
    const _that = this;
    if (_that.startTime) {
      _that.getParame.startTime = _that.$filter('date')(_that.startTime, 'yyyy-MM-dd 00:00:00');
    } else if (time) {
      _that.getParame.startTime = null;
    } else if (_that.$stateParams.startTime) {
      _that.getParame.startTime = _that.$stateParams.startTime;
      _that.startTime = new Date(_that.$stateParams.startTime);
    };
    if (_that.endTime) {
      _that.getParame.endTime = _that.$filter('date')(_that.endTime, 'yyyy-MM-dd 23:59:59');
    } else if (time) {
      _that.getParame.endTime = null;
    } else if (_that.$stateParams.endTime) {
      _that.getParame.endTime = _that.$stateParams.endTime;
      _that.endTime = new Date(_that.$stateParams.endTime);
    }
  }
  // 翻页
  pageChanged() {
    this.goLists();
  }
  //获取接单人信息
  getUserName(val) {
    let _that = this;
    if (!val) {
      _that.getParame.userName = null;
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
    //获取部门列表
  getDeptlists() {
    let _that = this;
    _that
      .CusService
      .getDeptlists()
      .then(function(data) {
        _that.deptLists = data;
      });
  };

  //导出
  exportStore() {
    const _that = this;
    this.timeTransform();
    this.ExportService.get('/attendance/record_export', this.getParame).then(resp => {
      if (resp.data && resp.data.code === 'S403') {
        _that.DialogService.showMessage('无权限', false);
      } else {
        _that.ExportService.exportCSV(resp);
      }
    }, err => {
      console.log(err);
    });
  }
}

attendanceListCtrl.$inject = ['$state', '$stateParams', 'CusService', 'DialogService', 'ExportService', '$filter', 'ImgLightbox'];
export default angular.module('storeListModule', [])
  .controller('attendanceListCtrl', attendanceListCtrl)
  .name;