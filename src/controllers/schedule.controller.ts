import { Request, Response } from "express";
import { Schedule } from "../models/Schedule";

export const createSchedule = async (req: Request, res: Response) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ error: "Failed to create schedule" });
  }
};

export const getSchedules = async (req: Request, res: Response) => {
  const { farmerId } = req.params; // Assuming the farmerId is passed as a route parameter

  try {
    const schedules = await Schedule.findAll({
      where: {
        farmerId, // Filter by farmerId
      },
      order: [['startTime', 'ASC']], // Optional: Order schedules by start time
    });

    res.status(200).json({
      message: 'Schedules fetched successfully',
      schedules,
    });
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: 'Failed to fetch schedules' });
  }
};

export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const schedule = await Schedule.findByPk(id);

    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    await schedule.update(updatedData);

    res.status(200).json({
      message: "Schedule updated successfully",
      schedule,
    });
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500).json({ error: "Failed to update schedule" });
  }
};

export const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get schedule ID from route params

    const schedule = await Schedule.findByPk(id);

    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    await schedule.destroy();

    res.status(200).json({
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json({ error: "Failed to delete schedule" });
  }
};
