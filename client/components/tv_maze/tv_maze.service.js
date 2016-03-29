'use strict';

(function () {

  function TvMazeService($http) {
    var uri = "http://api.tvmaze.com";
    var service = {
      shows: shows
    };

    function shows(search) {
      return $http.get(uri + "/search/shows?q=" + search)
        .then(shows => {
          return shows.data.map((show) => {
            return show.show
          })
        });
    }

    return service;
  }

  angular.module('cinemaCoordinatorApp').factory('TvMazeService', TvMazeService);
})();
