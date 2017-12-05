'use strict';
export default class orderService {
  constructor(PublicServer) {
    this.PublicServer = PublicServer;
    console.log('...order service init...');
  }

  // 一键转派
  getRedeploy(data, _sucessMsg) {
    return this.PublicServer.put('/workorders/forward', data, _sucessMsg);
  }

  //模糊搜索
  getUserSearch(data) {
    return this.PublicServer.get('/sys/users/_search', data);
  }

  // 工单统计导出
  getOrderCount(data, callback) {
    return this.PublicServer.get('/workorders/download?' + data);
  }

  //获取登录用户信息
  getUserInfo() {
    return this.PublicServer.get('/sys/users/auth_user');
  }

  // 工单池列表
  getOrderPoolList(data, _successMsg) {
    return this.PublicServer.get('/workorders/_pc', data, _successMsg);
  }

  // 任务类型
  getTaskType() {
    return this.PublicServer.get('/cfg/dictionaries/WORKORDER_TASKTYPE');
  }

  // 业务类型
  getBusinessType() {
    return this.PublicServer.get('/customer/businesses');
  }
  
  // 我的工单列表
  getMyOrder(data, _successMsg) {
    return this.PublicServer.get('/workorders/_self/_pc', data, _successMsg);
  }

  // 新建工单
  getNewOrder(data, _successMsg) {
    return this.PublicServer.post('/workorders', data, _successMsg);
  }

  // 工单池详情
  getOrderDetail(id) {
    return this.PublicServer.get('/workorders/' + id + '/detail');
  }

  // 工单完成
  getOrderFinish(data, _successMsg) {
    return this.PublicServer.put('/workorders/resolve', data, _successMsg);
  }

  // 释放至工单池
  getRelease(id, _successMsg) {
    return this.PublicServer.delete('/workorders/' + id + '/release', null, _successMsg);
  }

  // 领取工单
  getWorkOrder(id, _successMsg) {
    return this.PublicServer.put('/workorders/' + id + '/receive', null, _successMsg);
  }

  // 工单历史
  getOrderLog(data) {
    return this.PublicServer.get('/workorder_historys', data);
  }

  // 获取客户名称
  getStoreId(name) {
    return this.PublicServer.get('/customer/stores', {
      'searchStr': name
    });
  }

  // 获取业务类型
  getBusinesses() {
    return this.PublicServer.get('/customer/businesses');
  }
}
orderService.$inject = ['PublicServer'];