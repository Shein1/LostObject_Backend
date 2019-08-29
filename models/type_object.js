import Sequelize, { Model, Op } from "sequelize";

export default class Type extends Model {
  static init(database) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
        }
      },
      {
        tableName: "Type",
        sequelize: database,

        indexes: [
          {
            unique: true,
            fields: ["id"]
          }
        ]
      }
    );
  }
}
