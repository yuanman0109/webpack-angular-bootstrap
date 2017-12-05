//var config = require('.././common/config.js');
var Account = require('./account.list.js');
var page = new Account();
describe('test account list', function() {
  beforeEach(function() {
    page.getPage();
  });
  it('select test', function() {
    page.sel('userli.getParame.roleId', 'role.id as role.name for role in userli.roleLists', 2);
    page.sel('userli.getParame.deptId', 'dept.id as dept.name for dept in userli.deptLists', 52);
    page.sel('userli.getParame.status', 'state.dataCode as state.dataName for state in userli.stateLists', 2);
    page.setInput('userli.getParame.searchWord', '张');
    page.btnClick('搜索');
    //var list = page.searchData();
    var roleNames = page.items('user.roleName');
    var deptNames = page.items('user.deptName');
    var statues = page.items("user.status=='DISABLED'? '禁用' : '启用'");
    var inputs = page.items('user.realName');
    expectItem(roleNames, '系统管理员');
    expectItem(deptNames, '业务支持系统');
    expectItem(statues, '启用');
    expectItem(inputs, '张', 1);
  });
});
function expectItem(arr, to, type) {
  arr.map(function(item, index) {
    var ex = expect(item.getText());
    if (type !== 1) {
      ex.toBe(to);
    } else {
      ex.toContain(to);
    }
  });
}