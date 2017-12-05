var configcenter_common = require("./config_common");
describe('protractor restaurant', function() {

  var CommonPage;

  beforeAll(function() {
    CommonPage = new configcenter_common();
  });
  beforeEach(function() {
    CommonPage.getPage('/configCenter/restaurant');
  });
//页码切换
  it('pageChange', function() {
    CommonPage.pageSizeChange('.pagination li a','5');
    CommonPage.Screenshot('restaurant-page');
  });

//搜索
  it('search text btn', function() {
     CommonPage.setKey('ctrl.params.searchStr','面');
     CommonPage.setKey('ctrl.params.brandName','面');
     CommonPage.Search('搜索');

    var name = CommonPage.items('item in ctrl.list','item.name');
    var type = CommonPage.items('item in ctrl.list','item.brandName');
    CommonPage.expectItem(name, '面', 1);
    CommonPage.expectItem(name, '面', 1);
    CommonPage.Screenshot('restaurant-search');
    CommonPage.pageSizeChange('.pagination li a','2');
  });

});
