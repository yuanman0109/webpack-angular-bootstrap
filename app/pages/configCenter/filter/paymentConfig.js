 class PaymentConfig {
   static ConnectionOrg(input) {
     switch (input) {
       case 'FUYOU':
         return '富友'; 
       case 'LAKALA':
         return '拉卡拉'; 
      //  case 'ZHIFUTONG':
      //    return '支付通'; 
       case 'EASYPAY':
         return '易生支付'; 
       case 'ALIPAY':
         return '支付宝'; 
       case 'WEIXIN':
         return '微信';
       default:
         return '';
     }
   }
   static ConnectionMode(input) {
     switch (input) {
       case 'DIRECT':
         return '直连'; 
       case 'INDIRECT':
         return '间连'; 
       default:
         return '';
     }
   }
   static PayMode(input) {
     switch (input) {
       case 'ALIPAY':
         return '支付宝'; 
       case 'WEIXIN':
         return '微信'; 
       default:
         return '';
     }
   }
   static RespErr(input, PayMode) {
     switch (input) {
       case 'PAY_CONFIG_ERROR_001':
         return '【' + PayMode + '】已有启用状态，如需要切换，请先停用再修改'; 
       case 'PAY_CONFIG_ERROR_002':
         return '机构已存在，请勿重新提交'; 
       default:
         return '';
     }
   }
 }
 export default PaymentConfig;
