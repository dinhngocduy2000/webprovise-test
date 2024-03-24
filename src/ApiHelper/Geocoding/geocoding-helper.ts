import { URL_ENUMS } from "../../libraries/Enum/url-enum";
import {
  GeocodingReqTypes,
  GeocodingResTypes,
} from "../../libraries/Types/Geocoding-types";
import { fetch } from "../api-config";
//fetching user-typed location and return the result (will handle error in the tsx file)

export const fetchUserLocation = async (data: GeocodingReqTypes) => {
  const res: GeocodingResTypes[] = await fetch(URL_ENUMS.GEOCODING_URL, data);
  console.log("CHECKING GEOCODING RES: ", res);
  return res;
};
