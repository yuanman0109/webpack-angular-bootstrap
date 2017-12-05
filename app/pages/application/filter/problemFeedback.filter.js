// 反馈类型
 class problemFeedback {
   static problemFeedbackType(input) {
    switch (input) {
      case 'ADVICE':
        return '产品建议';
      case 'PROBLEM':
        return '产品问题';
      default:
        return '';
    }
  };
 }
 export default problemFeedback;
