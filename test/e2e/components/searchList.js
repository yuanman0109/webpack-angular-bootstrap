module.exports = function searchList() {
  /*
    m:ng-module,o:ng-options,i:索引,v:value,n:下拉选项的个数-1
  */
  // 下拉选项是动态的
  this.selectAuto = function(m, o, i) {
    var selectBox = element(by.model(m));
    selectBox.click();
    var options = element.all(by.options(o));
    options.get(i).click();
  };
  // 下拉选项是固定的
  this.selectFix = function(m, i) {
    var selectBox = element(by.model(m));
    selectBox.click();
    var options = selectBox.all(by.tagName('option'));
    options.get(i).click();
  };
  // 获取下拉随机数
  this.getRandomNum = function(n) {
    var num = Math.floor(Math.random() * n + 1);
    return num;
  };
  // 输入input框
  this.setInput = function(m, v) {
    var inputBox = element(by.model(m));
    inputBox.sendKeys(v);
  };
  // 搜索按钮点击
  this.btnClick = function(btnText) {
    var dom = element(by.buttonText(btnText));
    dom.click();
  };
}