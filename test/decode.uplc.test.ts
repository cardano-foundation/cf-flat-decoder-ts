import { decodeFlatUplc } from '../index';
import * as path from 'path';
import * as fs from 'fs';

const removeWhiteSpace = (input: string): string => {
  return input.replace(/\s+/g, '');
};

describe('decodeFlatUplc', () => {
  it('should decode a flat cbor uplc contract', () => {
    const program1Flat = fs.readFileSync(
      path.join(__dirname, 'program_1.flat'),
      {
        encoding: 'utf8',
      }
    );

    const program1 = fs.readFileSync(path.join(__dirname, 'program_1.uplc'), {
      encoding: 'utf8',
    });

    const decoded = decodeFlatUplc(program1Flat);
    expect(removeWhiteSpace(program1)).toEqual(removeWhiteSpace(decoded));
  });
});
