'use strict';

// Production specific configuration
// =================================
module.exports = {
  ip: process.env.IP,
  port: process.env.PORT,
  amqp: process.env.RABBITMQ_BIGWIG_URL || process.env.CINEMA_COORDINATOR_RABBIT_BIGWIG_URL,
  sequelize: {
    uri: process.env.DATABASE_URL,
    options: {
      logging: false,
      define: {
        timestamps: false
      }
    }
  }
};
