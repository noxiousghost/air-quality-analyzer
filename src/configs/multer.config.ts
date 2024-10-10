import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { Request } from 'express';
import { AppError } from '../middlewares/errorHandler.middleware';

interface FileRequest extends Request {
  fileType?: string;
}

// File type validation
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedTypes = /csv/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    cb(new AppError('Invalid file type.', 415));
  }
};

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req: FileRequest, file: Express.Multer.File, cb) {
    const uploadPath = path.join('', 'uploads');
    fs.promises
      .mkdir(uploadPath, { recursive: true })
      .then(() => cb(null, uploadPath))
      .catch((err) => cb(err, uploadPath));
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    const newFileName = `${Date.now()}-${file.originalname.trim()}`;
    cb(null, newFileName);
  },
});

// for csv files
export const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1 GB limit
  fileFilter: fileFilter,
}).single('file');
