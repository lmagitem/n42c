import * as memoizee from 'memoizee';
/* eslint prefer-rest-params: 0 */

/** Enables to use memoization on a pure function.
 *  @description This remembers the function's result for the given parameters, and reuse that result instead of calling the function each time it finds the same values as parameters. Allows to reduce the needed processing power and have faster results by processing only once each combination of parameters, but does so by using memory space.
 *  @remarks Memoization only works with primitive type parameters. If complex objects are passed as parameters, they'll be used by the function but won't be remembered by the decorator. Example: It will consider that `calculate(1, 4, { base: 13 })` is the same as `calculate(1, 4, { base: 10 })` */
export function memoize(): <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void {
  return (target: any, key: any, descriptor: any): any => {
    const oldFunction = descriptor.value;
    const newFunction = memoizee(oldFunction);
    descriptor.value = function (): any {
      return newFunction.apply(this, arguments);
    };
  };
}
