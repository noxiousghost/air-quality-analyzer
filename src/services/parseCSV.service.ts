import fs from 'fs/promises';
import csv from 'csv-parser';
import { Readable } from 'stream';
import AirReport from '../models/airReport.model';
import { ValidValuesUtil } from '../utils/validValues.util';
import { AppError } from '../middlewares/errorHandler.middleware';
import logger from '../configs/logger.config';

interface CSVRow {
  aqi: string;
  day: string;
  month: string;
  year: string;
}

export const processCsvAndSaveData = async (
  filePath: string,
): Promise<{ success: number; errors: string[] }> => {
  const results: CSVRow[] = [];
  const errors: string[] = [];
  let success = 0;

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    await new Promise<void>((resolve, reject) => {
      Readable.from(fileContent)
        .pipe(csv())
        .on('data', (data: CSVRow) => results.push(data))
        .on('end', () => resolve())
        .on('error', (error) => reject(error));
    });

    for (const row of results) {
      try {
        await validateAndSaveRow(row);
        success++;
      } catch (error) {
        if (error instanceof Error) {
          errors.push(`Row error: ${error.message}`);
        } else {
          errors.push('An unknown error occurred');
        }
      }
    }

    return { success, errors };
  } catch (error) {
    logger.error('Error processing CSV file:', error);
    throw new AppError('Failed to process CSV file', 500);
  }
};

const validateAndSaveRow = async (row: CSVRow): Promise<void> => {
  const { aqi, day, month, year } = row;
  const normalizedMonth = ValidValuesUtil.normalizeMonth(month);

  if (!normalizedMonth) {
    throw new Error(`Invalid month: ${month}`);
  }

  const numericAqi = parseInt(aqi, 10);
  const numericDay = parseInt(day, 10);
  const numericYear = parseInt(year, 10);

  if (!ValidValuesUtil.isValidAqi(numericAqi)) {
    throw new Error(`Invalid AQI: ${aqi}`);
  }

  if (
    !ValidValuesUtil.isValidDayForMonth(
      numericDay,
      normalizedMonth,
      numericYear,
    )
  ) {
    throw new Error(`Invalid day for month: ${day}`);
  }

  if (!ValidValuesUtil.isValidYear(numericYear)) {
    throw new Error(`Invalid year: ${year}`);
  }

  const existingRecord = await AirReport.findOne({
    day: numericDay,
    month: normalizedMonth,
    year: numericYear,
  });

  if (existingRecord) {
    throw new Error(`Duplicate record for ${normalizedMonth} ${day}, ${year}`);
  }

  const airReport = new AirReport({
    aqi: numericAqi,
    day: numericDay,
    month: normalizedMonth,
    year: numericYear,
  });

  await airReport.save();
};
