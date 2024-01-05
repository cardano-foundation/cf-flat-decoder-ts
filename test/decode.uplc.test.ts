import { decodeFlatUplc } from '../index';
import * as path from 'path';
import * as fs from 'fs';

const contract = '4a02000023370090100009';
const contract_decoded = `(program
  2.0.0
  (lam i_0 [ [ (builtin addInteger) (con integer 16) ] i_0 ])
)`;

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
    expect(program1).toEqual(decoded);
  });
});
