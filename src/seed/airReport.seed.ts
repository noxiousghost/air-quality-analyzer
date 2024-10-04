import AirReport from '../models/airReport.model';
import logger from '../configs/logger.config';
// Generate fake data for 31 days of October 2024
export const seedAirReportData = async () => {
  const airReports = [];

  for (let day = 1; day <= 31; day++) {
    const aqi = Math.floor(Math.random() * (499 - 1 + 1)) + 1;
    const savedDate = new Date();
    const airReport = {
      aqi: aqi,
      day: day,
      month: 'oct',
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
