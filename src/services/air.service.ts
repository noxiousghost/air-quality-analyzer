import AirReport, { IAirReport } from '../models/airReport.model';
import { AppError } from '../middlewares/errorHandler.middleware';
import logger from '../configs/logger.config';
import { ValidValuesUtil } from '../util/validValues.util';

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

  if (
    (await AirReport.findOne({ day })) &&
    (await AirReport.findOne({ month: normalizedMonth })) &&
    (await AirReport.findOne({ year }))
  ) {
    throw new AppError('Details for that particular date already exists', 400);
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
