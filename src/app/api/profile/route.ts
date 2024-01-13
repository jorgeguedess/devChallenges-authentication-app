import { VerifyToken } from "@/lib/Service/Token.service";
import { authOptions } from "@/lib/auth";
import { ConnectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User.models";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

ConnectDB();
export const GET = async (request: any) => {
  const auth = request.cookies.get("token" || "next-auth.session-token") || "";
  const session = await getServerSession(authOptions);
  console.log("PROFILE AUTH: ", auth);

  if (!auth) {
    return NextResponse.json(
      {
        msg: null,
        error: "Please login First",
      },
      {
        status: 401,
      },
    );
  }

  const { userId }: any = await VerifyToken(auth.value);
  const verify = await VerifyToken(auth.value);
  console.log(verify);
  console.log(auth, userId);

  if (!userId) {
    return NextResponse.json(
      {
        msg: null,
        error: "Invalid Token",
      },
      {
        status: 401,
      },
    );
  }

  const existUser = await UserModel.findById(userId).select("-password");
  if (!existUser) {
    return NextResponse.json(
      {
        msg: null,
        error: "User Does not Exist",
      },
      {
        status: 401,
      },
    );
  }

  return NextResponse.json(
    {
      error: null,
      msg: "data fetched",
      user: existUser || session?.user,
    },
    {
      status: 200,
    },
  );
};
