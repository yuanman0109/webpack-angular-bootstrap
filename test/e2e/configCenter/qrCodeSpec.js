var QrCodePage = require('./qrCode');
var configcenter_common = require("./config_common");
describe('protractor qrCode', function() {

  var Page;
  var CommonPage;

  beforeAll(function() {
    Page = new QrCodePage();
    CommonPage = new configcenter_common();
  });
  beforeEach(function() {
    CommonPage.getPage('/configCenter/qrcode');
  });
  //页码切换
  it('pageChange', function() {
    CommonPage.pageSizeChange('.pagination li a','2');
  });
  
//搜索
  it('search text btn', function() {
     CommonPage.setKey('ctrl.param.store','老宋私房菜');
     CommonPage.Search('搜索');
     var name = CommonPage.items('item in ctrl.qrcodeList[$index]','item.storeName');
     CommonPage.expectItem(name, '老宋私房菜', 1);
  });
// 未下载
  it('Selected tab undownload', function() {
   Page.tabSelected(0);
   element.all(by.css('.tab-pane.active li')).then(function(arr) {
    if(arr.length > 0){
       Page.singleDownload();
       // 下载二维码
       // Page.downloadEvent('.btns-wrap .btn',0);
      }else{
        // 如果没有二维码 生成100条二维码
        Page.generatorQrcode('批量生成二维码','ctrl.count',110);
      }
    });
   element.all(by.css('.tab-pane.active li')).then(function(arr) {
    if(arr.length > 0){
      // 下载二维码地址
          Page.downloadEvent('批量下载二维码内容',2);
      }else{
        // 如果没有二维码 生成100条二维码
        Page.generatorQrcode(110);
      }
    });

  });
// 已下载    
  it('Selected tab download', function() {
   Page.tabSelected(1);
   Page.downloadEvent('批量下载',0);
   Page.downloadEvent('批量下载二维码内容',2);
   Page.downloadEvent('全部下载二维码内容',4);
  });
// 已使用
   it('Selected used download btn', function() {
     Page.tabSelected(2);
     Page.downloadEvent('下载已使用二维码',3);
  });

});