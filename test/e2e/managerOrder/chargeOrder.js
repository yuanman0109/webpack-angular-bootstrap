var config = require('.././common/config.js');
module.exports = function() {
  this.getPage = function() {
    browser.setLocation('manageOrder/chargesOrder');
    browser.sleep(config.pageLoaded);    
  };
  this.getConnectNum = function(num, n) {
    var newNum ;
    if(num < 2){
      newNum = Math.floor(Math.random() * n + 1);
    } else {
      newNum = 0;
    }
    return newNum;
  } 
};