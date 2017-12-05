var Faq = require('./faq.js');
var SearchList = require('.././components/searchList.js');

describe('test application--faq(运营中心--FAQ管理)', function() {
  var search,faq, EC;

  beforeAll(function(){    
    faq = new Faq();
    search = new SearchList();
    EC = protractor.ExpectedConditions;
  });
  it('----search test（搜索测试）', function(){
    browser.wait(EC.urlContains('account/userLists'), 5000).then(function() {

      faq.getPage();      
      // 设置
      search.selectFix('ctrl.getParame.status', 0);
      search.selectAuto('ctrl.getParame.ownerProduct', 'item.dataCode as item.dataName for item in ctrl.productList', 1);
      search.selectAuto('ctrl.getParame.questionType', 'item.id as item.questionType for item in ctrl.faqTypeList', 1);
      search.setInput('ctrl.getParame.title', '测试');
      search.btnClick('搜索');

      browser.pause();
      // 获取
      var productName = element(by.repeater('item in ctrl.faqList').row(0).column('item.ownerProductName')).getText();
      var type = element(by.repeater('item in ctrl.faqList').row(0).column('item.questionType')).getText();
      var thetitle = element(by.repeater('item in ctrl.faqList').row(0).column('item.title')).getText();
      // 期望
      expect(productName).toContain('BSS-APP');
      expect(type).toContain('app');
      expect(thetitle).toContain('测试');
      // 跳转
      search.btnClick('新增FAQ');

    });
  });

  it('-----add faq (新增FAQ)', function() { 
    browser.wait(EC.urlContains('application/theFaq'), 3000).then(function() {
      browser.sleep(5000);

      // 设置
      var num = Math.random();
      search.setInput('ctrl.newFaq.title', '自动测试标题' + num);
        // 待完善
      browser.switchTo().frame(element(by.css('#cke_editor1 iframe')).click().sendKeys('自动测试内容'));

      search.selectAuto('ctrl.newFaq.ownerProduct', 'item.dataCode as item.dataName for item in ctrl.productList', 1);
      search.selectAuto('ctrl.newFaq.questionType', 'item.id as item.questionType for item in ctrl.faqTypeList', 1);

      // 获取
      var selectProduct = element(by.model('ctrl.newFaq.ownerProduct')).all(by.tagName('option')).get(1).getText();
      var selectType = element(by.model('ctrl.newFaq.questionType')).all(by.tagName('option')).get(1).getText();

      // 期望
      expect(selectProduct).toBe('BSS-APP');
      expect(selectType).toContain('app');
      
      // 跳转
      element(by.cssContainingText('.btn', '问题类型不够？请点击添加问题类型')).click();

      // browser.pause();

    });
  });
  it('-----faqType (FAQ问题类型)', function() { 
    browser.wait(EC.urlContains('application/faqType'), 3000).then(function() {
      browser.sleep(5000);

      // 设置
      search.selectAuto('ctrl.getParame.product', 'item.dataCode as item.dataName for item in ctrl.productList', 1);
      search.setInput('ctrl.getParame.questionType', 'app');
      search.btnClick('搜索');
      // 获取
      var type = element(by.repeater('item in ctrl.faqTypeList').row(0).column('item.questionType')).getText();
      var productName = element(by.repeater('item in ctrl.faqTypeList').row(0).column('item.product')).getText();
      // 期望
      expect(productName).toContain('BSS-APP');
      expect(type).toContain('app');

      // browser.pause();

    });
  });
  it('-----faqType-add,edit,delete (FAQ问题类型：新增，编辑，删除，)', function() { 
    browser.wait(EC.urlContains('application/faqType'), 3000).then(function() {

      // 弹窗
      search.btnClick('新增问题类型');
      browser.sleep(5000);
      // 设置
      var num = Math.random();
      search.setInput('$ctrl.questionType', 'app自动测试' + num);
      search.selectAuto('$ctrl.product', 'item.dataCode as item.dataName for item in $ctrl.productList', 1);
      browser.sleep(2000);
      $$('.modal-footer button').get(1).click();



      // // 设置
      // search.selectAuto('ctrl.getParame.product', 'item.dataCode as item.dataName for item in ctrl.productList', 1);
      // search.setInput('ctrl.getParame.questionType', 'app');
      // search.btnClick('搜索');
      // // 获取
      // var type = element(by.repeater('item in ctrl.faqTypeList').row(0).column('item.questionType')).getText();
      // var productName = element(by.repeater('item in ctrl.faqTypeList').row(0).column('item.product')).getText();
      // // 期望
      // expect(productName).toContain('BSS-APP');
      // expect(type).toContain('app');

      browser.pause();

    });
  });
})