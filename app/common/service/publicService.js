export default class PublicServer {
  constructor($q, $http, Upload, $rootScope, $uibModal, $filter, DialogService) {
    this.$q = $q;
    this.$http = $http;
    this.Upload = Upload;
    this.$rootScope = $rootScope;
    this.$uibModal = $uibModal;
    this.$filter = $filter;
    this.DialogService = DialogService;
  };
  /**
   *
   * @param {*} _url  请求地址
   * @param {*} _method 请求方法
   * @param {*} _data 请求数据
   * @param {*} isRap 是否走rap
   * @param {*} useUrl 是否直接走url（当不走rap时，走'_url'）,rap与useUrl为false时，走basicUrl:'/api+...'
   *
   */

  getRequestConfig(_url, _method, _data, isRap, useUrl) {
    var config = {
      url: (isRap || useUrl) ? _url : basicURL + _url,
      method: _method
    };
    
    if (_method === 'GET') {
      config.params = _data;
    } else {
      config.data = _data;
    }
    return config;
  }

  uploadFiles(file, errFiles, path) {
    const that = this;
    let url = '/api/' + path + '/upload';
    if (file) {
      if (!(file.size > 0)) {
        that.DialogService.showMessage('文件不能为空！', false);
      } else {
        return that.Upload.upload({
          url: url,
          data: {
            file: file
          }
        });
      }
    }
  }

  /**
   * 成功回调
   *
   * @param {*} data 返回的 http 信息
   * @param {*} _callback 回调函数
   * @param {*} _successMsg 状态成功是否调用dialog弹窗 ,弹出相应的提示
   */
  successCallback(data, deferred, _successMsg, isRap) {
    data = JSON.parse(JSON.stringify(data).replace(/</g, '&lt;').replace(/>/g, '&gt;'));
    let msg = '';
    //  'S200' => 状态成功
    if (isRap) {
      deferred.resolve(data.data);
    } else {
      if (!data.data) {
        deferred.resolve(data);
      } else {
        if (data.data.code === 'S200') {
        /**
         * if：=> 如果传_SuccessMsg(消息提示内容) 则调用dialog
         * else ：=> 否则不调用dialog
         */
          if (_successMsg) {
            msg = _successMsg;
            this
            .DialogService
            .showMessage(msg);            
          };        
          deferred.resolve(data.data.data);
        } else {
        /**
         * 状态不为S200（系统失败）的时候 弹出相应的code含义
         * 过滤成code说明
         * 调用dialog 弹窗
         */
        //如果是定义的全局err 弹出全局
          if (data.data.code) {
            console.log(data.config.url);
            msg = this.$filter('respCodeMsg')(data.data.code);
            if (msg) {
              this
              .DialogService
              .showMessage(msg, false);
            }
            if (data.data.code === 'S403') {
              this.getBtn();
            }
          }
          deferred.reject(data);
        }
      }
    }    
  }

  // 失败回调
  errorCallback(err, deferred) {
    console.log(err);
    deferred.reject(err);
  }

  /**
   *
   * @param {*} url  option:url
   * @param {*} data option: data
   * @param {*} _successMsg 成功后提示消息
   * @param {*} isRap 是否走rap
   * @param {*} useUrl 是否直接用url
   * .then(success,err)
   */
  //get
  get(url, data, _successMsg, isRap, useUrl) {
    let deferred = this
      .$q
      .defer();
    this
      .$http(this.getRequestConfig(url, 'GET', data, isRap, useUrl))
      .then(data => {
        this.successCallback(data, deferred, _successMsg, isRap);
      }, err => {
        this.errorCallback(err, deferred);
      });
    return deferred.promise;
  }

  //put
  put(url, data, _successMsg, isRap, useUrl) {
    let deferred = this
      .$q
      .defer();
    this
      .$http(this.getRequestConfig(url, 'PUT', data, isRap, useUrl))
      .then(data => {
        this.successCallback(data, deferred, _successMsg, isRap);
      }, err => {
        this.errorCallback(err, deferred);
      });
    return deferred.promise;
  }
  //post
  post(url, data, _successMsg, isRap, useUrl) {
    let deferred = this
      .$q
      .defer();
    this
      .$http(this.getRequestConfig(url, 'POST', data, isRap, useUrl))
      .then(data => {
        this.successCallback(data, deferred, _successMsg, isRap);
      }, err => {
        this.errorCallback(err, deferred);
      });
    return deferred.promise;
  }
  //delete
  delete(url, data, _successMsg, isRap, useUrl) {
    let deferred = this
      .$q
      .defer();
    this
      .$http(this.getRequestConfig(url, 'DELETE', data, isRap, useUrl))
      .then(data => {
        this.successCallback(data, deferred, _successMsg, isRap);
      }, err => {
        this.errorCallback(err, deferred);
      });
    return deferred.promise;
  }

  //获取地区列表
  getAreaList(areaNo) {
    return this.get('/cfg/areas/' + areaNo + '/subs');
  }

  //获取城市列表
  getCity(level) {
    return this.get('/cfg/areas/' + level + '/_tree');
  }
  //根据姓名获取用户信息 获取EHR用户信息
  getUserdataFormName(name) {
    return this.get('/sys/users/ehr', {
      'name': name
    });
  }
  //根据工号获取用户信息 获取EHR用户信息
  getUserdataFormNo(no) {
    return this.get('/sys/users/ehr', {
      'name': no
    });
  }
  //根据姓名获取用户信息 获取bss用户信息
  getUserFormName(name) {
    return this.get('/sys/users/_search', {
      'name': name
    });
  }
  //根据id获取用户信息 获取bss用户信息
  getUserFormId(id) {
    return this.get('/sys/users/info/' + id);
  }
  //获取菜单列表
  getMenu(successCallback, errorCallback) {
    return this.get('/sys/permissions/menu/_tree');
  }
  //获取按钮权限
  getBtn() {
    return this
      .get('/sys/permissions/button')
      .then(data => {
        this.$rootScope.btnData = data;
        this.$rootScope.btnlist = {};
        angular.forEach(this.$rootScope.btnData, (data) => {
          this.$rootScope.btnlist[data.code] = true;
        });
      });
  }
}
PublicServer.$inject = [
  '$q',
  '$http',
  'Upload',
  '$rootScope',
  '$uibModal',
  '$filter',
  'DialogService'
];