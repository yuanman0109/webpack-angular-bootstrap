const _init_ = Symbol('_init_');
class ClueListsCtrl {
  constructor($state, $stateParams, ClueService, DialogService, ExportService, $filter) {
    Object.assign(this, {$state, $stateParams, ClueService, DialogService, ExportService, $filter});
    this.getParame = {
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10,
      clueStatus: $stateParams.clueStatus || 'WAIT',
      city: $stateParams.city || null,
      provinceCode: $stateParams.provinceCode || null,
      source: $stateParams.source || null,
      searchStr: $stateParams.searchStr || null
    };
    this.statusList = [
      {
        dataCode: 'WAIT',
        dataName: '待分配'
      },
      {
        dataCode: 'EXIST_PUBLIC',
        dataName: '已存在公海'
      },
      {
        dataCode: 'EXIST_PRIVATE',
        dataName: '已存在私海'
      },
      {
        dataCode: 'EXIST_FORMAL',
        dataName: '已签约客户'
      },
      {
        dataCode: 'INVALID',
        dataName: '无效客户'
      },
      {
        dataCode: 'RIVAL',
        dataName: '竞争对手'
      },
      {
        dataCode: 'GET',
        dataName: '已分配'
      }
    ];
    this.status = {
      'WAIT': '待分配',
      'EXIST_PUBLIC': '已存在公海',
      'EXIST_PRIVATE': '已存在私海',
      'EXIST_FORMAL': '已签约客户',
      'INVALID': '无效客户',
      'RIVAL': '竞争对手',
      'GET': '已分配'
    };
    this.startOpen = false;
    this.endOpen = false;
    this[_init_]();
  }
  [_init_]() {
    this.getClueList();
    this.getSource();
  }
  //获取来源
  getSource() {
    this.ClueService.getSource().then(data => {
      this.source = data;
    }, err => {
      console.log(err);
    });
  }
  //获取线索列表
  getClueList() {
    const that = this;
    that.timeTransform();
    that.ClueService.getCluelist(that.getParame).then(data => {
      that.clueList = data.list;
      that.total = data.total;
    }, err => {
      console.log(err);
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
      _that.getParame.beginTime = _that.$filter('date')(_that.startTime, 'yyyy-MM-dd 00:00:00');
    } else if (time) {
      _that.getParame.beginTime = null;
    } else if (_that.$stateParams.beginTime) {
      _that.getParame.beginTime = _that.$stateParams.beginTime;
      _that.startTime = new Date(_that.$stateParams.beginTime);
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
  //搜索
  searchBt() {
    this.timeTransform(1);
    this.getParame.pageNo = 1;
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
    this.$state.go('store.clueList', this.getParame);
  }
  //导出
  exportStore() {
    const _that = this;
    this.timeTransform();
    this.ExportService.get('/customer/clues/csv', this.getParame).then(resp => {
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
ClueListsCtrl.$inject = ['$state', '$stateParams', 'ClueService', 'DialogService', 'ExportService', '$filter'];
export default angular
.module('ClueListModule', [])
.controller('ClueListsCtrl', ClueListsCtrl)
.name;