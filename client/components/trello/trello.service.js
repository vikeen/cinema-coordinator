'use strict';

(function () {

  function TrelloService($q) {
    const service = {
      authorize: authorize,
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
        success: function (response) {
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

    return service;
  }

  angular.module('cinemaCoordinatorApp').factory('TrelloService', TrelloService);
})();
