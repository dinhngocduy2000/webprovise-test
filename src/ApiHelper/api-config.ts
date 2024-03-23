import axios, { CancelTokenSource } from "axios";
import { URL_ENUMS } from "../libraries/Enum/url-enum";

// export const
const instance = axios.create({
  baseURL: URL_ENUMS.BASE_URL,
  timeout: 120 * 1000,
});

async function fetch(url: string, params?: Object, source?: CancelTokenSource) {
  return instance
    .get(url, { params, cancelToken: source?.token })
    .then((res) => {
      console.log("RESPONSE :", res.data);
      // checkToken(res);
      return res.data;
    });
}

export { fetch };
