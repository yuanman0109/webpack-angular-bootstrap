var config = require('.././common/config.js');
module.exports = function() {
  this.getPage = function() {
    browser.setLocation('account/userHistory');
    browser.sleep(config.pageLoaded);
  };
  
  this.sel = function(mod, opt, i) {
    var sel = element(by.model(mod));
    sel.click();
    var opts = element.all(by.options(opt));
    opts.get(i).click();
  };
  this.setInput = function(mod, value) {
    var dom = element(by.model(mod));
    dom.sendKeys(value);
  };
  this.btnClick = function(btnText) {
    var dom = element(by.buttonText(btnText));
    dom.click();
  };
  this.searchData = function() {
    var list = element.all(by.repeater('user in userli.userLists'));
    return list;
  };
  this.items = function(item) {
    var itemArr = element.all(by.repeater('user in userli.userLists').column(item));
    return itemArr;
  };
};