import { MathUtils } from './math.utils';

describe('MathUtils', () => {
  it(`#isNumeric should return true when a number is given`, () => {
    expect(MathUtils.isNumeric(1)).toBe(true);
    expect(MathUtils.isNumeric(0)).toBe(true);
    expect(MathUtils.isNumeric(-1)).toBe(true);
    expect(MathUtils.isNumeric(3132453953904395830403349341)).toBe(true);
    expect(MathUtils.isNumeric(1.32535)).toBe(true);
    expect(MathUtils.isNumeric(234225.4354423231)).toBe(true);
    expect(MathUtils.isNumeric(-23435334335541)).toBe(true);
  });
  it(`#isNumeric should return true when a properly formated string is given`, () => {
    expect(MathUtils.isNumeric('1')).toBe(true);
    expect(MathUtils.isNumeric('0')).toBe(true);
    expect(MathUtils.isNumeric('-1234')).toBe(true);
    expect(MathUtils.isNumeric('322384294053053834840304323')).toBe(true);
    expect(MathUtils.isNumeric('14322323.4233')).toBe(true);
    expect(MathUtils.isNumeric('145 265 953')).toBe(true);
    expect(MathUtils.isNumeric('145 265.000')).toBe(true);
  });
  it(`#isNumeric should return false when a badly formated string is given`, () => {
    expect(MathUtils.isNumeric('14322323,4233')).toBe(false);
    expect(MathUtils.isNumeric('145265€')).toBe(false);
    expect(MathUtils.isNumeric('1,265,481.95')).toBe(false);
  });
  it(`#isNumeric should return false when something else is given`, () => {
    expect(MathUtils.isNumeric(undefined)).toBe(false);
    expect(MathUtils.isNumeric(null)).toBe(false);
    expect(MathUtils.isNumeric(false)).toBe(false);
    expect(MathUtils.isNumeric('tomb')).toBe(false);
    expect(MathUtils.isNumeric('')).toBe(false);
    expect(MathUtils.isNumeric({ nombre: 3 })).toBe(false);
    expect(MathUtils.isNumeric({})).toBe(false);
    expect(MathUtils.isNumeric([])).toBe(false);
    expect(MathUtils.isNumeric([433, 454, 123])).toBe(false);
    expect(MathUtils.isNumeric(() => 3)).toBe(false);
  });
  it(`#calculateNearestValue should return the expected result`, () => {
    expect(MathUtils.getNearestValue(-103, 0, 100, 10)).toEqual(0);
    expect(MathUtils.getNearestValue(3, 0, 100, 10)).toEqual(0);
    expect(MathUtils.getNearestValue(7, 0, 100, 10)).toEqual(10);
    expect(MathUtils.getNearestValue(44, 0, 100, 10)).toEqual(40);
    expect(MathUtils.getNearestValue(453232, 0, 100, 5)).toEqual(100);
    expect(MathUtils.getNearestValue(-103, 0, 100, 5)).toEqual(0);
    expect(MathUtils.getNearestValue(3, 0, 100, 5)).toEqual(5);
    expect(MathUtils.getNearestValue(7, 0, 100, 5)).toEqual(5);
    expect(MathUtils.getNearestValue(44, 0, 100, 5)).toEqual(45);
    expect(MathUtils.getNearestValue(453232, 0, 100, 5)).toEqual(100);
    expect(MathUtils.getNearestValue(-103, -120, 30, 5)).toEqual(-105);
    expect(MathUtils.getNearestValue(3, -120, 30, 5)).toEqual(5);
    expect(MathUtils.getNearestValue(7, -120, 30, 5)).toEqual(5);
    expect(MathUtils.getNearestValue(44, -120, 30, 5)).toEqual(30);
    expect(MathUtils.getNearestValue(-103, -120, -10, 10)).toEqual(-100);
    expect(MathUtils.getNearestValue(3, -120, -10, 10)).toEqual(-10);

    // Tests value
    try {
      MathUtils.getNearestValue(NaN, 0, 100, 5);
    } catch (e) {
      expect(true).toBeTruthy();
    }

    // Tests min
    try {
      MathUtils.getNearestValue(453232, NaN, 100, 5);
    } catch (e) {
      expect(true).toBeTruthy();
    }
    try {
      MathUtils.getNearestValue(453232, 5000, 100, 5);
    } catch (e) {
      expect(true).toBeTruthy();
    }

    // Tests max
    try {
      MathUtils.getNearestValue(453232, 0, NaN, 5);
    } catch (e) {
      expect(true).toBeTruthy();
    }

    // Tests step
    try {
      MathUtils.getNearestValue(453232, 0, 100, -5);
    } catch (e) {
      expect(true).toBeTruthy();
    }
    try {
      MathUtils.getNearestValue(453232, 0, 100, NaN);
    } catch (e) {
      expect(true).toBeTruthy();
    }
  });
});
