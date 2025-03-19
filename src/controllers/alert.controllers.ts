import { Request, Response } from 'express';
import { Alert } from '../models/Alert';

export const createAlert = async (req: Request, res: Response) => {
  const { farmerId, time, title, message, priority } = req.body;

  try {
    const alert = await Alert.create({
      farmerId,
      time,
      title,
      message,
      priority,
    });

    res.status(201).json({
      message: 'Alert created successfully',
      alert,
    });
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

export const getAlerts = async (req: Request, res: Response) => {
  const { farmerId } = req.params;
  const { priority } = req.query; // Optional query param to filter by priority

  try {
    const whereClause: any = { farmerId };
    if (priority) {
      whereClause.priority = priority;
    }

    const alerts = await Alert.findAll({
      where: whereClause,
      order: [['time', 'DESC']], // Sort by time (latest first)
    });

    res.status(200).json({
      message: 'Alerts retrieved successfully',
      alerts,
    });
  } catch (error) {
    console.error('Error retrieving alerts:', error);
    res.status(500).json({ error: 'Failed to retrieve alerts' });
  }
};