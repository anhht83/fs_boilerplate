import {
  Model, InferAttributes, InferCreationAttributes, CreationOptional,
  ForeignKey, DataTypes
} from "sequelize";
import { sequelize } from ".";
import { Basic } from "./basic";


export class Violation extends Model<InferAttributes<Violation>, InferCreationAttributes<Violation>> {
  declare id: CreationOptional<number>;
  declare code: string;
  declare description: string;
  declare basicId: ForeignKey<Basic["id"]>;
  declare basic?: Basic;
}

Violation.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  code: DataTypes.STRING,
  description: DataTypes.STRING,
  basicId: DataTypes.INTEGER.UNSIGNED
}, {
  sequelize,
  tableName: "violations",
  modelName: "violation"
});

Violation.belongsTo(Basic, {
  as: "basic",
  foreignKey: "basicId"
});

Basic.hasMany(Violation)
