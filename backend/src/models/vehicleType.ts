import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import { sequelize } from ".";

export class VehicleType extends Model<InferAttributes<VehicleType>, InferCreationAttributes<VehicleType>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare slug: string;
  declare unit: number;
}

VehicleType.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING,
  slug: DataTypes.STRING,
  unit: DataTypes.INTEGER
}, {
  sequelize,
  tableName: "vehicle_types",
  modelName: "VehicleType"
});
