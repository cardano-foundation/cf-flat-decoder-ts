import { decode } from 'cbor-x';
import { ProgramFlatCodec } from './src/uplc/codec';
import { hexToUint8Array, toInt8Array } from './src/uplc/utils';

export const decodeFlatUplc = (deserializeContract: string) => {
  const contractByteArray = hexToUint8Array(deserializeContract);
  const scriptFlat = decode(contractByteArray);
  const decoder = toInt8Array(scriptFlat);

  const program = ProgramFlatCodec.decodeFlat(decoder);
  return program.pretty();
};

export * from './src/uplc/codec';
export * from './src/uplc/instances';
export * from './src/uplc/term';
export * from './src/uplc/utils';
