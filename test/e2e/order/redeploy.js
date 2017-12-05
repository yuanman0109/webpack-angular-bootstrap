var UiSelect = require('.././components/UiSelect.js');
var config = require('.././common/config.js');
module.exports = function() {
  var oldReceiverNameInput = new UiSelect(element(by.model('ctrl.getParame.oldReceiverName')));
  var newReceiverNameInput = new UiSelect(element(by.model('ctrl.getParame.newReceiverName')));
  var forwardDesc = element(by.model('ctrl.getParame.forwardDesc'));
  this.getPage = function() {
    browser.setLocation('order/redeploy');
    browser.sleep(config.pageLoaded);
  };
  this.fillOldName = function(index) {
    oldReceiverNameInput.sendKeys();
    oldReceiverNameInput.pickChoice(index);
  };
  this.fillNewName = function(index) {
    newReceiverNameInput.sendKeys();
    newReceiverNameInput.pickChoice(index);
  };
  this.fillForwardDesc = function(val) {
    forwardDesc.sendKeys(val);
  };
  this.submit = function() {
    element(by.buttonText('确认提交')).click();
  };
};
