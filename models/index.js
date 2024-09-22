const dbConfig = require("../config/db.config.js");
const pg = require('pg');
pg.defaults.ssl = true; 

require("dotenv").config();

const Sequelize = require("sequelize");
console.log("Database URL: ", process.env.POSTGRES_URL);

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  protocol: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);

module.exports = db;
