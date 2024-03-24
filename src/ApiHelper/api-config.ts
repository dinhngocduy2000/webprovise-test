import axios, { CancelTokenSource } from "axios";
import { URL_ENUMS } from "../libraries/Enum/url-enum";

const instance = axios.create({
  baseURL: URL_ENUMS.BASE_URL,
  timeout: 120 * 1000,
});
// boilerplate codes for axios get functions
async function fetch(url: string, params?: Object, source?: CancelTokenSource) {
  return instance
    .get(url, { params, cancelToken: source?.token })
    .then((res) => {
      console.log("RESPONSE :", res.data);
      // checkToken(res);
      return res.data;
    });
}
// later can add boilerplate code for post, delete, put if needed
export { fetch };
