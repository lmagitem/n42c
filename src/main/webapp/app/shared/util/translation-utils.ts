import { AppUserRights } from '../model/enumerations/app-user-rights.model';

export class TranslationUtils {
  public static getRightsTranslationPath(rights: AppUserRights | string): string {
    switch (rights) {
      case AppUserRights.MOD:
      case 'MOD':
        return 'n42cApp.AppUserRights.MOD';
      case AppUserRights.WRI:
      case 'WRI':
        return 'n42cApp.AppUserRights.WRI';
      case AppUserRights.REA:
      case 'REA':
      default:
        return 'n42cApp.AppUserRights.REA';
    }
  }
}
