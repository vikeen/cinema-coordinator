'use strict';

(function () {

  function ChecklistsService($http) {
    var uri = "/api/checklists";

    const service = {
      addItems: addItems
    };


    function addItems(checklistId, items) {
      return $http.post(uri + "/" + checklistId, items);
    }

    return service;
  }

  angular.module('cinemaCoordinatorApp').factory('ChecklistsService', ChecklistsService);
})();
