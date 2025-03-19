import { Request, Response } from "express";
import { SoilAnalysis } from "../models/Soil";
import { Farmer } from "../models/Farmer";
import { predictETC } from "../services/ETC.services";

export const addSoilAnalysis = async (req: Request, res: Response) => {
  try {
    const { farmerId, humidity, flow, moisture } = req.body;

    // Calculate required water
    const predicted = await predictETC();
    // const flow = 6000; // ml per minute
    const requiredWater = predicted["ETc (mm/day)"] * 4046 * 1000; // ml
    const duration = (requiredWater / flow) * 60; // seconds

    // Validate if the farmer exists
    const farmer = await Farmer.findByPk(farmerId);
    if (!farmer) {
      return res.status(404).json({ error: "Farmer not found" });
    }

    console.log("Required water:", requiredWater);

    const soilAnalysis = await SoilAnalysis.create({
      farmerId: farmerId,
      humidity,
      flow,
      irrigation_duration: duration,
      moisture,
      water_required: requiredWater,
    });



    res.status(201).json({
      message: "Soil analysis data added successfully",
      soilAnalysis,
    });
  } catch (error) {
    console.error("Error adding soil analysis:", error);
    res.status(500).json({ error: "Failed to add soil analysis" });
  }
};

export const getSoilAnalysisReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate if the farmer exists
    const farmer = await Farmer.findByPk(id);
    if (!farmer) {
      return res.status(404).json({ error: "Farmer not found" });
    }

    // Fetch the latest soil analysis for the farmer
    const latestAnalysis = await SoilAnalysis.findOne({
      where: { farmerId: id },
      order: [['createdAt', 'DESC']],
    });

    if (!latestAnalysis) {
      return res
        .status(404)
        .json({ error: "No soil analysis data found for this farmer" });
    }

    // Generate report
    const { farmerId, humidity, flow, moisture } = latestAnalysis;

    // Identify the low nutrient (if any)
    const nutrientThresholds = {
      nitrogen: 20,
      phosphorus: 15,
      potassium: 15,
    };

    res.status(200).json({
      id,
      farmerName: farmer.name,
      location: farmer.location,
      cropType: farmer.cropType,
      moisture: moisture,
      humidity: humidity,
      flow: flow,
      irrigationDuration: latestAnalysis.irrigation_duration,
      waterRequired: latestAnalysis.water_required,
    });
  } catch (error) {
    console.error("Error generating soil analysis report:", error);
    res.status(500).json({ error: "Failed to generate soil analysis report" });
  }
};
