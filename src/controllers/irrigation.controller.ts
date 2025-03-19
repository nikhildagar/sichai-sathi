import { Request, Response } from "express";
import { Farmer } from "../models/Farmer";

export const getIrrigationState = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const farmer = await Farmer.findByPk(id);
    if (!farmer) return res.status(404).json({ error: "Farmer not found" });

    res.status(200).json({
      farmerId: farmer.id,
      irrigationState: farmer.irrigationState,
    });
  } catch (error) {
    console.error("Error fetching irrigation state:", error);
    res.status(500).json({ error: "Failed to fetch irrigation state" });
  }
};

export const toggleIrrigationState = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { power } = req.body;
    const farmer = await Farmer.findByPk(id);
    if (!farmer) return res.status(404).json({ error: "Farmer not found" });

    // Toggle the irrigation state
    const newState = power ? "on" : "off";
    farmer.irrigationState = newState;
    await farmer.save();

    res.status(200).json({
      message: "Irrigation state toggled successfully",
      farmerId: farmer.id,
      irrigationState: newState,
    });
  } catch (error) {
    console.error("Error toggling irrigation state:", error);
    res.status(500).json({ error: "Failed to toggle irrigation state" });
  }
};

export const getWaterSavings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const farmer = await Farmer.findByPk(id);
    if (!farmer) return res.status(404).json({ error: "Farmer not found" });

    res.status(200).json({
      waterSaving: farmer.waterPumpWatt * 0.5,
    });
  } catch (error) {
    console.error("Error calculating water savings:", error);
    res.status(500).json({ error: "Error calculating water savings" });
  }
};
