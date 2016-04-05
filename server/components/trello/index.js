"use strict";

var Trello = require("node-trello"),
  config = require("../../config/environment");

module.exports = function (token) {
  return new TrelloService(config.trello.key, token);
};

function TrelloService(key, token) {
  this.trello = new Trello(key, token);
}

TrelloService.prototype.createShow = function (show, listId) {
  var self = this;

  console.log("[Trello Service] creating show [", show.name, "]");

  return new Promise(function (resolve, reject) {
    self.trello.post("/1/cards", {
      name: show.name,
      desc: show.summary,
      idList: listId
    }, function (err, data) {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
};

TrelloService.prototype.createSeason = function (season, cardId) {
  var self = this;

  console.log("[Trello Service] creating season [", season.name, "] for card [", cardId, "]");

  return new Promise(function (resolve, reject) {
    self.trello.post("/1/checklists", {
      name: season.name,
      idCard: cardId
    }, function (err, data) {
      if (err) {
        return reject(err);
      }

      // attempt to prevent the trello api from blocking us with rate limiting
      setTimeout(function () {
        return resolve(data);
      }, 500);
    });
  });
};

TrelloService.prototype.createEpisode = function (episode, checklistId) {
  var self = this;

  return new Promise(function (resolve, reject) {
    self.trello.post("/1/checklists/" + checklistId + "/checkItems", {
      name: episode.number + ". " + episode.name
    }, function (err, data) {
      if (err) {
        return reject(err);
      }

      // attempt to prevent the trello api from blocking us with rate limiting
      setTimeout(function () {
        return resolve(data);
      }, 500);
    });
  });
};
