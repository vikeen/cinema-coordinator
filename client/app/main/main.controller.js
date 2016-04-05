'use strict';

(function() {

  class MainController {

    constructor($log, TvMazeService, TrelloService, CreateCinemaModal) {
      this.$log = $log;
      this.TvMazeService = TvMazeService;
      this.TrelloService = TrelloService;
      this.CreateCinemaModal = CreateCinemaModal;
      this.search = "Game of";
      this.shows;
    }

    $onInit() {
      this.onCinemaSearchSubmit(this.search);
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

    openAddCinemaModel(show) {
      this.CreateCinemaModal.openAddCinemaModel(show);
    }
  }

  angular.module('cinemaCoordinatorApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: "vm"
    });
})();
