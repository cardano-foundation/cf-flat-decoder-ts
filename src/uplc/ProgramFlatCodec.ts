import { DecoderState } from "../flat/flat";
import { FlatDeBruijnedProgram } from "./FlatInstantces";
import { DeBruijnedProgram } from "./Term";

export class ProgramFlatCodec {
  public static decodeFlat(encoded: Int8Array): DeBruijnedProgram {
    const decoderState = new DecoderState(encoded);
    return FlatDeBruijnedProgram.decode(decoderState);
  }
}
