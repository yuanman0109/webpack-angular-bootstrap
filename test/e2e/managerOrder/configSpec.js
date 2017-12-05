var ChargeConfig = require('./chargeConfig.js');
var SearchList = require('.././components/searchList.js');

describe('test managerOrder--chargesConfig(订单管理--服务费配置)', function() {
  var search,theConfig, EC;

  beforeAll(function(){    
    theConfig = new ChargeConfig();
    search = new SearchList();
    EC = protractor.ExpectedConditions;
  });
  it('----search test（搜索测试）', function(){
    browser.wait(EC.urlContains('account/userLists'), 5000).then(function() {
      theConfig.getPage();      
      var selectNum = search.getRandomNum(3);    
      search.selectAuto('ctrl.params.businessId', 'type.dataCode as type.dataName for type in ctrl.businessTypes', selectNum);
      search.setInput('ctrl.params.name', '服务');
      search.btnClick('搜索');

      var name = element.all(by.binding('charge.name')).first().getText();
      expect(name).toContain('服务');

      var businessId = element.all(by.binding('charge.businessId | businessTypeFilter')).first().getText();
      var select = element(by.model('ctrl.params.businessId')).all(by.tagName('option'));
      expect(businessId).toBe(select.get(selectNum).getText());

      search.btnClick('新增服务费类目');

    });
  });

  it('-----add new (新增服务费类目)', function() { 
    browser.wait(EC.urlContains('manageOrder/theCharges'), 3000).then(function() {
      var num = Math.random();
      search.setInput('ctrl.configDetail.name', '自动测试' + num);

      var selectNum = search.getRandomNum(3);
      search.selectAuto('ctrl.configDetail.businessId', 'type.dataCode as type.dataName for type in ctrl.businessTypes', selectNum);

      var selectNum1 = Math.floor(Math.random() * 3);
      var selectNum2 = search.getRandomNum(5);
      search.selectAuto('ctrl.configDetail.remindTimeConfigs['+selectNum1+'].expression', 'time.code as time.expression for time in ctrl.remindTimeLists', selectNum2);

      var selectNum3 = search.getRandomNum(4);
      search.selectAuto('period.validPeriod', 'per.dataCode as per.dataName for per in ctrl.validPeriodListItem', selectNum3);

      search.setInput('period.unitPrice', '33');
      search.setInput('period.originPrice', '66');
      search.setInput('period.freePeriod', '88');
      search.setInput('period.delayPeriod', '99');

      search.btnClick('确认提交');

    });
  });
  it('-----test add new and up/down (测试新增服务费类目结果，上下架)', function() {
      var unitPrice = element.all(by.binding("period.unitPrice")).get(0).getText();
      var originPrice = element.all(by.binding("period.originPrice")).get(0).getText();
      var freePeriod = element.all(by.binding("period.freePeriod")).get(0).getText();
      var delayPeriod = element.all(by.binding("period.delayPeriod")).get(0).getText();
      expect(unitPrice).toContain('33');
      expect(originPrice).toContain('66');
      expect(freePeriod).toContain('88');
      expect(delayPeriod).toContain('99');

      var periodList = element.all(by.repeater('period in charge.periodConfigs')).get(0);
      var periodItem = periodList.all(by.tagName('td')).last();
      // 上下架之前
      var oldText = periodItem.getText();

      periodItem.all(by.tagName('a')).get(0).click();
      browser.sleep(2000);
      $$('.modal-footer button').get(1).click();
      browser.sleep(2000);
      periodItem.all(by.tagName('a')).get(0).click();
      browser.sleep(2000);
      $$('.modal-footer button').get(1).click();

      var newText = periodItem.getText();
      expect(newText).toBe(oldText);

      var chargeItem = element.all(by.repeater('charge in ctrl.chargesLists')).get(0);
      chargeItem.$$('.theTableHead a').click();

      browser.sleep(3000);
      search.btnClick('编辑修改');
      browser.sleep(2000);
  });
  it('----test edit (测试编辑)', function() {

      search.setInput('ctrl.configDetail.name', '修改');

      var selectNum = search.getRandomNum(3);
      search.selectAuto('ctrl.configDetail.businessId', 'type.dataCode as type.dataName for type in ctrl.businessTypes', selectNum);

      var selectNum1 = Math.floor(Math.random() * 3);
      var selectNum2 = search.getRandomNum(5);
      search.selectAuto('ctrl.configDetail.remindTimeConfigs['+selectNum1+'].expression', 'time.code as time.expression for time in ctrl.remindTimeLists', selectNum2);

      search.setInput('ctrl.configDetail.description', '测试修改说明');

      addNewLine();
      addNewLine();

      var periodLast = element.all(by.repeater('period in ctrl.configDetail.periodConfigs')).get(1);
      var lastTd = periodLast.all(by.tagName('td')).last();      
      lastTd.all(by.tagName('a')).first().click();

      search.btnClick('确认提交');
      browser.sleep(2000);
      var nowUrl = browser.getCurrentUrl();
      expect(nowUrl).toContain('manageOrder/chargesConfig');
  });

  function addNewLine() {
    var periodLast = element.all(by.repeater('period in ctrl.configDetail.periodConfigs')).last();
    var tdList = periodLast.all(by.tagName('td'));

    tdList.last().all(by.tagName('a')).last().click();

    var selectNum = search.getRandomNum(4);
    var select = tdList.first().all(by.tagName('select')).first();
    select.click();
    select.all(by.tagName('option')).get(selectNum).click();

    var input = tdList.all(by.tagName('input'));
    var label = tdList.all(by.tagName('label'));
    input.get(0).sendKeys('11');
    input.get(1).sendKeys('22');
    input.get(2).sendKeys('33');
    input.get(3).sendKeys('44');
    label.last().click();
    input.get(6).sendKeys('说明文字');

  }
})