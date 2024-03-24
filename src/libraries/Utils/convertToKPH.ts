//convert from meter per sec to Kilometer per hour
export const handleConvertToKPH = (meterPerSec: number): number => {
  return Math.trunc(meterPerSec * 3.6);
};
