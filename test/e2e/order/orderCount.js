var datePicker = require('.././components/datePicker.js');
var config = require('.././common/config.js');
module.exports = function() {
  var exportBtn = element(by.buttonText('导出'));

  function setDate(index, modelName, dateofthemonth) {
    var parentnode = $$('.input-group-btn').get(index);
    datePicker.ptorangulardateTimePicker(parentnode, dateofthemonth);
  }

  function exportBtnEnabled() {
    return exportBtn.isEnabled();
  }

  this.setStarTime = function() {
    setDate(0, 'ctrl.startTime', '12');
  };
  this.setEndTime = function() {
    setDate(1, 'ctrl.endTime', '17');
  };
  this.getPage = function() {
    browser.setLocation('order/orderCount');
    browser.sleep(config.pageLoaded);
  };
  this.export = function() {
    browser.wait(exportBtnEnabled, config.pageLoaded, 'exportBtn should enabled within 2 seconds');
    exportBtn.click();
  };
};
