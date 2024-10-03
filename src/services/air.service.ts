import Air, { IAir } from '../models/air.model';
import { AppError } from '../middlewares/errorHandler.middleware';
import logger from '../configs/logger.config';
import { isValidMonth } from '../util/validMonth.util';
export const getAllReport = async () => {
  const result = await Air.find({});
  if (!result) {
    throw new AppError('No reports found', 404);
  }
  return result;
};

export const saveReport = async (airData: IAir) => {
  const { aqi, day, month, year, savedDate } = airData;
  const normalizedMonth = month.toLowerCase();
  if (!isValidMonth(normalizedMonth)) {
    throw new AppError('Invalid month', 400);
  }
  if (
    (await Air.findOne({ day })) &&
    (await Air.findOne({ month })) &&
    (await Air.findOne({ year }))
  ) {
    throw new AppError('Details for that particular date already exists', 400);
  }
  const air = new Air({
    aqi,
    day,
    month: normalizedMonth,
    year,
    savedDate,
  });
  const result = await air.save();
  if (!result) {
    throw new AppError('Values not saved', 400);
  }
  logger.info(`New report created`);
  return result;
};
