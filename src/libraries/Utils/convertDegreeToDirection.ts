export const convertDegreeToDirection = (degree: number): string => {
  switch (true) {
    case degree === 0 || degree === 360:
      return "North";
    case 0 < degree && degree < 90:
      return "North East";
    case degree === 90:
      return "East";
    case 90 < degree && degree < 180:
      return "South East";
    case degree === 180:
      return "South";
    case 180 < degree && degree < 270:
      return "South West";
    case degree === 270:
      return "West";
    case 270 < degree && degree < 360:
      return "North West";
    default:
      return "";
  }
};
