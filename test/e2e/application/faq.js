var config = require('.././common/config.js');
module.exports = function() {
  this.getPage = function() {
    browser.setLocation('application/faqList');
    browser.sleep(config.pageLoaded);    
  }; 
};