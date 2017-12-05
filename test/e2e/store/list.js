var config = require('.././common/config.js');
module.exports = function() {
  this.getPage = function() {
    browser.setLocation('store/list');//页面跳转
    browser.sleep(config.pageLoaded);
  };
  // 与页面元素进行交互
  this.sel = function(mod, opts, i) {
    var sel = element(by.model(mod));
    sel.click();
    var opts = element.all(by.options(opts));
    opts.get(i).click();
  };
  this.setInput = function(mod, value) {
    var mod = element(by.model(mod));
    mod.sendKeys(value);
  };
  this.btnClick = function() {
    $('.form-group .btn-white').click();
    browser.sleep(config.pageLoaded);
  };
   this.linkClick = function() {
    selectTab(2)
    // activeTabPane();
  };
  
  function selectTab(index) {
    $$('.pull-left .btn-primary').get(index).click();
     browser.sleep(config.manipulate);
  }

  
  // function activeTabPane(callback) {
  //   // 调用$$可被链接到父级的列表
  //   $$('.pull-left .btn-primary').then(function(arr) {
  //     if (arr.length) {
  //       $('.tab-pane.active tbody tr:first-child a').click();
  //       browser.sleep(config.manipulate);
  //       // wait等待绑定的数据是否可见
  //       // browser.wait(EC.visibilityOf(element(by.binding('ctrl.data.status'))), 1000, 'data.status should be visible');
  //       // if (callback) {
  //       //   callback();
  //       // }
  //     }
  //   });
  // }
  
};