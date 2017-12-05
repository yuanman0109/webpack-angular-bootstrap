class faqFilter {
  static faqFilterName(input) {
    switch (input) {
      case 'BSS_PC':
        return 'BSS-PC';
      case 'BSS_APP':
        return 'BSS-APP';
      case 'CloudFastFood':
        return '云小二-快餐版';
      case 'CloudSmallDinner':
        return '云小二-正餐版';
      case 'CloudShopkeeper':
        return '云掌柜';
      case 'CloudSir':
        return '云客官';
      default:
        return '产品名称';
    }
  }
}
export default faqFilter;