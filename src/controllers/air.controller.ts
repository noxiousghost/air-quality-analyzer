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
    console.log('fuckkkkk');
    next(error);
  }
};

export const createReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await AirService.saveReport(req.body);
    res.status(201).json({ message: 'report created successfully' });
  } catch (error) {
    next(error);
  }
};
