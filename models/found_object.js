import Sequelize, { Model } from "sequelize";

export default class FoundObject extends Model {
  static init(database) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false
        }
      },
      {
        tableName: "Found_Object",
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
    this.belongsTo(models.Nature, {
      as: "nature",
    });
    this.belongsTo(models.Type, {
      as: "type",
    });
    this.belongsTo(models.Station, {
      as: "station",
    });
  }
}
