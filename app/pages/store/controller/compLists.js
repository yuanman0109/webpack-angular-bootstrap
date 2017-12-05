import ModifyUserCtrl from './modifyUserModal.js';
//定义私有方法_init_
const _init_ = Symbol('_init_');
class CompListsCtrl {
  constructor($http, $uibModal, CusService, DialogService, ExportService) {
    Object.assign(this, {$http, $uibModal, CusService, DialogService, ExportService});
    this.totalItems = 0;
    this.$http = $http;
    this.customerLists = [];
    this.provinceLists = [];
    this.cityLists = [];
    this.countyLists = [];
    this.dishesLists = [];
    this.typeLists = [];
    this.statusLists = [];
    this.isAsc = false;
    this.isDesc = false;
    this.sort = 0;
    this.searchType = '2';
    this.getParame = {
      pageNo: 1,
      pageSize: 10
    };
    this.statuses = [
      {
        dataCode: 0,
        dataName: '正常'
      },
      {
        dataCode: 1,
        dataName: '禁用'
      },
      {
        dataCode: 2,
        dataName: '删除'
      }
    ];
    this.Properties = [
      {
        dataCode: 1,
        dataName: '直营'
      },
      {
        dataCode: 2,
        dataName: '加盟'
      }
    ];
    this.attribution = [
      {
        dataCode: 'OFFICE',
        dataName: '办公楼/写字楼'
      },
      {
        dataCode: 'INDUSTRY',
        dataName: '工业园区'
      },
      {
        dataCode: 'SCHOOL',
        dataName: '学区'
      },
      {
        dataCode: 'BUSINESS',
        dataName: '商圈'
      },
      {
        dataCode: 'STREET',
        dataName: '沿街'
      },
      {
        dataCode: 'OTHER',
        dataName: '其它'
      }
    ];
    this.startOpen = false;
    this.endOpen = false;
    this[_init_]();
  }
  [_init_]() {
    this.getCustomerlists(this.getParame);
    this.getDisheslist();
    // this.getCustomerType();
  }
    //获取客户列表
  getCustomerlists(param) {
    let _that = this;
    _that.CusService.getCustomerlists(param).then(function(data) {
      _that.customerLists = data.list;
      _that.total = data.total;
    }, function(err) {
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
    //搜索
  searchCusList() {
    let _that = this;
    switch (_that.searchType) {
      case '0':
        _that.getParame.companyName = _that.searchStr;
        delete _that.getParame.brandName;
        delete _that.getParame.searchStr;
        break;
      case '1':
        _that.getParame.brandName = _that.searchStr;
        delete _that.getParame.companyName;
        delete _that.getParame.searchStr;
        break;
      case '2':
        _that.getParame.searchStr = _that.searchStr;
        delete _that.getParame.brandName;
        delete _that.getParame.companyName;
        break;
    };
    this.getParame.pageNo = 1;
    this.timeTransform();
    this.getCustomerlists(_that.getParame);
  }

  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.searchCusList();
    }
  }

  //时间转换
  timeTransform() {
    const _that = this;
    if (_that.startTime) {
      _that.getParame.beginTime = _that.startTime.getTime();
    } else {
      _that.getParame.beginTime = null;
    };
    if (_that.endTime) {
      _that.getParame.endTime = _that.endTime.getTime() + (1000 * 59 * 59 * 23);
    } else {
      _that.getParame.endTime = null;
    }
  }
  //加载更多品牌
  searchBrand(name) {
    let _that = this;
    _that.searchStr = name;
    _that.searchType = '1';
    this.searchCusList();
  }
    //排序
  sortBt() {
    let _that = this;
    if (_that.sort === 0) {
      _that.sort = 1;
      _that.getParame.orderBys = `[{"column":"a.create_time","asc":true}]`;
      _that.searchCusList();
      return;
    };
    if (_that.sort === 1) {
      _that.sort = 2;
      _that.getParame.orderBys = `[{"column":"a.create_time","asc":false}]`;
      _that.searchCusList();
      return;
    };
    if (_that.sort === 2) {
      _that.sort = 0;
      _that.getParame.orderBys = null;
      _that.searchCusList();
      return;
    };
  }
  //获取菜系列表
  getDisheslist() {
    let _that = this;
    _that.CusService.getDisheslist().then(function(data) {
      _that.dishesLists = data;
    }, err => {
      console.log(err);
    });
  }

  // 获取客户类型
  // getCustomerType() {
  //   let _that = this;
  //   _that.CusService.getTypelist().then((data) => {
  //     _that.customer = data;
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  //修改维护人
  modifyUser(item) {
    let _that = this;
    _that.DialogService.openModal({
      template: require('../views/modal/list.modal.html'),
      controller: ModifyUserCtrl,
      controllerAs: 'ctrl',
      resolve: {
        opts: () => {
          return {
            'item': item,
            'call': () => {
              return _that.getCustomerlists(_that.getParame);
            }
          };
        }
      }
    })
    .then(result => {
      console.log(111);
    }).catch(error => {
      console.log(error);
    });
  }

  //翻页
  pageChanged() {
    this.getCustomerlists(this.getParame);
  };
  //导出
  exportStore() {
    const _that = this;
    this.timeTransform();
    this.ExportService.get('/customer/stores/download', this.getParame).then(resp => {
      if (resp.data && resp.data.code === 'S403') {
        _that.DialogService.showMessage('无权限', false);
      } else {
        _that.ExportService.exportCSV(resp);
      }
    }, err => {
      console.log(err);
    });
  }
};
CompListsCtrl.$inject = ['$http', '$uibModal', 'CusService', 'DialogService', 'ExportService'];
export default angular
  .module('CompListModule', [])
  .controller('CompListsCtrl', CompListsCtrl)
  .name;