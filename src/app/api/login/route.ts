import { GenerateToken } from "@/lib/Service/Token.service";
import { authOptions } from "@/lib/auth";
import { ConnectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User.models";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

ConnectDB();
export const POST = async (request: Request) => {
  const { email, password } = await request.json();
  const session = await getServerSession(authOptions);

  let existUser;
  if (session) {
    existUser = await UserModel.findOne(session?.user);
  } else {
    existUser = await UserModel.findOne({ email });
  }

  if (!existUser) {
    return NextResponse.json(
      {
        msg: null,
        error: "User Not Exist",
      },
      {
        status: 400,
      },
    );
  }

  if (!session) {
    const isMatch = await existUser.ConfirmPassword(password);
    if (!isMatch) {
      return NextResponse.json(
        {
          msg: null,
          error: "Invalid Credentails",
        },
        {
          status: 400,
        },
      );
    }
  }

  //   token

  const token: any = await GenerateToken(existUser);

  const response = NextResponse.json(
    {
      error: null,
      msg: "User Login Successfully",
    },
    {
      status: 200,
    },
  );

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
  });

  return response;
};
