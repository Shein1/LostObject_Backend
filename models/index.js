import Sequelize, { Op } from "sequelize";
import { NODE_ENV } from "@env";
import User from "./user";

const config = require("config/config.json")[NODE_ENV];

export const db = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    operatorsAliases: Op,
    define: {
      underscored: true
    }
  }
);

export const models = {
  User: User.init(db)
};

// Run `.associate` if it exists, ie create relationships in the ORM
Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => {
    /* istanbul ignore next */
    model.associate(models);
  });
