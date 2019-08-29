import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
  checkHookDefined
} from "sequelize-test-helpers";

import userModel from "models/user";

describe("model/User", () => {
  const Model = userModel(sequelize, dataTypes);
  const instance = new Model();

  checkModelName(Model)("User");
  context("properties", () => {
    [
      "uuid",
      "username",
      "email",
      "password",
      "password_confirmation",
      "password_digest"
    ].forEach(checkPropertyExists(instance));
  });

  context("hooks", () => {
    ["beforeValidate", "beforeSave"].forEach(
      checkHookDefined(instance)
    );
  });

  context('indexes', () => {
    ;['uuid', 'email'].forEach(checkUniqueIndex(instance))
  })
});
