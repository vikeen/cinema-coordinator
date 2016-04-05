"use strict";

var Trello = require("../components/trello"),
  jackrabbit = require('jackrabbit'),
  config = require('../config/environment'),
  seasonWorker = require("./season.worker");


module.exports = new ShowWorker();

function ShowWorker() {
  this.name = "cinema_coordinator.show";
  this.rabbit = jackrabbit(config.amqp);
  this.exchange = this.rabbit.default();
  this.queue = this.exchange.queue({name: this.name, durable: true});
}

ShowWorker.prototype.publish = function (show, trelloListId, trelloToken) {
  this.exchange
    .publish({
      show: show,
      trelloListId: trelloListId,
      trelloToken: trelloToken
    }, {key: this.name});
};

ShowWorker.prototype.consumer = function () {
  this.queue.consume(this.__consume.bind(this));
};

ShowWorker.prototype.__consume = function (data, ack) {
  var show = data.show,
    trelloListId = data.trelloListId,
    trello = Trello(data.trelloToken);

  trello.createShow(show, trelloListId)
    .then(function (newTrelloCard) {
      show.seasons.forEach(function (season) {
        seasonWorker.publish(season, newTrelloCard.id, data.trelloToken);
      });

      ack();
    })
    .catch(function (error) {
      console.error(error);
    });
};
