var ChargeOrder = require('./chargeOrder.js');
var SearchList = require('.././components/searchList.js');

describe('test managerOrder--chargesOrder(订单管理--服务费订单)', function() {
  var search,theConfig, EC;

  beforeAll(function(){    
    chargeOrder = new ChargeOrder();
    search = new SearchList();
    EC = protractor.ExpectedConditions;
  });
  it('----search (搜索测试)', function() {
    // 单独测试用
    // browser.wait(EC.urlContains('account/userLists'), 5000).then(function() {

      chargeOrder.getPage();

      var selectNum1 = search.getRandomNum(3);    
      search.selectAuto('ctrl.params.status', 'statu.code as statu.name for statu in ctrl.statusLists', selectNum1);

      var selectNum2 = chargeOrder.getConnectNum(selectNum1, 2);    
      search.selectAuto('ctrl.params.payType', 'type.code as type.name for type in ctrl.payTypeCtrl', selectNum2);

      var selectNum3 = search.getRandomNum(2);    
      search.selectAuto('ctrl.params.isChangePrice', 'change.code as change.name for change in ctrl.changePriceLists', selectNum3);

      search.setInput('ctrl.params.brandName', '品牌');
      search.setInput('ctrl.params.storeName', '上海');
      search.btnClick('搜索');

      // var result = element.all(by.binding('brand.brandName')).get(0).getText();
      // expect(result).toContain('品牌');

      // browser.sleep(5000);
      // browser.pause();

    // });
  });



});