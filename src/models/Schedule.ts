import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';
import { Farmer } from './Farmer';

export class Schedule extends Model {
  public id!: number;
  public farmerId!: number;
  public startTime!: Date;
  public endTime!: Date;
  public repeat!: string;
}

Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    farmerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Farmer,
        key: 'id',
      },
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    repeat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Schedule',
    tableName: 'schedules',
  }
);

// Associate Farmer with Schedule
Farmer.hasMany(Schedule, { foreignKey: 'farmerId' });
Schedule.belongsTo(Farmer, { foreignKey: 'farmerId' });
