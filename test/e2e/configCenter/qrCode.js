var config = require("../common/config");

module.exports = function() {
  var EC = protractor.ExpectedConditions;


  /**
   * 选择tab
   * 
   * @param {number} [index=0] 0:未下载; 1:已下载; 2:已使用;
   */
  this.tabSelected = function(index = 0) {
    $$('.nav-tabs li').get(index).element(by.tagName('a')).click();
    browser.sleep(config.littleMani);
  }

  /**
   * 生成二维码
   * 
   * @param {number} [number=50] 生成二维码的数量
   */
  this.generatorQrcode = function(text,model,number = 50) {
    btnClick(text);
    var input = element(by.model(model));
    input.sendKeys(number);
    $$('.modal-footer .btn').get(0).click();
    browser.sleep(config.littleMani);
  }

  
  // 单个下载
  this.singleDownload = function() {
    $$('.tab-pane.active li').get(0).element(by.tagName('button')).click();
    dialog_downloading();
  }


  /**
   * 下载
   * @param {number} [index=0]  0:批量下载二维码; 2:批量下载二维码内容; 3:全部下载二维码内容;
   * 
   */
  this.downloadEvent = function(text,index=0) {
    if(index==3 || index == 4){
     btnClick(text);
     browser.sleep(10000);
      return;
    }
    btnClick(text);
    //全选
    allChecked();
    // 下载
    btnClick('下载',true);
    if (index == 0) {
      dialog_downloading();
    }
    btnClick('取消批量');
    browser.sleep(config.littleMani);
  }

  // 全选
  function allChecked() {
    $$('.checkbox-inline').last().click();
    browser.sleep(config.littleMani);
  }

  // 按钮点击
  function btnClick(text, has){
    if(has){
      element(by.partialButtonText(text)).click();
    }else{
      element(by.buttonText(text)).click();
      
    }
}

  // 弹窗确认下载
  function dialog_downloading() {
    btnClick('下载');
    browser.sleep(config.littleMani);
  }






}