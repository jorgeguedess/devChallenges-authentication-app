import { NextResponse } from "next/server";

export const middleware = (request: any) => {
  const pathVaiable = request.nextUrl.pathname;
  console.log({ pathVaiable });
  const publicPath = [
    "/register",
    "/edit-password",
    "/forget-password",
    "/login",
  ];
  const auth = request.cookies.get("token");

  if (publicPath.includes(pathVaiable) && auth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!publicPath.includes(pathVaiable) && !auth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log({ auth });
};

export const config = {
  matcher: [
    "/",
    "/update-profile",
    "/edit-password",
    "/update-password",
    "/register",
    "/login",
  ],
};
