export default class AdvertService {
  constructor($http, PublicServer) {
    this.$http = $http
    this.PublicServer = PublicServer
  }
  //获取广告列表
  getAdvertlists(data) {
    return this
      .PublicServer
      .get('/ad', data)
  }
  //删除广告
  deleteAdvert(id, _successMsg) {
    return this
      .PublicServer
      .delete('/ad/' + id, _successMsg)
  }
  //修改广告
  modifyAdvert(id, data, _successMsg) {
    return this
      .PublicServer
      .put('/ad/' + id, data, _successMsg)
  }
  //更改广告状态
  changeState(adid, data, _successMsg) {
    return this
      .PublicServer
      .put('/ad/' + adid + '/state', data, _successMsg)
  }
  //添加广告
  addAdvert(data, _successMsg) {
    return this
      .PublicServer
      .post('/ad', data, _successMsg)
  }
  //获取广告详情
  getAdvDetail(id) {
    return this
      .PublicServer
      .get('/ad/' + id)
  }
  //判断广告重合
  getConflict(data) {
    return this
      .PublicServer
      .get('/ad/conflict', data)
  }
}
AdvertService.$inject = ['$http', 'PublicServer']