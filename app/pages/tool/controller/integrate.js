'use strict';
const _init_ = Symbol('_init_');
class toolInteCtrl {
  constructor($uibModal) {
    this.$uibModal = $uibModal;
    this[_init_]();
  }
  [_init_]() {
    console.log('Init tool integrate ctrl');
  }
}
toolInteCtrl.$inject = ['$uibModal'];
export default angular.module('integrate', [])
  .controller('toolInteCtrl', toolInteCtrl)
  .name;