var VerifyPage = require('./verify.js');
var page = new VerifyPage();
describe('nav to payment/verify do something', function() {
  //var page;
  // beforeAll(function() {
  //   page = new VerifyPage();
  // });
  beforeEach(function() {
    page.getPage();
  });
  it('select all tab and do something', function() {
    page.selectTabAll();
  });
  it('select my tab and do something', function() {
    page.selectTabMy();
  });
  it('select third tab and do something', function() {
    page.selectTabThird();
  });
});
