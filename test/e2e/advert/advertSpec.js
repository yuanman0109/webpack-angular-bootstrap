var Advert = require('./advert.js');

var SearchList = require('.././components/searchList.js');

describe('test advert page(广告管理--广告列表)', function() {
  var page, search, EC;
  beforeAll(function() {
    page = new Advert();
    EC = protractor.ExpectedConditions;
  });
  it('---search test(搜索测试)', function() {
    browser.wait(EC.urlContains('account/userLists'), 5000).then(function() {
      search = new SearchList();
      page.getPage();
      //省
      search.selectAuto('$ctrl.province', 'pro.areaCode as pro.areaName for pro in $ctrl.provinceLists',1);
      // 市
      search.selectAuto('$ctrl.city', 'city.areaCode as city.areaName for city in $ctrl.cityLists',1);
      // 范围（所有）
      search.selectFix('adv.getParame.crown', 0);
      // 广告位
      search.selectFix('adv.getParame.adPosition', 4);
      // 广告状态
      search.selectFix('adv.getParame.state', 2);
      // 投放开始时间
      page.setData(0, 'adv.startTime', 12);
      // 投放结束时间
      page.setData(1, 'adv.endTime', 18);
      // 名称
      search.setInput('adv.getParame.adName', '个贷');
      search.btnClick('搜索');

      var adNames = page.items('ad.name');
      var adPosition = page.items('adv.adPositionName[ad.adPosition]');
      var adState = page.items('adv.stateName[ad.state]');
      expectItem(adNames, '个贷', 1);
      expectItem(adPosition, 'wifi成功页二');
      expectItem(adState, '投放中');
    });
  });
});
function expectItem(arr, to, type) {  
  arr.count().then(function(count){
    expect(count).toBeGreaterThan(-1);
    if(count){      
      arr.map(function(item, index) {    
          var ex = expect(item.getText());
          if (type !== 1) {
            ex.toBe(to);
          } else {
            ex.toContain(to);
          }
        });
    }
  });  
}