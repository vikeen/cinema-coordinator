'use strict';

(function () {

  function ShowsService($http) {
    var uri = "/api/shows";

    const service = {
      create: create
    };


    function create(show, trelloListId) {
      show.episodes = show.episodes.map(function(episode) {
        return {
          name: episode.name,
          season: episode.season,
          number: episode.number
        }
      });
      show.seasons = _.toArray(_.groupBy(show.episodes, "season"));

      show = angular.copy({
        id: show.id,
        name: show.name,
        seasons: show.seasons
      });

      return $http.post(uri, {
        show: show,
        listId: trelloListId
      });
    }

    return service;
  }

  angular.module('cinemaCoordinatorApp').factory('ShowsService', ShowsService);
})();
