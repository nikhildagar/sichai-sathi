import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/sequelize";

export class Farmer extends Model {
  public id!: number;
  public name!: string;
  public contactNumber!: string;
  public location!: string;
  public cropType!: string;
  public waterPumpWatt!: number;
  public irrigationState!: string; 
}

Farmer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cropType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waterPumpWatt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    irrigationState: {
      type: DataTypes.ENUM("on", "off"), // New field
      allowNull: false,
      defaultValue: "off",
    },
  },
  {
    sequelize,
    modelName: "Farmer",
    tableName: "farmers",
  }
);
