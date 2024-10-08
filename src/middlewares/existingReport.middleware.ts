import { Request, Response, NextFunction } from 'express';
import AirReport from '../models/airReport.model';
import { ValidValuesUtil } from '../utils/validValues.util';
import { AppError } from './errorHandler.middleware';

export const checkExistingReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { day, month, year } = req.body;

    const normalizedMonth = ValidValuesUtil.normalizeMonth(month);
    if (!normalizedMonth) {
      throw new AppError('Invalid month', 400);
    }

    const existingReport = await AirReport.findOne({
      day,
      month: normalizedMonth,
      year,
    });

    if (existingReport) {
      throw new AppError('Details for that particular date already exist', 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};
