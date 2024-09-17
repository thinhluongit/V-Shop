import CryptoJS from "crypto-js";

export const calculateHMacSHA256 = (
  data: string,
  secretKey: string
): string => {
  const hmac = CryptoJS.HmacSHA256(data, secretKey);
  return hmac.toString(CryptoJS.enc.Hex);
};
