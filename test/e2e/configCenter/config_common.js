var config = require("../common/config");
module.exports=function(){
  var EC = protractor.ExpectedConditions;
  // 获取页面
  this.getPage = function(page) {
    browser.setLocation(page);
    browser.sleep(2000);
  }
  // 页码切换
 this.pageSizeChange = function(css,index){
     $$(css).count().then(function(value){
        if(value!==0 && value>=index){
          let list = $$(css);
          list.get(index).click();
          expect(list.get(index).getText()).toBe(index);
        }
    })
   
  }
  // 设置input
  this.setKey = function(model, text){
    var input = element(by.model(model));
    input.sendKeys(text);
  }
  // 搜索
  this.Search = function(text){
    element(by.buttonText(text)).click();
    browser.sleep(config.littleMani);
  }
  // 获取
  this.items = function(model,item) {
      return element.all(by.repeater(model).column(item));
  };
  // 期望列表
  this.expectItem = function(arr, to, type){
    arr.map(function(item, index) {
      var ex = expect(item.getText());
      if (type !== 1) {
        ex.toBe(to);
      } else {
        ex.toContain(to);
      }
    });
  }

  // 截屏
  this.Screenshot=function(name){
    var fs = require('fs');
    function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);

        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }
    browser.takeScreenshot().then(function (png) {
        writeScreenShot(png, name+".png");
    });
  }
}
