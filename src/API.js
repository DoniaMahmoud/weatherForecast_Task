//Base URL
const base_url = "https://api.worldweatheronline.com/premium/v1/weather.ashx?";
const past_url =
  " http://api.worldweatheronline.com/premium/v1/past-weather.ashx?";
// Key things
const key = "f2f0e80fb66f4de5bcb130901222705";
const key_url = `key=${key}`;
export const GOOGLE_API_KEY = "AIzaSyD-a5-xthSeQduVxMiXrNiRugylnLIRbE4";
export const PAST_DATA_API = `${past_url}${key_url}`;
export const WEATHER_FINAL_API = `${base_url}${key_url}`;
export const GOOGLE_BASE_URL =
  "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
