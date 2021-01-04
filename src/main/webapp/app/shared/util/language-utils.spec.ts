import { Language } from '../model/enumerations/language.model';
import { LanguageUtils } from './language-utils';

describe('LanguageUtils', () => {
  it(`#getLanguageEnumArray should contain language enums`, () => {
    expect(LanguageUtils.getLanguageEnumArray()).toContain(Language.EN);
    expect(LanguageUtils.getLanguageEnumArray()).toContain(Language.FR);
    expect(LanguageUtils.getLanguageEnumArray()).toContain(Language.ZH);
    expect(LanguageUtils.getLanguageEnumArray()).toContain(Language.SR);
  });
  it(`#getLanguageKeyArray should contain language keys`, () => {
    expect(LanguageUtils.getLanguageKeyArray()).toContain('EN');
    expect(LanguageUtils.getLanguageKeyArray()).toContain('FR');
    expect(LanguageUtils.getLanguageKeyArray()).toContain('ZH');
    expect(LanguageUtils.getLanguageKeyArray()).toContain('SR');
  });
  it(`#getLanguageEnumFromName should return language enums when fed with names`, () => {
    expect(LanguageUtils.getLanguageEnumFromName('English')).toEqual(Language.EN);
    expect(LanguageUtils.getLanguageEnumFromName('French')).toEqual(Language.FR);
    expect(LanguageUtils.getLanguageEnumFromName('Chinese')).toEqual(Language.ZH);
    expect(LanguageUtils.getLanguageEnumFromName('Serbian')).toEqual(Language.SR);
  });
  it(`#getLanguageEnumFromKey should return language enums when fed with keys`, () => {
    expect(LanguageUtils.getLanguageEnumFromKey('EN')).toEqual(Language.EN);
    expect(LanguageUtils.getLanguageEnumFromKey('FR')).toEqual(Language.FR);
    expect(LanguageUtils.getLanguageEnumFromKey('ZH')).toEqual(Language.ZH);
    expect(LanguageUtils.getLanguageEnumFromKey('SR')).toEqual(Language.SR);
  });
  it(`#getLanguageKeyFromName should return language keys when fed with names`, () => {
    expect(LanguageUtils.getLanguageKeyFromName('English')).toEqual('EN');
    expect(LanguageUtils.getLanguageKeyFromName('French')).toEqual('FR');
    expect(LanguageUtils.getLanguageKeyFromName('Chinese')).toEqual('ZH');
    expect(LanguageUtils.getLanguageKeyFromName('Serbian')).toEqual('SR');
  });
});
