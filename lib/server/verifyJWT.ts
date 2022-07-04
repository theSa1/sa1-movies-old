import * as jose from "jose";
type VerifyJWT = (token: string) => Promise<string | false>;

const splitPem = (process.env.CLERK_JWT_KEY as string).match(/.{1,64}/g);
const publicKey =
  "-----BEGIN PUBLIC KEY-----\n" +
  (splitPem as string[]).join("\n") +
  "\n-----END PUBLIC KEY-----";

export const verifyJWT: VerifyJWT = async (token) => {
  try {
    const key = await jose.importSPKI(publicKey, "RS256");

    const { payload } = await jose.jwtVerify(token, key);

    return payload.id as string;
  } catch (e) {
    return false;
  }
};
