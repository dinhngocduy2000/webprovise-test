import { URL_ENUMS } from "../../libraries/Enum/url-enum";
import {
  GeocodingReqTypes,
  GeocodingResTypes,
} from "../../libraries/Types/Geocoding-types";
import { fetch } from "../api-config";

export const fetchUserLocation = async (data: GeocodingReqTypes) => {
  const res: GeocodingResTypes[] = await fetch(URL_ENUMS.GEOCODING_URL, data);
  console.log("CHECKING GEOCODING RES: ", res);
  return res;
};
