var RedeployPage = require('./redeploy.js');
describe('nav to order/redeploy and do something', function() {
  var EC;
  beforeEach(function() {
    EC = protractor.ExpectedConditions;
  });
  it('change old to new name', function() {
    var page = new RedeployPage();
    page.getPage();
    page.fillOldName(0);
    page.fillNewName(1);
    page.fillForwardDesc('some for test');
    page.submit();
    //browser.wait(EC.presenceOf($('.modal-dialog')), 2000);
    expect(EC.presenceOf($('.modal-dialog'))).toBeTruthy();
  });
});
