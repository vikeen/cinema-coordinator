"use strict";

var Trello = require("../components/trello"),
  jackrabbit = require('jackrabbit'),
  config = require('../config/environment'),
  episodeWorker = require("./episode.worker");


module.exports = new SeasonWorker();

function SeasonWorker() {
  this.name = "cinema_coordinator.season";
  this.rabbit = jackrabbit(config.amqp);
  this.exchange = this.rabbit.default();
  this.queue = this.exchange.queue({name: this.name, durable: true});
}

SeasonWorker.prototype.publish = function (season, trelloCardId, trelloToken) {
  this.exchange
    .publish({
      season: season,
      trelloCardId: trelloCardId,
      trelloToken: trelloToken
    }, {key: this.name});
};

SeasonWorker.prototype.consumer = function () {
  this.queue.consume(this.__consume.bind(this));
};

SeasonWorker.prototype.__consume = function (data, ack) {
  var season = data.season,
    trelloCardId = data.trelloCardId,
    trello = Trello(data.trelloToken);

  trello.createSeason(season, trelloCardId).then(function (newTrelloChecklist) {
      season.episodes.forEach(function (episode) {
        episodeWorker.publish(episode, newTrelloChecklist.id, data.trelloToken);
      });

      ack();
    })
    .catch(function (error) {
      console.error(error);
    });
};
