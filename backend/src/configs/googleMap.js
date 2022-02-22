const nodeGeocoder = require("node-geocoder");
import { envVariables } from "../configs";
const { API_GOOGLEMAP_KEY } = envVariables;
const options = {
  provider: "google",
  apiKey: API_GOOGLEMAP_KEY,
  formatter: null,
};

export const geocoder = nodeGeocoder(options);
