export default class UserService {
  constructor(PublicServer) {
    this.PublicServer = PublicServer;
  }
  //获取账户列表
  getUserlists(parm) {
    return this.PublicServer.get('/sys/users/_page', parm);
  }
  //获取角色下拉列表
  getRoleDownlists() {
    return this.PublicServer.get('/sys/roles');
  }
  //获取状态列表
  getStatus() {
    return this.PublicServer.get('/cfg/dictionaries/USER_STATUS');
  }
  //启用禁用账户
  EnableDisable(url) {
    return this.PublicServer.put(url, 'PUT');
  }
  //获取所有权限
  getPowerList() {
    return this.PublicServer.get('/sys/permissions/_tree');
  }
  //获取业务范围 获取区域树
  getBusinessScope() {
    return this.PublicServer.get('/cfg/areas/_tree');
  }
  //获取部门列表
  getDeptlists() {
    return this.PublicServer.get('/sys/departments');
  }
  //获取当前角色权限
  getRolepowers(id) {
    return this.PublicServer.get('/sys/permissions/' + id + '/_tree');
  }
  //根据角色代码获取权限代码列表  根据角色ID获取权限CODE列表
  getPowers(data) {
    return this.PublicServer.get('/sys/roles/permission', data);
  }
  //获取用户详情
  getUserDetail(id) {
    return this.PublicServer.get('/sys/users/' + id);
  }
  //根据id获取用户信息
  getUserdata(id) {
    return this.PublicServer.get('/sys/users/info/' + id);
  }
  //添加用户
  saveUser(data) {
    return this.PublicServer.post('/sys/users', data);
  }
  //修改用户
  modifyUser(data) {
    return this.PublicServer.put('/sys/users', data);
  }
  //获取操作记录
  getHistory(data) {
    return this.PublicServer.get('/log/operations', data);
  }
  //判断用户是否可以成为该区域接单人
  getIsOrder(data) {
    return this.PublicServer.get('/workorders/transitUser-by-city', data);
  }
}
UserService.$inject = ['PublicServer'];