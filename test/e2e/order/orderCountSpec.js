var OrderPage = require('./orderCount.js');
describe('nav to order/orderCount and do something', function() {
  it('excute export', function() {
    var page = new OrderPage();
    page.getPage();
    page.setStarTime();
    page.setEndTime();
    page.export();
  });
});
