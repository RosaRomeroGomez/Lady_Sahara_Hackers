const YEARS = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

//Our range is Jun 2006 - Dec 2014
let dates = [];
for (var year = 0; year < YEARS.length; year++) {
    for (var month = 0; month < MONTHS.length; month++) {
        if (year == 0 && month <= 4) {
            continue;
        }
        dates.push({month: MONTHS[month], year: YEARS[year]});
    }
}