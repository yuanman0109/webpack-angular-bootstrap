const _init_ = Symbol('_init_');
class AppListsCtrl {
  constructor(AppService, DialogService, $state, $stateParams, $filter) {
    Object.assign(this, {AppService, DialogService, $state, $stateParams, $filter});
    this.getParame = {
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10,
      name: $stateParams.name || null,
      displayVersion: $stateParams.displayVersion || null
    };
    this.startOpen = false;
    this.endOpen = false;
    this[_init_]();
  }[_init_]() {
    this.getApplists(this.getParame);
  }
  //获取app列表
  getApplists(parm) {
    this.timeTransform();
    let _that = this;
    _that
      .AppService
      .getAppList(parm)
      .then(data => {
        _that.appLists = data.list;
        _that.total = data.total;
      }, err => {
        console.log(err);
        _that.appLists = [];
      });
  }
  //选择时间
  selDate(str) {
    const _that = this;
    if (str === 'start') {
      _that.endDateOps.minDate = _that.startTime;
    } else {
      _that.startDateOps.maxDate = _that.endTime;
    }
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
    };
  }
  //搜索
  searchBt() {
    this.getParame.pageNo = 1;
    this.timeTransform(1);
    this.goLists();
  }

  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchBt();
    }
  }

  //翻页
  pageChanged() {
    this.goLists();
  };
  //路由跳转
  goLists() {
    this.$state.go('application.appList', this.getParame);
  }
  
  //删除app
  deleteApp(item) {
    this.defaultConfirmOptions = {
      title: '删除App',
      message: `你确定删除版本【${item.version}】的【${item.name}】吗？`,
      confirmBtnText: '确 定',
      cancelBtnText: '取 消'
    };

    this.DialogService.openConfirm(this.defaultConfirmOptions).then(() => {
      const _that = this;
      _that.AppService.deleteApp([item.id]).then(res => {
        _that.getApplists(this.getParame);
      }, () => {
        _that.DialogService.showMessage('删除失败，请重新操作', false);
      });
    }, () => {
      console.log('cancel');
    });
  }
}
AppListsCtrl.$inject = ['AppService', 'DialogService', '$state', '$stateParams', '$filter'];
export default angular.module('AppListsModule', [])
  .controller('AppListsCtrl', AppListsCtrl)
  .name;