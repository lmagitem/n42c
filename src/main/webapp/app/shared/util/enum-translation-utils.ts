import {AppUserRights} from '../model/enumerations/app-user-rights.model';
import {NinthGameType} from '../model/enumerations/ninth-game-type.model';

export class EnumTranslationUtils {
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

  public static getGameTypeTranslationPath(type: NinthGameType | string): string {
    switch (type) {
      case NinthGameType.OP:
      case 'OP':
        return 'n42cApp.NinthGameType.OP';
      case NinthGameType.MP:
      case 'MP':
        return 'n42cApp.NinthGameType.MP';
      case NinthGameType.CR:
      case 'CR':
        return 'n42cApp.NinthGameType.CR';
      case NinthGameType.NG:
      case 'NG':
      default:
        return 'n42cApp.NinthGameType.NG';
    }
  }
}
