"use strict";

var jackrabbit = require('jackrabbit'),
  config = require('./config/environment'),
  rabbit = jackrabbit(config.amqp);

new Connector().then(function (connector) {
  var workers = require("./workers");

  Object.keys(workers).forEach(function(key) {
    workers[key].__init(connector);
  });
});

function Connector() {
  var self = this;

  return new Promise(function (resolve, reject) {
    self.queue = jackrabbit(config.amqp)
      .on("connected", function () {
        console.log("connected to rabbit");
        return resolve(self);
      })
      .on("error", function (err) {
        console.error(err);
        return reject(err);
      })
      .on('disconnected', function () {
        console.log("disconnected from rabbit mq")
      });
  });
}
