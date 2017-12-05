import angular from 'angular';
import province from './province';
import city from './city';
import county from './county';
import aMap from './aMap';
import address from './address';
import isEnabled from './isEnabled';
import irregular from './irregular';
import ivhTreeCheckboxHelper from './ivhTreeCheckboxHelper';
import DatePicker from './datePicker.js';
import TimePicker from './timePicker.js';
import BusinLabel from './businLabel.js';
export default angular.module('Directive', [])
  .directive('aMap', aMap)
  .directive('address', address)
  .directive('isEnabled', isEnabled)
  .directive('provSelect', province)
  .directive('citySelect', city)
  .directive('countySelect', county)  
  //树自定义模板
  .directive('ivhTreeCheckboxHelper', [ivhTreeCheckboxHelper])
  //禁止输入特殊符号
  .directive('irregular', irregular)
  //日期选择器
  .directive('datePicker', () => { return new DatePicker(); })
  //时间选择器
  .directive('timePicker', () => { return new TimePicker(); })
  //y业务类型label
  .directive('businLabel', () => { return new BusinLabel(); })
  .name;