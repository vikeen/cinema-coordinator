'use strict';

(function () {

  function TvMazeService($http) {
    var uri = "http://api.tvmaze.com";
    var service = {
      shows: shows,
      episodesByShowId: episodesByShowId
    };

    function shows(search) {
      return $http.get(uri + "/search/shows?q=" + search)
        .then(shows => {
          return shows.data.map((show) => {
            return show.show
          })
        });
    }

    function episodesByShowId(id) {
      return $http.get(uri + "/shows/" + id + "/episodes").then(episodes => {
        return episodes.data;
      });
    }

    return service;
  }

  angular.module('cinemaCoordinatorApp').factory('TvMazeService', TvMazeService);
})();
