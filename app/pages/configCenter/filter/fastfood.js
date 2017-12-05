 class FastFood {
   static RespErrMsg(input) {
     switch (input) {
       case 'CRM_001':
         return '快餐进件Id在数据库中不存在'; 
       case 'CRM_059':
         return '该门店的快餐进件已审核通过，不能重复审核'; 
       case 'CRM_60':
         return '该门店的快餐进件已驳回，不能重复驳回'; 
       case 'S404':
         return '资源不存在';
       default:
         return '';
     }
   }
   static CaseStatus(input) {
     switch (input) {
       case 'AUDIT':
         return '我方审核'; 
       case 'REJECTED':
         return '我方驳回'; 
       case 'THIRD_AUDIT':
         return '第三方审核'; 
       case 'THIRD_REJECTED':
         return '第三方驳回';
       case 'DRAFT':
         return '草稿'; 
       case 'PASSED':
         return '已通过'; 
       case null:
         return '未提交审核';  
       default:
         return '';
     }
   }
   static Status(input) {
     switch (input) {
       case 'SUBMIT':
         return '待审核'; 
       case 'REJECT':
         return '已退回'; 
       case 'ONLINE':
         return '已通过';
       default:
         return '';
     }
   }
   static LogStatus(input) {
     switch (input) {
       case 'ONLINE':
         return '通过'; 
       case 'REJECT':
         return '驳回'; 
       case 'SUBMIT':
         return '发起';
       default:
         return '';
     }
   }
 }
 export default FastFood;
