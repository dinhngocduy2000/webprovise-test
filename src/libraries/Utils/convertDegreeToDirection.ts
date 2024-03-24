//convert wind degree into direction
export const convertDegreeToDirection = (degree: number): string => {
  switch (true) {
    case degree === 0 || degree === 360:
      return "N";
    case 0 < degree && degree < 90:
      return "NE";
    case degree === 90:
      return "E";
    case 90 < degree && degree < 180:
      return "SE";
    case degree === 180:
      return "S";
    case 180 < degree && degree < 270:
      return "SW";
    case degree === 270:
      return "W";
    case 270 < degree && degree < 360:
      return "NW";
    default:
      return "";
  }
};
