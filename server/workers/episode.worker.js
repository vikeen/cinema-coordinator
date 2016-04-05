"use strict";

var jackrabbit = require('jackrabbit'),
  config = require('../config/environment');


module.exports = new EpisodeWorker();

function EpisodeWorker() {
  this.name = "cinema_coordinator.episode";
  this.rabbit = jackrabbit(config.amqp);
  this.exchange = this.rabbit.default();
  this.queue = this.exchange.queue({name: this.name, durable: true});
}

EpisodeWorker.prototype.publish = function (episode, trelloChecklistId) {
  this.exchange
    .publish({
      episode: episode,
      trelloChecklistId: trelloChecklistId
    }, {key: this.name});
};

EpisodeWorker.prototype.consumer = function () {
  this.queue.consume(this.__consume.bind(this));
};

EpisodeWorker.prototype.__consume = function (data, ack) {
  var episode = data.episode,
    trelloChecklistId = trelloChecklistId;

  console.log(this.name, "received episode [", episode.name, "] episodes for [checklist:", trelloChecklistId, "]");

  // make api call to create checklist item here

  ack();
};
