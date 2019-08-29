import Sequelize, { Model } from "sequelize";

export default class Alert extends Model {
  static init(database) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        }
      },
      {
        tableName: "Alert",
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

  static associate(models) {
    this.belongsTo(models.Station, {
      as: "station"
    });
    this.belongsTo(models.Type, {
      as: "type"
    });
    this.belongsTo(models.Nature, {
      as: "nature"
    });
    this.belongsTo(models.User, {
      as: "user"
    });
  }
}
