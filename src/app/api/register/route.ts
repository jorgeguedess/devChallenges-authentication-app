import { ConnectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User.models";
import { NextResponse } from "next/server";

ConnectDB();
export const POST = async (request: Request) => {
  const { name, email, password, bio, phone } = await request.json();

  const existUser = await UserModel.findOne({ email });
  if (existUser) {
    return NextResponse.json(
      {
        msg: null,
        error: "User Alredy Exist",
      },
      {
        status: 400,
      },
    );
  }

  await UserModel.create({ name, email, password, bio, phone });

  return NextResponse.json(
    {
      error: null,
      msg: "User Register Successfully",
    },
    {
      status: 201,
    },
  );
};
