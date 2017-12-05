var config = require('.././common/config.js');
var datePicker = require('.././components/datePicker.js');
module.exports = function() {
  this.getPage = function() {
    browser.setLocation('advert/advertList');
    browser.sleep(config.pageLoaded);
  };
  this.setData = function(index, modelName, dateofthemonth) {
    var parentnode = $$('.input-group-btn').get(index);
    datePicker.ptorangulardateTimePicker(parentnode, dateofthemonth); 
  };
  this.items = function(item) {
    var itemArr = element.all(by.repeater('ad in adv.advertLists').column(item));
    return itemArr;
  };
};