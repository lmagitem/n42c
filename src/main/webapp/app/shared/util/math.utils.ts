import { memoize } from '../decorators/memoize.decorator';

/** Utils concerning maths and the management of numbers. */
export abstract class MathUtils {
  /** Checks is the given value contains a finite number.
   *  @param n To be treated as a number, n must either be a primitive type number or a string containing an integer or decimal number (positive or negative) which must comply to this format: "-XXX.XXX". */
  public static isNumeric(n: any): boolean {
    n = typeof n === 'string' ? n.replace(new RegExp(/\s/g), '') : n;
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  /** Returns the nearest rounded value for a given number, between a minimum and a maximum and with an optional step.
   *  @param value The value to process.
   *  @param min The minimum value to return.
   *  @param max The maximum value to return.
   *  @param step An optional step to use.  */
  @memoize() public static getNearestValue(value: number, min: number, max: number, step = 1): number {
    if (!MathUtils.isNumeric(value)) {
      throw new Error(`The given value must be a number.`);
    }
    if (!MathUtils.isNumeric(min)) {
      throw new Error(`The given minimum must be a number.`);
    }
    if (!MathUtils.isNumeric(max)) {
      throw new Error(`The given maximum must be a number.`);
    }
    if (min >= max) {
      throw new Error(`The minimum must be lower than the maximum.`);
    }
    if (!MathUtils.isNumeric(step) || step <= 0) {
      throw new Error(`The step must be a positive number.`);
    }

    if (value <= max && value >= min) {
      value = Math.round(value / step) * step;
    } else {
      value = value > max ? max : min;
    }
    return value;
  }
}
