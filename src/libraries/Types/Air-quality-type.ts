export type AirQualityReqType = {
  lat: number;
  lon: number;
  appid: string;
};

export type AirQualityResType = {
  coord: {
    lon: number;
    lat: number;
  };
  list: AirQualityList[];
};

export type AirQualityList = {
  main: {
    aqi: 1 | 2 | 3 | 4 | 5;
  };
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
  dt: number;
};
