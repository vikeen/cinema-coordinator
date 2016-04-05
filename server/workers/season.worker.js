"use strict";

var jackrabbit = require('jackrabbit'),
  config = require('../config/environment'),
  episodeWorker = require("./episode.worker");


module.exports = new SeasonWorker();

function SeasonWorker() {
  this.name = "cinema_coordinator.season";
  this.rabbit = jackrabbit(config.amqp);
  this.exchange = this.rabbit.default();
  this.queue = this.exchange.queue({name: this.name, durable: true});
}

SeasonWorker.prototype.publish = function (season, trelloCardId) {
  this.exchange
    .publish({season: season, trelloCardId: trelloCardId}, {key: this.name});
};

SeasonWorker.prototype.consumer = function () {
  this.queue.consume(this.__consume.bind(this));
};

SeasonWorker.prototype.__consume = function (data, ack) {
  var season = data.season,
    trelloCardId = data.trelloCardId;

  console.log(this.name, "received season with", season.length, "episodes for [card:", trelloCardId, "]");

  // make http post for show checklist here

  var trelloChecklistId = 1;

  season.forEach(function(episode) {
    episodeWorker.publish(episode, trelloChecklistId);
  });

  ack();
};
