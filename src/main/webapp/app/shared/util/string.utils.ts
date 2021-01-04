/** Utils concerning string manipulation. */
export abstract class StringUtils {
  /** Returns all substrings that match the given regex in a string.
   *  @param regex The regex to use.
   *  @param string The string to process. */
  public static findMatches(regex: RegExp, string: string): string[] {
    const matches = StringUtils.doFindMatches(new RegExp(regex.source, regex.flags.replace('g', '')), string, []);
    const result: any = [];
    for (const match of matches) {
      result.push(match[0]);
    }

    return result;
  }

  /** Returns all substrings that match the given regex in a string, with additional infos regarding their order and stuff.
   *  @param regex The regex to use.
   *  @param string The string to process.
   *  @param matches List of already found matches. */
  public static doFindMatches(regex: RegExp, string: string, matches: any[] = []): any[] {
    if (regex.test(string)) {
      const res = regex.exec(string);
      if (!!res) {
        matches.push(res);
        string = string.replace(regex, '');
        StringUtils.doFindMatches(regex, string, matches);
      }
    }
    return matches;
  }

  /** For a given string, replace every occurrence of a string by another one. Undefined values allowed.
   *  @param string The string to process.
   *  @param toReplace What to find and replace.
   *  @param toInsertInstead By what must they be replaced. */
  public static replaceAll(string: any, toReplace: any, toInsertInstead: any): string {
    if (
      string !== undefined &&
      string !== null &&
      toReplace !== undefined &&
      toReplace !== null &&
      toInsertInstead !== undefined &&
      toInsertInstead !== null &&
      typeof string === 'string'
    ) {
      string = string + '';
      toReplace = toReplace + '';
      toInsertInstead = toInsertInstead + '';

      let i = -1;
      while (
        // tslint:disable-next-line: no-conditional-assignment
        (i = string.toLowerCase().indexOf(toReplace, i >= 0 ? i + toInsertInstead.length : 0)) !== -1
      ) {
        string = string.substring(0, i) + toInsertInstead + string.substring(i + toReplace.length);
      }
    }

    return string;
  }
}
