import { Request, Response, NextFunction } from 'express';
import * as AirService from '../services/air.service';

export const allReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const air = await AirService.getAllReport();
    res.status(200).json(air);
  } catch (error) {
    next(error);
  }
};

export const createReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AirService.saveReport(req.body);
    res.status(201).json({ message: 'report created successfully', result });
  } catch (error) {
    next(error);
  }
};

export const getMonthlyReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { month, year } = req.query as { month: string; year: string };
    const result = await AirService.monthlyReport({ month, year });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
