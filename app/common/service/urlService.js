//将域名地址替换成comment
export default class replaceUrl {
  constructor($location) {
    this.location = $location;
    this.hostName = window.location.hostname;
  };
  set(url) {   
    var a = this.hostName.split('.');    
    a.splice(0, 1, url); //替换第一个元素   
    var c = a.join('.');    
    return window.location.protocol + '//' + c;    
  }
}

replaceUrl.$inject = ['$location'];