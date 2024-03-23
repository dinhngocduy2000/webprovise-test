export const handleConvertToKPH = (meterPerHour: number): number => {
  return Math.trunc(meterPerHour * 3.6);
};
