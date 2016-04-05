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

EpisodeWorker.prototype.publish = function (episode) {
  this.exchange
    .publish({episode: episode}, {key: this.name});
};

EpisodeWorker.prototype.consumer = function () {
  this.queue.consume(this.__consume.bind(this));
};

EpisodeWorker.prototype.__consume = function (data, ack) {
  console.log(this.name, "recieved data");
  ack();
};
