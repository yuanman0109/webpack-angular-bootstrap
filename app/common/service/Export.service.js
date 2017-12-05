'use strict';
export default class DownloadService {
  constructor($http, $httpParamSerializerJQLike, $document) {
    Object.assign(this, {$http, $httpParamSerializerJQLike, $document});    
  }
  /**
   * @param ishttp 是否是全地址http://...
   */
  download(url, data, ishttp) {
    let anchor = angular.element('<a/>');
    this.$document.find('body').append(anchor);    
    url = url + '?' + this.$httpParamSerializerJQLike(data);
    //如果不是直接下载（全地址），添加basicURL:'/api'
    if (!ishttp) {
      url = basicURL + url;
    }   
    anchor.attr({
      href: url,
      target: '_self'
    })[0].click();
    setTimeout(() => {
      anchor.remove();
    }, 2000);
  }  

  /**
   * 下载二进制流文件
   * 
   * @param {any} data 
   * @param {any} [addUint8Array=[]]
   * 
   * @memberof DownloadService
   */
  downloadBinary(data, addUint8Array = []) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(new Blob([(addUint8Array, data.data)], {type: data.headers('content-type')}), decodeURI(data.headers('fileName')));  
    } else {
      let evt = document.createEvent('MouseEvents');
      evt.initEvent('click', true, true);
      angular.element('<a/>').attr({
        href: URL.createObjectURL(new Blob([addUint8Array, data.data], {type: data.headers('content-type')})),
        download: decodeURI(data.headers('fileName'))
      })[0].dispatchEvent(evt);
    }
  }  
  // 导出CSV
  exportCSV(resp) {
    this.downloadBinary(resp, new Uint8Array([0xEF, 0xBB, 0xBF]));
  }
  getRequestConfig(_url, _method, _data, conf, useUrl) {
    var config = {
      url: useUrl ? _url : basicURL + _url,
      method: _method
    };
    Object.assign(config, conf);   
    if (_method === 'GET') {
      config.params = _data;
    } else {
      config.data = _data;
    }
    return config;
  }

  //post
  post(url, data, conf, useUrl) {
    return this.$http(this.getRequestConfig(url, 'POST', data, conf, useUrl));
  }
  get(url, data, conf, useUrl) {
    return this.$http(this.getRequestConfig(url, 'GET', data, conf, useUrl));
  }
  put(url, data, conf, useUrl) {
    return this.$http(this.getRequestConfig(url, 'PUT', data, conf, useUrl));
  }
}
DownloadService.$inject = ['$http', '$httpParamSerializerJQLike', '$document'];