'use strict';

// Production specific configuration
// =================================
module.exports = {
  ip: process.env.IP,
  port: process.env.PORT,
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
