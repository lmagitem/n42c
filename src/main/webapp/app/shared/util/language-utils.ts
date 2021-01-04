import { Language } from '../model/enumerations/language.model';

export class LanguageUtils {
  public static getLanguageEnumArray(): Language[] {
    return [
      Language.EN,
      Language.FR,
      Language.AR,
      Language.ZH,
      Language.DA,
      Language.NL,
      Language.FI,
      Language.DE,
      Language.EL,
      Language.HU,
      Language.IS,
      Language.ID,
      Language.GA,
      Language.IT,
      Language.JA,
      Language.KO,
      Language.FA,
      Language.PL,
      Language.PT,
      Language.RO,
      Language.RU,
      Language.SR,
      Language.ES,
      Language.SV,
      Language.TR,
    ];
  }

  public static getLanguageKeyArray(): string[] {
    return LanguageUtils.getLanguageEnumArray().map((e: Language) => LanguageUtils.getLanguageKeyFromName(e));
  }

  public static getLanguageEnumFromName(lang: string): Language {
    switch (lang) {
      case 'English':
        return Language.EN;
      case 'French':
        return Language.FR;
      case 'Arabic':
        return Language.AR;
      case 'Chinese':
        return Language.ZH;
      case 'Danish':
        return Language.DA;
      case 'Dutch':
        return Language.NL;
      case 'Finnish':
        return Language.FI;
      case 'German':
        return Language.DE;
      case 'Greek':
        return Language.EL;
      case 'Hungarian':
        return Language.HU;
      case 'Icelandic':
        return Language.IS;
      case 'Indonesian':
        return Language.ID;
      case 'Irish':
        return Language.GA;
      case 'Italian':
        return Language.IT;
      case 'Japanese':
        return Language.JA;
      case 'Korean':
        return Language.KO;
      case 'Persian':
        return Language.FA;
      case 'Polish':
        return Language.PL;
      case 'Portuguese':
        return Language.PT;
      case 'Romanian':
        return Language.RO;
      case 'Russian':
        return Language.RU;
      case 'Serbian':
        return Language.SR;
      case 'Spanish':
        return Language.ES;
      case 'Swedish':
        return Language.SV;
      case 'Turkish':
        return Language.TR;
      default:
        return Language.EN;
    }
  }

  public static getLanguageEnumFromKey(lang: string): Language {
    switch (lang.toLowerCase()) {
      case 'en':
        return Language.EN;
      case 'fr':
        return Language.FR;
      case 'ar':
        return Language.AR;
      case 'zh':
        return Language.ZH;
      case 'da':
        return Language.DA;
      case 'nl':
        return Language.NL;
      case 'fi':
        return Language.FI;
      case 'de':
        return Language.DE;
      case 'el':
        return Language.EL;
      case 'hu':
        return Language.HU;
      case 'is':
        return Language.IS;
      case 'id':
        return Language.ID;
      case 'ga':
        return Language.GA;
      case 'it':
        return Language.IT;
      case 'ja':
        return Language.JA;
      case 'ko':
        return Language.KO;
      case 'fa':
        return Language.FA;
      case 'pl':
        return Language.PL;
      case 'pt':
        return Language.PT;
      case 'ro':
        return Language.RO;
      case 'ru':
        return Language.RU;
      case 'sr':
        return Language.SR;
      case 'es':
        return Language.ES;
      case 'sv':
        return Language.SV;
      case 'tr':
        return Language.TR;
      default:
        return Language.EN;
    }
  }

  public static getLanguageKeyFromName(lang: string): string {
    switch (lang) {
      case 'English':
        return 'EN';
      case 'French':
        return 'FR';
      case 'Arabic':
        return 'AR';
      case 'Chinese':
        return 'ZH';
      case 'Danish':
        return 'DA';
      case 'Dutch':
        return 'NL';
      case 'Finnish':
        return 'FI';
      case 'German':
        return 'DE';
      case 'Greek':
        return 'EL';
      case 'Hungarian':
        return 'HU';
      case 'Icelandic':
        return 'IS';
      case 'Indonesian':
        return 'ID';
      case 'Irish':
        return 'GA';
      case 'Italian':
        return 'IT';
      case 'Japanese':
        return 'JA';
      case 'Korean':
        return 'KO';
      case 'Persian':
        return 'FA';
      case 'Polish':
        return 'PL';
      case 'Portuguese':
        return 'PT';
      case 'Romanian':
        return 'RO';
      case 'Russian':
        return 'RU';
      case 'Serbian':
        return 'SR';
      case 'Spanish':
        return 'ES';
      case 'Swedish':
        return 'SV';
      case 'Turkish':
        return 'TR';
      default:
        return 'EN';
    }
  }
}
