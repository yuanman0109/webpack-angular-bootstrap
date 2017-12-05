
const _init_ = Symbol('_init_');

class attendanceSetCtrl {
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

    this.startOpen = false;
    this.endOpen = false;
    this.sort = 0;
    this[_init_]();
  }

  [_init_]() {
    this.getSettings();
  }

  // 获取客户列表
  getSettings() {
    this.timeTransform();
    let _that = this;
    _that
      .CusService
      .getSettings(_that.getParame)
      .then((data) => {
        _that.total = data.total;
        _that.list = data.list;
      }, (err) => {
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

  //删除
  modifyUser(item) {
    const that = this;
    // console.log(item);
    that.DialogService.openModal({
      template: require('../views/modal/release.modal.html'),
      controller: deleteCtrl,
      controllerAs: 'ctrl',
      resolve: {
        opts: () => {
          return {
            'item': item,
            'call': () => {
              return that.getSettings();
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
}

attendanceSetCtrl.$inject = ['$state', '$stateParams', 'CusService', 'DialogService', 'ExportService'];
export default angular.module('storeListModule', [])
  .controller('attendanceSetCtrl', attendanceSetCtrl)
  .name;

  /**
 * 修改维护人弹窗controller
 */
class deleteCtrl {
  constructor(opts, CusService, DialogService, $state, $filter, $uibModalInstance, PublicServer) {
    Object.assign(this, {opts, CusService, DialogService, $state, $filter, $uibModalInstance, PublicServer});
    console.log(this.opts);
  }

    // 确定
  confirm() {
    let _that = this;
    let params = {
      storeId: _that.opts.item.storeId,
      business: _that.opts.item.business
    };
    console.log(_that.opts);
    _that.CusService.putPublicSea(params).then(data => {
      _that.DialogService.showMessage('释放成功');
      _that.$uibModalInstance.close();
      _that.opts.call();
        //_that.$state.reload();
    }, err => {
      let msg = _that.$filter('storeRespErrMsg')(err.data.code);
      if (msg) {
        _that.DialogService.showMessage(msg, false, 2000);
      }
      console.log(err);
    });
  }

    // 取消
  cancel() {
    this.$uibModalInstance.dismiss();
    return false;
  }
  }
deleteCtrl.$inject = ['opts', 'CusService', 'DialogService', '$state', '$filter', '$uibModalInstance', 'PublicServer'];