export class Aggregations {
  public static getMonthlyReport(month: string, year: number) {
    return [
      {
        $match: { month, year },
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
                            '',
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
          month,
          year,
          avg: { $round: ['$avg', 0] },
          max: 1,
          min: 1,
          list: { $sortArray: { input: '$list', sortBy: { date: 1 } } },
        },
      },
    ];
  }

  public static getYearlyReport(year: number) {
    return [
      {
        $match: { year },
      },
      {
        $group: {
          _id: null,
          avg: { $avg: '$aqi' },
          max: { $max: '$aqi' },
          min: { $min: '$aqi' },
        },
      },
      {
        $project: {
          _id: 0,
          year,
          avg: { $round: ['$avg', 0] },
          max: 1,
          min: 1,
        },
      },
    ];
  }
}
