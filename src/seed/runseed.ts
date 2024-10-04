import { seedAirReportData } from './airReport.seed';
import DbConnection from '../configs/db.config';
import logger from '../configs/logger.config';

const seedDatabase = async () => {
  try {
    await DbConnection();
    await seedAirReportData();
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedDatabase();
