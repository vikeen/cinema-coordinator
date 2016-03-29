'use strict';

(function() {

class MainController {

  constructor($log, TvMazeService) {
    this.$log = $log;
    this.TvMazeService = TvMazeService;
    this.search="Game of";
    this.shows = [];
  }

  $onInit() {
    this.onCinemaSearchSubmit("Game of");
  }

  onCinemaSearchSubmit(search) {
    this.TvMazeService.shows(search)
      .then(shows => {
        this.shows = shows;
      })
      .catch(err => {
        this.$log.error(err);
        this.error = err;
      });
  }
}

angular.module('cinemaCoordinatorApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController,
    controllerAs: "vm"
  });

})();
