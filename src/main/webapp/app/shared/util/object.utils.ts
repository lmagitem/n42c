/** Utils concerning the manipulation of objects. */
export class ObjectUtils {
  /** Returns the content of the given object's property.
   *  @param path The property path to the obect's content (example: adress.zipCode).
   *  @param obj The object to process. */
  static resolveProperty(path: string, obj: any): any {
    return path.split('.').reduce((prev, curr) => {
      return prev ? prev[curr] : undefined;
    }, obj || self);
  }
}
