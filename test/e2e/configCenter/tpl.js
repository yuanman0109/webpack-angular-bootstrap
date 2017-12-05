var config = require("../common/config");

module.exports = function() {
  var EC = protractor.ExpectedConditions;
  // 选择选项
  this.setOption = function(mod, obj, index, attr){
    element(by.model(mod)).click();
    var allOptions = element.all(by.options(obj));
    allOptions.get(index).click();
    if(attr){
      return allOptions.get(index).getAttribute(attr).getText();
    }else{
      return allOptions.get(index).getText()
    }
  }
}