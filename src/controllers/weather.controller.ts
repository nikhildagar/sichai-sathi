import { Request, Response } from "express";
import { getWeatherForecast } from "../services/weather.services";

export const fetchWeatherForecast = async (req: Request, res: Response) => {
  const { lat, lon } = req.query; // Location is passed as a query parameter

  if (!lat || !lon) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const forecasts = await getWeatherForecast(lat as string, lon as string);
    res.status(200).json({
      message: "Weather forecast fetched successfully",
      lat, lon,
      forecasts,
    });
  } catch (error) {
    if (error instanceof Error) {
      // Narrow down the error type to 'Error'
      res.status(500).json({ error: error.message });
    } else {
      // Handle unexpected error types
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
};

