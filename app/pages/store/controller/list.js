import ModifyUserCtrl from './modifyUserModal.js';
const _init_ = Symbol('_init_');

class storeListCtrl {
  constructor($state, $stateParams, CusService, DialogService, ExportService) {
    var isAsc = false;
    var getParame = {
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10,
      provinceCode: $stateParams.provinceCode || null,
      cityCode: $stateParams.cityCode || null,
      districtCode: $stateParams.districtCode || null,
      dishStyleCode: $stateParams.dishStyleCode || null,
      customerTypeCode: $stateParams.customerTypeCode || null,
      flag: $stateParams.flag || null,
      storeProperty: Number($stateParams.storeProperty) || null,
      status: Number($stateParams.status) || null,
      attribution: $stateParams.attribution || null,
      searchStr: $stateParams.searchStr || null
    };
    var greensList = []; //采系列表
    var customerList = []; //客户类型列表
    var list = []; //客户列表
    Object.assign(this, {
      $state,
      $stateParams,
      CusService,
      DialogService,
      ExportService,
      getParame,
      greensList,
      customerList,
      list,
      isAsc
    });
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
    this.sort = 0;
    this[_init_]();
  }

  [_init_]() {
    this.getStoreList();
    this.getDishList();
    this.getCustomerType();
  }

  // 获取客户列表
  getStoreList() {
    this.timeTransform();
    let _that = this;
    _that
      .CusService
      .getStoreList(_that.getParame)
      .then((data) => {
        _that.total = data.total;
        _that.list = data.list;
      }, (err) => {
        console.log(err);
      });
  }

  // 获取菜系
  getDishList() {
    let _that = this;
    _that
      .CusService
      .getDisheslist()
      .then((data) => {
        _that.greensList = data;
      });
  }

  // 获取客户类型
  getCustomerType() {
    let _that = this;
    _that.CusService.getTypelist().then((data) => {
      _that.customer = data;
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
  //排序
  sortBt() {
    let _that = this;
    if (_that.sort === 0) {
      _that.sort = 1;
      _that.getParame.orderBys = `[{"column":"a.create_time","asc":true}]`;
      _that.searchBt();
      return;
    };
    if (_that.sort === 1) {
      _that.sort = 2;
      _that.getParame.orderBys = `[{"column":"a.create_time","asc":false}]`;
      _that.searchBt();
      return;
    };
    if (_that.sort === 2) {
      _that.sort = 0;
      _that.getParame.orderBys = null;
      _that.searchBt();
      return;
    };
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
    this.$state.go('store.list', this.getParame);
  }
  //时间转换
  timeTransform(time) {
    const _that = this;
    if (_that.startTime) {
      _that.getParame.beginTime = _that.startTime.getTime();
    } else if (time) {
      _that.getParame.beginTime = null;
    } else if (_that.$stateParams.beginTime) {
      _that.getParame.beginTime = _that.$stateParams.beginTime;
      _that.startTime = new Date(parseInt(_that.$stateParams.beginTime));
    };
    if (_that.endTime) {
      _that.getParame.endTime = _that.endTime.getTime() + (1000 * 59 * 59 * 23);
    } else if (time) {
      _that.getParame.endTime = null;
    } else if (_that.$stateParams.endTime) {
      _that.getParame.endTime = _that.$stateParams.endTime;
      _that.endTime = new Date(parseInt(_that.$stateParams.endTime));
    }
  }
  // 翻页
  pageChanged() {
    this.goLists();
  }

  //修改维护人
  modifyUser(item) {
    const that = this;
    that.DialogService.openModal({
      template: require('../views/modal/list.modal.html'),
      controller: ModifyUserCtrl,
      controllerAs: 'ctrl',
      resolve: {
        opts: () => {
          return {
            'item': item,
            'call': () => {
              return that.getStoreList();
            }
          };
        }
      }
    })
    .then(result => {
      
    }).catch(error => {
      console.log(error);
    });
  }
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
}

storeListCtrl.$inject = ['$state', '$stateParams', 'CusService', 'DialogService', 'ExportService'];
export default angular.module('storeListModule', [])
  .controller('storeListCtrl', storeListCtrl)
  .name;