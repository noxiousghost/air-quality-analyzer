type ValidMonth =
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

export class ValidValuesUtil {
  private static readonly MIN_AQI = 1;
  private static readonly MAX_AQI = 500;
  private static readonly MIN_DAY = 1;
  private static readonly MAX_DAY = 31;
  private static readonly MIN_YEAR = 1000;
  private static readonly MAX_YEAR = 9999;

  // Valid months set for O(1) lookup time
  private static readonly validMonths: Set<ValidMonth> = new Set([
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
  ]);

  // validate AQI
  public static isValidAqi(aqi: number): boolean {
    return aqi >= ValidValuesUtil.MIN_AQI && aqi <= ValidValuesUtil.MAX_AQI;
  }

  // validate month
  public static isValidMonth(month: string): boolean {
    const lowerCaseMonth = month.toLowerCase();
    return ValidValuesUtil.validMonths.has(lowerCaseMonth as ValidMonth);
  }

  // converts any case to lowercase if valid month
  public static normalizeMonth(month: string): ValidMonth | null {
    const lowerCaseMonth = month.toLowerCase();
    return ValidValuesUtil.validMonths.has(lowerCaseMonth as ValidMonth)
      ? (lowerCaseMonth as ValidMonth)
      : null;
  }

  // validate day
  public static isValidDay(day: number): boolean {
    return day >= ValidValuesUtil.MIN_DAY && day <= ValidValuesUtil.MAX_DAY;
  }

  // validate year
  public static isValidYear(year: number): boolean {
    return year >= ValidValuesUtil.MIN_YEAR && year <= ValidValuesUtil.MAX_YEAR;
  }

  // validation for days based on the month
  public static isValidDayForMonth(
    day: number,
    month: ValidMonth,
    year: number,
  ): boolean {
    const daysInMonth = {
      jan: 31,
      feb: ValidValuesUtil.isLeapYear(year) ? 29 : 28,
      mar: 31,
      apr: 30,
      may: 31,
      jun: 30,
      jul: 31,
      aug: 31,
      sep: 30,
      oct: 31,
      nov: 30,
      dec: 31,
    };

    return day >= ValidValuesUtil.MIN_DAY && day <= daysInMonth[month];
  }

  // check if a year is a leap year
  private static isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
}
