import {
  ByteString,
  DefaultUni,
  Integer,
  String,
  Unit,
  Bool,
  ProtoList,
  ProtoPair,
  Data,
} from "./CommonFlatInstantces";

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

  public pretty(): string {
    if (this.tpe instanceof Integer) {
      return `integer ${this.value}`;
    }
    if (this.tpe instanceof ByteString) {
      return `bytestring #${bytesToHex(this.value as Int8Array)}`;
    }
    if (this.tpe instanceof String) {
      return `string "${this.value}"`;
    }
    if (this.tpe instanceof Unit) {
      return `unit ${this.value}`;
    }
    if (this.tpe instanceof Bool) {
      return `bool ${this.value ? "True" : "False"}`;
    }
    if (this.tpe instanceof ProtoList) {
      return `protoList ${this.value}`;
    }
    if (this.tpe instanceof ProtoPair) {
      return `protoPair ${this.value}`;
    }
    if (this.tpe instanceof Data) {
      return `data #${bytesToHex(this.value as Int8Array)}`;
    }
    return "";
  }
}

const HEX_ARRAY: string[] = "0123456789ABCDEF".split("");

const bytesToHex = (bytes: Int8Array): string => {
  const hexChars: string[] = new Array(bytes.length * 2);
  for (let j = 0; j < bytes.length; j++) {
    const v = bytes[j] & 0xff;
    hexChars[j * 2] = HEX_ARRAY[v >>> 4];
    hexChars[j * 2 + 1] = HEX_ARRAY[v & 0x0f];
  }
  return hexChars.join("");
};
