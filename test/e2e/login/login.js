var config = require('.././common/config.js');
module.exports = function() {
  var nameInput = element(by.model('login.formData.username'));
  var passInput = element(by.model('login.formData.password'));

  this.getDevLoginPage = function() {
    browser.get(config.testDevUrl + '/#!/login');
  };

  this.get3033LoginPage = function() {
    browser.get(config.test3033Url + '/#!/login');
  };

  this.getQALoginPage = function() {
    browser.get(config.testQaUrl + '/#!/login');
  };

  this.setDevName = function() {
    this.setNameAndPass('test', '123');
  };

  this.setQAName = function() {
    this.setNameAndPass('050220', 'ztg@050220');
  };

  this.setNameAndPass = function(name, pass) {
    nameInput.sendKeys(name);
    passInput.sendKeys(pass);
  };

  this.login = function() {
    element(by.buttonText('登录')).click();
  };
};
