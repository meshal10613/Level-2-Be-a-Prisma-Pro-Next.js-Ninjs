import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    let isAuthenticated = false;
    let isAdmin = false;

    const { data } = await userService.getSession();
    if (data) {
        isAuthenticated = true;
        isAdmin = data.user.role === Roles.admin;
    }

    //? if user is not authenticated then redirect to login
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    //? if admin wants to access dashboard then redirect to admin-dashboard
    if (isAdmin && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }

    //? if user wants to access admin-dashboard then redirect to dashboard
    if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "/admin-dashboard",
        "/admin-dashboard/:path*",
    ],
};
