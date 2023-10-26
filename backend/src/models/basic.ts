import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import { sequelize } from ".";

export class Basic extends Model<InferAttributes<Basic>, InferCreationAttributes<Basic>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare slug: string;
}

Basic.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING,
  slug: DataTypes.STRING
}, {
  sequelize,
  tableName: "basics",
  modelName: "basic"
});

