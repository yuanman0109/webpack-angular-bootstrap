//全局常量
export default class basicConfig {
  constructor($uibModal, $timeout, $filter) {
    this.$uibModal = $uibModal;
    this.$timeout = $timeout;
    this.$filter = $filter;
  };
  errorCallback(err) {
    console.log(err);
  }
  callback(data, fn, cb) {
    if (data.status >= 400) {
      this.openModal(data.data.msg);
      if (cb) {
        cb();
      }
    } else {
      //状态不为S200（系统正常）的时候 弹出相应的code含义
      if (data.data.code != "S200") {
        let msg = {};
        // 过滤成code说明
        msg.message = this.$filter("respCodeMsg")(data.data.code);
        // 显示弹窗
        this.openModal(msg);
      }
      if (fn) {
        fn(data.data);
      }
    }
  }
  openModal(data, fn) {
    let _that = this;
    let func = function() {
      this.message = data.message || '操作成功！';
      this.status = data.status;
      if (data.data && data.data instanceof Array && data.data.length > 0) {
        this.message = data.data[0];
      }
    };
    var modalInstance = this
      .$uibModal
      .open({ templateUrl: 'remind.html', controller: func, size: 'sm', backdrop: 'static', controllerAs: '$ctrl' });
    modalInstance
      .opened
      .then(function() {
        _that
          .$timeout(function() {
            modalInstance.close();
            if (fn)
              fn();
          }, 1500)
      });
  }
  getRequestConfig(_url, _method, _data) {
    var config = {
      url: basicURL + _url,
      method: _method
    };

    if (_method == 'GET') {
      config.params = _data
    } else {
      config.data = _data;
    }
    return config;
  }

}
basicConfig.$inject = ['$uibModal', '$timeout', '$filter'];
