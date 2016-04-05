"use strict";

var Trello = require("../components/trello"),
  jackrabbit = require('jackrabbit'),
  config = require('../config/environment');


module.exports = new EpisodeWorker();

function EpisodeWorker() {
  this.name = "cinema_coordinator.episode";
  this.rabbit = jackrabbit(config.amqp);
  this.exchange = this.rabbit.default();
  this.queue = this.exchange.queue({name: this.name, durable: true});
}

EpisodeWorker.prototype.publish = function (episode, trelloChecklistId, trelloToken) {
  this.exchange
    .publish({
      episode: episode,
      trelloChecklistId: trelloChecklistId,
      trelloToken: trelloToken
    }, {key: this.name});
};

EpisodeWorker.prototype.consumer = function () {
  this.queue.consume(this.__consume.bind(this));
};

EpisodeWorker.prototype.__consume = function (data, ack) {
  var episode = data.episode,
    trelloChecklistId = data.trelloChecklistId,
    trello = Trello(data.trelloToken);


  trello.createEpisode(episode, trelloChecklistId)
    .then(function () {
      ack();
    })
    .catch(function (error) {
      console.error(error);
    });
};
