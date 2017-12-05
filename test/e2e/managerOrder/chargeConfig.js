var config = require('.././common/config.js');
module.exports = function() {
  this.getPage = function() {
    browser.setLocation('manageOrder/chargesConfig');
    browser.sleep(config.pageLoaded);    
  }; 
};