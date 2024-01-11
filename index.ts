import { decode } from 'cbor-x';
import { ProgramFlatCodec } from './src/uplc/codec';
import { hexToUint8Array, toInt8Array } from './src/uplc/utils';
import { DeBruijnedProgram, Version, fromDeBruijnTerm } from './src/uplc/term';

export const decodeFlatUplc = (
  deserializeContract: string,
  version: Version = { major: 2, minor: 0, patch: 0 }
) => {
  const contractByteArray = hexToUint8Array(deserializeContract);
  const scriptFlat = decode(contractByteArray);
  const decoder = toInt8Array(scriptFlat);

  const program = ProgramFlatCodec.decodeFlat(decoder);
  const namedTerm = fromDeBruijnTerm(program.term);
  const appied = new DeBruijnedProgram(version, namedTerm);
  return appied.pretty();
};
