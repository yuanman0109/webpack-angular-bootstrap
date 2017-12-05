var config = require('.././common/config.js');
module.exports = function() {
  var okBtn = element(by.buttonText('确定'));
  var pendBtn = element(by.buttonText('审核'));

  // var EC = protractor.ExpectedConditions; //用于判断,检查给定内容是否在期望元素，如果没有找到返回false
  this.getPage = function() {
    browser.setLocation('store/verify'); //跳转页面
    browser.sleep(config.pageLoaded);
  };

  // 点击审核显示审核弹窗
  this.btnClick = function(btnText) {
    $$('.content-box .verify-btn .btn-primary').click();
    browser.sleep(config.pageLoaded);
  };

  function activeTabPane(callback) {
    // 调用$$可被链接到父级的列表
    $$('.tab-pane.active tbody tr').then(function(arr) {
      if (arr.length) {
        $('.tab-pane.active tbody tr:first-child a').click();
        browser.sleep(config.manipulate);
        // wait等待绑定的数据是否可见
        // browser.wait(EC.visibilityOf(element(by.binding('ctrl.data.status'))), 1000, 'data.status should be visible');
        // if (callback) {
        //   callback();
        // }
      }
    });
  }

  function verifyPendBtnClick() {
    element(by.buttonText('待审核')).click();
    verifyPend();
  }

  // 审核弹窗
  function doVerify() {
    // browser.wait(EC.visibilityOf($('.modal-body')), config.pageLoaded, '弹出审核对话框');
    // element.all(by.css('.content-box .verify-btn .btn-primary')).click();
    // if (ctrl.account === null) {
    //   element(by.buttonText('生成账号')).click();
    // }
    // element(by.model('ctrl.data.auditRemark')).sendKeys('审核通过!');
    // browser.wait(EC.elementToBeClickable(pendBtn), config.pageLoaded);
    // okBtn.click();
    // element.all(by.css('.modal-body .form-group .btn-gray')).click();
    // if ($$(ctrl.comTotal == 0)) {
    //   element.all(by.css('.modal-body .form-group .btn-gray')).click();
    // }
    element(by.model('ctrl.data.remark')).sendKeys('审核通过');
    // browser.wait(EC.elementToBeClickable(okBtn),config.pageLoaded);
    // okBtn.click();
    $('.modal-footer .btn-gray').click();
    browser.sleep(config.pageLoaded);
  }

  // function verifyPend() {
  //   doVerify('pending');
  // }

  function selectTab(index) {
    $$('.mainContent .uib-tab').get(index).element(by.tagName('a')).click();
  }

  this.selectTabPending = function() {
    selectTab(0);
    activeTabPane(verifyPendBtnClick);
  };

  this.accountClick = function() {
    doVerify();
  }
};