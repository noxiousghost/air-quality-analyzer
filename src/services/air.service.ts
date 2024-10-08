import AirReport, { IAirReport } from '../models/airReport.model';
import { AppError } from '../middlewares/errorHandler.middleware';
import logger from '../configs/logger.config';
import { ValidValuesUtil } from '../util/validValues.util';

export const getAllReport = async () => {
  const result = await AirReport.find({});
  if (!result) {
    throw new AppError('No reports found', 404);
  }
  return result;
};

export const saveReport = async (airData: IAirReport) => {
  const { aqi, day, month, year, savedDate } = airData;
  const normalizedMonth = ValidValuesUtil.normalizeMonth(month);

  if (!normalizedMonth) {
    throw new AppError('Invalid month', 400);
  }

  if (!ValidValuesUtil.isValidAqi(aqi)) {
    throw new AppError('Invalid AQI', 400);
  }

  if (!ValidValuesUtil.isValidDayForMonth(day, normalizedMonth, year)) {
    throw new AppError('Invalid Day', 400);
  }

  if (!ValidValuesUtil.isValidYear(year)) {
    throw new AppError('Invalid Year', 400);
  }

  if (
    (await AirReport.findOne({ day })) &&
    (await AirReport.findOne({ month: normalizedMonth })) &&
    (await AirReport.findOne({ year }))
  ) {
    throw new AppError('Details for that particular date already exists', 400);
  }

  const airReport = new AirReport({
    aqi,
    day,
    month: normalizedMonth,
    year,
    savedDate,
  });
  const result = await airReport.save();
  if (!result) {
    throw new AppError('Values not saved', 400);
  }
  logger.info(`New report created`);
  return result;
};

export const monthlyReport = async (queries: {
  month: string;
  year: string;
}) => {
  const { month, year } = queries;
  if (
    !month ||
    !year ||
    typeof month !== 'string' ||
    typeof year !== 'string'
  ) {
    throw new AppError('Month and year are required.', 400);
  }

  const normalizedMonth = ValidValuesUtil.normalizeMonth(month);
  if (!normalizedMonth) {
    throw new AppError('Invalid month format.', 400);
  }

  const numericYear = parseInt(year, 10);
  if (!ValidValuesUtil.isValidYear(numericYear)) {
    throw new AppError('Invalid year format.', 400);
  }

  const aggregationPipeline = [
    {
      $match: {
        month: normalizedMonth,
        year: numericYear,
      },
    },
    {
      $group: {
        _id: null,
        avg: { $avg: '$aqi' },
        max: { $max: '$aqi' },
        min: { $min: '$aqi' },
        list: {
          $push: {
            date: {
              $dateToString: {
                format: '%d/%m/%Y',
                date: {
                  $dateFromParts: {
                    year: '$year',
                    month: {
                      $indexOfArray: [
                        [
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
                        '$month',
                      ],
                    },
                    day: '$day',
                  },
                },
              },
            },
            aqi: '$aqi',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: normalizedMonth,
        year: numericYear,
        avg: { $round: ['$avg', 0] },
        max: 1,
        min: 1,
        list: { $sortArray: { input: '$list', sortBy: { date: 1 } } },
      },
    },
  ];

  const result = await AirReport.aggregate(aggregationPipeline);
  if (result.length === 0) {
    throw new AppError("No data found for this month and year'.", 404);
  }

  return result[0];
};
