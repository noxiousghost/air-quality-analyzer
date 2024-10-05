import AirReport from '../models/airReport.model';
import logger from '../configs/logger.config';
export const seedAirReportData = async () => {
  const airReports = [];
  // change value for max day with respect to month i.e. 28 for feb and so on
  for (let day = 1; day <= 31; day++) {
    const aqi = Math.floor(Math.random() * (499 - 1 + 1)) + 1;
    const savedDate = new Date();
    const airReport = {
      aqi: aqi,
      day: day,
      //change to any valid month
      //should only be the first three letters of a month's name in lowercase
      month: 'oct',
      // change to any valid year
      year: 2024,
      savedDate: savedDate.toISOString(),
    };
    airReports.push(airReport);
  }

  try {
    await AirReport.insertMany(airReports);
    logger.info('Air reports successfully seeded!');
  } catch (error) {
    logger.error('Error seeding air report data:', error);
  }
};
