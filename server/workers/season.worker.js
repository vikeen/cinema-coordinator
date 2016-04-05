"use strict";

var jackrabbit = require('jackrabbit'),
  config = require('../config/environment');


module.exports = new SeasonWorker();

function SeasonWorker() {
  this.name = "cinema_coordinator.season";
  this.rabbit = jackrabbit(config.amqp);
  this.exchange = this.rabbit.default();
  this.queue = this.exchange.queue({name: this.name, durable: true});
}

SeasonWorker.prototype.publish = function (season) {
  this.exchange
    .publish({season: season}, {key: this.name});
};

SeasonWorker.prototype.consumer = function () {
  this.queue.consume(this.__consume.bind(this));
};

SeasonWorker.prototype.__consume = function (data, ack) {
  console.log(this.name, "recieved data");
  ack();
};
