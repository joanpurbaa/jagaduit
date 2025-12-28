import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
	const session = await auth();
	const { pathname } = request.nextUrl;

	const authRoutes = ["/login", "/register"];
	const isAuthRoute = authRoutes.includes(pathname);
  
	if (session && isAuthRoute) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!session && pathname === "/") {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
