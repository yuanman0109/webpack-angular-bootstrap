const _init_ = Symbol('_init_');
class UserHistoryCtrl {
  constructor(UserService, $filter) {
    this.UserService = UserService;
    this.$filter = $filter;
    this.startIsopen = false;
    this.endIsopen = false;
    this.searchData = {
      pageNo: 1,
      pageSize: 10
    };
    this[_init_]();
  }[_init_]() {
    this.getDeptlists();
    this.getHistory(this.searchData);
  }
  //获取记录
  getHistory(data) {
    let _that = this;
    _that
      .UserService
      .getHistory(data)
      .then((data) => {
        _that.userHistory = data.list;
        _that.totalRecords = data.total;
      });
  }
  //获取部门列表
  getDeptlists() {
    let _that = this;
    _that
      .UserService
      .getDeptlists()
      .then(function(data) {
        _that.deptLists = data;
      });
  };
  //选择时间
  selDate(str) {
    let _that = this;
    if (str === 'start') {
      _that.endDateOps.minDate = _that.begin;
    } else {
      _that.startDateOps.maxDate = _that.end;
    }
  }
  //搜索
  searchBt() {
    this.searchData.pageNo = 1;
    let _that = this;
    _that.searchData.beginTime = _that.$filter('date')(_that.begin, 'yyyy-MM-dd 00:00:00');
    _that.searchData.endTime = _that.$filter('date')(_that.end, 'yyyy-MM-dd 23:59:59');
    _that.getHistory(_that.searchData);
  }
  // 回车键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchBt();
    }
  }
  //翻页
  pageChanged() {
    this.getHistory(this.searchData);
  };
}
UserHistoryCtrl.$inject = ['UserService', '$filter'];
export default angular.module('UserHistoryModule', [])
  .controller('userHistoryCtrl', UserHistoryCtrl)
  .name;