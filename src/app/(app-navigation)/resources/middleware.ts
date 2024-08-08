import {NextFetchEvent, NextRequest, NextResponse} from "next/server";


export default async function middleware(request: NextRequest, event: NextFetchEvent){

	if (request.nextUrl.pathname === '/resources') {
		return NextResponse.redirect(new URL('/resources/products', request.url))
	}

	return
}