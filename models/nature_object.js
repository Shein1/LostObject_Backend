import Sequelize, { Model } from "sequelize";

export default class Nature extends Model {
  static init(database) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        nature: {
          type: Sequelize.STRING
        }
      },
      {
        tableName: "Nature",
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
    this.belongsTo(models.Type, {
      as: "type"
    });
  }
}
