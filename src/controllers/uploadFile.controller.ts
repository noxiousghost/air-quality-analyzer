/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import * as fileService from '../services/uploadFile.service';

export const getAllFiles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const files = await fileService.findAllFiles();
    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

export const getFileById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const file = await fileService.findFileById(req.params.id);
    res.status(200).json(file);
  } catch (error) {
    next(error);
  }
};

export const saveFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const savedFile = await fileService.uploadFile(req.body, req.file);
    res.status(201).json({ message: 'File Uploaded', savedFile });
  } catch (error) {
    next(error);
  }
};

export const removeFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await fileService.deleteFile(req.params.id);
    res.status(204).json({ message: 'File deleted' });
  } catch (error) {
    next(error);
  }
};
