'use strict';

// Development specific configuration
// ==================================
module.exports = {

  amqp: process.env.CINEMA_COORDINATOR_RABBIT_BIGWIG_URL,

  // Sequelize connection opions
  sequelize: {
    uri: process.env.CINEMA_COORDINATOR_DEVELOPMENT_DATABASE_URL,
    options: {
      logging: false,
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: true

};
