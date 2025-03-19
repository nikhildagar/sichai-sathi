import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/sequelize";

interface SoilAnalysisAttributes {
  id: number;
  farmerId: number;
  humidity: number;
  flow: number;
  irrigation_duration: number;
  moisture: number;
  water_required: number;
}

interface SoilAnalysisCreationAttributes
  extends Optional<SoilAnalysisAttributes, "id"> {}

class SoilAnalysis
  extends Model<SoilAnalysisAttributes, SoilAnalysisCreationAttributes>
  implements SoilAnalysisAttributes
{
  public id!: number;
  public farmerId!: number;
  public humidity!: number;
  public flow!: number;
  public irrigation_duration!: number;
  public moisture!: number;
  public water_required!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SoilAnalysis.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    farmerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    humidity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    flow: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    irrigation_duration: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    moisture: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    water_required: {
      type: DataTypes.FLOAT,  // Corrected from DataTypes.NUMBER
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "soil_analyses",
  }
);

export { SoilAnalysis };
