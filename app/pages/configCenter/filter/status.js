 class Status {
   static statusFilter(input) {
     switch (input) {
       case 'AUDIT':
         return '我方审核'; //账户
       case 'REJECTED':
         return '我方驳回'; //账户
       case 'THIRD_AUDIT':
         return '第三方审核'; //账户
       case 'THIRD_REJECTED':
         return '第三方驳回'; //账户
       case 'DRAFT':
         return '草稿'; //账户
       case 'PASSED':
         return '已通过'; //账户
       default:
         return '';
     }
   }
   static cardType(input) {
     switch (input) {
       case 'ID_CARD':
         return '身份证'; //账户
       case 'PASSPORD':
         return '护照'; //账户
       case 'PERMIT':
         return '港澳通行证'; //账户
       case 'MTP':
         return '台胞证'; //账户
       case 'OTHER':
         return '其他'; //账户
       default:
         return '其他';
     }
   }
   static ownerType(input) {
     switch (input) {
       case 'LEGAL_PERSON':
         return '法人代表'; //账户
       case 'MARKETING_MANAGER':
         return '经营者'; //账户
       default:
         return '';
     }
   }
   static buzinessType(input) {
     switch (input) {
       case 'SELF_BUSSINESS':
         return '个体商户'; //账户
       case 'ENTE_BUSSINESS':
         return '企业'; //账户
       default:
         return '';
     }
   }
   static previewURL(input) {
     return input + '&action=PREVIEW';
   }
 }
 export default Status;
