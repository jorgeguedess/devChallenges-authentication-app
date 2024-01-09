import { VerifyToken } from "@/lib/Service/Token.service";
import { ConnectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User.models";
import { NextResponse } from "next/server";

ConnectDB();
export const GET = async (request: any) => {
  const auth = request.cookies.get("token") || "";

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
      user: existUser,
    },
    {
      status: 200,
    },
  );
};
