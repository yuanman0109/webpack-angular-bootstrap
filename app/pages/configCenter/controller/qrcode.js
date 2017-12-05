'use strict';
const _init_ = Symbol('_init_');
  /**
   * Creates an instance of PaymentQrcodeCtrl.
   * @param {any} DialogService  弹窗服务
   * @param {any} paymentQrcodeService 支付二维码服务
   * @param {any} ExportService 导出
   * @param {any} $rootScope 全局作用域
   * @param {any} $filter 过滤器
   * @param {any} toaster 消息提示
   * @memberof PaymentQrcodeCtrl 
   */
class PaymentQrcodeCtrl {
  constructor(DialogService, paymentQrcodeService, ExportService, $rootScope, $filter, toaster) {
    Object.assign(this, { DialogService, paymentQrcodeService, ExportService, $rootScope, $filter, toaster, qrcodeList: [], choseArr: [], str: '', allCheck: false, sigleCheck: false, tabIndex: 0, ids: [] });
    /**
     *  this 部分字段
     * @param {array} qrcodeList  二维码列表
     * @param {array} choseArr 存储选中的id数组
     * @param {string} str 存储选中的id 字符串
     * @param {boolean} allCheck 是否点击了全选
     * @param {boolean} sigleCheck 单选默认未选中
     * @param {number} tabIndex 选中的第index 的tab 
     */ 
    $rootScope.isgeneratorQrcode = true;
    $rootScope.isdownloadQrcode = 'done'; 
    this[_init_]();
  }[_init_]() {
    // 获取token 放在请求的url 后面传参
    this.$rootScope.token = localStorage.token;
    /**
     * tabs选项卡
     * @param {heading} 标题string
     * @param {pageNo} 当前页面number,init=1
     * @param {status} status二维码状态('undownload', 'downloaded', 'used')string
     */
    this.tabs = [{
      'heading': '未下载',
      'status': 'UNDOWNLOADED',
      'pageNo': '1'
    }, {
      'heading': '已下载',
      'status': 'DOWNLOADED',
      'pageNo': '1'
    }, {
      'heading': '已使用',
      'status': 'USED',
      'pageNo': '1'
    }];
    /**
     * param
     * @param {number} isCount
     * @param {string} orderBys 排序字段
     * @param {number} pageNo 当前页面
     * @param {number} pageSize 当前页数
     * @param {string} status 二维码状态('undownload', 'downloaded', 'used')
     * @param {string} store 客户名称或者id
     */
    this.param = {
      pageSize: 50,
      pageNo: 1
    };
  }
  // 页码切换
  pageChanged() {
    let _that = this;
    this.getQrcodeList(_that.tabIndex, _that.param.status, _that.param.pageNo);
  }

  /**
   * 
   *  获取二维码列表
   * @param {number} index tab 选中的第index 的tab
   * @param {string} status 二维码状态('undownload', 'downloaded', 'used')
   * @param {number} pageNo 当前页面 
   * 
   * @memberof PaymentQrcodeCtrl
   */
  getQrcodeList(index, status, pageNo) {    
    const _that = this;    
    // 清空数组 清空字符串
    _that.choseArr = [];
    _that.str = '';    
    _that.param.status = status;
    _that.param.pageNo = pageNo;
    // 判断是否搜索已使用状态数据
    if ((_that.tabIndex !== index) && (index === 2) && _that.param.store) {
      _that.tabIndex = index;
      return;
    } else {
      _that.tabIndex = index;
      if (index !== 2) { delete _that.param.store; }
    }
    _that
      .paymentQrcodeService
      .getQrcodelist(_that.param)
      .then((data) => {
        _that.qrcodeList[index] = data.list;        
        _that.param.pageNo = data.pageNum;
        _that.qrcodeList[index].total = data.total;       
        _that.all(false);
        if (!data.list.length) {
          _that.qrcodeList.noList = true;
          _that.qrcodeList[index].noList = true;
        } else {
          _that.qrcodeList.noList = false;
          _that.qrcodeList[index].noList = false;
        }
      }, (err) => {
        let msg = _that.$filter('qrcodeRespErrMsg')(err.data.code);
        msg && _that.DialogService.showMessage(msg, false);
      });
  }
  // 快捷键搜索
  enterKeyup(e) {
    if (e.keyCode === 13) {
      this.getQrcodeList(2, 'USED', 1);
    }
  }
  //批量下载二维码地址
  downloadUrlQrcode() {
    let obj = {
      ids: this.choseArr
    };
    this.toaster.pop({
      type: 'info',
      timeout: 2000,
      body: '正在添加到浏览器下载，请稍等'
    });
    this.ExportService.post('/barcodes/downloadCsv', obj).then((data) => {
      this.getQrcodeList(this.tabIndex, this.param.status, this.param.pageNo);
      this.ExportService.exportCSV(data);
    }, (err) => {
      this.toaster.pop({
        type: 'error',
        timeout: 2000,
        body: '下载失败，请重新下载'
      });
      console.log(err);
    });
  }

  // 下载二维码 & 模板
  downloadTemplate(id) {
    const _that = this;

    if (_that.download === 'qrcodeUrl') {
      _that.downloadUrlQrcode();
      return false;
    }
    if (_that.$rootScope.isdownloadQrcode === 'being') {
      return false;
    }
    let ids;
    if (id) {
      ids = [id];
    } else {
      ids = _that.choseArr;
    }
    _that
      .DialogService
      .openModal({
        template: require('../views/modal/downloadTemplate.modal.html'),
        controller: downloadTemplateModalCtrl,
        controllerAs: 'ctrl',
        resolve: {
          options: function() {
            return {
              ids: ids,
              'refreshDownLoad': function() {
                return _that.getQrcodeList(_that.tabIndex, _that.param.status, 1);
              },
              'addEventListener': () => {
                return _that.addEventListener();
              },
              'removeEventListener': () => {
                return _that.removeEventListener();
              }
            };
          }
        }
      });
  }

  // 生成二维码
  generatorQrcode() {
    const _that = this;
    if (!_that.$rootScope.isgeneratorQrcode) {
      return false;
    }
    _that
      .DialogService
      .openModal({
        template: require('../views/modal/generatorQrcode.modal.html'),
        controller: generatorQrcodeModalCtrl,
        controllerAs: 'ctrl',
        resolve: {
          options: () => {
            return {
              'refeshGenerator': () => {
                return _that.getQrcodeList(_that.tabIndex, _that.param.status, _that.param.pageNo);
              },
              'addEventListener': () => {
                return _that.addEventListener();
              },
              'removeEventListener': () => {
                return _that.removeEventListener();
              }
            };
          }

        }
      });
  }
  // 点击批量下载 || 批量下载二维码内容
  downloadEvent(flag) {
    var _that = this;
    _that.str = '';
    _that.choseAr = [];
    _that.ids = [];
    if (_that.choseArr.length === 0) {
      _that.allCheck = false;
      _that.all(_that.allCheck, _that.qrcodeList[_that.tabIndex]);
    }
    _that.batchDownload = !_that.batchDownload;
    if (flag) {
      _that.download = flag; 
    }
  }
  
  // 全部二维码内容下载
  qrcodeUrlDownloadAll() {
    let obj = angular.copy(this.param);
    delete obj.pageNo;
    delete obj.pageSize;
    this.toaster.pop({
      type: 'info',
      timeout: 2000,
      body: '正在添加到浏览器下载，请稍等'
    });
    this.ExportService.get('/barcodes/downloadAllCsv', obj, {timeout: 60000}).then((data) => {
      this.getQrcodeList(this.tabIndex, this.param.status, 1);
      this.ExportService.exportCSV(data);
    }, (err) => {
      console.log(err);
      this.toaster.pop({
        type: 'error',
        timeout: 2000,
        body: '下载失败，请重新下载'
      });
    });
  }

   // 下载已使用二维码
  downloadUsedBarcodes() {
    this.toaster.pop({
      type: 'info',
      timeout: 2000,
      body: '正在添加到浏览器下载，请稍等'
    });
    this.ExportService.get('/barcodes/downloadUsedBarcodes').then((data) => {
      this.getQrcodeList(this.tabIndex, this.param.status, 1);
      this.ExportService.exportCSV(data);
    }, (err) => {
      console.log(err);
      this.toaster.pop({
        type: 'error',
        timeout: 2000,
        body: '下载失败，请重新下载'
      });
    });
  }

   //关闭网页或刷新加载提示
  loadTips(e) {
    console.log(e);
    var confirmationMessage = '确定离开此页吗？';
    (e || window.event).returnValue = confirmationMessage; // Gecko and Trident
    console.log(confirmationMessage);
    return confirmationMessage; // Gecko and WebKit
  }
  // 添加事件beforeunload 监听
  addEventListener() {
    window.addEventListener('beforeunload', this.loadTips);
  }
  // 删除事件beforeunload监听
  removeEventListener() {
    window.removeEventListener('beforeunload', this.loadTips);
  }

  /**
   * 单选
   * 
   * @param {any} id   单选 选中的id值
   * @param {Boolean} ischeck  单选 是否选中
   * @param {Object} list  数据列表
   * 
   * @memberof PaymentQrcodeCtrl
   */
  chk(id, ischeck, list) {
    //单选或者多选
    let _that = this;
    //在全选的基础上操作
    if (_that.allCheck === true) {
      _that.str = _that
        .choseArr
        .join(',') + ',';
    }

    //单选选中
    if (ischeck === true) {
      // 拼接字符串
      _that.str = _that.str + id + ',';
      // 字符串生成数组
      _that.choseArr = (_that.str.substr(0, _that.str.length - 1)).split(',');
      // 对比选中的数组的长度 和 列表的长度 是否相等
      if (_that.choseArr.length === list.length) {
        // 全选
        _that.allCheck = true;
      }
    } else {
      //取消选中
      _that.str = _that
        .str
        .replace(id + ',', '');
      console.log(_that.sigleCheck);
      // 取消全选
      _that.allCheck = false;
    }

    // 字符串生成数组
    _that.choseArr = (_that.str.substr(0, _that.str.length - 1)).split(',');

    //判断 字符串是否空
    if (_that.str === '') {
      // 字符串空时 数组为空
      _that.choseArr = [];
    }
  };

  //全选
  /**
   * 
   * 
   * @param {Boolean} isallCheck  是否全选
   * @param {Object} list  数据列表
   * 
   * @memberof PaymentQrcodeCtrl
   */
  all(isallCheck, list) {
    let _that = this;

    // 清空数组 和 字符串
    _that.choseArr = [];
    _that.str = '';

    // 如果全选选中
    if (isallCheck === true) {
      _that.sigleCheck = true;

      // 循环 拼接字符串
      for (let i = 0; i < list.length; i++) {
        _that.str = _that.str + list[i].id + ',';
        list[i].sigleCheck = true;
      }

      // 字符串转数组
      _that.choseArr = (_that.str.substr(0, _that.str.length - 1)).split(',');
    } else {
      // 如果全选未选中
      _that.sigleCheck = false;
      _that.choseArr = [];
      _that.allCheck = false;
    }
  };
}
PaymentQrcodeCtrl.$inject = [
  'DialogService',
  'paymentQrcodeService',
  'ExportService',
  '$rootScope',
  '$filter',
  'toaster'
];

export default angular.module('PaymentQrcodeModule', [])
  .controller('PaymentQrcodeCtrl', PaymentQrcodeCtrl)
  .name;

/**
 *  下载二维码弹窗controller
 */

const _initTemp_ = Symbol('_initTemp_');
class downloadTemplateModalCtrl {
  constructor($uibModalInstance, $rootScope, $http, $timeout, $filter, paymentQrcodeService, ExportService, DialogService, toaster, options) {
    Object.assign(this, {$modalInstance: $uibModalInstance, $rootScope, $http, $timeout, $filter, paymentQrcodeService, ExportService, DialogService, toaster, options});
    $rootScope.token = localStorage.token;
    $rootScope.isdownloadQrcode = 'done';
    this[_initTemp_]();
  }[_initTemp_]() {
    this.getTemplate();
  }
  // 获取模板列表
  getTemplate() {
    this
      .paymentQrcodeService
      .getTemplatelist()
      .then((data) => {
        this.tempList = data.list;
        console.log(data);
      }, (err) => {
        let msg = this.$filter('qrcodeRespErrMsg')(err.data.code);
        msg && this.DialogService.showMessage(msg, false);
      });
  }
  // 确认
  confirm() {
    this.options.addEventListener();
    this.$rootScope.isdownloadQrcode = 'being';
    this.$modalInstance.close();
    let toastInstance = this.toaster.pop({
      type: 'info',
      timeout: 100000,
      body: '正在合成模板，请耐心等待'
    });

    let req = {
      url: '/api/barcodes/download?access_token=' + this.$rootScope.token,
      method: 'POST',
      data: {
        'templateId': this.templateId,
        'ids': this.options.ids
      },
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer'
    }; 
 
    this
      .$http(req)
      .then((data) => {
        this.ExportService.downloadBinary(data);
        this.toaster.clear(toastInstance);
        this.$timeout(() => {
          this.toaster.pop({
            type: 'info',
            timeout: 1000,
            body: '已添加到浏览器下载'
          });
        }, 1000);
        this.$rootScope.isdownloadQrcode = 'done';
        this.options.refreshDownLoad();
        this.options.removeEventListener();
      }, () => {
         //download failed
        this.$rootScope.isdownloadQrcode = 'done';
        // this.options.refreshDownLoad();
        this.toaster.clear(toastInstance);
        this.toaster.pop({
          type: 'error',
          timeout: 2000,
          body: '下载失败，请重新下载'
        });
      });
  }
  // 取消
  cancel() {
    this
      .$modalInstance
      .dismiss('取消二维码下载');
  }
}

downloadTemplateModalCtrl.$inject = ['$uibModalInstance', '$rootScope', '$http', '$timeout', '$filter', 'paymentQrcodeService', 'ExportService', 'DialogService', 'toaster', 'options'];

/**
 *  生成二维码弹窗controller
 */
class generatorQrcodeModalCtrl {
  constructor($uibModalInstance, paymentQrcodeService, $rootScope, $timeout, $filter, DialogService, toaster, options) {
    Object.assign(this, {$modalInstance: $uibModalInstance, paymentQrcodeService, $rootScope, $timeout, $filter, DialogService, toaster, options});
    $rootScope.token = localStorage.token;
    //是否正在生成二维码 如果正在生成二维码 则禁止再次点击生成按钮
    $rootScope.isgeneratorQrcode = true;
  }
  // 确认 生成二维码 按钮
  confirm() {
    this.$rootScope.isgeneratorQrcode = false;
    this.options.addEventListener();
    this.$modalInstance.close();
    var toastInstance;
    let objdata = {
      'count': this.count
    };
    //判断 生成数量 大于300 或小于1
    if (this.count > 30000 || this.count < 1) {
      this.$rootScope.isgeneratorQrcode = true;
      this.toaster.clear(toastInstance);
      this.options.removeEventListener();
      return false;
    }
    // 生成二维码
    toastInstance = this.toaster.pop({
      type: 'info',
      body: '正在生成二维码，稍后请手动刷新列表',
      timeout: 3000,
      tapToDismiss: false
    });
    this
      .paymentQrcodeService
      .generatorQrcode(this.$rootScope.token, objdata)
      .then((data) => {
        this.$rootScope.isgeneratorQrcode = true;
        // this.options.refeshGenerator();
        this.options.removeEventListener();
      }, (err) => {
        this.$rootScope.isgeneratorQrcode = true;
        this.options.removeEventListener();
        this.toaster.clear(toastInstance);
        let msg = this.$filter('qrcodeRespErrMsg')(err.data.code);
        msg && this.DialogService.showMessage(msg, false);
        if (err.status >= 500) {
          this.toaster
            .pop({
              type: 'error',
              timeout: 2000,
              body: '生成失败，请重新生成'
            });
        }
      });
  }
  // 取消
  cancel() {
    this
      .$modalInstance
      .dismiss('取消二维码生成');
  }
}
generatorQrcodeModalCtrl.$inject = [
  '$uibModalInstance',
  'paymentQrcodeService',
  '$rootScope',
  '$timeout',
  '$filter',
  'DialogService',
  'toaster',
  'options'
];