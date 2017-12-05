export default class RoleService {
  constructor(PublicServer) {
    this.PublicServer = PublicServer;
  }
  //获取角色分页列表
  getRolePagelists(data) {
    return this.PublicServer.get('/sys/roles/_page', data);
  }
  //获得所有权限
  getAllRoles() {
    return this.PublicServer.get('/sys/roles');
  }
  //添加角色
  saveRole(data) {
    return this.PublicServer.post('/sys/roles', data);
  }
  //更新角色
  modifyRole(data) {
    return this.PublicServer.put('/sys/roles', data);
  }
  //删除角色
  deleteRole(id, _successMsg) {
    return this.PublicServer.delete('/sys/roles/' + id, null, _successMsg);
  }
  //获取当前角色信息
  getRoleInfo(id) {
    return this.PublicServer.get('/sys/roles/' + id);
  }
}
RoleService.$inject = ['PublicServer'];