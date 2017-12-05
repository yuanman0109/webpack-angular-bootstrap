// ERROR
export default function scale() {
  return function(input) {
    switch (input) {
      case 'SCALE_TEN':
        return '10人以下';
      case 'SCALE_FIFTY':
        return '10-50人';
      case 'SCALE_HUNDRED':
        return '50-100人';
      case 'SCALE_FIVEHUNDRED':
        return '100-500人';
      case 'SCALE_THOUSAND':
        return '500-1000人';
      case 'SCALE_MAX':
        return '1000人以上';
        // 年龄段
      case 'THIRTY_FIVE':
        return '35周岁以下';
      case 'FORTY_FIVE':
        return '35-45周岁';
      case 'FORTY_FIVE_ABOVE':
        return '45周岁以上';
        // 私海状态
      case 'REJECT':
        return '已退回';
      case 'SUBMIT':
        return '待审核';
      case 'GET':
        return '跟进中';
      default:
        return '暂无';
    }
  };
}