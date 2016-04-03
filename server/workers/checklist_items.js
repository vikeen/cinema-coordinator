"use strict";

var CHECKLIST_ITEMS_QUEUE_NAME = "cinema_coordinator.checklist-items",
  checklistItemsQueue;

module.exports = {
  __init: __init,
  publish: publish
};

function publish(payload) {
  checklistItemsQueue.publish(payload);
}

///////////////

function __init(connector) {
  var exchange = connector.queue.default();
  checklistItemsQueue = exchange.queue({
    name: CHECKLIST_ITEMS_QUEUE_NAME,
    durable: true
  });
  checklistItemsQueue.consume(__consume);

  console.log("created queue:", CHECKLIST_ITEMS_QUEUE_NAME);
}

function __consume(data, ack) {
  console.log("message came in", data);
  ack();
}
