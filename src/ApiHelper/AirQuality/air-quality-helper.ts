import { URL_ENUMS } from "../../libraries/Enum/url-enum";
import {
  AirQualityReqType,
  AirQualityResType,
} from "../../libraries/Types/Air-quality-type";
import { fetch } from "../api-config";

//fetching air quality and return the result (will handle error in the tsx file)
export const fetchAirQualityCurrentDay = async (data: AirQualityReqType) => {
  const res: AirQualityResType = await fetch(URL_ENUMS.AIR_QUALITY, data);
  console.log("FETCH AIR QUALITY: ", res);
  return res;
};
