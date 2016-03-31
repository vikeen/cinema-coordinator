'use strict';

(function () {

  angular.module('cinemaCoordinatorApp').filter('stripHtml', function () {
    return function (text) {
      return String(text).replace(/<[^>]+>/gm, '');
    }
  });

})();
