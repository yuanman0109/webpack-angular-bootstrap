// ERR
export default function respErrMsg() {
  return function(input) {
    switch (input) {
      case 'PERMISSION_001':
        return '用户ID不能为空';
      case 'PERMISSION_002':
        return '员工工号或者用户名不匹配';
      case 'PERMISSION_003':
        return '用户已经被禁用，不能修改 ';
      case 'PERMISSION_004':
        return '用户已经是正常状态！';
      case 'PERMISSION_005':
        return '用户已经是禁用状态';
      case 'PERMISSION_006':
        return '用户为超级管理不能禁用';
      case 'PERMISSION_007':
        return '该角色下还有成员, 不能删除';
      case 'PERMISSION_008':
        return '请输入正确的区域级别';
      case 'PERMISSION_009':
        return '超级管理角色不能删除和修改';
      case 'PERMISSION_010':
        return '超级管理角色不能删除和修改';
      case 'PERMISSION_011':
        return '用户角色个数超过限制';
      default:
        return '';
    }
  };
}