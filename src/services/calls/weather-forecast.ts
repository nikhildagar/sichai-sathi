import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import axios from "axios";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = date.getDate();
  const month = date.getMonth();
  const weekday = date.getDay();

  const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${weekdays[weekday]} ${day}${getDaySuffix(day)} ${months[month]}`;
}

export const weatherForecastResponse = async () => {
  try {
    const weatherResponse = await axios.get(
      `${process.env.BASE_URL}/api/v1/weather?lat=23&lon=77`
    );
    const forecasts = weatherResponse.data.forecasts;

    const result = forecasts
      .map((forecast: any) => {
        return `${formatDate(forecast.date)} ${
          forecast.weather
        } temperature is ${forecast.extra.main.temp} degree celcius.`;
      })
      .join("\n");

    const twiml = new VoiceResponse();
    twiml.say(
      {
        voice: "woman",
      },
      `Here is the weather forecast: ${result}`
    );
    console.log(`Here is the weather forecast: ${result}`);
    twiml.redirect(`${process.env.BASE_URL}/api/v1/ivr/main-menu-response`); 
    return twiml.toString(); // Convert VoiceResponse to a TwiML string if returning directly.
  } catch (error) {
    console.error("Error fetching weather data:", error);

    const twiml = new VoiceResponse();
    twiml.say(
      {
        voice: "woman",
      },
      "Sorry, we are unable to retrieve the weather forecast at the moment. Please try again later."
    );

    return twiml.toString();
  }
};
