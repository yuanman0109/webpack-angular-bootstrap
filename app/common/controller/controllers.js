import angular from 'angular';
import AppCtrl from '../controller/appCtrl';
import CityCtrl from './city.js';
import CountyCtrl from './county.js';
import ProvinceCtrl from './province.js';
export default angular
  .module('ControllerModule', [])
  .controller('appCtrl', AppCtrl)
  .controller('CityCtrl', CityCtrl)
  .controller('CountyCtrl', CountyCtrl)
  .controller('ProvinceCtrl', ProvinceCtrl)
  .name;