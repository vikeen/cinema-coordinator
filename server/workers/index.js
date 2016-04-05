"use strict";

var jackrabbit = require('jackrabbit'),
  config = require('../config/environment'),
  rabbit = jackrabbit(config.amqp);


module.exports = function () {
  try {
    return new Connector().then(function () {
      require("./show.worker").consumer();
      require("./season.worker").consumer();
      require("./episode.worker").consumer();
    });
  } catch(e) {
    console.error(e.stack);
  }
};


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
