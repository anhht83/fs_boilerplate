const Sequelize = require("sequelize");
const vars = require("../config/vars");
const env = vars.env;
const config = require("../config/sequelize.js")[env];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

export { sequelize, Sequelize };

