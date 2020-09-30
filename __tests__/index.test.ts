import { parse } from '../src';
import { readFileSync } from 'fs';

describe('Function: parse', () => {
  // Read more about fake timers
  // http://facebook.github.io/jest/docs/en/timer-mocks.html#content
  jest.useFakeTimers();

  test('check parsed text', async () => {
    const testMd = await readFileSync('./demo/test.md', 'utf8');
    const parsedText = parse(testMd);

    const util = require('util');
    console.log(
      util.inspect(parsedText, false, null, true /* enable colors */),
    );

    const result = Array.isArray(parsedText);
    expect(result).toBe(true);
  });
});
