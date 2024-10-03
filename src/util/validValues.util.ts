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

export const isValidMonth = (month: string): month is ValidMonth => {
  const validMonths: ValidMonth[] = [
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
  ];
  return validMonths.includes(month as ValidMonth);
};

export const isValidAqi = (aqi: number): boolean => {
  return aqi >= 1 && aqi <= 500;
};
