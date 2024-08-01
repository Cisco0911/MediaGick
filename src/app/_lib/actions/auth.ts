"use server"



import {User} from "@features/user/userSlice";
import {PublicsCiblesEnum, SexeEnum, TypeContenuPrefereEnum} from "../enums";
import {parseToUserSession, UserInfo} from "@app/_lib/parsers";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";


const API_BASE_URL = process.env.API_BASE_URL



class ClientError extends Error {}

function action<T extends any[], U>(
	fn: (...args: T) => Promise<U>,
): (
	...args: T
) => Promise<{ ok: true, data?: U } | { ok: false; error: string }> {
	return async (...args: T) => {
		try {
			return { ok: true, data: await fn(...args) };
		} catch (err: unknown) {
			if (err instanceof ClientError) return {ok: false, error: err.message };
			throw err;
		}
	};
}


function secondsFromNow(inputDate: string): number {

	const targetDate = new Date(inputDate);

	return (targetDate.getTime() - Date.now()) / 1000;
}


export const login = action(async (email: string, password: string) => {

	let res: Response

	try {
		res = await fetch(`${API_BASE_URL}/api/v1/auth/sign-in`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				mot_de_passe: password
			}),
		})

	} catch (err) {
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		throw new ClientError(`${content.detail}`)
	}

	const userSession  = parseToUserSession(content)

	cookies().set("session", JSON.stringify(userSession.sessionData), {
		httpOnly: true,
		secure: true,
		maxAge: secondsFromNow(userSession.access_expiration),
		path: '/',
	})

	cookies().set("refresh", JSON.stringify(userSession.refresh_token), {
		httpOnly: true,
		secure: true,
		maxAge: secondsFromNow(userSession.refresh_expiration),
		path: '/',
	})

	return ""

})

type signUpSchema = {
	nom?: string;
	prenom?: string;
	email?: string;
	age?: number;
	sexe?: SexeEnum;
	mot_de_passe?: string;
	objectif_principal?: string;
	secteur_activite?: string;
	type_contenu_prefere?: TypeContenuPrefereEnum;
	publics_cibles: {libelle: PublicsCiblesEnum}[];
}
export const signUp = action(async (user: signUpSchema)=> {

	let res : Response

	try {
		// console.log(JSON.stringify(user))
		res = await fetch(`${API_BASE_URL}/api/v1/auth/sign-up`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})

	}
	catch (err) {
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		// console.log(JSON.stringify(content))
		throw new Error(`${JSON.stringify(content.detail)}`)
	}

	return ""

})

export async function getUserSession(){

	const session: {
		access_token: string;
		user: UserInfo;
	} = JSON.parse(cookies().get("session")!.value);

	return session
}

export const getNewAccessToken = action(async (refreshToken: string) => {
	let res: Response
	try {
		res = await fetch(`${API_BASE_URL}/api/v1/auth/refresh-token?refresh_token=${refreshToken}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (err) {
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		throw new ClientError(`${content.detail}`)
	}

	const {access_token, access_expiration, refresh_token, refresh_expiration} = content

	const user = JSON.parse(cookies().get("session")!.value).user as UserInfo;

	const sessionData = {
		access_token, user
	}

	cookies().delete("session");
	cookies().delete("refresh");

	cookies().set("session", JSON.stringify(sessionData), {
		httpOnly: true,
		secure: true,
		maxAge: secondsFromNow(access_expiration),
		path: '/',
	});

	cookies().set("refresh", refresh_token, {
		httpOnly: true,
		secure: true,
		maxAge: secondsFromNow(refresh_expiration),
		path: '/',
	});

	return ""
})

export const logout = action(async () => {

	let res: Response

	try {
		const accessToken = (await getUserSession()).access_token;

		res = await fetch(`${API_BASE_URL}/api/v1/auth/revoke-token?refresh_token=${accessToken}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (err) {
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		console.log(JSON.stringify(content))
		throw new ClientError(`${content.detail}`)
	}
	else {
		cookies().delete("session");
		cookies().delete("refresh");

		redirect("/login")

		return ""
	}

})

export const changePwd = action(async (oldPwd: string, newPwd: string) => {

	let res: Response

	try {
		const userSession = (await getUserSession());

		console.log("userSession", userSession.user.id)

		res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/change-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userSession.access_token}`
			},
			body: JSON.stringify({
				current_password: oldPwd,
				new_password: newPwd
			}),
		})
	} catch (err) {
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		console.log(JSON.stringify(content))
		throw new Error(`${content.detail}`)
	}

	await logout()

	return ""

})

