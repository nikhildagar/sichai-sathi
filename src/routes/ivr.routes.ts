import express from "express";
import {
  mainMenuHandler,
  mainMenuInputHandler,
  weatherForecastHandler,
  soilReportInputHandler,
  waterStatusAlertHandler
} from "../controllers/ivr.controller";
import { makeCall } from "../services/calls/call";

const router = express.Router();

// Main Menu Routes
router.post("/main-menu-response", mainMenuHandler);
router.post("/main-menu-input", mainMenuInputHandler);
router.post("/call", (req, res) => {
  makeCall(req.body.phoneNumber);
});

// Soil Analysis Menu Routes
router.post("/soil-analysis-menu-input", soilReportInputHandler);

// Weather Forecast Response
router.post("/weather-forecast-response", weatherForecastHandler);

// ALert -> water pump status
router.post("/water-status-alert", waterStatusAlertHandler);

export default router;
