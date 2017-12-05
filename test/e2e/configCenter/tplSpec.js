var tplPage = require('./tpl');
var configcenter_common = require("./config_common");
describe('protractor tpl', function() {

  var Page;
  var CommonPage;
  beforeAll(function() {
    Page = new tplPage();
    CommonPage = new configcenter_common();
  });
  beforeEach(function() {
    CommonPage.getPage('/configCenter/template');
  });
//页码切换
  it('pageChange', function() {
    CommonPage.pageSizeChange('.pagination li a','2');
  });
  
//搜索
  it('search text btn', function() {
     var businessTypeText = Page.setOption('ctrl.params.businessId','business.dataCode as business.dataName for business in ctrl.businessIds',1);
     var tableTypeText = Page.setOption('ctrl.params.type','tableType.type as tableType.name for tableType in ctrl.tableType',1);
     CommonPage.setKey('ctrl.params.name','11');
     CommonPage.Search('搜索');
     
      var name = CommonPage.items('item in ctrl.templateList  track by $index','item.name');
      var businessType = CommonPage.items('item in ctrl.templateList','item.businessId|businessTypeFilter');
      CommonPage.expectItem(name, '11', 1);
      CommonPage.expectItem(businessType, businessTypeText);
  });
});
