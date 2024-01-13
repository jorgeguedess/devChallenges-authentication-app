import { SendEmail } from "@/lib/Service/Mail.service";
import { GenerateForgetToken } from "@/lib/Service/Token.service";
import { ConnectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User.models";
import { NextResponse } from "next/server";

ConnectDB();
export const POST = async (request: Request) => {
  const { email } = await request.json();

  const existUser = await UserModel.findOne({ email });
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

  //   token
  const token: any = await GenerateForgetToken(existUser, email);

  const mailResponse = await SendEmail(existUser.name, token, email);

  const response = NextResponse.json(
    {
      error: null,
      msg: "Email Send Successfully",
    },
    {
      status: 200,
    },
  );

  return response;
};
