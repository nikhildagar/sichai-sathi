import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export interface WeatherForecast {
  date: string;
  temperature: number;
  extra: {
    main: {
      temp_min: number;
      temp_max: number;
    };
    wind: {
      speed: number;
    };
  };
  weather: {
    main: string;
  };
}

export const getWeatherForecast = async (
  lat: string,
  lon: string
): Promise<WeatherForecast[]> => {
  if (!API_KEY) {
    throw new Error(
      "API key for OpenWeatherMap is missing. Please set it in the environment variables."
    );
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        location: "New York",
        units: "metric", // Use "imperial" for Fahrenheit
        appid: API_KEY,
      },
    });

    const data = response.data;

    // Process the forecast for the next 5 days (grouped by day)
    const forecasts: WeatherForecast[] = data.list
      .filter((item: any, index: number) => index % 8 === 0) // Filter to approximately one reading per day
      .slice(0, 5) // Limit to 5 days
      .map((item: any) => ({
        date: item.dt_txt.split(" ")[0],
        weather: item.weather[0].description,
        extra: { ...item },
      }));

    return forecasts;
  } catch (error) {
    console.error("Error fetching weather data:", error);

    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Weather API error: ${error.response.status} ${error.response.statusText}`
      );
    }

    throw new Error(
      "Failed to fetch weather forecast. Please check the location or try again later."
    );
  }
};
