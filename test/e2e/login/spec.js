var LoginPage = require('./login.js');
beforeAll(function() {
  browser.manage().window().setSize(1366, 1366);
});
describe('login', function() {
  var EC;
  beforeEach(function() {
    EC = protractor.ExpectedConditions;
  });
  it('login dev should success', function() {
    var page = new LoginPage();
    page.getDevLoginPage();
    browser.sleep(1000);
    page.setDevName();
    page.login();  
    browser.ignoreSynchronization = true;
    var toast = $('.toast-message');
    browser.wait(EC.presenceOf(toast), 1000).then(function() {
      expect(toast.getText()).toEqual('登录成功!');
      browser.ignoreSynchronization = false;
    });      
  });
  // it('login 3033 should success', function() {
  //   var page = new LoginPage();
  //   page.get3033LoginPage();
  //   page.setQAName();
  //   page.login();  
  // });
  // it('login qa should success', function() {
  //   var page = new LoginPage();
  //   page.getQALoginPage();
  //   page.setQAName();
  //   page.login();    
  // });
});
