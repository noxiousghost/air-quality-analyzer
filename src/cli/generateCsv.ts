import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const program = new Command();
program
  .option(
    '--month <month>',
    'Three-letter month abbreviation (e.g., jan, feb, mar)',
  )
  .option('--year <year>', 'Four-digit year (e.g., 2011)')
  .parse(process.argv);

const { month, year } = program.opts<{ month: string; year: string }>();

const validMonths = [
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
] as const;
type ValidMonth = (typeof validMonths)[number];

function isValidMonth(input: string): input is ValidMonth {
  return validMonths.includes(input.toLowerCase() as ValidMonth);
}

function isValidYear(year: string): boolean {
  const parsedYear = parseInt(year, 10);
  return !isNaN(parsedYear) && parsedYear >= 1000 && parsedYear <= 9999;
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDaysInMonth(month: ValidMonth, year: number): number {
  const daysInMonth = {
    jan: 31,
    feb: isLeapYear(year) ? 29 : 28,
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

  return daysInMonth[month];
}

if (!isValidMonth(month)) {
  console.error('invalid month');
  process.exit(1);
}

if (!isValidYear(year)) {
  console.error('invalid year');
  process.exit(1);
}

const numericYear = parseInt(year, 10);
const daysInMonth = getDaysInMonth(month, numericYear);

interface AirReport {
  aqi: number;
  day: number;
  month: ValidMonth;
  year: number;
}
const airReports: AirReport[] = [];
for (let day = 1; day <= daysInMonth; day++) {
  const aqi = Math.floor(Math.random() * 500) + 1;
  airReports.push({ aqi, day, month, year: numericYear });
}

const directoryPath = path.join(__dirname, '/sample_csv_files');
if (!fs.existsSync(directoryPath)) fs.mkdirSync(directoryPath);

const filePath = path.join(directoryPath, `${month}_${year}_aqi.csv`);
if (fs.existsSync(filePath)) {
  console.error('file already exists');
  process.exit(1);
}
const csvData = [
  'aqi,day,month,year',
  ...airReports.map(
    ({ aqi, day, month, year }) => `${aqi},${day},${month},${year}`,
  ),
].join('\n');

fs.writeFileSync(filePath, csvData, 'utf8');
console.log(`CSV file created successfully at ${filePath}`);
process.exit(0);
