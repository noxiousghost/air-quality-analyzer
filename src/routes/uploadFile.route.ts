import { Router } from 'express';
import * as uploadFileController from '../controllers/uploadFile.controller';
import { uploadFile } from '../configs/multer.config';
import { setFileType } from '../middlewares/setFileType.middleware';
import { processCSVFile } from '../controllers/parseCSV.controller';

const uploadFileRouter = Router();

uploadFileRouter.get('/', uploadFileController.getAllFiles);
uploadFileRouter.get('/:id', uploadFileController.getFileById);
uploadFileRouter.post(
  '/upload',
  uploadFile,
  setFileType,
  uploadFileController.saveFile,
);

uploadFileRouter.delete('/:id', uploadFileController.removeFile);

uploadFileRouter.post('/process/:id', processCSVFile);

export default uploadFileRouter;
