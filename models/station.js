import Sequelize, { Model } from "sequelize";

export default class Station extends Model {
  static init(database) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        uic_code: {
          type: Sequelize.STRING,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        }
      },
      {
        tableName: "Station",
        sequelize: database,

        indexes: [
          {
            unique: true,
            fields: ["id", "uic_code"]
          }
        ]
      }
    );
  }
}
