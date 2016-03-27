'use strict';

angular.module('cinemaCoordinatorApp.auth', [
  'cinemaCoordinatorApp.constants',
  'cinemaCoordinatorApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
