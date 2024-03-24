import moment from "moment";

//check if both dates are the same day
export const handleCheckIfSameDay = (
  currentDay: number,
  dateNeedCompare: number
): boolean => {
  return moment.unix(currentDay).isSame(moment.unix(dateNeedCompare), "d");
};
