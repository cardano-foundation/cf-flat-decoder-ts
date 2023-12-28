import { DecoderState, FlatNatural } from "../flat/flat";
import { FlatConstant, FlatDefaultFun } from "./CommonFlatInstantces";
import { DeBruijnedProgram, NamedDeBruijn, Term, Version } from "./Term";

export const termTagWidth = 4;

export class FlatDeBruijnedProgram {
  public static decode(decoder: DecoderState): DeBruijnedProgram {
    const v1 = Number(FlatNatural.decode(decoder).n);
    const v2 = Number(FlatNatural.decode(decoder).n);
    const v3 = Number(FlatNatural.decode(decoder).n);
    const term = FlatTerm.decode(decoder);
    return new DeBruijnedProgram(
      { major: v1, minor: v2, patch: v3 } as Version,
      term
    );
  }
}
export class FlatTerm {
  public static decode(decoder: DecoderState): Term {
    const tag = decoder.bits8(termTagWidth);
    switch (tag) {
      case 0: {
        const index = Number(FlatNatural.decode(decoder).n);
        const name: string = `i${index}`;
        return Term.Var(new NamedDeBruijn(name, index));
      }
      case 1: {
        const term = FlatTerm.decode(decoder);
        return Term.Delay(term);
      }
      case 2: {
        const term = FlatTerm.decode(decoder);
        return Term.LamAbs("i0", term);
      }
      case 3: {
        const f = FlatTerm.decode(decoder);
        const arg = FlatTerm.decode(decoder);
        return Term.Apply(f, arg);
      }
      case 4:
        return Term.Const(FlatConstant.decode(decoder));
      case 5: {
        const term = FlatTerm.decode(decoder);
        return Term.Force(term);
      }
      case 6:
        return Term.Error();
      case 7:
        return Term.Builtin(FlatDefaultFun.decode(decoder));
    }
  }
}
