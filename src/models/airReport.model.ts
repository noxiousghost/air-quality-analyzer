import mongoose, { Document, Schema } from 'mongoose';
export interface IAirReport extends Document {
  aqi: number;
  day: number;
  month: string;
  year: number;
  savedDate: Date;
}

const airReportSchema = new Schema<IAirReport>({
  aqi: { type: Number, required: true, min: 1, max: 500 },
  day: { type: Number, required: true, min: 1, max: 31 },
  month: {
    type: String,
    required: true,
    enum: [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ],
    minlength: 3,
    maxlength: 3,
  },
  year: { type: Number, required: true, min: 1000, max: 9999 },
  savedDate: { type: Date, required: true, default: Date.now },
});

airReportSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v; // remove the version key from the output
  },
});

const AirReport = mongoose.model<IAirReport>('Air_Reports', airReportSchema);
export default AirReport;
