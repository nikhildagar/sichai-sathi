import { Request, Response } from "express";
import { predictETC } from "../services/ETC.services";
import { alertPumpStatus, makeCall } from "../services/calls/call";
import { Farmer } from "../models/Farmer";
import { SoilAnalysis } from "../models/Soil";
import axios from "axios";

// In-memory store to track last notification time (keyed by phone number or user ID)
const notificationTimestamps: Map<string, number> = new Map();

export const getSensorData = async (req: Request, res: Response) => {
  const sensorData = req.body;

  // Log incoming sensor data
  console.log("Received sensor data:", sensorData);

  try {
    // Calculate required water and duration
    const predicted = await predictETC();
    const flow = sensorData.flow || 1; // Prevent division by zero
    const requiredWater = predicted["ETc (mm/day)"] * 4046 * 1000; // ml
    const duration = flow > 0 ? (requiredWater / flow) * 60 : 0; // seconds
    const sanitizedDuration = Math.min(Math.max(duration, 0), Number.MAX_SAFE_INTEGER); // Constrain to valid range

    // Notification logic (unchanged)
    const phoneNumber = "+917011019182";
    const now = Date.now();
    const lastNotificationTime = notificationTimestamps.get(phoneNumber);

    if (!lastNotificationTime || now - lastNotificationTime >= 10 * 60 * 1000) {
      alertPumpStatus(phoneNumber);
      notificationTimestamps.set(phoneNumber, now);
      console.log("Notification sent to", phoneNumber);
    } else {
      console.log("Notification skipped. Last notification was sent less than 10 minutes ago.");
    }

    // Save soil analysis
    const soilAnalysisData = {
      farmerId: sensorData.farmerId,
      moisture: sensorData.moisture,
      humidity: sensorData.humidity,
      flow,
      irrigation_duration: sanitizedDuration,
      water_required: requiredWater,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const soilAnalysisCreated = await axios.post(
      `${process.env.BASE_URL}/api/v1/soil/save`,
      soilAnalysisData
    );

    console.log("Soil analysis created:", soilAnalysisCreated.data);
    res.status(201).json(soilAnalysisCreated.data);
  } catch (error) {
    console.error("Error adding soil analysis:", error);
    res.status(500).json({ error: "Failed to add soil analysis" });
  }
};

export const resetNotificationLimit = () => {
  const phoneNumber = "+917011019182";
  if (phoneNumber) {
    // Reset the notification timestamp for the specific phone number
    if (notificationTimestamps.has(phoneNumber)) {
      notificationTimestamps.delete(phoneNumber);
      console.log(`Notification limit reset for phone number: ${phoneNumber}`);
    } else {
      console.log(
        `No notification limit found for phone number: ${phoneNumber}`
      );
    }
  } else {
    // Clear the entire map
    notificationTimestamps.clear();
    console.log("Notification limits reset for all phone numbers.");
  }
};

export const sendPumpAction = async (req: Request, res: Response) => {
  const predicted = await predictETC();
  const flow = 6000; // ml per minute
  const requiredWater = predicted["ETc (mm/day)"] * 4046 * 1000; // ml
  const duration = (requiredWater / flow) * 60; // seconds
  const power = 1;
  const data = { duration, power };
  return res.status(200).json(data);
  // Query DB for etc value
  // calculate power and duration
  // send to ESP
};
