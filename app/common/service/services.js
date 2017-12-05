import angular from 'angular';
import PublicServer from './publicService.js';
import DialogService from './Dialog.service';
import ExportService from './Export.service';
import replaceUrl from './urlService';
import LoginService from './loginService';

export default angular
  .module('Service', [])
  .service('PublicServer', PublicServer)
  .service('DialogService', DialogService)
  .service('ExportService', ExportService)
  .service('replaceUrl', replaceUrl)
  .service('LoginService', LoginService)
  .name;