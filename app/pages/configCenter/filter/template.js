 class template {
   static businessTypeFilter(input) {
     switch (input) {
       case 'DINNER':
         return '点餐（正）'; 
       case 'SNACK':
         return '点餐（快）'; 
       case 'TIP':
         return '打赏';
       case 'PAY':
         return '百味云支付'; 
       case 'SPAY':
         return '百味云秒付'; 
       case 'WIFI':
         return '百味云WIFI'; 
       case 'POS':
         return '百味云收银';
       case 'VIP':
         return '会员营销';
       case 'PRINTER':
         return '云打印机';
       default:
         return '-';
     }
   }
   static businessTypeName(input) {
     switch (input) {
       case 'DINNER':
         return '正'; 
       case 'SNACK':
         return '快'; 
       case 'TIP':
         return 'TIP';
       case 'PAY':
         return '支'; 
       case 'SPAY':
         return 'S支'; 
       case 'WIFI':
         return 'WIFI'; 
       case 'POS':
         return '银';
       case 'VIP':
         return 'VIP';
       case 'PRINTER':
         return '印';
       default:
         return '-';
     }
   }
   static TemplType(input) {
     switch (input) {
       case 'TABLE':
         return '桌台'; 
       case 'TABLE_STICKER':
         return '桌贴'; 
       default:
         return '-';
     }
   }
 }
 export default template;
