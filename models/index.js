import { DATABASE_URL } from "@env";
import Sequelize, { Op } from "sequelize";

import User from "./user";
import NatureObject from "./nature_object";
import FoundObject from "./found_object";
import TypeObject from "./type_object";
import Station from "./station";
import Alert from "./alert";

// const config = require("config/config.json")[NODE_ENV];

export const db = new Sequelize(DATABASE_URL, {
  operatorsAliases: Op,
  define: {
    underscored: true
  }
});

export const models = {
  Nature: NatureObject.init(db),
  FoundObject: FoundObject.init(db),
  Type: TypeObject.init(db),
  Station: Station.init(db),
  User: User.init(db),
  Alert: Alert.init(db)
};

// Run `.associate` if it exists, ie create relationships in the ORM
Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));
