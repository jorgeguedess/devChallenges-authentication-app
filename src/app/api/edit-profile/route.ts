import bcrypt from "bcryptjs";
import { VerifyToken } from "@/lib/Service/Token.service";
import { ConnectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User.models";
import { NextResponse } from "next/server";
import { User } from "@/types/user";

ConnectDB();
export const PUT = async (request: any) => {
  const auth = request.cookies.get("token") || "";
  const { name, email, password, bio, phone, image } =
    (await request.json()) as User;

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
  const existUser = await UserModel.findById(userId);

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

  let updateFields: any = { name, email, bio, phone, image };

  if (password && password.length > 0) {
    const hashPassword = await bcrypt.hash(password, 10);
    updateFields.password = hashPassword;
  }

  await UserModel.findByIdAndUpdate(userId, {
    $set: updateFields,
  });

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
