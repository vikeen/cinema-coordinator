'use strict';

angular.module('cinemaCoordinatorApp', [
  'cinemaCoordinatorApp.auth',
  'cinemaCoordinatorApp.admin',
  'cinemaCoordinatorApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
