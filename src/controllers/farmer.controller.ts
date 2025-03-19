import { Request, Response } from "express";
import { Farmer } from "../models/Farmer";
import { UniqueConstraintError, ValidationError } from "sequelize";

export const createFarmer = async (req: Request, res: Response) => {
  try {
    const farmer = await Farmer.create(req.body);
    res.status(201).json({
      message: "Farmer created successfully",
      farmer,
    });
  } catch (error) {
    // Ensure error is typed correctly
    if (error instanceof UniqueConstraintError) {
      // Handle unique constraint violation
      res.status(400).json({
        error: "A farmer with this contact number already exists.",
      });
    } else if (error instanceof ValidationError) {
      // Handle validation errors
      res.status(400).json({
        error: error.errors.map((e) => e.message).join(", "),
      });
    } else {
      // Handle other unexpected errors
      console.error("Unexpected error creating farmer:", error);
      res.status(500).json({ error: "Failed to create farmer" });
    }
  }
};

export const loginFarmer = async (req: Request, res: Response) => {
  const { contactNumber } = req.body;
  try {
    const farmer = await Farmer.findOne({ where: { contactNumber } });
    if (farmer) {
      res.json(farmer);
    } else {
      res.status(404).json({ error: "Farmer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to login farmer" });
  }
}

export const getFarmers = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const farmers = await Farmer.findByPk(id);
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch farmers" });
  }
};
