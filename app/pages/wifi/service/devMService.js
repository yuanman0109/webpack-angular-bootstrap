export default class DevMService{
    constructor($http,basicConfig){
        this.$http=$http;
        this.basicConfig=basicConfig;
    }
    //获取设备列表
    getDevlist(parme){
        return this.$http(this.basicConfig.getRequestConfig('/devices/monitor/_page','GET',parme))
    }
    //设备解绑
    deleteDev(parme,type){
    	switch (type){ 
			case 'single': //单操作
			return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/monitor/'+parme,'DELETE'))
			break;
			case 'multiple'://批量
			return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/monitor/'+parme,'DELETE'))
			break;
			} 
    }
    //设备重启
    rebootDev(data,type){
    	switch (type){ 
			case 'single': //单操作
			return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/monitor/reboot/'+data,'POST'))
			break;
			case 'multiple'://批量
			return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/monitor/reboot/','POST',data))
			break;
			} 
    }
 
    
//  //批量导出
//  exportDevList(parmes,data){
//  	return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/monitor/reboot/'+parmes,'POST',data))
//  }

//  //批量配置
//  configDevList(parmes,data){
//  	return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/monitor/reboot/'+parmes,'POST',data))
//  }


	//单设备添加
	sigleAddDev(data){
		return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/monitor','POST',data))
	}

     //获取设备详情配置信息
    getDevdetails(parme){
        return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/config/'+parme,'GET'))
    }
     //获取连接用户
    getconnectedUser(parme){
        return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/connect_users/_page','GET'))
    }
     //获取设备日志
    getdevLog(parme){
        return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/event_logs/_page','GET'))
    }
    
    //获取设备配置信息
    getdevConfig(parme){
    	return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/info/'+parme,'GET'))
    	
    }
    //获取设备配置下拉选项
    getdevConfigOption(){
    	return this.$http(this.basicConfig.getRequestConfig('/wifi/devices/config_option','GET'))
    }
    
    
}
DevMService.$inject=['$http','basicConfig'];