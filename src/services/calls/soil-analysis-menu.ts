import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

export const soilAnalysisAction = (digit: string) => {
  const twiml = new VoiceResponse();

  if (digit === "1") {
    twiml.say(
      "Soil Nutrition Information: Your soil is rich in nitrogen but low in potassium."
    );
    twiml.redirect(`${process.env.BASE_URL}/api/v1/ivr/main-menu-response`); 

  } else if (digit === "2") {
    twiml.say("Your fields has sufficient moisture and humidity.");
    twiml.redirect(`${process.env.BASE_URL}/api/v1/ivr/main-menu-response`); 

  } else {
    twiml.say("Invalid input. Returning to Soil Analysis Menu.");
    twiml.redirect(`${process.env.BASE_URL}/api/v1/ivr/main-menu-response`); 

  }
  return twiml;
};

export const createWaterAlert = () => {
  const twiml = new VoiceResponse();
  twiml.say(
    {
      voice: "woman",
      loop: 2
    },
    "Low water level detected in your field, we have turned on the motor to irrigate the field."
  );

  twiml.pause({ length: 2 });
  return twiml;
};