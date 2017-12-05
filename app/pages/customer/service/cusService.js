export default class CusService{
    constructor($http,basicConfig){
        this.$http=$http;
        this.basicConfig=basicConfig;
    }
    //获取客户列表
    getCustomerlists(data){
        return this.$http(this.basicConfig.getRequestConfig('/customer/stores/_tree','GET',data))
    }
    //删除门店
    deleteCustomer(id){
        return this.$http(this.basicConfig.getRequestConfig('/customer/stores/'+id,'DELETE'))
    }
    //获取地区列表
    getAreaList(areaNo){
        return this.$http(this.basicConfig.getRequestConfig('/cfg/areas/'+areaNo+'/subs','GET'))
    }
    //获取菜系列表
    getDisheslist(){
        return this.$http(this.basicConfig.getRequestConfig('/cfg/dictionaries/DISH_STYLE','GET'))
    }
    //获取客户类型
    getTypelist(){
        return this.$http(this.basicConfig.getRequestConfig('/cfg/dictionaries/CUSTOMER_TYPE','GET'))
    }
    //获取客户网络状态
    getCusNetStatus(){
        return this.$http(this.basicConfig.getRequestConfig('/cfg/dictionaries/DEVICE_STATUS','GET'))
    }
    //获取门店详情
    getCustomerDetail(id){
        return this.$http(this.basicConfig.getRequestConfig('/customer/stores/'+id,'GET'))
    }
    //保存基本信息
    saveStore(data){
        return this.$http(this.basicConfig.getRequestConfig('/customer/stores','POST',data))
    }
    //修改基本信息
    modifyStore(data){
        return this.$http(this.basicConfig.getRequestConfig('/customer/stores','PUT',data))
    }
    //保存餐厅信息
    saveStoreInfo(data){
        return this.$http(this.basicConfig.getRequestConfig('/customer/stores/'+data.storeId+'/restaurants','POST',data))
    }
    //修改餐厅信息
    modifyStoreInfo(data){
        return this.$http(this.basicConfig.getRequestConfig('/customer/stores/'+data.storeId+'/restaurants','PUT',data))
    }
    //获取宽带运营商
    getbroadbandLists(){
        return this.$http(this.basicConfig.getRequestConfig('/cfg/dictionaries/BROADBRAND_ISP','GET'))
    }
    //获取品牌列表
    getbrandLists(){
        return this.$http(this.basicConfig.getRequestConfig('/customer/brands','GET'))
    }
    //获取区域负责人
    getRegionDirector(data){
        return this.$http(this.basicConfig.getRequestConfig('/user/regionDirector','GET',data))
    }
    //获取区域城市code
    getaddressCode(code,data){
        return this.$http(this.basicConfig.getRequestConfig('/cfg/areas/'+code+'/_single','GET',data))
    }
}
CusService.$inject=['$http','basicConfig'];