var config = require('../common/config.js');
module.exports = function() {
  // var tabs = $$('.mainContent .nav-tabs li');
  var okBtn = element(by.buttonText('确定'));
  var EC = protractor.ExpectedConditions;
  this.getPage = function() {
    browser.setLocation('configCenter/paymentVerify');
    browser.sleep(config.pageLoaded);
  };

  function activeTabPane(callback) {
    $$('.tab-pane.active tbody tr').then(function(arr) {
      if (arr.length) {
        $('.tab-pane.active tbody tr:first-child a').click();
        browser.sleep(config.manipulate);
        
        browser.wait(EC.visibilityOf(element(by.binding('ctrl.data.status'))), 1000, 'data.status should be visible');
        if (callback) {
          callback();
        }
      }
    });
  }

  function verifyThirdBtnClick() {
    element(by.buttonText('第三方审核')).click();
    verifyThird();
  }

  function verifyMyBtnClick() {
    element(by.buttonText('我方审核')).click();
    verifyMy();
  }

  function verifyThird() {
    doVerify('third');
  }

  function doVerify(status) {
    browser.wait(EC.visibilityOf($('.modal-body')), config.pageLoaded, '弹出审核对话框!');
    element.all(by.css('.radio-inline .iconfont')).get(1).click();
    if (status === 'third') {
      element(by.model('ctrl.data.storeNo')).sendKeys('ES6499');
      element(by.model('ctrl.data.terminalNo')).sendKeys('TKT17950');
    }
    element(by.model('ctrl.data.auditRemark')).sendKeys('第三方审核通过!');
    browser.wait(EC.elementToBeClickable(okBtn), config.pageLoaded);
    okBtn.click();
    browser.sleep(config.pageLoaded);
  }

  function verifyMy() {
    doVerify('my');
  }

  function selectTab(index) {
    $$('.mainContent .uib-tab').get(index).element(by.tagName('a')).click();
  };

  this.selectTabMy = function() {
    selectTab(0);
    activeTabPane(verifyMyBtnClick);
  };
  this.selectTabThird = function() {
    selectTab(1);
    activeTabPane(verifyThirdBtnClick);
  };
  this.selectTabAll = function() {
    selectTab(2);
    activeTabPane();
  };
};
