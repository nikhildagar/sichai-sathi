import dotenv from "dotenv";
import express from "express";
import { syncDb } from "./utils/sequelize";
import FarmerRouter from "./routes/farmer.routes";
import ScheduleRouter from "./routes/schedule.routes";
import IrrigationRouter from "./routes/irrigation.routes";
import SoilRouter from "./routes/soil.routes";
import AlertRouter from "./routes/alert.routes";
import WeatherRouter from "./routes/weather.routes";
import IVRRouter from "./routes/ivr.routes";
import ESPRouter from "./routes/esp.routes";
import { Twilio } from "twilio";
import { ETChandler } from "./controllers/ETC.controller";

dotenv.config();
syncDb();
const app = express();

export const twilioClient = new Twilio(
  process.env.TWILIO_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_, res) => res.send("Welcome to Sichai Sathi APIv1 /api/v1"));
app.use("/api/v1/farmer", FarmerRouter);
app.use("/api/v1/irrigation/schedule", ScheduleRouter);
app.use("/api/v1/irrigation", IrrigationRouter);
app.use("/api/v1/alert", AlertRouter);
app.use("/api/v1/weather", WeatherRouter);
app.use("/api/v1/soil", SoilRouter);
app.use("/api/v1/ivr", IVRRouter);
app.use("/api/v1/etc", ETChandler);
app.use("/api/v1/esp", ESPRouter);

if (!process.env.PORT) console.log("PORT not defined");

app.post("/moisture", (req, res) => {
  console.log("Received Moisture Data", req.body.moisture);
  res.send("Noted");
});

app.listen(process.env.PORT, () => {
  syncDb();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
