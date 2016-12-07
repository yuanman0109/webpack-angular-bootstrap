import './style/dashboard.css';
import './style/comm.scss';
import './style/comm.css';
import 'angular';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import routerconfig from './js/routers/router.js';
angular.module('app',['ui.router','ui.bootstrap']).config(routerconfig);