import { twilioClient } from "../../app";

export const makeCall = async (toPhoneNumber: string) => {
  return await twilioClient.calls.create({
    url: `${process.env.BASE_URL}/api/v1/ivr/main-menu-response`,
    to: toPhoneNumber,
    from: process.env.TWILIO_PHONE_NUMBER as string,
  });
};

export const alertPumpStatus = async (toPhoneNumber: string) => {
  return await twilioClient.calls.create({
    url: `${process.env.BASE_URL}/api/v1/ivr/water-status-alert`,
    to: toPhoneNumber,
    from: process.env.TWILIO_PHONE_NUMBER as string,
  });
};