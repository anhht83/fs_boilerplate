import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from "sequelize";
import { sequelize } from ".";
import { User } from "./user";

export class Token extends Model<InferAttributes<Token>, InferCreationAttributes<Token>> {
  declare id: CreationOptional<number>;
  declare token: string;
  declare type: string;
  declare expires: any;
  declare userId: ForeignKey<User["id"]>;

}

Token.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  token: DataTypes.STRING,
  type: DataTypes.STRING,
  expires: DataTypes.DATE
}, {
  sequelize,
  tableName: "tokens",
  modelName: "Token"
});

