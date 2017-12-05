export default function winmsdScale() {
  return function(input) {
    switch (input) {
      case 'CloudFastFood':
        return '云小二-快餐版';
      case 'CloudSmallDinner':
        return '云小二-正餐版';
      case 'CloudShopkeeper':
        return '云掌柜';
      case 'CloudShopkeeperNew':
        return '新云掌柜';
      default:
        return '暂无';
    }
  };
}