import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PLACEHOLDER_CONTENT, PLACEHOLDER_NAME } from '../constants/localization.constants';
import { ArrayUtils } from './arrays-utils';

export interface IItemWithLocalizations {
  id: any;
  localizations: any[] | undefined;
}

export class LocalizationUtils {
  /** For a given item with an array of localizations, finds the most appropriate localization and returns it.
   *  @param item The item for which to return a localization.
   *  @param fieldToLocalize The field of the item for which to return a localization.
   *  @param currentLanguage The language in which the localization should be.
   */
  public static getLocalizedField(
    item: IItemWithLocalizations,
    fieldToLocalize: string,
    alternateFieldToLocalize: string | null | undefined,
    currentLanguage: string
  ): string {
    let result = '';

    if (item !== undefined && item !== null && item.localizations !== undefined && item.localizations !== null) {
      // If the placeholder is found, returns it
      if (item.localizations.length === 1 && item.localizations[0][fieldToLocalize] === PLACEHOLDER_NAME) {
        return PLACEHOLDER_CONTENT;
      }

      // Try to retreive the localization for the currently selected language, or the english localization, or any localization
      let localization = item.localizations.find(l => l['language']?.toLowerCase() === currentLanguage);
      if (localization === undefined) {
        localization = item.localizations.find(l => l['language']?.toLowerCase() === 'en');
      }
      if (localization === undefined) {
        localization = item.localizations.length > 0 ? item.localizations[0] : undefined;
      }

      // If something was found, returns it
      if (localization !== undefined) {
        result = localization[fieldToLocalize];
      }
    }

    // If there is no localization, try to take the value from the object itself instead
    if (result === '' && item !== undefined && item !== null) {
      result = item[fieldToLocalize] !== undefined && item[fieldToLocalize] !== null ? item[fieldToLocalize] : result;
    }

    // If there is still nothing but an alternate field has been given, try that one instead
    if (result === '' && alternateFieldToLocalize !== undefined && alternateFieldToLocalize !== null && alternateFieldToLocalize !== '') {
      result = LocalizationUtils.getLocalizedField(item, alternateFieldToLocalize, undefined, currentLanguage);
    }

    return result;
  }

  /** For each element of the given array of items with localizations, fills it with a dummy localization object that contains a placeholder
   *  in each required field.
   *  @param data An array of items that have an "id" and a "localizations" fields.
   *  @param fieldsToLocalize The fields to fill with a placeholder in the fake Localization object. */
  public static withPlaceholderLocalizations(data: IItemWithLocalizations[], fieldsToLocalize: string[]): any[] {
    data = ArrayUtils.isIterable(data) ? [...data] : [];
    if (data.length > 0) {
      const placeholder = {};
      if (fieldsToLocalize !== null) {
        fieldsToLocalize.forEach(f => (placeholder[f] = PLACEHOLDER_NAME));
      }
      data.forEach(item => (item.localizations = [placeholder]));
    }
    return data;
  }

  /** For each element of the given array of items, get its localizations from the server.
   *  @param data An array of items that have an "id" and a "localizations" fields.
   *  @param queryFor The function to call in order to get localizations corresponding to a list of ids from the server.
   *  @param localizedObjectFieldName The name of the field in the Localization object that is used to link it to the object it localizes. */
  public static refreshLocalizations(
    data: IItemWithLocalizations[] | null,
    queryFor: (ids: any[]) => Observable<HttpResponse<any[]>>,
    localizedObjectFieldName: string
  ): void {
    if (data !== undefined && data !== null && data.length > 0) {
      const ids: any[] = [];
      // Get the ids for which to get localizations
      data.forEach(item => {
        if (item.id !== undefined && item.id !== null) {
          ids.push(item.id);
        }
      });
      // Get localizations and fill data with them
      queryFor(ids).subscribe((res: HttpResponse<any[]>) => {
        data.forEach(item => (item.localizations = []));
        res.body?.forEach(localization => {
          const toFill = data.find(item => item.id === localization[localizedObjectFieldName]?.id);
          if (toFill !== undefined) {
            toFill.localizations =
              toFill.localizations !== undefined && toFill.localizations !== null && toFill.localizations.length > 0
                ? [...toFill.localizations, localization]
                : [localization];
          }
        });
      });
    }
  }
}
