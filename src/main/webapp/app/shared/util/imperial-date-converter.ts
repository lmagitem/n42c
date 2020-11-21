import * as moment from 'moment';

/** Adds starting zeros in a string. */
const zeroPad = (num: number, places: number) => String(num).padStart(places, '0');

export class ImperialDateConverter {
  /** For a given date, returns a string containing the date converted in the Imperial Dating system. */
  public static convertToImperial(instant: Date, check?: number): string {
    if (this.isValidDate(instant)) {
      const yearFraction = ImperialDateConverter.calculateImperialFraction(instant);
      const year = ImperialDateConverter.calculateImperialYear(instant);
      const millenia = ImperialDateConverter.calculateImperialMillenia(instant);
      return (
        (check !== undefined && check !== null ? check + '.' : '') + zeroPad(yearFraction, 3) + '.' + zeroPad(year, 3) + '.M' + millenia
      );
    } else {
      return '????';
    }
  }

  /** For a given date, returns its year fraction in the Imperial Dating system. */
  public static calculateImperialFraction(instant: Date): number {
    const year = instant.getFullYear();
    const daysInYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 366 : 365;
    const hoursInYear = daysInYear * 24;
    const dayOfYear =
      (Date.UTC(instant.getFullYear(), instant.getMonth(), instant.getDate()) - Date.UTC(instant.getFullYear(), 0, 0)) /
        24 /
        60 /
        60 /
        1000 -
      1;
    const hourOfYear = dayOfYear * 24 + instant.getUTCHours();
    const yearFraction = Math.round((hourOfYear * 1000) / hoursInYear);
    return yearFraction;
  }

  /** For a given date, returns its year number without the thousands. */
  public static calculateImperialYear(instant: Date): number {
    return instant.getFullYear() % 1000;
  }

  /** For a given date, returns the millenia in which it is. */
  public static calculateImperialMillenia(instant: Date): number {
    return Math.ceil(instant.getFullYear() / 1000);
  }

  /** For a given Imperial date, returns a corresponding Date object. */
  public static convertToGregorian(fraction: number, imperialYear: number, millenia: number): Date {
    const year = (millenia - 1) * 1000 + imperialYear;
    const daysInYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 366 : 365;
    const hoursInYear = daysInYear * 24;
    const hourOfYear = (fraction * hoursInYear) / 1000;
    const dayOfYear = hourOfYear / 24;
    let hour = hourOfYear % 24;
    let minutes = Math.ceil(60 * (hour - Math.floor(hour)));
    hour = Math.floor(hour) + 1;
    minutes = hour > 23 ? 55 : minutes;
    hour = hour > 23 ? 23 : hour;
    return new Date(year, 0, Math.floor(dayOfYear) + 1, hour, minutes);
  }

  /** Is the given object a valid Date object? */
  public static isValidDate(date: any): boolean {
    return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
  }

  /** Is the given object a moment.Moment object? */
  public static isMoment(instant: any): boolean {
    return moment.isMoment(instant);
  }
}
