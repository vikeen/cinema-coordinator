'use strict';

(function () {

  CreateCinemaModalService.$inject = ["$uibModal"];
  function CreateCinemaModalService($uibModal) {

    return {
      openAddCinemaModel: openAddCinemaModel
    };

    function openAddCinemaModel(show) {
      $uibModal.open({
        templateUrl: 'app/main/create_cinema_card.html',
        controller: 'CreateCinemaModalController',
        controllerAs: 'vm',
        bindToController: true,
        resolve: {
          show: show
        }
      });
    }
  }


  class CreateCinemaModalController {

    constructor(TrelloService, $uibModalInstance, show, TvMazeService) {
      const self = this;

      self.TvMazeService = TvMazeService;
      self.TrelloService = TrelloService;
      self.$uibModalInstance = $uibModalInstance;
      self.show = show;
      self.boards = [];
      self.board = {};
      self.lists = [];
      self.list = {};

      self.TvMazeService.episodesByShowId(self.show.id).then(function (episodes) {
        self.show.episodes = episodes;
      });

      self.TrelloService.authorize().then(function () {
        self.TrelloService.boards().then(function (boards) {
          self.boards = boards;
          self.board = boards[0] || {};

          self.fetchListsForBoard(self.board);
        });
      });
    }


    ok(show) {
      const self = this;

      self.TrelloService.createCinemaCard(show.name, show.summary, self.list.id).then(function (card) {
        self.TrelloService.addChecklistToCard("Episodes", card.id).then(function (checklist) {
          self.show.episodes.forEach(function (episode) {
            self.TrelloService.addItemToChecklist(checklist.id, {
              name: "s" + episode.season + "e" + episode.number + " - " + episode.name
            });
          // self.$uibModalInstance.close();
          });
        });
      });
    }

    cancel() {
      return this.$uibModalInstance.dismiss("cancel");
    }

    fetchListsForBoard(board) {
      const self = this;

      self.TrelloService.boardLists(board.id).then(function (boardLists) {
        self.lists = boardLists;
        self.list = boardLists[0] || {};
      });
    }
  }

  angular.module('cinemaCoordinatorApp')
    .controller('CreateCinemaModalController', CreateCinemaModalController)
    .factory('CreateCinemaModal', CreateCinemaModalService);

})();
