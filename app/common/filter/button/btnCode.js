// 按钮路由（state）映射为权限（code）
/**
 * @export
 * @returns 返回按钮权限code
 * 注释多星 为无路由映射（不存在此路由，命名方便语义查看），后续可注释掉，优化速度，目前为了方便查看对比
 * 注释多问号???????? 为有路由映射（但还没拿到权限code），后续更新
 */
export default function btnCode() {
  return function(input) {
    switch (input) {
// 账户管理->账户列表
      case 'account.addUser':
        return 'ACCOUNT_0101'; //添加账户     

      case 'account.userDetail':
        return 'ACCOUNT_0102'; //账户详情     

      case 'account.modifyUser':
        return 'ACCOUNT_0103'; //修改账户        

      case 'account.closeUser':
        return 'ACCOUNT_0104'; //*** */禁用账户     

      case 'account.openUser':
        return 'ACCOUNT_0105'; //*** */启用账户  
        
// 账户管理->角色管理
      case 'account.addRole':
        return 'ACCOUNT_0201'; //添加角色

      case 'account.modifyRole':
        return 'ACCOUNT_0202'; //修改角色

      case 'account.deleteRole':
        return 'ACCOUNT_0203'; //*** */删除角色
        
// 广告管理->广告列表--借用父级code
      case 'advert.addAdvert':
        return 'AD_01'; //添加广告

      case 'advert.modifyAdvert':
        return 'AD_01'; //修改广告

      case 'advert.details':
        return 'AD_01'; //*****/详情

// 客户管理->私海
      case 'store.editPrivateSea':
        return 'CRM_0201'; //编辑私海

      case 'store.release':
        return 'CRM_0202'; //*****/释放

      case 'store.submitAudit':
        return 'CRM_0203'; //*****/提审

      case 'store.export':
        return 'CRM_0204'; //*****/导出

// 客户管理->建店审核
      case 'store.verifyDetails':
        return 'CRM_0302'; //审核详情

// 客户管理->客户列表
      case 'store.storeDetail':
        return 'CRM_0401'; //详情

      case 'store.compList':
        return 'CRM_04'; //企业列表 --借用父级客户列表的code

      case 'store.compDetail':
        return 'CRM_0402'; //企业详情

      case 'store.addStore':
        return 'CRM_0403'; //新建门店

      case 'store.modifyStore':
        return 'CRM_0404'; //修改门店

      case 'store.addComp':
        return 'CRM_0405'; //新建企业

      case 'store.modifyComp':
        return 'CRM_0406'; //修改企业

      case 'store.modifyUser':
        return 'CRM_0407'; //*** */修改维护人

      case 'store.manageList':
        return 'CRM_0408'; //联系人管理 

      case 'store.contacts.export':
        return 'CRM_040801'; //*** */导出 
      
      case 'store.list.export':
        return 'CRM_0409'; //*** */门店导出 
      
// 客户管理->一键转店
      case 'store.submit':
        return 'CRM_0501'; //*** */提交
      case 'store.editClue':
        return 'CRM_0601'; //编辑线索
      case 'store.clueExport':
        return 'CRM_0602'; //导出
// 配置中心->支付进件审核
      case 'configCenter.paymentVerifyDetails':
        return 'CONFIG_0101'; //进件详情

      case 'Our.verify':
        return 'CONFIG_0102'; //*** */我方审核

      case 'Third.verify':
        return 'CONFIG_0103'; //*** */第三方审核

      case 'verify.export':
        return 'CONFIG_0104'; //*** */进件导出
        
// 配置中心-> 二维码
      case 'generate.qrcode':
        return 'CONFIG_0201'; //*** */批量生成二维码

      case 'download.qrcode':
        return 'CONFIG_0202'; //*** */批量下载二维码

      case 'download.qrcodeUrl':
        return 'CONFIG_0203'; //*** */批量下载二维码内容

      case 'downloadALL.qrcodeUrl':
        return 'CONFIG_0204'; //*** */下载所有二维码内容
        
      case 'download.used':
        return 'CONFIG_0205'; //*** */下载已使用二维码

// 配置中心-> 模板管理
      case 'configCenter.templateAdd':
        return 'CONFIG_0301'; //新增模板

      case 'download.template':
        return 'CONFIG_0302'; //*** */下载模板

      case 'configCenter.templateUpdate':
        return 'CONFIG_0303'; //编辑模板

// 配置中心-> 餐厅列表
      case 'restaurant.account':
        return 'CONFIG_0501'; //*** */查看云餐厅账号

// 配置中心-> 支付配置
      case 'restaurant.repwd':
        return 'CONFIG_0502'; //*** */重置密码

      case 'configCenter.paymentConfigList':
        return 'CONFIG_0503'; //支付配置

      case 'configCenter.paymentConfigDetail':
        return 'CONFIG_050301'; //支付配置详情

      case 'configCenter.addPaymentConfig':
        return 'CONFIG_050302'; //*** */新增支付配置
        
      case 'configCenter.channelSwitch':
        return 'CONFIG_050303'; //*** */切换通道

      case 'configCenter.disablePaymentConfig':
        return 'CONFIG_050304'; //*** */停用支付配置

      case 'configCenter.editPaymentConfig':
        return 'CONFIG_050305'; //*** */编辑支付配置

// 配置中心-> 餐台配置
      case 'configCenter.diningTable':
        return 'CONFIG_0504'; //*** */餐台配置

// 配置中心-> 快餐进件审核
      case 'configCenter.fastFoodDetails':
        return 'CONFIG_0601'; //详情

      case 'configCenter.fastFoodVerify':
        return 'CONFIG_0602'; //******/审核

      case 'configCenter.fastFoodExport':
        return 'CONFIG_0603'; //******/导出
// 工单中心->我的工单
      case 'order.release':
        return 'ORDER_0101'; //******/释放
      case 'order.export':
        return 'ORDER_0102'; //******/导出
      case 'order.orderProcess':
        return 'ORDER_0103'; //已处理工单详情
      case 'order.orderPending':
        return 'ORDER_0103'; //待处理工单详情

// 工单中心->工单池
      case 'order.addOrder':
        return 'ORDER_0201'; //新建工单
      case 'order.receive':
        return 'ORDER_0202'; //******/领取
      case 'order.pool.export':
        return 'ORDER_0203'; //******/导出
      case 'order.detail':
        return 'ORDER_0204';//工单池详情

// 应用管理->移动应用管理
      case 'application.addApp':
        return 'APP_MGR_0101'; //新增应用

      case 'application.editApp':
        return 'APP_MGR_0102'; //*** */编辑应用

      case 'application.appDetail':
        return 'APP_MGR_0103'; //应用详情
      
      case 'application.delete':
        return 'APP_MGR_0104'; //*** */删除

// 应用管理->意见反馈
      case 'application.export':
        return 'APP_MGR_0201'; //*** */导出

// 应用管理->系统消息
      case 'application.addMessage':
        return 'APP_MGR_0201'; //新增

      case 'application.Message.export':
        return 'APP_MGR_0201'; //*** */导出

      case 'application.Message.recall':
        return 'APP_MGR_0303'; //*** */撤回
// 应用管理->FAQ管理
      case 'application.addFaq':
        return 'APP_MGR_0401'; //新增FAQ

      case 'application.FAQ.edit':
        return 'APP_MGR_0402'; //*** */编辑FAQ

      case 'application.FAQ.delete':
        return 'APP_MGR_0403'; //*** */删除FAQ 

      case 'application.FAQ.see':
        return 'APP_MGR_0404'; //*** */查看 

      case 'application.FAQ.export':
        return 'APP_MGR_0405'; //*** */导出 

      case 'application.faqType':
        return 'APP_MGR_0406'; //FAQ问题类型

      case 'application.FAQ.question.add':
        return 'APP_MGR_040601'; //*** */新增问题类型  

      case 'application.FAQ.question.edit':
        return 'APP_MGR_040602'; //*** */编辑问题类型 

      case 'application.FAQ.question.delete':
        return 'APP_MGR_040603'; //*** */删除问题类型  

// 应用管理->问题反馈
      case 'application.problemFeedback.export':
        return 'APP_MGR_040601'; //*** */导出
      case 'application.problemFeedback.feedback':
        return 'APP_MGR_040602'; //*** */我要反馈
      case 'application.problemFeedback.detail':
        return 'APP_MGR_040603'; //*** */反馈详情

// 订单管理->服务费配置
      case 'manageOrder.addCharges':
        return 'ORDER_MGR_0101'; //新增服务费类目

      case 'manageOrder.chargesEdit':
        return 'ORDER_MGR_0102'; //编辑服务费类目
      
      case 'manageOrder.chargesDetail':
        return 'ORDER_MGR_0103'; //服务费类目详情
      
      case 'manageOrder.upCharges':
        return 'ORDER_MGR_0104'; //******/上架
      
      case 'manageOrder.downCharges':
        return 'ORDER_MGR_0104'; //******/下架

      case 'manageOrder.trialFee':
        return 'ORDER_MGR_0105'; //试用费设置

      case 'manageOrder.editChargeDate':
        return 'ORDER_MGR_0106'; //修改服务费有效期

      case 'manageOrder.trialOrderDetail':
        return 'ORDER_MGR_0301'; //试用费订单详情

      case 'manageOrder.trialOrdersExport':
        return 'ORDER_MGR_0302'; //******/试用费订单导出

// 订单管理-> 服务费订单
      case 'manageOrder.orderDetail':
        return 'ORDER_MGR_0201'; //查看详情

      case 'manageOrder.orderChangePay':
        return 'ORDER_MGR_0202'; //******/改价

      case 'manageOrder.calcelOrder':
        return 'ORDER_MGR_0203'; //******/取消订单

      case 'manageOrder.export':
        return 'ORDER_MGR_0204'; //******/导出

      case 'manageOrder.create':
        return 'ORDER_MGR_0205'; //******/创建订单   
//工具中心 ->集成登录
      case 'integrate.bigData':
        return 'TOOL_CENTER_0201'; //******/大数据平台  

      case 'integrate.restaurant':
        return 'TOOL_CENTER_0202'; //******/云餐厅后台  
//工具中心 ->快餐订单
      case 'tool.fastFoodDetail':
        return 'TOOL_CENTER_0301';//快餐订单详情 
      case 'tool.payOrderDetail':
        return 'TOOL_CENTER_0401';//支付订单详情 
      default:
        return '';
    }
  };
}