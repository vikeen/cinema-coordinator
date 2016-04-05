"use strict";

var jackrabbit = require('jackrabbit'),
  config = require('../config/environment');


module.exports = new ShowWorker();

function ShowWorker() {
  this.name = "cinema_coordinator.show";
  this.rabbit = jackrabbit(config.amqp);
  this.exchange = this.rabbit.default();
  this.queue = this.exchange.queue({name: this.name, durable: true});
}

ShowWorker.prototype.publish = function (show, trelloListId) {
  this.exchange
    .publish({show: show, trelloListId: trelloListId}, {key: this.name});
};

ShowWorker.prototype.consumer = function () {
  this.queue.consume(this.__consume.bind(this));
};

ShowWorker.prototype.__consume = function (data, ack) {
  console.log(this.name, "recieved data");
  ack();
};
