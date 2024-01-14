import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const cookiesToDelete = [
    "token",
    "next-auth.session-token",
    "__Secure-next-auth.session-token",
    "__Secure-next-auth.pkce.code_verifier",
    "__Secure-next-auth.callback-url",
    "__Host-next-auth.csrf-token",
  ];

  const response = NextResponse.json(
    {
      error: null,
      msg: "logout success",
    },
    {
      status: 200,
    },
  );

  cookiesToDelete.forEach((cookie) => response.cookies.delete(cookie));

  return response;
};
