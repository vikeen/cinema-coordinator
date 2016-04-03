'use strict';

(function () {

  CreateCinemaModalService.$inject = ["$uibModal", "TrelloService"];
  function CreateCinemaModalService($uibModal, TrelloService) {

    return {
      openAddCinemaModel: openAddCinemaModel
    };

    function openAddCinemaModel(show) {
      TrelloService.authorize().then(function () {
        $uibModal.open({
          templateUrl: 'app/main/create_cinema_card.html',
          controller: 'CreateCinemaModalController',
          controllerAs: 'vm',
          bindToController: true,
          resolve: {
            show: show
          }
        });
      });
    }
  }


  class CreateCinemaModalController {

    constructor(TrelloService, $uibModalInstance, show, TvMazeService, ChecklistsService) {
      const self = this;

      self.TvMazeService = TvMazeService;
      self.TrelloService = TrelloService;
      self.$uibModalInstance = $uibModalInstance;
      self.ChecklistsService = ChecklistsService;
      self.show = show;
      self.boards = [];
      self.board = {};
      self.lists = [];
      self.list = {};

      self.TvMazeService.episodesByShowId(self.show.id).then(function (episodes) {
        self.show.episodes = episodes;
      });

      self.TrelloService.boards().then(function (boards) {
        self.boards = boards;
        self.board = boards[0] || {};

        self.fetchListsForBoard(self.board);
      });
    }


    ok(show) {
      const self = this;

      self.TrelloService.createCinemaCard(show.name, show.summary, self.list.id)
        .then(function (card) {
          return self.TrelloService.addChecklistToCard("Episodes", card.id)
        })
        .then(function (checklist) {
          return self.ChecklistsService.addItems(checklist.id, self.show.episodes)
        })
        .then(function () {
          return self.$uibModalInstance.close();
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
