export default class CompService{
    constructor($http,basicConfig){
        this.$http=$http;
        this.basicConfig=basicConfig;
    };
    //保存企业
    saveComp(data){
        return this.$http(this.basicConfig.getRequestConfig('/customer/companies','POST',data))
    }
    //修改企业
    modifyComp(data){
        return this.$http(this.basicConfig.getRequestConfig('/customer/companies','PUT',data))
    }
    //修改品牌
    modifyBrand(data){
        return this.$http(this.basicConfig.getRequestConfig('/customer/companies/'+data.id+'/brands','PUT',data))
    }
    //保存签约
    saveContract(data){
        return this.$http(this.basicConfig.getRequestConfig('/customer/companies/'+data.id+'/contracts','PUT',data))
    }
    //获取企业规模
    getDictionory(){
        return this.$http(this.basicConfig.getRequestConfig('/cfg/dictionaries/COMPANY_SCALE','GET'))
    }
    //获取客户类型
    getCustomerType(){
        return this.$http(this.basicConfig.getRequestConfig('/cfg/dictionaries/CUSTOMER_TYPE','GET'))
    }
    //获取签约业务
    getBusiness(){
        return this.$http(this.basicConfig.getRequestConfig('/cfg/dictionaries/BUSINESS_TYPE','GET'))
    }
    //获取银行
    getBank(){
        return this.$http(this.basicConfig.getRequestConfig('/cfg/banks','GET'))
    }
    //获取支行
    getSubBank(parentCode,data){
        return this.$http(this.basicConfig.getRequestConfig('/cfg/banks/'+parentCode+'/subs','GET',data))
    }
    //获取企业详情
    getCompDetail(id){
        return this.$http(this.basicConfig.getRequestConfig('/customer/companies/'+id,'GET'))
    }
    //获取客户来源
    getCustomerSource(){
        return this.$http(this.basicConfig.getRequestConfig('/cfg/dictionaries/CUSTOMER_SOURCE/','GET'))
    }
}
CompService.$inject=['$http','basicConfig'];