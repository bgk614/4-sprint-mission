require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.DB_URI
};
