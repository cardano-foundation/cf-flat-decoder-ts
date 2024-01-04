import { bytesToHex } from "../utils";
import {
  ByteString,
  DefaultUni,
  Integer,
  String,
  Unit,
  Bool,
  ProtoPair,
  Data,
  ProtoList,
} from "./CommonFlatInstantces";

export enum ApplyType {
  ProtoList,
  ProtoPair,
}
export class Constant {
  public static fromValue(tpe: DefaultUni, decoded: unknown) {
    return new Constant(tpe, decoded);
  }
  public tpe?: DefaultUni;
  public value?: unknown;

  constructor(tpe: DefaultUni, value: unknown) {
    this.tpe = tpe;
    this.value = value;
  }

  public prettyValue(c: DefaultUni): string {
    if (c instanceof Integer) {
      return `${this.value}`;
    }
    if (c instanceof ByteString) {
      return `#${bytesToHex(this.value as Int8Array)}`;
    }
    if (c instanceof String) {
      return `"${this.value}"`;
    }
    if (c instanceof Unit) {
      return `${this.value}`;
    }
    if (c instanceof Bool) {
      return this.value ? "True" : "False";
    }
    if (c instanceof ProtoList) {
      return `[${(this.value as Array<Constant>)
        .map((v) => this.prettyValue(v))
        .join(", ")}]`;
    }
    if (c instanceof ProtoPair) {
      return `${this.value}`;
    }
    if (c instanceof Data) {
      return `#${bytesToHex(this.value as Int8Array)}`;
    }
    return "";
  }

  public pretty(): string {
    if (!this.tpe) return "";
    return `${DefaultUni.pretty(this.tpe)} ${this.prettyValue(this.tpe)}`;
  }
}
