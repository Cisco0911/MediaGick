import {NextFetchEvent, NextRequest, NextResponse} from 'next/server'
import {UserInfo} from "@app/_lib/parsers";
import {getNewAccessToken} from "@app/_lib/actions/auth";


export function middleware(request: NextRequest, event: NextFetchEvent) {


	if (request.nextUrl.pathname.startsWith('/login') ||
		request.nextUrl.pathname.startsWith('/sign-up')
	){
		if (request.cookies.has("session")){
			return Response.redirect(new URL('/', request.url))
		}

		return NextResponse.next()
	}

	if (!request.cookies.has("session")){

		const refresh_token = request.cookies.get("refresh")?.value;

		if (!refresh_token){
			return Response.redirect(new URL('/login', request.url))
		}
		else {
			event.waitUntil(
				getNewAccessToken(refresh_token)
			)

			return NextResponse.next()
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}