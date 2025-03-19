import { Request, Response } from "express";
import { getWeatherForecast } from "../services/weather.services";
import { predictETC } from "../services/ETC.services";

export const ETChandler = async (req: Request, res: Response) => {
  const response = await predictETC();
  res.send(response);
};
