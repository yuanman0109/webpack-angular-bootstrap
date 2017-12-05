var config = require("../common/config");
module.exports=function(){
  var EC = protractor.ExpectedConditions;
// 获取items
 this.items = function(css,model,name){
  return element.all(by.css(css)).all(by.repeater(model).column(name));
 }
   /**
   * 选择tab
   * 
   * @param {number} [index=0] 0:未下载; 1:已下载; 2:已使用;
   */
  this.tabSelected = function(index = 0) {
    $$('.nav-tabs li').get(index).element(by.tagName('a')).click();
    browser.sleep(config.littleMani);
  }
  // export
  this.export = function(ele,index) {
    $$(ele).get(index).click();
    browser.sleep(config.littleMani);
  }
}
