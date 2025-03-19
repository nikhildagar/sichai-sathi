import axios from "axios";
import { getWeatherForecast, WeatherForecast } from "./weather.services";

// interface ETCData {

// }

interface ETCData {
  "Temp Min (°C)": number;
  "Temp Max (°C)": number;
  "Rainfall (mm)": number;
  "Wind Speed (m/s)Wind Speed (m/s)": number;
  "Solar Radiation (MJ/m²)": number;
  Is_Raining: number;
  Growth_Phase_Reproductive: number;
  Growth_Phase_Seeding: number;
  Growth_Phase_Vegetative: number;
  DAS: number;
  Kc: number;
  DayOfYear_sin: number;
  DayOfYear_cos: number;
  "ETo (mm/day)": number;
  "Humidity (%)": number;
  Temp_Range: number;
}

const growthStage = (stage: ETCData) => {
  if (stage["DAS"] > 0 && stage["DAS"] < 14) {
    stage["Growth_Phase_Seeding"] = 1;
    stage["Kc"] = 0.4;
  } else if (stage["DAS"] > 14 && stage["DAS"] < 42) {
    stage["Growth_Phase_Vegetative"] = 1;
    stage["Kc"] = 0.7;
  } else if (stage["DAS"] > 42 && stage["DAS"] < 105) {
    stage["Growth_Phase_Reproductive"] = 1;
    stage["Kc"] = 1.1;
  }
  return stage;
};
export const predictETC = async () => {
  const lat = "23.184277";
  const lon = "77.32742";

  // Fetch weather data
  const weatherData: WeatherForecast[] = await getWeatherForecast(lat, lon);

  // Build weatherETCData with sanitized values
  const weatherETCData: ETCData = {
    "Temp Min (°C)": weatherData[0]?.extra?.main?.temp_min || 0,
    "Temp Max (°C)": weatherData[0]?.extra?.main?.temp_max || 0,
    "Rainfall (mm)": weatherData[0]?.weather?.main?.includes("Rain") ? 3 : 0,
    "Wind Speed (m/s)Wind Speed (m/s)": weatherData[0]?.extra?.wind?.speed || 0,
    "Solar Radiation (MJ/m²)": 20,
    Is_Raining: weatherData[0]?.weather?.main?.includes("Rain") ? 1 : 0,
    Growth_Phase_Reproductive: 0,
    Growth_Phase_Seeding: 0,
    Growth_Phase_Vegetative: 1,
    DAS: 20,
    Kc: 0,
    DayOfYear_sin: 0.5,
    DayOfYear_cos: 0.86,
    "ETo (mm/day)": 5.0,
    "Humidity (%)": 60,
    Temp_Range: 15,
  };

  // Optional: Log sanitized data
  console.log(
    "Sanitized weatherETCData:",
    JSON.stringify(weatherETCData, null, 2)
  );

  // Make prediction request
  try {
    const prediction = await axios.post(
      "https://sinchaisathi-ai.onrender.com/predict",
      weatherETCData,
      { headers: { "Content-Type": "application/json" } }
    );
    return prediction.data;
  } catch (error) {
    console.error("Error making prediction request:", error);
    throw error;
  }
};
