'use strict';

(function() {

  class MainController {

    constructor($log, TvMazeService, TrelloService, $uibModal) {
      this.$log = $log;
      this.TvMazeService = TvMazeService;
      this.TrelloService = TrelloService;
      this.$uibModal = $uibModal;
      this.search = "Game of";
      this.shows = [];
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
      let self = this;


      self.$uibModal.open({
          templateUrl: 'app/main/create_cinema_card.html',
          controller: function (TrelloService, $uibModalInstance) {
            let vm = this;

            vm.fetchListsForBoard = fetchListsForBoard;
            vm.ok = ok;
            vm.cancel = cancel;

            activate();

            ///////////////

            function activate() {
              vm.show = show;
              vm.boards = [];
              vm.board = {};
              vm.lists = [];
              vm.list = {};

              TrelloService.authorize().then(function () {
                TrelloService.boards().then(function (boards) {
                  vm.boards = boards;
                  vm.board = boards[0] || {};

                  vm.fetchListsForBoard(vm.board);
                });
              });
            }

            function ok(show) {
              TrelloService.createCinemaCard(show.name, show.summary, vm.list.id).then(function () {
                $uibModalInstance.close();
              });
            }

            function cancel() {
              return $uibModalInstance.dismiss("cancel");
            }

            function fetchListsForBoard(board) {
              TrelloService.boardLists(board.id).then(function (boardLists) {
                vm.lists = boardLists;
                vm.list = boardLists[0] || {};
              });
            }
          },
          controllerAs: "vm"
        }
      );
    }
  }

  angular.module('cinemaCoordinatorApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: "vm"
    });
})();
