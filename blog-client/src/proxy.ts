import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
	console.log(request.url)

    return NextResponse.next();
}

export const config = {
    matcher: "/dashboard",
};
