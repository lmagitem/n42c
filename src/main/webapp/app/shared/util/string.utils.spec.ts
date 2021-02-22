import { StringUtils } from './string.utils';

describe('StringUtils', () => {
  it(`#findMatches should return expected occurences from a given string`, () => {
    expect(StringUtils.findMatches(new RegExp('th'), 'this is a sentence, that is another one')).toContain('th');
    expect(StringUtils.findMatches(new RegExp('th', 'g'), 'this is a sentence, that is another one').length === 2).toBe(true);
    expect(StringUtils.findMatches(/\$\d*/, '$11564+$9999+2/$333')).toContain('$11564');
    expect(StringUtils.findMatches(/\$\d*/, '$11564+$9999+2/$333')).toContain('$9999');
    expect(StringUtils.findMatches(/\$\d*/, '$11564+$9999+2/$333')).not.toContain('2');
    expect(StringUtils.findMatches(/\$\d*/, '$11564+$9999+2/$333')).toContain('$333');
    expect(StringUtils.findMatches(/\$\d*/g, '$11564+$9999+2/$333')).toContain('$11564');
    expect(StringUtils.findMatches(/\$\d*/g, '$11564+$9999+2/$333')).toContain('$9999');
    expect(StringUtils.findMatches(/\$\d*/g, '$11564+$9999+2/$333')).not.toContain('2');
    expect(StringUtils.findMatches(/\$\d*/g, '$11564+$9999+2/$333')).toContain('$333');
  });
  it(`#replaceAll should replace all occurrences in a given string`, () => {
    expect(StringUtils.replaceAll('145 265 953', '5', '0')).toEqual('140 260 903');
    expect(StringUtils.replaceAll("Don't", "'", '')).toEqual('Dont');
    expect(StringUtils.replaceAll('How are you ?', '?', '')).toEqual('How are you ');
    expect(StringUtils.replaceAll('-333 594 481,56', ',', '.')).toEqual('-333 594 481.56');
    expect(StringUtils.replaceAll('YES511564566', 'd*', '')).not.toEqual('YES');
  });
});
