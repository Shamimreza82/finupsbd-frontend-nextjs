import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "./services/AuthService"
import { TUser } from "./types/user";






const authRoutes = ["/login", "/register"]
const publicRoutes = ["/", "/about", "/contact"]

const roleBasedPrivateRoutes: Record<TUser["role"], RegExp[]> = {
  USER: [/^\/user/],
  ADMIN: [/^\/admin/],
  SUPER_ADMIN: [/^\/super-admin/, /^\/admin(?:\/.*)?$/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl
  console.log({pathname})
  const userInfo = await getCurrentUser()

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_API_URL}/login?redirectPath=${pathname}`, request.url)
      );
    }
  }


  if (userInfo.role && roleBasedPrivateRoutes[userInfo.role]) {
    const routes = roleBasedPrivateRoutes[userInfo.role];

    const isAllowed = routes.some((route: any) => route.test(pathname));
    if (isAllowed) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url))
  }
}


export const config = {
  matcher: [
    "/login",
    "/register",
    "/user",
    "/user/:path*",
    "/admin",
    "/admin/:path*",
    "/super-admin",
    "/super-admin/:path*",
    "/loan-application",
  ],
}