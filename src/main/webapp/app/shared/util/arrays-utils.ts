export class ArrayUtils {
  public static isIterable(obj: any): boolean {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

  public static toStringUsingField(array: any, field: string, separator = ', '): string {
    let result = '';
    if (ArrayUtils.isIterable(array)) {
      for (let i = 0; i < array.length; i++) {
        const item = array[i];
        const content = item[field];
        if (content !== undefined && content !== null) {
          result += content;
        }
        if (i !== array.length - 1) {
          result += separator;
        }
      }
    }
    return result;
  }
}
