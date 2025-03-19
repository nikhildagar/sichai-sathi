import { createMainMenu, mainMenuAction } from "../services/calls/main-menu";
import { Request, Response } from "express";
import { weatherForecastResponse } from "../services/calls/weather-forecast";
import { soilAnalysisAction, createWaterAlert } from "../services/calls/soil-analysis-menu";

export const mainMenuInputHandler = (req: Request, res: Response) => {
  const digit = req.body?.Digits;
  const twiml = mainMenuAction(digit);
  res.type("text/xml");
  res.send(twiml.toString());
};

export const mainMenuHandler = (req: Request, res: Response) => {
  console.log("mainMenuHandler");
  const twiml = createMainMenu();
  res.type("text/xml");
  res.send(twiml.toString());
};

export const waterStatusAlertHandler = (req: Request, res: Response) => {
  const twiml = createWaterAlert();
  res.type("text/xml");
  res.send(twiml.toString());
};

export const weatherForecastHandler = async (req: Request, res: Response) => {
  try {
    const twiml = await weatherForecastResponse(); // Await the async response
    console.log("weatherForecastHandler", twiml);
    res.type("text/xml");
    res.send(twiml); // Directly send the resolved value (no `.toString()` needed here since `twiml` is already a string)
  } catch (error) {
    console.error("Error in weatherForecastHandler:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const soilReportInputHandler = (req: Request, res: Response) => {
  const digit = req.body?.Digits;
  const twiml = soilAnalysisAction(digit);
  res.type("text/xml");
  res.send(twiml.toString());
};