'use strict';

(function () {

  function TrelloService($q, $filter) {
    const service = {
      authorize: authorize,
      createCinemaCard: createCinemaCard,
      addChecklistToCard: addChecklistToCard,
      me: me,
      boards: boards,
      board: board,
      boardLists: boardLists
    };

    function authorize() {
      let deferred = $q.defer();

      Trello.authorize({
        type: "popup",
        name: "Cinema Coordinator",
        scope: {
          read: true,
          write: true
        },
        expiration: "never",
        success: function () {
          return deferred.resolve();
        },
        error: function (error) {
          return deferred.reject(error);
        }
      });

      return deferred.promise;
    }

    function me() {
      let deferred = $q.defer();

      Trello.get("/members/me", function (response) {
        return deferred.resolve(response);
      }, function (error) {
        return deferred.reject(error);
      });

      return deferred.promise;
    }

    function boards() {
      let deferred = $q.defer();

      Trello.get("/members/me/boards", function (response) {
        return deferred.resolve(response.filter(function (board) {
          // only return open boards
          return !board.closed;
        }));
      }, function (error) {
        return deferred.reject(error);
      });

      return deferred.promise;
    }

    function board(id) {
      let deferred = $q.defer();

      Trello.get("/members/me/boards/" + id, function (response) {
        return deferred.resolve(response);
      }, function (error) {
        return deferred.reject(error);
      });

      return deferred.promise;
    }

    function boardLists(id) {
      let deferred = $q.defer();

      Trello.get("/boards/" + id + "/lists", function (response) {
        return deferred.resolve(response);
      }, function (error) {
        return deferred.reject(error);
      });

      return deferred.promise;
    }

    function addChecklistToCard(name, cardId) {
      let deferred = $q.defer(),
        newChecklist = {
          idCard: cardId,
          name: $filter("stripHtml")(name)
        };

      Trello.post("/checklists", newChecklist, function (response) {
        return deferred.resolve(response);
      }, function (error) {
        return deferred.reject(error);
      });

      return deferred.promise;
    }

    function createCinemaCard(name, description, listId) {
      let deferred = $q.defer(),
        newCard = {
          name: $filter("stripHtml")(name),
          desc: $filter("stripHtml")(description),
          idList: listId
        };

      Trello.post('/cards/', newCard, function (data) {
        return deferred.resolve(data);
      }, function (error) {
        return deferred.reject(error);
      });

      return deferred.promise;
    }

    return service;
  }

  angular.module('cinemaCoordinatorApp').factory('TrelloService', TrelloService);
})();
