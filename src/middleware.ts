import { NextResponse } from "next/server";

export const middleware = (request: any) => {
  const pathVaiable = request.nextUrl.pathname;
  const publicPath = [
    "/register",
    "/edit-password",
    "/forget-password",
    "/login",
  ];
  const auth = request.cookies.get("token" || "next-auth.session-token");

  if (publicPath.includes(pathVaiable) && auth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!publicPath.includes(pathVaiable) && !auth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  matcher: [
    "/",
    "/update-profile",
    "/edit-password",
    "/forget-password",
    "/register",
    "/login",
  ],
};
