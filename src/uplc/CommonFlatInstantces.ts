import {
  DecoderState,
  FlatArrayByte,
  FlatBigInt,
  FlatBoolean,
  FlatData,
  FlatString,
  FlatUnit,
  ListFlat,
} from "../flat/flat";
import { Constant } from "./Constant";
import { DefaultFun } from "./DefaultFun";
const CONSTANT_WIDTH = 4;

export class FlatConstant {
  public static decode(decoder: DecoderState): Constant {
    const tags = ListFlat.decode(decoder);
    const tpe = decodeUni(tags);
    let decoded: unknown;
    if (tpe instanceof Integer) {
      decoded = FlatBigInt.decode(decoder);
    }
    if (tpe instanceof ByteString) {
      decoded = FlatArrayByte.decode(decoder);
    }
    if (tpe instanceof String) {
      decoded = FlatString.decode(decoder);
    }
    if (tpe instanceof Unit) {
      decoded = FlatUnit.decode(decoder);
    }
    if (tpe instanceof Bool) {
      decoded = FlatBoolean.decode(decoder);
    }
    if (tpe instanceof Data) {
      decoded = FlatData.decode(decoder);
    }

    const result = Constant.fromValue(tpe, decoded);

    return result;
  }
}

export class ConstantTypeTagFlat {
  public static decode(decode: DecoderState): number {
    return decode.bits8(CONSTANT_WIDTH);
  }
}

export class DefaultUni {}

export class Integer extends DefaultUni {}
export class ByteString extends DefaultUni {}
export class String extends DefaultUni {}
export class Unit extends DefaultUni {}
export class Bool extends DefaultUni {}
export class ProtoList extends DefaultUni {}
export class ProtoPair extends DefaultUni {}
export class Data extends DefaultUni {}
export class Default extends DefaultUni {}
export class Apply extends DefaultUni {
  f: DefaultUni = Default;
  arg: DefaultUni = Default;

  constructor(f: DefaultUni, arg: DefaultUni) {
    super();
    this.f = f;
    this.arg = arg;
  }
}

function decodeUni(state: number[]): DefaultUni {
  if (!state.length) return new Default();

  const head = state[0];
  switch (head) {
    case 0:
      return new Integer();
    case 1:
      return new ByteString();
    case 2:
      return new String();
    case 3:
      return new Unit();
    case 4:
      return new Bool();
    case 5:
      return new ProtoList();
    case 6:
      return new ProtoPair();
    case 7: {
      const cloneState = [...state];
      const uniF = decodeUni(cloneState);
      const uniA = decodeUni(cloneState.slice(1));
      return new Apply(uniF, uniA);
    }
    case 8:
      return new Data();
    // default:
    //   throw new Error(`Invalid uni: ${head}`);
  }
}

export class FlatDefaultFun {
  public static decode(decode: DecoderState): string {
    const code = decode.bits8(7);
    switch (code) {
      case 0:
        return DefaultFun.AddInteger;
      case 1:
        return DefaultFun.SubtractInteger;
      case 2:
        return DefaultFun.MultiplyInteger;
      case 3:
        return DefaultFun.DivideInteger;
      case 4:
        return DefaultFun.QuotientInteger;
      case 5:
        return DefaultFun.RemainderInteger;
      case 6:
        return DefaultFun.ModInteger;
      case 7:
        return DefaultFun.EqualsInteger;
      case 8:
        return DefaultFun.LessThanInteger;
      case 9:
        return DefaultFun.LessThanEqualsInteger;
      case 10:
        return DefaultFun.AppendByteString;
      case 11:
        return DefaultFun.ConsByteString;
      case 12:
        return DefaultFun.SliceByteString;
      case 13:
        return DefaultFun.LengthOfByteString;
      case 14:
        return DefaultFun.IndexByteString;
      case 15:
        return DefaultFun.EqualsByteString;
      case 16:
        return DefaultFun.LessThanByteString;
      case 17:
        return DefaultFun.LessThanEqualsByteString;
      case 18:
        return DefaultFun.Sha2_256;
      case 19:
        return DefaultFun.Sha3_256;
      case 20:
        return DefaultFun.Blake2b_256;
      case 21:
        return DefaultFun.VerifyEd25519Signature;
      case 22:
        return DefaultFun.AppendString;
      case 23:
        return DefaultFun.EqualsString;
      case 24:
        return DefaultFun.EncodeUtf8;
      case 25:
        return DefaultFun.DecodeUtf8;
      case 26:
        return DefaultFun.IfThenElse;
      case 27:
        return DefaultFun.ChooseUnit;
      case 28:
        return DefaultFun.Trace;
      case 29:
        return DefaultFun.FstPair;
      case 30:
        return DefaultFun.SndPair;
      case 31:
        return DefaultFun.ChooseList;
      case 32:
        return DefaultFun.MkCons;
      case 33:
        return DefaultFun.HeadList;
      case 34:
        return DefaultFun.TailList;
      case 35:
        return DefaultFun.NullList;
      case 36:
        return DefaultFun.ChooseData;
      case 37:
        return DefaultFun.ConstrData;
      case 38:
        return DefaultFun.MapData;
      case 39:
        return DefaultFun.ListData;
      case 40:
        return DefaultFun.IData;
      case 41:
        return DefaultFun.BData;
      case 42:
        return DefaultFun.UnConstrData;
      case 43:
        return DefaultFun.UnMapData;
      case 44:
        return DefaultFun.UnListData;
      case 45:
        return DefaultFun.UnIData;
      case 46:
        return DefaultFun.UnBData;
      case 47:
        return DefaultFun.EqualsData;
      case 48:
        return DefaultFun.MkPairData;
      case 49:
        return DefaultFun.MkNilData;
      case 50:
        return DefaultFun.MkNilPairData;
      case 51:
        return DefaultFun.SerialiseData;
      case 52:
        return DefaultFun.VerifyEcdsaSecp256k1Signature;
      case 53:
        return DefaultFun.VerifySchnorrSecp256k1Signature;
      default:
        throw new Error(`Invalid builtin function code: ${code}`);
    }
  }
}
