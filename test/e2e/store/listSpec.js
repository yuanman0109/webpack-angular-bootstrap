var List = require('./list.js');

var SearchList = require('.././components/searchList.js');

describe('test store list', function() {
  var page, search, EC;
  beforeAll(function() {
    page = new List();
    EC = protractor.ExpectedConditions;//用于判断，检查给定内容是否在期望元素，如果没有找到返回false
    page.getPage();
  });
  it('select test', function() {
    browser.wait(EC.urlContains('store/list'), 5000).then(function() {
      // 省
      page.sel('$ctrl.province', 'pro.areaCode as pro.areaName for pro in $ctrl.provinceLists',9);
      // 市
      page.sel('$ctrl.city','city.areaCode as city.areaName for city in $ctrl.cityLists',1);
      // 区
      page.sel('$ctrl.county','county.areaCode as county.areaName for county in $ctrl.countyLists',12)
      // 菜系
      page.sel('ctrl.getParame.dishStyleCode','item.dataCode as item.dataName for item in ctrl.greensList',2);
      // 客户类型
      page.sel('ctrl.getParame.customerTypeCode','item.dataCode as item.dataName for item in ctrl.customer',3);
      // 按门店名称搜索
      page.setInput('ctrl.getParame.searchStr', '由由');
      // 搜索按钮
      page.btnClick();
      page.linkClick();
    });   
  });

  it('link test', function() {
    // browser.wait(EC.urlContains('store/manageList'), 5000).then(function() {
      // ageGroup
      page.sel('ctrl.getParame.ageGroup', 'change.code as change.name for change in ctrl.changeAgeLists',1);
      // isKp
      page.sel('ctrl.getParame.isKp','change.code as change.name for change in ctrl.isKp',1);
      // 联系人姓名
      page.setInput('ctrl.getParame.name', '张三');
      // 联系人手机
      page.setInput('ctrl.getParame.mobile', '13811111111');
       // storeName
      page.setInput('ctrl.getParame.storeName', '沙拉');
      // 搜索按钮
      page.btnClick();
      
    // });   
  });
});
// function expectItem(arr, to, type) {
//   arr.count().then(function(count){
//     expect(count).toBeGreaterThan(-1);
//     if(count){
//       arr.map(function(item, index) {
//         var ex = expect(item.getText());
//         if (type !== 1) {
//           ex.toBe(to);
//         } else {
//           ex.toContain(to);
//         }
//       });
//     }
//   });
// }