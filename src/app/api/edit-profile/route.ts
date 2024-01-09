import bcrypt from "bcryptjs";
import { VerifyToken } from "@/lib/Service/Token.service";
import { ConnectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User.models";
import { NextResponse } from "next/server";

ConnectDB();
export const PUT = async (request: any) => {
  const auth = request.cookies.get("token") || "";
  const { name, email, password, bio, phone } = await request.json();

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

  const newPassword = await bcrypt.hash(password, 10);

  const existUser = await UserModel.findByIdAndUpdate(userId, {
    $set: { name, email, newPassword, bio, phone },
  });

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
      msg: "Profile Updated",
    },
    {
      status: 200,
    },
  );
};
