import { Request, Response, NextFunction } from 'express';
import * as UploadFileService from '../services/uploadFile.service';
import { processCsvAndSaveData } from '../services/parseCSV.service';
import { AppError } from '../middlewares/errorHandler.middleware';
import logger from '../configs/logger.config';

export const processCSVFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const fileId = req.params.id;
    const file = await UploadFileService.findFileById(fileId);

    if (!file) {
      throw new AppError('File not found', 404);
    }

    const filePath = `${file.file}`;
    const result = await processCsvAndSaveData(filePath);

    res.status(200).json({
      message: 'CSV file processed successfully',
      successCount: result.success,
      errors: result.errors,
    });
  } catch (error) {
    logger.error('Error processing CSV file:', error);
    next(new AppError('Failed to process CSV file', 500));
  }
};
