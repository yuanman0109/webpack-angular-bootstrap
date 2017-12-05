var configcenter_common = require("./config_common");
var fastFoodPage = require("./fastFood");
describe('protractor restaurant', function() {

  var CommonPage;
  var FastFoodPage;

  beforeAll(function() {
    CommonPage = new configcenter_common();
    FastFoodPage = new fastFoodPage();
  });
  beforeEach(function() {
    CommonPage.getPage('/configCenter/fastFood');
  });
//页码切换
  it('pageChange', function() {
    CommonPage.pageSizeChange('.pagination li a','2');
    CommonPage.Screenshot('fastFood-page');
  });

//搜索
  it('search text btn', function() {
     CommonPage.setKey('ctrl.params.name','面');
     CommonPage.Search('搜索');
    var storeName = FastFoodPage.items('.tab-pane.active','item in ctrl.list','item.storeName');
    CommonPage.expectItem(storeName, '面', 1);
    CommonPage.Screenshot('fastFood-search');
    CommonPage.pageSizeChange('.pagination li a','2');
  });
// tab切换
 it('tab', function() {
     FastFoodPage.tabSelected(1);
    CommonPage.setKey('ctrl.params.name','面');
    CommonPage.Search('搜索');
    var storeName = FastFoodPage.items('.tab-pane.active','item in ctrl.list','item.storeName');
    CommonPage.expectItem(storeName, '面', 1);
    CommonPage.pageSizeChange('.pagination li a','2');
    CommonPage.Screenshot('fastFood-search');
  });
// 导出
// tab切换
 it('export', function() {
    FastFoodPage.export('.btns-wrap .btn',1);
  });
});
