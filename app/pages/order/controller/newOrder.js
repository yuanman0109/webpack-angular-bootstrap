const _init_ = Symbol('_init_');

class newOrderCtrl {
  constructor(toaster, Upload, orderService, $state, $filter) {
    var startOpen = false;
    var endOpen = false;
    var getParame = {
      businessId: null,
      orderDesc: '',
      storeId: null
    };
    // var businessType = [{
    //   name: 'DINNER',
    //   businessId: '点餐（正）'
    // }, {
    //   name: 'PAY',
    //   businessId: '百味云支付'
    // }
    // // , {
    // //   name: 'PRINTER',
    // //   businessId: '云打印机'
    // // }
    // ];
    Object.assign(this, {
      Upload,
      toaster,
      startOpen,
      endOpen,
      getParame,
      orderService,
      $state,
      $filter
    });
    this[_init_]();
  }
  [_init_]() {
    console.log('...init new order ctrl');
    this.getTaskList();
    this.getBusinesses();
  }

  // 选择时间
  selDate(str) {
    const _that = this;
    if (str === 'end') {
      _that.endDateOps.minDate = _that.endTime;
    }
  }

  // 任务类型
  getTaskList() {
    let _that = this;
    _that
    .orderService
    .getTaskType()
    .then((res) => {
      _that.taskType = res;
      console.log(res);
    });
  }

  // 获取业务类型
  getBusinesses() {
    this.orderService.getBusinesses().then(data => {
      this.businessType = data;
    }, err => { console.log(err); });
  }

  // 文件上传
  uploadFiles(file, errFiles) {
    const _that = this;
    let url = '/api/publicimage/upload';
    if (file) {
      var toastInstance = _that.toaster.pop({
        type: 'info',
        body: '正在上传,请稍等...',
        timeout: 1000,
        tapToDismiss: false
      });
      _that.Upload.upload({
        url: url,
        data: {
          file: file
        }
      }).then((response) => {
        let data = response.data;
        if (data.code === 'S200') {
          _that.toaster.clear(toastInstance);
          // _that.thumbnail = data.data.url;
          _that.getParame.fileId = data.data.id;
          _that.isUploadFile = true;
        } else {
          let msg = _that.$filter('orderUpload')(data.code);
          msg && _that.orderService.showMessage(msg, false);
          _that.toaster.clear(toastInstance);
        }
      });
    }
  }

  //获取转接人信息
  getSaleName(val) {
    let _that = this;
    if (!val) {
      _that.getParame.transitUser = '';
      return;
    };
    _that.orderService.PublicServer.getUserFormName(val).then(function (data) {
      _that.userList = data.list;
    }, err => {
      console.log(err);
    });
  }
  focus() {
    this.userList = [];
  }

  //获取客户名称信息
  getStoreName(val) {
    let _that = this;
    if (!val) {
      _that.getParame.storeId = '';
      return;
    };
    _that.orderService.getStoreId(val).then(function (data) {
      _that.storeList = data.list;
    }, err => {
      console.log(err);
    });
  }
  store() {
    this.storeList = [];
  }

  //提交
  getSubmit() {
    let _that = this;
    _that
      .orderService
      .getNewOrder(_that.getParame, '派单成功')
      .then((data) => {
        if (!_that.getParame.transitUser) {
          _that.$state.go('order.pool');
        } else {
          _that.$state.go('order.myOrder');
        }
        // _that.$state.go('order.pool');
        // console.log(data);
      }, (err) => {
        let msg = _that.$filter('orderErrMsg')(err.data.code);
        if (msg) {
          _that
            .DialogService
            .showMessage(msg, false, 2000);
        }
      });
  }
}

newOrderCtrl.$inject = ['toaster', 'Upload', 'orderService', '$state', '$filter'];
export default angular.module('newOrder', [])
  .controller('newOrderCtrl', newOrderCtrl)
  .name;