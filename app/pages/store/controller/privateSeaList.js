// import ModifyUserCtrl from './modifyUserModal.js';
const _init_ = Symbol('_init_');

class privateSeaListCtrl {
  constructor($state, $stateParams, CusService, DialogService, ExportService, $filter) {
    var isAsc = false;
    var getParame = {
      pageNo: $stateParams.pageNo || 1,
      pageSize: 10,
      serviceStatus: $stateParams.serviceStatus || 'GET',
      name: $stateParams.name || null,
      serviceUser: $stateParams.serviceUser || null,
      provinceCode: $stateParams.provinceCode || null,
      cityCode: $stateParams.cityCode || null,
      districtCode: $stateParams.districtCode || null
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
      isAsc, 
      $filter
    });
    this.startOpen = false;
    this.endOpen = false;
    this.sort = 0;
    this[_init_]();
  }

  [_init_]() {
    this.getPrivateSeaList();
    this.getCustomerType();
  }

  // 获取客户列表
  getPrivateSeaList() {
    this.timeTransform();
    let _that = this;
    _that
      .CusService
      .getPrivateSeaList(_that.getParame)
      .then((data) => {
        _that.list = data.list;
        _that.total = data.total;
      }, (err) => {
        console.log(err);
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

  //路由跳转
  goLists() {
    this.$state.go('store.privateSeaList', this.getParame);
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
  //时间转换
  timeTransform(time) {
    const _that = this;
    // console.log(_that.startTime);
    // console.log(_that.endTime);
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
  // 翻页
  pageChanged() {
    this.goLists();
  }

   //获取跟进人信息
  getUserName(val) {
    let _that = this;
    if (!val) {
      _that.getParame.serviceUser = '';
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

  //释放私海
  modifyUser(item) {
    const that = this;
    // console.log(item);
    that.DialogService.openModal({
      template: require('../views/modal/release.modal.html'),
      controller: releaseSeaCtrl,
      controllerAs: 'ctrl',
      resolve: {
        opts: () => {
          return {
            'item': item,
            'call': () => {
              return that.getPrivateSeaList();
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
    // let param = this.getParame;
    // if(param.pageNo)
    this.ExportService.get('/customer/sourcestores/list/export', this.getParame).then(resp => {
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

privateSeaListCtrl.$inject = ['$state', '$stateParams', 'CusService', 'DialogService', 'ExportService', '$filter'];
export default angular.module('privateSeaListModule', [])
  .controller('privateSeaListCtrl', privateSeaListCtrl)
  .name;

/**
 * 修改维护人弹窗controller
 */
class releaseSeaCtrl {
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
releaseSeaCtrl.$inject = ['opts', 'CusService', 'DialogService', '$state', '$filter', '$uibModalInstance', 'PublicServer'];