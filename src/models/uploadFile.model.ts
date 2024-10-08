import mongoose, { Document, Schema } from 'mongoose';

export interface IUploadFile extends Document {
  title?: string;
  file: string;
  addedDate: Date;
}

const uploadFileSchema = new Schema<IUploadFile>({
  title: { type: String },
  file: { type: String, required: true },
  addedDate: {
    type: Date,
    default: Date.now,
  },
});

uploadFileSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v; // remove the version key from the output
  },
});

const UploadFile = mongoose.model<IUploadFile>('csvFiles', uploadFileSchema);

export default UploadFile;
