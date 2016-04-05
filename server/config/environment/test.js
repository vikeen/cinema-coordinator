'use strict';

// Test specific configuration
// ===========================
module.exports = {
  amqp: process.env.CINEMA_COORDINATOR_RABBIT_BIGWIG_URL,
  sequelize: {
    uri: process.env.CINEMA_COORDINATOR_TEST_DATABASE_URL,
    options: {
      logging: false,
      define: {
        timestamps: false
      }
    }
  }
};
