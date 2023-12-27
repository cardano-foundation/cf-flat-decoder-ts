import { DecoderState } from "../flat/flat";
import { FlatDeBruijnedProgram } from "./FlatInstantces";

export class ProgramFlatCodec {
  public static decodeFlat(encoded: Uint8Array) {
    const decoderState = new DecoderState(encoded);
    return FlatDeBruijnedProgram.decode(decoderState);
  }
}
