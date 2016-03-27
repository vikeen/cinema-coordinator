'use strict';

// Test specific configuration
// ===========================
module.exports = {
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
