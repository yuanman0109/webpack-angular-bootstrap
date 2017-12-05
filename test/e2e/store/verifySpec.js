var VerifyPage = require('./verify.js');
var page = new VerifyPage();
describe('nav to store/verify do something', function() {
  beforeEach(function() {
    page.getPage();
  });
  it('select pending tab and do something', function() {
    page.selectTabPending();
    page.btnClick('审核');
    page.accountClick('生成账号');
    // page.cancelBtn('取消');
    // element.all(by)
  })
});