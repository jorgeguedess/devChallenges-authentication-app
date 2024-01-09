import jwt from "jsonwebtoken";

const AUTH = process.env.AUTH_JWT || "FGHJ";

export const GenerateToken = async (user: any) => {
  const token = await jwt.sign({ userId: user._id }, AUTH, {
    expiresIn: "2d",
  });
  return token;
};

export const VerifyToken = async (token: string) => {
  const verified = await jwt.verify(token, AUTH);
  return verified;
};
