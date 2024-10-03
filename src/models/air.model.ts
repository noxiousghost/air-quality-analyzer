import mongoose, { Document, Schema } from 'mongoose';

export interface IAir extends Document {
  aqi: number;
  day: number;
  month:
    | 'jan'
    | 'feb'
    | 'mar'
    | 'apr'
    | 'may'
    | 'jun'
    | 'jul'
    | 'aug'
    | 'sep'
    | 'oct'
    | 'nov'
    | 'dec';
  year: number;
  savedDate: Date;
}

const airSchema = new Schema<IAir>({
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
airSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v; // remove the version key from the output
  },
});

const Air = mongoose.model<IAir>('Air', airSchema);
export default Air;
