export class ArrayUtils {
  public static isIterable(obj: any): boolean {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }
}
