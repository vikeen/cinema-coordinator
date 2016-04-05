'use strict';

(function () {

  function ShowsService($http, $filter) {
    var uri = "/api/shows";

    const service = {
      create: create
    };


    function create(show, trelloListId) {
      // trim episodes dataset
      show.episodes = show.episodes.map(function(episode) {
        return {
          name: episode.name,
          season: episode.season,
          number: episode.number
        }
      });

      show.seasons = _.map(_.groupBy(show.episodes, "season"), function(episodes, key) {
        return { name: "Season " + key, episodes: episodes};
      });

      show = angular.copy({
        id: show.id,
        name: $filter("stripHtml")(show.name),
        seasons: show.seasons,
        summary: $filter("stripHtml")(show.summary)
      });

      return $http.post(uri, {
        show: show,
        listId: trelloListId,
        trelloToken: localStorage["trello_token"]
      });
    }

    return service;
  }

  angular.module('cinemaCoordinatorApp').factory('ShowsService', ShowsService);
})();
