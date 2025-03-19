import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

export const createMainMenu = () => {
  const twiml = new VoiceResponse();
  twiml.say(
    {
      voice: "woman",
    },
    "Good Wishes! Welcome to Sinchai Sathi."
  );

  twiml.pause({ length: 2 });

  twiml.say(
    {
      loop: 2,
      voice: "woman",
    },
    "Press 1 to know your soil analysis report. Press 2 for weather forecast."
  );

  twiml.gather({
    numDigits: 1,
    action: "/api/v1/ivr/main-menu-input", // Route to handle main menu input
  });
  return twiml;
};

export const mainMenuAction = (digit: string) => {
  console.log("User Input -> ", digit);
  const twiml = new VoiceResponse();

  // Soil Analysis Menu
  if (digit === "1") {
    twiml.say(
      "Press 1 for Soil Nutrition Information. Press 2 for Soil Moisture Information."
    );
    twiml.gather({
      numDigits: 1,
      action: "/api/v1/ivr/soil-analysis-menu-input", // Route to handle Soil Analysis submenu input
    });
  } 
  // Weather Forecast Menu
  else if (digit === "2") {
    twiml.redirect(`${process.env.BASE_URL}/api/v1/ivr/weather-forecast-response`);
  } 
  // Invalid Input
  else {
    twiml.say("Invalid input. Please try again.");
    twiml.redirect(`${process.env.BASE_URL}/api/v1/ivr/main-menu`); 
  }
  return twiml;
};

export const soilAnalysisMenuAction = (digit: string) => {
  console.log("Soil Analysis User Input -> ", digit);
  const twiml = new VoiceResponse();

  if (digit === "1") {
    twiml.say("Soil Nutrition Information: Your soil is rich in nitrogen but low in potassium.");
  } else if (digit === "2") {
    twiml.redirect("/api/v1/ivr/weather-forecast-response");
  } else {
    twiml.say("Invalid input. Returning to Soil Analysis Menu.");
    twiml.redirect("/api/v1/ivr/main-menu"); // Redirect back to main menu
  }
  return twiml;
};
