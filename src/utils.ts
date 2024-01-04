export const hexToUint8Array = (hexString: string) => {
  // Remove the leading "0x" if present
  hexString = hexString.startsWith("0x") ? hexString.slice(2) : hexString;

  // Ensure the hex string has an even length
  if (hexString.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }

  // Create a Uint8Array
  const uint8Array = new Uint8Array(hexString.length / 2);

  // Iterate over the hex string, convert each pair of characters to a byte, and store it in the Uint8Array
  for (let i = 0; i < hexString.length; i += 2) {
    uint8Array[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
  }

  return uint8Array;
};

export const toInt8Array = (uInt8Array: Uint8Array) => {
  const int8Array = new Int8Array(uInt8Array.length);
  for (let i = 0; i < uInt8Array.length; i++) {
    int8Array[i] = (uInt8Array[i] << 24) >> 24;
  }
  return int8Array;
};

export const toUint8Array = (int8Array: Int8Array): Uint8Array => {
  const uint8Array = new Uint8Array(int8Array.length);
  for (let i = 0; i < int8Array.length; i++) {
    // Chuyển đổi từ Int8 sang Uint8
    uint8Array[i] = int8Array[i] & 0xff;
  }
  return uint8Array;
};

const HEX_ARRAY: string[] = "0123456789ABCDEF".split("");

export const bytesToHex = (bytes: Int8Array): string => {
  const hexChars: string[] = new Array(bytes.length * 2);
  for (let j = 0; j < bytes.length; j++) {
    const v = bytes[j] & 0xff;
    hexChars[j * 2] = HEX_ARRAY[v >>> 4];
    hexChars[j * 2 + 1] = HEX_ARRAY[v & 0x0f];
  }
  return hexChars.join("");
};
