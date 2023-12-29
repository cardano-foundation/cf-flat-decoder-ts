import {
  ByteString,
  DefaultUni,
  Integer,
  String,
  Unit,
  Bool,
  ProtoPair,
  Data,
} from "./CommonFlatInstantces";

export enum ApplyType {
  ProtoList,
  ProtoPair,
}
export class Constant {
  public static fromValue(
    tpe: DefaultUni,
    decoded: unknown,
    applyType?: ApplyType
  ) {
    return new Constant(tpe, decoded, applyType);
  }
  public tpe?: DefaultUni;
  public value?: unknown;
  public applyType?: ApplyType;

  constructor(tpe: DefaultUni, value: unknown, applyType?: ApplyType) {
    this.tpe = tpe;
    this.value = value;
    this.applyType = applyType;
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
    if (this.applyType === ApplyType.ProtoList) {
      return `(list ${this.value}) `;
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
