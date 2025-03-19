// models/Alert.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/sequelize';

interface AlertAttributes {
  id: number;
  farmerId: number;
  time: Date;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
}

interface AlertCreationAttributes extends Optional<AlertAttributes, 'id'> {}

class Alert extends Model<AlertAttributes, AlertCreationAttributes> implements AlertAttributes {
  public id!: number;
  public farmerId!: number;
  public time!: Date;
  public title!: string;
  public message!: string;
  public priority!: 'low' | 'medium' | 'high';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Alert.init(
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
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'alerts',
  }
);

export { Alert };
