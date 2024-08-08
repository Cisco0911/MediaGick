import {NextFetchEvent, NextRequest, NextResponse} from 'next/server'
import {getNewAccessToken, secondsFromNow} from "@app/_lib/actions/auth";
import resourceMiddleware from "@app/(app-navigation)/resources/middleware"


export async function middleware(request: NextRequest, event: NextFetchEvent) {

	const response = NextResponse

	const res = await resourceMiddleware(request, event)
	if (res) {
		return res
	}

	if (request.nextUrl.pathname.startsWith('/login') ||
		request.nextUrl.pathname.startsWith('/sign-up')
	){
		if (request.cookies.has("session")){
			return response.redirect(new URL('/', request.url))
		}

		return response.next()
	}

	if (!request.cookies.has("session")){

		const refresh_token = request.cookies.get("refresh")?.value;

		if (!refresh_token){
			return response.redirect(new URL('/login', request.url))
		}
		else {
			console.log("refreshing token")

			try {
				const res = await getNewAccessToken(refresh_token)

				if (res.ok) {

					const newResponse = response.next()

					const content = res.data

					const {access_token, access_expiration, refresh_token, refresh_expiration, user} = content!

					const sessionData = {
						access_token, user
					}

					newResponse.cookies.delete("session");
					newResponse.cookies.delete("refresh");

					newResponse.cookies.set("session", JSON.stringify(sessionData), {
						httpOnly: true,
						secure: true,
						maxAge: await secondsFromNow(access_expiration),
						path: '/',
					});

					newResponse.cookies.set("refresh", refresh_token, {
						httpOnly: true,
						secure: true,
						maxAge: await secondsFromNow(refresh_expiration),
						path: '/',
					});

					return newResponse
				}
				else {
					const newResponse = response.redirect(new URL('/login', request.url))

					newResponse.cookies.delete("session");
					newResponse.cookies.delete("refresh");

					return newResponse
				}
			}
			catch (err) {
				const newResponse = response.redirect(new URL('/login', request.url))

				newResponse.cookies.delete("session");
				newResponse.cookies.delete("refresh");

				return newResponse
			}
		}
	}

	return response.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}