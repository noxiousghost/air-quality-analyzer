import UploadFile from '../models/uploadFile.model';
import { AppError } from '../middlewares/errorHandler.middleware';
import { IUploadFile } from '../models/uploadFile.model';
import logger from '../configs/logger.config';
import path from 'path';
import fs from 'fs';

export const findAllFiles = async () => {
  const result = await UploadFile.find({});
  if (!result) {
    throw new AppError('Unknown error', 404);
  }
  if (result.length === 0) {
    throw new AppError("No data found'.", 404);
  }
  return result;
};

export const findFileById = async (id: string) => {
  const result = await UploadFile.findById(id);
  if (!result) {
    throw new AppError('File not found', 404);
  }
  return result;
};

export const uploadFile = async (
  fileData: IUploadFile,
  file: Express.Multer.File,
) => {
  let filePath;
  const { path } = file;
  if (path) {
    filePath = path.replace('public', '');
  }
  const uploadFile = await new UploadFile({
    title: fileData.title,
    file: filePath,
  });
  const result = await await uploadFile.save();
  if (!result) {
    throw new AppError('File not uploaded', 400);
  }
  logger.info(`${result.title} file saved`);
  return result;
};

export const deleteFile = async (id: string) => {
  const fileExists = await UploadFile.findById(id);
  if (!fileExists) {
    throw new AppError('File not found', 404);
  }
  const deletePath = path.join('public', fileExists.file);
  if (fs.existsSync(deletePath)) {
    fs.rmSync(deletePath); // delete the file
  } else {
    logger.warn('File not found, skipping its deletion');
  }
  const result = await UploadFile.findByIdAndDelete(id);
  if (!result) {
    throw new AppError('File not deleted', 400);
  }
  logger.info(`${result.title} file deleted`);
  return result;
};
