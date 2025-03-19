import express from "express";
import { fetchWeatherForecast } from "../controllers/weather.controller";

const router = express.Router();

router.get("/", fetchWeatherForecast);

export default router;
