import AirReport, { IAirReport } from '../models/airReport.model';
import { AppError } from '../middlewares/errorHandler.middleware';
import logger from '../configs/logger.config';
import { ValidValuesUtil } from '../util/validValues.util';
import { Aggregations } from '../util/aggregations.util';

export const getAllReport = async () => {
  const result = await AirReport.find({});
  if (!result) {
    throw new AppError('No reports found', 404);
  }
  return result;
};

export const saveReport = async (airData: IAirReport) => {
  const { aqi, day, month, year, savedDate } = airData;
  const normalizedMonth = ValidValuesUtil.normalizeMonth(month);

  if (!normalizedMonth) {
    throw new AppError('Invalid month', 400);
  }

  if (!ValidValuesUtil.isValidAqi(aqi)) {
    throw new AppError('Invalid AQI', 400);
  }

  if (!ValidValuesUtil.isValidDayForMonth(day, normalizedMonth, year)) {
    throw new AppError('Invalid Day', 400);
  }

  if (!ValidValuesUtil.isValidYear(year)) {
    throw new AppError('Invalid Year', 400);
  }

  const existingReport = await AirReport.findOne({
    day,
    month: normalizedMonth,
    year,
  });

  if (existingReport) {
    throw new AppError('Details for that particular date already exist', 400);
  }

  const airReport = new AirReport({
    aqi,
    day,
    month: normalizedMonth,
    year,
    savedDate,
  });
  const result = await airReport.save();
  if (!result) {
    throw new AppError('Values not saved', 400);
  }
  logger.info(`New report created`);
  return result;
};

export const AQIReport = async (queries: {
  month: string;
  year: string;
}): Promise<void> => {
  try {
    const { month, year } = queries;

    if (!year || typeof year !== 'string') {
      throw new AppError('Year is required.', 400);
    }

    const numericYear = parseInt(year, 10);
    if (!ValidValuesUtil.isValidYear(numericYear)) {
      throw new AppError('Invalid year format.', 400);
    }

    let aggregationPipeline;

    if (month && typeof month === 'string') {
      const normalizedMonth = ValidValuesUtil.normalizeMonth(month);
      if (!normalizedMonth) {
        throw new AppError('Invalid month format.', 400);
      }
      aggregationPipeline = Aggregations.getMonthlyReport(
        normalizedMonth,
        numericYear,
      );
    } else {
      aggregationPipeline = Aggregations.getYearlyReport(numericYear);
    }

    const result = await AirReport.aggregate(aggregationPipeline);
    if (result.length === 0) {
      throw new AppError("No data found for this period'.", 404);
    }

    return result[0];
  } catch (error) {
    throw new AppError(`${error}`, 500);
  }
};
